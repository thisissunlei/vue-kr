<template>
    <div class="attract-investment">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
              @getFloor="getFloor"
              @cityFloor="cityFloor"
            />
        </div>
        <SlotHead :class="theHead?'header-here':'header-no'"/>

        <div style="margin:0 20px;" class="attract-investment-table">

        <div style="margin-bottom:10px;margin-top:-10px;font-size:12px;">
                <Buttons type="primary" styles="margin-right:20px;" :label="isShowBatch?'批量操作':'关闭批量模式'" checkAction='goods_button' @click="openBatch"/>
                <Button type="primary" style="margin-right:20px;" v-if="!isShowBatch" @click="openStatus">修改状态</Button>
                <Button type="primary" style="margin-right:20px;" v-if="!isShowBatch" @click="openPrice">修改定价</Button>
                <Buttons styles="margin-right:20px;" type="primary"   label="新增商品" checkAction='goods_button' @click="butNewgoods"/>
                <Buttons styles="margin-right:20px;" type="primary"  label="导入商品"  checkAction='goods_button' @click="importgoods"/>
                <Buttons type="primary" :label="isShowEdit?'编辑操作':'关闭编辑模式'" checkAction='goods_button' @click="openEditStyle"/>
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
                 <Button type="ghost" style="margin-left:20px" @click="openStatus">取消</Button>
            </div>
        </Modal>

        <Modal
            width="530"
            v-model="priceOpen"
            title="修改定价"
        >
            <ChangePrice 
              v-if="priceOpen"
              :data="statusData"
              @submit="submitPrice"
              @cancel="cancelPrice"
              />
            <div slot="footer"></div>
        </Modal>

        <Modal
            title="Title"
            v-model="complete"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
                <span style="color:red;">{{statusOldData.length}}</span>个商品修改状态成功！
                  <div slot="footer" style="text-align:center;">
                     <Button type="primary" @click="openComplete" >成功</Button>
                </div>
        </Modal>

          <Modal
            title="新增商品"
            v-model="newmodal"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <!-- /   v-if="newmodal" -->
            <Newgoods
                    v-if="newmodal"
                   @newdateForm="newStatus"
                   :floorList="floorList"
                   ref="goodsNewPage"
                />
             <div slot="footer">
                 <Button type="primary" @click="subGoods">确定添加</Button>
                 <Button type="ghost" style="margin-left:20px" @click="showStatus">取消</Button>
            </div>
        </Modal>

        <Modal
            title="编辑商品"
            v-model="editOpen"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <EditGoods
                   v-if="editOpen"
                   @newdateForm="newStatus"
                   :floorList="floorList"
                   :editData="editData"
                   ref="goodsEditPage"
                />
             <div slot="footer">
                 <Button type="primary" @click="submitEdit">确定</Button>
                 <Button type="ghost" style="margin-left:20px" @click="cancelEdit">取消</Button>
            </div>
        </Modal>

          <Modal
            title="注意！"
            v-model="careful"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;">
                <h2 style="color:red;margin-bottom:10px;"><span style="color:red;text-decoration:underline;">{{errdated}}</span></h2>
                <p>请确定是否真的要添加一个重名的商品</p>
            </div>
    
             <div slot="footer">
                 <Button type="primary" @click="buttPush" >确定添加</Button>
                 <Button type="ghost" style="margin-left:20px" @click="showtPush">取消</Button>
            </div>
        </Modal>

      <Modal
            title="添加成功!"
            v-model="butpushd"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;">
                <p>请及时在<span  @click="clanar"  style="color:red;text-decoration:underline;cursor: pointer;">平面图配置</span>中配置商品位置</p>
            </div>
    
             <div slot="footer" style="text-align:center;">
                 <Button type="primary" @click="showpushe">我知道了</Button>
            </div>
     </Modal>


     <!-- 倒入商品 -->
     <Modal
            title="导入商品"
            v-model="vImport"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;" class="uploadss">
                <p>请下载模板，填写后导入</p>
                <p>模板的首行请勿删除</p>
                <p>商品名称不能重复</p>
                
            </div>
            <div v-if="vImport"  style="text-align:left;margin-top:20px;">
             <ImportFile 
            url="//jsonplaceholder.typicode.com/posts/"
             @downFile="downFile"
            @close="close"
            @upload="upload"
             />
            </div>
              <div slot="footer"></div>

    </Modal>

    <!-- 导入成功 -->
        <Modal
            v-model="importsuccess"
            title="导入商品"
            class-name="vertical-center-modal"
            style="text-align:left;">
            <Form>
    <div>
    <Form-item  label='移动办公室：' style="text-align:left;"    >
        <span>{{resect.moveStations}}</span>
     </Form-item >
            <Form-item  label='独立办公室：' style="text-align:left;"  >
                <span>{{resect.openStations}}</span>
            </Form-item >
            <Form-item  label='固定办公室：' style="text-align:left;"  >
                <span>{{resect.spaces}}</span>
            </Form-item > 
        </div>
</Form> 
  <div slot="footer" style="text-align:center;">
                 <Button type="primary" @click="continu">继续</Button>
            </div>
    </Modal>
      <Modal
            title="导入成功!"
            v-model="feated"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;">
                <p>请及时在<span  @click="clanar"    style="color:red;text-decoration:underline;cursor: pointer;" >平面图配置</span>中配置商品位置</p>
            </div>
    
             <div slot="footer" style="text-align:center;">
                 <Button type="primary" @click="primaryed">我知道了</Button>
            </div>
     </Modal>

    <!-- 重名 -->
    <Modal
            title="注意！导入后会有重名的商品"
            v-model="carel"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;">
                <h2 style="color:red;margin-bottom:10px;">此社区内已有重名的商品 <span style="color:black;">{{errdate}}</span></h2>
                <p>请确定是否真的要添加一个重名的商品，重名商品自动绑定相同的硬件设备</p>
            </div>
             <div slot="footer">
                 <Button type="primary" @click="determine" >确定导入</Button>
                 <Button type="ghost" style="margin-left:20px" @click="cencel" >取消</Button>
            </div>
    </Modal>
    <Modal
           :title="feactye"
            v-model="pudyt"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;">
             <span  style="color:red;text-decoration:underline;">请仔细检查后重新上传！</span>
            </div>
    
             <div slot="footer" style="text-align:center;">
                 <Button type="primary" @click="getpudyt">我知道了</Button>
            </div>
     </Modal>

    
    <Modal
            :title="warnCode"
            v-model="butpudyt"
            class-name="vertical-center-modal"
            style="text-align:left;"
            >
            <div style="text-align:left;">
                <p>商品名称、楼层、房间类型、工位数量必填</p>
             <span  style="color:red;text-decoration:underline;">请仔细检查后重新上传！</span>
            </div>
    
             <div slot="footer" style="text-align:center;">
                 <Button type="primary"  @click="innown">我知道了</Button>
            </div>
     </Modal>

     <Modal
            title="添加成功!"
            v-model="serviceOpen"
            class-name="vertical-center-modal"
            >
        <BindService 
           v-if="serviceOpen"
           @submit="submitService"
           @cancel="cancelService"
           :singleForms="tabForms"
           :floor="newgoodForm.floor"
           :editData="serviceData"
        />
        <div slot="footer">
        
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
import ChangePrice from './bulk-changes/change-price';
import Loading from '~/components/Loading';
import SearchForm from './search-form';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import publicFn from '../publicFn';
import SlotHead from './fixed-head';
import dateUtils from 'vue-dateutils';
import BindService from './bind-service';
import Buttons from '~/components/Buttons';
import EditGoods from './editGoods';
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
                ImportFile,
                BindService,
                Buttons,
                EditGoods,
                ChangePrice
                 },
        props:{
                mask:String
            },
          data() {
                return{
            editOpen:false,
            priceOpen:false,
            editData:{},
            serviceData:{},
            warnCode:'',
            serviceOpen:false,
            fiteter:'',
            feactye:'',
            tables:'',
            failurec:'',
            errdated:'',
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
                    title: '商品名称',
                    key: 'name',
                    align:'center',
                     render(h, params){
                         var ile= params.row.name;
                         var nes=params.row.duplicateNo;
                          var btnRender=[];
                          if(params.row.duplicateNo==0){
                                btnRender=[
                                   h('p', {                                       
                                        },ile),
                                ];
                          }else{
                                 btnRender.push(
                                     h('p', { 
                                        
                                        },ile),
                                         h('span', { 
                                                style: {
                                                    color:'black'
                                                }       
                                            },'('),
                                         h('span', { 
                                                style: {
                                                    color:'#FF6868'
                                                }       
                                            },'有重复 '),
                                               h('span', { 
                                                style: {
                                                    color:'black'
                                                }       
                                            },' 编号'+nes+')'),
                            )
                          }
                          return h('div',btnRender)

                    }
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
                         var bacsk=params.row.suiteTypeName;
                         var devel=params.row.locationTypeName;
                         var colorClass='redClas' ; 
                          return h('div', [
                                        h('span',{
                                          attrs: {

                                              class:colorClass
                                        }
                                        },devel),
                                        h('span',{
                                          
                                        attrs: {
                                                class:colorClass
                                            }

                                        },bacsk),
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
                    return tag('span',{
                            attrs: {
                                class:colorClass
                            }
                    },statusName);
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
                                var endRender=dateUtils.dateToStr("YYYY-MM-DD",new Date(item.startDate))+'起'+' ';
                                 var staRender=item.goodsStatusName?item.goodsStatusName:'-';
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
                    key: 'bindingText',
                    align:'center',
                    width:60,
                    render:(h,params)=>{
                        let middle=params.row.binding;
                        let ren=params.row.bindingText?params.row.bindingText:'-';
                        return h('span', {
                                style: {
                                    color:middle=='0'?'red':'',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editService(params.row)
                                    }
                                }
                        },ren)
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
                        return h('span',{
                            attrs: {
                                class:colorClass
                            }
                        },statusName);
                    }
                }
            ],
            attractData:[],
            statusData:[],
            newgoodsData:[],
            floorList:[], 
            floor:'',
            serviceId:'',
            statusOldData:[],
            singleForms:{},
            floorStr:'', 
            isAdd:false   
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
        openPrice(){
            if(!this.statusData.length){
                this.$Notice.error({
                    title:'请选择至少一个商品'
                });
                return ;
            }
            this.cancelPrice();
        },
        cancelPrice(){
            this.priceOpen=!this.priceOpen;
        },
        submitPrice(){
            this.getListData(this.tabForms);
            this.statusData=[];
            this.cancelPrice();
        },
        editService(params){
            this.cancelService();
            this.serviceData=Object.assign({},params);
        },
        showpushe(){
            this.butpushd=!this.butpushd;
        },

        cityFloor(params){
            this.tabForms=Object.assign({},this.tabForms,params,{page:1});
        },
        submitService(params){
            let middleData=Object.assign({},this.serviceData);
            let data={
                goodsType:middleData.goodsType||this.newgoodForm.goodsType,
                basicSpaceId:params.basicSpaceId,
                id:middleData.id||this.serviceId
            }
            this.$http.post('goods-service-add',data).then((response)=>{
                this.cancelService();
                this.getListData(this.tabForms)
                this.butpushd=!this.butpushd;
        
            }).catch((error)=>{
               this.$Notice.error({
                    title:error.message
                }); 
            })
        },

    

        cancelService(){
            this.serviceData={};
            this.serviceOpen=!this.serviceOpen;
        },
        clanar(){
            window.open('/new/#/product/communityAllocation/communityPlanList','_blank')
        },
        getFloor(list){
            this.floorList = [].concat(list);
        },
         butNewgoods(){//新增商品
                    
                     this.newmodal=!this.newmodal;      
                  },
        showStatus(){
                    this.butNewgoods();
                }, 
        getpudyt(){  
                this.pudyt=!this.pudyt;
        },
        getbutpudyt(){
            this.butpudyt=!this.butpudyt
        },      
          innown(){
            this.butpudyt=!this.butpudyt
        },      
         getsubGoods(){//注意
                    this.careful=!this.careful;
                    },  
         showtPush(){//二次确定
              this.careful=!this.careful;
         },   
        buttPush(){
            this.getsubGoods();
            this.getNew();
        },
        primarye(){
            this.butsuccess=!this.butsuccess;
        },

        getCheckName(){
            let data=Object.assign({},this.newgoodForm,{communityId:this.tabForms.communityId}); 
            this.$http.get('getNew-Rename',data).then((response)=>{
                this.getNew();          
            }).catch((error)=>{
                    if(error.code==-1){
                        this.newmodal=false;
                        this.editOpen=false;
                        this.getsubGoods();
                        this.errdated=error.message;
                    }else{
                        this.openMessage=true;
                        this.MessageType="error";
                        this.warn=error.message;
                    } 
            })
        },
            //添加弹窗2
        subGoods(){
              let newPage=this.$refs.goodsNewPage.$refs;
              newPage['formItem'].validate((valid) => {
                    if (valid) {
                       this.getCheckName();
                       this.isAdd=false;
                    }
                })     
        },
        submitEdit(){
            let newPage=this.$refs.goodsEditPage.$refs;
              newPage['formItem'].validate((valid) => {
                    if (valid) {
                       this.getCheckName();
                       this.isAdd=true;
                    }
             })  
        },
       //新增接口a
        getNew(){
        let url=this.isAdd?'goods-service-edit':'getNew-lyadded';
         this.newgoodForm.communityId=this.tabForms.communityId;
         let data=Object.assign({},this.newgoodForm);
         this.$http.post(url,data).then((response)=>{ 
              this.serviceId=(typeof response.data)=='number'?response.data:'';
              this.getListData(this.tabForms);
              this.serviceOpen=!this.serviceOpen;
              this.newmodal=false;
              this.editOpen=false;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
        },
        cencel(){
                this.carel=!this.carel;
        },
        //导入入口
        importgoods(){
                this.vImport=!this.vImport;
        },
        subsuccess(){
                    this.butsuccess=!this.butsuccess
        },    
        importsu(){
                this.importsuccess=!this.importsuccess;
        },
        downFile(){
            var a = document.createElement('a');
            a.href = '/api/order/goods/import/download-template';
            a.download = name || "";
            a.click();
        },
        close(){
            this.vImport=!this.vImport;
        },
        upload(file){//商品导入重复
        // console.log('ppppppppppp',file)
        // this.vImport=!this.vImport;
         this.importgoods();
         let _this = this;
         this.fiteter=file;
         var form = new FormData();

        // console.log(this.tabForms.floor,"ppppp")
         form.append('floors',this.floorStr);
         form.append('goodsData',file);
         form.append('communityId',this.tabForms.communityId);
         var xhr = new XMLHttpRequest();
		 xhr.onreadystatechange = function() {
			 if (xhr.readyState === 4) {
				 if (xhr.status === 200) {
                    //  console.log('eeessssssssssss', xhr.response.code )
					 if (xhr.response && xhr.response.code > 0) {
                        _this.judgeRepeat(file);
					 } else {
                  if(xhr.response.code==-1){
                            _this.getsubGods();
                            _this.errdate=xhr.response.message;
                    }
                     else if(xhr.response.code==-2){
                         _this.getbutpudyt();
                        _this.warnCode=xhr.response.message;
                    }else if(xhr.response.code==-3){
                       _this.getpudyt(); 
                       _this.feactye=xhr.response.message;
                    } 
					 }
                 }
                
			 }
		 };
		 xhr.open('POST','/api/krspace-finance-web/cmt/goods/check-excel',true);
		 xhr.responseType = 'json';
		 xhr.send(form);
       },
        error(response){
                   if(!error.message){
                            this.getsubGods(error.data);
                    } else{
                        this.openMessage=true;
                        this.MessageType="error";
                        this.warn=error.message;
                    } 
        },
        getsubGods(){
            this.carel=!this.carel;
        },
        primaryed(){
            this.feated=!this.feated;
        },
        continu(){//继续
            this.importsuccess=!this.importsuccess;
            this.feated=!this.feated;
        },
        judgeRepeat(file){  //商品导入      
            let _this = this;
            var form = new FormData();
            form.append('goodsData',this.fiteter); 
            form.append('communityId',this.tabForms.communityId);
    
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        
                        if (xhr.response && xhr.response.code > 0) {
                            _this.success(xhr.response);
                        } else {
                            _this.error(xhr.response);
                        }
                    }
                    else {
                        _this.$Notice.error({
                            title:'上传失败'
                        });
                    }
                }
            };
            xhr.open('POST','/api/krspace-finance-web/cmt/goods/import/excel', true);
            xhr.responseType = 'json';
            xhr.send(form);
        },
        success(response){
            this.importsu();
            this.resect=response.data;

        },
        error(response){
            this.openMessage=true;
            this.MessageType="error";
            this.warn=response.message;
        },
        initData(formItem,floorList){
            this.tabForms=Object.assign({},this.tabForms,formItem);
            var str='';
            if(this.tabForms.floor==' '||this.tabForms.floor==''){
                // for
                for(var i=floorList.length-1; i>=0; i--){
                    if(floorList[i].floor!=' '){
                             str=str+floorList[i].floor+','
                    }
                }
                str=str.substring(0,str.length-1);
                this.floorStr = str;
            }
           console.log('floorListfloorListfloorListfloorList',floorList)
        },
        searchClick(values){
            this.tabForms=Object.assign({},this.tabForms,values,{page:1});
        },
        clearClick(values){
            this.tabForms=Object.assign({},this.tabForms,values);
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
        cancelEdit(){
            this.editOpen=!this.editOpen;
            this.serviceData={};
        },
        openEdit(params){
            this.serviceData=Object.assign({},params);
            this.$http.get('goods-service-get',params).then((response)=>{ 
                this.editData=response.data;
                this.editOpen=!this.editOpen;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                }); 
            })  
        },
        openEditStyle(){
            this.isShowEdit=!this.isShowEdit;
            if(!this.isShowEdit){
                this.attractColumns.push(
                   {
                    title: '操作',
                    key: 'action',
                    align:'center',
                    width:100,
                    render:(h,params)=>{
                        return h('span', {
                                style: {
                                    color:'#499df1',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.openEdit(params.row)
                                    }
                                }
                        },'编辑')
                    }
                }
             )  
            }else{
                this.attractColumns.splice(this.attractColumns.length-1,1);
            }
        },
        openStatus(){
            if(!this.statusData.length){
                this.$Notice.error({
                    title:'请选择至少一个商品'
                });
                return ;
            }
            this.modifystate=!this.modifystate;
            this.errorData=[];
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
                    this.statusData=[];
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
        determine(){//确定导入
            this.getsubGods();
            this.subsuccess();
            this.judgeRepeat();
          
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
                this.statusOldData=select;
            },
            getListData(tabParams){//列表
                this.loading=true;
                let params = Object.assign({},tabParams)
                params.floor = params.floor.length>1?' ':params.floor;
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
                this.tabForms=Object.assign({},this.tabForms,{page:page})
            },
            onMessageChange(data){
            this.openMessage=data;
            },
        }
}
</script>
<style lang='less'>
  .attract-investment{
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
     .ww{
         color: black;
     }
</style>
