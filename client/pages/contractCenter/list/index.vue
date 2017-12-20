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
                    @on-change="changeCustomer"
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
                <Page :total="totalCount" @on-change="changePage" show-total show-elevator></Page>
            </div>
        </div>
        <Modal
            v-model="openSearch"
            title="高级搜索"
            width="660"
            @on-ok='upperSubmit'
        >
            <HeightSearch v-on:bindData="upperChange" mask='join'></HeightSearch>
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
            title="添加描述"
            width="660"
        >
            <Describe v-on:bindData="describeDataChange"></Describe>
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
        
    </div>
  
</template>
<script>


   
    import sectionTitle from '~/components/SectionTitle.vue';
    import krUpload from '~/components/KrUpload.vue';
    import HeightSearch from './heightSearch';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Describe from './describe';
    
    export default {
        components: {
            sectionTitle,
            krUpload,
            HeightSearch,
            Describe
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
                loadingStatus: false,
                file: null,
                parameter:{},//获取pdf-id的参数
                upperData:{},//高级查询的数据
                upperError:false,
                openSearch:false,
                describeError:false,
                detail:[],
                describeData:{},//其他约定的数据
                columnDetail:{},//每一行的数据
                totalCount:1,
                columns: [
                    
                    {
                        title: '合同编号',
                        key: 'serialNumber',
                        align:'center',
                        fixed: 'left'
                    },
                    {
                        title: '客户名称',
                        key: 'customName',
                        align:'center',
                        fixed: 'left'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '合同类型',
                        key: 'contractType',
                        align:'center'
                    },
                    {
                        title: '合同状态',
                        key: 'contractStatusName',
                        align:'center',
                    },
                    {
                        title: '创建人',
                        key: 'creatorName',
                        align:'center',
                    },
                    {
                        title: '服务费',
                        key: 'serviceCharges',
                        align:'center',
                    }, {
                        title: '销售员',
                        key: 'salerName',
                        align:'center',
                    },{
                        title: '工位数/独立空间',
                        key: ' stationAndBoard',
                        align:'center',
                    },
                   
                    {
                        title: '合同创建时间',
                        key: 'startAndEnd',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.cTime));
                            return time;
                        }
                    },
                    {
                        title: '起始时间',
                        key: 'cTime',
                        align:'center',
                        render(h, obj){
                            if(!obj.row.endDate || !obj.row.startDate){
                                return "-";
                            }
                            let end=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.endDate));
                            let start = dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.startDate));
                            return start+"至"+end;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
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
                                }, '下载'), h('Button', {
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
                                }, '合同生效'), h('Button', {
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
                                }, '合同描述'),
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
                          
                           return h('div',btnRender);  
                        }
                    }
                ],
                detail:[]
            }
        },
        mounted(){
           this.getListData(this.params);
        },
        methods:{
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
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
                }, (error) => {
                    that.$Notice.error({
                        title:error.message
                    });
                })   
            },
            //描述页面开关
            describeSwitch(){
                this.openDescribe = !this.openDescribe;
            },
            //合同生效按钮点击
            clickDescribe(detail){
                this.columnDetail = detail.row;
                this.describeSwitch();
            },
            //描述确定
            describeSubmit(){
                var that = this;
                this.config();
                var colDetail = Object.assign({},this.columnDetail);
                var describeData = Object.assign({},this.describeData);
               
                this.$http.post("post-contract-other-convention", {
                    requestId:colDetail.requestId,
                    otherAgreed:describeData.otherAgreed||''
                }, (response) => {
                    that.takeEffectSwitch();
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
                params.ids = [].concat(this.selectAllData);
                utils.commonExport(params,'/api/krspace-erp-web/wf/station/contract/enter/export');
            },
            getListData(params){
                var _this=this;
                 this.config()
                 this.$http.get('get-center-list-contract', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.detail=r.data.items;
                    _this.openSearch=false;
                   
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
            //搜索change事件
            changeCustomer(param){
                // this.params.customerName=param.target.value;
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