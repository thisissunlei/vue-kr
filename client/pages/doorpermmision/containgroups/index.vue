<template>
  <div class="g-openlog">
      <div class="g-openlog-box">
            <SectionTitle :title="title" />
            <SearchForm @submitSearchData="submitSearchData"/>
            <div class="table-box">
                <Table :columns="columns1" :data="openLogList" size="small"></Table>
                <div class="loading-box"  v-if="loading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
            </div>
           <Modal v-model="showTips" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>确认删除</span>
                </p>
                <div style="text-align:center">
                    <p>移除后，父级组的成员将失去该组的权限。</p>
                    <p>你要删除吗？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="confirmDelete">Delete</Button>
                </div>
        </Modal>
        </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchForm';
import dateUtils from 'vue-dateutils';


export default {
   components:{
      SectionTitle,SearchForm
   },
   data(){
     return{
        showTips : false,
        title : "子集列报表",
        lastReq : [],
        eidtItem:{},
        page : '',
        searchData :{
            groupId: '',
            pageSize:25
        },
        loading : false,
        openTypeList :[],
        columns1: [
                    {
                        title: '组名称',
                        key: 'memberName',
                        align:'center',
                        render:(h,obj)=>{
                            return h('div', [
                               
                                h('Tooltip',
                                    {
                                    props: {
                                        placement: 'top',
                                        content :obj.row.card
                                    },
                                }, obj.row.memberName||"/"),
                            ]);
                            
                        }
                        
                    },
                    {
                        title: '社区',
                        key: 'communityName',
                        align:'center',
                        
                    },
                    {
                        title: '公司',
                        key: 'company',
                        align:'center',
                        
                    },
                    {
                        title: '创建时间',
                        key: 'time',
                        align:'center',
                        render(h,obj){
                           return h('div', [
                               
                                h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.time)))
                            ]);
                            
                        }
                    },
                    {
                        title: '创建人',
                        key: 'phone',
                        align:'center',
                        
                    },
                    {
                        title: '从组中移除',
                        key: 'phone',
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '移除')
                            ]);
                        }
                    },
                    
                    
                ],
                openLogList: []
     }
   },
   created(){

   },
   mounted(){
       this.searchData.groupId = this.$route.query.groupid;
       this.title = this.$route.query.groupname+"的子集列表";
       this.getListData();
       this.getSmartHardwareDict();
   },
   methods:{
       returnResultExplain(data){
           if(data.success){
               return '无';
           }
           var msg = data.msg;
           var returnText ='无';
           if(msg){
               try{
                    returnText = JSON.parse(msg).message;
                }catch(e){
                    returnText = msg 
                }
           }
           
           return returnText;
       },
       submitSearchData(data){

           let _this =this;
           
           var newObj = Object.assign({},_this.searchData,data);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){

           let _this =this;
           let params = this.searchData;
            this.$http.get('get-open-log-list',params).then((res)=>{

                
                _this.openLogList = res.data.items;
               
                
                _this.loading = false
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
       },
       getSmartHardwareDict(){
           this.$http.get('get-smart-hard-ware-dict','').then((res)=>{
                this.openTypeList = res.data.OpenType;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
       },
      
       returnOpenType(type){
           var indexNo ;
           var arr = this.openTypeList.map(function(item,index){
               
               if(type == item.value){
                   indexNo = index
               }
               return item.desc;
           })
           return arr[indexNo]
       },
       returnResult(result){
           if(result == true){
               return "成功" 
           }else{
               return "失败" 
           }
       },
       remove(params){
           console.log("params",params)
           this.eidtItem = params;
           this.showTipOrNot();
       },
       showTipOrNot(){
           this.showTips = !this.showTips;
       },
       confirmDelete(){
           let _this =this;
           this.$http.get('get-smart-hard-ware-dict','').then((res)=>{
                
                this.showTipOrNot();
                this.searchData.time = new Date().getTime();
                this.getListData();
                this.$Message.success('移除成功');

            }).catch((error)=>{
                this.$Message.warning(error.message);
            })

        }
    }

}
</script>
<style lang="less">
    .g-openlog{
        height: 100%;
        overflow: scroll;
        .g-openlog-box{
            // overflow: scroll;
        }
    }
    .table-box{
        padding: 0 10px 10px 10px;
        .ivu-table-cell{
            padding : 0;
        }
        .all-data{
            text-align:center;
            padding:10px;
        }
        .loading-box{
            height: 100px;
            position: relative;
            .demo-spin-icon-load{
                animation: ani-demo-spin 1s linear infinite;
            }
            @keyframes ani-demo-spin {
                from { transform: rotate(0deg);}
                50%  { transform: rotate(180deg);}
                to   { transform: rotate(360deg);}
            }
        }
    }
</style>


