import dateUtils from 'vue-dateutils';
function initListData(){
    return [
        {
            title: '申请编号',
            key: 'applyNum',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn',
            render:(h,params)=>{
                return h('div',{
                    style: {
                        color:'#2b85e4'
                    },
                    on:{
                        click:()=>{
                            this.goView(params.row);
                        }
                    }
                },params.row.applyNum)
            }
        },
        {
            title: '社区名称',
            key: 'communityName',
            align:'center',            
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn'
        },
        {
            title: '发票抬头',
            key: 'invoiceTitle',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn',
            render:(h,params)=>{
               
                let {qualificationVO} =  params.row;
                if(!qualificationVO){
                    return '';
                }
                return qualificationVO.invoiceTitle
            }
        },
        {
            title: '纳税人识别号',
            key: 'taxpayerNumber',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive',
            render:(h,params)=>{
                let {qualificationVO} =  params.row;
                if(!qualificationVO){
                    return '';
                }
                return qualificationVO.taxpayerNumber;
            }
        },
        {
            title: '发票规格',
            key: 'invoiceTypeName',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn'
        },
        {
            title: '发票内容',
            key: 'invoiceDetailList',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn',
            render:(h,obj)=>{
                var arr=[];
              
                if( !obj.row.invoiceDetailList || !obj.row.invoiceDetailList.length){
                    return '--';
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
                return h('div',arr , '重开')
            }
        },
        {
            title: '开票金额',
            key: 'invoiceDetailList',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive',
            render:(h,obj)=>{
                var arr=[];
              
                if( !obj.row.invoiceDetailList || !obj.row.invoiceDetailList.length){
                    return '--';
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
                                //this.openView()
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
            type:'waitReturn'
        },
        {
            title: '实际退回发票金额',
            key: 'refund',
            align:'center',
            type:'waitReturn'
        },
        {
            title: '收回状态',
            key: 'invoiceStatusName',
            align:'center',
            type:'waitReturn'
        },
        {
            title: '领取人',
            key: 'receiverName',
            align:'center',
            type:'alreadyReceive'
        },
        {
            title: '领取时间',
            key: 'receiveTime',
            align:'center',
            type:'alreadyReceive',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                return time;
            }
        },
        {
            title: '发票张数',
            key: 'invoiceCount',
            align:'center',
            width:70,
            type:'waitArrive,waitMail,waitReceive'
        },
        {
            title: '开票时间',
            key: 'ctime',
            align:'center',
            type:'waitArrive,waitReceive,',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:ss",new Date(params.row.ctime));
                return time;
            }

        },
        {
            title: '回收时间',
            key: 'name',
            align:'center',
            type:'waitReturn',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                return time;
            }
            
        },
       
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'waitArrive',
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
                                    this.receivedClick(params.row)
                                }
                            }
                        }, '签收')
                ]);  
              
            }
        },
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'waitMail',
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
                                    this.mailClick(params.row)
                                }
                            }
                        }, '邮寄')
                ]);  
              
            }
        },
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'waitReturn',
            render:(h,params)=>{
                let colData = params.row;
                let arr = [
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
                                    this.goView(colData)
                                }
                            }
                        }, '查看') 
                ];
                
                if(colData.invoiceStatus == 'RECOVERYED'){
                    arr.push(h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                color:'#2b85e4'
                            },
                            on: {
                                click: () => {
                                    this.modifyClick(colData)
                                }
                            }
                        }, '修改') )
                }
                if(colData.invoiceStatus == 'RETURNING'){
                    arr.push(h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                color:'#2b85e4'
                            },
                            on: {
                                click: () => {
                                    this.callbackClick(colData)
                                }
                            }
                        }, '收回'),)
                }
               
                return h('div',arr );  
              
            }
        }

    ]
}
export default {initListData};