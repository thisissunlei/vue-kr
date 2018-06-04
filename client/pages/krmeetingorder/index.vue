<template>
    <div class="km-order">
        <SectionTitle title="KM会议室订单"></SectionTitle>
        <SearchForm 
            @submitSearchData = "submitSearchData"
            :meetingStatusOptions ="meetingStatusOptions"
        />
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
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchform';
import dateUtils from 'vue-dateutils';


export default {
   name:'billList',
    head () {
            return {
                title: "KM会议室订单"
            }
    },
   data(){
       return {
           searchparams : {},
           meetingStatusOptions : [],
           tilteAndStyle: [
                    {
                        title: '订单编号',
                        key: 'orderNo',
                    },
                    {
                        title: '会员手机号',
                        key: 'phone'
                    },
                    {
                        title: '会议室所在社区',
                        key: 'communityName'
                    },
                    {
                        title: '预定的会议室',
                        key: 'roomName'
                    },
                    {
                        title: '订单金额（￥）',
                        key: 'payAmount'
                    },
                    {
                        title: '订单生成时间',
                        key: 'ctime'
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        render: (h, params) => {
                            return h('div', [
                               
                                h('span', this.returnText(params.row.orderStatus))
                            ]);
                        }
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
                                }, '查看')
                            ]);
                        }
                    }
                ],
                krMeetingList: {}
           
       }
   },
   components:{
       SectionTitle,SearchForm
   },
   mounted(){

      this.getkrmeetingStatus();
      this.getListData();
   },
   methods:{
        submitSearchData(params){

            var beginTime = params.createBeginTime && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.createBeginTime))||"";
            var endTime = params.createBeginTime && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.createEndTime))||"";

            var timeObject ={
                createBeginTime : beginTime,
                createEndTime : endTime
            }
            var newParams = Object.assign({},this.searchparams,params,timeObject)
            this.searchparams = newParams;
            this.getListData();

        },
        toDetail(params){
            console.log("params-",params,params.row);
            window.open(`/krmeetingorder/detail?orderId=${params.row.orderId}`,'_blank');
        },
        getListData(){
            var params = this.searchparams;
            this.$http.get('get-kr-meeting-list', params).then((res)=>{
                
                this.krMeetingList = res.data
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        returnText(param){
            
            var meetingStatusOptions = this.meetingStatusOptions;
            for(var i =0;i<meetingStatusOptions.length;i++){
                if(param == meetingStatusOptions[i].name){
                    
                    return meetingStatusOptions[i].desc;
                }
            }
        },
        getkrmeetingStatus(){
            
            this.$http.get('getkrmeetingstatus','').then((res)=>{

                var resultItems = res.data.status;
                this.meetingStatusOptions = resultItems;
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        onPageChange(page){
            console.log("page",page);
            var newObj = Object.assign({},this.searchparams,{page:page})
            this.searchparams = newObj;
            this.getListData();
        }
        
    }
 }
</script>
<style>
    .table-box{
        padding: 0 20px 20px 20px;
    }
    .page-part{
        margin-top:10px;
    }
</style>