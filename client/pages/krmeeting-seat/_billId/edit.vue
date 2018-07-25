<template>
    <div class="krmeeting-seat">
      <div class="seat-title">
        <span class="line"></span>
        <span style="margin-left: -80px;">散座-{{detailData.communityName}}</span>
      </div>
      <Form ref="detailData" :model="detailData" :rules="ruleCustom" label-position="top">
        <div class="u-upload">
             <FormItem label="封面图（1张）" class="u-input" prop="coverPic" style="width:100%">
                <div class="content">
                <UploadFile 
                  v-model="detailData.coverPic"
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
          <FormItem label="配图" class="u-input" prop="pics" style="width:100%">
            <div class="content-list">
              <UploadFile 
                  v-model="detailData.pics"
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
          <RadioGroup v-model="detailData.published" style="width:250px">
              <Radio label="true">
                  已上架
              </Radio>
              <Radio label="false">
                  未上架
              </Radio>
          </RadioGroup> 
        </FormItem>
        <FormItem label="散座配套" class="u-input"  prop="devicesStrArray">
          <CheckboxGroup v-model="detailData.devicesStrArray">
              <Checkbox v-for="item in deviceList" :label="item.name" :key="item.id">
                  <span>{{item.name}}</span>
              </Checkbox>
          </CheckboxGroup>
        </FormItem>
        <div class="config">
          <div class="warn">首次配置，及30自然日之后的默认配置</div>
          <Row style="margin-bottom:35px">
            <Col class="col">
               <FormItem label="开房数量（个）" style="width:120px" prop="openQuantity">
                  <Input 
                      v-model="detailData.openQuantity" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="会员价(个·天)" style="width:120px" prop="priceDecimal">
                  <Input 
                      v-model="detailData.priceDecimal" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="会员优惠价(个·天)" style="width:120px" prop="promotionPriceDecimal">
                  <Input 
                      v-model="detailData.promotionPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="游客价(个·天)" style="width:120px" prop="guestPriceDecimal">
                  <Input 
                      v-model="detailData.guestPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col class="col">
               <FormItem label="游客优惠价(个·天)" style="width:120px" prop="guestPromotionPriceDecimal">
                  <Input 
                      v-model="detailData.guestPromotionPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
          </Row>
        </div>
        <Button type="primary" @click="initPriceList" >按默认配置初始化近30天价格</Button>
        <div class="price-table">
          <div style="margin-bottom: 11px" >
            <span class="price-title">价格日历</span>
            <span class="edit-book" @click="changeBook">去编辑不可预订日期</span>
          </div>
          <div class="input-table">
            <Row class="price-row row-header">
                <Col span="3" class="parice-col">
                  日期
                </Col>
                <Col span="3" class="parice-col">
                   开放数量 (个)
                </Col>
                <Col span="3" class="parice-col">
                   可预订数量 (个)
                </Col>
                <Col span="3" class="parice-col">
                   会员价 (个·天)
                </Col>
                <Col span="4" class="parice-col">
                   会员优惠价 (个·天)
                </Col>
                <Col span="4" class="parice-col">
                   游客价 (个·天)
                </Col>
                <Col span="4" class="parice-col">
                   游客优惠价 (个·天)
                </Col>
            </Row>
            <Row v-for="(item,index) in detailData.goods" :key="item.id" class="price-row">
                <Col span="3" class="parice-col">
                  <span class="date">{{item.enableDateStr}}</span>
                </Col>
                <Col span="3" class="parice-col">
                   <FormItem style="width:120px" 
                    :prop="'goods.' + index + '.quantity'"
                    :key="item.id"
                    :rules="{validator: validateNumber, trigger: 'blur'}"
                    >
                      <Input 
                          v-model="item.quantity" 
                          placeholder=""
                          :maxlength="max"
                          style="width:100px"
                      />
                   </FormItem>
                </Col>
                <Col span="3" class="parice-col">
                   <FormItem style="width:120px" 
                   :prop="'goods.' + index + '.remainQuantity'"
                    :key="item.id"
                    :rules="{validator: validateNumber, trigger: 'blur'}"
                   >
                      <Input 
                          v-model="item.remainQuantity" 
                          placeholder=""
                          :maxlength="max"
                          style="width:100px"
                      />
                   </FormItem>
                </Col>
                <Col  span="3" class="parice-col">
                   <FormItem style="width:120px" 
                   :prop="'goods.' + index + '.priceDecimal'"
                    :key="item.id"
                    :rules="{validator: validateNumber, trigger: 'blur'}"
                   >
                      <Input 
                          v-model="item.priceDecimal" 
                          placeholder=""
                          :maxlength="max"
                          style="width:100px"
                      />
                   </FormItem>
                </Col>
                <Col  span="4" class="parice-col">
                   <FormItem style="width:120px" 
                   :prop="'goods.' + index + '.promotionPriceDecimal'"
                    :key="item.id"
                    :rules="{validator: validateNumber, trigger: 'blur'}"
                   >
                      <Input 
                          v-model="item.promotionPriceDecimal" 
                          placeholder=""
                          :maxlength="maxPrice"
                          style="width:100px"
                      />
                   </FormItem>
                </Col>
                <Col  span="4" class="parice-col">
                   <FormItem style="width:120px" 
                   :prop="'goods.' + index + '.guestPriceDecimal'"
                    :key="item.id"
                    :rules="{validator: validateNumber, trigger: 'blur'}"
                   >
                      <Input 
                          v-model="item.guestPriceDecimal" 
                          placeholder=""
                          :maxlength="maxPrice"
                          style="width:100px"
                      />
                   </FormItem>
                </Col>
                <Col span="4" class="parice-col">
                   <FormItem style="width:120px" 
                    :prop="'goods.' + index + '.guestPromotionPriceDecimal'"
                    :key="item.id"
                    :rules="{validator: validateNumber, trigger: 'blur'}">
                      <Input 
                          v-model="item.guestPromotionPriceDecimal" 
                          placeholder=""
                          :maxlength="maxPrice"
                          style="width:100px"
                      />
                   </FormItem>
                </Col>
            </Row>
          </div>
        </div>
        <div class="bittons">
          <Button type="primary" @click="handleSubmit('detailData')" style="width:108px;">确定</Button>
          <span style="width:20px;display:inline-block;"></span>
          <Button type="ghost" @click="cancel" style="width:108px;" >取消</Button>
          
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
      const validateNumber = (rule, value, callback) => {
        let str = value+'';
          if(!str){
            callback(new Error('请填写完整'));
          }
          if (isNaN(value)) {
              callback(new Error('请填写数字'));
          } else {
              callback();
          }
      };
      const validateConfig = (rule, value, callback) => {
          if(!value){
            callback(new Error('请填写完整'));
          }else if (value && isNaN(value)) {
              callback(new Error('请填写数字'));
          } else {
              callback();
          }
      };
      return {
        devices:[],
        validateNumber:validateNumber,
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
          pics:[
            { required: true, message: '请上传配图', trigger: 'change' }
          ],
          guestPromotionPriceDecimal:[
            { required: true,validator: validateConfig,  trigger: 'blur' }
          ],
          openQuantity:[
            { required: true, validator: validateConfig,  trigger: 'blur' }
          ],
          priceDecimal:[
            { required: true, validator: validateConfig, trigger: 'blur' }
          ],
          promotionPriceDecimal:[
            { required: true,validator: validateConfig,  trigger: 'blur' }
          ],
          guestPriceDecimal:[
            { required: true,validator: validateConfig, trigger: 'blur' }
          ],
          published:[
            { required: true, message: '请选择', trigger: 'blur' }
          ],
          devicesStrArray:[
            { required: true, message: '请选择散座配套', trigger: 'change' }
          ]
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
          goods:[]
        },
        deviceList:[]
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
      this.getDevices()
      GLOBALSIDESWITCH("false");
    },
    watch:{
    },
    destroyed(){
    },
    methods:{
      changeBook(){
        let { params } = this.$route;
        let communityId = params.billId;
        window.open(`/product/goods/edit/${communityId}`,'_blank');
          
      },
      cancel(){
        window.close();
      },
      coverImgRemove(){
          this.detailData.coverPic="";
      },
      coverImgSuccess(file){
          this.detailData.coverPic=file.data.url;
           this.$refs.detailData.validateField('coverPic') 
      },
      detailImgsRemove(fileList){
          let imglist=[];
          fileList.map((item)=>{
              imglist.push(item.url)
          })
          let detailImgs=imglist.join(',');
          this.detailImgList = fileList
          this.detailData.pics=detailImgs;
      },
      detailImgsSuccess(response, file, fileList){
          let imglist=[].concat(this.imglist);
          fileList.map((item)=>{
              imglist.push(item.url)
          })
          let detailImgs=imglist.join(',');
          console.log('========',this.detailImgList)
          this.detailData.pics=detailImgs;
          this.$refs.detailData.validateField('pics') 
            
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
      getDevices(){
        this.$http.get('get-all-devices','').then((res)=>{
          
            this.deviceList = res.data;
          }).catch((err)=>{
            this.$Notice.error({
                title:err.message
            });
          })
      },
      getSeatDetail(){
        
        let { params } = this.$route;
        let communityId = params.billId;
        this.$http.get('get-kr-meeting-seat-detail', {communityId:communityId}).then((res)=>{
          
          var coverImgList = []
          if(res.data.coverPic!=''){
            coverImgList.push({'url':res.data.coverPic});
          }
          let detailImgList=[];
          res.data.pics.map((item)=>{
              let obj={};
              obj.url=item.picUrl;
              detailImgList.push(obj)
          })
          res.data.published=JSON.stringify(res.data.published);
          res.data.pics=JSON.stringify(res.data.pics);
          var devicesStrArray = res.data.devices.map(item=>{
            return item.name;
          })
          
          this.detailImgList=detailImgList;
          this.coverImgList = coverImgList;
          this.priceList = res.data.goods;
          this.detailData = res.data;
          this.detailData.devicesStrArray = devicesStrArray;
        }).catch((err)=>{
          this.$Notice.error({
              title:err.message
          });
        })
        
        

      },
      handleSubmit(name){
        let message = '请填写完表单';
        this.$Notice.config({
            top: 80,
            duration: 3
        });
        let _this = this;
        let devicesStr = this.deviceList.filter(item=>{
          if(this.detailData.devicesStrArray.indexOf(item.name) != -1){
            return true;
          }
        })
        this.detailData.devicesStr = JSON.stringify(devicesStr) 
        this.detailData.devicesStrArray = JSON.stringify(this.detailData.devicesStrArray) 
        console.log('handleSubmit',this.detailData)
        this.$refs[name].validate((valid) => {
            if (valid) {
                _this.submitCreate();
             } else {
                 _this.$Notice.error({
                     title:message
                 });
             }
        }) 
      }, 
      submitCreate(){
        let {params}=this.$route;
        this.detailData.communityId=params.billId;
        
        let picsStr = []
        console.log('submitCreate1',this.detailImgList)
        this.detailImgList.map(item=>{
          let obj = {};
          obj.picUrl = item.url;
          picsStr.push(obj)
        })
        console.log('submitCreate2',picsStr)

        this.detailData.picsStr = JSON.stringify(picsStr);
        this.detailData.goodsStr = JSON.stringify(this.detailData.goods) 
        
        let formData = Object.assign({},this.detailData)
        delete formData.devices  
        delete formData.goods 

           
        this.$http.post('post-krseat-data', formData).then((res)=>{
            this.$Notice.success({
                    title:'编辑成功'
                });
                    window.close();
                    window.opener.location.reload();
        }).catch((err)=>{
            this.$Notice.error({
                    title:err.message
                });
        })
      },
      setPriceList(){
        var goods = this.detailData.goods;
        goods = goods.map(item=>{
          let obj = item;
          obj.guestPriceDecimal = this.detailData.guestPriceDecimal
          obj.guestPromotionPriceDecimal = this.detailData.guestPromotionPriceDecimal
          obj.openQuantity = this.detailData.openQuantity
          obj.priceDecimal = this.detailData.priceDecimal
          obj.promotionPriceDecimal = this.detailData.promotionPriceDecimal
          return obj;
        })
        this.detailData.goods = goods;

      },
      initPriceList(){
        let form = {};
        let {params}=this.$route;
        form.communityId=params.billId;
        form.guestPriceDecimal = this.detailData.guestPriceDecimal;
        form.guestPromotionPriceDecimal = this.detailData.guestPromotionPriceDecimal;
        form.openQuantity = this.detailData.openQuantity;
        form.priceDecimal = this.detailData.priceDecimal;
        form.promotionPriceDecimal = this.detailData.promotionPriceDecimal;

        this.$http.post('post-krseat-price-config', form).then((res)=>{
            console.log('====',res.data) 
            this.priceList = res.data;
        }).catch((err)=>{
          this.setPriceList()
            // this.$Notice.error({
            //     title:err.message
            // });
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
    .content{
      padding-top: 20px;
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
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
  .price-row{
        border:1px solid  #E1E6EB;
        border-top:none;
        &:first-child{
           border-top:1px solid  #E1E6EB; 
        }
        .date{
            display: inline-block;
            height: 33px;
            line-height: 33px;
            margin:15px 0;
        }
        .ivu-form-item{
            margin: 15px 0;
        }
        .ivu-form-item-error-tip{
            padding-top: 3px;
            padding-left: 10px;
            text-align:left;
        }
        .parice-col{
            text-align:center;
            border-right:1px solid  #E1E6EB;
            &:last-child{
                border-right: none;
            }
        }
    }
    .row-header{
        height: 40px;
        line-height: 40px;
        background-color: #f8f8f9;
        font-size: 12px;
        color:#495060;
        font-weight: 700;
    }
    .bittons{
      position: fixed;
      bottom:0;
      width:100%;
      height:60px;
      left:0;
      z-index: 8;
      background-color: #fff;
      line-height: 60px;
      text-align:center;
      box-shadow: 0 1px 4px 0 rgba(0,0,0,0.20);
    }
</style>