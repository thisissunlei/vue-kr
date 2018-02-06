<template>
    <div class='m-join-list'>
            
            <div class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="jumpJoin" class='join-btn'>入驻</Button>
                        <Button type="primary" @click="jumpRenew">续租</Button>
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

            <Table :columns="joinOrder" :data="joinData" border  class='list-table'/>
            <div  class='list-footer'>
                    <Buttons label='导出'  type='primary' @click='submitExport' checkAction='seat_order_in_export'/>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' show-total show-elevator @on-change="onPageChange"/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch mask='join' @bindData="onUpperChange"/>
                <div slot="footer">
                    <Button type="primary" @click="submitUpperSearch">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
                </div>
            </Modal>
            
            <Modal
                v-model="openNullify"
                title="提示信息"
                width="500"
            >
                <Nullify/>
                <div slot="footer">
                    <Button type="primary" :disabled="nullDisabled" @click="submitNullify">确定</Button>
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
                    <Button type="primary" :disabled="applyDisabled" @click="submitApply">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="closeApply">取消</Button>
                </div>
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
                id:'',
                props:{},
                totalCount:1,
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
                        align:'center',
                        render(tag,params){ 
                          var money=params.row.rentAmount?utils.thousand(params.row.rentAmount):'';                  
                          return <span class="u-txt">{money}</span>;
                        }
                    },
                    {
                        title: '履约保证金',
                        key: 'depositAmount',
                        align:'center',
                        render(tag,params){ 
                          var money=params.row.depositAmount?utils.thousand(params.row.depositAmount):'';                  
                          return <span class="u-txt">{money}</span>;
                        }
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
                                        checkAction:'seat_order_view',
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
                                tag(Buttons,{
                                   props: {
                                        type: 'text',
                                        checkAction:'seat_order_contract_apply',
                                        label:'申请合同',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.showApply(params)
                                        }
                                    }
                                }),
                                tag(Buttons, {
                                    props: {
                                        type: 'text',
                                        checkAction:'seat_order_release',
                                        label:'作废',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.showNullify(params)
                                        }
                                    }
                                }))
                                if(params.row.versionType!=1){
                                 btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            checkAction:params.row.orderType=='CONTINUE'?'seat_order_continue_edit':'seat_order_in_edit',
                                            label:'编辑',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.jumpEdit(params)
                                            }
                                        }
                                    }))
                                }
                           }
                           return tag('div',btnRender);  
                        }
                    }
                ]
            }
        },
        
        created(){
          let mask=this.$route.query.mask;
          let params={};
          if(mask=='join'){
              params=Object.assign({},this.$route.query,{page:1,pageSize:15});
          }else{
              params=Object.assign({},{page:1,pageSize:15});
          }
          this.getListData(params);
          this.params=params;
        },

        methods:{   
            submitNullify (){
                let params={
                    id:this.id
                };
                 if(this.nullDisabled){
                     return ;
                 }
                 this.nullDisabled=true;
                 this.closeNullify();
                 this.$http.post('join-nullify', params).then((response) => {
                     this.openMessage=true;
                     this.MessageType="success";
                     this.warn='作废成功';
                     this.getListData(this.params);
                }).catch( (error) => {
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
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
                 this.$http.post('apply-contract', params).then((response)=>{
                     this.openMessage=true;
                     this.MessageType="success";
                     this.warn='申请成功';
                     this.getListData(this.params);
                 }).catch((error)=>{
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
            },

            submitExport (){
                this.props=Object.assign({},this.props,this.params);
                utils.commonExport(this.props,'/api/krspace-op-web/order-seat-add/export');
            },

            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.mask='join';
                this.params.page=1;
                this.params.pageSize=15;
                this.params.cStartDate=this.params.cStartDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cStartDate)):'';
                this.params.cEndDate=this.params.cEndDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cEndDate)):'';
                utils.addParams(this.params);
            },

            submitLowerSearch(){
                this.params.mask='join';
                utils.addParams(this.params);
            },

            getListData(params){
                 this.$http.get('join-bill-list', params).then((response)=>{
                     this.totalCount=response.data.totalCount;
                     this.joinData=response.data.items;
                     this.openSearch=false;
                 }).catch((error)=>{
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
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

            onMessageChange(data){
                this.openMessage=data;
            },

            onKeyEnter: function (ev) {
                this.submitLowerSearch();
            },

            jumpJoin(){
                window.open('/order-center/order-manage/station-order-manage/create/join','_blank');
            },

            jumpRenew(){
                window.open('/order-center/order-manage/station-order-manage/create/renew','_blank');
            },

            jumpView(params){
                var viewName='';
                if(params.row.orderType=='CONTINUE'){
                    viewName='renewView';  
                }else{
                    viewName='joinView';   
                }
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/${viewName}`,'_blank');
            },

            jumpEdit(values){
                var popup = window.open();
                let params={
                    orderId:values.row.id
                }
                this.$http.get('order-first-payed', params).then((response)=>{
                    let type = '';
                    switch (values.row.orderType){
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
                    popup.location = `/order-center/order-manage/station-order-manage/${values.row.id}/${type}`;
                 }).catch((error)=>{
                     popup.close();
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
            },

            showNullify(params){
                this.id=params.row.id;
                this.closeNullify();
            },

            closeNullify(){
                this.openNullify=!this.openNullify;
                this.nullDisabled=false;
            },

            closeApply(){
                this.openApply=!this.openApply;
                this.applyDisabled=false;
            },

            showSearch () {
                this.openSearch=!this.openSearch;
            },

            showApply(params){
                this.id=params.row.id;
                this.closeApply();
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