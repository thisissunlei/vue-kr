<template>
<div class="g-push-created">
<SectionTitle title="新建推送" />
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100" >
        <DetailStyle info="推送显示内容">
            <FormItem label="推送标题"  style="width:294px" >
                <Input 
                    v-model="formItem.title" 
                    placeholder="请输入推送标题"
                    :maxlength="titleLength"
                    @on-blur="titleBlur"
                />
            </FormItem>
            <FormItem label="推送内容" style="width:516px" prop="content">
                <Input 
                    type="textarea"
                    v-model="formItem.content" 
                    placeholder="请输入推送内容"
                    :maxlength="contentLength"
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
                            remote
                            :remote-method="remoteCommunityMethod"
                            :loading="communityLoading"
                            placeholder="请选择"
                            :label-in-value="labelInValue"
                            clearable
                            >
                            <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                </div>
                <div class="u-person-tip" v-if="ifPerson">
                    所选目标用户数：{{personNum}}人
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
                            :label-in-value="labelInValue"
                            clearable
                            >
                            <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                </FormItem>
                <FormItem label="性别"  style="width:250px;" >
                        <Select
                            v-model="formItem.gender"
                            placeholder="请选择"
                            >
                            <Option v-for="(option, index) in genderList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                </FormItem>
                <FormItem label="入驻时长"  style="width:250px;margin-right:200px;" >
                        <Select
                            v-model="formItem.enterTime"
                            placeholder="请选择"
                            >
                            <Option v-for="(option, index) in enterTimeList" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                         <IconTip style="left:60px;top:-55px;">会员在氪空间所有社区的历史时长，用以筛选老用户</IconTip>
                </FormItem>
                
               
                <FormItem style="margin-right:116px;margin-top:-10px;">
                    <CheckboxGroup v-model="formItem.birthMonth">
                        <Checkbox label="当前月份为会员生日月"></Checkbox>
                    </CheckboxGroup>
                 </FormItem>
                 <FormItem  style="margin-top:-10px;">
                    <CheckboxGroup v-model="formItem.leader">
                        <Checkbox label="企业管理员用户"></Checkbox>
                    </CheckboxGroup>
                 </FormItem>
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
                            remote
                            :remote-method="remoteActiveMethod"
                            :loading="activityLoading"
                            @on-change="changeActive"
                            placeholder="请选择"
                            :label-in-value="labelInValue"
                            clearable
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
                            :maxlength="titleLength"
                        />
                </FormItem>
            </div>
        </DetailStyle>
        <FormItem  style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('formItems')" >确定</Button>
            <Button type="primary" @click="cancelSubmit()" >取消</Button>
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
              jumpType:'HOMEPAGE',
              cmtId:'',
              gender:'3'
          },
          titleLength:20,
          contentLength:50,
          personNum:'',
          ifPerson:false,
          communityList:[],
          communityLoading:false,
          activityLoading:false,
          labelInValue:true,
          activityList:[],
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
          }
      }
  },

  mounted:function(){
    GLOBALSIDESWITCH("false");
    this.getCommunityList(' ')
  },
  methods:{
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
    },
    titleBlur(){

    },
  

   
   





  }
}
</script>

<style lang="less" >
.g-push-created{

.u-form{
    margin-top:30px;
    display: flex;
    .u-community-content{
        width:284px;
        height:134px;
        margin-bottom: 30px;
        margin-top: -10px;
        .u-person-tip{
            height:20px;
            font-size:14px;
            color:#999999;
            margin-left:8px;
        }
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
        margin-bottom: 30px;
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
  

}
</style>





