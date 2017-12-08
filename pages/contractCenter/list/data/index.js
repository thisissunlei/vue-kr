{
    totalCount: 1,
        params: {
        page: 1,
            pageSize: 15,
                customerName: "",
                },
    joinData: [],
        openSearch: false,
            openNullify: false,
                joinOrder: [
                    {
                        title: '订单编号',
                        key: 'orderNum',
                        align: 'center'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align: 'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align: 'center'
                    },
                    {
                        title: '服务费总额',
                        key: 'rentAmount',
                        align: 'center'
                    },
                    {
                        title: '履约保证金',
                        key: 'depositAmount',
                        align: 'center'
                    },
                    {
                        title: '订单类型',
                        key: 'orderType',
                        align: 'center',
                        render(h, obj) {
                            if (obj.row.orderType === 'IN') {
                                return <span class="u-txt">入驻服务订单</span>;
                            } else if (obj.row.orderType === 'INCREASE') {
                                return <span class="u-txt-orange">增租服务订单</span>;
                            } else if (obj.row.orderType === 'CONTINUE') {
                                return <span class="u-txt-red">续租服务订单</span>;
                            } else if (obj.row.orderType === 'REDUCE') {
                                return <span class="u-txt-orange">减租服务订单</span>;
                            } else if (obj.row.orderType === 'LEAVE') {
                                return <span class="u-txt-red">退费离场服务订单</span>;
                            }
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align: 'center'
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align: 'center',
                        render(h, obj) {
                            let time = dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS", new Date(obj.row.ctime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openView(params)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openCancel(params)
                                        }
                                    }
                                }, '作废'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openEdit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openApplication(params)
                                        }
                                    }
                                }, '申请合同')
                            ]);
                        }
                    }
                ]
}