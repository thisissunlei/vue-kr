import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
//原始应收数据
function transmissionAccountsCol(){
    
    return [
        {
            title: '金额',
            key: 'amount',
            align:'center',
            fixed:'left',
            width:150,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.amount))
             }
        },
        {
            title: '税金额',
            key: 'arAmount',
            align:'center',
            width:150,
            fixed:'left',
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.arAmount))
             }
        },
        {
            title: '客户编码',
            align:'center',
            key: 'asstActNumber',
            width:150,
        },
        {
            title: '业务日期',
            key: 'bizDate',
            align:'center',
            width:150,
            render(tag, params){
                let time=params.row.bizDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.bizDate)):'-';
                return time;
            }
        },
        // {
        //     title: '业务员姓名',
        //     key: 'bizPerson',
        //     align:'center',
        //     width:150,
        // },
        {
            title: '普通销售/普通销售退 ',
            key: 'bizTypeName',
            align:'center',
            width:150,
        },
        // {
        //     title: '所在社区',
        //     key: 'communityName',
        //     align:'center',
        //     width:150,
        // },
        {
            title: '财务组织编码',
            key: 'companyNumber',
            align:'center',
            width:150,
        },
        // {
        //     title: '销售合同行号',
        //     key: 'contractNumber',
        //     align:'center',
        //     width:150,
        // },
        {
            title: '核心单据号',
            key: 'coreBillNumber',
            align:'center',
            width:150,
        },
        {
            title: '成本中心',
            key: 'costCenterNumber',
            align:'center',
            width:150,
        },
        // {
        //     title: '货币类型',
        //     key: 'currency',
        //     align:'center',
        //     width:150,
        // },
        {
            title: '客户姓名',
            key: 'customerName',
            align:'center',
            width:150,
        },
       
        {
            title: '原始数据id',
            key: 'incomeId',
            align:'center',
            width:150,
        },
        {
            title: '物料编码(OP系统的收入类型) ',
            key: 'materialNumber',
            align:'center',
            width:150,
        },
        {
            title: '唯一交易编码(OP系统的交易ID)',
            key: 'number',
            align:'center',
            width:150,
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
        // {
        //     title: '同步记录id',
        //     key: 'syncDataId',
        //     align:'center',
        //     width:120,
        // },
        
        {
            title: '税额',
            key: 'taxAmount',
            align:'center',
            width:120,
        },
        {
            title: '含税单价(正数)',
            key: 'taxPrice',
            align:'center',
            width:120,
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.taxPrice))
             }
        },
        {
            title: '税率',
            key: 'taxRate',
            align:'center',
            width:120,
        },
        {
            title: '同步状态',
            key: 'syncStatusName',
            align:'center',
            fixed:'right',
            width:120,
        },
        {
            title: '失败消息',
            key: 'failedMsg',
            align:'center',
            fixed:'right',
            width:200,
        },
    ]

}
export default transmissionAccountsCol;