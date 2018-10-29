<template>
  <div class="create-discount-panel">
    <div class="step-container">
      <Steps :current="currentStep">
        <Step v-for="(step,index) in steps" :key="index" :title="step.title"/>
      </Steps>
    </div>
    <div class="from-container">
      <!--start 第一步 选择社区和折扣类型-->
      <div class="select-discount-scheme" v-show="currentStep==0">
        <Form
          :model="formScheme"
          :label-width="100"
          style="padding:0 20px"
          :rules="ruleCustom"
          ref="formContent"
          class="discount-set-from"
        >
          <FormItem label="适用社区" prop="communityId">
            <SelectCommunities v-model="formScheme.communityId"></SelectCommunities>
          </FormItem>
          <FormItem label="折扣方案" prop="schemeType">
            <Select v-model="formScheme.schemeType" @on-change="onSchemeChange">
              <Option
                v-for="(option, index) in discountSchemeList"
                :value="option.value"
                :key="option.value"
              >{{option.desc}}</Option>
            </Select>
          </FormItem>
          <div class="step-btn-container">
            <Button class="step-btn" type="primary" @click="next">下一步</Button>
            <Button class="step-btn" @click="onCancel">取消</Button>
          </div>
        </Form>
      </div>
      <!--end 第一步 选择社区和折扣类型-->

      <!--start 第二步 设置不同角色的折扣权限-->
      <div class="select-discount" v-show="currentStep==1">
        <AddDiscount
          :addFlag="setp2AddFlag"
          :nextFlat="setp2NextFlag"
          :communityId="formScheme.communityId"
          :schemeType="formScheme.schemeType"
        />
        <div class="step-btn-container">
          <Button class="step-btn" type="primary" @click="previous">上一步</Button>
          <Button class="step-btn" type="primary" v-if="!isGoodsScheme" @click="onAddSetpTwo">添加</Button>
          <Button class="step-btn" type="primary" v-if="isGoodsScheme" @click="next">下一步</Button>
        </div>
      </div>
      <!--end 第二步 设置不同角色的折扣权限-->

      <!--start 第三步 选择折扣适用的商品(工位)-->
      <div class="select-goods" v-if="currentStep==2">
        <div class="step-btn-container">
          <Button class="step-btn" type="primary" @click="previous">上一步</Button>
          <Button class="step-btn" type="primary" @click="setp3AddFlag=(new Date()).getTime()">添加</Button>
        </div>
        <SelectGoods :communityId="formScheme.communityId" :addFlag="setp3AddFlag"/>
      </div>
      <!--end 第三步 选择折扣适用的商品(工位)-->
    </div>
  </div>
</template>

<script>
//client/store/discountSetting/index.js
import { mapGetters } from "vuex";
import dateUtils from "vue-dateutils";
import SelectCommunities from "./SelectCommunities.vue";
import AddDiscount from "./addDiscount.vue";
import SelectGoods from "./selectGoods.vue";

export default {
  components: {
    SelectCommunities,
    AddDiscount,
    SelectGoods
  },
  data() {
    return {
      setp2AddFlag: 0,
      setp2NextFlag: 0,
      setp3AddFlag: 0,
      isGoodsScheme: false,//折扣方案是否是按商品
      goodsIds: "",
      steps: [
        {
          title: "选择折扣方案"
        },
        {
          title: "添加折扣"
        }
      ],
      discountSchemeList: [
        {
          value: "COMMUNITY",
          desc: "按社区"
        },
        {
          value: "GOODS",
          desc: "按商品"
        }
      ],
      formScheme: {
        communityId: "",
        schemeType: ""
      },
      ruleCustom: {
        communityId: [
          { required: true, message: "请选择适用社区", trigger: "change" }
        ],
        schemeType: [
          { required: true, message: "请选择折扣方案", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["currentStep"])
  },
  watch: {
    //由折扣方案切换步骤
    isGoodsScheme(val) {
      if (val) {
        this.steps.push({
          title: "选择商品"
        });
      } else {
        this.steps.pop();
      }
    }
  },
  methods: {
    onSchemeChange(val) {
      this.isGoodsScheme = val === "GOODS";
    },
    onCancel() {
      this.$store.commit("changeModalState", false);
    },
    onAddSetpTwo() {
      this.setp2AddFlag = new Date().getTime();
    },

    //切换上一步流程
    previous() {
      if (this.currentStep == 0) {
        this.$store.commit("changeStep", 0);
      } else {
        this.$store.commit("changeStep", this.currentStep - 1);
      }
    },

    //切换下一步流程
    next() {
      if (this.currentStep === 0) {
        let valid = false;
        if (!this.formScheme.communityId) {
          this.$refs.formContent.validateField("communityId");
          valid = true;
        }
        if (!this.formScheme.schemeType) {
          this.$refs.formContent.validateField("schemeType");
          valid = true;
        }
        if (valid) {
          return;
        } else {
          this.$store.commit("changeDiscountSetting", this.formScheme);
          this.$store.commit("changeStep", this.currentStep + 1);
          return;
        }
      }
      if (this.currentStep === 1) {
        this.setp2NextFlag = new Date().getTime();
      }
    }
  }
};
</script>

<style lang="less">
.create-discount-panel {
  .step-container {
    padding-left: 25%;
    margin-bottom: 20px;
  }
  .from-container {
    .discount-set-from {
      position: relative;
      left: -25px;
      .form-item-discount {
        .ivu-form-item-content {
          padding-top: 20px;
          .form-item-discount-input {
            // position: relative;
            // left: -70px;
            width: 326px;
            .row-discount {
              margin: 15px 0;
              .col-discount-col1 {
                display: inline-block;
                width: 100px;
              }
              .col-discount-col2 {
                display: inline-block;
                div {
                  span {
                    margin-left: 5px;
                    margin-right: 5px;
                  }
                  div {
                    display: inline-block;
                    width: 168px;
                  }
                }
              }
            }
          }
          .form-item-discount-select {
            .ivu-checkbox {
              margin-right: 10px;
            }
            .form-item-discount-select-item {
              display: block;
            }
          }
        }
      }
      .form-item-remark {
        .ivu-form-item-label {
          text-align: right;
          padding: 10px 12px 10px 29px;
        }
      }
      .form-item-btn {
        .btn {
          margin: 0 45px;
        }
      }
    }
    .select-discount-scheme,
    .select-discount {
      width: 500px;
      margin: 0 auto;
    }
    .select-goods {
      padding: 10px 50px;
    }
    .select-discount-scheme {
      height: 510px;
    }
    .step-btn-container {
      text-align: center;
      .step-btn {
        margin: 0 50px;
      }
    }
  }
}
</style>
