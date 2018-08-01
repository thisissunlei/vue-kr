<template>
    <div class="attract-king">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
            />
        </div>
       

        <div style="margin:0 20px;" class="attract-investment-table">

            <Table 
               ref="selectionGoodsLibrary" 
               :loading="loading" 
               stripe   
               :columns="attractColumns" 
               :data="attractData" 
               border
               @on-selection-change="tableChange"
             >
                <div slot="loading">
                    <Loading/>
                </div>
            </Table>

            <div  class='list-footer'>
                <div style="float: right;">
                    <Page :total="totalCount" :current='tabForms.page' :page-size='tabForms.pageSize' show-total show-elevator @on-change="onPageChange"/>
                </div>
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
import FlagLabel from '~/components/FlagLabel';
import ToolTip from '~/components/ToolTip';
import Loading from '~/components/Loading';
import SearchForm from './search-form';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import Buttons from '~/components/Buttons';
export default {
        name:'Join',
       components:{
                Loading,
                SearchForm,
                Message,
                ToolTip,
                Buttons,
                 },
          data() {
                return{
            editOpen:false,
            priceOpen:false,
            spaceOpen:false,
            editData:{},
            serviceData:{},
            warnCode:'',
            serviceOpen:false,
            fiteter:'',
            feactye:'',
            tables:'',
            failurec:'',
            errdated:'',
            attractData:[],
            butdpush:false,
            butepush:false,
            feated:false,            
            resect:{
                moveStationse:"",
                openStations:"",
                spaces:"",
            },
            moveStations:'',//导入成功返回移动办公室列表
            spaces:'',//导入成功返回独立办公室列表	
            stations:'',//导入成功返回固定办公桌列表
            importsuccess:false,//导入成功	
            butsuccess:false,
            butpushd:false,
            carel:false,
            errdate:'',
            formItem:{
                  godsStatus:'',
                  good:'',
            },
            errorData:[],
            typelist2:[],
            careful:false,
            isShowBatch:true,
            isShowEdit:true,
            switchParams:{},
            modifystate: false,
            complete: false,
            spaceTip:false,
            newmodal:false,
            pudyt:false,
            butpudyt:false,
            vImport:false,//导入
            warn:'',
            MessageType:'',
            openMessage:false,
            statusForm:{},
            newgoodForm:{},
            tabForms:{
                page:1,
                pageSize:20
            },
            statusOldData:[],
            statusData:[],
            sideBar:true,
            loading:false,
            left:'',
            width:'',
            totalCount:0,
            attractColumns:[
                {
                    title: '状态',
                    key: 'syncStatus',
                    align:'center',
                    render: (h, params) => {
                    return h("div", {
                        style: {
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        display:'inline-block',
                        backgroundColor: params.row.syncStatus == 'NOT_SYNC' ? 'red' : "green"
                        }
                    }, '')
                    },
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align:'center',
                    width:200,
                      render:(h, params)=>{
                         let ile= params.row.createTime;
                         ile = ile ? dateUtils.dateToStr('YYYY-MM-DD HH:mm:SS', new Date(ile)) : '';
                           return h('div',{
          
                          },ile)
                    }
                    
                },
                {
                    title: '传输数据数',
                    key: 'syncDataCount',
                    align:'center',
                    width:100,
                },
                {
                    title: '传输结果数',
                    key: 'successDataCount',
                    align:'center',
                    width:100,
                },
                {
                    title: '数据类型',
                    key: 'syncDataType',
                    align:'center',
             //      width:100,
                    render:(h, params)=>{
                        let ile= params.row.syncDataType;
                        let nes='';
                        nes = ile === 'INCOME'?'应收':'回款';
                        return h('div',{
                        
                        },nes)

                }
                },
                {
                    title: '类型',
                    key: 'syncType',
                    align:'center',
                    width:100,
                    render:(h, params)=>{
                        let ile= params.row.syncType;
                        let nes='';
                        nes = ile === 'AUTO'?'定时':'手动';
                        return h('div',{
                        
                        },nes)

                }
                },
                {
                    title: '操作人',
                    key: 'operatorName',
                    align:'center',
      //              width:100,
                 
                },
                {
                    title: '备注',
                    key: 'remark',
                    className:'current-range',
                    align:'center',
      //              width:100, 
                 
                },
                {
                    title: '操作',
                    key: 'bindingText',
                    align:'center',
                    render:(h,params)=>{
                        let middle=params.row.syncStatus;
                        let  ren = [
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
                                            this.goDetail(params.row)
                                        }
                                    }
                                }, '查看')];
                        return h('div',ren)
                    }
                }
            ],
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
                this.onScrollListener();
            },
            tabForms:function(val,old){
                this.getListData(this.tabForms); 
                this.floor=this.tabForms.floor;
            },
        },
        destroyed(){
            var dom=document.getElementById('layout-content-main');
            dom.removeEventListener("scroll",this.onScrollListener);
            window.removeEventListener('resize',this.onResize); 
        },
        methods:{
        goDetail(params){
            window.open('/bill/king-dee/sync-data/data-sync-view?type='+params.syncDataType+'&syncDataId='+params.id,'_blank')
        },

        tableChange(select){
                this.statusData=select;
                this.statusOldData=select;
            },
       
        searchClick(values){
            this.tabForms=Object.assign({},this.tabForms,values,{page:1});
        },
        clearClick(values){
            this.tabForms=Object.assign({},this.tabForms,values);
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
           
            getListData(tabParams){//列表
                this.loading=true;
                let params = Object.assign({},tabParams);
             //   params.floor = params.floor.length>1?' ':params.floor;
                this.$http.get('king-getList',params).then((response)=>{
                    console.log('商品列表',response.data);
                    this.totalCount=response.data.total;
                    this.attractData=response.data.items;           
                 //   this.name=response.data;    
                    this.loading=false;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })
            },
            onPageChange(page){
                this.tabForms=Object.assign({},this.tabForms,{page:page})
            },
            onMessageChange(data){
            this.openMessage=data;
            },
        },
}
</script>
<style lang='less'>
  .m-clear-footer{
        .ivu-modal-footer{
            padding:0;
        }
   }
  .attract-king{
          .upload{
                width: 200px;
           }
           .ghost{
            font-size: 18px;
           }
           .uploadss{
            p{
                line-height: 25px;
                font-size: 16px;
            }
          }
         .attract-search{
            // border-bottom:solid 1px #dddee1;
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
     .ww{
         color: black;
     }
</style>
