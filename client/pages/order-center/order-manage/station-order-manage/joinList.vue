<template>
    <div class='m-join-list'>
            
            <div class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="showJoin" class='join-btn'>入驻</Button>
                        <Button type="primary" @click="showRenew">续租</Button>
                    </div>

                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>客户名称</span>
                            <i-input 
                                v-model="params.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="showKey($event)"
                            />
                         </div>
                         <div class='m-search' @click="lowerSubmit">搜索</div>
                         <div class="m-bill-search" @click="showSearch">
                           <span/>
                         </div> 
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border  class='list-table'/>
            <div  class='list-footer'>
                    <Buttons label='导出'  type='primary' @click='outSubmit' checkAction='order_seat_export'/>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' @on-change="changePage" show-total show-elevator/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch @bindData="upperChange" mask='join'/>
                <div slot="footer">
                    <Button type="primary" @click="upperSubmit">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
                </div>
            </Modal>
            
            <Modal
                v-model="openNullify"
                title="提示信息"
                @on-ok="nullifySubmit"
                width="500"
            >
                <Nullify/>
            </Modal>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onChangeOpen"
            />

            <Modal
                v-model="openApply"
                title="提示信息"
                @on-ok="applySubmit"
                width="500"
            >
                <ApplyContract/>
            </Modal>

    </div>
</template>


<script>
    import HeightSearch from './heightSearch';
    import Nullify from './nullify';
    import ApplyContract from './applyContract';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    

    export default {
        name:'Join',
        components:{
            HeightSearch,
            Nullify,
            Message,
            Buttons,
            ApplyContract
        },
        data () {
            
            return {
                openMessage:false,

                warn:'',

                MessageType:'',

                upperData:{},

                upperError:false,

                id:'',

                props:{},

                totalCount:1,

                params:{
                    page:1,
                    pageSize:15,
                    customerName:"",
                },

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
                        render(tag,params){
                            var orderType={
                               'IN':'入驻服务订单',
                               'INCREASE':'增租服务订单',
                               'CONTINUE':'续租服务订单'
                            }
                            for(var item in orderType){
                                if(item==params.row.orderType){
                                    return <span class="u-txt">{orderType[item]}</span>;
                                }
                            }
                        }
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
                                            this.showView(params)
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
                                            this.showEdit(params)
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
        
        created(){
          var params=Object.assign({},this.$route.query,{page:1,pageSize:15});
          this.getListData(params);
          this.params=params;
        },

        methods:{

            showKey: function (ev) {
                this.lowerSubmit();
            },

            showSearch () {
                this.openSearch=!this.openSearch;
                utils.clearForm(this.upperData);
            },
            
            showJoin(){
                window.open('/order-center/order-manage/station-order-manage/create/join','join');
            },

            showRenew(){
                window.open('/order-center/order-manage/station-order-manage/create/renew','renew');
            },

            showApply(params){
                this.id=params.row.id;
                this.openApply=true;
            },

            showView(params){
                var viewName='';
                if(params.row.orderType=='CONTINUE'){
                    viewName='renewView';  
                }else{
                    viewName='joinView';   
                }
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/${viewName}`,params.row.id);
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
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/${type}`,params.row.id)
            },

            nullifySubmit (){
                let params={
                    id:this.id
                };
                 
                 this.$http.post('join-nullify', params,r => {
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

            applySubmit(){
                let params={
                    id:this.id
                };
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

            outSubmit (){
                this.props=Object.assign({},this.props,this.params);
                utils.commonExport(this.props,'/api/krspace-op-web/order-seat-add/export');
            },

            getListData(params){
                var _this=this;
                 this.$http.get('join-bill-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.openMessage=true;
                    _this.MessageType="error";
                    _this.warn=e.message;
                })   
            },

            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },

            lowerSubmit(){
                utils.addParams(this.params);
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
                this.params.page=1;
                this.params.pageSize=15;
                this.params.cStartDate=this.params.cStartDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cStartDate)):'';
                this.params.cEndDate=this.params.cEndDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cEndDate)):'';
                utils.addParams(this.params);
            },

            onChangeOpen(data){
                this.openMessage=data;
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-join-list{
        .list-banner{
            width:100%;
            padding:0 0 0 20px;
            .list-btn{
                display:inline-block;
                width:20%;
                .join-btn{
                    margin-right:30px;
                }
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