import dateUtils from 'vue-dateutils';
//原始应收数据
function transmissionReceivableCol(){
    
    return [
        {
            title: '金额',
            key: 'amount',
            align:'center',
            fixed:'left',
            width:150
        },
        // {
        //     title: '税金额',
        //     key: 'arAmount',
        //     align:'center',
        //     fixed:'left',
        //     width:150
        // },
        // {
        //     title: '客户编码',
        //     align:'center',
        //     key: 'asstActNumber',
        // },
        {
            title: '业务日期',
            key: 'bizDate',
            align:'center',
            
            render(tag, params){
                let time=params.row.bizDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.bizDate)):'-';
                return time;
            }
        },
        {
            title: '业务员姓名',
            key: 'bizPerson',
            align:'center',
        },
        // {
        //     title: '普通销售/普通销售退 ',
        //     key: 'bizTypeName',
        //     align:'center'

        // },
        {
            title: '所在社区',
            key: 'communityName',
            align:'center',
           
        },
        {
            title: '财务组织编码',
            key: 'companyNumber',
            align:'center'
        },
        {
            title: '合同编号',
            key: 'contractNumber',
            align:'center'
        },
        {
            title: '订单编号',
            key: 'coreBillNumber',
            align:'center'
        },
        {
            title: 'OP系统的社区编码',
            key: 'costCenteNumber',
            align:'center'
        },
        {
            title: '币别',
            key: 'currency',
            align:'center',
        },
        {
            title: '客户姓名',
            key: 'customerName',
            align:'center',
        },
        {
            title: '失败消息',
            key: 'failedMsg',
            align:'center',
        },
        // {
        //     title: '原始数据id',
        //     key: 'incomeId',
        //     align:'center',
        // },
        // {
        //     title: '物料编码(OP系统的收入类型) ',
        //     key: 'materialNumber',
        //     align:'center',
        // },
        {
            title: '唯一交易编码(OP系统的交易ID)',
            key: 'number',
            align:'center',
        },
        {
            title: '付款账号',
            key: 'payerAccountBank',
            align:'center',
        },
        {
            title: '客户（供应商）编码',
            key: 'payerNumber',
            align:'center',
        },
        {
            title: '付款人类型名称 ',
            key: 'payerTypeName',
            align:'center',
        },
        {
            title: '银行收款账号',
            key: 'recAccountBank',
            align:'center',
        },
        {
            title: '收款类型',
            key: 'recBillType',
            align:'center',
        },
        {
            title: '备注',
            key: 'remark',
            align:'center',
        },
        {
            title: '重复状态名称',
            key: 'repeatStatusName',
            align:'center',
        },
        {
            title: '结算方式',
            key: 'settlementType',
            align:'center',
        },{
            title: '同步记录id',
            key: 'syncDataId',
            align:'center',
        },{
            title: '同步状态名称',
            key: 'syncStatusName',
            align:'center',
        }

    ]

}
export default transmissionReceivableCol;