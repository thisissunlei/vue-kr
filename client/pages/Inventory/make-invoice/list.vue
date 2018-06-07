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
            <div v-if="openModify">
                 <span>实际退回金额:</span><Input  placeholder="实际退回金额" v-model="changeMoney" style="width:200px" />
            </div>
            <div slot="footer">
                <Button type="primary" @click="modifySubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="modifyClick">取消</Button>
            </div>
        </Modal>

        <Modal
                v-model="openPost"
                title="邮寄信息"
                width="500"
            >
            <div style="text-align:center" v-if="openPost">
                <Select 
                  v-model="expressCompany" 
                  placeholder="请选择邮寄方式" 
                  style="width: 300px;margin-bottom:20px;"
                >
                  <Option 
                    v-for="item in postList" 
                    :value="item.id" 
                    :key="item.name"
                  >
                  {{ item.name }}
                  </Option>
                </Select>
                <Input  placeholder="邮寄单号" v-model="postNum" style="width:300px"/>
            </div>
            <div slot="footer">
                <Button type="primary" @click="postSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="mailClick">取消</Button>
            </div>
        </Modal>
        <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onMessageChange"
            />
     
    </div>
</template>


<script>
    import publicFn from './pubilcFn';
    import KrTd from '~/components/KrTd';
    import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
    import Message from '~/components/Message';



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
                openPost:false,
                openGoBack:false,
                listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this))),
                changeMoney:'',
                tableParams:{
                    page:1,
                    pageSize:15,
                    invoiceStatusList:''
                },
                editItem:{},
                postList:[
                  {
                    id:'SHUNFENG',
                    name:'顺风快递'
                  },
                  {
                    id:'YUANTONG',
                    name:'圆通快递'
                  },
                  {
                    id:'SHENTONG',
                    name:'申通快递'
                  },
                  {
                    id:'ZHONGTONG',
                    name:'中通快递'
                  },
                  {
                    id:'YUNDA',
                    name:'韵达快递'
                  },
                  {
                    id:'BAISHI',
                    name:'百世快递'
                  },
                  {
                    id:'TIANTIAN',
                    name:'天天快递'
                  },
                ],
                expressCompany:'',
                postNum:'',
                openMessage:false,
                MessageType:'',
                warn:''
           }
        },
         components:{
            Message,
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
           console.log('====>',this.type)
           var str='';
           status.map((item,index)=>{
               str=str?item+','+str:item;    
           })
           this.tableParams.invoiceStatusList=str;
           console.log('tableParams======',this.tableParams)
           console.log('searchForm======',this.searchForm)

           var params=Object.assign({},this.tableParams,this.searchForm);
           console.log('params',params)
           this.tableParams=params; 
           this.getListData();
        },
        methods:{
           onMessageChange(data){
                this.openMessage=data;
            },
            //修改弹窗开关
            modifyClick(item){
              this.editItem = item;
              this.openModify = !this.openModify;
            },
            postSubmit(item){
              let tabParams = {};
              if(!this.expressCompany || !this.postNum){
                return 
              }
              tabParams = {
                id:this.editItem.id,
                postNum:this.postNum,
                expressCompany:this.expressCompany
              }
                this.$http.put('change-modify-post', tabParams).then((res)=>{
                    // this.listData=res.data.items;
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn='邮寄成功';
                    this.getListData();
                }).catch((err)=>{
                  console.log('====',err)
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //修改提交
            modifySubmit(){
              let tabParams = {};
              if(!this.changeMoney){
                return 
              }
              if(isNaN(this.changeMoney)){
                  this.$Notice.error({
                        title:'金额请填写数字'
                    });
                return
              }
              console.log('修改提交====',isNaN(this.changeMoney))
              tabParams = {
                id:this.editItem.id,
                amount:this.changeMoney
              }
                this.$http.put('change-modify-amount', tabParams).then((res)=>{
                    // this.listData=res.data.items;
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn='修改成功';
                    this.getListData();
                }).catch((err)=>{
                  console.log('====',err)
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //签收按钮点击
            receivedClick(item){
              this.$http.put('change-modify-sign', {id:item.id}).then((res)=>{
                    // this.listData=res.data.items;
                    this.getListData();
                }).catch((err)=>{
                  console.log('====',err)
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //邮寄按钮点击
            mailClick(item){
              this.openPost = !this.openPost;
              this.editItem = item;

            },
            //跳转查看页面
            goView(data){
              window.open(`/publicPage/make-invoice/${data.id}/view-invoice`,data.id);

            },
            //回收按钮点击
            callbackClick(item){
              this.$http.put('change-modify-takeBack', {id:item.id}).then((res)=>{
                    // this.listData=res.data.items;
                    this.getListData();
                }).catch((err)=>{
                  console.log('====',err)
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
                params.ticketEndDate=this.dateSwitch(params.ticketEndDate);
                params.ticketStartDate=this.dateSwitch(params.ticketStartDate);
                params.receiveEndDate=this.dateSwitch(params.receiveEndDate);
                params.receiveStartDate=this.dateSwitch(params.receiveStartDate);
                params.callbackStartDate=this.dateSwitch(params.callbackStartDate);
                params.callbackEndDate=this.dateSwitch(params.callbackEndDate);
                this.$http.get('invoice-list-unified',params).then((res)=>{
                  let pages = {
                      page:res.data.page,
                      totalCount:res.data.totalCount,
                      totalPages:res.data.totalPages,
                      pageSize:15
                  }
                  this.tableParams = Object.assign({},pages)
                  console.log('获取列表数据===',this.tableParams)
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