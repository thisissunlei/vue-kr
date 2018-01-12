<template>
    <div class='m-reduce-list'>
            <div class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="jumpReduce">减租</Button>
                    </div>

                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>客户名称</span>
                            <i-input 
                                v-model="params.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </div>
                        <div class='m-search' @click="submitLowerSearch">搜索</div>
                        <div class="m-bill-search" @click="showSearch">
                          <span/>  
                        </div> 
                   </div>
            </div>


            <Table :columns="joinOrder" :data="joinData" border class='list-table'/>
            <div style="margin: 10px 20px;overflow: hidden">
                    <Buttons label='导出'  type='primary' @click='submitExport' checkAction='order_seat_export'/>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' @on-change="onPageChange" show-total show-elevator/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch @bindData="onUpperChange" mask='reduce'/>
                <div slot="footer">
                    <Button type="primary" @click="submitUpperSearch">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
                </div>
            </Modal>

            <Modal
                v-model="openNullify"
                title="提示信息"
                width="500"
            >
                <Nullify/>
                <div slot="footer">
                    <Button type="primary" @click="submitNullify" :disabled="nullDisabled">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="closeNullify">取消</Button>
                </div>
            </Modal>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onMessageChange"
            />

            <Modal
                v-model="openApply"
                title="提示信息"
                width="500"
            >
                <ApplyContract/>
                <div slot="footer">
                    <Button type="primary" @click="submitApply" :disabled="applyDisabled">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="closeApply">取消</Button>
                </div>
            </Modal>

    </div>
</template>


<script>
    import HeightSearch from './heightSearch';
    import ApplyContract from './applyContract';
    import Nullify from './nullify';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';

    export default {
        name:'Reduce',
        components:{
            HeightSearch,
            Nullify,
            Message,
            Buttons,
            ApplyContract
        },
        data () {
            
            return {
                params:{
                    page:1,
                    pageSize:15,
                    customerName:"",
                },

                openMessage:false,
                nullDisabled:false,
                applyDisabled:false,
                warn:'',
                MessageType:'',
                upperData:{},
                upperError:false,
                totalCount:1,
                id:'',
                props:{},
                openSearch:false,
                openNullify:false,
                openApply:false,
                joinData:[],

                joinOrder: [
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
                        title: '减租开始日期',
                        key: 'startDate',
                        align:'center',
                        render(tag,params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate));
                            return time;
                        }
                    },
                    {
                        title: '减租金额',
                        key: 'rentAmount',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align:'center',
                        render(tag, params){
                             var orderStatus={
                               'NOT_EFFECTIVE':'未生效',
                               'EFFECTIVE':'已生效',
                               'INVALID':'已作废'
                            }
                            for(var item in orderStatus){
                                if(item==params.row.orderStatus){
                                    var style={};
                                    if(item=='NOT_EFFECTIVE'){
                                        style='u-red';
                                    }
                                    if(item=='INVALID'){
                                        style='u-nullify';
                                    }
                                    return <span class={`u-txt ${style}`}>{orderStatus[item]}</span>;
                                }
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align:'center',
                        render(tag, params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(tag,params)=>{
                           var btnRender=[
                               tag(Buttons, {
                                   props: {
                                        type: 'text',
                                        checkAction:'order_seat_show',
                                        label:'查看',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.jumpView(params)
                                        }
                                    }
                                })];
                           if(params.row.orderStatus=='NOT_EFFECTIVE'){
                               btnRender.push( 
                                tag('Button', {
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
                                }, '申请合同'),
                                tag('Button', {
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
                                tag('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.jumpEdit(params)
                                        }
                                    }
                                }, '编辑'))
                           }
                           return tag('div',btnRender);  
                        }
                    }
                ]
            }
        },

        created:function(){
            var params=Object.assign({},this.$route.query,{page:1,pageSize:15});
            this.getListData(params);
            this.params=params;
        },

        methods:{
            getListData(params){
                var _this=this;
                 this.$http.get('reduce-bill-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.openMessage=true;
                    _this.MessageType="error";
                    _this.warn=e.message;
                })   
            },

            submitNullify (){
                var _this=this;
                let params={
                    id:this.id
                };
                 if(this.nullDisabled){
                     return ;
                 }
                 this.nullDisabled=true;
                 this.closeNullify();
                 this.$http.post('join-nullify', params, r => {
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn='作废成功';
                    this.getListData(this.params);
                }, e => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                }) 
            },
            
            submitApply(){
                let params={
                    id:this.id
                };   
                if(this.applyDisabled){
                    return ;
                }  
                 this.applyDisabled=true;
                 this.closeApply();
                 this.$http.post('apply-contract', params, r => {
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn='申请成功';
                    this.getListData(this.params);
                }, e => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                })   
            },

            submitLowerSearch(){
                 utils.addParams(this.params);
            },

            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.page=1;
                this.params.pageSize=15;
                this.params.cStartDate=this.params.cStartDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cStartDate)):'';
                this.params.cEndDate=this.params.cEndDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cEndDate)):'';
                this.params.mask='reduce';
                utils.addParams(this.params);
            },

            submitExport (){
                this.props=Object.assign({},this.props,this.params);
                utils.commonExport(this.props,'/api/krspace-op-web/order-seat-reduce/export');
            },

            onPageChange (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },

            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },

            onKeyEnter: function (ev) {
                this.submitLowerSearch();
            },

            onMessageChange(data){
                this.openMessage=data;
            },

            showSearch () {
                this.openSearch=!this.openSearch;
            },

            showNullify(params){
                this.id=params.row.id;
                this.closeNullify();
            },

            jumpReduce(){
                utils.addParams({mask:'reduce'});
                window.open('/order-center/order-manage/station-order-manage/create/reduce','_blank')
            },

            jumpEdit(params){
                utils.addParams({mask:'reduce'});
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/reduce`,'_blank')
            },

            showApply(params){
                this.id=params.row.id;
                this.closeApply();
            },

            jumpView(params){
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/reduceView`,'_blank');
            },

            closeNullify(){
                this.openNullify=!this.openNullify;
                this.nullDisabled=false;
            },

            closeApply(){
                this.openApply=!this.openApply;
                this.applyDisabled=false;
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-reduce-list{
        .list-banner{
            width:100%;
            padding:0 0 0 20px;
            .list-btn{
                display:inline-block;
                width:20%;
            }
            .list-search{
                margin-bottom:10px;
                display:inline-block;
                width:80%;
                text-align:right;
                .lower-search{
                    display:inline-block;
                    margin:10px 20px;
                }
            }
        }
        .list-table{
            margin:20px;
            margin-top:0px;
        }
        .list-footer{
            margin: 10px 20px;
            overflow: hidden;
        }
   }
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
     .u-red{
         color:red;
     }
     .u-nullify{
         text-decoration: line-through;
     }
</style>