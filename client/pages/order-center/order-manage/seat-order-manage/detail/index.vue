<template>
    <div class="kr-meeting-detail">
        <SectionTitle title="散座订单详情"></SectionTitle>
        <div class="content-box">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                    <dl>
                        <dt>订单编号：</dt><dd>{{info.orderNo || '-'}}</dd>
                    </dl>
                    <dl>
                        <dt>订单状态：</dt><dd>{{info.orderShowStatusName || '-'}}</dd>
                    </dl>
                    <dl>
                        <dt>订单金额：￥</dt><dd>{{info.realCost}}</dd>
                    </dl>
                    <dl class="seat-order-wech">
                        <dt>订单生成时间：</dt><dd>{{this.returnCtime(info.ctime)}}</dd>
                    </dl>
                    <dl class="seat-order-wech" v-if="!!info.uid" @click="goToMember(info.uid)" >
                        <dt>下单人ID：</dt><dd style="color:#499df1;cursor:pointer;">{{info.uid || '-'}}</dd>
                    </dl>
                    <dl class="seat-order-wech" v-else>
                        <dt>下单人ID：</dt><dd>-</dd>
                    </dl>
                    <dl class="seat-order-wech">
                        <dt>下单人微信：</dt>
                        <dd>
                            <img v-if="!!info.wechatUser && !!info.wechatUser.wechatAvatar" :src="info.wechatUser.wechatAvatar" alt=""/>
                            <img v-if="!!info.wechatUser && !info.wechatUser.wechatAvatar" src="./images/visitor.png"/>
                            <span v-if="!!info.wechatUser && !!info.wechatUser.wechatNick">{{info.wechatUser.wechatNick}}</span>
                        </dd>
                    </dl>
                    
                </div>
            </div>
            <div class="basic-info order-info">
                <SectionTitle title="预订信息"></SectionTitle>
                <div class="basic-info-box">
                    <dl style="width: 100%;">
                        <dt>预订日期：</dt><dd style="color:#FF6868;">{{info.reserveDayStr || '-'}}</dd>
                    </dl>
                    <dl>
                        <dt>预订的社区：</dt><dd>{{info.communityName || '-'}}</dd>
                    </dl>
                    <dl>
                        <dt>预定数量：</dt><dd>{{info.quantity || '-'}}</dd>
                    </dl>
                    <dl>
                        <dt>预订天数：</dt><dd>{{info.reserveDays || '-'}}</dd>
                    </dl>
                    <dl>
                        <dt>预计到场时间：</dt><dd v-if="!!info.seatOrderExtInfo && !!info.seatOrderExtInfo.arrivingTime">{{info.seatOrderExtInfo.arrivingTime}}</dd>
                    </dl>
                    <dl>
                        <dt>行程提醒：</dt><dd v-if="!!info.seatOrderExtInfo && !!info.seatOrderExtInfo.alertTimeName">{{info.seatOrderExtInfo.alertTimeName}}</dd>
                    </dl>
                    <dl>
                        <dt>联系电话：</dt><dd v-if="!!info.seatOrderExtInfo && !!info.seatOrderExtInfo.linkPhone">{{info.seatOrderExtInfo.linkPhone}}</dd>
                    </dl>
                </div>
            </div>
            <div class="basic-info order-money-info" v-if="!!info.details && info.details.length > 0">
                <SectionTitle title="订单金额明细"></SectionTitle>
                <div class="basic-info-box">
                    <Table border :columns="tilteAndStyle" :data="info.details"></Table>
                    <ul>
                        <li>商品总价：</li>
                        <!--<li>{{totalPrice}}</li>-->
                        <li>{{info.orderPromotionTotalDecimal || '-'}}</li>
                    </ul>
                    <ul v-if="info.couponDesc">
                        <li>使用的优惠策略：</li>
                        <li>{{info.couponDesc}}</li>
                    </ul>
                    <ul>
                        <li>订单金额：</li>
                        <!--<li>{{totalAmountDecimal}}</li>-->
                        <li>{{info.realCost}}</li>
                    </ul>
                </div>
            </div>

            <div class="basic-info order-money-info" v-if="refund.length > 0">
                <SectionTitle title="退款信息"></SectionTitle>
                <div class="basic-info-box">
                    <Table border :columns="tilteRefund" :data="refund"></Table>
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
                title: "散座订单详情-氪空间后台管理系统"
            }
    },
   data(){
       return {
         info: {},
         meetingStatusOptions :[],
         tilteAndStyle:[
           {
             title: '预订日期',
             key: 'enableDate',
             align: 'center',
             render(tag, params){
               let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.enableDate));
               return time;
             }
           },
           {
             title: '游客价（￥/个·天）',
             key: 'priceDecimal',
             align: 'center',
           },
           {
             title: '优惠价（￥/个·天）',
             key: 'promotionPriceDecimal',
             align: 'center',
           },
           {
             title: '预订数量（个）',
             key: 'quantity',
             align: 'center',
           },
           {
             title: '金额（￥）',
             key: 'totalAmountDecimal',
             align: 'center',
             render: (h, params) => {
               return h('div', [
                 h('span', {

//                   style: {
//                     color: 'red',
//                     fontSize : "20px",
//                   },
                 }, this.setPrice(params.row)),

               ]);
             }
           }],
         refund: [],
         tilteRefund: [{
           title: '退款操作人',
           key: 'id',
           align: 'center',
         }, {
           title: '操作时间',
           key: 'id',
           align: 'center',
         }, {
           title: '退款说明',
           key: 'id',
           align: 'center',
         }, {
           title: '退款金额（￥）',
           key: 'id',
           align: 'center',
         }],

         alertTimeOptions : [
           {
             label:"不提醒",value:"NOALERT"
           },{
             label:"会议开始前5分钟",value:"FIVE"
           },{
             label:"会议开始前15分钟",value:"FIFTEEN"
           }
         ],
         totalPrice: 0,
         totalAmountDecimal: 0
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
   methods: {
     goToMember (id) {
       window.open(`/new/#/member/memberManage/list/${id}`, '_blank');
     },
     getDetailInfo () {
       let _this = this;
       var params = {id: this.$route.query.orderId};
       this.$http.get('get-kr-o-view', params).then((res) => {
         this.info = res.data
         let totalPrice = 0
         let totalAmountDecimal = 0
         if ( !!this.info.details && this.info.details.length > 0 ) {
           this.info.details.forEach((val, i) => {
             totalPrice += Number(val.priceDecimal)*Number(val.quantity)
             totalAmountDecimal += Number(val.promotionPriceDecimal)*Number(val.quantity)
           })
           this.totalPrice = totalPrice;
           this.totalAmountDecimal = totalAmountDecimal;
         }
       }).catch((err) => {
         this.$Notice.error({
           title: err.message
         });
       })
     },
     returnMeetingStatus (param) {
       let _this = this;
       for (var i = 0; i < _this.meetingStatusOptions.length; i++) {
         if (param == _this.meetingStatusOptions[i].name) {
           return _this.meetingStatusOptions[i].desc
         }
       }
     },
     returnCtime (param) {
       var ctimeParse = param && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(param)) || "-";
       return ctimeParse;
     },
     getkrmeetingStatus () {

       this.$http.get('getkrmeetingstatus', '').then((res) => {

         var resultItems = res.data.status;
         this.meetingStatusOptions = resultItems;

       }).catch((error) => {
         this.$Notice.error({
           title: error.message
         });
       })
     },
     setPrice(row) {
       let price = (Number(row.promotionPriceDecimal)*Number(row.quantity));
       return price.toString()
     }
   }
 }
</script>
<style lang="less">
    .content-box{
        padding: 0 20px;
    }
    .basic-info{
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
        overflow: hidden;
        padding:10px;
        ul {
            border: 1px solid #e9eaec;
            border-top: none;
            background: #ffffff;
            box-sizing: border-box;
            overflow: hidden;
            li {
                box-sizing: border-box;
                float: left;
                line-height: 18px;
                padding: 20px;
                &:first-child {
                    text-align: right;
                    width: 80%;
                }
                &:last-child {
                    border-left: 1px solid #e9eaec;
                    text-align: center;
                    width: 20%;
                }
            }
        }
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
    .final-cost{
        color : red;
    }
    .content-box dl.seat-order-wech {
        height: 60px;
        line-height: 60px;
        img, span {
            display: inline-block;
            vertical-align: middle;
        }
        img {
            border-radius: 30px;
            height: 60px;
            width: 60px;
        }
        span {
            padding-left: 20px;
        }
    }
</style>