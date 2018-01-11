<template>
    <div class='m-settlement-list'>
            <sectionTitle label="结算单管理"></sectionTitle>
            <div class='list-banner'>
                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>客户名称</span>
                            <i-input 
                                v-model="params.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="showKey($event)"
                            />
                         </div>
                         <div class='m-search' @click="lowerSubmit">搜索</div>
                         <div class="m-bill-search" @click="showSearch">
                           <span/>
                         </div> 
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border  class='list-table'/>
            <div  class='list-footer'>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' @on-change="changePage" show-total show-elevator/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch @bindData="upperChange" mask='join'/>
                <div slot="footer">
                    <Button type="primary" @click="upperSubmit">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
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

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onChangeOpen"
            />


    </div>
</template>


<script>
    import HeightSearch from './heightSearch';
    import dateUtils from 'vue-dateutils';
    import krUpload from '~/components/KrUpload.vue';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    import sectionTitle from '~/components/sectionTitle';

    export default {
        name:'settlement',
        components:{
            HeightSearch,
            // Nullify,
            Message,
            Buttons,
            sectionTitle,
            // ApplyContract
        },
         head() {
            return {
                title: '结算单管理'
            }
        },
        data () {
            
            return {
                openMessage:false,
                openTakeEffect:false,

                warn:'',

                MessageType:'',

                upperData:{},

                upperError:false,

                id:'',

                props:{},

                totalCount:1,

                params:{
                    page:1,
                    pageSize:15,
                    customerName:"",
                },

                openSearch:false,


                openApply:false,

                joinData:[],

                joinOrder: [
                    {
                        title: '结算单编号',
                        key: 'checklistNum',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'csrName',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'cmtName',
                        align:'center'
                    },
                    {
                        title: '退费金额',
                        key: 'totalRefunds',
                        align:'center'
                    },
                    {
                        title: '生成日期',
                        key: 'ctime',
                        align:'center',
                        render(tag, params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                            return time;
                        }
                    },
                    {
                        title: '状态',
                        key: 'checklistStatus',
                        align:'center',
                        render(h, params){
                            var orderStatus={
                               'NOT_EFFECTIVE':'未生效',
                               'EFFECTIVE':'已生效',
                               'INVALID':'已作废',
                               'INVALID':'已完成'
                            }
                            var style='';
                            let status = ''
                            for(var item in orderStatus){
                                if(item==params.row.orderStatus){
                                    
                                    if(item=='NOT_EFFECTIVE'){
                                        style='u-red';
                                    }
                                    if(item=='INVALID'){
                                        style='u-nullify';
                                    }
                                    status = orderStatus[item] 
                                }
                            }
                            return h('div', [
                                h('span', {
                                class:`u-txt ${style}`,                                    
                                }, status)
                            ]);
                        }
                    },
                   
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(tag,params)=>{
                             let arr = params.row.file||[];
                            let newArr = []
                            for(let i=0;i<arr.length;i++){
                                newArr.push(Object.assign({"name":arr[i].fileName,"url":''},arr[i]))
                            }
                           var btnRender=[
                               tag(Buttons, {
                                   props: {
                                        type: 'text',
                                        checkAction:'order_seat_show',
                                        label:'查看',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.showView(params)
                                        }
                                    }
                                })];
                           if(params.row.orderStatus=='NOT_EFFECTIVE'){
                               btnRender.push(
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
                                            this.showApply(params)
                                        }
                                    }
                                }, '申请合同'),
                                tag(krUpload, {
                                    props: {
                                        action:'//jsonplaceholder.typicode.com/posts/',
                                        file: newArr,
                                        columnDetail:params.row||{},
                                        upUrl:this.urlUpLoad
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                },'44'),
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
                                            this.showEdit(params)
                                        }
                                    }
                                }, '编辑'))
                           }
                           if(params.row.isEffect || !params.row.haveAttachment){
                                        
                                    
                            // }else{
                                btnRender.push( tag('Button', {
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
                                }, '合同生效'))
                            }
                           return tag('div',btnRender);  
                        }
                    }
                ]
            }
        },
        
        created(){
          var params=Object.assign({},this.$route.query,{page:1,pageSize:15});
          this.getListData(params);
          this.params=params;
        },

        methods:{
            urlUpLoad(detail,col){
               
                var _this = this;
                this.$http.post("post-list-upload-url", {
                    fileList:JSON.stringify(detail),
                    requestId:col.requestId,
                }, (response) => {
                    // _this.$Notice.success({
                    //     title:"合同已生效"
                    // });
                     _this.getListData(_this.params);
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
                    that.openMessage=true;
                    that.MessageType=response.message=='ok'?"success":"error";
                    that.warn="已合同生效！";
                }, (error) => {
                    that.$Notice.error({
                        title:error.message
                    });
                })   
            },

            showKey: function (ev) {
                this.lowerSubmit();
            },

            showSearch () {
                this.openSearch=!this.openSearch;
                utils.clearForm(this.upperData);
            },
            
            //申请合同
            showApply(params){
                this.id=params.row.id;
                this.openApply=true;
            },
            // 查看
            showView(params){
                console.log('params',params)
                window.open(`/bill/settlement-list/${params.row.id}/detail/`,params.row.id);
            },
            // 编辑
            showEdit(params){

            },
            // 提示信息
            nullifySubmit (){
                let params={
                    id:this.id
                };
                 
                 this.$http.post('join-nullify', params,r => {
                    this.getListData(this.params);
                }, e => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                })
            },
            // 列表基础数据
            getListData(params){
                var _this=this;
                 this.$http.get('get-settlements-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.openMessage=true;
                    _this.MessageType="error";
                    _this.warn=e.message;
                })   
            },
            // 分页
            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },
            // 搜索穿参
            lowerSubmit(){
                utils.addParams(this.params);
            },
            // 高级搜索数据
            upperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },
            // 高级搜索提交
            upperSubmit(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.page=1;
                this.params.pageSize=15;
                this.params.ctimeStart=this.params.ctimeStart?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.ctimeStart)):'';
                this.params.ctimeEnd=this.params.ctimeEnd?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.ctimeEnd)):'';
                utils.addParams(this.params);
            },

            onChangeOpen(data){
                this.openMessage=data;
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-settlement-list{
        .list-banner{
            width:100%;
            padding:0 0 0 20px;
            .list-btn{
                display:inline-block;
                width:20%;
                .join-btn{
                    margin-right:30px;
                }
            }
            .list-search{
                margin-bottom:10px;
                display:inline-block;
                width:100%;
                text-align:right;
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
   .m-bill-search{
        display:inline-block;
        height:22px;
        margin:16px 20px;
        vertical-align: bottom;
        span{
            width:22px;
            height:22px;
            background:url('~assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
            cursor:pointer;
        }
    }
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
     .u-red{
         color:red;
     }
     .u-nullify{
         text-decoration: line-through;
     }
     .m-nullify{
       padding: 30px;
       font-size: 16px;
       text-align: center;
   }
</style>