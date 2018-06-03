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
                v-model="openModify"
                title="修改金额"
                width="500"
            >
            <div >
                 <span>实际退回金额:</span><Input  placeholder="实际退回金额" />
            </div>
            <div slot="footer">
                <Button type="primary" @click="modifySubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="switchModify">取消</Button>
            </div>
        </Modal>
     
    </div>
</template>


<script>
    import publicFn from './pubilcFn';
    import KrTd from '~/components/KrTd';
    import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';


    export default {
        props:{
            type:{
                type:String,
                
            },
            searchForm:{
                type:Object
            }
        },
        data () {
           return {
                listData:[{name:'123'}],
                openModify:false,
                openGoBack:false,
                listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this))),
                tableParams:{
                    page:1,
                    pageSize:15,
                    invoiceStatusList:''
                }
           }
        },
        mounted(){
           var status=[];
           switch (this.type) {
               case 'waitArrive':
                   status.push('INVOICED');
                   break;
               case 'waitMail':
                   status.push('SIGNED_POST');
                   break;
               case 'waitReceive':
                   status.push('SIGNED');
                   break;
               case 'alreadyReceive':
                   status.push('RECEIVED');
                   break;
               default:
                   status.push('TO_RETURN');
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
        methods:{
          
            //修改弹窗开关
            switchModify(){
                this.openModify = !this.openModify;
            },
            //修改提交
            modifySubmit(){
                this.$http.post('get-project-home', tabParams).then((res)=>{
                    // this.listData=res.data.items;
                    this.getListData();
                    this.switchGoBack();
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //签收按钮点击
            receivedClick(){

            },
            //邮寄按钮点击
            mailClick(){

            },
            //修改按钮点击
            modifyClick(){

            },
            //跳转查看页面
            goView(){

            },
            //回收按钮点击
            callbackClick(){

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
                params.ticketEndDate=this.dateSwitch(params.ticketEndDate);
                params.ticketStartDate=this.dateSwitch(params.ticketStartDate);
                params.receiveEndDate=this.dateSwitch(params.receiveEndDate);
                params.receiveStartDate=this.dateSwitch(params.receiveStartDate);
                params.callbackStartDate=this.dateSwitch(params.callbackStartDate);
                params.callbackEndDate=this.dateSwitch(params.callbackEndDate);
                this.$http.get('invoice-list-unified',params).then((res)=>{
                    this.listData=res.data.items;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //获取要显示的th
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