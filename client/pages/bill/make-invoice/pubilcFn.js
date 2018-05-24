import dateUtils from 'vue-dateutils';
function initListData(){
    return [
        {
            title: '申请编号',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all',
            render:(h,params)=>{
                // var arr=[];
                // for(let i=0;i<3;i++){
                //     arr.push(h('div', {
                //         style: {
                //             borderBottom:'1px solid #e9eaec',
                //             padding:'8px 10px'
                //         },
                //         on: {
                //             click: () => {
                //                 this.openView()
                //             }
                //         }
                //     }, '查看'),)
                // }
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
            key: 'name',
            align:'center',            
            type:'waitMake,alreadyMake,returnMake,all'
        },
        {
            title: '我司主体',
            align:'center',
            key: 'name',
            type:'all'
        },
        {
            title: '发票抬头',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all'
        },
        {
            title: '纳税人识别号',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'
        },
        {
            title: '发票规格',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all'
        },
        {
            title: '发票内容',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all',
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
            title: '开票金额',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all',
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
            type:'returnMake'
        },
        {
            title: '实际退回发票金额',
            key: 'name',
            align:'center',
            type:'returnMake'
        },
        {
            title: '税率',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'
        },
        {
            title: '税额',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'
        },
        {
            title: '不含税额',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'
        },
        {
            title: '备注',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'
        },
        {
            title: '退换状态',
            key: 'name',
            align:'center',
            type:'returnMake'
        },
        {
            title: '申请状态',
            key: 'name',
            align:'center',
            type:'all'
        },
        {
            title: '申请时间',
            key: 'name',
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
            type:'waitMake,alreadyMake,all',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                return time;
            }

        },
        {
            title: '退换时间',
            key: 'name',
            align:'center',
            type:'returnMake',
            render(tag, params){
                let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                return time;
            }
            
        },
        {
            title: '发票张数',
            key: 'name',
            align:'center',
            type:'alreadyMake'
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
                                    this.openView()
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
                                    this.openView()
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
                                    this.goBack()
                                }
                            }
                        }, '退回') 
                ]);  
              
            }
        }

    ]
}
export default {initListData};