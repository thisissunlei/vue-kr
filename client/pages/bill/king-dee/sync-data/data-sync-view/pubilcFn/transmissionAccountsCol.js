import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
//原始应收数据
function transmissionAccountsCol(){
    
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
            width:120,
        },
        {
            title: '客户ID',
            key: 'asstActNumber',
            align:'center',
            width:120,
        },
        {
            title: '收入类型',
            key: 'materialNumberDesc',
            align:'center',
            width:120,
        },
        {
            title: '收入ID',
            key: 'materialNumber',
            align:'center',
            width:120,
        },
        {
            title: '金额（含税）',
            key: 'arAmount',
            align:'center',
            width:120,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.arAmount))
             }
        },
        {
            title: '税率',
            key: 'taxRate',
            align:'center',
            width:120,
        },

        {
            title: '税额',
            key: 'taxAmount',
            align:'center',
            width:120,
        },
        {
            title: '金额（不含税）',
            key: 'amount',
            align:'center',
            width:120,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.amount))
             }
        },
        {
            title: '确认日期',
            key: 'bizDate',
            align:'center',
            width:150,
            render(tag, params){
                let time=params.row.bizDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.bizDate)):'-';
                return tag('span',time)
            }
        },
        {
            title: '含税单价',
            key: 'taxPrice',
            align:'center',
            width:120,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.taxPrice))
             }
        },
        {
            title: '不含税单价',
            key: 'price',
            align:'center',
            width:120,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.price))
             }
        },
        {
            title: '数量',
            align:'center',
            key: 'quantity',
            width:150,
        },
        {
            title: '销售类型',
            align:'center',
            key: 'bizTypeName',
            width:150,
        },
        {
            title: '核心单据号',
            key: 'coreBillNumber',
            align:'center',
            width:150,
        },
        {
            title: '唯一交易编码',
            key: 'number',
            align:'center',
            width:150,
        },
        {
            title: '备注',
            align:'center',
            key: 'remark',
            fixed:'right',
            width:150,
        },
    ]

}
export default transmissionAccountsCol;