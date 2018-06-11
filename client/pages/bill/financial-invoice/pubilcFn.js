import dateUtils from 'vue-dateutils';
function initListData(){
    let that = this;
    return [
        {
            title: '申请编号',
            key: 'applyNo',
            align:'center',
            type:'VERIFYING,PASSED',
        },
        {
            title: '单位名称',
            key: 'invoiceTitle',
            align:'center',            
            type:'VERIFYING,PASSED'
        },
        {
            title: '单位类别',
            align:'center',
            key: 'titleType',
            type:'VERIFYING,PASSED',
            render(tag, params){
                let val= that.unitTypeToStr(params.row.titleType);
                return val;
            }
        },
        {
            title: '纳税类型',
            key: 'taxpayerType',
            align:'center',
            type:'VERIFYING,PASSED',
            render(tag, params){
                let val= that.taxTypeToStr(params.row.taxpayerType);
                return val;
            }
        },
        {
            title: '纳税人识别码',
            key: 'taxpayerNumber',
            align:'center',
            type:'VERIFYING,PASSED',
            render:(h,params)=>{
                let {qualificationVO} =  params.row;
                if(!qualificationVO){
                    return '';
                }
                return qualificationVO.taxpayerNumber;
            }
        },
        {
            title: '注册地址',
            key: ' registerAddress',
            align:'center',
            type:'VERIFYING,PASSED'
        },
        {
            title: '注册电话',
            key: 'registerPhone',
            align:'center',
            type:'VERIFYING,PASSED',
        },
        {
            title: '开户银行',
            key: 'bank',
            align:'center',
            type:'VERIFYING,PASSED',
        },
        {
            title: '银行账户',
            key: 'bankAccount',
            align:'center',
            type:'VERIFYING,PASSED'
        },
        {
            title: '提交时间',
            key: 'ctime',
            align:'center',
            type:'VERIFYING',
            render(tag, params){
                let time=params.row.ctime?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime)):'-';
                return time;
            }
        },
        {
            title: '确认时间',
            key: 'verifyTime',
            align:'center',
            type:'PASSED',
            render(tag, params){
                let time=params.row.verifyTime?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.verifyTime)):'-';
                return time;
            }
        },
        {
            title: '确认人员',
            key: 'verifyUser',
            align:'center',
            type:'PASSED'
        },
        {
            title: '操作',
            key: 'name',
            align:'center',
            type:'VERIFYING',
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
                                    that.goView(colData)
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
                                    that.makeSure(colData)
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
                                    that.cancel(colData)
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
            type:'PASSED',
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
                                    that.goView(colData)
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
                                    that.goEdit(colData)
                                }
                            }
                        }, '编辑') 
                ]);  
              
            }
        }

    ]
}
export default {initListData};