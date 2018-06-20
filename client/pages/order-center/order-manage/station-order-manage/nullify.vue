<template>
  <div class='m-nullify'>
    <Form ref="formItem" :model="formItem" :rules="rules" :label-width="80">
      <!-- <FormItem label="如真的需要作废请选择作废原因：">
        <Select v-model="formItem.select">
          <Option :value="item.value" v-for="(item,index ) in optionList" :key="index">{{item.desc}}</Option>
        </Select>
      </FormItem>

      <FormItem label="备注：">
        <Input v-model="formItem.input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入作废理由"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formItem')">确认</Button>
        <Button type="ghost" style="margin-left: 8px">取消</Button>
      </FormItem> -->

      <p>如真的需要作废请选择作废原因：</p>
      <Select v-model="formItem.select">
        <Option :value="item.value" v-for="(item,index ) in optionList" :key="index">{{item.desc}}</Option>
      </Select>
      <p>备注：</p>
      <Input class='input' v-model="formItem.input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入作废理由"></Input>
      <Button type="primary" @click="handleSubmit('formItem')">确认</Button>
      <Button type="ghost" style="margin-left: 8px">取消</Button>
      <FormItem>

      </FormItem>

    </Form>

  </div>
</template>



<script>
export default {
  props: ['id'],
  data() {
    return {
      formItem: {
        input: "",
        select: ""
      },
      rules: {
        select: [
          { required: true, message: '请选择作废类型', trigger: 'blur' }
        ],
        input: [
          { required: true, message: '请输入作废理由', trigger: 'blur' },
          { type: 'string', max: 250, message: '长度不能超过250！', trigger: 'blur' }
        ]
      },
      optionList: [
        { value: "beijing", label: "北京" },
        { value: "beijing1", label: "北京1" },
        { value: "beijing2", label: "北京2" }
      ]
    };
  },
  mounted() {
    this.getOptionList();
  },
  methods: {
    getOptionList() {
      let params = {
        enmuKey: 'com.krspace.op.api.enums.seatorder.InvalidType'
        // enmuKey: 'com.krspace.erp.api.enums.pm.PmDepartment'
      };
      this.$http
        .post("get-enum-all-data", params)
        .then(response => {
          this.optionList = response.data;
        })
        .catch(error => {
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },
    handleSubmit(name) {
      // if (!this.formItem.input || !this.formItem.select) {
      //   this.$Message.error('请填写完整作废理由');
      // } else 
      {
        let params = {
          id: this.id,
          invalidType: this.formItem.select,
          remark: this.formItem.input
        };
        console.log(params)
        this.$http
          .post("join-nullify", params)
          .then(response => {
            console.log(response.data)
            this.$emit('refershList', { id: params.id });
          })
          .catch(error => {
            this.openMessage = true;
            this.MessageType = "error";
            this.warn = error.message;
          });
      }

    }
  }
}
</script>

<style lang='less' scoped>
p {
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
}
.input {
    margin-bottom: 20px;
}
.m-nullify {
    padding: 5px 30px 5px 30px;
    font-size: 16px;
    text-align: left;
}
</style>  