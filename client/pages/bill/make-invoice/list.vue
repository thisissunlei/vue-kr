<template>
    <div class='make-invoice-list'>

         <Table 
            :columns="listColumns" 
            :data="listData"
            border
        >
            
        </Table>
     <div style="margin: 10px;overflow: hidden">
            <Button type="primary" @click="onExport" v-if="type == 'all'">导出</Button>
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
            <div style="text-align:left;border:1px dashed #dddada;" v-if="openMakeInvaice">
                <div v-for="(item,index) in invoiceData" :key="index">
                    <div  style="margin:20px 0px; text-align: left;width:350px;margin-left:20px;">  
                        <span>发票编号:</span><Input style="display:inline-block;width:255px;margin-left:10px" placeholder="请输入发票编号" v-model="item.invoiceNum" @on-blur="openpiaozi(index)"/>  
                    </div>
                    <div style="margin:20px 0px; text-align: left;width:350px;margin-left:20px;">
                        <span>上传文件:</span>
                        <KrUpload 
                            :file="item.columnDetail||[]"
                            type="only"
                            category="contract/upload"
                            :columnDetail="item.slogn"
                            :multiple="false"
                            @upSuccess="upSuccess"
                        />
                    </div>
                    <Button type="primary"  style="margin-right: 20px;float:right;margin-top:-45px;" @click="deleteData(index)" v-if="invoiceData.length>1">删除</Button>

                </div>
                <Button type="primary" :disabled="addSubmit" style="margin-left: 20px;" @click="addData">添加</Button>
                
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
                <span style="height:30px;display:inline-block;">回退原因:</span>
                
                <Input v-model="backData.refundReason" :maxlength="200" type="textarea" :rows="4" placeholder="请输入退回原因" />
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
    import KrUpload from '~/components/KrUpload';
    import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
    
    export default {
        components:{
            KrField,
            KrUpload
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
                addSubmit:true,
                changeData:new Date(),
                editItem:{},
                number:true,
                piaoNumber:null,
                showSure:false,
                listData:[],
                openMakeInvaice:false,
                openGoBack:false,
                listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this))),
                tableParams:{
                    page:1,
                    pageSize:15,
                    totalCount:0,
                    invoiceStatus:this.status
                },
                backData:{
                    id:0,
                    refundReason:''
                },
                 ruleBackData: {
                    refundReason: [
                        { required: true, message: '退回原因必填', trigger: 'blur' }
                    ],
                    
                },
                invoiceData:[
                    {
                        fileId:'',
                        invoiceId:'',
                        invoiceNum:'',
                        slogn:{
                            index:0
                        },
                        disabled:true
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
                   status.push('RECOVERYED,APPLYING,INVOICED');
                   break;
           } 
           var str='';
           status.map((item,index)=>{
               str=str?item+','+str:item;    
           })
           this.tableParams.invoiceStatusList=str;
           

           var params=Object.assign({},this.tableParams,this.searchForm);
           this.tableParams=params; 
           this.getListData();
        },
        watch:{
            changeData(val){ 
                let disabled = false;
                this.invoiceData.map(item=>{
                    if(!item.fileId || !item.invoiceNum){
                        disabled = true;
                    }
                })
                this.addSubmit = disabled;
            }
        },

        methods:{
            onExport(){
                let params = Object.assign({},this.tableParams,this.$route.query);
                params.startRefundTime=this.dateSwitch(params.startRefundTime);
                params.startTicketTime=this.dateSwitch(params.startTicketTime);
                params.startTime=this.dateSwitch(params.startTime);
                params.endRefundTime=this.dateSwitch(params.endRefundTime);
                params.endTicketTime=this.dateSwitch(params.endTicketTime);
                params.endTime=this.dateSwitch(params.endTime);
                utils.commonExport(params,'/api/order/csr-invoice/export');
            },
            
            //上传成功
            upSuccess(params,columnDetail){
                
                let index = columnDetail.index;
                this.invoiceData[index].fileId = params[0].fileId;
                this.invoiceData[index].columnDetail = [].concat(params);
                this.changeData = new Date()
            },
            deleteData(index){
                var invoiceData = [].concat(this.invoiceData);
              
                invoiceData.splice(index,1)
                this.invoiceData = [].concat(invoiceData);
                this.changeData = new Date()
            },
            addData(){
                let length = this.invoiceData.length
                let obj ={
                        fileId:'',
                        invoiceId:'',
                        invoiceNum:'',
                        slogn:{
                            index:length
                        },
                        disabled:true
                    };
                this.invoiceData.push(obj);
                this.changeData = new Date()
              

            },
            openpiaozi(index){
                this.changeData = new Date()
            },
            openSure(item){
                this.makeInvaice(item)
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
            goView(params){
                 window.open(`/publicPage/make-invoice/${params.id}/view-detail`);
            },
            //回退提交
            goBackSubmit(){
                let params = Object.assign({},this.backData);
                this.$http.post('csr-invoice-refund', params).then((res)=>{
                   
                    this.getListData();
                    this.switchGoBack();
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //开票按钮点击
            makeInvaice(data){  
                this.invoiceData = [
                    {
                        fileId:'',
                        invoiceId:'',
                        invoiceNum:'',
                        slogn:{
                            index:0
                        },
                        disabled:true
                    }
                ];
                this.editItem = data;
                this.switchMakeInvaice();
            },
            //开票页面开关
            switchMakeInvaice(){
                this.openMakeInvaice = !this.openMakeInvaice;
                if(!this.openMakeInvaice){
                    this.invoiceData = [
                        {
                            fileId:'',
                            invoiceId:'',
                            invoiceNum:'',
                            slogn:{
                                index:0
                            },
                            disabled:true
                        }
                    ];
                }
            },
            checkData(){
                let result = true;
                this.invoiceData.map(item=>{
                    if(!item.fileId || !item.invoiceNum){
                        result = false;
                    }
                });
                return result;
            },
            //开票提交
            makeInvaiceSubmit(){
                let result = this.checkData()
                if(!result){
                    this.$Notice.error({
                        title:'请填写完整开票信息。'
                    });
                    return;
                }
                let params = this.invoiceData.map(item=>{
                    item.invoiceId = this.editItem.id;
                    return item;
                });

                let postData = {
                    ticket:JSON.stringify(params)
                }
                console.log('=====>',postData)
                this.$http.post('post-new-invoice', postData).then((res)=>{
                    // this.listData=res.data.items;
                    this.getListData();
                    this.switchMakeInvaice();
                }).catch((err)=>{
                    console.log('=====',err)
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //页面切换
            changePage(page){
                console.log('页面切换',page)
                let params = Object.assign({},this.tableParams,this.$route.query);
                params.startRefundTime=this.dateSwitch(params.startRefundTime);
                params.startTicketTime=this.dateSwitch(params.startTicketTime);
                params.startTime=this.dateSwitch(params.startTime);
                params.endRefundTime=this.dateSwitch(params.endRefundTime);
                params.endTicketTime=this.dateSwitch(params.endTicketTime);
                params.endTime=this.dateSwitch(params.endTime);
                params.page = page;
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