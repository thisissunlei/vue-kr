<template>
    <div class="krmeeting-seat">
      <div class="seat-title">
        <span class="line"></span>
        <span style="margin-left: -80px;">散座-{{detailData.communityName}}</span>
      </div>
      <Row style="margin-bottom:35px">
        <Col>
          <div class="item-name required">封面图（1张）</div>  
          <img :src="detailData.coverPic" alt="" class="first-pic" v-if="detailData.coverPic">  
          <span v-if="!detailData.coverPic">暂无</span>
        </Col>
      </Row>
      <Row style="margin-bottom:35px">
        <Col>
          <div class="item-name required">配图</div>  
          <div class="pic-box" >
            <span v-if="!detailData.pics">暂无</span>
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
            <span class="detail-config">开放数量(个)</span>
            <span class="content">{{detailData.openQuantity || '-'}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">会员价(个·天)</span>
            <span class="content">￥{{detailData.priceDecimal || '-'}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">会员优惠价(个·天)</span>
            <span class="content">￥{{detailData.promotionPriceDecimal || '-'}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">游客价(个·天)</span>
            <span class="content">￥{{detailData.guestPriceDecimal || '-'}}</span>
          </div>
          <div class="detail-content">
            <span class="detail-config">游客优惠价(个·天)</span>
            <span class="content">￥{{detailData.guestPromotionPriceDecimal || '-'}}</span>
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
                title: "散座查看-氪空间后台管理系统"
            }
    },
    data(){
      return {
        sideBar:true,
        theHead:false,
        priceColumns: [
          {
              title: '日期',
              key: 'enableDateStr',
          },
          {
              title: '开放数量（个）',
              key: 'quantity',
              render: (h, params) => {
                var tableContent=params.row.quantity?params.row.quantity:'-';
                let time = params.row.enableDateStr+'开放数量：' ;
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
                let time =params.row.enableDateStr+'可预订数量：' ;
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
                  let time =  params.row.enableDateStr+'会员价' ;
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
                  let time =  params.row.enableDateStr+'会员价' ;
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
                  let time =  params.row.enableDateStr+'会员价' ;
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
                  let time =params.row.enableDateStr+'会员价' ;
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
        GLOBALSIDESWITCH("false");
         var _this=this;
      var dom=document.getElementById('layout-content-main');
      var dailyTableDom=document.getElementById('daily-inventory-table-list');
      if(dailyTableDom){
          
          setTimeout(function(){
            _this.left=dailyTableDom.getBoundingClientRect().left;
            _this.width=dailyTableDom.getBoundingClientRect().width;
            layoutScrollHeight = dailyTableDom.getBoundingClientRect().top;
            dom.addEventListener("scroll",_this.onScrollListener);
            window.addEventListener('resize',_this.onResize);  
           
            LISTENSIDEBAROPEN(function (params) {
                _this.sideBar=params;
            })
          },200)
      }  
      
      
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
        this.$http.get('get-kr-meeting-seat-detail', {communityId:communityId}).then((res)=>{
          this.detailData = res.data;
          this.priceList = res.data.goods;
        }).catch((err)=>{
          this.$Notice.error({
              title:err.message
          });
        })
        

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
      position: relative;
      .line{
        display: inline-block;
        margin-left: 2px;
        width:80px;
        height:4px;
        z-index:1;
        background-color: #D8D8D8;
      }
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
      display: inline-block;
      margin-right: 5px;
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