<template>
    <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="balance">
        <FormItem label="可转金额：" >
              ￥{{formItem.allMoney | thousand}}
        </FormItem>
        <FormItem label="转移金额：" prop="amount">
            <Input v-model="formItem.amount" placeholder="转移金额(请填写数字)" />

        </FormItem>
    </Form>
</template>
<script>
    export default {
        props:{
                editData:Object,
                editStatus:String,
                type:String
            },
        data () {
            let basicMoney = this.editData[this.type];
            let communityId = this.editData.communityId;
            const validateFirst = (rule, value, callback) => {
                var pattern =/^[0-9]+(.[0-9]{1,2})?$/;
                

                if(isNaN(value)){
                    console.log('isNaN(value)',isNaN(value))
                    callback(new Error('转移金额请填写数字'))
                }
                if(!pattern.test(value)){
                    callback(new Error('工位单价不得多于两位小数'))
                }
                if(Number(value)>Number(basicMoney)){
                    callback(new Error('转移金额不得大于可转金额'));
                }
                if (value === '') {
                    callback(new Error('请填写转移金额'));
                }else{
                     callback();
                }
            };
            
            return {
                formItem: {
                    allMoney:basicMoney,
                    communityId:communityId
                },
                ruleCustom:{
                    community: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    amount: [
                        { required: true, trigger: 'change' ,validator: validateFirst},
                    ],
                },
            }
        },
        watch:{
        },
        methods:{

        },
        updated:function(){
            console.log('update-->',this.formItem)
            let data = this.formItem
            this.$emit('sync-data', data);
        },
        mounted(){
        }
    }
</script>
