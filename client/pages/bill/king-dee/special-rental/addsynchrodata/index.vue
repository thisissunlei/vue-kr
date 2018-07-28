<template>
  <div class='data-sync'> 
    <div style="padding:5px"></div>
    <SectionTitle title="新增特殊出租方配置"></SectionTitle>
    
    <div  style="margin:20px;padding:10px 0;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

        <FormItem label="客户名称"  prop="customerId"  class="data_width">
        <Select v-model="formValidate.customerId" filterable>
                <Option v-for="item in customerOptions" :value="''+item.id" :key="item.id">{{ item.company }}</Option>
            </Select>
        </FormItem>

         <FormItem label="社区名称"  prop="communityId" class="data_width">
          <Select v-model="formValidate.communityId" filterable>
                <Option v-for="item in options1" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>

        <FormItem label="出租方名称" prop="corporationId" class="data_width">
            <Select v-model="formValidate.corporationId" filterable>
                <Option v-for="item in options2" :value="''+item.id" :key="item.id">{{ item.corporationName }}</Option>
            </Select>
        </FormItem>


        <FormItem label="备注" prop="remark" class="data_width" > 
            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="备注"></Input>
        </FormItem>
        <FormItem>
            <Button type="ghost" @click="getBack" >取消</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">完成</Button>
        </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
export default {
  created () {
    this.getCusomerList()
    this.getCusomerList2()
    this.getCusomer()
  },
  components: {
      SectionTitle
  },
  data () {
    return {

      ruleValidate: {
        customerId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cmtIds: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        hostId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入', trigger: 'change' }
        ]

      },
      customerOptions: [],
      options1: [],
      options2: [],
      formValidate: {
        customerId: null,
        communityId: null,
        corporationId: null,
        remark: ''
      }

    }
  },
  methods: {
    getCusomerList (name) {
      let params = {
        company: name || ''
      }
      let list = [];
      let _this = this;
      this.$http.get('get-customer', params, r => {
        list = r.data.customerList;



        this.customerOptions = list;
      }, e => {
        this.$Notice.error({
          title: e.message
        });
      })


    },
    getCusomerList2 (name) {
      let params = {
        communityName: name
      }
      let list = [];
      let _this = this;

      this.$http.get('join-bill-community', '').then((response) => {
        list = response.data.items;

        this.options1 = list;
      }).catch((error) => {
        this.$Notice.error({
          title: error.message
        });
      })
    },

    getCusomer (name) {
      let params = {
        communityName: name
      }
      let list = [];


      this.$http.get('krspace-op-web-fna-corporation', '').then((response) => {
        list = response.data;
        this.options2 = list;
      }).catch((error) => {
        this.$Notice.error({
          title: error.message
        });
      })
    },

    onCustomerChange (value) {
      if (value) {
        this.formItem.customerId = value;
      } else {
        this.formItem.customerId = '';
      }
    },
    onCommunityChange (value) {
      if (value) {
        this.formItem.communityId = value;
      } else {
        this.formItem.communityId = '';
      }
    },
    communityConfigAdd () {


      this.$http.post('communityConfigAdd', this.formValidate).then((res) => {

          this.$Message.success('操作成功');
          this.$router.push({ path: '/bill/king-dee/special-rental/synchrodata' })
      }).catch((e)=>{
        this.$Message.error(e.message);
      })
    },
    getBack () {
      this.$router.push({ path: '/bill/synchrodata' })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.communityConfigAdd()

        } else {
          this.$Message.error('操作失败');
        }
      })
    },

  }

}
</script>

<style lang="less" scoped>
.data-sync{
  .data_width{
  width: 500px;
}
.ivu-form{
width: 50%;
margin: 0 auto;
}
.add-title {
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  padding-left: 10px;
  margin: 5px 20px;

  border-left: 5px solid rgb(119, 173, 232);
}
}
</style>
