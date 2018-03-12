<template>
<div class="g-notification-created">
<SectionTitle title="新建通知" />
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100" >
        <DetailStyle info="通知列表显示内容">
            <FormItem label="通知标题"  style="width:294px" prop="title">
                <Input 
                    v-model="formItem.title" 
                    placeholder="请输入通知标题"
                    :maxlength="titleLength"
                />
            </FormItem>
            <FormItem label="通知内容" style="width:516px" prop="content">
                <Input 
                    type="textarea"
                    v-model="formItem.content" 
                    placeholder="请输入通知内容"
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
                    type="drag"
                    action="http://optest01.krspace.cn/api/krspace-finance-web/app/notification/upload"
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
            <FormItem label="" style="width:352px;margin-top:-20px;" prop="targetType">
                <RadioGroup 
                    v-model="formItem.targetType"
                    @on-change="targetTypeChange"
                >
                    <Radio label="1">
                        社区人员
                    </Radio>
                    <Radio label="2">
                        自定义会员
                    </Radio>
                </RadioGroup> 
            </FormItem>
            <div class="u-community-content" v-if="formItem.targetType=='1'">
                <div class="u-community-select">
                    <div class="u-small-trigon"></div>
                     <FormItem label="选择社区"  style="width:250px;" >
                        <Select
                            v-model="formItem.cmtId"
                            filterable
                            remote
                            :remote-method="remoteCommunityMethod"
                            :loading="communityLoading"
                            placeholder="请选择"
                            clearable
                            @on-change="communityChange"
                            :label="formItem.cmtName"
                            >
                            <Option v-for="(option, index) in communityList" :value="option.cmtId" :key="index">{{option.cmtName}}</Option>
                        </Select>
                    </FormItem>
                </div>
            </div>
            <div class="u-member-content" v-if="formItem.targetType=='2'">
                <div class="u-small-trigon"></div>
                <FormItem label="选择社区"  style="width:250px;margin-right:30px;" >
                        <Select
                            v-model="formItem.cmtId"
                            filterable
                            remote
                            :remote-method="remoteCommunityMethod"
                            :loading="communityLoading"
                            placeholder="请选择"
                            clearable
                            @on-change="communityChange"
                             :label="formItem.cmtName"
                            >
                            <Option v-for="(option, index) in communityList" :value="option.cmtId" :key="index">{{option.cmtName}}</Option>
                        </Select>
                </FormItem>
                <FormItem label="性别"  style="width:250px;" >
                        <Select
                            v-model="formItem.gender"
                            placeholder="请选择"
                            @on-change="genderChange"
                            >
                            <Option v-for="(option, index) in genderList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                </FormItem>
                <FormItem label="入驻时长"  style="width:250px;margin-right:200px;" >
                        <Select
                            v-model="formItem.enterTime"
                            placeholder="请选择"
                             @on-change="enterTimeChange"
                             clearable
                            >
                            <Option v-for="(option, index) in enterTimeList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                         <IconTip style="left:60px;top:-55px;">会员在氪空间所有社区的历史时长，用以筛选老用户</IconTip>
                </FormItem>
                
               
                <FormItem style="margin-right:116px;margin-top:-10px;">
                    <Checkbox  
                        v-model="birthMonth" 
                        value="1"
                         @on-change="birthMonthChange"
                    >当前月份为会员生日月</Checkbox>
                 </FormItem>
                 <FormItem  style="margin-top:-10px;">
                    <Checkbox 
                        v-model="leader"
                        value="1"
                        @on-change="leaderChange"
                    >企业管理员用户</Checkbox>
                 </FormItem>
            </div>
            <div class="u-person-tip" >
                    所选目标用户数：{{personNum}}人
            </div>
        </DetailStyle>
        <DetailStyle info="其他设置">
            <FormItem label="同步推送" style="width:400px" prop="push">
                 <RadioGroup 
                    v-model="formItem.push" 
                 >
                    <Radio 
                        label="0"
                        style="margin-right:36px;"
                    >
                        否
                    </Radio>
                    <Radio 
                        label="1" 
                        style="margin-right:36px;"
                    >
                        是
                    </Radio>
                </RadioGroup> 
                <IconTip style="left:65px;top:-55px;">
                    <span style="text-indent:14px">设置“同步推送”后，该社区用户会在消息通知创建成功后，手机顶部通知栏收到推送通知。</span>
                    <span  style="text-indent:14px">建议仅重要消息通知勾选此项，避免造成用户骚扰。</span>
                </IconTip>
            </FormItem>
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
import IconTip from '~/components/IconTip';

export default {
  components:{
     SectionTitle,
     DetailStyle,
     IconTip
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
          contentLength:50,
          personNum:0,
          communityList:[],
          communityLoading:false,
          imgUrl:'',
          birthMonth:'',
          leader:'',
          countParams:{
              cmtId:'',
              birthMonth:'',
              enterTime:'',
              gender:'',
              leader:''
          },
          genderList:[
              {
                  label:'不限',
                  value:'3'
              },
              {
                  label:'男',
                  value:'1'
              },
              {
                  label:'女',
                  value:'0'
              }
          ],
          enterTimeList:[
                {
                  label:'一个月以内',
                  value:'1'
                },
                {
                  label:'1-3个月',
                  value:'2'
                }, 
                {
                  label:'3-6个月 ',
                  value:'3'
                },
                {
                  label:'6-12个月',
                  value:'4'
                },
                {
                  label:'一年以上',
                  value:'5'
                },
          ],
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
    this.getCommunityList(' ');
   
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
                if(res.data.targetType){
                    this.formItem.targetType=res.data.targetType.toString();
                }
                if(res.data.push){
                    this.formItem.push=res.data.push.toString();
                }
                if(res.data.cmtId){
                    this.formItem.cmtId=res.data.cmtId.toString();
                }
                this.formItem.cmtName=res.data.cmtName;

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
                 //this.getTargetCount(res.data.targetDetail)  

			}).catch((error)=>{
				this.$Notice.error({
						title:error.message
					});
			});
			
		},
     getTargetCount(form){
            this.$http.get('get-target-count',form).then((res)=>{
                this.personNum=res.data.targetCount;
            }).catch((err)=>{
                this.$Notice.error({
                        title:err.message
                    });
            })
        },
      communityChange(form){
           this.countParams.cmtId=form;
           this.getTargetCount(this.countParams);
      },
      genderChange(form){
         
           this.countParams.gender=form;
           this.getTargetCount(this.countParams);
      },
      enterTimeChange(form){
          this.countParams.enterTime=form;
          this.getTargetCount(this.countParams);
      },
      birthMonthChange(form){
          if(form){
               this.countParams.birthMonth="1";
               this.formItem.birthMonth="1";
          }else{
               this.countParams.birthMonth="";
               this.formItem.birthMonth="";
          }
         this.getTargetCount(this.countParams);
      },
      leaderChange(form){
          if(form){
              this.countParams.leader="1";
              this.formItem.leader="1";
          }else{
               this.countParams.leader="";
              this.formItem.leader="";
          }
         this.getTargetCount(this.countParams);
          
      },
      //社区
      remoteCommunityMethod(query){
        if (query!== '') {
            this.communityLoading = true;
            setTimeout(() => {
                this.communityLoading = false;
                this.getCommunityList(query)
            }, 200);
        } else {
            this.getCommunityList(' ')

        }
      },
       //社区
      getCommunityList(name){
           let params = {
                    cmtName:name
                }
            let list = [];
            let _this = this;
            this.$http.get('get-community-new-list', params).then((res)=>{
                list = res.data.cmts;
                list.map((item)=>{
                    let obj =item;
                    obj.cmtName = item.cmtName;
                    obj.cmtId = item.cmtId;
                    return obj;
                });
                _this.communityList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
            return list;
            
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
                    if (valid && this.formItem.cmtId) {
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
    targetTypeChange(){
        this.formItem.cmtId="";
        this.formItem.gender="3";
        this.formItem.enterTime="";
        this.formItem.birthMonth="";
        this.formItem.leader="";
        this.personNum=0;
        this.countParams={};
           
        
       
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
    .u-community-content{
        width:284px;
        height:114px;
        margin-top: -10px;
        
    }
    .u-person-tip{
        height:20px;
        font-size:14px;
        color:#999999;
        margin-left:8px;
        margin-bottom: 30px;
    }
    .u-community-select{
        width:284px;
        height:100px;
        padding-top:20px;
        padding-left:16px;
        background:#F6F6F6;
        margin-bottom:14px;
        border-radius: 3px;
        margin-left:8px;
        position: relative;
        .u-small-trigon{
            width:0;
            height:0;
            border:6px solid transparent;
            border-bottom-color: #F6F6F6;
            position: absolute;
            top:-12px;
            left:50px;
        }
    }

    .u-member-content{
        width:570px;
        height:234px;
        background:#F6F6F6;
        border-radius: 3px;
        position: relative;
        margin-bottom: 14px;
        margin-top: -10px;
        padding-top:20px;
        padding-left:16px;
        .u-small-trigon{
            width:0;
            height:0;
            border:6px solid transparent;
            border-bottom-color: #F6F6F6;
            position: absolute;
            top:-12px;
            left:140px;
        }
        .ivu-form-item{
            float:left;
        }
        .ivu-checkbox{
            margin-right:5px;
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





