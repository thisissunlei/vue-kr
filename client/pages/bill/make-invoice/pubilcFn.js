function initListData(){
    return [
        {
            title: '申请编号',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,returnMake,all'
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
            type:'waitMake,alreadyMake,returnMake,all'
        },
        {
            title: '金额',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'
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
            type:'waitMake'
        },
        {
            title: '开票时间',
            key: 'name',
            align:'center',
            type:'waitMake,alreadyMake,all'

        },
        {
            title: '退换时间',
            key: 'name',
            align:'center',
            type:'returnMake'
            
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
                                    this.openView()
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
                                    this.openView()
                                }
                            }
                        }, '退回') 
                ]);  
              
            }
        }

    ]
}
export default {initListData};