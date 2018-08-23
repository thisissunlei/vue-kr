<template>
    <div class="g-create-meeting">
         <SectionTitle title="新建优惠券信息"></SectionTitle>
         <Form ref="formItems" :model="formItem" :rules="ruleCustom">
                <div class="m-detail-content">
                    <DetailStyle info="基本信息">
                               <FormItem label="优惠券名称" class="u-input"  prop="couponName">
                                    <Input 
                                        v-model="formItem.couponName" 
                                        placeholder="请输入" 
                                        style="width:250px"
                                        :maxlength="15"
                                    />
                                </FormItem>
                                <FormItem label="优惠券面额" class="u-input" prop="amount">
                                    <Input 
                                        v-model="formItem.amount" 
                                        placeholder="请输入" 
                                        style="width:250px"
                                    />
                                 </FormItem>
                                  <FormItem label="优惠券类型" class="u-input" style="width:252px" prop="ruleType">
                                        <RadioGroup v-model="formItem.ruleType" style="width:262px">
                                            <Radio label="2" style="marginRight:15px">
                                                满 <Input 
                                                    v-model="formItem.frAmount"
                                                    style="width:50px"
                                                /> 元可用
                                            </Radio>
                                            <Radio label="1">
                                               无门槛金额
                                            </Radio>
                                        </RadioGroup> 
                                </FormItem>
                                 <FormItem label="发放数量" class="u-input" prop="quantity">
                                   <Input 
                                        v-model="formItem.quantity" 
                                        placeholder="请输入" 
                                        style="width:220px;marginRight:10px"
                                    /> 份
                                </FormItem>
                    </DetailStyle>
                    <DetailStyle info="基本规则">
                        <FormItem label="有效期类型" class="u-input" style="width:250px" prop="expireType">
                            <RadioGroup v-model="formItem.expireType" style="width:250px">
                                <Radio label="START_END_TIME" style="marginBottom:15px">
                                    <span>起止时间</span>
                                    <DatePicker
                                        type="date"
                                        v-model="form.startTime"
                                        placeholder="日期"
                                        style="width: 150px;margin-right:4px;"
                                    />
                                        <TimePicker 
                                            format="HH:mm" 
                                            placeholder="请选择" 
                                            style="width: 96px" 
                                            v-model="form.startHour"
                                        />
                                        <span class="u-date-txt">至</span>
                                    <DatePicker
                                            type="date"
                                            v-model="form.endtime"
                                            placeholder="日期"
                                            style="width: 150px;margin-right:4px;"
                                    />
                                    <TimePicker 
                                            format="HH:mm" 
                                            placeholder="请选择" 
                                            style="width: 96px" 
                                            v-model="form.endHour"
                                        />
                                </Radio>
                                <!-- <Radio label="VALID_DATE">
                                   领取后，当天有效，有效天数<Input 
                                                    v-model="formItem.name" 
                                                    placeholder="请输入" 
                                                    style="width:50px"
                                                />
                                            天
                                </Radio> -->
                            </RadioGroup> 
                        </FormItem>
                         <div v-if="timeError" class="u-error">{{errorTip}}</div>
                        <FormItem label="每人限领" style="width:252px" prop="gainLimit">
                            <Input 
                                v-model="formItem.gainLimit" 
                                style="width:50px;marginRight:10px"
                            />
                            次
                        </FormItem>
                        <FormItem label="使用范围" class="u-input" style="width:250px" prop="usage">
                                <RadioGroup v-model="formItem.usage" style="width:250px">
                                    <Radio label="1">
                                       不限
                                    </Radio>
                                    <Radio label="2">
                                        会议室
                                    </Radio>
                                    <Radio label="3">
                                        散座
                                    </Radio>
                                </RadioGroup> 
                        </FormItem>
                        <FormItem label="使用说明" style="width:552px">
                            <Input 
                                v-model="formItem.instructions" 
                                placeholder=""
                                type="textarea"
                                :maxlength="100"
                            />
                        </FormItem>
                      
                        
                    </DetailStyle>
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

export default {
    components:{
        SectionTitle,
        DetailStyle,
        UploadFile
    },
    data(){
        return {
            category:'app/upgrade',
            formItem:{
                expireType:'START_END_TIME'
            },
            form:{
              startTime:'',  
              startHour:'',
              endtime:'',
              endHour:'',
            },
            ruleCustom:{
                couponName:[
                    { required: true, message: '请输入优惠券名称', trigger: 'change' }
                ],
                amount:[
                    { required: true, message: '请输入优惠券面额', trigger: 'change' }
                ],
                ruleType:[
                    { required: true, message: '请选择优惠券类型', trigger: 'change' }
                ],
                quantity:[
                    { required: true, message: '请输入发放数量', trigger: 'change' }
                ],

                expireType:[
                    { required: true, message: '请选择有效期类型', trigger: 'change' }
                ],
                gainLimit:[
                    { required: true, message: '请输入限领次数', trigger: 'change' }
                ],
                usage:[
                    { required: true, message: '请选择使用范围', trigger: 'change' }
                ],
                
            }, 
            errorTip:'请选择起止时间',
            timeError:false,
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
    },
    methods:{
       
        handleSubmit(name){
             let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
               
               if(form.startTime && form.startHour && form.endtime && form.endHour ){
                   this.timeError=false;
               }else{
                    this.timeError=true;
               }
            // startTime  
            // startHour
            // endtime
            // endHour

             
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
            this.$http.post('save-or-edit', this.formItem).then((res)=>{
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
        margin-top:-24px;
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



