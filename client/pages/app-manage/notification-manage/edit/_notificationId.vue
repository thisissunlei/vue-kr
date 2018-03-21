<template>
<div class="g-notification-created">
<SectionTitle title="新建通知" />
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100" >
        <DetailStyle info="通知列表显示内容">
            <FormItem label="通知标题"  style="width:294px" prop="title">
                <Input 
                    v-model="formItem.title" 
                    placeholder="20个字符以内"
                    :maxlength="titleLength"
                />
            </FormItem>
            <FormItem label="通知内容" style="width:516px" prop="content">
                <Input 
                    type="textarea"
                    v-model="formItem.content" 
                    placeholder="200个字符以内"
                    :maxlength="contentLength"
                />
            </FormItem>
            <FormItem label="通知配图" style="width:516px" >
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
                    :format="['jpg','jpeg','png']"
                    with-credentials
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    type="drag"
                    action="/api/krspace-finance-web/app/notification/upload"
                    style="display: inline-block;width:148px;">
                    <div style="width: 148px;height:148px;line-height: 158px;">
                        <Icon type="camera" size="40"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <div class="u-upload-tip">图片小于300KB，格式为JPG，PNG，GIF；配图比例建议为正方形，不符合此比例系统会自动居中裁剪显示。
（上传图片后，即为APP中用户可见效果）</div>
            <FormItem label="通知详情" style="width:400px" prop="jumpType">
                 <RadioGroup 
                    v-model="formItem.jumpType" 
                    
                 >
                    <Radio 
                        label="0" 
                        style="margin-right:120px;"
                    >
                        无详情页
                    </Radio>
                    <Radio label="1">
                        跳转外链
                    </Radio>
                </RadioGroup> 
            </FormItem>
            <div class="u-jump-url"  v-if="formItem.jumpType=='1'">
                <div class="u-small-trigon"></div>
                 <FormItem label="URL"  style="width:250px;" >
                        <Input 
                            v-model="formItem.jumpUrl" 
                            placeholder="请输入URL"
                        />
                </FormItem>
            </div>
        </DetailStyle>
        <DetailStyle info="推送目标用户">
           <LabelText label="" style="width:700px;">
				{{formItem.targetDesc}}
		  </LabelText>
             <div class="u-merber-content" v-if="formItem.targetType=='2'">
                 <div class="u-small-trigon"></div>
                 <LabelText label="所在社区：">
                    {{targetDetail.cmtName}}
                </LabelText>
                 <LabelText label="性别：">
                    {{targetDetail.genderDesc?targetDetail.genderDesc:'-'}}
                </LabelText>
                 <LabelText label="已入驻时长：">
                    {{targetDetail.enterTimeDesc?targetDetail.enterTimeDesc:'-'}}
                </LabelText>
                <LabelText label="当前月份：">
                    {{targetDetail.birthMonthDesc?targetDetail.birthMonthDesc:'-'}}
                </LabelText>
                <LabelText label="企业管理员用户：">
                    {{targetDetail.leaderDesc?targetDetail.leaderDesc:'-'}}
                </LabelText>
            </div>
            
        </DetailStyle>
        <DetailStyle info="其他设置">
            <LabelText label="同步推送：" style="width:700px;">
				{{formItem.push=="0"?'否':'是'}}
			</LabelText>
        </DetailStyle>
        <FormItem  style="margin:0 24px; background:#F5F6FA;height:60px;">
            <div class="u-btn-content">
                <Button style="margin-right:20px;" type="primary" @click="handleSubmit('formItems')" >确定</Button>
                <Button type="ghost" @click="onCanlce()" >取消</Button>
            </div>
        </FormItem>  
     </Form>   
    
</div>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';

export default {
  components:{
     SectionTitle,
     DetailStyle,
     LabelText
  },
  data(){
      return{
          formItem:{
              title:'',
              content:'',
              targetType:'1',
              jumpType:'0',
              cmtId:'',
              gender:'3',
              push:"0",
              birthMonth:'',
              leader:'',
              cmtName:'',
              genderDesc:'',
              timeDesc:''

          },
          titleLength:20,
          contentLength:200,
          targetDetail:{},
          imgUrl:'',
          ruleCustom:{
            title:[
                { required: true, message: '请输入推送标题', trigger:'change' }
            ],
            content:[
                { required: true, message: '请输入推送内容', trigger:'change' }
            ],
            targetType:[
                { required: true, message: '请选择是否启用', trigger: 'change' }
            ],
            jumpType:[
                { required: true, message: '请选择通知详情', trigger:'change' }
            ],
          }
      }
  },

  mounted:function(){
    GLOBALSIDESWITCH("false");
    this.getInfo();
   
  },
  methods:{
   getInfo(){
			var _this=this;
			let {params}=this.$route;
			let from={
				notificationId:params.notificationId
            };
			this.$http.get('get-notification-detail', from).then((res)=>{
                this.imgUrl=res.data.imgUrl;
                this.formItem = res.data;
                if(res.data.jumpType){
                     this.formItem.jumpType=res.data.jumpType.toString();
                }
                this.targetDetail=res.data.targetDetail;
                switch (res.data.gender){
                    case 0:
                    this.formItem.gender="0";
                    break;
                    case 1:
                    this.formItem.gender="1"
                    break;
                    case 2:
                    this.formItem.gender="2";
                    break;
                }
                

                if(res.data.enterTime){
                     this.formItem.enterTime=res.data.enterTime.toString();
                }
                if(res.data.leader){
                    this.leader=res.data.leader==1?true:false;
                }
                if(res.data.birthMonth){
                   this.birthMonth=res.data.birthMonth==1?true:false; 
                }
                if(res.data.cmtId==0){
                   this.formItem.cmtId="-1"; 
                }
               

			}).catch((error)=>{
				this.$Notice.error({
						title:error.message
					});
			});
			
		},
    
     
     
     
      handleSubmit(name){
          let _this = this;
          let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                  
               if(this.formItem.jumpType=='1'){
                    if(!this.formItem.jumpUrl){
                        this.$Notice.error({
                            title:'请输入要跳转链接'
                        });
                        return;
                    }
                     
               }
              
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
            this.$http.post('edit-notification', this.formItem).then((res)=>{
                this.$Notice.success({
                        title:'编辑成功'
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
   
   handleRemove(){
      this.formItem.iconUrl="";
      this.imgUrl="" 
    },
     handleSuccess(res,file){
        if(res.code==1){
            this.formItem.imgUrl=res.data.imgUrl;
            this.imgUrl=res.data.imgUrl
        }
    },
   
    onCanlce(){
        window.close();
        window.opener.location.reload();
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
.g-notification-created{

.u-form{
    margin-top:30px;
    display: flex;
    form{
        width:100%;
    }
    .u-btn-content{
      width:138px;
      margin:0 auto;
   }
    .u-upload-tip{
        width:692px;
        height:40px;
        line-height:18px;
        font-size:13px;
        color:#999999;
        margin:-25px 0 10px 14px;
    }
   

    .u-merber-content{
            width:570px;
            height:132px;
            padding-top:20px;
            padding-left:16px;
            background:#F6F6F6;
            margin-bottom:30px;
            border-radius: 3px;
            margin-left:14px;
            position: relative;
            margin-top:-5px;
            .u-small-trigon{
                width:0;
                height:0;
                border:6px solid transparent;
                border-bottom-color: #F6F6F6;
                position: absolute;
                top:-12px;
                left:30px;
            }
        }
    
    .u-jump-url{
        width:284px;
        height:105px;
        padding-top:20px;
        padding-left:16px;
        background:#F6F6F6;
        margin-bottom:14px;
        border-radius: 3px;
        margin-left:110px;
        margin-top:-12px;
        position: relative;
        .u-small-trigon{
            width:0;
            height:0;
            border:6px solid transparent;
            border-bottom-color: #F6F6F6;
            position: absolute;
            top:-12px;
            left:135px;
        } 
    }

}

.ivu-form-item{
    margin-top:-4px;
}
.ivu-form-item-label{
    float:none;
    margin-left: 13px;
   
}
.ivu-form-item-content{
    margin-left: 13px !important;
    margin-top:10px;
}

.ivu-form-item-required .ivu-form-item-label:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
    margin-left:-13px;
}
.ivu-input-wrapper textarea.ivu-input{
    font-size:12px;
}
 .demo-upload-list{
        display: inline-block;
        width: 148px;
        height: 148px;
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
        font-size: 40px;
        cursor: pointer;
        line-height:148px;
        
    }
  

}
</style>





