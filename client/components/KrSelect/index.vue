<template>
    <div class="ui-select">
        <Select 
            v-model="modelValue" 
            :clearable="clearable"
            :filterable="filterable" 
            @on-change="changeContent" 
            :placeholder="placeholder" 
            :disabled="disabled"
            :multiple="multiple">
            <Option 
                v-for="(option) in modelOptions" 
                :value="option.value" 
                :key="option.value"
            >{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
export default {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: "get-all-select-communitys"
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    filterable: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    options: {
      type: [Array, String],
      default: ""
    },
    keySelect:{
      type:String,
      default:'communityId'

    },
    label:{
      type:String,
      default:'communityName'
    },
    multiple:{
      type:Boolean,
      default:false
    }

  },

  data() {
    return {
      loading: false,
      modelOptions: [],
      labelInValue: true,
    };
  },

  computed: {
    modelValue: {
        get() {
            return ''+this.value
        },
        set(val) {
        }
    }
  },
  mounted() {
    if (!this.options) {
      this.getCusomerList();
    } else {
      this.modelOptions = [].concat(this.options);
    }
  },
  methods: {
    changeContent(value) {
      this.$emit("input", "" + value); // 自定义组件双向绑定的关键 向外发布input事件 事件名为model中 设置的event的属性值 可自定义其他名称
      this.$emit("on-select-change", "" + value); // 向外发布 on-select-change 事件
    },
    getCusomerList() {
      let params = Object.assign({}, this.params);
      let list = [];
      this.$http
        .get(this.url, params)
        .then(response => {
          list = response.data;
          list = list.map(item => {
            let obj = {};
            obj.label = item[this.label];
            obj.value = item[this.keySelect] + "";
            return obj;
          });
          this.loading = false;
          this.modelOptions = [].concat(list);
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    }
  }
};
</script>

<style lang="less">
.ui-select {
  ::-webkit-input-placeholder {
    color: #666;
  }
  ::-moz-placeholder {
    color: #666;
  } /* firefox 19+ */
  :-ms-input-placeholder {
    color: #666;
  } /* ie */
  input:-moz-placeholder {
    color: #666;
  }
}
</style>