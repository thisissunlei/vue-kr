<template>
  <div class="discount-set-from-panel" id="discount-set-from-panel">
    <Form
      :model="formItem"
      :label-width="100"
      style="padding:0 20px"
      :rules="ruleCustom"
      ref="formContent"
      class="discount-set-from"
    >
      <FormItem label="折扣类型" prop="discountType">
        <span>折扣</span>
      </FormItem>
      <FormItem label="优惠期间" class="form-item-discount-peroid" prop="time">
        <DatePicker
          v-model="formItem.time.startDate"
          type="date"
          placeholder="开始日期"
          style="width: 140px"
        />
        <span class="u-date-txt" style="padding:0 15px">至</span>
        <DatePicker
          v-model="formItem.time.endDate"
          type="date"
          placeholder="结束日期"
          style="width: 140px"
        />
      </FormItem>
      <FormItem label="折扣配置" class="form-item-discount" prop="discountList">
        <SelectDiscount :roleList="roleList" v-model="formItem.discountList"></SelectDiscount>
      </FormItem>
      <FormItem label="备注" class="form-item-remark">
        <Input
          v-model="formItem.remark"
          :maxlength="100"
          type="textarea"
          :autosize="{minRows: 3,maxRows:3}"
          style="width:100%;"
          placeholder="备注..."
        >
          <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/100":0+"/100"}}</div>
        </Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import selectCommunities from './SelectCommunities.vue'
import SelectDiscount from '~/components/discountSelect.vue'
import dateUtils from 'vue-dateutils';

export default {
  components: {
    selectCommunities,
    SelectDiscount,
  },
  props: {
    addFlag: {
      type: Number,
      default: 0
    },
    nextFlat: {
      type: Number,
      default: 0
    },
    communityId: {
      type: String,
      default: ''
    },
    schemeType: {
      type: String,
      default: ''
    }
  },
  data() {

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

    const validateDiscountList = (rule, value, callback) => {
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
      roleList: [],
      formItem: {
        discountType: "折扣",
        time: {},
        discountList: {},
      },
      ruleCustom: {
        discountType: [
          { required: true, message: '请选择优惠类型', trigger: 'change' }
        ],
        time: [
          { required: true, validator: validateDate, trigger: 'change' }
        ],
        discountList: [
          { required: true, validator: validateDiscountList, trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    communityId(val) {
      this.formItem.communityId = val
    },
    schemeType(val) {
      this.formItem.schemeType = val
    },
    addFlag() {
      this.handleSubmit(this.formItem)
    },

    nextFlat() {
      this.$refs['formContent'].validate(valid => {
        setTimeout(() => {//校验后 ivu-form-item-error-tip dom生成需要时间
          let pass = true
          if (!valid) {
            let nodelist = document.querySelectorAll('#discount-set-from-panel .ivu-form-item-error')
            Array.prototype.forEach.call(nodelist, function (node) {
              if (pass) {
                if (node.style.display == "none") {
                  pass = true
                }
                else {
                  pass = false
                }
              }
            });
          }
          if (pass) {
            let res = {};
            let obj = this.formItem.discountList
            Object.keys(obj).map(item => {
              let temp = this.roleList.filter(r => {
                return r.level == Number(item)
              })
              if (temp != null && temp.length > 0) {
                res[temp[0].id] = obj[item]
              }
            })
            this.formItem.rightDetail = JSON.stringify(res);
            this.$store.commit('changeDiscountSetting', this.formItem)
            this.$store.commit('changeStep', 2)
          }
          else {
            this.$Notice.error({
              title: '请填写完表单'
            });
          }
        }, 500);

      })
    }
  },
  mounted() {
    this.formItem.discountType = 'DISCOUNT'
    this.getRoleRightList();
  },
  methods: {
    //获取角色列表
    getRoleRightList() {
      this.$http.get('get-discount-rights', '').then((r) => {
        let data = r.data;
        let list = [];
        let keys = Object.keys(data);
        keys.map((key, index) => {
          if (data.hasOwnProperty(key)) {
            let obj = {}
            obj.name = data[key];
            obj.level = index + 1;
            obj.id = key;
            obj.discount = ''
            list.push(obj)
          }
        })
        this.roleList = list
      }).catch((e) => {
        this.$Notice.error({
          title: e.message
        });
      })
    },

    //响应提交事件
    handleSubmit(formItem) {
      console.log('formItem', formItem)
      this.$refs['formContent'].validate((valid) => {
        setTimeout(() => {//校验后 ivu-form-item-error-tip dom生成需要时间
          let pass = true
          if (!valid) {
            let nodelist = document.querySelectorAll('#discount-set-from-panel .ivu-form-item-error')
            Array.prototype.forEach.call(nodelist, function (node) {
              console.log(node.style.display)
              if (pass) {
                if (node.style.display == "none") {
                  pass = true
                }
                else {
                  pass = false
                }
              }
            });
          }
          if (pass) {
            this.doSubmit(formItem);
          }
          else {
            this.$Notice.error({
              title: '请填写完表单'
            });
          }
        }, 300);
      })
    },

    //执行提交
    doSubmit(formItem) {
      let { communityId, schemeType, discountType, time: { startDate, endDate }, remark } = formItem
      let parmas = { communityId, schemeType, discountType, startDate, endDate, remark }
      parmas.startDate = parmas.startDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.startDate)) : ''
      parmas.endDate = parmas.endDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.endDate)) : ''

      let res = {};
      let obj = formItem.discountList
      Object.keys(obj).map(item => {
        let temp = this.roleList.filter(r => {
          return r.level == Number(item)
        })
        if (temp != null && temp.length > 0) {
          res[temp[0].id] = obj[item]
        }
      })
      parmas.rightDetail = JSON.stringify(res);
      this.$http.post('post-add-discount', parmas).then((response) => {
        this.$Message.success('添加成功');
        this.handleCancle(true);
        this.$store.commit('changeModalState', false)

      }).catch((error) => {
        this.$Notice.error({
          title: '添加失败',
          desc: error.message
        });
      })
    },

    handleCancle(reload) {
      this.$emit('closeAddModal', reload)
    }

  }
}
</script>


<style lang="less">
.discount-set-from-panel {
  .discount-set-from {
    position: relative;
    left: -25px;
    .form-item-discount-peroid {
      display: inline-block;
      // padding-left: 32px;
      .u-date-txt {
        padding: 0 25px;
        font-size: 14px;
        color: #666;
      }
    }
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
}
</style>
