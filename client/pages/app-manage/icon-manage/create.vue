<template>
<div class="g-Icon-created">
<SectionTitle title="新增Icon" />
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100">
         <FormItem label="图标名称：" style="width:352px" prop="iconName">
             <Input 
                v-model="formItem.iconName" 
                placeholder="请输入图标名称"
              
            />
        </FormItem>
        <FormItem label="跳转地址：" style="width:352px" prop="destUrl">
             <Input 
                v-model="formItem.destUrl" 
                placeholder="请输入跳转地址"
               
            />
        </FormItem>
        <FormItem label="是否启用：" style="width:352px" prop="enable">
            <RadioGroup v-model="formItem.enable">
                 <Radio label="1">
                     是
                </Radio>
                 <Radio label="0">
                     否
                </Radio>
            </RadioGroup> 
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
                    :value="item.code"
                    :key="item.code"
                >
                    {{ item.name }}
                </Option>
            </Select>
        </FormItem>
         <FormItem label="排序号：" style="width:352px" prop="orderNum">
             <Input 
                v-model="formItem.orderNum" 
                placeholder="请输入排序号"
               
            />
        </FormItem>
       
          <FormItem label="Icon：" style="width:352px" class="ivu-form-item-required">
            <div class="demo-upload-list" v-if="this.imgUrl">
                <img :src="this.imgUrl">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                </div>
            </div>
            <Upload
                ref="upload"
                name="imgUrl"
                v-if="!this.imgUrl"
                :show-upload-list="false"
                :format="['jpg','jpeg','png','gif']"
                with-credentials
                :on-success="handleSuccess"
                :on-error="handleError"
                type="drag"
                :on-progress="onProgress"
                action="/api/krspace-finance-web/app/icon/upload"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <div v-if="isError" class="u-error">请选择要上传的图片</div>

            <UploadFile 
                :multiple="false"
                :on-progress="onProgress"
            />
        </FormItem>
        <div class></div>
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
import UploadFile from  '~/components/UploadFile';

export default {
  components:{
     SectionTitle,
     UploadFile
  },
  head () {
        return {
            title: "新增Icon"
        }
    },
  data(){
      return{
          formItem:{
              iconName:'',
              destUrl:'',
              enable:'0',
              iconType:'',
              iconLocation:'',
              orderNum:'',
              iconUrl:'',
              iconDesc:''
          },
          isError:false,
          maxLength:30,
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
          imgUrl:'',
          ruleCustom:{
            iconName:[
                { required: true, message: '请输入图标名称', trigger:'change' }
            ],
            destUrl:[
                { required: true, message: '请输入跳转地址', trigger: 'change' }
            ],
            enable:[
                { required: true, message: '请选择是否启用', trigger: 'change' }
            ],
            iconType:[
                { required: true, message: '请选择图标类型', trigger:'change' }
            ],
            iconLocation:[
                { required: true, message: '请选择Icon位置', trigger: 'change' }
            ],
            orderNum:[
                { required: true, message: '请输入排序号', trigger: 'change' }
            ],
            
            iconDesc:[
                { required: true, message: '请输入图片描述', trigger: 'change' }
            ],
          }
      }
  },

  mounted:function(){
    GLOBALSIDESWITCH("false");	
    this.getLocationList();
    
  },

  methods:{
      onProgress(e,file,fileList){
          console.log('file----Progress',e,'00008888>>>>',file,'hdhdhhd----',fileList)
      },
      getLocationList(){
            this.$http.get('get-icon-location', '').then((res)=>{
                  this.locationList=res.data.locations;
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
               if(!this.formItem.iconUrl){
                    this.isError=true;
               }
                this.$refs[name].validate((valid) => {
                    if (valid && this.formItem.iconUrl) {
                        _this.submitCreate();
                    } else {
                        _this.$Notice.error({
                            title:message
                        });
                    }
                })
      },

      submitCreate(){
        this.$http.post('create-icon', this.formItem).then((res)=>{
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
        if(res.code==1){
            this.isError=false;
            this.formItem.iconUrl=res.data.imgUrl;
            this.imgUrl=res.data.imgUrl
        }
    },
    handleRemove(){
      this.formItem.iconUrl="";
      this.imgUrl="" 
    },
    handleError(error,file){
         this.$Notice.error({
                title:error.message
        });
    }

   





  }
}
</script>

<style lang="less" >
.g-Icon-created{

.u-form{
    margin-top:40px;
    margin-left:40px;
}
.u-error{
    color: #ed3f14;
    font-size: 12px;
}
.ivu-form-item-required .ivu-form-item-label:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
}
  .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    

}
</style>





