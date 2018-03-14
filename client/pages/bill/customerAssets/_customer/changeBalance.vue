<template>
    <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="balance">
        <FormItem label="可转金额：" >
              ￥{{formItem.allMoney | thousand}}
        </FormItem>
        <FormItem label="转移金额：" prop="money">
            <Input v-model="formItem.money" placeholder="转移金额(请填写数字)" />

        </FormItem>
    </Form>
</template>
<script>
    export default {
        props:{
                editData:Object,
                editStatus:String,
            },
        data () {
            console.log('editData',this.editData.balance)
            const validateFirst = (rule, value, callback) => {
                console.log('rule',rule);
                console.log('value',value);
                console.log('value>this.editData.balance',Number(value)>Number(this.editData.balance))

                if(isNaN(value)){
                    console.log('isNaN(value)',isNaN(value))
                    callback(new Error('转移金额请填写数字'))
                }
                if(Number(value)>Number(this.editData.balance)){
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
                    allMoney:this.editData.balance || 3000,
                },
                ruleCustom:{
                    community: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    money: [
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
            let data = this.formItem
            this.$emit('syncData', data);
        },
        mounted(){
        }
    }
</script>
