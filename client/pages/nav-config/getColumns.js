function columns(){
    return [
        {
            title: '编码',
            key: 'code'
        },
        {
            title: '名称',
            key: 'name'
        },
        {
            title: '分配人员',
            key: 'resources'
        },
        {
            title: '创建人',
            key: 'creator'
        },
        {
            title: '创建时间',
            key: 'cTime'
        },
        {
            title: '操作',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px',
                            color:'rgb(43, 133, 228)',
                            cursor:'pointer'
                        },
                        on: {
                            click: () => {
                                // this.editRoleid = params.id;

                                
                                this.$http.get('roledetail',{id:params.row.id}).then((res)=>{
                                    // console.log(res,params)

                                    this.formTop.name=params.row.name;
                                    this.formTop.code = params.row.code;
                                    this.roleEditS = res.data.groupList;
                                    
                                    this.goUpdateRole("编辑权限",params.row.id)
                                })
                             
                            }
                        }
                    }, '编辑权限'),
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small'
                         
                        },
                          style: {
                            marginRight: '5px',
                            color:'rgb(43, 133, 228)',
                            cursor:'pointer'
                        },
                        on: {
                            click: () => {
                                // console.log(params,'params')
                                this.roleid = params.row.id
                                //@click="instance('warning')"
                                this.instance('warning')
                            }
                        }
                    }, '删除'),
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small'
                           
                        },
                          style: {
                              color:'rgb(43, 133, 228)',
                            marginRight: '5px',
                            cursor:'pointer'
                        },
                        on: {
                            click: () => {
                                // this.editRoleid = params.id;
                                 this.goUpdatePerson(params.row.id)
                            }
                        }
                    }, '分配人员')

                ]);
            }
        }
    ]
}

export default {
    columns,
}