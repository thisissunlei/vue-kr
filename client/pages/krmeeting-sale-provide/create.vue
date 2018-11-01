<template>
    <div class="g-create-meeting">
         <SectionTitle title="新建发放"></SectionTitle>
         <Form ref="formItems" :model="formItem" :rules="ruleCustom">
                <div class="m-detail-content">
                    <FormItem label="发放说明" class="u-input"  prop="couponName">
                        <Input 
                            v-model="formItem.couponName" 
                            placeholder="请输入" 
                            style="width:250px"
                            :maxlength="15"
                        />
                     </FormItem>
                    <FormItem label="发放时间" class="u-input" style="width:1000px" prop="expireType">
                            <RadioGroup v-model="formItem.expireType" style="width:1000px">
                                <Radio label="START_END_TIME">
                                    <span>即时</span>
                                </Radio>
                                <Radio label="START_END_TIME">
                                    <span>定时</span>
                                </Radio>
                                <div style="width:550px;display:inline-block;">
                                    <DatePicker
                                        type="date"
                                        v-model="startTime"
                                        placeholder="日期"
                                        style="width: 150px;margin-right:4px;"
                                       
                                    />
                                    <TimePicker 
                                        format="HH:mm" 
                                        placeholder="请选择" 
                                        style="width: 96px" 
                                        v-model="startHour"
                                    />
                                </div>
                            </RadioGroup> 
                    </FormItem>
                    <div v-if="timeError" class="u-error">{{errorTip}}</div>

                    <FormItem label="发放时间" class="u-input" style="width:1000px" prop="expireType">
                            <RadioGroup v-model="formItem.expireType" style="width:1000px">
                                <Radio label="START_END_TIME">
                                    <span>全部用户</span>
                                </Radio>
                                <Radio label="START_END_TIME">
                                    <span>自定义</span>
                                </Radio>
                                <div style="width:550px;">
                                    <Input 
                                        v-model="formItem.instructions" 
                                        placeholder=""
                                        type="textarea"
                                    />
                                </div>
                                <Radio label="VALID_DATE">
                                    上传手机号
                                </Radio>
                                 <div style="width:550px;display:inline-block;">
                                      <Upload
                                        :before-upload="handleUpload"
                                        name="file"
                                        with-credentials
                                        :isPut="true"
                                        action="/api/op/kmcoupon/provide/add">
                                        <Button icon="ios-cloud-upload-outline" v-if="!file">上传文件</Button>
                                    </Upload>
                                   <div v-if="file!=null">{{file.name}}</div>
                                 </div>

                            </RadioGroup> 
                    </FormItem>
                    
                </div>
                  <FormItem  style="padding-left:100px;margin-top:40px;">
                    <Button type="primary" @click="handleSubmit('formItems')" >提交</Button>
                </FormItem> 
          </Form>
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';
import UploadFile from  '~/components/UploadFile';
import dateUtils from 'vue-dateutils';

export default {
    components:{
        SectionTitle,
        DetailStyle,
        UploadFile
    },
    data(){

        return {
            formItem:{
                expireType:'START_END_TIME'
            },
            form:{},
            startTime:'',  
            startHour:'',
            endtime:'',
            endHour:'',
            ruleCustom:{
                couponName:[
                    { required: true, message: '请输入优惠券名称', trigger: 'change' }
                ],
                amount:[
                    {required: true,message: '请选择有效期类型',  trigger: 'change' }
                ],
                ruleType:[
                    {required: true,  message: '请选择优惠券类型', trigger: 'change' }
                ],
                quantity:[
                    {required: true,message: '请选择有效期类型', trigger: 'change' }
                ],

                expireType:[
                    { required: true, message: '请选择有效期类型', trigger: 'change' }
                ],
                gainLimit:[
                    {required: true, message: '请选择有效期类型', trigger: 'change' }
                ],
                usageType:[
                    { required: true, message: '请选择使用范围', trigger: 'change' }
                ],
                
            }, 
            errorTip:'',
            timeError:false,
            amountError:false,
            amountErrorTxt:'',
            file:null
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
    },
    methods:{
        handleUpload(file){
            this.file=file;
            
            return false;
        },
       getCouponDetail(){

          // get-kmcoupon-detail
       },
        handleSubmit(name){
             let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
               
                //let endTime=dateUtils.strFormatToDate('yyyy-MM-dd HH:mm:ss',  this.formItem.expireAt)
                // this.timeError=true;
                //             this.errorTip='请选择起止时间';
                 _this.submitCreate();
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         _this.submitCreate();
                //     } else {
                //         _this.$Notice.error({
                //             title:message
                //         });
                //     }
                // }) 
        },
        
        submitCreate(){
                var data=new FormData();
                for(let item in  this.formItem){
                    data.append(item,this.formItem[item]);
                }
                data.append('file',this.file);
                data.isPut = true;

           this.$http.post('kmcoupon-provide-add', data).then((res)=>{
                this.$Notice.success({
                        title:'新建成功'
                    });
                    // setTimeout(function(){
                    //     window.close();
                    //     window.opener.location.reload();
                    // },1000) 
            }).catch((err)=>{
                this.$Notice.error({
                        title:err.message
                    });
            })
        }, 

       
    }
    
}
</script> 
<style lang="less">
.g-create-meeting{
    .u-community-check-list{
        margin-bottom:24px;
    }
    .m-detail-content{
        width:100%;
        max-width: 1200px;
        box-sizing: border-box;
	    padding:30px 24px;
    }
    .u-error{
        color: #ed3f14;
        font-size: 12px;
        margin-top:-20px;
        margin-bottom:12px;
    }
    .u-input{
        display: inline-block;
        width: 252px;
        max-width: 450px;
        margin-right:120px;
        vertical-align:top;
    }
   
    .u-date-txt{
        font-size: 14px;
        color: #666666;
        display: inline-block;
        width:30px;
        text-align: center;
    }
    
    .u-upload{
        width:100%;
       .ivu-form-item-label{
           width:100%;
           text-align: left;
       } 
    }
    .u-unload-label{
        font-size: 12px;
        line-height:30px;
        color:#495060;
    }
    .u-unload-tip{
        line-height:30px;
        text-indent: 12px;
        color:#495060;
        font-size: 12px;

    }
}

</style>



