import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
//原始应收数据
function transmissionReceivableCol(){
    
    return [
        {
            title: '已传递',
            key: 'syncStatusName',
            align:'center',
            fixed:'left',
            width:120,
            render:function(h,params){
                let status = params.row.syncStatusName;
                if(status ==='已经同步'){
                    return h('span',{style:{color:'red'}},status)
                }
                return h('span',{},status)
             }
        },
        {
            title: '社区名称',
            key: 'communityName',
            align:'center',
            width:120,
        },
        {
            title: '主体',
            key: 'companyNumberName',
            align:'center',
            width:120,
        },
        {
            title: '主体ID',
            key: 'companyNumber',
            align:'center',
            width:120,
        },
        {
            title: '客户',
            key: 'customerName',
            align:'center',
            width:150,
        },
        {
            title: '客户ID',
            key: 'payerNumber',
            align:'center',
            width:150,
        },
        {
            title: '收款类型',
            key: 'entrysRecBillNumberDesc',
            align:'center',
            width:150,
        },
        {
            title: '结算方式',
            key: 'settlementTypeDesc',
            align:'center',
            width:150,
        },
        {
            title: '金额',
            key: 'amount',
            align:'center',
            width:150,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.amount))
             }
        },
        {
            title: '回款日期',
            key: 'bizDate',
            align:'center',
            width:150,
            render(tag, params){
                let time=params.row.bizDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.bizDate)):'-';
                return tag('span',time)
            }
        },
        {
            title: '唯一交易编码',
            key: 'number',
            align:'center',
            width:150,
        },
        {
            title: '付款人类型',
            key: 'payerTypeName',
            align:'center',
            width:150,
        },
        {
            title: '收款账号',
            key: 'recAccountBank',
            align:'center',
            width:150,
        },
        {
            title: '备注',
            key: 'remark',
            align:'center',
            fixed:'right',
            width:150,
        },
    ]
}
export default transmissionReceivableCol;