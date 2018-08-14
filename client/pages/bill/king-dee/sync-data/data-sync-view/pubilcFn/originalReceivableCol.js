import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
//原始回款数据
function originalReceivableCol(){
    return [
        {
            title: '客户姓名',
            align:'center',
            key: 'customerName',
        },
        {
            title: '所在社区',
            key: 'communityName',
            align:'center',            
           
        },
        {
            title: '回款金额',
            key: 'amount',
            align:'center',
            render:function(h,params){
                return h('span',{},utils.thousand(params.row.amount))
             }
        },
        {
            title: '发生日期',
            key: 'occurDate',
            align:'center',
            render(tag, params){
                let time=params.row.occurDate? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.occurDate)):'-';
                return time;
            }
        },
        {
            title: '费用类型名称',
            key: 'feeTypeName',
            align:'center',
        },
        {
            title: '支付方式名称',
            key: 'payWayName',
            align:'center',
        },
        {
            title: '备注 ',
            key: 'remark',
            align:'center',
            
        },
        {
            title:'原始数据id',
            key: 'paymentId',
            align:'center',
            
        },
        // {
        //     title: '同步状态名称',
        //     key: 'syncStatusName',
        //     align:'center',
            
        // }
    ]

}
export default originalReceivableCol;