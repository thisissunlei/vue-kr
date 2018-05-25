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
                }, 'dfsf')
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
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn'
        },
        {
            title: '纳税人识别号',
            key: 'taxpayerNumber',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive'
        },
        {
            title: '发票规格',
            key: 'invoiceType',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn'
        },
        {
            title: '发票内容',
            key: 'name',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn',
            render:(h,params)=>{
                var arr=[];
                console.log(params,"-----")
                for(let i=0;i<3;i++){
                    arr.push(h('div', {
                        style: {
                            borderBottom:'1px solid #e9eaec',
                            padding:'8px 10px'
                        },
                        on: {
                            click: () => {
                                this.openView()
                            }
                        }
                    }, '查看'),)
                }
                return h('div',arr , '重开')
            }
        },
        {
            title: '开票金额',
            key: 'name',
            align:'center',
            type:'waitArrive,waitMail,waitReceive,alreadyReceive',
            render:(h,params)=>{
                var arr=[];
                for(let i=0;i<3;i++){
                    arr.push(h('div', {
                        style: {
                            borderBottom:'1px solid #e9eaec',
                            padding:'8px 10px'
                        },
                        on: {
                            click: () => {
                                this.openView()
                            }
                        }
                    }, '查看'),)
                }
                return h('div',arr , '重开')
            }
        },
        {
            title: '需退发票金额',
            key: 'name',
            align:'center',
            type:'waitReturn'
        },
        {
            title: '实际退回发票金额',
            key: 'name',
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
            key: 'name',
            align:'center',
            type:'alreadyReceive'
        },
        {
            title: '领取时间',
            key: 'name',
            align:'center',
            type:'alreadyReceive',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                return time;
            }
        },
        {
            title: '发票张数',
            key: 'name',
            align:'center',
            type:'waitArrive,waitMail,waitReceive'
        },
        {
            title: '开票时间',
            key: 'name',
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
                                    this.openView()
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
                                    this.openView()
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
                                    this.makeInvaice()
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
                                    this.goBack()
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
                                    this.goBack()
                                }
                            }
                        }, '修改')  
                ]);  
              
            }
        }

    ]
}
export default {initListData};