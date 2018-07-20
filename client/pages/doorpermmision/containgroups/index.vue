<template>
  <div class="g-openlog">
      <div class="g-openlog-box">
            <SectionTitle title="子集" />
            <SearchForm @submitSearchData="submitSearchData"/>
            <div class="table-box">
                <Table :columns="columns1" :data="openLogList" size="small"></Table>
                <div class="loading-box"  v-if="loading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
            </div>
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
        tableScrollTop : 0,
        lastReq : [],
        page : '',
        searchData :{
            lastId: '',
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
                        title: '组级别',
                        key: 'openType',
                        align:'center',
                        
                        render:(h,obj)=>{
                            return h('div', [
                               
                                h('span', this.returnOpenType(obj.row.openType))
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
                        title: '手机号',
                        key: 'phone',
                        align:'center',
                        
                    },
                    
                    
                ],
                openLogList: []
     }
   },
   created(){

   },
   mounted(){
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
           var timeObj = {
               sdate :(data.time && data.time[0] && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(data.time[0])))||'',
               edate :(data.time && data.time[1] && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(data.time[1])))||'',
               lastId :''
           }
           var newObj = Object.assign({},_this.searchData,data,timeObj);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){

           let _this =this;
           let params = this.searchData;
            this.$http.get('get-open-log-list',params).then((res)=>{

                
                var itmesList = res.data.items;
                

                _this.lastReq = itmesList;
                
                
                
                
                if(this.searchData.lastId){

                    var arr = this.openLogList;
                    var newArr = arr.concat(itmesList);
                    _this.openLogList = newArr;

                }else{
                    _this.openLogList = itmesList;
                }
               

                if(itmesList.length>0){
                    _this.searchData.lastId = itmesList[itmesList.length-1].id;
                }else{
                    _this.searchData.lastId = '';
                }
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


