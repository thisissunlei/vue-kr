import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
function initListData(type){
    return [
        {
            title:type=='getDetail'?'单据编号':'退款编号',
            key: 'recordNo',
            align:'center',
            type:'getDetail,refundDetail',
            render:(h,params)=>{
                let colData = params.row;
                return h('div',{
                    style: {
                        color:'#2b85e4',
                        cursor:'pointer'
                    },
                    on:{
                        click:()=>{
                            this.goView(params.row);
                        }
                    }
                }, params.row.recordNo)
            }
        },
        {
            title: '社区名称',
            key: 'cmtName',
            align:'center',            
            type:'getDetail,refundDetail,depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: '费用类型',
            key: 'feeTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail'
        },
        {
            title: '金额',
            key: 'amount',
            align:'right',
            className:'statusClass',
            type:'depositDetail,consumptionDetail,balanceDetail',
            render:(tag, params)=>{
                let newParam=params.row.amount;
                var end='';      
                if(newParam){
                    end='¥'+utils.thousand(newParam);
                }else{
                    end='-';
                }
                return tag('span',{},end)
            }
        },
        {
            title: '余额剩余',
            key: 'remainAmount',
            align:'right',
            className:'statusClass',
            type:'balanceDetail',
            render:(tag, params)=>{
                var end='';      
                if(params.row.remainAmount){
                    end='¥'+utils.thousand(params.row.remainAmount);
                }else{
                    end='-';
                }
                return tag('span',{},end)
            }
        },
        {
            title: '时间',
            key: 'operateTime',
            align:'center',
            type:'depositDetail,consumptionDetail',
            render:(h,params)=>{
                let date=params.row.operateTime?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.operateTime)):'';
                return h('span',{},date);
            }
        },
        {
            title: type=='balanceDetail'?'单据编号':'相关凭证',
            key: 'recordNo',
            align:'center',
            type:'depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: type=='balanceDetail'?'操作':'相关操作',
            key: 'operateTypeName',
            align:'center',
            type:'depositDetail,consumptionDetail,balanceDetail'
        },
        {
            title: type=='getDetail'?'打款方式':'退款方式',
            align:'center',
            key: 'payWayName',
            type:'getDetail,refundDetail'
        },
        {
            title: type=='getDetail'?'打款金额':'退款金额',
            align:'right',
            className:'statusClass',
            key: 'amount',
            type:'getDetail,refundDetail',
            render:(tag, params)=>{
                var end='';      
                if(params.row.amount){
                    end='¥'+utils.thousand(params.row.amount);
                }else{
                    end='-';
                }
                return tag('span',{},end)
            }
        },
        {
            title: type=='getDetail'?'账户名称':'退至账户',
            align:'center',
            key: 'acountName',
            type:'getDetail,refundDetail'
        },
        {
            title: type=='getDetail'?'打款日期':'退款日期',
            align:'center',
            key: 'occurDate',
            type:'getDetail,refundDetail',
            render:(h,params)=>{
                let date=params.row.occurDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.occurDate)):'';
                return h('span',{},date);
            }
        },
        {
            title: '操作时间',
            key: 'operateTime',
            align:'center',
            type:'getDetail,refundDetail,balanceDetail',
            render:(h,params)=>{
                let date=params.row.operateTime?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.operateTime)):'';
                return h('span',{},date);
            }
        },
        {
            title: '操作人员',
            key: 'operaterName',
            align:'center',
            type:'getDetail,refundDetail,depositDetail,consumptionDetail,balanceDetail'
        }
    ]
}

function dateFormat(array,params){
    let list={};
    array.map((item,index)=>{
       list[item]=params[item]?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params[item])):'';
    })
    return list;
}
export default {initListData,dateFormat};