<template>
    <div class="g-goods-detail">
        <SectionTitle title="编辑社区商品"></SectionTitle>   
        <div class="m-goods-content">
            <Form ref="formItems" :model="formItem"  :rules="ruleValidate">
                <DetailStyle info="社区基本信息">
                    <LabelText label="社区名称：">
                        {{goodsInfo.communityName}}
                    </LabelText>
                    <LabelText label="大厦名称：">
                        {{goodsInfo.buildingName}}
                    </LabelText>
                    <LabelText label="正式开业状态：">
                        {{goodsInfo.communityStatus}}
                    </LabelText>
                    <LabelText label="正式开业时间：">
                        {{goodsInfo.openDate}}
                    </LabelText>
                    <FormItem label="详细地址"  style="width:252px" prop="communityAddress">
                        <Input 
                            v-model="formItem.communityAddress" 
                            placeholder="详细地址"
                        />
                    </FormItem>
                    <div class="u-upload">
                        <FormItem label="大厦外景图" class="u-input" prop="buildingImg" style="width:100%">
                                <UploadFile 
                                    v-model="formItem.buildingImg"
                                    :category="category"
                                    withCredentials
                                    :format="['jpg','png','gif']"
                                    :maxSize="2048"
                                    :maxLen="1"
                                    :onSuccess="buildingImgSuccess"
                                    :onRemove="buildingImgRemove"
                                    :onExceededSize="imgSize"
                                    :onFormatError="imgSizeFormat"
                                    :defaultFileList="buildingImgList"
                                    :imgWidth="120"
                                    :imgHeight="120"
                                >
                                    <div slot="tip" class="u-unload-tip">图片小于1MB，格式为JPG，PNG，GIF，建议图片比例为3:4</div>
                                </UploadFile>
                        </FormItem>
                    </div>
                    <div class="u-upload">
                        <FormItem label="社区展示图册" class="u-input" prop="communityImgs" style="width:100%">
                            <UploadFile 
                                v-model="formItem.communityImgs"
                                multiple
                                :category="category"
                                withCredentials
                                :format="['jpg','png','gif']"
                                :maxSize="2048"
                                :onSuccess="detailImgsSuccess"
                                :onRemove="detailImgsRemove"
                                :onExceededSize="imgSize"
                                :onFormatError="imgSizeFormat"
                                :defaultFileList="communityImgsList"
                                :imgWidth="120"
                                :imgHeight="120"
                                
                            >
                                <div slot="tip" class="u-unload-tip">图片小于1MB，格式为JPG，PNG，GIF，建议图片比例为4:3；</div>
                            </UploadFile>
                        </FormItem>
                    </div>
                </DetailStyle>
                <DetailStyle info="APP社区商品信息">
                   <div>
                       <FormItem label="上架状态" class="u-input" style="width:250px" prop="appPublished">
                            <RadioGroup v-model="formItem.appPublished" style="width:250px">
                                <Radio label="1">
                                    已上架
                                </Radio>
                                <Radio label="0">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                   </div>
                    <LabelText label="已上架会议室商品数量：">
                        {{goodsInfo.appRoomNum}}
                    </LabelText>
                    <LabelText label="已上架散座商品数量：">
                        {{goodsInfo.appSeatNum}}
                    </LabelText>
                </DetailStyle>
                <DetailStyle info="小程序社区商品信息">
                     <FormItem label="上架状态" class="u-input" style="width:250px" prop="kmPublished">
                            <RadioGroup v-model="formItem.kmPublished" style="width:250px">
                                <Radio label="2">
                                    已上架
                                </Radio>
                                 <Radio label="1">
                                    待上架
                                </Radio>
                                <Radio label="0">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                    </FormItem>
                    <div> 
                      <FormItem label="社区折扣策略"  style="width:252px;display:inline-block;margin-right:20px;" >
                          <Input 
                              v-model="formItem.promotionDesc" 
                              placeholder="社区折扣策略"
                              :maxlength="maxLength"
                          />
                      </FormItem>
                      <FormItem label=""  style="width:250px;display:inline-block;vertical-align:bottom;" >
                          <Input 
                              v-model="formItem.promotionAddDesc" 
                              placeholder="社区折扣策略"
                              :maxlength="maxLength"
                          />
                      </FormItem>
                     </div>
                    <LabelText label="已上架会议室商品数量：">
                        {{goodsInfo.kmRoomNum}}
                    </LabelText>
                    <LabelText label="已上架散座商品数量：">
                        {{goodsInfo.kmSeatNum}}
                    </LabelText>
                    <FormItem label="散座营业时段"  style="width:45%;display:inline-block;"   >
                           <div >
                               <TimePicker 
                                    format="HH:mm" 
                                    style="width: 122px" 
                                    v-model="form.kmStartTime"
                                    @on-change="changeAppStartTime"
                                    :steps="[1,30]"
                                />
                                <span style="padding:0 10px;">至</span>
                                <TimePicker 
                                    format="HH:mm"  
                                    style="width: 122px" 
                                    v-model="form.kmEndTime"
                                    @on-change="changeAppEndTime"
                                    :steps="[1,30]"
                                />
                                 <div v-if="isAppError" class="u-error">请选择可预订时段</div>
                           </div>
                    </FormItem>
                  
                    <FormItem label="自定义不可预订日期" style="width:45%;display:inline-block;">
                        <div >
                            <Select v-model="formItem.enableDateStrategy" style="width:200px" @on-change="selectChange">
                                <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem v-if="showDate " label="自定义不可预订日期" class="u-input ivu-form-item-required"  style="width:350px"   >
                        <Tooltip max-width="300" placement="top">
                           
                           <Icon type="ios-help" size="20" style="margin-top:5px;"/>
                             <div slot="content">
                                <b>温馨提示</b>
                                <p>① 灰色日期为不可预订日期</p>
                                <p>② 单击选中日期，即可设置该日期是否可预订</p>
                                <p>③ 默认所有周末为不可预订，您可以根据实际需求变更</p>
                            </div>
                        </Tooltip>
                        <div style="width:350px;float:right;">
                            <KrDatePicker v-model="form.unuseDates"/>
                        </div>
                    </FormItem>
                    <!-- <Row>
                       
                        <Col span="13" style="position:relative">
                            <FormItem label="KM不可预订日期：" prop="date" :label-width="140">
                                <span v-on:mouseover="tipsShow" v-on:mouseout="tipsHide" class="help-circled">
                                    <Icon type="help-circled" style="font-size:18px;"></Icon>
                                </span>
                               
                                <calendar></calendar>
                            </FormItem>
                            <div class="tips" v-show="isShow">
                                <p>温馨提示</p>
                                <p>① 灰色日期为不可预订日期</p>
                                <p>② 单击选中日期，即可设置该日期是否可预订</p>
                                <p>③ 默认所有周末为不可预订</p>
                            </div>
                        </Col>
                       
                    </Row>
                     -->
                </DetailStyle>
                
                 
            </Form>
            <div style="text-align:center">
                <Button type="primary" @click="handleSubmit('formItems')" :disabled="isDisabled">确定</Button>
            </div>
        </div>
    </div>
</template>

<script>
import DetailStyle from "~/components/DetailStyle";
import LabelText from "~/components/LabelText";
import SectionTitle from "~/components/SectionTitle";
import UploadFile from "~/components/UploadFile";
import dateUtils from "vue-dateutils";
import calendar from "../calendar.vue";
import KrDatePicker from "~/components/KrDatePicker";
export default {
  components: {
    DetailStyle,
    LabelText,
    SectionTitle,
    UploadFile,
    calendar,
    KrDatePicker
  },
  head() {
    return {
      title: "编辑社区商品"
    };
  },
  data() {
    return {
      selectList: [
        { value: "NONE", label: "无" },
        { value: "WEEK", label: "自定义时间" }
      ],
      isDisabled:false,
      showDate: false,
      date: [],
      category: "app/upgrade",
      isAppError: false,
      formItem: {},
      maxLength: 10,
      form: {
        kmStartTime: "09:00",
        kmEndTime: "19:00",
        unuseDates: []
      },
      goodsInfo: {},
      ruleValidate: {
        communityAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        buildingImg: [
          { required: true, message: "请选择图片上传", trigger: "blur" }
        ],
        communityImgs: [
          { required: true, message: "请选择图片上传", trigger: "blur" }
        ],
        appPublished: [
          {
            required: true,
            message: "APP商品上架状态不能为空",
            trigger: "blur"
          }
        ],
        kmPublished: [
          { required: true, message: "KM商品上架状态不能为空", trigger: "blur" }
        ]
      },
      imglist: [],
      buildingImgList: [],
      communityImgsList: []
    };
  },
  mounted: function() {
    GLOBALSIDESWITCH("false");
    this.getGoodsInfo();
    // this.getYearWeekend();
  },
  methods: {
    selectChange(value) {
      if (value == "WEEK") {
        this.getYearWeekend();
      } else {
        this.showDate = false;
      }
    },
    handleSubmit(name) {
      let { params } = this.$route;
      let message = "请填写完表单";
      this.$Notice.config({
        top: 80,
        duration: 3
      });
      let _this = this;
      this.formItem.communityId = params.id;
      if (!this.formItem.kmStartTime) {
        this.formItem.kmStartTime = "09:00";
      }
      if (!this.formItem.kmEndTime) {
        this.formItem.kmEndTime = "19:00";
      }

      this.$refs[name].validate(valid => {
        if (valid) {
          _this.submitCreate();
        } else {
          _this.$Notice.error({
            title: message
          });
        }
      });
    },
    submitCreate() {
      delete this.formItem.unuseDates;
      this.isDisabled = true;
      this.$http
        .post("edit-krmting-mobile-community", this.formItem)
        .then(res => {
          this.$Notice.success({
            title: "编辑成功"
          });
         

          this.submitYearWeekend();
        })
        .catch(err => {
           this.isDisabled = false
          this.$Notice.error({
            title: err.message
          });
        });
    },
    changeAppStartTime(data) {
      this.formItem.kmStartTime = data;
      if (this.formItem.kmStartTime && this.formItem.kmEndTime) {
        this.isAppError = false;
      } else {
        this.isAppError = true;
      }
    },
    changeAppEndTime(data) {
      this.formItem.kmEndTime = data;
      if (this.formItem.kmStartTime && this.formItem.kmEndTime) {
        this.isAppError = false;
      } else {
        this.isAppError = true;
      }
    },
    getGoodsInfo() {
      let { params } = this.$route;
      let form = {
        communityId: params.id
      };
      let communityStatus = {
        "1": "已开业",
        "0": "未开业"
      };
      this.$http
        .get("get-krmting-mobile-community-detail", form)
        .then(res => {
          let data = Object.assign({}, res.data);
          let appPublished = String(res.data.appPublished);
          let kmPublished = String(res.data.kmPublished);
          res.data.communityStatus = communityStatus[res.data.communityStatus];
          data.appPublished = appPublished;
          data.kmPublished = kmPublished;

          let buildingImgList = [];
          if (data.buildingImg && data.buildingImg != "") {
            buildingImgList.push({ url: data.buildingImg });
          }
          this.buildingImgList = buildingImgList;

          let communityImgsList = [];
          data.communityImgs &&
            data.communityImgs.map(item => {
              let obj = {};
              obj.url = item;
              communityImgsList.push(obj);
            });
          this.communityImgsList = communityImgsList;

          this.goodsInfo = res.data;

          delete data.appRoomNum;
          delete data.appSeatNum;
          delete data.buildingName;
          delete data.communityName;
          delete data.kmRoomNum;
          delete data.kmSeatNum;
          delete data.openDate;
          delete data.communityStatus;
          this.formItem = data;
          if (data.kmStartTime) {
            this.form.kmStartTime = data.kmStartTime.substring(0, 5);
          }
          if (data.kmEndTime) {
            this.form.kmEndTime = data.kmEndTime.substring(0, 5);
          }
          if (data.communityImgs) {
            this.formItem.communityImgs = data.communityImgs.join(",");
          }
          // if(res.data.enableDateStrategy == 'WEEK'){
          //     this.getYearWeekend();
          // }
        })
        .catch(err => {
          this.$Notice.error({
            title: err.message
          });
        });
    },

    buildingImgRemove() {
      this.formItem.buildingImg = "";
    },
    buildingImgSuccess(file) {
      this.formItem.buildingImg = file.data.url;
      this.$refs.formItems.validateField("buildingImg");
    },
    detailImgsRemove(fileList) {
      let imglist = [];
      fileList.map(item => {
        imglist.push(item.url);
      });
      let communityImgs = imglist.join(",");
      this.formItem.communityImgs = communityImgs;
    },
    detailImgsSuccess(response, file, fileList) {
      let imglist = [].concat(this.imglist);

      fileList.map(item => {
        imglist.push(item.url);
      });
      let communityImgs = imglist.join(",");
      this.formItem.communityImgs = communityImgs;
      this.$refs.formItems.validateField("communityImgs");
    },
    imgSizeFormat() {
      this.$Notice.error({
        title: "图片格式不正确"
      });
    },
    imgSize() {
      this.$Notice.error({
        title: "图片大小超出限制"
      });
    },
    //不可预定日期提交
    submitYearWeekend() {
      //不可预定日期无时不请求
      let strategy = "WEEK";
      let disableDate = this.dateFormat(this.form.unuseDates || []);
      let enableDate = this.dateFormat(
        this.getEnableDate(
          this.form.unuseDates || [],
          this.goodsInfo.unuseDates || []
        )
      );
      if (!this.showDate) {
        strategy = "NONE";
        disableDate = [];
        enableDate = [];
      }
      let params = JSON.stringify({
        cmtId: this.$route.params.id,
        disableDate: disableDate,
        enableDate: enableDate,
        strategy: strategy
      });

      // return ;
      this.$http
        .post("post-krmting-mobile-edit-disable-calendar", { editJson: params })
        .then(() => {
          this.isDisabled = false;
          setTimeout(function() {
            window.close();
            window.opener.location.reload();
          }, 1000);
        })
        .catch(err => {
           this.isDisabled = false;
          this.$Notice.error({
            title: err.message
          });
        });
    },
    //获取周六日
    getYearWeekend() {
      let params = {
        strategy: "WEEK",
        cmtId: this.$route.params.id
      };
      this.$http
        .get("get-krmting-mobile-get-workday", params)
        .then(res => {
          // let from = Object.assign({}, this.from);
          // from.unuseDates = [].concat(res.data.unuseDates);
          this.form.unuseDates =[].concat(res.data.unuseDates);
          this.showDate = true;
        })
        .catch(err => {
          this.$Notice.error({
            title: err.message
          });
        });
    },
    validateWeekend(year, month, nowday) {
      let day = new Date(year, month, nowday).getDay();
      if (month && (day === 0 || day === 6)) {
        return true;
      }
      return false;
    },
    getEnableDate(now, old) {
      now = now.join(",");
      let arr = [];
      for (let i = 0; i < old.length; i++) {
        if (now.indexOf(old[i]) == -1) {
          arr.push(old[i]);
        }
      }
      console.log(arr, now);
      return arr;
    },
    dateFormat(dateArr) {
      let arr = [].concat(dateArr);
      for (let i = 0; i < arr.length; i++) {
        arr[i] =
          dateUtils.dateToStr("YYYY-MM-DD", new Date(arr[i])) + " 00:00:00";
      }
      return arr;
    }
  }
};
</script>

<style lang="less">
.g-goods-detail {
  .ivu-tooltip-inner {
    max-width: 350px;
  }
  .center {
    width: 300px;

    overflow: hidden;
  }
  .u-input {
    display: inline-block;
    width: 252px;
    max-width: 450px;
    margin-right: 120px;
    vertical-align: top;
  }
  .u-error {
    color: #ed3f14;
    font-size: 12px;
  }
  .u-upload {
    width: 100%;
    .ivu-form-item-label {
      width: 100%;
      text-align: left;
      float: none;
    }
  }
  .u-unload-label {
    font-size: 12px;
    line-height: 30px;
    color: #495060;
  }
  .u-unload-tip {
    line-height: 30px;
    text-indent: 12px;
    color: #495060;
    font-size: 12px;
  }
  .m-goods-content {
    padding: 30px 24px;
    // .help-circled{
    //     width: 20px;
    //     height: 20px;
    //     display: inline-block;
    //     margin-left: -18px;
    //     margin-top: 4px;

    // }

    // .tips{
    //     position: absolute;
    //     padding:20px;
    //     background: #ccc;
    //     font-size: 18px;
    //     line-height: 30px;
    //     color: #666;
    //     z-index: 99;
    //     left: 60px;
    //     top: 40px;
    // }
    // .tips:after{
    //     border-left: 13px solid transparent;
    //     border-right: 13px solid transparent;
    //     border-bottom: 15px solid #ccc;
    //     content: "";
    //     position: absolute;
    //     width: 0;
    //     left: 50px;
    //     top: -15px;
    // }
  }
}
</style>


