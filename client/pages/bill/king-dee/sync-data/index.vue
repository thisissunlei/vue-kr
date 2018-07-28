<template>
    <div class="attract-king">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
            />
        </div>
        <SlotHead 
         :class="theHead?'header-here':'header-no'"
         :isShowEdit="isShowEdit"
         />

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
import ImportFile from '~/components/ImportFile';
//import Newgoods from './newgoods';
//import ChangeStatus from './bulk-changes/change-status';
//import ChangePrice from './bulk-changes/change-price';
import Loading from '~/components/Loading';
import SearchForm from './search-form';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
//import publicFn from '../publicFn';
import SlotHead from './fixed-head';
import dateUtils from 'vue-dateutils';
//mport BindService from './bind-service';
import Buttons from '~/components/Buttons';
//import EditGoods from './editGoods';
//import AddPhysical from './bulk-changes/add-physical';
export default {
        name:'Join',
       components:{
                Loading,
                SearchForm,
                Message,
                SlotHead,
              //  ChangeStatus,
              //  Newgoods,
              //  FlagLabel,
                ToolTip,
              //  ImportFile,
              //  BindService,
                Buttons,
              //  EditGoods,
              //  ChangePrice,
              //  AddPhysical
                 },
        props:{
                mask:String
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
            theHead:false,
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
                    width:200,
                    render:(h, params)=>{
                         let ile= params.row.syncStatus;
                         let nes='';
                         nes = ile === 'NOT_SYNC'?'失败':'成功';
                          return h('div',{
                            
                          },nes)

                    }
                },
                {
                    title: '同步时间',
                    key: 'createTime',
                    align:'center',
                    width:200,
                      render:(h, params)=>{
                         let ile= params.row.createTime;
                         ile = ile ? dateUtils.dateToStr('YYYY-MM-DD', new Date(ile)) : '';
                           return h('div',{
          
                          },ile)
                    }
                    
                },
                {
                    title: '传输数据数',
                    key: 'syncDataCount',
                    align:'center',
                    width:150,
                },
                {
                    title: '传输结果数',
                    key: 'successDataCount',
                    align:'center',
                    width:150,
                },
                {
                    title: '数据类型',
                    key: 'syncDataType',
                    align:'center',
                    width:150,
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
                    width:200,
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
                    width:200,
                 
                },
                {
                    title: '备注',
                    key: 'remark',
                    className:'current-range',
                    align:'center',
                    width:200, 
                 
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetail(params.row)
                                        }
                                    }
                                }, '查看')];
                        if(middle === 'NOT_SYNC'){
                            ren.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.retry(params.row)
                                        }
                                    }
                                }, '重试'));
                        }
                        return h('div',ren)
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
        goDetail(params){
            window.open('/bill/king-dee/sync-data/data-sync-view?type='+params.syncDataType+'&syncDataId='+params.id,'_blank')
        },
        openSpace(){
            if(!this.statusData.length){
                this.$Notice.error({
                    title:'请选择至少一个商品'
                });
                return ;
            }
            this.spaceOpen=!this.spaceOpen;
            this.errorData=[];       
        },
        openSingleStatus(array){
            this.statusData=[].concat([array]);
            this.statusOldData=[].concat([array]);
            this.openStatus();
        },
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
            console.log('middle--',this.newgoodForm,'3',middleData);
            let data={
                goodsType:this.newgoodForm.goodsType||middleData.goodsType,
                basicSpaceId:params.basicSpaceId,
                id:this.serviceId||middleData.id
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
            this.newgoodForm={};
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
                this.newgoodForm={};
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
            this.newgoodForm={};
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
        submitSpace(form){
           this.$http.post('goods-add-space',form).then((response)=>{    
              if(response.data.length){
                    this.errorData=response.data;
              }else{
                    this.openSpace()
                    this.openSpaceSuccess();
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
        openSpaceSuccess(){
            this.spaceTip=!this.spaceTip;
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
                let params = Object.assign({},tabParams);
             //   params.floor = params.floor.length>1?' ':params.floor;
                this.$http.get('king-getList',params).then((response)=>{
                    console.log('商品列表',response.data);
                    this.totalCount=response.data.totalCount;
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
        //新建同步
        handleCreateSync(){

        }
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
