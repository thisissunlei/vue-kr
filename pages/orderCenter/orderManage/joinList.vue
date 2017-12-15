<template>
    <div class='m-bill-list'>
            
            <div style='width:100%;padding:0 0 0 10px;'>
                    <div style='display:inline-block;width:20%;'>
                        <Button type="primary" @click="showJoin" style='margin-right:30px;'>入驻</Button>
                        <Button type="primary" @click="showRenew">续租</Button>
                    </div>

                    <div style='margin-bottom:10px;display:inline-block;width:80%;text-align:right;'>
                         <div style='display:inline-block;margin:10px 20px;'>
                            <span style='padding-right:10px'>客户名称</span>
                            <i-input 
                                v-model="params.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @on-change="lowerChange"
                            ></i-input>
                        </div>
                        <div class='m-search' @click="lowerSubmit">搜索</div>
                        <div class="m-bill-search" @click="showSearch">
                          <span></span>   
                        </div> 
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border  @on-selection-change='checkboxChange'></Table>
            <div style="margin: 10px;overflow: hidden">
                    <Button type="primary" @click="outSubmit">导出</Button>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' @on-change="changePage" show-total show-elevator></Page>
                    </div>
            </div>
            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch v-on:bindData="upperChange" mask='join'></HeightSearch>
                <div slot="footer">
                    <Button type="primary" @click="upperSubmit">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
                </div>
            </Modal>
            <Modal
                v-model="openNullify"
                title="提示信息"
                @on-ok="nullifySubmit"
                width="500"
            >
                <Nullify></Nullify>
            </Modal>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                v-on:changeOpen="onChangeOpen"
            ></Message>
    </div>
</template>


<script>
    import HeightSearch from './heightSearch';
    import Nullify from './nullify';
    import dateUtils from 'vue-dateutils';
    import CommonFuc from 'kr/utils';
    import Message from '~/components/Message';
    

    export default {
        name:'join',
        components:{
            HeightSearch,
            Nullify,
            Message
        },
        data () {
            
            return {
                openMessage:false,
                warn:'',
                MessageType:'',
                upperData:{},
                upperError:false,
                totalCount:1,
                id:'',
                props:{},
                params:{
                    page:1,
                    pageSize:15,
                    customerName:"",
                },
                joinData:[],
                openSearch:false,
                openNullify:false,
                joinOrder: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '订单编号',
                        key: 'orderNum',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '服务费总额',
                        key: 'rentAmount',
                        align:'center'
                    },
                    {
                        title: '履约保证金',
                        key: 'depositAmount',
                        align:'center'
                    },
                    {
                        title: '订单类型',
                        key: 'orderType',
                        align:'center',
                        render(h, obj){
                            if(obj.row.orderType==='IN'){
                                return <span class="u-txt">入驻服务订单</span>;
                            }else if(obj.row.orderType==='INCREASE'){
                                return <span class="u-txt-orange">增租服务订单</span>;
                            }else if(obj.row.orderType==='CONTINUE'){
                                return <span class="u-txt-red">续租服务订单</span>;
                            }
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align:'center',
                        render(h, obj){
                            if(obj.row.orderStatus==='NOT_EFFECTIVE'){
                                return <span class="u-txt">未生效</span>;
                            }else if(obj.row.orderStatus==='EFFECTIVE'){
                                return <span class="u-txt-orange">已生效</span>;
                            }else if(obj.row.orderStatus==='INVALID'){
                                return <span class="u-txt-red">已作废</span>;
                            }
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                            if(obj.row.payStatus==='WAIT_PAY'){
                                return <span class="u-txt">待支付</span>;
                            }else if(obj.row.payStatus==='COMPLETE'){
                                return <span class="u-txt-orange">已付清</span>;
                            }else if(obj.row.payStatus==='UN_COMPLETE'){
                                return <span class="u-txt-red">未付清</span>;
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.ctime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(h,params)=>{
                           var btnRender=[
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
                                            this.showView(params)
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
                                            this.showApply(params)
                                        }
                                    }
                                }, '申请合同')];
                           if(params.row.orderStatus=='NOT_EFFECTIVE'){
                               btnRender.push(h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.showNullify(params)
                                        }
                                    }
                                }, '作废'),
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
                                            this.showEdit(params)
                                        }
                                    }
                                }, '编辑'))
                           }
                           return h('div',btnRender);  
                        }
                    }
                ]
            }
        },
        mounted:function(){
            this.getListData(this.params);
        },
        methods:{
            showSearch () {
                this.openSearch=!this.openSearch;
                CommonFuc.clearForm(this.upperData);
            },
            showJoin(){
                window.open('/orderCenter/orderManage/create/join','_blank')
            },
            showRenew(){
                window.open('/orderCenter/orderManage/create/renew','_blank')
            },
            showApply(params){
                window.open(`/contractCenter/${params.row.id}/viewCenter`,'_blank');
            },
            showView(params){
                var viewName='';
                if(params.row.orderType=='CONTINUE'){
                    viewName='renewView';  
                }else{
                    viewName='joinView';   
                }
                window.open(`/orderCenter/orderManage/${params.row.id}/${viewName}`,'_blank');
            },
            showNullify(params){
                this.id=params.row.id;
                this.openNullify=true;
            },
            showEdit(params){
                let type = '';
                switch (params.row.orderType){
                    case 'IN':
                        type = 'join';
                        break;
                    case 'INCREASE':
                        type = 'join';
                        break;
                    case 'CONTINUE':
                        type = 'renew';
                        break;
                    default:
                        type = 'join';
                        break;
                }
                window.open(`/orderCenter/orderManage/${params.row.id}/${type}`,'_blank')
            },
            nullifySubmit (){
                let params={
                    id:this.id
                };
                 this.$http.post('join-nullify', params, r => {
                    this.MessageType=r.message=='ok'?"success":"error";
                    this.warn=r.message;
                    this.openMessage=true;
                    this.getListData(this.params);
                }, e => {
                    this.MessageType="error";
                    this.warn=e.message;
                    this.openMessage=true;
                })   
            },
            outSubmit (){
                this.props=Object.assign({},this.props,this.params);
                CommonFuc.commonExport(this.props,'/api/krspace-op-web/order-seat-add/export');
            },
            getListData(params){
                var _this=this;
                 this.$http.get('join-bill-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.$Message.info(e);
                })   
            },
            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },
            checkboxChange(params){
                var ids=[];
                params&&params.map((item,index)=>{
                    ids.push(item.id);
                })
                this.props.ids=ids;
            },
            lowerChange(param){
                this.params.customerName=param.target.value;
            },
            lowerSubmit(){
                this.getListData(this.params);
            },
            upperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },
            upperSubmit(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.cStartDate=this.params.cStartDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cStartDate)):'';
                this.params.cEndDate=this.params.cEndDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cEndDate)):'';
                this.getListData(this.params);
            },
            onChangeOpen(data){
                this.openMessage=data;
            },
        }
    }
</script>

<style lang='less'>
 .m-bill-search{
        display:inline-block;
        height:22px;
        margin:16px 20px;
        vertical-align: bottom;
        span{
            width:22px;
            height:22px;
            background:url('~assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
            cursor:pointer;
        }
    }
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
</style>