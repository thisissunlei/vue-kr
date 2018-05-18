<template>
    <div class="contract-center-list">
        <SectionTitle title="数据监控" />
        <div style='text-align:right;margin-bottom:10px'>
          
            <div style='display:inline-block;margin:10px 20px;'>
                <span style='padding-right:10px'>客户名称</span>
                <i-input 
                    v-model="params.customName" 
                    placeholder="请输入客户名称"
                    style="width: 252px"
                    @keyup.enter.native="onKeyEnter($event)"
                />
            </div>
            <div class='m-search' @click="submitLowerSearch">搜索</div>
        </div>
        <Table 
            border 
            ref="selection" 
            :columns="columns" 
            :data="detail" 
            style="margin:20px"
           
        />
        <div style="margin: 10px 20px;overflow: hidden">
            <Button type="primary" @click="onExport">导出</Button>
            <div style="float: right;">
                <Page :total="totalCount" :page-size='15' @on-change="onPageChange" show-total show-elevator/>
            </div>
        </div>
    </div>
</template>


<script>
    import SectionTitle from '~/components/SectionTitle';
    import Loading from '~/components/Loading';
    import krUpload from '~/components/KrUpload';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    var maxWidth = 170;
    export default {
        head () {
            return {
                title: "合同列表"
            }
           
        },

        components: {
            SectionTitle,
            krUpload,
            Loading,
            Message,
            Buttons
        },
       
        data () {
            return {
                params:{
                    page:1,
                    pageSize:15,
                },
                newWin:'',
                effectDisabled:false,
                describeDisabled:false,
                tableHeight:200,
                MessageType:'',
                openMessage:false,
                warn:'',
                openDown:false,
                isCachet:false,
                openTakeEffect:false,
                openDescribe:false,
                selectAllData:[],
                loadingStatus: true,
                file: null,
                otherAgreed:0,
                parameter:{},//获取pdf-id的参数
                upperData:{},//高级查询的数据
                upperError:false,
                openSearch:false,
                describeError:false,
                detail:[],
                describeData:{},//其他约定的数据
                columnDetail:{},//每一行的数据
                totalCount:1,
                maxWidth:170,
                downType:"down",

                columns: [
                    
                    {
                        title: '社区id',
                        key: 'communityId',
                        align:'center',
                        fixed: 'left',
                        width: 150,
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                        fixed: 'left',
                       
                    },
                    {
                        title: '校验结果说明',
                        key: 'content',
                        align:'center'
                    },
                    {
                        title: '客户id',
                        key: 'customerId',
                        align:'center'
                       
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '校验类型',
                        key: 'validateType',
                        align:'center'
                    },
                    {
                        title: '创建时间',
                        key: 'startAndEnd',
                        align:'center',
                        width: 150,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.cTime));
                            return time;
                        }
                    },
                ],
                detail:[]
            }
        },
       created(){
          var params=Object.assign({},{page:1,pageSize:15},this.$route.query);
          this.getListData(params);
          this.params=params; 
        },

        mounted(){
            this.onWindowSize();
            this.tableHeight = document.documentElement.clientHeight-360;
        },
        
        methods:{

            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },

            onKeyEnter: function (ev) {
                this.submitLowerSearch();
            },

            onWindowSize:function(){
                window.onresize = function () {
                    var width = document.body.clientWidth;
                    if(width>1870){
                        this.maxWidth = width - 1700;
                    }else {
                        this.maxWidth = 170;
                    }
                }
            },

            //合同生效开关
            showTakeEffect(){
                this.effectDisabled=false;
                this.openTakeEffect = !this.openTakeEffect;
            },

            //生效确定
            submitTakeEffect(){
                this.config();
                this.effectDisabled=true;
                var detail = Object.assign({},this.columnDetail);
                
                //  if(this.effectDisabled){
                //      return ;
                //  }
                
                this.$http.post("post-contract-take-effect", {
                    requestId:detail.requestId
                }, (response) => {
                    this.showTakeEffect();
                    this.getListData(this.params);
                    this.openMessage=true;
                    this.MessageType=response.message=='ok'?"success":"error";
                    this.warn="合同已生效！";
                }, (error) => {
                    this.effectDisabled=false;
                    this.$Notice.error({
                        title:error.message
                    });
                })   
            },

            //其他约定页面开关
            showDescribe(){
                this.describeDisabled=false;
                this.openDescribe = !this.openDescribe;
            },

            //其他约定按钮点击
            onConvention(detail){
                this.otherAgreed = detail.row.otherAgreed;
                this.columnDetail = detail.row;
                this.showDescribe();
                this.getOtherConvention({requestId:detail.row.requestId});
            },

            //描述确定
            submitDescribe(){
                this.config();
                var colDetail = Object.assign({},this.columnDetail);
                var describeData = Object.assign({},this.describeData);

                if(this.describeDisabled){
                     return ;
                 }
                 this.describeDisabled=true;
                 this.showDescribe();
                this.$http.post("post-contract-other-convention", {
                    requestId:colDetail.requestId,
                    otherAgreed:this.otherAgreed||''
                    
                }, (response) => {
                    this.getListData(this.params);
                     this.$Notice.success({
                        title:"提交成功！"
                    });
                }, (error) => {
                    this.$Notice.error({
                        title:error.message
                    });
                })   
            },

            //合同生效
            onContractFor(detail){
                this.columnDetail = detail.row;
                this.showTakeEffect()
            },

            showSearch (params) {    
                this.openSearch=!this.openSearch; 
            },

            jumpView(params){
                window.open(`../../../../publicPage/${params.row.id}/pdf-view?contractType=&requestId=${params.row.requestId}`,'_blank')  
            },

            //下定按钮被点击载确
            submitDownLoad(params){

                if(this.downType =="print"){
                    var typeList = [{
                        name: '入驻合同',
                        value: 'join'
                    }, {
                        name: '增租合同',
                        value: 'increase'
                    }, {
                        name: '减租合同',
                        value: 'reduce'
                    },{
                        name: '续租合同',
                        value: 'renew'
                    }];
                    var type = "join";
                    var href = '';
                    var port = location.port || '';
                    if (port) {
                        port = ":" + port;
                    }
                    for(let i=0;i<typeList.length;i++){
                        if(typeList[i].name==this.columnDetail.contractType){
                            type = typeList[i].value;
                        }
                    }
                    window.open(location.protocol + "//"+location.hostname+port+`/new/#/operation/customerManage/1/order/1/agreement/${type}/${this.columnDetail.orderId}/print?print=${this.isCachet}`,'_blank')  
                    this.showDown();
                    return ;
                }
                this.config()

                var parameter = Object.assign({},this.parameter)
                if(this.isCachet){
                    parameter.contractType = "HAVESEAL"
                }else{
                    parameter.contractType = "NOSEAL"
                }
                this.downLoadPdf(parameter);
                this.showDown();
            },
            //下载接口调用
            downLoadPdf(params){
                this.$http.post('contract-list-get-pdf-url', params, (response) => {
                    utils.downFile(response.data)
                   
                }, (error) => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })   
            },
            
            onExport (){
                var params = Object.assign({},this.params);
                utils.commonExport(params,'/api/krspace-erp-web/wf/station/contract/enter/export');
            },

            getListData(params){
                 this.config()
                 this.$http.get('get-center-list-contract', params, r => {
                    this.totalCount=r.data.totalCount;
                    this.detail=r.data.items;
                    this.openSearch=false;
                   this.loadingStatus=false;
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })   
            },

            //分页事件
            onPageChange (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },

            //获取其他约定的信息
            getOtherConvention(params){
                this.config()
                this.$http.get('get-contract-other-convention-data', params, r => {
                    this.describeData.otherAgreed=r.data.otherAgreed;
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })   
            },
      
            //搜索框
            submitLowerSearch(){
                this.params.page = 1;
                utils.addParams(this.params);
            },

            // 高级查询修改
            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },

             //高级查询确定
            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params.page = 1;
                this.params=Object.assign({},this.params,this.upperData);
                this.params.pigeonholed=this.params.pigeonholed?(this.params.pigeonholed=='true'?true:false):'';
                this.params.minCTime=this.params.minCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.minCTime)):'';
                this.params.maxCTime=this.params.maxCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.maxCTime)):'';
                utils.addParams(this.params);

            },

            //选择
            selectCachet(select){
             this.isCachet = select;
            },

            showDown(){
                this.openDown = !this.openDown;
            },

            //保存上传文件的地址   
            postUrlUpLoad(detail,col){
                this.$http.post("post-list-upload-url", {
                    fileList:JSON.stringify(detail),
                    requestId:col.requestId,
                }, (response) => {
                    // this.$Notice.success({
                    //     title:"合同已生效"
                    // });
                     this.getListData(this.params);
                }, (error) => {
                    this.$Notice.error({
                        title:error.message
                    });
                })   
            },

            onMessageChange(data){
                this.openMessage=data;
            },
            
        },
        
    }
</script>
<style lang="less" > 
    
</style>