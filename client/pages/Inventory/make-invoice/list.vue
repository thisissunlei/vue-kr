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
                title="邮寄信息"
                width="500"
            >
            <div style="text-align:center;">
                <span>快递公司:</span>
                <Select 
                     style="display:inline-block;width:255px;margin-left:30px;text-align:left;"
                    placeholder="请输入发票规格" 
                    clearable
                ><Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select>
                
                <!-- <Input style="display:inline-block;width:255px;margin-left:30px;" placeholder="请输入发票张数" /> -->
                <div>
                    <span>快递编号:</span><Input style="display:inline-block;width:255px;margin-left:30px;" placeholder="请输入发票张数" />
                </div>
                
            </div>
            <div slot="footer">
                <Button type="primary" @click="makeInvaiceSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="switchMakeInvaice">取消</Button>
            </div>
        </Modal>
        <Modal
                v-model="openGoBack"
                title="修改金额"
                width="500"
            >
            <div >
                 <span>实际退回金额:</span><Input  placeholder="请输入发票张数" />
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
    import KrTd from '~/components/KrTd';


    export default {
        props:{
            type:{
                type:String,
                
            }
        },
        data () {
           return {
                listData:[{name:'123'}],
                openMakeInvaice:false,
                openGoBack:false,
                listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this))),
                tableParams:{
                    page:0,
                    pageSize:15,
                    totalCount:0,
                },
                productList:[
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ]
           }
        },
      
        created(){
                // var params=Object.assign({},this.tableParams,this.$route.query);
                // this.getListData(params);
                // this.tableParams=params; 
                //   utils.addParams(this.params);
        },

        methods:{
            //跳转创建页面
            goAddPage(params){

            },
            //回退按钮点击
            goBack(){
                this.switchGoBack();
            },
            //回退退弹窗开关
            switchGoBack(){
                this.openGoBack = !this.openGoBack;
            },
            //回退提交
            goBackSubmit(){
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
            //开票按钮点击
            makeInvaice(){  
               
                this.switchMakeInvaice();
            },
            //开票页面开关
            switchMakeInvaice(){
                this.openMakeInvaice = !this.openMakeInvaice;
            },
            //开票提交
            makeInvaiceSubmit(){
                this.$http.post('get-project-home', tabParams).then((res)=>{
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

                this.$http.get('get-project-home', tabParams).then((res)=>{
                        this.listData=res.data.items;
                     
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