<template>
    <div class="kr-meeting-detail">
        <SectionTitle title="KrMeeting会议室订单详情"></SectionTitle>
        <div class="content-box">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                    <dl>
                        <dt>订单编号：</dt><dd>{{detail.orderNo}}</dd>
                    </dl>
                    <dl>
                        <dt>订单生成时间：</dt><dd>{{this.returnCtime(detail.ctime)}}</dd>
                    </dl>
                     <dl>
                        <dt>订单金额：￥</dt><dd>{{detail.totalAmount}}</dd>
                    </dl>
                    <dl>
                        <dt>订单状态：</dt><dd>{{this.returnMeetingStatus(detail.orderStatus)}}</dd>
                    </dl>
                    <dl>
                        <dt>下单会员ID：</dt><dd>{{detail.uid}}</dd>
                    </dl>
                    <dl>
                        <dt>下单会员微信ID：</dt><dd>{{detail.wechatId}}</dd>
                    </dl>
                    
                </div>
            </div>
            <div class="basic-info order-info">
                <SectionTitle title="预订信息"></SectionTitle>
                <div class="basic-info-box">
                    <dl>
                        <dt>预订的会议室：</dt><dd>{{detail.roomName}}</dd>
                    </dl>
                    <dl>
                        <dt>会议室所在社区：</dt><dd>{{detail.communityName}}</dd>
                    </dl>
                     <dl>
                        <dt>预订日期：</dt><dd>{{detail.meetingDay}}</dd>
                    </dl>
                    <dl>
                        <dt>预订时段：</dt><dd>{{detail.meetingHour}}</dd>
                    </dl>
                    <dl>
                        <dt>会议主题：</dt><dd>{{detail.theme}}</dd>
                    </dl>
                    <dl>
                        <dt>联系电话：</dt><dd>{{detail.phone}}</dd>
                    </dl>
                    <dl>
                        <dt>会议提醒：</dt><dd>{{this.returnMeetingRemind(detail.alertTime)}}</dd>
                    </dl>
                    
                </div>
            </div>
            <div class="basic-info order-money-info">
                <SectionTitle title="订单金额明细"></SectionTitle>
                <div class="basic-info-box">
                    <Table border :columns="tilteAndStyle" :data="orderAboutMoney"></Table>
                </div>
            </div>
            <div class="meeting-person-info">
                <SectionTitle title="参会人信息"></SectionTitle>
                <div class="">
                    <div class="arrival-list-box">
                        <h1 class="list-title">已到场（{{arrivalCount}}）</h1>
                        <ul class="list-ul first-ul">
                            <template v-for="item in arrivalList">
                                <li class="list-li">
                                    <img v-if="item" v-bind:src="item &&item.wechatAvatar" class="head-img"/>
                                    <img  v-if="!item" src="./images/visitor.png" class="head-img"/>
                                    <span class="person-name">{{ (item && item.wechatNick) || "嘉宾" }}</span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="arrival-list-box">
                        <h1 class="list-title">未到场（{{notarrivalList.length}}）</h1>
                        <ul class="list-ul">
                            <template v-for="item in notarrivalList">
                                <li class="list-li">
                                    <img v-bind:src="item.wechatAvatar" class="head-img"/>
                                    <span class="person-name">{{ item.wechatNick }}</span>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';

export default {
   name:'krmeetingdetail',
    head () {
            return {
                title: "KM会议室订单详情"
            }
    },
   data(){
       return {
           arrivalCount : 0,
           meetingStatusOptions :[],
           arrivalList:[],
           notarrivalList : [],
           detail : {},
           orderAboutMoney : [],
           tilteAndStyle:[
                    {
                        title: '下单时会议室单价（￥/0.5h）',
                        key: 'unitCost',
                    },
                    {
                        title: '下单时会议室折扣价（￥/0.5h）',
                        key: 'promotionCost'
                    },
                    {
                        title: '商品总额（￥）',
                        key: 'totalAmount'
                    },
                    {
                        title: '订单金额（￥）',
                        key: 'cost'
                    }],
           alertTimeOptions : [
               {
                   label:"不提醒",value:"NOALERT"
               },{
                   label:"会议开始前5分钟",value:"FIVE"
               },{
                   label:"会议开始前15分钟",value:"FIFTEEN"
               }
           ]
       }
   },
   components:{
       SectionTitle
   },
   mounted(){
       GLOBALSIDESWITCH('false');
       this.getkrmeetingStatus();
       this.getDetailInfo();
        
      
   },
   methods:{
       getDetailInfo(){
           let _this =this;
            var params = {orderId :this.$route.query.orderId };
            this.$http.get('get-kr-meeting-detail', params).then((res)=>{

                var resData = res.data;
                _this.orderAboutMoney = [{
                    unitCost : resData.unitCost,
                    promotionCost : resData.promotionCost,
                    cost : resData.cost,
                    totalAmount : resData.totalAmount,
                }]

                this.detail = res.data;
                this.notarrivalList = resData.notArrvingList || [];
                this.arrivalCount =  resData.arrvingCount;

                // this.arrivalCount = 9;
                
                this.changeArrivalList(resData);
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
       },
       changeArrivalList(resData){
           var arrivalListLength = (resData.arrvingList && resData.arrvingList.length) || 0;
           if(this.arrivalCount >resData.arrvingList.length){

               var newArrivalList = resData.arrvingList;
               newArrivalList.length = this.arrivalCount;
               this.arrivalList = newArrivalList;
               return;
           }
           this.arrivalList = resData.arrvingList || [];
       },
       returnMeetingStatus(param){

           let _this=this;
            for(var i=0;i<_this.meetingStatusOptions.length;i++){
                if(param==_this.meetingStatusOptions[i].name){
                    return _this.meetingStatusOptions[i].desc
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

        returnCtime(param){
            var ctimeParse = param && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(param))||"";
            return ctimeParse;
        },
        returnMeetingRemind(param){
            for(var i=0;i<this.alertTimeOptions.length;i++){
                if(param ==this.alertTimeOptions[i].value){
                    return this.alertTimeOptions[i].label
                }
            }
        }
    }
 }
</script>
<style>
    .content-box{
        padding: 0 20px;
    }
    .basic-info{
        height: 120px;
        background: #f6f6f6;
        border-radius: 6px;
        margin-top: 20px;
    }
    .content-box dl{
        float:left;
        width:33%;
        height:30px;
    }
    .content-box dt{
        
       display: inline-block;
    }
    .content-box dd{
       display: inline-block;
    }
    .basic-info-box{
        padding:10px;
    }
    .order-money-info{
        height:170px;
    }
    .order-info{
        height: 150px;
    }
    .list-li{
        display: inline-block;
        width: 160px;
        height: 170px;
        padding: 0 25px;

    }
    .list-ul{
        display: flex;
        flex-wrap: wrap;
    }
    .list-li .head-img{
        display:inline-block;
        width:110px;
        height:110px;
        border-radius : 70px;
    }
    .list-li .person-name{
        display: inline-block;
        text-align: center;
        width: 110px;
        height: 20px;
        line-height: 20px;
        margin-top:10px;
    }
    .meeting-person-info{
        background: #f6f6f6;
        margin-top: 20px;
        border-radius: 6px;
        padding-bottom:20px; 
    }
    .arrival-list-box h1{
        font-size: 20px;
        font-weight: 500;
        color: #5f5959;
        padding: 10px 0 10px 25px;
    }
    .first-ul{
        border-bottom: 1px dashed #e9e9e9;
    }
    .kr-meeting-detail{
        padding-bottom: 20px;
    }
</style>