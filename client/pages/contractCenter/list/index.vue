<style lang="less"> 
    .page {
        margin-top:20px;
    }
    .m-bill-search{
        display:inline-block;
        height:22px;
        margin:16px 20px;
        vertical-align: bottom;

        span{
            width:22px;
            height:22px;
            background-size: contain;  
            float:right;
            cursor:pointer;
            background:url('~assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
        }
    }
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
     .cachet-box{
        width:50%;
        position:relative;
        float:left;
        text-align:center;
        cursor: pointer;
        .select{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -31px;
            margin-top: -31px;

        }
        .cachet{
            border: 2px solid #7ED321;
            background: #7ED321 url('~/assets/images/check.svg') no-repeat;
            background-size: 60%;
            background-position:center;
        }
     }
</style>


<template>

    <div>
        <sectionTitle label = "合同列表"></sectionTitle>
       <div style='text-align:right;margin-bottom:10px'>
          
            <div style='display:inline-block;margin:10px 20px;'>
                <span style='padding-right:10px'>客户名称</span>
                <i-input 
                    v-model="params.customName" 
                    placeholder="请输入客户名称"
                    style="width: 252px"
                   
                ></i-input>
            </div>
            <div class='m-search' @click="lowerSubmit">搜索</div>
            <div class="m-bill-search" @click="showSearch">
                <span></span>   
            </div> 
        </div>
        <Table 
            border 
            ref="selection" 
            :columns="columns" 
            :data="detail" 
        ></Table>
        <div style="margin: 10px;overflow: hidden">
            <Button type="primary" @click="outSubmit">导出</Button>
            <div style="float: right;">
                <Page :total="totalCount" :page-size='15' @on-change="changePage" show-total show-elevator></Page>
            </div>
        </div>
        <Modal
            v-model="openSearch"
            title="高级搜索"
            width="660"
            @on-ok='upperSubmit'
        >
            <HeightSearch :params = "params" v-on:bindData="upperChange" mask='join'></HeightSearch>
            <div slot="footer">
                    <Button type="primary" @click="upperSubmit">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
            </div>
        </Modal>

         <Modal
            v-model="openTakeEffect"
            title="合同生效"
            width="660"
        >
            <div>合同是否生效?</div>
            <div slot="footer">
                <Button type="primary" @click="takeEffectSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="takeEffectSwitch">取消</Button>
            </div>
        </Modal>
        
         <Modal
            v-model="openDescribe"
            title="其他约定"
            width="660"
        >
            <!-- <Describe v-on:bindData="describeDataChange" :detailData="this.columnDetail"></Describe> -->
            <Input v-model="otherAgreed" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入描述..."></Input>

            <div slot="footer">
                <Button type="primary" @click="describeSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="describeSwitch">取消</Button>
            </div>
        </Modal>

        <Modal
            v-model="openDown"
            title="下载pdf"
            width="660"
        >
                <div style="text-align:center;font-size: 16px;color: #333;">请选择您打印的合同是否需要盖公章？</div>
                
                <div style="height:300px;">
                <div class="cachet-box" @click="selectCachet(false)">
                    <img src="./images/noCachet.png" />
                    <div>示例一：未加盖公章的合同</div>
                    <div :class="!this.isCachet?'select cachet':'select'" ></div>
                </div>
            
                <div class="cachet-box" @click="selectCachet(true)">
                    <img src="./images/cachet.png" />
                    <div>示例二：加盖公章的合同</div>
                    <div :class="this.isCachet?'select cachet':'select'"></div>
                </div>
                </div>
                <div slot="footer">
                    <Button type="primary" @click="downLoad">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="downSwitch">取消</Button>
                </div>
        </Modal>

        <Loading :loading='loadingStatus'/>
        
    </div>
  
</template>
<script>


   
    import sectionTitle from '~/components/SectionTitle.vue';
    import Loading from '~/components/Loading';
    import krUpload from '~/components/KrUpload.vue';
    import HeightSearch from './heightSearch';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    var maxWidth = 170;
    export default {
        components: {
            sectionTitle,
            krUpload,
            HeightSearch,
            Loading
        },
        head () {
            return {
                title: "合同列表"
            }
           
        },
        data () {
            return {
                params:{
                    page:1,
                    pageSize:15,
                },
                openDown:false,
                isCachet:false,
                openTakeEffect:false,
                openDescribe:false,
                selectAllData:[],
                loadingStatus: true,
                file: null,
                otherAgreed:'',
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
                columns: [
                    
                    {
                        title: '合同编号',
                        key: 'serialNumber',
                        align:'center',
                        fixed: 'left',
                        width: 150,
                    },
                    {
                        title: '客户名称',
                        key: 'customName',
                        align:'center',
                        fixed: 'left',
                        width: 150,
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                        width: 100,
                    },
                    {
                        title: '合同类型',
                        key: 'contractType',
                        align:'center',
                        width: 150,
                    },
                    {
                        title: '合同状态',
                        key: 'contractStatusName',
                        align:'center',
                        width: 150,
                    },
                    {
                        title: '创建人',
                        key: 'creatorName',
                        align:'center',
                        width: 80,
                    },
                    {
                        title: '服务费',
                        key: 'serviceCharges',
                        align:'center',
                        width: 150,
                    }, {
                        title: '销售员',
                        key: 'salerName',
                        align:'center',
                        width: 80,
                    },{
                        title: '录入人',
                        key: 'inputor',
                        align:'center',
                        width: 80,
                    },{
                        title: '其他约定',
                        key: 'otherAgreed',
                        align:'center',
                        width: 100,
                    },{
                        title: '附件',
                        key: 'haveAttachment',
                        align:'center',
                        width: 80,
                    },{//其他约定	
                        title: '工位数/独立空间',
                        key: 'stationAndBoard',
                        align:'center',
                        width: 150,
                    },
                   
                    {
                        title: '合同创建时间',
                        key: 'startAndEnd',
                        align:'center',
                        width: 150,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.cTime));
                            return time;
                        }
                    },
                    {
                        title: '起始时间',
                        key: 'cTime',
                        align:'center',
                        width: 200,
                        render(h, obj){
                            if(!obj.row.endDate || !obj.row.startDate){
                                return "-";
                            }
                            let end=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.endDate));
                            let start = dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.startDate));
                            return start+"至"+end;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        width: 150,
                      
                        render:(h,params)=>{
                            let arr = params.row.file||[];
                            let newArr = []
                            for(let i=0;i<arr.length;i++){
                                newArr.push(Object.assign({"name":arr[i].fileName,"url":''},arr[i]))
                            }
                           var btnRender=[
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
                                            this.openView(params)
                                        }
                                    }
                                }, '查看'), h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.downLoadClick(params)
                                        }
                                    }
                                }, '下载'), 
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
                                                this.contractFor(params)
                                            }
                                        }
                                    }, '合同生效'),
                                h(krUpload, {
                                    props: {
                                        action:'//jsonplaceholder.typicode.com/posts/',
                                        file: newArr,
                                        columnDetail:params.row||{}
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                },'44')
                                ];
                                
                                if(!params.row.isEffect){
                                    btnRender.push(h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'#2b85e4'
                                        },
                                        on: {
                                            click: () => {
                                                this.clickDescribe(params)
                                            }
                                        }
                                    }, '其他约定'))
                                }
                                if(!params.row.isEffect  ){

                                }
                        
                           return h('div',btnRender);  
                        }
                    }
                ],
                detail:[]
            }
        },
        mounted(){
           this.getListData(this.params);
           this.onWindowSize();
        },
        methods:{
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
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
            takeEffectSwitch(){
                this.openTakeEffect = !this.openTakeEffect;
            },
            //生效确定
            takeEffectSubmit(){
                var that = this;
                this.config();
                var detail = Object.assign({},this.columnDetail);
               
                this.$http.post("post-contract-take-effect", {
                    requestId:detail.requestId
                }, (response) => {
                    that.takeEffectSwitch();
                    that.getListData(that.params);
                }, (error) => {
                    that.$Notice.error({
                        title:error.message
                    });
                })   
            },
            //其他约定页面开关
            describeSwitch(){
                this.openDescribe = !this.openDescribe;
            },
            //其他约定按钮点击
            clickDescribe(detail){
                this.otherAgreed = detail.row.otherAgreed;
                this.columnDetail = detail.row;
                this.describeSwitch();
                this.getOtherConvention({requestId:detail.row.requestId});
            },
            //描述确定
            describeSubmit(){
                var that = this;
                this.config();
                var colDetail = Object.assign({},this.columnDetail);
                var describeData = Object.assign({},this.describeData);
               
                this.$http.post("post-contract-other-convention", {
                    requestId:colDetail.requestId,
                    otherAgreed:this.otherAgreed||''
                    
                }, (response) => {
                    that.describeSwitch();
                    that.getListData(this.params);
                     that.$Notice.success({
                        title:"提交成功！"
                    });
                }, (error) => {
                    that.$Notice.error({
                        title:error.message
                    });
                })   
            },
            //合同生效
            contractFor(detail){
                this.columnDetail = detail.row;
                this.takeEffectSwitch()
            },
            showSearch (params) {

                this.openSearch=!this.openSearch;
                utils.clearForm(this.upperData);
            },
            openView(params){

                location.href=`./${params.row.id}/viewCenter?contractType=&requestId=${params.row.requestId}`;
            },
            //下载
            downLoad(params){
                var that = this;
                this.config()
                var parameter = Object.assign({},this.parameter)
                if(this.isCachet){
                    parameter.contractType = "HAVESEAL"
                }else{
                    parameter.contractType = "NOSEAL"
                }
                this.$http.get('get-station-contract-pdf-id',parameter, r => {    
                    // _this.communityList=r.data.items 
                    if(!r.data.fileId){
                        that.$Notice.error({
                                title:"fileId不能为空！"
                        });
                        return;
                    }
                    
                    var url = `/api/krspace-op-web/sys/downFile?fileId=${r.data.fileId}`
                    window.location.href = url;
                    that.downSwitch();
                }, e => {
                    that.$Message.info(e);
                })
            },
            describeDataChange(params,error){

                this.describeError=error;
                this.describeData=params;
            },
            outSubmit (){
                var _this=this;
                var params = Object.assign({},this.params);
                
                utils.commonExport(params,'/api/krspace-erp-web/wf/station/contract/enter/export');
            },
            getListData(params){
                var _this=this;
                 this.config()
                 this.$http.get('get-center-list-contract', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.detail=r.data.items;
                    _this.openSearch=false;
                   _this.loadingStatus=false;
                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });
                })   
            },
            //分页事件
            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },
            //获取其他约定的信息
            getOtherConvention(params){
               
                var _this=this;
                this.config()
                this.$http.get('get-contract-other-convention-data', params, r => {
                    _this.describeData.otherAgreed=r.data.otherAgreed;
                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });
                })   
            },
      
            //搜索框
            lowerSubmit(){
                this.getListData(this.params);
            },
            // 高级查询修改
            upperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },
             //高级查询确定
            upperSubmit(){
                if(this.upperError){
                    return ;
                }
                console.log("-----",this.upperData)
                this.params=Object.assign({},this.params,this.upperData);
                this.params.minCTime=this.params.minCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.minCTime)):'';
                this.params.maxCTime=this.params.maxCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.maxCTime)):'';
                this.getListData(this.params);

            },
            selectCachet(select){
             this.isCachet = select;
            
            },
            downSwitch(){
                this.openDown = !this.openDown;
            },
            downLoadClick(params){
                var parameter = {requestId:params.row.requestId}
                this.parameter = parameter;
               this.downSwitch(); 
            }
            
        },
        
    }
</script>