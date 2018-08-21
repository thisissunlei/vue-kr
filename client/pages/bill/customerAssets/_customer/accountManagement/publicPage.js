import dateUtils from 'vue-dateutils';
function initListData(type){
    return [
        {
            title:type=='getDetail'?'单据编号':'退款编号',
            key: 'applyNum',
            align:'center',
            type:'getDetail,refundDetail',
            render:(h,params)=>{
                let colData = params.row;
                return h('div',{
                    style: {
                        color:'#2b85e4'
                    },
                    on:{
                        click:()=>{
                            this.goView(params.row);
                        }
                    }
                }, params.row.applyNum)
            }
        },
        {
            title: '社区名称',
            key: 'communityName',
            align:'center',            
            type:'getDetail,refundDetail,depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: '费用类型',
            key: 'invoiceTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail'
        },
        {
            title: '金额',
            key: 'invoiceTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: '时间',
            key: 'invoiceTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail'
        },
        {
            title: type=='balanceDetail'?'单据编号':'相关凭证',
            key: 'invoiceTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: type=='balanceDetail'?'操作':'相关操作',
            key: 'invoiceTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: type=='getDetail'?'打款方式':'退款方式',
            align:'center',
            key: 'corporationName',
            type:'getDetail,refundDetail'
        },
        {
            title: type=='getDetail'?'打款金额':'退款金额',
            align:'center',
            key: 'corporationName',
            type:'getDetail,refundDetail'
        },
        {
            title: type=='getDetail'?'账户名称':'退至账户',
            align:'center',
            key: 'corporationName',
            type:'getDetail,refundDetail'
        },
        {
            title: type=='getDetail'?'打款日期':'退款日期',
            align:'center',
            key: 'corporationName',
            type:'getDetail,refundDetail'
        },
        {
            title: '操作时间',
            key: 'invoiceTypeName',
            align:'center',
            type:'getDetail,refundDetail,balanceDetail'
        },
        {
            title: '操作人员',
            key: 'invoiceTypeName',
            align:'center',
            type:'getDetail,refundDetail,depositDetail,consumptionDetail,balanceDetail'
        }
    ]
}
export default {initListData};