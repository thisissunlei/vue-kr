<template>
<div class="g-Icon-created">
<SectionTitle title="新增Icon" />
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100">
         <FormItem label="图标名称：" style="width:352px" prop="iconName">
             <Input 
                v-model="formItem.iconName" 
                placeholder="请输入图标名称"
                :maxlength="maxLength"
            />
        </FormItem>
        <FormItem label="跳转地址：" style="width:352px" prop="destUrl">
             <Input 
                v-model="formItem.destUrl" 
                placeholder="请输入跳转地址"
                :maxlength="maxLength"
            />
        </FormItem>
        <FormItem label="是否启用：" style="width:352px" prop="enable">
            <Select
                v-model="formItem.enable"
                style="width:250px"
                placeholder="请选择"
            >
                <Option
                    v-for="item in enableType"
                    :value="item.value"
                    :key="item.value"
                >
                    {{ item.label }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="图标类型：" style="width:352px" prop="iconType">
            <Select
                v-model="formItem.iconType"
                style="width:250px"
                placeholder="请选择"
            >
                <Option
                    v-for="item in iconType"
                    :value="item.value"
                    :key="item.value"
                >
                    {{ item.label }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="Icon位置：" style="width:352px" prop="iconLocation">
            <Select
                v-model="formItem.iconLocation"
                style="width:250px"
                placeholder="请选择Icon位置"
            >
                <Option
                    v-for="item in locationList"
                    :value="item.value"
                    :key="item.value"
                >
                    {{ item.label }}
                </Option>
            </Select>
        </FormItem>
         <FormItem label="排序号：" style="width:352px" prop="orderNum">
             <Input 
                v-model="formItem.orderNum" 
                placeholder="请输入排序号"
                :maxlength="maxLength"
            />
        </FormItem>
       
          <FormItem label="Icon：" style="width:352px" prop="iconUrl">
            <Upload
                ref="uploadImg"
                name="iconUrl"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                with-credentials
                :on-success="handleSuccess"
                type="drag"
                action="/api/krspace-finance-web/activity/upload-pic"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
        </FormItem>
        <FormItem label="图标描述：" style="width:552px" prop="iconDesc">
            <Input 
                v-model="formItem.iconDesc" 
                placeholder="留言最多30字"
                type="textarea"
                :maxlength="maxLength"
            />
        </FormItem>
        <FormItem  style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('formItems')" >提交</Button>
        </FormItem>  
     </Form>   
    
</div>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';

export default {
  components:{
     SectionTitle,
  },
  data(){
      return{
          formItem:{
              destUrl:'',
              stewardType:'',
              stewardStatus:''
          },
          
          maxLength:30,
          enableType:[
            {
                label:'启用',
                value:'1'
            },
            {
                label:'不启用',
                value:'0'
            },
          ],
          iconType:[
            {
                label:'原生页面',
                value:'NATIVE'
            }, 
            {
                label:'html页面',
                value:'HTML'
            },
          ],
          locationList:[],
          ruleCustom:{
            mbrId:[
                { required: true, message: '请选择社区', trigger:'change' }
            ],
            stewardType:[
                { required: true, message: '请选择职位', trigger: 'change' }
            ],
            stewardStatus:[
                { required: true, message: '请选择工作状态', trigger: 'change' }
            ],
          }
      }
  },

  mounted:function(){
	GLOBALSIDESWITCH("false");	
  },

  methods:{
      onMemberchange(value){
          this.formItem.mbrId=value;
          this.$http.get('search-mbr', {mbrId:value}).then((res)=>{
               this.memberInfo = res.data;   
          }).catch((err)=>{
               this.$Notice.error({
                    title:err.message
                });
          })
      },

      handleSubmit(name){
          let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
               
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.submitCreate();
                    } else {
                        _this.$Notice.error({
                            title:message
                        });
                    }
                })
      },

      submitCreate(){
        this.$http.post('create-steward', this.formItem).then((res)=>{
            this.$Notice.success({
                    title:'新建成功'
                });
                setTimeout(function(){
                    window.close();
                    window.opener.location.reload();
                },1000) 
        }).catch((err)=>{
             this.$Notice.error({
                    title:err.message
                });
        })
    },

    handleSuccess(res,file){
        console.log('res',res);
        console.log('file',file)
    }





  }
}
</script>

<style lang="less" scoped>
.g-Icon-created{

.u-form{
    margin-top:40px;
    margin-left:40px;
}


}
</style>





