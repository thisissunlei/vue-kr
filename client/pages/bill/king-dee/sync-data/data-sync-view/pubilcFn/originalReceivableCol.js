import dateUtils from 'vue-dateutils';
//原始回款数据
function originalReceivableCol(){
    return [
        {
            title: '日租金',
            key: 'amount',
            align:'center',
            
        },
        {
            title: '所在社区',
            key: 'communityName',
            align:'center',            
           
        },
        {
            title: '客户姓名',
            align:'center',
            key: 'customerName',
        },
        {
            title: '费用类型名称',
            key: 'feeTypeName',
            align:'center',
        },
        {
            title: '发生日期',
            key: 'occurDate',
            align:'center',
            render(tag, params){
                let time=params.row.occurDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(params.row.occurDate)):'-';
                return time;
            }
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
            title: '同步状态名称',
            key: 'syncStatusName',
            align:'center',
            
        }
    ]

}
export default originalReceivableCol;