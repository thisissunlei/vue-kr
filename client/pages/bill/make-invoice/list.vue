<template>
    <div class='make-invoice-list'>
         <Table 
            :columns="listColumns" 
            :data="listData"
            border
        ></Table>
         <div style="margin: 10px;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page 
                    :current="tableParams.page"
                    :total="tableParams.totalCount"
                    :page-size="tableParams.pageSize" 
                    show-total 
                    show-elevator
                    @on-change="changePage"
                ></Page>
            </div>
           
        </div>
        <Modal
                v-model="openMakeInvaice"
                title="提示信息"
                width="500"
            >
            <div style="text-align:center;">
                <div v-for="(item,index) in invoiceData" :key="index">
                    <div  style="margin:10px 0px; text-align: left;width:350px;margin-left:50px;">  
                        <span>发票编号:</span><Input style="display:inline-block;width:255px;margin-left:30px;" placeholder="请输入发票编号" />  
                    </div>
                    <div style="margin:10px 0px; text-align: left;width:350px;margin-left:50px;">
                        <span>上传文件:</span>
                        <krUpload 
                        style="margin-left:30px;"
                            :file="[]"
                            type="only"
                            :columnDetail="{}"
                            :multiple="false"
                            @upSuccess="upSuccess"
                        />
                    </div>
                </div>
                
                
            </div>
            <div slot="footer">
                <Button type="primary" @click="makeInvaiceSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="switchMakeInvaice">取消</Button>
            </div>
        </Modal>
        <Modal
                v-model="openGoBack"
                title="提示信息"
                width="660"
            >
            <div>
                <span style="height:30px;display:inline-block;">回退原因:</span><Input v-model="backData.refundReason" type="textarea" :rows="4" placeholder="请输入退回原因" />
            </div>
            <div slot="footer">
                <Button type="primary" @click="goBackSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="switchGoBack">取消</Button>
            </div>
        </Modal>
     
    </div>
</template>


<script>
    import publicFn from './pubilcFn';
    import KrField from '~/components/KrField';
    import krUpload from '~/components/KrUpload';
    export default {
        components:{
            KrField,
            krUpload
        },
        props:{
            type:{
                type:String,
                
            },
            status:{
                type:String,
            }
        },
        data () {
            return {
                listData:[{name:'11'}],
                openMakeInvaice:false,
                openGoBack:false,
                listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this))),
                tableParams:{
                    page:1,
                    pageSize:15,
                    totalCount:0,
                    flag:'list',
                    invoiceStatus:this.status
                },
                backData:{
                    id:0,
                    refundReason:''
                },
                invoiceData:[
                    {
                        fileId:'',
                        invoiceId:'',
                        invoiceNum:'',
                    }
                ]


            }
        },
      
        created(){
            // var params=Object.assign({},this.tableParams,this.$route.query);
            // this.getListData(params);
            // this.tableParams=params; 
            //   utils.addParams(this.params);
        },
        mounted(){
            this.getListData(this.tableParams);
        },

        methods:{
            //跳转创建页面
            goAddPage(params){

            },
            //上传成功
            upSuccess(params){
                let arr = [].concat(this.invoiceData);
                arr[arr.length-1] = params[0].fileId;
                arr.push( {
                        fileId:'',
                        invoiceId:'',
                        invoiceNum:'',
                    });
                this.invoiceData=[].concat(arr);

            },
            //回退按钮点击
            goBack(params){
                this.backData.id= params.id||'';
                this.backData.refundReason = '';
                this.switchGoBack();
            },
            //回退退弹窗开关
            switchGoBack(){
                this.openGoBack = !this.openGoBack;
            },
            //跳转查看页面
            goView(){

            },
            //回退提交
            goBackSubmit(){
                let params = Object.assign({},this.backData);
                this.$http.post('get-project-home', params).then((res)=>{
                    // this.listData=res.data.items;
                    this.getListData();
                    this.switchGoBack();
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //开票按钮点击
            makeInvaice(){  
                this.invoiceData = [
                    {
                        fileId:'',
                        invoiceId:'',
                        invoiceNum:'',
                    }
                ];

                this.switchMakeInvaice();
            },
            //开票页面开关
            switchMakeInvaice(){
                this.openMakeInvaice = !this.openMakeInvaice;
            },
            //开票提交
            makeInvaiceSubmit(){
                let params = [].concat(this.invoiceData);
                this.$http.post('post-make-invoice', params).then((res)=>{
                    // this.listData=res.data.items;
                    this.getListData();
                    this.switchMakeInvaice();
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //页面切换
            changePage(){

            },
            //获取列表数据
            getListData(){
                let tabParams = Object.assign({},this.tableParams);
                this.$http.get('get-invoice-list', tabParams).then((res)=>{
                        this.listData=res.data.items;
                        this.tableParams.totalCount = res.data.totalCount;
                        this.tableParams.page = res.data.page;
                     
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //获取要显示的title
            formattingColumns(data){
                
                var arr = [];
                for(let i=0;i<data.length;i++){
                    let every = data[i];
                    if(every.type.indexOf(this.type)!=-1){
                        arr.push(every);
                    }
                }
                return arr;
            }
        }
    }
</script>

<style lang='less' >
   .make-invoice-list{
       .ivu-table-cell{
           padding-left:0px;
           padding-right: 0px;
       }
   }
</style>