<template>
  <div class="form-item-discount-input">
    <Row class="row-discount" v-for="role in roleList" :key="role.id">
      <Col class="col-discount-col1">{{role.name}}</Col>
      <Col class="col-discount-col2">
        <div>
          <span>最低</span>
          <Input
            class="input"
            v-model="discount[role.level]"
            @on-keyup="handleInputKeyUp"
            @on-blur="handleInputBlur"
          >
            <span>折</span>
          </Input>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    roleList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      discount: {},
    }
  },
  methods: {
    handleInputKeyUp(val) {
      let value = val.currentTarget.value.replace(/[^\d.]/g, '');
      let dotIndex = value.indexOf('.');
      if (dotIndex != -1 && value.length == dotIndex + 3) {
        value = value.substring(0, dotIndex + 2)
      }
      val.currentTarget.value = value
    },
    handleInputBlur() {
      let obj = Object.assign({}, this.discount)
      let keys = Object.keys(obj);
      keys.map(key => {
        if (obj[key] == false) {
          delete obj[key];
        }
        else {
          obj[key] = Number(obj[key].toString().match(/^\d+(?:\.\d)?/))
        }
      })
      this.discount = Object.assign({}, obj)
      this.$emit('input', this.discount)
    }
  }
}
</script>
<style lang="less">
</style>

