<template>
  <div class="create-discount-panel">
    <div class="step-container">
      <Steps :current="current">
        <Step v-for="(step,index) in steps"
          :key="index"
          :title="step.title" />
      </Steps>
    </div>

    <div class="from-container">
      <Form :model="formItem"
        :label-width="100"
        style="padding:0 20px"
        :rules="ruleCustom"
        ref="formContent"
        class='discount-set-from'>
        <div class="select-discount-scheme"
          v-show="current==0">
          <FormItem label="适用社区"
            prop="communityId">
            <selectCommunities v-model="formItem.communityId"></selectCommunities>
          </FormItem>
          <FormItem label="折扣方案"
            prop="discountScheme">
            <Select v-model="formItem.discountScheme">
              <Option v-for="(option, index) in discountSchemeList"
                :value="option.value"
                :key="option.value">{{option.desc}}</Option>
            </Select>
          </FormItem>

          <div class="step-btn-container">
            <Button class="step-btn"
              @click="onCancel">取消</Button>
            <Button class="step-btn"
              type="primary"
              @click="next">下一步</Button>
          </div>
        </div>

        <div class="select-discount"
          v-show="current==1">
          <AddDiscount />

          <div class="step-btn-container">
            <Button class="step-btn"
              @click="previous">上一步</Button>
            <Button class="step-btn"
              type="primary"
              @click="onAdd">添加</Button>
            <Button class="step-btn"
              type="primary"
              @click="next">下一步</Button>
          </div>
        </div>
      </Form>
      <div class="select-goods"
        v-show="current==2">
        <div class="step-btn-container">
          <Button class="step-btn"
            @click="previous">上一步</Button>
          <Button class="step-btn"
            type="primary"
            @click="onAdd">添加</Button>
        </div>
        <SelectGoods />
      </div>

    </div>

  </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import selectCommunities from './SelectCommunities.vue'
import RentFree from './rentFree.vue'
import SelectDiscount from './discountSelect.vue'
import AddDiscount from './create.vue'
import SelectGoods from './selectGoods.vue'

export default {
  components: {
    selectCommunities,
    SelectDiscount,
    RentFree,
    AddDiscount,
    SelectGoods
  },
  data() {
    const validateCummity = (rule, value, callback) => {
      if (value == null || value.length == 0) {
        callback("请选择社区")
      }
      else
        callback()
    };
    const validateDate = (rule, value, callback) => {
      if (!value.startDate) {
        callback("请输入开始日期")
      } else if (!value.endDate) {
        callback("请输入结束日期")
      } else if (value.startDate > value.endDate) {
        callback('开始日期不能大于结束日期')
      } else {
        callback()
      }
    };
    //target present
    const validatescheme = (rule, value, callback) => {
      if (isNaN(value.target) || isNaN(value.present)) {
        callback("请输入数字")
      } else if (value.target > 36 || value.target < 1) {
        callback('输入有误,有效范围1-36')
      } else if (value.present > 12 || value.present < 1) {
        callback('输入有误,有效范围1-12')
      } else if (value.present > value.target) {
        callback('输入有误，后者不能大于前者')
      } else {
        callback()
      }
    };
    const validateRentFreeList = (rule, value, callback) => {
      if (value.length == 0) {
        callback('至少勾选一个级别')
      } else {
        callback()
      }
    };
    const validateDiscountList = (rule, value, callback) => {
      debugger
      if (Object.keys(value).length == 0) {
        callback('至少输入一个级别')
      } else if (!checkDiscountExtexnd(value)) {
        callback('折扣输入有误，应该大于0小于10')
      } else if (checkDiscount(value)) {
        callback()
      } else {
        callback('上级折扣权限不能低于下级')
      }
    };
    var checkDiscountExtexnd = function (obj) {
      debugger
      let values = Object.values(obj).map(key => Number(key))
      let arr = values.filter(item => item >= 10 || item <= 0)
      if (arr == null || arr.length > 0) {
        return false
      }
      return true
    };
    var checkDiscount = function (obj) {
      let keys = Object.keys(obj).map(key => Number(key))
      let values = Object.values(obj).map(key => Number(key))
      let maxLevel = Math.max.apply(null, keys)
      let minLevel = Math.min.apply(null, keys)
      if (minLevel != 1) {
        return false
      }
      if (maxLevel + 1 - minLevel != keys.length) {
        return false
      } else {
        let i = 0;
        for (i = 0; i < keys.length; i++) {
          if (i != keys.length - 1) {
            if (values[i] > values[i + 1]) {
              return false
            }
          }
        }
      }
      return true;
    };
    return {
      current: 2,
      steps: [
        {
          title: '选择折扣方案',
        },
        {
          title: '添加折扣',
        },
        {
          title: '选择商品',
        }
      ],
      discountSchemeList: [
        {
          value: 'COMMUNITY',
          desc: '按社区',
        },
        {
          value: 'GOODS',
          desc: '按商品',
        },
      ],
      formItem: {
        communityId: '',
        discountScheme: ''
      },
      ruleCustom: {
        communityId: [
          { required: true, validator: validateCummity, trigger: 'change' }
        ],
        discountType: [
          { required: true, message: '请选择优惠类型', trigger: 'blur' }
        ],
        time: [
          { required: true, validator: validateDate, trigger: 'change' }
        ],
        sale: [
          { required: true, message: '请选择优惠类型' }
        ],
        discount: [
          { required: true, message: '请选择优惠类型' }
        ],
        scheme: [
          { required: true, validator: validatescheme, trigger: 'change' }
        ],
        rentFreeList: [
          { required: true, type: 'array', validator: validateRentFreeList, trigger: 'change' }
        ],
        discountList: [
          { required: true, validator: validateDiscountList, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onCancel() {

    },
    onAdd() {

    },
    previous() {
      if (this.current == 0) {
        this.current = 0;
      } else {
        this.current--;
      }
    },
    next() {
      if (this.current == this.steps.length) {
        this.current = 0;
      } else {
        this.current++;
      }
    }
  },
}
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
    .step-btn-container {
      .step-btn {
        margin: 0 50px;
      }
    }
  }
}
</style>
