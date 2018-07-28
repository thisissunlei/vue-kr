import dateUtils from 'vue-dateutils';
//原始应收数据
function transmissionAccountsCol(){
    
    return [
        {
            title: '金额',
            key: 'amount',
            align:'center'
        },
        {
            title: '税金额',
            key: 'arAmount',
            align:'center',
        },
        {
            title: '客户编码',
            align:'center',
            key: 'asstActNumber',
        },
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
        {
            title: '普通销售/普通销售退 ',
            key: 'bizTypeName',
            align:'center'

        },
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
            title: '销售合同行号',
            key: 'contractNumber',
            align:'center'
        },
        {
            title: '核心单据号',
            key: 'coreBillNumber',
            align:'center'
        },
        {
            title: '成本中心',
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
        {
            title: '原始数据id',
            key: 'incomeId',
            align:'center',
        },
        {
            title: '物料编码(OP系统的收入类型) ',
            key: 'materialNumber',
            align:'center',
        },
        {
            title: '唯一交易编码(OP系统的交易ID)',
            key: 'number',
            align:'center',
        },
        {
            title: '不含税单价',
            key: 'price',
            align:'center',
        },
        {
            title: '同步记录id',
            key: 'syncDataId',
            align:'center',
        },
        {
            title: '同步状态名称',
            key: 'syncStatusName',
            align:'center',
        },
        {
            title: '税额',
            key: 'taxAmount',
            align:'center',
        },
        {
            title: '含税单价(正数)',
            key: 'taxPrice',
            align:'center',
        },
        {
            title: '税率',
            key: 'taxRate',
            align:'center',
        }

    ]

}
export default transmissionAccountsCol;