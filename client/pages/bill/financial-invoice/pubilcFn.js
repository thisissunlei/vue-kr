import dateUtils from 'vue-dateutils';
function initListData(){
    return [
        {
            title: '申请编号',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit,returnMake,all',
        },
        {
            title: '单位名称',
            key: 'name',
            align:'center',            
            type:'waitAudit,alreadyAudit,returnMake,all'
        },
        {
            title: '单位类别',
            align:'center',
            key: 'name',
            type:'waitAudit,alreadyAudit'
        },
        {
            title: '纳税类型',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit'
        },
        {
            title: '纳税人识别码',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit'
        },
        {
            title: '注册地址',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit'
        },
        {
            title: '注册电话',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit',
        },
        {
            title: '开户银行',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit',
        },
        {
            title: '银行账户',
            key: 'name',
            align:'center',
            type:'waitAudit,alreadyAudit'
        },
        {
            title: '提交时间',
            key: 'name',
            align:'center',
            type:'waitAudit'
        },
        {
            title: '确认时间',
            key: 'name',
            align:'center',
            type:'alreadyAudit'
        },
        {
            title: '确认人员',
            key: 'name',
            align:'center',
            type:'alreadyAudit'
        },
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'waitAudit',
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
                        }, '确认'),
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
                        }, '驳回')
                       
                ]);  
              
            }
        },
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'alreadyAudit',
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
                        }, '编辑') 
                ]);  
              
            }
        }

    ]
}
export default {initListData};