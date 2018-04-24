<template>
   <div>
       <Table  border :columns="joinColumns" :data="joinData"/>
       <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="params.page" 
                        :total="totalCount" 
                        :page-size="params.pageSize" 
                        @on-change="changePage" 
                        show-total 
                        show-elevator
                    />
                </div>
       </div>
   </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
export default {
    props:{
        customerId:{
            type:[Number,String]
        }
    },
    data() {
        return{
           totalCount:0,
           params:{
               pageSize:20,
               page:1,
               customerId:this.customerId
           },
    
           joinColumns:[   
                    {   
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },    
                    {   
                        title: '工位编号',
                        key: 'code',
                        align:'center',
                    },
                    {
                        title: '工位类型',
                        key: 'seatTypeName',
                        align:'center',
                    },
                    {
                        title: '可容纳人数',
                        key: 'capacity',
                        width:200,
                        align:'center',
                    },
                    {
                        title: '入驻开始日期',
                        key: 'startDate',
                        align:'center',
                        render(tag, params){
                            return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate)) ;
                        }
                    },
                    {
                        title: '入驻结束日期',
                        key: 'endDate',
                        align:'center',
                        render(tag, params){
                            return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.endDate)) ;
                        }
                    },
                    {
                        title: '入住状态',
                        key: 'status',
                        width:200,
                        align:'center',
                    }
           ],
           joinData:[]
        }
    },
    mounted(){
        this.getListData();
    },
    methods:{
       getListData(){
           this.$http.get('customer-join-info',this.params).then((res)=>{
                this.joinData=res.data.items;
                this.totalCount=res.data.totalCount;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        changePage(page){
            this.params.page = page;
            this.getListData(this.params)
        }
    }
}
</script>

<style lang="less" scoped>
  
</style>
