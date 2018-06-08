<template>
    <div class="kr-meeting-detail">
        <SearchForm @submitSearchData="submitSearchData"/>
        <div class="table-box">
            <Table border :columns="tilteAndStyle" :data="krMeetingList.items"></Table>
            <Page 
                :total="krMeetingList.totalCount" 
                :page-size=15 
                @on-change="onPageChange"
                class="page-part"
            ></Page>
        </div>
        
    </div>
</template>

<script>
import SearchForm from './searchForm.vue';


export default {
   name:'krmeetingdetail',
    head () {
            return {
                // title: "KM会议室订单详情"
            }
    },
   data(){
       return {
           krMeetingList : [],
           searchparams :{
              isExpired : true,

           },
           tilteAndStyle : [
                    {
                        title: '会议日期',
                        key: 'meetingDay',
                        align: 'center',
                        
                    },
                    {
                        title: '会议时间',
                        key: 'meetingHour',
                        align: 'center',
                    },
                    {
                        title: '预订的会议室',
                        key: 'roomName',
                        align: 'center',
                    },
                    {
                        title: '会议室所属社区',
                        key: 'communityName',
                        align: 'center',
                    },
                    {
                        title: '容纳人数',
                        key: 'capacity',
                        align: 'center',
                    },
                    {
                        title: '已到场人数',
                        key: 'arrivingCount',
                        align: 'center',
                    },
                    {
                        title: '客户联系电话',
                        key: 'phone',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: '操作',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.toDetail(params)
                                        }
                                    }
                                }, '查看订单'),
                               
                            ]);
                        }
                    }
                ],
       }
   },
   components:{
       SearchForm
   },
   mounted(){
       
        this.getKrmeetingUsedDetailFun();
      
   },
   methods:{
        onPageChange(page){
            var newObj = Object.assign({},this.searchparams,{page:page})
            this.searchparams = newObj;
            this.getKrmeetingUsedDetailFun();
        },
        getKrmeetingUsedDetailFun(){

            var params = this.searchparams;
            
            this.$http.get('getkrmeetingUsedDetail', params).then((res)=>{
                this.krMeetingList = res.data
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        toDetail(params){
            window.open(`/krmeetingorder/detail?orderId=${params.row.orderId}`,'_blank');
        },
        submitSearchData(searchFormData){
            console.log("searchFormData===》",searchFormData);
            var newSearchObj = Object.assign({},this.searchparams,searchFormData);
            this.searchparams = newSearchObj;
            this.getKrmeetingUsedDetailFun();
            
        },
        confirmLeave(param){

        },
        openConfirmLeaveFun(){
            this.openConfirmLeave = !this.openConfirmLeave;
        }
       
    }
 }
</script>
<style>
    .kr-meeting-detail{
        padding: 0 20px;
    }
    .page-part{
        margin-top:20px;
    }
    .table-box{
            padding-bottom: 20px;
    }
</style>