<template>
    <div class="attract-investment">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
              @getFloor="getFloor"
            />
        </div>
        <SlotHead :class="theHead?'header-here':'header-no'"/>

        <div style="margin:0 20px;" class="attract-investment-table">

        <div style="margin-bottom:10px;margin-top:-10px;font-size:12px;">
                <Button style="margin-right:20px;" type="primary"   @click="openBatch">{{isShowBatch?'批量操作':'关闭批量模式'}}</Button>
                <Button type="primary" style="margin-right:20px;" v-if="!isShowBatch" @click="openStatus">修改状态</Button>
                <Button style="margin-right:20px;" type="primary"   @click="butNewgoods">新增商品</Button>
                <Button style="margin-right:20px;" type="primary" @click="importgoods">导入商品</Button>
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

            <div  class='list-footer'>
                <div style="float: right;">
                    <Page :total="totalCount" :page-size='tabForms.pageSize' show-total show-elevator @on-change="onPageChange"/>
                </div>
            </div>
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
                    :data="statusData"
                    :errorData="errorData"
                    @updateForm="updateStatus"
                />
            <div slot="footer">
                 <Button type="primary" @click="submitStatus">修改</Button>
                 <Button type="ghost" style="margin-left:20px" >取消</Button>
            </div>
        </Modal>

        <Modal
            title="Title"
            v-model="complete"
            class-name="vertical-center-modal"
            style="text-align:center;"
            >
                <span style="color:red;">{{statusData.length}}</span>个商品修改状态成功！
                  <div slot="footer" style="text-align:center;">
                     <Button type="primary" @click="openComplete" >成功</Button>
                </div>
        </Modal>

          <Modal
            title="新增商品"
            v-model="newmodal"
            class-name="vertical-center-modal"
            style="text-align:center;"
            >
            <Newgoods
                   v-if="newmodal"
                   :data="newgoodsData"
                   :newgooddata="newgooddata"
                   @newdateForm="newStatus"
                   :floorList="floorList"
                   :floorValue='floor'
                />
             <div slot="footer">
                 <Button type="primary" @click="subGoods">确定添加</Button>
                 <Button type="ghost" style="margin-left:20px" @click="showStatus">取消</Button>
            </div>
            

        </Modal>
          <Modal

            title="注意！"
            v-model="careful"
            class-name="vertical-center-modal"
            style="text-align:center;"
            >
            <div style="text-align:left;">
                <h2 style="color:red;margin-bottom:10px;">此社区内已有重名的商品<span style="color:black;text-decoration:underline;">802</span></h2>
                <p>请确定是否真的要添加一个重名的商品，重名商品自动绑定相同的硬件设备</p>
            </div>
    
             <div slot="footer">
                 <Button type="primary" @click="buttPush" >确定添加</Button>
                 <Button type="ghost" style="margin-left:20px" @click="showtPush">取消</Button>
            </div>
        </Modal>

      <Modal
            title="添加成功!"
            v-model="butpush"
            class-name="vertical-center-modal"
            style="text-align:center;"
            >
            <div style="text-align:left;">
                <p>请及时在<span style="color:red;text-decoration:underline;">平面图配置</span>中配置商品位置</p>
            </div>
    
             <div slot="footer" style="text-align:center;">
                 <Button type="primary" @click="showpush">我知道了</Button>
            </div>
     </Modal>


     <!-- 倒入商品 -->
     <Modal
            title="倒入商品"
            v-model="vImport"
            class-name="vertical-center-modal"
            style="text-align:center;"
            >
            <div style="text-align:left;" class="uploadss">
                <p>请下载模板，填写后导入</p>
                <p>模板的首行请勿删除</p>
                <p>商品名称不能重复</p>
                
            </div>
            <div style="text-align:left;margin-top:20px;">
   
             <ImportFile 
            url="//jsonplaceholder.typicode.com/posts/"
            @downFile="downFile"
            @close="close"
            @success="success"
            @error="error"
             />
            </div>
              <div slot="footer"></div>

    </Modal>

    <!-- 导入成功 -->
        <Modal
            v-model="importsuccess"
            title="倒入商品"
            class-name="vertical-center-modal"
            style="text-align:center;"
            >
            <div style="text-align:left;">
                <Form-item label="独立办公室:" style="margin-top:20px; word-wrap:break-word;" v-if="spaces.length">
                                <span
                                v-for="(item,index) in spaces"
                                :key="item.id"
                                >
                                <span v-if="index!=0">,</span><span :style="'color:'+item.color">{{item.code}}</span>
                                </span>
                    </Form-item>
            </div>
             <div slot="footer" style="text-align:center;">
                 <Button type="primary">继续</Button>
            </div>
    </Modal>



    </div>
</template>

<script>
import FlagLabel from '~/components/FlagLabel';
import ToolTip from '~/components/ToolTip';
import ImportFile from '~/components/ImportFile';

import Newgoods from './newgoods';
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
       ChangeStatus,
       Newgoods,
         FlagLabel,
        ToolTip,
        ImportFile
    },
      props:{
            mask:String
        },
    data() {
        return{
            spaces:[],//导入成功返回独立办公室列表	
            stations:[],//导入成功返回固定办公桌列表
            importsuccess:false,//导入成功	
            formItem:{
                  godsStatus:'',
                  good:'',
            },
            errorData:[],
            typelist2:[],
            newgooddata:[],
            careful:false,
            isShowBatch:true,
            switchParams:{},
            modifystate: false,
            complete: false,
            newmodal:false,
            butpush:false,
            vImport:false,//导入
            warn:'',
            MessageType:'',
   
            openMessage:false,
            statusForm:{},
            newgoodForm:{},
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
                    align:'center' 
                },
                {
                    title: '商品名称',
                    key: 'name',
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
                    width:150, 
                    render(h,obj){
                     var statusName=obj.row.goodsStatusName?obj.row.goodsStatusName:'-';
                     var status=obj.row.goodsStatus;
                     var colorClass='';
                     if(status=='DISABLE'||status=='OFF'){
                         colorClass='redClass'
                     }else{
                         colorClass=''
                     }
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
                                var endRender=dateUtils.dateToStr("YYYY-MM-DD",new Date(item.startDate))+'起';
                                 var staRender=statusName;
                                return h('div', [

                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content:endRender
                                        }
                                    },
                                    
                                    [
                    
                                    
                                ])
                            ]),
                             h('div', [
                                        h('span',{
                                          attrs: {
                                            class:classN,
                                        }
                                        },endRender),
                                        h('span',{
                                          
                                             attrs: {
                                            class:colorClass,
                                        }

                                        },staRender),
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
                        var statusName=params.row.goodsLocation?'已配置':'未配置';
                        var colorClass='';
                        if(statusName=='已配置'){
                             colorClass=''
                        }else if(statusName=='未配置'){
                         colorClass='redClass'
                        }

                        return <span class={`${colorClass}`}>{statusName}</span>



                    }
                }
            ],
            attractData:[],
            statusData:[],
            newgoodsData:[],
            floorList:[], 
            floor:''
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
        getFloor(list){
            this.floorList = [].concat(list);
        },
         butNewgoods(){//新增商品
                     this.newmodal=!this.newmodal;      
                  },
        showStatus(){
                     this.newmodal=!this.newmodal;  
        },       
         getsubGoods(){//注意
                     this.careful=!this.careful;
                     },
         butPush(){//成功
                    this.butpush=!this.butpush;
         } ,        
         showpush(){
                  this.butpush=!this.butpush;
         },
         showtPush(){//二次确定
              this.careful=!this.careful;
         },   

            buttPush(){
                    this.butPush();
                    this.getsubGoods();
                    this.getNew();
            },
            //添加弹窗2
            subGoods(){
                alert('重名接口')

                    this.butNewgoods();
         //重名      
                     this.newgoodForm.name=this.newgoodForm.name;
                     this.newgoodForm.floor=this.newgoodForm.floor;
                     this.$http.get('getNew-Rename',this.newgoodForm).then((response)=>{
                            if(code==-1){
                                alert('-1')
                            this.getsubGoods();
                            }else if(code==1){
                            this.getNew();
                            }

                    }).catch((error)=>{
                        this.openMessage=true;
                        this.MessageType="error";
                        this.warn=error.message;
                    })
      },    
     
   
                  //新增接口a
         getNew(){
             alert('新增')
          this.$http.post('getNew-lyadded',this.newgoodForm).then((response)=>{    
              console.log('新增接口',response.data);
                        }).catch((error)=>{
                            this.$Notice.error({
                                title:error.message
                            });
                        })
         },
        //导入入口
        importgoods(){
                this.vImport=!this.vImport;
        },
        celPush(){
                 this.vImport=!this.vImport;
        },

     downFile(){
                  alert('1')
        },
       close(){
             this.vImport=!this.vImport;
               alert('2')
       },
       error(){n
              alert('3')
       },
       success(){
                alert('4')


                },





        initData(formItem){
            this.tabForms=Object.assign({},this.tabForms,formItem);
        },
        searchClick(values){
            this.tabForms=Object.assign({},this.tabForms,values);
            //utils.addParams(this.tabForms);
        },
        clearClick(values){
            this.tabForms=Object.assign({},this.tabForms,values);
            //utils.addParams(this.tabForms);
        },
        updateStatus(obj){
           this.statusForm=Object.assign({},obj);  
        },
         newStatus(obj){
           this.newgoodForm=Object.assign({},obj);  
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
        submitStatus(){
            this.statusForm.startDate=this.dateSwitch(this.statusForm.startDate);
            this.statusForm.endDate=this.dateSwitch(this.statusForm.endDate);
            this.$http.post('get-change-status',this.statusForm).then((response)=>{    
              console.log('提交',response.data)
              if(response.data.length){
                    this.errorData=response.data;
              }else{
                    this.openStatus()
                    this.openComplete();
                    this.getListData(this.tabForms);
              }
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        openComplete(){
           this.complete=!this.complete;      
        },
 
        //格式转换
        dateSwitch(data){
            if(data){
                return utils.dateCompatible(data);
            }else{
                return '';
            }
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
      tableChange(select){
          this.statusData=select;
      },
      getListData(params){//列表
           this.loading=true;
           this.$http.get('getGoodsList',params).then((response)=>{
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
</style>
