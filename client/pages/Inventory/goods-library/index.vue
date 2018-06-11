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
                <Button type="primary" style="marign-ri" @click="openBatch">{{isShowBatch?'批量操作':'关闭批量模式'}}</Button>
                <Button type="primary" v-if="!isShowBatch" @click="openStatus">修改状态</Button>
            </div>
            
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
        </div>

        <Message 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onMessageChange"
        />
        <Modal
            width="660"
            v-model="modifystate"
            title="修改状态"
        >
                <ChangeStatus    
                     v-if="modifystate"
                    :data="attractData"
                    @click="submitClick"
                    @updateForm="updateForm"
                />
            <div slot="footer">
                <Button type="ghost" style="margin-left:8px" @click="closeStatus">取消</Button>
                <Button type="primary" @click="submitStatus">确定</Button>
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
</template>

<script>
import ChangeStatus from './bulk-changes/change-status';
import Loading from '~/components/Loading';
import SearchForm from './search-form';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import publicFn from '../publicFn';
import SlotHead from './fixed-head';
import dateUtils from 'vue-dateutils';
export default {
          name:'Join',
    components:{
       Loading,
       SearchForm,
       Message,
       SlotHead,
       ChangeStatus
    },
      props:{
            mask:String
        },
    data() {
        return{

            isShowBatch:true,
            switchParams:{},
            modifystate: false,
            modal10: false,
            warn:'',
            modal2:'',
            MessageType:'',
            openMessage:false,
            statusForm:{},
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
                     width:110,
                    align:'center' 
                },
                {
                    title: '商品名称',
                    key: 'name',
                    width:100,
                    align:'center',
                },
                {
                    title: '商品类型',
                    key: 'goodsTypeName',
                    align:'center',
                    width:120,
                },
                {
                    title: '工位数量',
                    key: 'capacity',
                    align:'center',
                    width:90,
                },
                {
                    title: '商品属性',
                    key: 'locationTypeName',
                    align:'center',
                    width:120,
                     render(h, params){
                        return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: params.row.locationTypeName+' '+params.row.suiteTypeName
                                        }
                                    }, [
                                    h('div', [
                                        h('div',{
                                          style:{
                                                textOverflow:'ellipsis',
                                                whiteSpace:'nowrap',
                                                overflow: 'hidden'
                                           }
                                        },params.row.locationTypeName+' '+params.row.suiteTypeName),
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
                    width:90,
                    align:'right',
                  
                },
                {
                    title: '当前状态',
                    key: 'goodsStatusName',
                    align:'center',
                    width:90,
                   render(tag, params){
                     var statusName=params.row.goodsStatusName?params.row.goodsStatusName:'-';
                     var status=params.row.goodsStatus;
                     var colorClass='';
                     if(status=='DISABLE'||status=='OFF'){
                         colorClass='redClass'
                     }else{
                         colorClass=''
                     }
                    return <span class={`${colorClass}`}>{statusName}</span>
                  }
                },
                {
                    title: '后续状态变化',
                    key: 'followStatus',
                    className:'current-range',
                    align:'center',
                    width:120, 
                    render(h,obj){
                        var rowArray=obj.row.followStatus;
                        var row='';
                        let classN='row-current-more current-more-task table-null';
                        // var colorClass='redClass';
                        if(!rowArray){
                            return  h('div', {
                                attrs: {
                                    class:classN
                                },
                            }, '-')
                        }
                        if(rowArray){
                            row=rowArray.map((item,index)=>{
                                var endRender=dateUtils.dateToStr("YYYY-MM-DD",new Date(item.startDate))+'起'+item.goodsStatusName;
                                
                                return h('div', [

                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content:endRender
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class:classN,
                                        }
                                    },endRender)
                                ])
                            ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '设备绑定',
                    key: 'binding',
                    align:'center',
                    width:60,
                    render(h,params){
                        return <span>-</span>
                    }
                },
                {
                    title: '商品位置',
                    key: 'goodsLocation',
                    align:'center',
                    width:120,
                    render(h,params){
                        var name=params.row.goodsLocation?'已配置':'未配置';
                        return <span>>{name}</span>



                    }
                }
            ],
            attractData:[]    
        }
    },
       watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='join'){
                       this.getListData(this.switchParams);
                       this.params=this.switchParams; 
                    }
                }
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
            this.getListData();
            this.tableCommon();
            this.onScrollListener();
        }
    },
    destroyed(){
        var dom=document.getElementById('layout-content-main');
        dom.removeEventListener("scroll",this.onScrollListener);
        window.removeEventListener('resize',this.onResize); 
    },

    methods:{
      updateForm(obj){
          this.statusForm=Object.assign({},obj);
          
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
      //批量修改
            openBatch(){
                this.isShowBatch=!this.isShowBatch;
                if(!this.isShowBatch){
                    this.attractColumns.unshift({type:'selection',width: 60,align: 'center'}); 
                    this.$refs.selectionGoodsLibrary.selectAll(true); 
                }else{
                    this.attractColumns.splice(0,1);
                }
            },
            openStatus(){
                this.modifystate=!this.modifystate;
            },
            closeStatus(){
                this.modifystate=!this.modifystate;
           },
           submitClick(){
               console.log('submit',"pppppppppp")
           },
            submitStatus(){
                this.getStatus();
                // alert(1)
            },
            getStatus(){//提交
                console.log('eee',this.statusForm)
                this.$http.post('get-change-status',this.statusForm).then((response)=>{    
                    console.log('提交',response.data)
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })


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
      tableChange(select){
          console.log('select--',select);
      },
      getListData(params){//列表
           this.loading=true;
           this.$http.get('getGoodsList', params).then((response)=>{
               console.log('商品列表',response.data);
                this.totalCount=response.data.totalCount;
                this.attractData=response.data.items;           
                this.name=response.data;    
                this.loading=false;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
      },
      searchClick(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         this.getListData(this.tabForms); 
      },
      clearClick(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         this.getListData(this.tabForms); 
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
