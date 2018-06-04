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
                        <dt>订单生成时间：</dt><dd>{{detail.ctime}}</dd>
                    </dl>
                     <dl>
                        <dt>订单金额：</dt><dd>{{detail.cost}}</dd>
                    </dl>
                    <dl>
                        <dt>订单状态：</dt><dd>{{detail.orderStatus}}</dd>
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
                        <dt>预订日期：</dt><dd>{{detail.meetingTime}}</dd>
                    </dl>
                    <dl>
                        <dt>预订时段：</dt><dd>{{detail.orderStatus}}</dd>
                    </dl>
                    <dl>
                        <dt>会议主题：</dt><dd>{{detail.theme}}</dd>
                    </dl>
                    <dl>
                        <dt>联系电话：</dt><dd>{{detail.phone}}</dd>
                    </dl>
                    <dl>
                        <dt>会议提醒：</dt><dd>{{detail.alertTime}}</dd>
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
                        <h1 class="list-title">已到场（{{notarrivalList.length}}）</h1>
                        <ul class="list-ul first-ul">
                            <template v-for="item in notarrivalList">
                                <li class="list-li">
                                    <img v-bind:src="item.wechatAvatar" class="head-img"/>
                                    <span class="person-name">{{ item.wechatNick }}</span>
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

export default {
   name:'krmeetingdetail',
    head () {
            return {
                title: "KM会议室订单详情"
            }
    },
   data(){
       return {
           arrivalList:[],
           notarrivalList : [
               {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
                {arrving:false,
               notArrving:true,
                sponsor:true,
                wechatAvatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCJy1sNYg19STAVNCibpcJEQDfKVL4r4EzBlEmQP6b1hvlrx3zKiaFxBFXP46lF5a4PuQoJyzoOMQA/132",
                wechatId:8195,
                wechatNick:"耿耿于誰."},
           ],
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
                        title: '商品金额（￥）',
                        key: 'cost'
                    },
                    {
                        title: '订单金额（￥）',
                        key: 'totalAmount'
                    }]
       }
   },
   components:{
       SectionTitle
   },
   mounted(){
       
       this.getDetailInfo();
        
      
   },
   methods:{
       getDetailInfo(){
           let _this =this;
            var params = {orderId :this.$route.query.orderId };
            this.$http.get('get-kr-meeting-detail', params).then((res)=>{
                this.detail = res.data;
                var resData = res.data;
                console.log("resData",resData)
                _this.orderAboutMoney = [{
                    unitCost : resData.unitCost,
                    promotionCost : resData.promotionCost,
                    cost : resData.cost,
                    totalAmount : resData.totalAmount,
                }]
                this.arrivalList = resData.arrvingList || [];
                // this.notarrivalList = resData.notArrvingList || [];
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
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
        background: #e6f3fe;
        border-radius: 6px;
        margin-top: 20px;
    }
    .content-box dl{
        float:left;
        width:30%;
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
        height: 135px;
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
        background: #e6f3fe;
        margin-top: 20px;
        border-radius: 6px;
    }
    .arrival-list-box h1{
        font-size: 20px;
        font-weight: 500;
        color: #5f5959;
        padding: 10px 0 10px 25px;
    }
    .first-ul{
        border-bottom: solid 1px #ccc;
    }
    .kr-meeting-detail{
        padding-bottom: 20px;
    }
</style>