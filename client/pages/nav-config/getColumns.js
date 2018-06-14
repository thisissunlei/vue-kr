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
            title: '操作人',
            key: 'creator'
        },
        {
            title: '操作时间',
            key: 'cTime'
        },
        {
            title: '操作',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                        },
                        style: {
                            marginRight: '5px',
                            cursor:'pointer'
                        },
                        on: {
                            click: () => {
                                this.goUpdateRole("编辑权限")
                            }
                        }
                    }, '编辑权限'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small',
                         
                        },
                          style: {
                            marginRight: '5px',
                            cursor:'pointer'
                        },
                        on: {
                            click: () => {
                                //@click="instance('warning')"
                                this.instance('warning')
                            }
                        }
                    }, '删除'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small',
                           
                        },
                          style: {
                            marginRight: '5px',
                            cursor:'pointer'
                        },
                        on: {
                            click: () => {
                                 this.goUpdatePerson()
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