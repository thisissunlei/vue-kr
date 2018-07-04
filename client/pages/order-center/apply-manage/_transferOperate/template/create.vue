<template>
    <CreateTemplate :title="title" :defaultList='defaultList' :transferType='transferType'></CreateTemplate>
</template>
<script>
import CreateTemplate from './createTemplate.vue'
export default {
    components:{
        CreateTemplate
    },
    data(){
        return{
            title:'',
            defaultList:[],
            transferType:'',
            feeTypes:[
                    {amount:'',maxAmount:'',feeTypeName:"余额",feeType:"BALANCE"},
                    {amount:'',maxAmount:'',feeTypeName:"可用服务保证金",feeType:"DEPOSIT"},
                    {amount:'',maxAmount:'',feeTypeName:"门禁卡押金",feeType:"GUARDCARDDEPOSIT"},
                    {amount:'',maxAmount:'',feeTypeName:"冻结服务保证金",feeType:"FROZEN_DEPOSIT"},
                    {amount:'',maxAmount:'',feeTypeName:"推柜门钥匙押金",feeType:"KEYDOORDEPOSIT"},
                    {amount:'',maxAmount:'',feeTypeName:"场地租赁押金",feeType:"LEASEHOLDDEPOSIT"},
                    {amount:'',maxAmount:'',feeTypeName:"注册地址押金",feeType:"REGISTEREDEPOSIT"}
                ],
            transferTypes:''
        }
    },
    mounted() {
        
    },
    methods:{
        
    }
}
</script>
