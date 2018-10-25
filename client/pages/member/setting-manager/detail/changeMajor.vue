<template>
  <div class="g-add-manage changeMajor">
    <div class="u-form">
      <Form ref="formItems" :model="formItem" :rules="ruleCustom" label-position="top">
        <!-- 新增 -->
        <div v-if="managetype==='addManager'">
          <!-- 新增第一步 -->
          <div v-show="status === 1" class="majorContent">
            <p>2018年8月以后的客户，主管理员一般可通过新签工位合同的方式自动添加；</p>
            <p>2018年8月之前签约的客户也可通过新的续签或增租自动添加主管理员；</p>
            <p>
              <span class="redTip">一个客户在一个社区只能有一个主管理员</span>，已有主管理员的不能再添加；
            </p>
            <p>
              方式添加需提供客户盖章的
              <span class="linked" @click="downloadCertificate(1)">《主管理员授权书》</span>
            </p>
          </div>
          <!-- 新增第二步 -->
          <div v-show="status === 2" class="majorContent">
            <p class="hasMarginTop">需要添主管理员的社区：</p>
            <div class="u-community-check-list">
              <CheckboxGroup v-model="checkGroup" @on-change="checkMajorChange">
                <Checkbox
                  v-for="item in AddmajorComList"
                  :key="item.cmtId"
                  :disabled="item.isManager==2"
                  :label="item.cmtId"
                >{{item.cmtName}}</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
           <!-- 新增第三步 -->
          <div class="u-part" v-show="status === 3">
            <div class="u-part-tip">输入需要设为主管理员的账号，可以为非企业员工</div>
            <div class="u-part-content">
              <FormItem
                label="手机号"
                style="width:252px;display:inline-block;margin-right:30px;"
                prop="mbrPhone"
              >
                <Input v-model="formItem.mbrPhone" placeholder="请输入手机号" :maxlength="11"/>
              </FormItem>
              <Button type="primary" class="u-search-btn" @click="searchInfo">搜索</Button>
              <div class="u-error-tip" v-show="ifError">该手机号尚未成为氪空间注册用户，继续“添加管理员”后会自动为TA创建账号</div>
              <div v-show="status === 3 && ifShow">
                <FormItem label="姓名" class="u-input" prop="mbrName">
                  <Input v-model="formItem.mbrName" placeholder="请输入姓名"/>
                </FormItem>
                <FormItem label="邮箱" class="u-input" prop="mbrEmail">
                  <Input v-model="formItem.mbrEmail" placeholder="请输入邮箱" type="email"/>
                </FormItem>
                <FormItem label="身份证号" class="u-input">
                  <Input
                    v-model="formItem.mbrIdCardNo"
                    placeholder="请输入身份证号"
                    :maxlength="18"
                    @on-change="cardChange"
                    :class="ifCard?'u-card-error-tip':''"
                  />
                </FormItem>
                <div class="u-label-text u-input">
                  <div class="u-label">类型</div>
                  <div class="u-text">{{companyType}}</div>
                </div>
                <div class="u-card-tip" v-show="ifCard">请输入数字</div>
              </div>
            </div>
            <div class="u-part hasPaddingLeft" v-show="ifShow">
              <div class="u-part-title">授权管理的社区</div>
              <div class="u-community-check-list noPadding">{{selectedCom}}</div>
            </div>
          </div>
           <!-- 新增第四步 -->
          <div v-show="status === 4" class="majorContent">
            <p>请上传客户盖章后的主管理员变更授权书</p>
            <p style="margin-top:5px" @click="downloadCertificate(1)">
              <span class="linked">下载授权书模板</span>
            </p>
            <div style="display:inline-block;">
              <input :id="inputId" type="file" style="display:none;" @change="onChange"/>
              <div class="list">
                <div>
                  <Button type="ghost" icon="ios-plus-outline" @click="upBtnClick">{{uploadText}}</Button>
                  <span style="display:inline-block;margin-left:20px;">{{fileName}}</span>
                </div>
              </div>
            </div>
            <p>点击确认后新的主管理员将立即生效，旧的主管理员将立即失效，纸质授权书请线下留档。</p>
          </div>
          <div class="btns" v-show="!(status === 3 && ifShow === false)">
            <Button type="ghost" @click="lastStep">{{leftText}}</Button>
            <Button type="primary" style="margin-left: 8px" @click="nextStep">{{rightText}}</Button>
          </div>
        </div>
        <!-- 修改 -->
        <div v-if="managetype==='changeManager'">
           <!-- 修改第一步 -->
          <div v-show="status === 1" class="majorContent">
            <p>正在将主管理员从 {{detail.mbrName}} 变更为其他账号</p>
            <p>
              变更需提交盖章的
              <span class="linked" @click="downloadCertificate(2)">《主管理员变更授权书》</span>
            </p>
            <p>新签合同时如有修改，合同生效后也会自动变更。</p>
            <p class="hasMarginTop">请选择需要变更的社区</p>
            <div class="u-community-check-list">
              <CheckboxGroup v-model="checkAllGroup" @on-change="checkGroupChange">
                <Checkbox
                  v-for="item in majorComList"
                  :key="item.cmtId"
                  :label="item.cmtId"
                >{{item.cmtName}}</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
             <!-- 修改第二步 -->
          <div class="u-part" v-show="status === 2">
            <div class="u-part-tip">输入需要设为主管理员的账号，可以为非企业员工</div>
            <div class="u-part-content">
              <FormItem
                label="手机号"
                style="width:252px;display:inline-block;margin-right:30px;"
                prop="mbrPhone"
              >
                <Input v-model="formItem.mbrPhone" placeholder="请输入手机号" :maxlength="11"/>
              </FormItem>
              <Button type="primary" class="u-search-btn" @click="searchInfo">搜索</Button>
              <div class="u-error-tip" v-show="ifError">该手机号尚未成为氪空间注册用户，继续“添加管理员”后会自动为TA创建账号</div>
              <div v-show="status === 2 && ifShow">
                <FormItem label="姓名" class="u-input" prop="mbrName">
                  <Input v-model="formItem.mbrName" placeholder="请输入姓名"/>
                </FormItem>
                <FormItem label="邮箱" class="u-input" prop="mbrEmail">
                  <Input v-model="formItem.mbrEmail" placeholder="请输入邮箱" type="email"/>
                </FormItem>
                <FormItem label="身份证号" class="u-input">
                  <Input
                    v-model="formItem.mbrIdCardNo"
                    placeholder="请输入身份证号"
                    :maxlength="18"
                    @on-change="cardChange"
                    :class="ifCard?'u-card-error-tip':''"
                  />
                </FormItem>
                <div class="u-label-text u-input">
                  <div class="u-label">类型</div>
                  <div class="u-text">{{companyType}}</div>
                </div>
                <div class="u-card-tip" v-show="ifCard">请输入数字</div>
              </div>
            </div>
            <div class="u-part hasPaddingLeft" v-show="ifShow">
              <div class="u-part-title">管理的社区</div>
              <div class="u-community-check-list noPadding">{{selectedCom}}</div>
            </div>
          </div>
          <!-- 修改第三步 -->
          <div v-show="status === 3" class="majorContent">
            <p>请上传客户盖章后的主管理员变更授权书</p>
            <p style="margin-top:5px" @click="downloadCertificate(2)">
              <span class="linked">下载授权书模板</span>
            </p>
            <div style="display:inline-block;">
              <input :id="inputId" type="file" style="display:none;" @change="onChange"/>
              <div class="list">
                <div>
                  <Button type="ghost" icon="ios-plus-outline" @click="upBtnClick">{{uploadText}}</Button>
                  <span style="display:inline-block;margin-left:20px;">{{fileName}}</span>
                </div>
              </div>
            </div>
            <p>点击确认后新的主管理员将立即生效，旧的主管理员将立即失效，纸质授权书请线下留档。</p>
          </div>
          <div class="btns" v-show="!(status === 2 && ifShow === false)">
            <Button type="ghost" @click="lastStep">{{leftText}}</Button>
            <Button type="primary" style="margin-left: 8px" @click="nextStep">{{rightText}}</Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import LabelText from "~/components/LabelText";
import utils from "~/plugins/utils";

export default {
  components: {
    LabelText
  },
  props: {
    detail: Object,
    majorComList: Array,
    closeMajor: Function,
    changeMajor: Function,
    managetype: String,
    AddmajorComList: Array
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      var reg = /^1\d{10}$/;
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else if (value && !reg.test(value)) {
        callback(new Error("请输入正确手机号码"));
      } else {
        callback();
      }
    };

    return {
      checkAll: false,
      ifCheckError: false,
      checkAllGroup: [],
      checkGroup: [],
      checkList: "",
      communityList: [],
      ifError: false,
      ifShow: false,
      ifCard: false,
      formItem: {
        cmtIds: "",
        mbrPhone: "",
        mbrName: "",
        mbrEmail: "",
        mbrIdCardNo: ""
      },
      ruleCustom: {
        mbrPhone: [
          { validator: validatePhone, required: true, trigger: "change" }
        ],
        mbrName: [{ required: true, message: "请输入姓名", trigger: "change" }],
        mbrEmail: [{ required: true, message: "请输入邮箱", trigger: "change" }]
      },
      companyType: "",
      status: 1,
      inputId: "upload-file",
      uploadText: "上传附件",
      fileName: "",
      file: ""
    };
  },
  mounted() {
    if (this.managetype === "addManager") {
      // 新增
      let tempCheck =
        (this.AddmajorComList &&
          this.AddmajorComList.length &&
          this.AddmajorComList.map(i => {
            if (i.isManager == 2) {
              return i.cmtId;
            }
          })) ||
        [];
      tempCheck = tempCheck.filter((v, i) => {
        return !!v;
      });
      this.checkGroup = tempCheck;
    } else {
      // 修改
      let tempCheck =
        (this.majorComList &&
          this.majorComList.length &&
          this.majorComList.map(i => i.cmtId)) ||
        [];
      let str = [].concat(tempCheck).join(",");
      this.checkAllGroup = tempCheck;
      this.checkList = str;
      this.formItem.cmtIds = str;
    }
  },
  methods: {
    cardChange() {
      let card = this.formItem.mbrIdCardNo;
      let reg = /^\+?[1-9]\d*$/;
      if (card && !reg.test(card)) {
        this.ifCard = true;
      } else {
        this.ifCard = false;
      }
    },
    searchInfo() {
      let checkValid = true;
      this.$refs.formItems.validateField("mbrPhone", notValid => {
        console.log("notValid---", notValid);
        if (notValid) {
          checkValid = false;
        }
      });
      if (!checkValid) return;
      let { params } = this.$route;
      let phone = this.formItem.mbrPhone;
      let form = {
        mbrPhone: phone,
        customerId: params.csrId
      };
      this.$http
        .get("get-customer-manager-user-detail", form)
        .then(res => {
          if (res.code == 2) {
            this.ifError = true;
          } else {
            this.ifError = false;
          }
          let data = Object.assign({}, res.data);
          delete data.cmtList;
          delete data.mbrType;
          // 注意原有返回字段：社区的影响
          if (this.managetype === "addManager") {
            this.formItem = Object.assign(data, {
              cmtIds: this.checkList
            });
          } else {
            this.formItem = Object.assign(data, {
              cmtIds: this.checkAllGroup.join(",")
            });
          }
          this.companyType = res.data.mbrType == 1 ? "在职员工" : "非企业员工";
          this.ifShow = true;
        })
        .catch(err => {
          this.$Notice.error({
            title: err.message
          });
        });
    },
    // 修改的checkbox
    checkGroupChange(data) {
      let checkList = [].concat(this.checkAllGroup);
      this.checkList = checkList.join(",");
      this.formItem.cmtIds = checkList.join(",");
    },
    // 新增的checkbox
    checkMajorChange(data) {
      let checkList = [];
      this.checkGroup.map((val, index) => {
        this.AddmajorComList.map((v, i) => {
          if (v.cmtId === val && v.isManager != 2) {
            checkList.push(val);
          }
        });
      });
      this.checkList = checkList.join(",");
      this.formItem.cmtIds = checkList.join(",");
    },
    handleSubmit(callback) {
      let message = "请填写完表单";
      this.$Notice.config({
        top: 80,
        duration: 3
      });
      this.$refs.formItems.validate(valid => {
        if (valid && this.formItem.cmtIds) {
          callback && callback();
        } else {
          this.$Notice.error({
            title: message
          });
        }
      });
    },
    lastStep() {
      if (this.managetype === "addManager") {
        switch (this.status) {
          case 1:
            this.closeMajor();
            break;
          case 2:
            this.status = 1;
            break;
          case 3:
            this.status = 2;
            break;
          case 4:
            this.closeMajor();
            break;
        }
      } else {
        switch (this.status) {
          case 1:
            this.closeMajor();
            break;
          case 2:
            this.status = 1;
            break;
          case 3:
            this.closeMajor();
            break;
        }
      }
    },
    nextStep() {
      let _this = this;
      if (this.managetype === "addManager") {
        switch (this.status) {
          case 1:
            this.status = 2;
            break;
          case 2:
            this.status = 3;
            break;
          case 3:
            this.$refs.formItems.validate(valid => {
              if (valid && _this.formItem.cmtIds) {
                this.status = 4;
              } else {
                let message = '';
                if(!this.checkList){
                   message = '请选择社区'
                }else{
                  message = "请填写完表单";
                }
                this.$Notice.error({
                  title: message
                });
              }
            });
            break;
          case 4:
            this.handleSubmit(this.submitInfo);
            break;
        }
      } else {
        switch (this.status) {
          case 1:
            this.status = 2;
            break;
          case 2:
            this.$refs.formItems.validate(valid => {
              if (valid && _this.formItem.cmtIds) {
                this.status = 3;
              } else {
                let message = "请填写完表单";
                this.$Notice.error({
                  title: message
                });
              }
            });
            break;
          case 3:
            this.handleSubmit(this.submitInfo);
            break;
        }
      }
    },

    upBtnClick() {
      let fileDom = document.getElementById(this.inputId);
      fileDom.click();
    },
    onChange(e) {
      const file = e.target.files;
      console.log(file[0]);
      this.file = file[0];
      this.$Message.success("选择成功");
      this.uploadText = "重新上传";
      this.fileName = (file[0] && file[0].name) || "";
    },
    submitInfo() {
      if (!this.file) {
        let message = "请先上传附件";
        this.$Notice.error({
          title: message
        });
        return;
      }
      let form = new FormData();
      if (Object.keys(this.formItem).length) {
        Object.keys(this.formItem).forEach(key => {
          form.append(key, this.formItem[key]);
        });
      }
      form.append("customerId", this.$route.params.csrId);
      form.append("certificate", this.file);
      form.append("curMbrId", this.detail.mbrId || "");
      var xhrfile = new XMLHttpRequest();
      xhrfile.timeout = 600000;
      let _this = this;
      xhrfile.onreadystatechange = function() {
        if (xhrfile.readyState === 4) {
          var fileResponse = xhrfile.response;
          if (xhrfile.status === 200) {
            if (fileResponse && fileResponse.code > 0) {
              _this.changeMajor();
              _this.closeMajor();
            } else {
              _this.$Notice.error({
                title: fileResponse.message
              });
            }
          } else {
            _this.$Notice.error({
              title: "上传失败，请稍后重试"
            });
          }
        }
      };

      xhrfile.onerror = function error(err) {
        this.$Notice.error({
          title: err
        });
      };

      xhrfile.open(
        "POST",
        "/api/krspace-finance-web/customer/manager/chiefmanager/edit",
        true
      );
      xhrfile.responseType = "json";
      xhrfile.send(form);
    },
    downloadCertificate(type) {
      let id = type == 1 ? 127390:135732;
      this.$http
        .post("get-station-contract-pdf-url", {
          id: id
        })
        .then(res => {
          utils.downFileBlank(res.data);
        })
        .catch(err => {
          this.$Notice.error({
            title: err.message
          });
        });
    },
  },
  updated: function() {
    this.$emit("formData", this.formItem);
  },
  computed: {
    leftText() {
      if (this.managetype === "addManager") {
        switch (this.status) {
          case 1:
            return "取消";
            break;
          case 2:
            return "上一步";
            break;
          case 3:
            return "上一步";
          case 4:
            return "取消";
        }
      } else {
        switch (this.status) {
          case 1:
            return "取消";
            break;
          case 2:
            return "上一步";
            break;
          case 3:
            return "取消";
        }
      }
    },
    rightText() {
      if (this.managetype === "addManager") {
        switch (this.status) {
          case 1:
            return "下一步";
            break;
          case 2:
            return "下一步";
            break;
          case 3:
            return "下一步";
          case 4:
            return "确定";
        }
      } else {
        switch (this.status) {
          case 1:
            return "下一步";
            break;
          case 2:
            return "下一步";
            break;
          case 3:
            return "确定";
        }
      }
    },
    selectedCom() {
      let joinStr = "";
      if (this.managetype === "addManager") {
        this.AddmajorComList.forEach(i => {
          if (this.checkGroup.indexOf(i.cmtId) !== -1 && i.isManager !== 2) {
            joinStr += `，${i.cmtName}`;
          }
        });
      } else {
        this.majorComList.forEach(i => {
          if (this.checkAllGroup.indexOf(i.cmtId) !== -1) {
            joinStr += `，${i.cmtName}`;
          }
        });
      }

      return joinStr.substring(1);
    }
  }
};
</script>
<style lang="less">
.g-add-manage {
  position: relative;
  padding-bottom: 10px;
  .u-form {
    box-sizing: border-box;
    .redTip {
      color: red;
    }
    .u-error-tip {
      color: #ed3f14;
      font-size: 14px;
      margin-bottom: 20px;
      margin-top: -10px;
    }
    .u-card-tip {
      color: #ed3f14;
      font-size: 12px;
      margin-top: -18px;
    }
    .u-card-error-tip {
      .ivu-input {
        border: 1px solid #ed3f14;
        box-shadow: none;
        &:focus {
          box-shadow: 0 0 0 2px rgba(237, 63, 20, 0.2);
        }
      }
    }
    .u-error-check {
      color: #ed3f14;
      font-size: 14px;
      margin-bottom: 10px;
      padding-left: 44px;
    }
    form {
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .u-input {
      width: 252px;
      display: inline-block;
      margin-right: 30px;
    }
    .u-part {
      display: inline-block;
      width: 100%;
      position: relative;
      &.hasPaddingLeft {
        padding-left: 44px;
      }
    }
    .u-part-number {
      width: 28px;
      height: 28px;
      line-height: 26px;
      text-align: center;
      font-size: 14px;
      color: #333333;
      border-radius: 100% 100%;
      border: 1px solid #333333;
      display: inline-block;
      margin-right: 15px;
    }
    .u-part-title {
      display: inline-block;
      line-height: 30px;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
    }
    .u-part-tip {
      font-size: 12px;
      color: #999999;
      text-indent: 44px;
      margin-bottom: 10px;
    }
    .u-part-line {
      height: 266px;
      width: 0;
      border-left: 1px dashed #333333;
      position: absolute;
      left: 14px;
      top: 30px;
    }
    .u-part2-line {
      width: 0;
      height: 100%;
      border-left: 1px dashed #333333;
      position: absolute;
      left: 14px;
      top: 30px;
      display: inline-block;
    }
    .u-part-content {
      padding-left: 44px;
      box-sizing: border-box;
    }
    .u-community-check-list {
      margin-top: 16px;
      padding: 0 46px;
      &.noPadding {
        padding: 0;
      }
      .u-all-check {
        margin-bottom: 12px;
      }
    }
    .u-search-btn {
      height: 30px;
      margin-top: 24px;
      line-height: 15px;
    }
    .u-label-text {
      font-size: 12px;
      color: #495060;
      .u-text {
        line-height: 40px;
      }
    }
  }
  .majorContent {
    p {
      font-size: 14px;
      line-height: 24px;
      color: #495060;
      text-indent: 44px;
      &.hasMarginTop {
        margin-top: 10px;
      }
    }
    .list {
      margin: 10px 0 15px 45px;
    }
  }
  .btns {
    position: absolute;
    bottom: -40px;
    right: 10px;
  }
}

.linked {
  color: #2d8cf0;
  cursor: pointer;
}
</style>


