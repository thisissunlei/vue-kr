<template>
    <div class="krmeeting-seat">
      <div class="seat-title">散座-{{detailData.communityName}}</div>
      <Row style="margin-bottom:35px">
        <Col>
          <div class="item-name required">封面图（1张）</div>  
          <img :src="detailData.coverPic" alt="" class="first-pic">  
        </Col>
      </Row>
      <Row style="margin-bottom:35px">
        <Col>
          <div class="item-name required">配图</div>  
          <div class="pic-box" >
            <img v-for="item  in detailData.pics" :key="item.id" :src="item.picUrl" alt="">
          </div>
        </Col>
      </Row>
      <Row style="margin-bottom:35px">
        <Col class="col">
          <div class="item-name required">上架状态</div>  
          <div class="item-content"> {{detailData.published?'已上架':'下架'}}</div>
        </Col>
        <Col class="col">
          <div class="item-name required">散座配套</div> 
          <div class="item-content" v-if="!detailData.devices.length">暂无</div>
          <div class="item-content" v-if="detailData.devices.length" v-for="(item,index) in detailData.devices" :key="item.id">
            {{item.name}}
          </div>
        </Col>
      </Row>
      <div class="first-config">
        <div class="warn">首次配置，及30自然日之后的默认配置</div>
        <div class="detail-configs">
          <div class="detail-content">
            <span class="detail-config">开房数量(个)</span>
            <span class="content">{{detailData.openQuantity}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">会员价(个·天)</span>
            <span class="content">￥{{detailData.priceDecimal}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">会员优惠价(个·天)</span>
            <span class="content">￥{{detailData.promotionPriceDecimal}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">游客价(个·天)</span>
            <span class="content">￥{{detailData.guestPriceDecimal}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">游客优惠价(个·天)</span>
            <span class="content">￥{{detailData.guestPromotionPriceDecimal}}</span>
          </div>
        </div>  
      </div>
      <div class="price-list" id="daily-inventory-table-list">
        <div class="price-title" >价格日历</div>
        <Table  border :columns="priceColumns" :data="priceList" ></Table>
         <SlotHead :class="theHead?'header-here':'header-no'" indentify="daily"/>
      </div>


    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import SlotHead from './slotHead';

import ToolTip from '~/components/ToolTip';

var layoutScrollHeight = 0;

export default {
    head () {
            return {
                title: "散座"
            }
    },
    data(){
      return {
        sideBar:true,
        theHead:false,
        priceColumns: [
          {
              title: '日期',
              key: 'enableDate',
              render: (h, params) => {
                  return dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr;
              }
          },
          {
              title: '开放数量（个）',
              key: 'quantity',
              render: (h, params) => {
                var tableContent=params.row.quantity?params.row.quantity:'-';
                let time = dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr+'开放数量：' ;
                return h('div', [
                    h('Tooltip', {
                        props: {
                            placement: 'top',
                            content: time+tableContent
                        }
                    }, [
                    h('div', [
                        h('div',{
                            style:{
                                textOverflow:'ellipsis',
                                whiteSpace:'nowrap',
                                overflow: 'hidden'
                            }
                        },tableContent),
                    ])
                  ])
                ])
              }
          },
          {
              title: '可预订数量 (个)',
              key: 'remainQuantity',
              render: (h, params) => {
                var tableContent=params.row.remainQuantity?params.row.remainQuantity:'-';
                let time = dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr+'可预订数量：' ;
                return h('div', [
                    h('Tooltip', {
                        props: {
                            placement: 'top',
                            content: time+tableContent
                        }
                    }, [
                    h('div', [
                        h('div',{
                            style:{
                                textOverflow:'ellipsis',
                                whiteSpace:'nowrap',
                                overflow: 'hidden'
                            }
                        },tableContent),
                    ])
                  ])
                ])
              }
          },
          {
              title: '会员价 (个·天)',
              key: 'priceDecimal',
              render: (h, params) => {
                  var tableContent=params.row.priceDecimal?'￥'+params.row.priceDecimal:'-';
                  let time = dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr+'会员价' ;
                  return h('div', [
                      h('Tooltip', {
                          props: {
                              placement: 'top',
                              content: time+tableContent
                          }
                      }, [
                      h('div', [
                          h('div',{
                              style:{
                                  textOverflow:'ellipsis',
                                  whiteSpace:'nowrap',
                                  overflow: 'hidden'
                              }
                          },tableContent),
                      ])
                    ])
                  ])
              }
          },
          {
              title: '会员优惠价 (个·天)',
              key: 'promotionPriceDecimal',
              render: (h, params) => {
                  var tableContent=params.row.promotionPriceDecimal?'￥'+params.row.promotionPriceDecimal:'-';
                  let time = dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr+'会员价' ;
                  return h('div', [
                      h('Tooltip', {
                          props: {
                              placement: 'top',
                              content: time+tableContent
                          }
                      }, [
                      h('div', [
                          h('div',{
                              style:{
                                  textOverflow:'ellipsis',
                                  whiteSpace:'nowrap',
                                  overflow: 'hidden'
                              }
                          },tableContent),
                      ])
                    ])
                  ])
              }
          },
          {
              title: '游客价 (个·天)',
              key: 'guestPriceDecimal',
              render: (h, params) => {
                  var tableContent=params.row.guestPriceDecimal?'￥'+params.row.guestPriceDecimal:'-';
                  let time = dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr+'会员价' ;
                  return h('div', [
                      h('Tooltip', {
                          props: {
                              placement: 'top',
                              content: time+tableContent
                          }
                      }, [
                      h('div', [
                          h('div',{
                              style:{
                                  textOverflow:'ellipsis',
                                  whiteSpace:'nowrap',
                                  overflow: 'hidden'
                              }
                          },tableContent),
                      ])
                    ])
                  ])
              }
          },
          {
              title: '游客优惠价 (个·天)',
              key: 'guestPromotionPriceDecimal',
              render: (h, params) => {
                  var tableContent=params.row.guestPromotionPriceDecimal?'￥'+params.row.guestPromotionPriceDecimal:'-';
                  let time = dateUtils.dateToStr("MM月DD日",new Date(params.row.enableDate)) + params.row.enableDateStr+'会员价' ;
                  return h('div', [
                      h('Tooltip', {
                          props: {
                              placement: 'top',
                              content: time+tableContent
                          }
                      }, [
                      h('div', [
                          h('div',{
                              style:{
                                  textOverflow:'ellipsis',
                                  whiteSpace:'nowrap',
                                  overflow: 'hidden'
                              }
                          },tableContent),
                      ])
                    ])
                  ])
              }
          },

        ],
        priceList:[],
        detailData:{
          devices:[],
        }
      }
    },
    components:{
       SectionTitle,
       ToolTip,
       SlotHead
    },
    mounted(){
      this.getSeatDetail()
      var dom=document.getElementById('layout-content-main');
      var dailyTableDom=document.getElementById('daily-inventory-table-list');
      if(dailyTableDom){
          this.left=dailyTableDom.getBoundingClientRect().left;
          this.width=dailyTableDom.getBoundingClientRect().width;
          setTimeout(function(){
             layoutScrollHeight = dailyTableDom.getBoundingClientRect().top;
          },200)
      }  
      
      dom.addEventListener("scroll",this.onScrollListener);
      window.addEventListener('resize',this.onResize);  
      var _this=this;
      LISTENSIDEBAROPEN(function (params) {
          _this.sideBar=params;
      })
    },
    watch:{
      sideBar:function(val){
        var dailyTableDom=document.getElementById('daily-inventory-table-list');
        this.left=dailyTableDom.getBoundingClientRect().left;
        this.width=dailyTableDom.getBoundingClientRect().width;
        layoutScrollHeight = dailyTableDom.getBoundingClientRect().top;
        this.onScrollListener();
      },
    },
    destroyed(){
      var dom=document.getElementById('layout-content-main');
      dom.removeEventListener("scroll",this.onScrollListener);
      window.removeEventListener('resize',this.onResize); 
    },
    methods:{
        //滚动监听
        onScrollListener(){            
            var dom=document.getElementById('layout-content-main');
            var headDom=document.getElementById('slot-head-daily-inventory');
            if(headDom){
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
            }
            if(dom.scrollTop>layoutScrollHeight){
                this.theHead=true;
            }else{
                this.theHead=false;
            }
        },
      getSeatDetail(){
        let { params } = this.$route;
        let communityId = params.billId;
        // this.$http.get('get-kr-meeting-seat-detail', {cmtId:communityId}).then((res)=>{
        //   this.krMeetingList = res.data
        // }).catch((err)=>{
        //   this.$Notice.error({
        //       title:err.message
        //   });
        // })
        let jiashuju = {
          "communityId":1,
          "communityName":'chaoyang',
          "coverPic":"https://web.krspace.cn/kr-web/images/welcome/members/first-member.jpg",
          "ctime":1531134752000,
          "devices":[{
            "createDate":1531213067000,"id":1,"imgurl":"阿三打撒","name":"桌子","updateDate":1531213067000
          }],
          "goods":[
            {"communityId":1,
             "ctime":1531389303000,
             "enableDate":1531929600000,
             "guestPrice":100,
             "guestPriceDecimal":1,
             "guestPromotionPrice":100,
             "guestPromotionPriceDecimal":'-',
             "id":72,"mobileSeatId":1,
             "price":100,"priceDecimal":1,
             "promotionPrice":100,"promotionPriceDecimal":1,
             "quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532016000000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":73,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532102400000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":74,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532188800000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":75,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532275200000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":76,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532361600000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":77,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532448000000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":78,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532534400000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":79,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532620800000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":80,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532707200000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":81,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1532793600000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":82,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1533398400000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":89,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1533484800000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":90,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1533571200000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":91,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1533657600000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":92,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1533744000000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":93,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531389303000,"enableDate":1533830400000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":94,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
            "communityId":1,"ctime":1531811089000,"enableDate":1534348800000,"guestPrice":200,"guestPriceDecimal":2,"guestPromotionPrice":200,"guestPromotionPriceDecimal":2,"id":95,"mobileSeatId":1,"price":200,"priceDecimal":2,"promotionPrice":200,"promotionPriceDecimal":2,"quantity":1,"remainQuantity":1
          }],
          "guestPrice":200,
          "guestPriceDecimal":2,
          "guestPromotionPrice":200,
          "guestPromotionPriceDecimal":2,
          "id":1,
          "openQuantity":1,
          "pics":[{              
            "id":101,"mobileSeatId":1,"picUrl":"https://web.krspace.cn/kr-web/images/welcome/members/first-member.jpg"
            },{              
              "id":102,"mobileSeatId":1,"picUrl":"https://web.krspace.cn/kr-web/images/welcome/members/first-member.jpg"
            },{              
              "id":103,"mobileSeatId":1,"picUrl":"https://web.krspace.cn/kr-web/images/welcome/members/first-member.jpg"
            },{              
              "id":104,"mobileSeatId":1,"picUrl":"https://web.krspace.cn/kr-web/images/welcome/members/first-member.jpg"
            },{              
              "id":105,"mobileSeatId":1,"picUrl":"https://web.krspace.cn/kr-web/images/welcome/members/first-member.jpg"
            },
          ],
          "price":200,
          "priceDecimal":2,
          "promotionPrice":200,
          "promotionPriceDecimal":2,
          "published":true,
        }
        this.detailData = jiashuju;
        this.priceList = jiashuju.goods;

      }    
    }
 }
</script>
<style lang="less">
  .krmeeting-seat{
    padding:30px;
    .seat-title{
      font-size: 16px;
      color:#333;
      margin-bottom: 25px;
    }
    img{
      border-radius: 4px;
    }
    .col{
      width: 49%;
      display: inline-block;
    }
    .item-name{
      font-size: 12px;
      color:#666;
      margin-bottom: 8px;
    }
    .required{
      &::before{
        content:'*';
        color:#FF6868;
        position: absolute;
        width: 7px;
        left: -7px;
        top:3px;
      };

    }
    .item-content{
      font-size: 16px;
      color:#333;
    }
    .first-config{
      // opacity: 0.3;
      background: rgba(238,238,238,.3);
      border: 1px dashed rgba(204,204,204,.3);
      border-radius: 4px;
      padding:20px;
      width: 792px;
      margin-bottom: 40px;
      .warn{
        font-size: 14px;
        color:#FF6868;
        margin-bottom: 8px;
      }
      .detail-content{
        display: inline-block;
         .detail-config{
          font-size: 12px;
          color:#666;
        }
        .content{
          font-size: 16px;
          color:#333;
          display: block;
          margin-top: 8px;
          
        }
      }
      .detail-content+.detail-content{
        margin-left: 40px;
      }
    }
    .price-title{
      font-size: 16px;
      color:#333;
      margin-bottom: 11px;
    }
    .pic{
      display: inline-block;
    }
    .price-list{
      // .ivu-table-cell{
      //   color:#333;
      //   background: #F5F6FA;
      //   font-size: 16px;
      //   text-align: center;
      // }

    }
    .pic-box{
      display: flex;
      flex-wrap:wrap;
      img{
        height: 135px;
        width: 179px;
        margin-right: 26px;
        margin-bottom: 29px;
        flex-wrap: wrap;
      }
    }
    .first-pic{
      width:179px;
      height: 135px;
    }
    .header-here{
                opacity:1;
            }
            .header-no{
                transition: opacity 0.2 ease;
                opacity: 0;
            }
  }
</style>