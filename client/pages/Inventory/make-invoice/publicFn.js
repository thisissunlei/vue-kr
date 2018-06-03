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
                            this.goAddPage();
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
                return params.row.invoiceTitle
            }
        },
        {
            title: '纳税人识别号',
            key: 'taxpayerNumber',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive'
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
                    return ;
                }
                var detailList = [].concat(obj.row.invoiceDetailList)
                for(let i=0;i<detailList.length;i++){
                    arr.push(h('div', {
                        style: {
                            borderBottom:'1px solid #e9eaec',
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
                    return ;
                }
                var detailList = [].concat(obj.row.invoiceDetailList)
                for(let i=0;i<detailList.length;i++){
                    arr.push(h('div', {
                        style: {
                            borderBottom:'1px solid #e9eaec',
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
            key: 'name',
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
            type:'waitArrive,waitMail,waitReceive'
        },
        {
            title: '开票时间',
            key: 'ctime',
            align:'center',
            type:'waitArrive,waitReceive,',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
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
                                    this.receivedClick()
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
                                    this.mailClick()
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
                                    this.goView()
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
                                    this.callbackClick()
                                }
                            }
                        }, '收回'),
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
                                    this.modifyClick()
                                }
                            }
                        }, '修改')  
                ]);  
              
            }
        }

    ]
}
function dateSwitch(params,type){
    var data = Object.assign({},params);
    var arr = ['ticketEndDate','ticketStartDate','receiveEndDate','receiveStartDate','callbackStartDate','callbackEndDate'];
    for(let i=0;i<arr.length;i++){
        // if(data[arr[i]]){
        //     data[arr[i]]
        // }
        if(data[arr[i]]){
            if(type == "init"){
                data[arr[i]] = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(+data[arr[i]]));
            }else if(type=='ms'){
                data[arr[i]] = new Date(+data[arr[i]] ).getTime()
            }else{
                data[arr[i]] = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(+data[arr[i]]));
            }
        }
       

       
    }
    return Object.assign(data);
}
export default {initListData,dateSwitch};