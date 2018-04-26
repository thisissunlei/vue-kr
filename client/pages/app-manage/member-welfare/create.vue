<template>
  <div class="g-welfare-create">
      <SectionTitle title="会员福利-新建福利" />
      <div class="u-form">
            <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100" >
              <DetailStyle info="福利展示信息">
                    <FormItem label="福利类型" style="width:700px" prop="couponType">
                            <RadioGroup 
                                v-model="formItem.couponType" 
                            >
                                <Radio 
                                    label="OFFLINESTORE" 
                                    style="margin-right:120px;"
                                >
                                    线下门店
                                </Radio>
                                <Radio 
                                    label="USERLIFE" 
                                    style="margin-right:120px;"
                                >
                                    会员生活
                                </Radio>
                                <Radio label="ENTERPRISESERVICE">
                                    企业服务
                                </Radio>
                            </RadioGroup> 
                      </FormItem>
                      <FormItem label="福利标题"  style="width:300px" prop="title">
                          <Input 
                              v-model="formItem.title" 
                              placeholder="15个字符以内"
                              :maxlength="titleLength"
                          />
                      </FormItem>
                      <FormItem label="福利描述"  style="width:516px" prop="title">
                          <Input 
                              v-model="formItem.title" 
                              placeholder="20个字符以内,建议填写门店详细地址"
                              :maxlength="titleLength"
                          />
                      </FormItem>
                       <FormItem label="福利面值"  style="width:294px" prop="title">
                          <Input 
                              v-model="formItem.title" 
                              placeholder="10个字符以内,如“9折”"
                              :maxlength="titleLength"
                          />
                      </FormItem>
                       <FormItem label="福利封面" style="width:516px" >
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
                                :format="['jpg','gif','png']"
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
                        <div class="u-upload-tip">
                            图片小于300KB，格式为JPG，PNG，GIF；配图比例建议为正方形，不符合此比例系统会自动居中裁剪显示。（上传图片后，即为APP中用户可见效果）
                        </div>
                        <div class="u-upload-logo" v-if="formItem.couponType=='OFFLINESTORE'">
                                <IconTip style="left:85px;top:9px;">用于到店凭证展示给店主</IconTip>
                                <FormItem label="商户LOGO" style="width:516px" >
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
                                        :format="['jpg','gif','png']"
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
                                <div class="u-upload-tip">
                                    图片小于300KB，格式为JPG，PNG，GIF；配图比例建议为正方形，不符合此比例系统会自动居中裁剪显示。（上传图片后，即为APP中用户可见效果）
                                </div>
                        </div>
                         <FormItem 
                                label="商户详细地址"  
                                style="width:294px" 
                                v-if="formItem.couponType=='OFFLINESTORE'"
                         >
                                <Input 
                                    v-model="formItem.title" 
                                    placeholder="30个字符以内"
                                    :maxlength="titleLength"
                                />
                      </FormItem>
                </DetailStyle>
                <DetailStyle info="福利领取信息">
                    <FormItem label="福利范围" style="width:400px" prop="jumpType">
                            <RadioGroup 
                                v-model="formItem.targetType" 
                            >
                                <Radio 
                                    label="0" 
                                    style="margin-right:120px;"
                                >
                                    不限
                                </Radio>
                                <Radio label="1">
                                    部分城市
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
                                      placeholder="请选择"
                                      clearable
                                      @on-change="communityChange"
                                      >
                                      <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
                                  </Select>
                              </FormItem>
                          </div>
                      </div>
                       <FormItem label="领取有效期"  class="u-date" prop="jumpType">
                                <DatePicker
                                    type="date"
                                    v-model="formItem.startTime"
                                    placeholder="请选择开始日期"
                                    style="width: 150px;margin-right:4px;"
                                    @on-change="startChange"
                            ></DatePicker>
                                <TimePicker 
                                    format="HH:mm" 
                                    placeholder="请选择" 
                                    style="width: 96px" 
                                    v-model="formItem.startHour"
                                    @on-change="startHourChange"
                                    @on-clear="startHourClear"
                                />
                                <span class="u-date-txt">至</span>
                            <DatePicker
                                    type="date"
                                    v-model="formItem.endTime"
                                    placeholder="请选择截止日期"
                                    style="width: 150px;margin-right:4px;"
                                    @on-change="endChange"
                            ></DatePicker>
                            <TimePicker 
                                    format="HH:mm" 
                                    placeholder="请选择" 
                                    style="width: 96px" 
                                    v-model="formItem.endHour"
                                    @on-change="endHourChange"
                                    @on-clear="endHourClear"
                                />
                      </FormItem>
                      <FormItem 
                                label="领取链接"  
                                style="width:294px" 
                                v-if="formItem.couponType!='OFFLINESTORE'"
                                prop="jumpType"
                         >
                                <Input 
                                    v-model="formItem.title" 
                                    placeholder="请输入URL"
                                />
                      </FormItem>
                </DetailStyle>
                
                <FormItem  style="margin:0 24px; height:60px;">
                    <div class="u-btn-content">
                        <Button  style="margin-right:20px;" type="primary" @click="handleSubmit('formItems')" >确定</Button>
                        <Button type="ghost" @click="cancelSubmit()" >取消</Button>
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
              couponType:'OFFLINESTORE'
          },
           ruleCustom:{
            couponType:[
                { required: true, message: '请选择福利类型', trigger:'change' }
            ],
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
   
  },
  methods:{

  }

}
</script>
<style lang="less">
.g-welfare-create{
  .u-form{
        width:100%;
        margin-top:30px;
        padding-bottom:45px;
        //position: relative;
        form{
            width:100%;
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
  .u-upload-tip{
        width:516px;
        height:40px;
        line-height:18px;
        font-size:13px;
        color:#999999;
        margin:-25px 0 10px 15px;
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
    .u-community-content{
        width:284px;
        height:114px;
        margin-top: -10px;
         .u-community-select{
              width:284px;
              height:100px;
              padding-top:20px;
              padding-left:10px;
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
                  left:200px;
              }
        }
        
    }

    .u-upload-logo{
        position: relative;
    }

   
    .u-date{
        width:700px; 
        .u-date-txt{
            font-size: 14px;
            color: #666666;
            display: inline-block;
            width:30px;
            text-align: center
        }
        
    }

  
}
</style>



