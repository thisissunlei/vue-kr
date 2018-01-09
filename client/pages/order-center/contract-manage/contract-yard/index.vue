<template>
    <div class='m-order-list'>

            <SectionTitle label = "合同扫码"/>

            <div  class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="showYard">批量归档</Button>
                    </div>

                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>合同编号</span>
                            <i-input 
                                v-model="params.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="showKey($event)"
                            />
                        </div>
                        <div class='m-search' @click="lowerSubmit">查询</div>
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border class='list-table'/>

            <div class='list-footer'>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='20' @on-change="changePage" show-total show-elevator/>
                    </div>
            </div>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onChangeOpen"
            />

            <Modal
                v-model="openYard"
                title="提示信息"
                @on-ok="nullifySubmit"
                width="500"
            >
                <ContractYard/>
            </Modal>

    </div>
</template>

<script>
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    import SectionTitle from '~/components/SectionTitle';
    import ContractYard from './ContractYard';
    

    export default {
        name:'Yard',
        components:{
            Message,
            Buttons,
            SectionTitle,
            ContractYard
        },
        data () {    
            return {     
                id:'',
                
                totalCount:1,

                params:{
                    page:1,
                    pageSize:20,
                    serialNumber:"",
                },

                openYard:false,

                openMessage:false,

                warn:'',

                MessageType:'',

                joinData:[],

                joinOrder: [
                    {
                        title: '合同编号',
                        key: 'serialNumber',
                        align:'center'
                    },
                    {
                        title: '合同名称',
                        key: 'lesseeName',
                        align:'center'
                    },
                    {
                        title: '合同请求标题',
                        key: 'title',
                        align:'center'
                    },
                    {
                        title: '创建人',
                        key: 'creatorName',
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
                        title: '归档状态',
                        key: 'pigeonholedName',
                        align:'center'
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
                                            this.showView(params)
                                        }
                                    }
                                },'查看')];
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
            showKey: function (ev) {
                this.lowerSubmit();
            },

            showYard(){
               
            },

            showView(params){
                window.open(`./${params.row.id}/view`,params.row.id);
            },
            
            getListData(params){
                var _this=this;
                 this.$http.get('contract-yard-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
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
                this.params.page=1;
                utils.addParams(this.params);
            },

            onChangeOpen(data){
                this.openMessage=data;
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
            }
            .list-search{
                margin:10px 0;
                display:inline-block;
                width:80%;
                text-align:right;
                padding-right: 20px;
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
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
</style>