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
                <RadioGroup v-model="formItem.targetType">
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
                            :loading="loading"
                            @on-change="changeContent"
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
                            :loading="loading"
                            @on-change="changeContent"
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
            <FormItem label="后续动作" style="width:352px" prop="jumpType">
                 <RadioGroup v-model="formItem.jumpType">
                    <Radio label="HOMEPAGE">
                        启动页APP（至首页）
                    </Radio>
                    <Radio label="ACITVITY">
                        跳转活动
                    </Radio>
                    <Radio label="HTML">
                        跳转外链
                    </Radio>
                </RadioGroup> 
            </FormItem>
        </DetailStyle>
        <FormItem  style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('formItems')" >提交</Button>
        </FormItem>  
     </Form>   
    <div class="m-view">
        <span class="u-view-title">预览</span>
        <div class="u-app-view">
            <div class="u-app-content">
                <div class="u-app-title">
                    <span>苹果系统</span>
                    <span>安卓系统</span>
                </div>
                <div class="u-app-img">
                    <div class="u-app-ios"></div> 
                    <div class="u-app-android"></div>  
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

export default {
  components:{
     SectionTitle,
     DetailStyle
  },
  data(){
      return{
          formItem:{
              title:'',
              content:'',
              targetType:'2',
              jumpType:'HOMEPAGE',
              cmtId:'',
              gender:'3'
          },
          titleLength:20,
          contentLength:50,
          personNum:'',
          ifPerson:false,
          communityList:[],
          loading:false,
          labelInValue:true,
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
      remoteMethod(query){
        if (query!== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.getCommunityList(query)
            }, 200);
        } else {
            this.getCommunityList(' ')

        }
      },
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
                console.log('list===',list)
                _this.communityList = list;
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
}
.m-view{
    width:759px;
    height:196px;
    margin-left:50px;
    float:right;
    justify-content: flex-end;
    .u-view-title{
        font-size:14px;
        color:#666666;
        float:left;
        margin-right:16px;
    }
    .u-app-view{
        width:481px;
        height: 196px;
        border:1px dashed #EEEEEE;
        float:left;
        border-radius: 4px;
    }
    .u-app-content{
        width:465px;
        height:180px;
        background:#F6F6F6;
        border-radius: 4px;
        margin:7px;

    }
    .u-app-title{
        height:49px;
        line-height: 49px;
        color:#999999;
        width:423px;
        margin:0 auto;
        span{
            width:50%;
            display:inline-block;
            text-align: center;
        }
    }
    .u-app-img{
         display: flex;
    }
    .u-app-ios{
         justify-content: flex-start; 
         width:198px;
         height:131px;
         margin-left:28px;
         margin-right:28px;
         background: url('./images/ios.png') no-repeat center center;
         background-size:contain;
    }
    .u-app-android{
        justify-content: flex-end; 
        width:197px;
        height:131px;
        margin-right:21px;
        background: url('./images/android.png') no-repeat center center;
        background-size:contain;
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





