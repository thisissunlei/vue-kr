<template>         
    <div class='m-nullify'>
        确定要作废此订单吗？
    <Form ref="formItem" :model="formItem" :rules="rules" :label-width="80">
       
        <FormItem label="作废类型">
            <Select v-model="formItem.select">
                <Option :value="item.value" v-for="(item,index ) in optionList" :key="index">{{item.desc}}</Option>
            </Select>
        </FormItem>
       
        <FormItem label="作废理由">
            <Input v-model="formItem.input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入作废理由"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
        
    </div>       
</template>



<script>
export default {
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
          enmuKey:'com.krspace.erp.api.enums.pm.PmDepartment'
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
        
        if (!this.formItem.input||!this.formItem.select) {
            this.$Message.error('请填写完整作废理由');
        } else {
            let params = {
          id:'',
          invalidType:this.formItem.select,
          remark:this.formItem.input
      };
      console.log(params)
            this.$http
        .post("join-nullify", params)
        .then(response => {
          this.optionList = response.data;
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

<style lang='less'>
.m-nullify {
  padding: 30px;
  font-size: 16px;
  text-align: center;
}
</style>  