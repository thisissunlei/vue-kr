<template>
    <div class="attract-investment">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
            />
        </div>
        <SlotHead :class="theHead?'header-here':'header-no'"/>
        <div style="margin:0 20px;" class="attract-investment-table">
            <div style="margin-bottom:10px;margin-top:-10px;font-size:12px;">
                          <Button type="primary" @click="modal1 = true">批量操作</Button>
                        <Modal
                          width="660"
                            v-model="modal1"
                            title="批量操作">
                    <ChangeStatus/>
                       <div slot="footer">
                   <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
                    <Button type="primary" @click="modal10 = true">确定</Button>
                </div>
                        </Modal>


                <Modal
                    title="Title"
                    v-model="modal10"
                    class-name="vertical-center-modal">
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </Modal>
                        
                    </div>


                <Table :loading="loading" stripe :columns="attractColumns" :data="attractData" border>
                 <div slot="loading">
                    <Loading/>
                 </div>
            </Table>
        </div>
        <div  class='list-footer'>
                <Button type="primary" @click='submitExport'>导出</Button>
                <div style="float: right;">
                    <Page :total="totalCount" :page-size='tabForms.pageSize' show-total show-elevator @on-change="onPageChange"/>
                </div>
        </div>
        <Message 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onMessageChange"
        />
    </div>
</template>

<script>
import ChangeStatus from './bulk-changes/change-status';
import Loading from '~/components/Loading';
import SearchForm from './search-form';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import publicFn from '../publicFn';
import SlotHead from './fixed-head';

export default {
    components:{
       Loading,
       SearchForm,
       Message,
       SlotHead,
       ChangeStatus
    },
    data() {
        return{
            modal1: false,
            modal10: false,
            warn:'',
            modal2:'',
            MessageType:'',
            openMessage:false,
            tabForms:{
                page:1,
                pageSize:100
            },
            theHead:false,
            sideBar:true,
            loading:false,
            left:'',
            width:'',
            totalCount:0,
            attractColumns:[
                {
                    title: '商品编号',
                    key: 'code',
                    align:'center',
                },
                {
                    title: '商品名称',
                    key: 'name',
                    align:'center',
                },
                {
                    title: '商品类型',
                    key: 'goodsType',
                    align:'center',
                    width:100,
                },
                {
                    title: '工位数量',
                    key: 'capacity',
                    align:'center',
                    width:60,
                },
                {
                    title: '商品属性',
                    key: 'locationType',
                    align:'center',
                    width:90,
                     render(h, params){
                        var desc=params.row.suiteType?params.row.suiteType:'-'
                        return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: desc
                                        }
                                    }, [
                                    h('div', [
                                        h('div',{
                                        },params.row.locationType),
                                        h('div',{
                                            style:{
                                                textOverflow:'ellipsis',
                                                whiteSpace:'nowrap',
                                                overflow: 'hidden'
                                            }
                                        },params.row.suiteType),
                                    ])
                                ])
                        ])
                    }
                },
                {
                    title: '面积',
                    key: 'area',
                    align:'center',
                    width:90,
                },
                {
                    title: '商品定价',
                    key: 'quotedPrice',
                    className:'current-range',
                    width:90,
                    align:'right',
                  
                },
                {
                    title: '当前状态',
                    key: 'goodsStatus',
                    className:'current-range',
                    align:'center',
                    width:60,
                   render(tag, params){
                     var status=params.row.goodsStatus?params.row.goodsStatus:'-';
                     var colorClass='';
                     if(status=='DISABLE'||status=='OFF'){
                         colorClass='redClass'
                     }else{
                         colorClass=''
                     }
                    return <span class={`${colorClass}`}>{status}</span>
                  }
                },
                {
                    title: '后续状态变化',
                    key: 'followStatus',
                    className:'current-range',
                    align:'center',
                    width:100, 
                },
                {
                    title: '设备绑定',
                    key: 'startDate',
                    className:'current-range',
                    align:'center',
                    width:100,

                },
                {
                    title: '商品位置',
                    key: 'goodsLocation',
                    className:'current-range',
                    align:'center',
                    width:90
                 
                }
                ],
            attractData:[]    
        }
    },
    mounted(){
        var dom=document.getElementById('layout-content-main');
        dom.addEventListener("scroll",this.onScrollListener);
        window.addEventListener('resize',this.onResize);  
        this.tableCommon();
        var _this=this;
        LISTENSIDEBAROPEN(function (params) {
            _this.sideBar=params;
        })
    },
    watch:{
        
        sideBar:function(val){
            this.tableCommon();
            this.getListData();
            this.onScrollListener();
        }
    },
    destroyed(){
        var dom=document.getElementById('layout-content-main');
        dom.removeEventListener("scroll",this.onScrollListener);
        window.removeEventListener('resize',this.onResize); 
    },
    methods:{
         ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
      tableCommon(){
        var dailyTableDom=document.querySelectorAll('div.attract-investment-table')[0];
        if(dailyTableDom){
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
        }  
      },
      onResize(){
            this.tableCommon();
            this.onScrollListener();
      },
      //滚动监听
      onScrollListener(){            
            var dom=document.getElementById('layout-content-main');
            var headDom=document.querySelectorAll('div.slot-head-attract-investment')[0];
            if(headDom){
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
            }
            if(dom.scrollTop>420){
                this.theHead=true;
            }else{
                this.theHead=false;
            }
      },
      initData(formItem){
         this.tabForms=Object.assign({},formItem,this.tabForms);
         this.getListData(this.tabForms);
      },
      getListData(params){//列表
           this.loading=true;
           this.$http.get('getGoodsList', params).then((response)=>{
               console.log('商品列表',response.data);
                this.totalCount=response.data.totalCount;
                this.attractData=response.data.items;
                this.loading=false;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
      },
      submitUpperSearch(){
            this.modal1=!this.modal1; 
      },
         showSearch () {
                this.modal1=!this.modal1;
            },

      searchClick(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         this.getListData(this.tabForms); 
      },
      clearClick(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         this.getListData(this.tabForms); 
      },
      submitExport(){
          utils.commonExport(this.tabForms,'/api/krspace-finance-web/inventory/cmt-investment/list/export');
      },
      onPageChange(page){
         this.tabForms.page=page;
         this.getListData(this.tabForms); 
      },
      onMessageChange(data){
        this.openMessage=data;
      }
    }
}
</script>

<style lang='less'>
     .attract-investment{
         .attract-search{
             border-bottom:solid 1px #dddee1;
             margin-bottom:20px;
         }
         .list-footer{
            margin: 10px 20px;
            overflow: hidden;
        }
        .ivu-table-cell{ 
            padding:0;
        }
        .redClass{
            color:red;
        }
        .current-range{
            .ivu-table-cell{ 
                .ivu-tooltip{
                    .row-current-more{
                        padding: 15px 0 10px 0;
                    }
                    .noBorder{
                        border-bottom:none;
                    }
                }
            }
            .ivu-table-cell > div{
                    border-bottom:solid 1px #e9eaec;
                    &:last-child{
                        border-bottom:none;
                    }
                }
            .current-more-task{
                width:100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .table-null{
                line-height: 47px;
            }
        }
        .header-here{
            opacity:1;
        }
        .header-no{
            transition: opacity 0.2 ease;
            opacity: 0;
        }
        .attract-investment-table{
            .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
                background-color: #f6f6f6;
            }
        }
     }
</style>
