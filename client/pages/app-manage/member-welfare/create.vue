<template>
  <div class="g-welfare-create">
      <SectionTitle title="会员福利-新建福利" />
      <div class="u-form">
            <Form ref="formItem" :model="formItem" :rules="ruleCustom" :label-width="100" >
              <DetailStyle info="福利展示信息">
                    <FormItem label="福利类型" style="width:700px" prop="couponType">
                            <RadioGroup 
                                v-model="formItem.couponType" 
                                @on-change="typeChange"
                            >
                            <!--  -->
                                <!-- <Radio 
                                    label="OFFLINESTORE" 
                                    style="margin-right:120px;"
                                >
                                    线下门店
                                </Radio> -->
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
                              placeholder="20个字符以内"
                              :maxlength="titleLength"
                          />
                      </FormItem>
                      <FormItem label="福利描述"  style="width:516px" prop="descr">
                          <Input 
                              v-model="formItem.descr" 
                              placeholder="20个字符以内,建议补充描述该福利内容"
                              :maxlength="descrLength"
                          />
                      </FormItem>
                       <FormItem label="福利面值"  style="width:294px" prop="faceValue">
                          <Input 
                              v-model="formItem.faceValue" 
                              :placeholder="formItem.couponType=='ENTERPRISESERVICE'?'10个字符以内,如“9折”':'10个字符以内,如“1000元礼券”'"
                              :maxlength="faceValueLength"
                          />
                      </FormItem>
                       <FormItem label="福利封面" style="width:516px" prop="couponCover">
                             <UploadFile 
                                ref="couponCover"
                                :category="category"
                                withCredentials
                                :format="['jpg','png','gif']"
                                :maxLen="1"
                                :onSuccess="coverSuccess"
                                :onRemove="coverRemove"
                                :onFormatError="imgSizeFormat"
                                :imgWidth="148"
                                :imgHeight="148"
                            >
                                <div slot="tip" class="u-unload-tip">  图片小于300KB，格式为JPG，PNG，GIF；配图比例建议为正方形，不符合此比例系统会自动居中裁剪显示。（上传图片后，即为APP中用户可见效果）</div>
                            </UploadFile>
                        </FormItem>
                        <div class="u-welfare-tag">
                             <IconTip style="left:95px;top:9px;">上限选择三个</IconTip>
                             <FormItem label="福利标签" style="width:1000px" >
                                 <div class="u-tag-content" style="width:1200px" >
                                     <div 
                                        v-for="(item,index) in tagList"
                                        :key="index"
                                        @click="checkTag(item,index)"
                                        :class="item.check?'u-no-tag u-check-tag':'u-no-tag'" 
                                      > 
                                        {{item.name}}
                                     </div>
                                 </div>
                             </FormItem>
                        </div>
                </DetailStyle>
                 <div style="padding-left:23px;box-sizing:border-box;">
                     <FormItem label="内部会员提供" style="width:352px;margin-top:10px;" prop="fromInner">
                        <RadioGroup v-model="formItem.fromInner">
                            <Radio label="1">
                                是
                            </Radio>
                            <Radio label="0">
                                否
                            </Radio>
                        </RadioGroup> 
                    </FormItem>
                 </div>

                <DetailStyle info="详细信息">
                      <FormItem label="商户名称"  style="width:300px" prop="merchantName" >
                          <Input 
                              v-model="formItem.merchantName" 
                              placeholder="20个字符以内"
                              :maxlength="20"
                          />
                      </FormItem> 
                      <FormItem label="详细地址"  style="width:300px" prop="merchantAddress" >
                          <Input 
                              v-model="formItem.merchantAddress" 
                              placeholder="30个字符以内,建议填写门店详细地址"
                              :maxlength="addressLength"
                          />
                      </FormItem> 
                      <div class="u-upload-logo">
                            <IconTip style="left:80px;top:10px;">用以APP地图导航</IconTip>
                            <FormItem label="地图坐标"  style="width:300px;position:relative;"  prop="local">
                            <Input 
                                v-model="formItem.local"
                            />
                            <a class='mapLocation' href="http:\\api.map.baidu.com/lbsapi/getpoint/index.html" target='_blank'/>
                            </FormItem>
                      </div>
                      
                       <FormItem label="联系电话"  style="width:300px"  prop="merchantPhone" >
                          <Input 
                              v-model="formItem.merchantPhone" 
                              placeholder="请填写商户联系电话"
                              @on-change="checkPhone(formItem.merchantPhone)"
                          />
                          <div v-if="isPhoneError" class="u-error">联系电话只能是数字</div>
                      </FormItem> 
                       <FormItem :label="formItem.couponType=='USERLIFE'?'使用提示':'享受规则'"  style="width:500px;"   prop="useRule">
                          <Input 
                              v-model="formItem.useRule"
                              type="textarea" 
                              placeholder="1000个字符以内，请详细描述该福利的使用规则、营业时间等信息"
                              :maxlength="1000"
                              class="u-textarea"
                          />
                      </FormItem> 
                       <FormItem label="福利简介"  style="width:700px;"  prop="couponDetail">
                             <UEditor :styleObj='UEStyleObj' v-model="formItem.couponDetail" ></UEditor>
                       </FormItem>
                       <div class="u-upload-logo"> 
                              <IconTip style="left:95px;top:9px;">支持多张</IconTip>
                                <FormItem label="福利图册" style="width:916px"  prop="couponImgs">
                                        <UploadFile 
                                            ref="welfare"
                                            :category="category"
                                            withCredentials
                                            :format="['jpg','png','gif']"
                                            :maxLen="20"
                                            :onSuccess="welfareSuccess"
                                            :onRemove="welfareRemove"
                                            :onFormatError="imgSizeFormat"
                                            :imgWidth="200"
                                            :imgHeight="100"
                                           
                                        >
                                            <div slot="tip" class="u-unload-tip"> 图片小于300KB，格式为JPG，PNG，GIF；配图宽高比建议为2:1，不符合此比例系统会自动居中裁剪显示。（上传图片后，即为APP中用户可见效果）</div>
                                        </UploadFile>
                                </FormItem>
                       </div>
                </DetailStyle>

                <DetailStyle info="福利领取信息">
                    <FormItem label="福利范围" style="width:400px" class="ivu-form-item-required"   prop="couponScope">
                            <RadioGroup 
                                v-model="formItem.couponScope" 
                            >
                                <Radio 
                                    label="1" 
                                    style="margin-right:120px;"
                                >
                                    不限
                                </Radio>
                                <Radio label="0">
                                    部分城市(可多选)
                                </Radio>
                            </RadioGroup> 
                      </FormItem>
                      <div class="u-community-content" v-if="formItem.couponScope=='0'">
                          <div class="u-community-select">
                              <div class="u-small-trigon"></div>
                              <FormItem label="选择城市"  style="width:250px;"  prop="id" >
                                  <Select
                                      v-model="id"
                                      filterable
                                      :remote-method="remoteCityMethod"
                                      :loading="cityLoading"
                                      placeholder="请选择"
                                      clearable
                                      label-in-value
                                      @on-change="cityChange"
                                      >
                                      <Option v-for="(option, index) in cityList" :value="option.value" :key="index">{{option.label}}</Option>
                                  </Select>
                              </FormItem>
                              <div class="u-tag-content">
                                     <div 
                                        class="u-tag" 
                                        v-for="(item,index) in checkCity"
                                        :key="index"
                                      >
                                         <span class="u-tag-close" @click="deleteCity(index)"></span>
                                         {{item.label}}
                                     </div>
                                 </div>
                          </div>
                      </div>
                       <FormItem label="领取有效期"  class="u-date ivu-form-item-required" prop="startTime" >
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
                                    v-model="formItem.endtime"
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
                             <div v-if="isTimeError" class="u-error">请选择领取有效期</div>
                      </FormItem>
                      <!-- class="ivu-form-item-required" -->
                       <FormItem label="领取方式" style="width:600px" prop="getWay">
                            <RadioGroup 
                                v-model="formItem.getWay" 
                            >
                                <Radio label="OFFLINE" style="margin-right:20px;" >
                                    到店出示身份
                                </Radio>
                                <Radio label="ONLINE"  style="margin-right:20px;">
                                   在线领取
                                </Radio>
                                <Radio label="DETAIL">
                                   详情中展示
                                </Radio>
                            </RadioGroup> 
                      </FormItem>
                      <div class="u-upload-logo" v-if="formItem.getWay=='OFFLINE'">
                            <IconTip style="left:95px;top:10px;">用于到店凭证展示给店主</IconTip>
                            <FormItem label="商户LOGO" style="width:516px"  prop="merchantLogo">
                                    <UploadFile 
                                        ref="logo"
                                        :category="category"
                                        withCredentials
                                        :format="['jpg','png','gif']"
                                        :maxLen="1"
                                        :onSuccess="logoSuccess"
                                        :onRemove="logoRemove"
                                        :onFormatError="imgSizeFormat"
                                        :imgWidth="148"
                                        :imgHeight="148"
                                       
                                    >
                                        <div slot="tip" class="u-unload-tip"> 图片小于300KB，格式为JPG，PNG，GIF；配图宽高比例建议为1:1，不符合此比例系统会自动居中裁剪显示。（上传图片后，即为APP中用户可见效果）</div>
                                    </UploadFile>
                            </FormItem>
                      </div>
                      <FormItem 
                                label="领取链接"  
                                style="width:294px" 
                                v-if="formItem.getWay=='ONLINE'"
                                prop="getUrl"
                         >
                                <Input 
                                    v-model="formItem.getUrl" 
                                    placeholder="请输入URL"
                                />
                      </FormItem>
                </DetailStyle>
                
                <FormItem  style="margin:0 24px; height:60px;">
                    <div class="u-btn-content">
                        <Button  style="margin-right:20px;" type="primary" @click="handleSubmit('formItem')" >确定</Button>
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
import UploadFile from  '~/components/UploadFile';
import UEditor from '~/components/UEditor.vue';
import utils from '~/plugins/utils';

export default {
  components:{
     SectionTitle,
     DetailStyle,
     IconTip,
     UploadFile,
     UEditor
  },
  head() {
       return {
            title: '新建福利-氪空间后台管理系统'
        }
  },
  data(){
      return{
          category:'app/upgrade',
          formItem:{
              couponType:'USERLIFE',
              title:'',
              descr:'',
              faceValue:'',
              couponScope:'',
              beginTime:'',
              endTime:'',
              merchantAddress:'',
              couponImgs:[],
              getWay:'',
          },
          id:'',
          tag:'',
          titleLength:20,
          descrLength:20,
          faceValueLength:10,
          addressLength:30,
          tagLength:5,
          tagList:[],
          isTimeError:false,
          startDate:'',
          endDates:'',
          startHour:'',
          endHour:'',
          cityLoading:false,
          cityList:[],
          checkCity:[],
          cityIds:[],
          tagIds:[],
          addressLength:30,
          ruleCustom:{
            couponType:[
                { required: true, message: '请选择福利类型', trigger:'change' }
            ],
            title:[
                { required: true, message: '请输入福利标题', trigger:'change' }
            ],
            descr:[
                { required: true, message: '请输入福利描述', trigger: 'change' }
            ],
            faceValue:[
                { required: true, message: '请输入福利面值', trigger:'change' }
            ],
            getUrl:[
                { required: true, message: '请输入领取链接', trigger:'change' }
            ],
            getTime:[
                { required: true, message: '请选择领取有效期', trigger:'change' }
            ],
            couponCover:[
                { required: true, message: '请选择要上传的图片', trigger: 'change' }
            ],
            merchantLogo:[
                { required: true, message: '请选择要上传的图片', trigger: 'change' }
            ],
            fromInner:[
                { required: true, message: '请选择内部会员提供', trigger:'change' }
            ],
            getWay:[
                { required: true, message: '请选择领取方式', trigger:'change' }
            ],
            couponDetail:[
               { required: true, message: '请输入福利简介', trigger:'change' } 
            ],
            couponScope:[
               { required: true, message: '请选择福利范围', trigger:'change' } 
            ],
          },
          UEStyleObj: {
                'width': '100%',
                'height': '300px',
                'clear': 'both'
          },
          isPhoneError:false,

      }
  },
  mounted:function(){
    GLOBALSIDESWITCH("false");
    this.getCityList()
    this.getTagList('USERLIFE');
  },
  methods:{
        checkPhone(value){
            let reg=/^[0-9]*$/;
            if(reg.test(value)){
                this.isPhoneError=false;
            }else{
                this.isPhoneError=true;
            }
        },
        typeChange(form){
            let type=form;
            utils.clearForm(this.formItem);
            this.isTimeError=false;
            this.formItem.couponType=type;
            this.getTagList(type)
            this.$refs.couponCover.clearFiles();
            this.$refs.welfare.clearFiles();
            if(this.$refs.logo){
                 this.$refs.logo.clearFiles();
            }
            this.formItem.couponImgs=[];
            this.checkCity=[];
            this.cityIds=[];
            this.id='';
            this.tagIds=[];
            
        },
        getTagList(type){
            this.$http.get('get-coupon/tag-list', {'couponType':type}).then((res)=>{
                res.data.tags.map((item)=>{
                    item.check=false;
                    return item;
                })
                this.tagList=res.data.tags;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            });
        },
        checkTag(item,index){
            let tagList=[].concat(this.tagList);
            if(item.check){
                let idIndex=this.tagIds.indexOf(item.id)
                this.tagIds.splice(idIndex,1);
            }else{
                if(this.tagIds.length>=3){
                    this.$Notice.error({
                        title:'福利标签最多只能选三个'
                    });
                    return;
                }
                this.tagIds.push(item.id);
            }
            tagList[index].check=!item.check;
            this.tagList=tagList;
        },
        deleteCity(index){
            let checkCity=this.checkCity;
            let cityIds=this.cityIds;
            checkCity.splice(index, 1);
            cityIds.splice(index, 1);
            this.checkCity=checkCity;
            this.cityIds=cityIds;
        },
        startChange(date){
            this.startDate=date;
            this.changeTime();
        },
        endChange(date){
            this.endDates=date;
            this.changeTime();
        },
        startHourChange(date){
            this.startHour=date;
            this.changeTime();
        },
        endHourChange(date){
            this.endHour=date;
            this.changeTime();
        },
        startHourClear(){
            this.startHour='00:00:00';
            this.changeTime();
        },
        endHourClear(){
            this.endHour='00:00:00';
            this.changeTime();
        },
        changeTime(){
            if(this.startDate && this.startHour){
                this.formItem.beginTime=`${this.startDate} ${this.startHour}:00`
            }
            if(this.endDates && this.endHour){
                this.formItem.endTime=`${this.endDates} ${this.endHour}:00`
            }
            if(this.formItem.beginTime && this.formItem.endTime){
                this.isTimeError=false;
            }
           
        },
        coverSuccess(res){
            this.formItem.couponCover=res.data.url;
            this.$refs.formItem.validateField('couponCover') 
           
        },
        logoSuccess(res){
            this.formItem.merchantLogo=res.data.url;
            this.$refs.formItem.validateField('merchantLogo') 
        },
        welfareSuccess(res){
            let imgObj={
                url:res.data.url
            }
            this.formItem.couponImgs.push(imgObj);
            this.$refs.formItem.validateField('couponImgs') 
        },
        
        coverRemove(){
            this.formItem.couponCover="";
        },
        logoRemove(){
            this.formItem.merchantLogo="";
        },
        welfareRemove(form){
            let index=this.formItem.couponImgs.indexOf(form.fieldUrl)
            this.formItem.couponImgs.splice(index,1);
        },
        coverError(error,file){
            this.$Notice.error({
                title:error.message
            });
        },
        logoError(error,file){
            this.$Notice.error({
                title:error.message
            });
        },
        cancelSubmit(){
            window.close();
            window.opener.location.reload();
        },
        handleSubmit(name){
          let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let flag=[];
                let _this = this;
               
               if(!this.formItem.beginTime ){
                   flag.push('no');
                   this.isTimeError=true;
               }
               if(!this.formItem.endTime){
                   flag.push('no');
                   this.isTimeError=true;
               }
              
               if(!this.formItem.couponCover){
                  flag.push('no');
                   this.isCoverError=true;
               }
               if(this.formItem.getWay=='OFFLINE'){
                    if(!this.formItem.merchantLogo){
                          flag.push('no')
                          this.isLogoError=true;
                    }
               }
               if(this.formItem.local){
                    let local=this.formItem.local.split(',');
                    this.formItem.longitude=local[0];
                    this.formItem.latitude=local[1];
               }
              let couponImgs=this.formItem.couponImgs;

               this.formItem.tagIds=this.tagIds.join(',');
               this.formItem.cityIds=this.cityIds.join(',');
               if(this.formItem.couponImgs.length>0){
                   this.formItem.couponImgs=JSON.stringify(couponImgs);
               }
               
                
                this.$refs[name].validate((valid) => {
                    if (valid && flag.indexOf('no')==-1) {
                        _this.submitCreate();
                    } else {
                        _this.$Notice.error({
                            title:message
                        });
                    }
                })
      },
      submitCreate(){
            this.$http.post('create-coupon', this.formItem).then((res)=>{
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
      cityChange(form){
          if(!form.value){
              return;
          }
          let flag;
           if(this.checkCity.length<=0){
               this.checkCity.push(form);
               this.cityIds.push(form.value)
           }else{
               flag=this.checkDup(this.checkCity,form);
               if(!flag){
                   this.checkCity.push(form);
                   this.cityIds.push(form.value)
               }

           }
         
      },
       checkDup(array,obj){
                var value= obj.value;
                for (var i=0;i<array.length;i++){
                    if(obj ){
                        if(array[i]){
                            var value1 = array[i].value;
                            if(value === value1){
                                return true;
                            }
                        }
                    }
                }
            return false;
        },
      
       //社区
      remoteCityMethod(query){
        if (query!== '') {
            this.cityLoading = true;
            setTimeout(() => {
                this.cityLoading = false;
                this.getCommunityList(query)
            }, 200);
        } else {
            this.getCommunityList(' ')

        }
      },
       //社区
      getCityList(name){
            let list = [];
            let _this = this;
            this.$http.get('coupon-city-list', '').then((res)=>{
                list = res.data.cityList;
                list.map((item)=>{
                    let obj =item;
                    obj.label = item.name;
                    obj.value = item.id;
                    return obj;
                });

                _this.cityList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
            return list;
            
      },
    imgSizeFormat(){
            this.$Notice.error({
                title:'图片格式不正确'
            });
    },
  }

}
</script>
<style lang="less">
.g-welfare-create{
  .u-form{
        width:100%;
        margin-top:30px;
        padding-bottom:45px;
        form{
            width:100%;
        }
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
        min-height:114px;
        margin-top: -10px;
        min-width:284px;
        max-width:600px;
    
         .u-community-select{
              min-width:284px;
              min-height:100px;
              max-width:540px;
              display: inline-block;
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
    .u-welfare-tag{
         position: relative;
        .u-add-tag-btn{
            padding-left:10px;
            color:#499DF1;
            font-size: 14px;
            line-height:32px;
        }
        .u-tag-btn{
            padding-left:10px;
            color:#cccccc;
            font-size: 14px;
            line-height:32px;
        }
        .u-tag-tip{
            color:#999999;
            text-indent: 8px;
            margin-bottom:10px;
        }
    }
    .u-tag-content{
        padding-left:10px;
        display: inline-block;
        width:540px;
       .u-tag{
           padding:0 10px;
           height:32px;
           line-height:32px;
           border:1px solid #499DF1;
           border-radius: 4px;
           text-align: center;
           display: inline-block;
           position: relative;
           color:#499DF1;
           margin-right:20px;
           margin-bottom:10px;
           .u-tag-close{
               height:16px;
               width:16px;
               position: absolute;
               background: url('~/assets/images/icon_close.svg') no-repeat center center;
               background-size:100% 100%;
               top:-8px;
               right:-8px;
           }
       } 
    }
    .u-no-tag{
         padding:0 10px;
           height:32px;
           line-height:32px;
           border:1px solid #000;
           border-radius: 4px;
           text-align: center;
           display: inline-block;
           position: relative;
           color:#000;
           margin-right:20px;
           margin-bottom:10px;
    }
    .u-check-tag{
         color:#499DF1;
          border:1px solid #499DF1;
    }
    .mapLocation{
        width:16px;
        height:20px;
        display:inline-block;
        background:url('~/assets/images/location.svg') no-repeat center;
        background-size: 100%;
        position: absolute;
        right: 10px;
        top:8px;
        z-index: 2;
        margin-top:0;
  }
  .u-textarea{
      textarea{
        height:100px;
      }
  }
  .u-unload-tip{
      color:#999999;
      line-height:24px;
  }
  
}
</style>



