import dateUtils from 'vue-dateutils';
function initListData(){
    return [
        {
            title: '申请编号',
            key: 'applyNum',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all',
            render:(h,params)=>{
                let colData = params.row;
                return h('div',{
                    style: {
                        color:'#2b85e4'
                    },
                    on:{
                        click:()=>{
                            this.goAddPage(colData);
                        }
                    }
                }, params.row.applyNum)
            }
        },
        {
            title: '社区名称',
            key: 'communityName',
            align:'center',            
            type:'waitMake,alreadyMake,returnMake,all'
        },
        {
            title: '我司主体',
            align:'center',
            key: 'corporationName',
            type:'all'
        },
        {
            title: '发票抬头',
            key: 'invoiceTitle',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all',
            render:(h,obj)=>{
                if(obj.row.qualificationVO){
                    return obj.row.qualificationVO.invoiceTitle
                }else{
                    return '-'
                }
                 
            }
        },
        {
            title: '纳税人识别号',
            key: 'taxpayerNumber',
            align:'center',
            type:'waitMake,alreadyMake,all',
            render:(h,obj)=>{
                if(obj.row.qualificationVO){
                    return obj.row.qualificationVO.taxpayerNumber
                }else{
                    return '-'
                }
                 
            }
        },
        {
            title: '发票规格',
            key: 'invoiceTypeName',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all'
        },
        {
            title: '发票内容',
            key: 'invoiceDetailList',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all',
            render:(h,obj)=>{
                var arr=[];
              
                if( !obj.row.invoiceDetailList || !obj.row.invoiceDetailList.length){
                    return '-';
                }

                var detailList = [].concat(obj.row.invoiceDetailList)
                let line = detailList.length>1?'1px solid #e9eaec':'none'
                for(let i=0;i<detailList.length;i++){
                    arr.push(h('div', {
                        style: {
                            borderBottom:line,
                            padding:'8px 10px'
                        },
                        on: {
                            click: () => {
                                // this.openView()
                            }
                        }
                    }, detailList[i].contentTypeName))
                }

                return h('div',arr , '')
            }
        },
        {
            title: '开票金额',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all',
            render:(h,obj)=>{
                var arr=[];
              
                if( !obj.row.invoiceDetailList || !obj.row.invoiceDetailList.length){
                    return '-';
                }
                var detailList = [].concat(obj.row.invoiceDetailList)
                let line = detailList.length>1?'1px solid #e9eaec':'none'
                for(let i=0;i<detailList.length;i++){
                    arr.push(h('div', {
                        style: {
                            borderBottom:line,
                            padding:'8px 10px'
                        },
                        on: {
                            click: () => {
                                // this.openView()
                            }
                        }
                    }, detailList[i].amount))
                }
                return h('div',arr , '重开')
            }
        },
        {
            title: '需退发票金额',
            key: 'needRefund',
            align:'center',
            type:'returnMake'
        },
        {
            title: '实际退回发票金额',
            key: 'refund',
            align:'center',
            type:'returnMake'
        },
        {
            title: '备注',
            key: 'remark',
            align:'center',
            type:'waitMake,alreadyMake,all',
            render(tag, params){
                return params.row.remark || '无';
            }
        },
        {
            title: '申请时间',
            key: 'ctime',
            align:'center',
            type:'waitMake',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                return time;
            }
        },
        {
            title: '开票时间',
            key: 'name',
            align:'center',
            type:'alreadyMake,all',
            render(tag, params){
                if(params.row.ticketTime){
                    let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ticketTime));
                    return time;
                }else{
                    return '--'
                }
                
            }

        },
        {
            title: '退换时间',
            key: 'name',
            align:'center',
            type:'returnMake',
            render(tag, params){
                if(params.row.refundTime){
                   let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.refundTime));
                    return time; 
                }else{
                    return '--'
                }
                
            }
            
        },
        {
            title: '相关账单',
            key: 'billNUms',
            align:'center',
            type:'waitMake,alreadyMake,returnMake'
        },
        {
            title: '开票状态',
            key: 'invoiceStatusName',
            align:'center',
            type:'alreadyMake,all'
        },
        {
            title: '发票张数',
            key: 'invoiceCount',
            align:'center',
            type:'alreadyMake,all'
        },
       
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'returnMake',
            render:(h,params)=>{
               
                return h('div', [
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                color:'#2b85e4'
                            },
                            on: {
                                click: () => {
                                    this.goView(params.row)
                                }
                            }
                        }, '查看'),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                color:'#2b85e4'
                            },
                            on: {
                                click: () => {
                                    this.openSure(params.row)
                                }
                            }
                        }, '重开')
                       
                ]);  
              
            }
        },
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'waitMake',
            render:(h,params)=>{
                let colData = params.row;
                return h('div', [
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                color:'#2b85e4'
                            },
                            on: {
                                click: () => {
                                    this.openSure(colData)
                                }
                            }
                        }, '开票'),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                color:'#2b85e4'
                            },
                            on: {
                                click: () => {
                                    this.goBack(colData)
                                }
                            }
                        }, '退回') 
                ]);  
              
            }
        }

    ]
}
export default {initListData};