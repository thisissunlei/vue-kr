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

        <Modal
                v-model="showSure"
                title="提示信息"
                width="660"
            >
            <div>
                <span style="height:30px;display:inline-block;margin-left:20px;">发票张数:</span>
                 <InputNumber :max="10" :min="1" v-model="piaoNumber" value="piaoNumber"></InputNumber>
            </div>
            <div slot="footer">
                <Button type="primary" @click="sureSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openSure">取消</Button>
            </div>
        </Modal>
     
    </div>
</template>


<script>
    import publicFn from './pubilcFn';
    import KrField from '~/components/KrField';
    import krUpload from '~/components/KrUpload';
import dateUtils from 'vue-dateutils';
    
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
                number:true,
                piaoNumber:null,
                showSure:false,
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
            var status=[];
           switch (this.type) {
               case 'waitMake':
                   status.push('APPLYING');
                   break;
               case 'alreadyMake':
                   status.push('INVOICED');
                   break;
               case 'returnMake':
                   status.push('RECOVERYED');
                   break;
               default:
                   status.push(' ');
                   break;
           } 
           var str='';
           status.map((item,index)=>{
               str=str?item+','+str:item;    
           })

           var params=Object.assign({},this.tableParams,this.searchForm);
           this.tableParams=params; 
           this.getListData();
        },

        methods:{
            //跳转创建页面
            goAddPage(params){
                 window.open(`/bill/make-invoice/${params.id}/add-invoice?id=${params.id}&isReady=edit`);
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
            openSure(item){
                this.makeInvaice()
                // this.showSure = !this.showSure
            },
            sureSubmit(){

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
            //格式转换
            dateSwitch(data){
                if(data){
                    data = parseInt(data);
                    return dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(data));
                }else{
                    return '';
                }
            },
            //获取列表数据
            getListData(){
                let params = Object.assign({},this.tableParams,this.$route.query);
                params.startRefundTime=this.dateSwitch(params.startRefundTime);
                params.startTicketTime=this.dateSwitch(params.startTicketTime);
                params.startTime=this.dateSwitch(params.startTime);
                params.endRefundTime=this.dateSwitch(params.endRefundTime);
                params.endTicketTime=this.dateSwitch(params.endTicketTime);
                params.endTime=this.dateSwitch(params.endTime);
                this.$http.get('get-invoice-list', params).then((res)=>{
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