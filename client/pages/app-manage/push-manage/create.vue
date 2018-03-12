<template>
<div class="g-push-created">
<SectionTitle title="新建推送" />
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100" >
        <DetailStyle info="推送显示内容">
            <FormItem label="推送标题"  style="width:294px" >
                <Input 
                    v-model="formItem.title" 
                    placeholder="20个字符以内"
                    :maxlength="titleLength"
                    @on-blur="titleBlur"
                />
            </FormItem>
            <FormItem label="推送内容" style="width:516px" prop="content">
                <Input 
                    type="textarea"
                    v-model="formItem.content" 
                    placeholder="50个字符以内"
                    :maxlength="contentLength"
                    @on-blur="contentBlur"
                />
            </FormItem>
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
                            :remote-method="remoteCommunityMethod"
                            :loading="communityLoading"
                            placeholder="请选择社区"
                            clearable
                            @on-change="communityChange"
                            >
                            <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
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
                            :remote-method="remoteCommunityMethod"
                            :loading="communityLoading"
                            placeholder="请选择"
                            clearable
                            @on-change="communityChange"
                            >
                            <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
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
        <DetailStyle info="用户点击推送后的后续动作">
            <FormItem label="后续动作" style="width:400px" prop="jumpType">
                 <RadioGroup 
                    v-model="formItem.jumpType" 
                    @on-change="jumpTypeChange"
                 >
                    <Radio 
                        label="HOMEPAGE"
                        style="margin-right:36px;"
                    >
                        启动页APP（至首页）
                    </Radio>
                    <Radio 
                        label="ACTIVITY" 
                        style="margin-right:36px;"
                    >
                        跳转活动
                    </Radio>
                    <Radio label="HTML">
                        跳转外链
                    </Radio>
                </RadioGroup> 
            </FormItem>
            <div class="u-jump-activity"  v-if="formItem.jumpType=='ACTIVITY'">
                <div class="u-small-trigon"></div>
                 <FormItem label="APP内活动"  style="width:250px;" >
                        <Select
                            v-model="formItem.jumpId"
                            filterable
                            :remote-method="remoteActiveMethod"
                            :loading="activityLoading"
                            @on-change="changeActive"
                            placeholder="请选择"
                            clearable
                            remote
                            >
                            <Option v-for="(option, index) in activityList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                </FormItem>
            </div>
            <div class="u-jump-url"  v-if="formItem.jumpType=='HTML'">
                <div class="u-small-trigon"></div>
                 <FormItem label="URL"  style="width:250px;" >
                        <Input 
                            v-model="formItem.jumpUrl" 
                            placeholder="请输入URL"
                        />
                </FormItem>
            </div>
        </DetailStyle>
        <FormItem  style="margin:0 24px; background:#F5F6FA;height:60px;">
             <div class="u-btn-content">
                <Button  style="margin-right:20px;" type="primary" @click="handleSubmit('formItems')" >确定</Button>
                <Button type="ghost" @click="cancelSubmit()" >取消</Button>
            </div>
        </FormItem>  
     </Form>   
    <div class="m-view">
        <span class="u-view-title">预览</span>
        <div class="u-app-view">
            <div class="u-app-content">
                <div class="u-app-title">
                    <span>{{viewInfo.name}}</span>
                    <span class="u-toggle" @click="toggleView">{{viewInfo.txt}}</span>
                </div>
                <div class="u-app-ios" v-if="iosShow">
                    <div class="u-ios-push">
                        <div class="u-ios-logo"></div>
                        <div class="u-ios-logo-title">
                            氪空间
                            <div class="u-ios-time">现在</div>
                        </div>
                        <div class="u-push-title" v-if="title">{{title}}</div>
                        <div class="u-push-content">{{content}}</div>
                    </div>
                </div> 
                <div class="u-app-android"  v-if="!iosShow">
                        <div class="u-android-push">
                            <div class="u-android-logo"></div>
                            <div class="u-push-detail">
                                <div class="u-push-title"  >{{title}}</div>
                                <div class="u-push-content">{{content}}</div>
                            </div>
                             <div class="u-android-time">现在</div>
                        </div>
                </div>  
               
            </div>
        </div>
    </div>
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
              jumpType:'HOMEPAGE',
              cmtId:'',
              gender:'3',
              leader:'',
              birthMonth:'',
          },
          birthMonth:'',
          leader:'',
          title:'',
          content:'',
          titleLength:20,
          contentLength:50,
          personNum:0,
          ifPerson:false,
          communityList:[],
          communityLoading:false,
          activityLoading:false,
          activityList:[],
          iosShow:true,
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
            content:[
                { required: true, message: '请输入推送内容', trigger:'change' }
            ],
            targetType:[
                { required: true, message: '请选择是否启用', trigger: 'change' }
            ],
            jumpType:[
                { required: true, message: '请选择图标类型', trigger:'change' }
            ],
          },
          countParams:{
              cmtId:'',
              birthMonth:'',
              enterTime:'',
              gender:'',
              leader:''
          },
          viewInfo:{
              name:'苹果系统',
              txt:'切换安卓系统'
          }
      }
  },

  mounted:function(){
    GLOBALSIDESWITCH("false");
    this.getCommunityList(' ')
  },
  methods:{
      cancelSubmit(){
        window.close();
        window.opener.location.reload();
      },
      toggleView(){
          this.iosShow=!this.iosShow;
          if(this.iosShow){
             this.viewInfo={
                 name:'苹果系统',
                 txt:'切换安卓系统'
             } 
          }else{
              this.viewInfo={
                 name:'安卓系统',
                 txt:'切换苹果系统'
             } 
          }

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
           this.formItem.jumpId="";
           
           if(!form){
                this.personNum=0;
               return;
           }
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
                    obj.label = item.cmtName;
                    obj.value = item.cmtId;
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
       //活动
      remoteActiveMethod(query){
        if (query!== '') {
            this.communityLoading = true;
            setTimeout(() => {
                this.communityLoading = false;
                this.getActiveList(query)
            }, 200);
        } else {
            this.getActiveList(' ')

        }
      },
       //活动
      getActiveList(name){
          if(!this.formItem.cmtId){
                this.$Notice.error({
                    title:'请先选择接收用户'
                });
              return;
          }
           let params = {
                    activityTitle:name,
                    cmtId:this.formItem.cmtId
                }
            let list = [];
            let _this = this;
            this.$http.get('get-title-list', params).then((res)=>{
                list = res.data.activities;
                list.map((item)=>{
                    let obj =item;
                    obj.label = item.title;
                    obj.value = item.id;
                    return obj;
                });
                _this.activityList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
            return list;
            
      },
      handleSubmit(name){
          let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
               if(this.formItem.jumpType=='ACTIVITY'){
                    if(!this.formItem.jumpId){
                        this.$Notice.error({
                            title:'请输入要跳转的活动'
                        });
                        return;
                    }
                    
               }
               if(this.formItem.jumpType=='HTML'){
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
            this.$http.post('create-app-push', this.formItem).then((res)=>{
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
    changeActive(){

    },
    jumpTypeChange(){
        this.formItem.jumpId="";
        this.formItem.jumpUrl=""
        if(this.formItem.jumpType=='ACTIVITY'){
            this.getActiveList('')
        }
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
    titleBlur(){
        this.title=this.formItem.title;
    },
    contentBlur(){
         this.content=this.formItem.content;
    },
  

   
   





  }
}
</script>

<style lang="less" >
.g-push-created{
   
.u-form{
    width:100%;
    margin-top:30px;
    padding-bottom:45px;
    position: relative;
     form{
        width:100%;
    }
    .u-btn-content{
      width:138px;
      margin: 0 auto;
    }
    .u-community-content{
        width:284px;
        height:134px;
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

    .u-jump-activity{
        width:284px;
        height:105px;
        padding-top:20px;
        padding-left:16px;
        background:#F6F6F6;
        margin-bottom:14px;
        border-radius: 3px;
        margin-left:100px;
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
    .u-jump-url{
        width:284px;
        height:105px;
        padding-top:20px;
        padding-left:16px;
        background:#F6F6F6;
        margin-bottom:14px;
        border-radius: 3px;
        margin-left:210px;
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
.m-view{
    width:600px;
    height:196px;
    margin-left:50px;
    position: absolute;
    right:0;
    top:-10px;
    .u-view-title{
        font-size:14px;
        color:#666666;
        float:left;
        margin-right:16px;
    }
    .u-app-view{
        width:481px;
        height: 216px;
        border:1px dashed #EEEEEE;
        float:left;
        border-radius: 4px;
    }
    .u-app-content{
        width:465px;
        height:200px;
        background:#F6F6F6;
        border-radius: 4px;
        margin:7px;
        padding-top:20px;
        overflow: hidden;

    }
    .u-app-title{
        width:96px;
        height:100px;
        float:right;
        font-size:12px;
        color:#666666;
        line-height:17px;
        margin-top:66px;
        cursor: pointer;
        span{
            width:80px;
            margin-bottom:10px;
            display: inline-block;
        }
        .u-toggle{
            color:#779ED4;
        }
    }
    .u-app-ios{
         width:341px;
         height:188px;
         margin-left:20px;
         margin-right:16px;
         background: url('./images/ios.png') no-repeat center center;
         background-size:100% 100%;
         padding-top:59px;
         .u-ios-push{
             width:279px;
             min-height:74px;
             background:#fff;
             border-radius: 6px;
             box-shadow: 0 1px 1px rgba(0,0,0,.4);
             margin:0 auto ;
             position: relative;
             padding-top:28px;
             .u-ios-logo{
                 width:20px;
                 height:20px;
                 position: absolute;
                 top:3px;
                 left:10px;
                 margin-bottom:3px;
                 margin-right:7px;
                 background: url('./images/logo.svg') no-repeat center center;
                 background-size:100% 100%;
             }
             .u-ios-logo-title{
                 width:85%;
                 font-size:12px;
                 color:#333333;
                 position: absolute;
                 left:40px;
                 top:4px;
             }
             .u-ios-time{
                font-size:12px;
                padding-right:10px;
                float:right;
             }
             .u-push-title{
                 color:#282624;
                 line-height:17px;
                 text-align: left;
                 padding:0 10px;
                
             }
             .u-push-content{
                  padding-left:10px;
                  display: inline-block;
                  padding-bottom:10px;
             }
         }
    }
    .u-app-android{
        width:341px;
        height:188px; 
        margin-left:20px;
        margin-right:16px;
        background: url('./images/android.png') no-repeat center center;
        background-size:100% 100%;
        padding-top:52px;
        .u-android-push{
             width:323px;
             height:70px;
             background:#fff;
             border-radius: 2px;
             box-shadow: 0 1px 1px rgba(0,0,0,.4);
             margin:0 auto;
             display: flex;
             .u-android-time{
                 font-size:12px;
                 color:#666666; 
                 justify-content: flex-end;
                 width:36px;
                 padding-right:6px;
                 padding-top:16px;
             }
             .u-android-logo{
                 width:49px;
                 height:49px;
                 float:left;
                 margin:10px;
                 background: url('./images/logo.svg') no-repeat center center;
                 background-size:100% 100%;
             }
             .u-push-detail{
                 width:230px;
                 height:70px;
                 color:#282624;
                 .u-push-title{
                     font-size:13px;
                     height:30px;
                     padding-top:16px;
                     margin-bottom:4px;
                 }
                 .u-push-content{
                    width:230px;
                    font-size:12px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                 }
                 
             }
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
  

}
</style>





