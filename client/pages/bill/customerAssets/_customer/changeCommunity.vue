<template>
    <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="community">
        <FormItem label="可转金额：" >
              ￥{{formItem.allMoney | thousand}}
        </FormItem>
        <FormItem label="转至社区：" prop="community">
            <Select v-model="formItem.community" clearable style="text-align:left">
                <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        
        <FormItem label="转移金额：" prop="money">
            <Input v-model="formItem.money" placeholder="转移金额(请填写数字)" />

        </FormItem>
    </Form>
</template>
<script>
import LabelText from '~/components/LabelText'; 
    export default {
        components:{
            LabelText,
        },
        props:{
                editData:Object,
                editStatus:String,
            },
        data () {
            console.log('editData',this.editData.balance)
            const validateFirst = (rule, value, callback) => {
                var pattern =/^[0-9]+(.[0-9]{1,2})?$/;

                if(isNaN(value)){
                    console.log('isNaN(value)',isNaN(value))
                    callback(new Error('转移金额请填写数字'))
                }
                if(!pattern.test(value)){
                    callback(new Error('工位单价不得多于两位小数'))
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
                communityList:[],
                formItem: {
                    allMoney:this.editData.balance,
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
            getCommunityList(){
                console.log('转社区获取社区列表');
                this.communityList = [{
                    label:'1',
                    value:'1'
                },{
                    label:2,
                    value:2
                }]
            },
        },
        updated:function(){
            let data = this.formItem
            this.$emit('syncData', data);
             
            
        
        },
        mounted(){
            this.getCommunityList()
        }
    }
</script>
