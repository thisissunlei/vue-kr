import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
//原始应收数据
function originalAccountsCol(){
    
    return [
        {
            title: '客户姓名',
            key: 'customerName',
            align:'center',
        },
        {
            title: '所在社区',
            key: 'communityName',
            align:'center',
        },
        {
            title: '日租金',
            key: 'amount',
            align:'center',
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.amount))
             }
        },
        // {
        //     title: '账单id',
        //     key: 'billId',
        //     align:'center',            
           
        // },
        // {
        //     title: '社区id',
        //     align:'center',
        //     key: 'communityId',
        // },
       
        // {
        //     title: '操作人',
        //     key: 'operatorName',
        //     align:'center'
        // },
       
        {
            title: '收入确认日期 ',
            key: 'dealDate',
            align:'center',
            render(tag, params){
                let time=params.row.dealDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.dealDate)):'-';
                return time;
            }
            
        },
        {
            title: '收入类型',
            key: 'incomeTypeDesc',
            align:'center',
            
        },
        {
            title: '同步记录id',
            key: 'syncDataId',
            align:'center',
            
        },
        // {
        //     title: '同步状态',
        //     key: 'syncStatusName',
        //     align:'center',
            
        // },
        // {
        //     title: '版本号',
        //     key: 'version',
        //     align:'center',
        // }
    ]

}
export default originalAccountsCol;