<template>
    <div class='m-order-list'>
            <SectionTitle label = "通用订单列表"/>
            <div  class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="jumpAdd">新建订单</Button>
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
                        <div class='m-search' @click="submitLower">搜索</div>
                        <div class="m-bill-search" @click="showSearch">
                          <span/>   
                        </div> 
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border class='list-table'/>
            <div class='list-footer'>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='20' show-total show-elevator @on-change="onPageChange"/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch @bindData="onUpperChange"/>
                <div slot="footer">
                    <Button type="primary" @click="submitUpper">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
                </div>
            </Modal>

            <Modal
                v-model="openNullify"
                title="提示信息"
                width="500"
                @on-ok="submitNullify"  
            >
                <Nullify/>
            </Modal>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onMessageChange"
            />
    </div>
</template>

<script>
    import HeightSearch from './heightSearch';
    import Nullify from './nullify';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    import SectionTitle from '~/components/SectionTitle';
    

    export default {
        name:'Order',
        components:{
            HeightSearch,
            Nullify,
            Message,
            Buttons,
            SectionTitle
        },
        data () {    
            return {     
                params:{
                    page:1,
                    pageSize:20,
                    customerName:"",
                },

                id:'',          
                totalCount:1,
                openSearch:false,
                openNullify:false,
                openMessage:false,
                warn:'',
                MessageType:'',
                upperData:{},
                upperError:false,
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
                        title: '订单金额',
                        key: 'money',
                        align:'center'
                    },
                    {
                        title: '订单类型',
                        key: 'typeName',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'statusName',
                        align:'center'
                    },
                    {
                        title: '创建时间',
                        key: 'cTime',
                        align:'center',
                        render(tag, params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.cTime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(tag,params)=>{
                           var btnRender=[
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
                                            this.jumpView(params)
                                        }
                                    }
                                },'查看')];
                           if(params.row.status=='FINISH'){
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

        created(){
          var params=Object.assign({},{page:1,pageSize:20},this.$route.query);
          this.getListData(params);
          this.params=params;
        },

        methods:{ 
            submitNullify (){
                let params={
                    id:this.id
                };   
                 this.$http.post('general-order-nullify', params,r => {
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

            submitLower(){
                this.params.page=1;
                utils.addParams(this.params);
            },

            submitUpper(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.page=1;
                this.params.pageSize=20;
                this.params.cTimeBegin=this.params.cTimeBegin?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cTimeBegin)):'';
                this.params.cTimeEnd=this.params.cTimeEnd?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cTimeEnd)):'';
                utils.addParams(this.params);
            },

            onKeyEnter: function (ev) {
                this.submitLower();
            },

            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },

            onPageChange (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },

            onMessageChange(data){
                this.openMessage=data;
            },

            getListData(params){
                var _this=this;
                 this.$http.get('general-order-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.openMessage=true;
                    _this.MessageType="error";
                    _this.warn=e.message;
                })   
            },

            jumpAdd(){
                window.open('/order-center/order-manage/general-order-manage/create/addOrder','order');
            },

            jumpView(params){
                window.open(`/order-center/order-manage/general-order-manage/${params.row.id}/joinView`,params.row.id);
            },

            jumpEdit(params){
                window.open(`/order-center/order-manage/general-order-manage/${params.row.id}/editOrder`,params.row.id)
            },  

            showSearch () {
                this.openSearch=!this.openSearch;
                utils.clearForm(this.upperData);
            },

            showNullify(params){
                this.id=params.row.id;
                this.openNullify=true;
            }   
        }
    }
</script>

<style lang='less' scoped>
   .m-order-list{
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
                margin:10px 0;
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