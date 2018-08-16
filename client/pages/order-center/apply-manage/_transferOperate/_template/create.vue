<template>
    <CreateTemplate :title="title" :defaultList='defaultList' :transferType='transferType'></CreateTemplate>
</template>
<script>
import CreateTemplate from './createTemplate.vue'
export default {
    components: {
        CreateTemplate
    },
    data() {
        return {
            title: '',
            defaultList: [
                { amount: "", maxAmount: "", feeTypeName: "余额", feeType: "BALANCE" },
                { amount: "", maxAmount: "", feeTypeName: "门禁卡押金", feeType: "GUARDCARDDEPOSIT" },
                { amount: "", maxAmount: "", feeTypeName: "其他保证金", feeType: "OTHERDEPOSIT" },
            ],
            transferType: '',
            feeTypes: [
                { amount: '', maxAmount: '', feeTypeName: "余额", feeType: "BALANCE" },
                { amount: '', maxAmount: '', feeTypeName: "可用服务保证金", feeType: "DEPOSIT" },
                { amount: '', maxAmount: '', feeTypeName: "门禁卡押金", feeType: "GUARDCARDDEPOSIT" },
                { amount: '', maxAmount: '', feeTypeName: "冻结服务保证金", feeType: "FROZEN_DEPOSIT" },
                { amount: '', maxAmount: '', feeTypeName: "推柜门钥匙押金", feeType: "KEYDOORDEPOSIT" },
                { amount: '', maxAmount: '', feeTypeName: "场地租赁押金", feeType: "LEASEHOLDDEPOSIT" },
                { amount: '', maxAmount: '', feeTypeName: "注册地址押金", feeType: "REGISTEREDEPOSIT" }
            ],
            transferTypes: ''
        }
    },
    mounted() {
        this.getTransType();
    },
    methods: {
        getTransType() {
            // RANSFER_COMMUNITY: 'transformZoneInfo',
            // TRANSFER_BALANCE: 'balanceInfo',
            // TRANSFER_NONBUSINESS: 'nonoperatingInfo',
            // TRANSFER_RENT: 'depositRentInfo',
            // TRANSFER_LOCK_DEPOSIT: 'releaseDepositInfo'
            let { params } = this.$route;
            this.transferType = params.template

            let list = [];
            switch (this.transferType) {
                case 'TRANSFER_NONBUSINESS':
                    list = ['余额', '门禁卡押金', '其他保证金']
                    break;
                case 'TRANSFER_BALANCE':
                    list = ['可用服务保证金', '门禁卡押金', '其他保证金']
                    break;
                case 'TRANSFER_RENT':
                    list = ['可用服务保证金',  '冻结服务保证金']
                    break;
                case 'TRANSFER_LOCK_DEPOSIT':
                    list = ['冻结服务保证金']
                    break;
                default:

                    break;
            }
            this.defaultList = this.feeTypes.reduce((acc, item) => {
                list.includes(item.feeTypeName) && acc.concat(item)
            }, [])


        }
    }
}
</script>
