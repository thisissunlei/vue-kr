<template>
    <div class="krmeeting-seat">
      <div class="seat-title">散座-{{detailData.communityName}}</div>
      <Form ref="formItems" :model="formItem" :rules="ruleCustom" label-position="top">
        <div class="u-upload">
             <FormItem label="封面图（1张）" class="u-input" prop="coverPic" style="width:100%">
                <div class="content">
                <UploadFile 
                  v-model="formItem.coverPic"
                  :category="category"
                  withCredentials
                  :format="['jpg','png','gif']"
                  :maxSize="300"
                  :maxLen="1"
                  :onSuccess="coverImgSuccess"
                  :onRemove="coverImgRemove"
                  :onExceededSize="imgSize"
                  :onFormatError="imgSizeFormat"
                  :defaultFileList="coverImgList"
                  :imgWidth="180"
                  :imgHeight="135"
                >
                  <div slot="tip" class="u-unload-tip">图片小于300KB,格式为JPG,PNG,GIF,建议图片比例为4:3</div>
                </UploadFile>
                </div>
            </FormItem>
        </div>
        <div class="u-upload">
          <FormItem label="配图" class="u-input" prop="picsStr" style="width:100%">
            <div class="content-list">
              <UploadFile 
                  v-model="formItem.picsStr"
                  multiple
                  :category="category"
                  withCredentials
                  :format="['jpg','png','gif']"
                  :maxSize="2048"
                  :onSuccess="detailImgsSuccess"
                  :onRemove="detailImgsRemove"
                  :onExceededSize="imgSize"
                  :onFormatError="imgSizeFormat"
                  :defaultFileList="detailImgList"
                  :imgWidth="180"
                  :imgHeight="135"
                                            
              >
              </UploadFile>
            </div>
          </FormItem>
        </div>
        <FormItem label="上架状态" class="u-input" style="width:250px" prop="published">
          <RadioGroup v-model="formItem.appPublish" style="width:250px">
              <Radio label="true">
                  已上架
              </Radio>
              <Radio label="false">
                  未上架
              </Radio>
          </RadioGroup> 
        </FormItem>
        <div class="config">
          <div class="warn">首次配置，及30自然日之后的默认配置</div>
          <Row style="margin-bottom:35px">
            <Col class="col">
               <FormItem label="开房数量（个）" style="width:120px" prop="openQuantity">
                  <Input 
                      v-model="formItem.openQuantity" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="会员价(个·天)" style="width:120px" prop="priceDecimal">
                  <Input 
                      v-model="formItem.priceDecimal" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="会员优惠价(个·天)" style="width:120px" prop="promotionPriceDecimal">
                  <Input 
                      v-model="formItem.promotionPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="游客价(个·天)" style="width:120px" prop="guestPriceDecimal">
                  <Input 
                      v-model="formItem.guestPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="游客优惠价(个·天)" style="width:120px" prop="guestPromotionPriceDecimal">
                  <Input 
                      v-model="formItem.guestPromotionPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
          </Row>
        </div>
        <Button type="primary" @click="setConfig" >按默认配置初始化近30天价格</Button>
        <div class="price-table">
          <div style="margin-bottom: 11px" >
            <span class="price-title">价格日历</span>
            <span class="edit-book" @click="changeBook">去编辑不可预订日期</span>
          </div>
          <Table  border :columns="priceColumns" :data="priceList" ></Table>
        </div>
      </Form>


    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import SlotHead from './slotHead';
import UploadFile from '~/components/UploadFile';
import ToolTip from '~/components/ToolTip';

var layoutScrollHeight = 0;

export default {
    head () {
            return {
                title: "散座编辑"
            }
    },
    data(){
      return {
        max:5,
        maxPrice:10,
        formItem:{},
        category:'app/upgrade',
        coverImgList:[],
        detailImgList:[],
        ruleCustom:{
          coverPic:[
            { required: true, message: '请上传封面图', trigger: 'change' }
          ],
          picsStr:[
            { required: true, message: '请上传配图', trigger: 'change' }
          ],
          guestPromotionPriceDecimal:[
            { required: true, message: '请填写游客优惠价格', trigger: 'blur' }
          ],
          openQuantity:[
            { required: true, message: '请填写开放数量', trigger: 'blur' }
          ],
          priceDecimal:[
            { required: true, message: '请填写会员价格', trigger: 'blur' }
          ],
          promotionPriceDecimal:[
            { required: true, message: '请填写会员优惠价格', trigger: 'blur' }
          ],
          guestPriceDecimal:[
            { required: true, message: '请填写游客价格', trigger: 'blur' }
          ],
          published:[
            { required: true, message: '请选择', trigger: 'blur' }
          ],
        },
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
       SlotHead,
       UploadFile
    },
    mounted(){
      this.getSeatDetail()
    },
    watch:{
    },
    destroyed(){
    },
    methods:{
      changeBook(){

      },
      setConfig(){

      },
      detailImgsSuccess(){

      },
      detailImgsRemove(){

      },
      coverImgSuccess(){

      },
      coverImgRemove(){

      },
      imgSizeFormat(){
            this.$Notice.error({
                title:'图片格式不正确'
            });
      },
      imgSize(){
           this.$Notice.error({
                title:'图片大小超出限制'
            });
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
    .content{
      padding-top: 27px;
      padding-left: 26px;
      height: 195px;
      width: 380px;
      background: rgba(238,238,238,.3);
      border: 1px dashed rgba(204,204,204,.3);
      border-radius: 4px;
      .up-icon{
        background-color: #fff;
      }
      .u-unload-tip{
        color:#666;
        font-size: 12px;
      }
    }
    .content-list{
      background: rgba(238,238,238,.3);
      border: 1px dashed rgba(204,204,204,.3);
      border-radius: 4px;
      padding: 27px;
      .up-icon{
        background-color: #fff;
      }
    }
    .config{
      margin-bottom: 10px;
      padding:20px;
      background: rgba(238,238,238,.3);
      border: 1px dashed rgba(204,204,204,.3);
      border-radius: 4px;
      width:792px;
      height:131px;
      .ivu-input-wrapper{
        margin-left: 10px;
      }
      .warn{
        color:#FF6868;
        font-size: 14px;
        margin-bottom: 9px;
      }
      .col{
        width:130px;
        display: inline-block;
      }
    }
    .price-table{
      margin-top: 40px;
      width:980px;
      .price-title{
        font-size: 16px;
        color:#333;
        margin-bottom: 11px;
      }
      .edit-book{
        font-size: 14px;
        color: #499DF1;
        float: right;
      }
    }
  }
</style>