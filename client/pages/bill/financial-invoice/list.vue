<template>
    <div class='make-invoice-list'>
         <Table 
            :columns="listColumns" 
            :data="listData"
            border
            :loading="isLoading"
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
                v-model="openReject"
                title="驳回理由"
                width="500"
            >
            <div  v-if="openReject">
                <span style="height:30px;display:inline-block;">驳回理由:</span><Input v-model="rejectReason" type="textarea" :rows="4" placeholder="请输入驳回理由" />
            </div>
            <div slot="footer">
                <Button type="primary" @click="modifySubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
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
                listData:[],
                openMakeInvaice:false,
                openGoBack:false,
                isLoading:false,
                listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this))),
                tableParams:{
                    page:1,
                    pageSize:15,
                    totalCount:0,
                    verifyStatus:this.type,

                },
                rejectReason:'',
                editItem:{},
                openReject:false,
           }
        },
         
        mounted(){
            var params=Object.assign({},this.tableParams,this.searchForm);
            this.tableParams=params; 
            this.getListData();
            //utils.addParams(this.params);
        },
        
        methods:{
            //跳转创建页面
            goView(params){
                window.open(`/bill/financial-invoice/${params.id}/view-invoice?id=${params.id}`,params.id);
            },
            goEdit(params){
                window.open(`/bill/financial-invoice/${params.id}/view-invoice?id=${params.id}&type=edit`,params.id);
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
            unitTypeToStr(str){
                switch(str){
                    case 'COMPANY': 
                        return '企业单位';
                        break;
                    case 'PERSON': 
                        return '个人/非企业单位';
                        break;
                    default: 
                        return '-';
                        break;
                }
            },
            taxTypeToStr(str){
                 switch(str){
                    case 'SMALL': return '小规模纳税人';
                    case 'GENERAL': return '一般纳税人';
                    default: return '-';
                }
            },
            //页面切换
            changePage(){

            },
            //获取列表数据
            getListData(){
                this.isLoading = true;
                let params = Object.assign({},this.tableParams,this.$route.query);
                params.cStartTime=this.dateSwitch(params.cStartTime);
                params.cEndTime=this.dateSwitch(params.cEndTime);
                this.$http.get('get-financial-invoice-list', params).then((res)=>{
                        this.isLoading = false;
                        let pages = {
                            page:res.data.page,
                            totalCount:res.data.totalCount,
                            totalPages:res.data.totalPages,
                            pageSize:15
                        }
                        this.tableParams = Object.assign({},this.tableParams,pages)
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
            },
            makeSure(item){
                let params = {
                    handleType:'affirm',
                    id :item.id,
                    rejectReason:'' 
                }
                this.$http.put('get-financial-invoice-rejected', params).then((res)=>{
                        this.isLoading = false;
                        this.getListData()
                     
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            cancel(item){
                this.editItem = item;
                this.openReject = !this.openReject;
            },
            modifySubmit(){
                let params = {
                    handleType:'reject',
                    id :this.editItem.id,
                    rejectReason:this.rejectReason
                }
                this.$http.put('get-financial-invoice-rejected', params).then((res)=>{
                        this.isLoading = false;
                        this.getListData()
                        this.openReject = !this.openReject;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })

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