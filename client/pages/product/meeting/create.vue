<template>
    <div class="g-create-meeting">
         <SectionTitle title="新建会议室"></SectionTitle>
         <Form ref="formItem" :model="formItem" :rules="ruleCustom">
                <div class="m-detail-content">
                    <DetailStyle info="会议室基本信息">
                               <FormItem label="会议室名称" class="u-input"  prop="name">
                                    <Input 
                                        v-model="formItem.name" 
                                        placeholder="请输入" 
                                        style="width:250px"
                                    />
                                </FormItem>
                                <FormItem label="所属社区" class="u-input" prop="communityId">
                                    <Select
                                        v-model="formItem.communityId"
                                        style="width:250px"
                                        placeholder="请选择"
                                        filterable
                                        clearable
                                    >
                                        <Option  v-for="item in communityList" :value="item.id"  :key="item.id" >{{ item.name }}</Option>
                                    </Select>
                                 </FormItem>
                                 <FormItem label="所在楼层" class="u-input" prop="floor">
                                    <Select
                                        v-model="formItem.floor"
                                        style="width:250px"
                                        placeholder="请选择"
                                        filterable
                                        clearable
                                    >
                                        <Option  v-for="item in communityList" :value="item.id"  :key="item.id" >{{ item.name }}</Option>
                                    </Select>
                                </FormItem>
                                <!-- <FormItem label="所属空间" class="u-input" prop="spaceId">
                                    <Select
                                        v-model="formItem.spaceId"
                                        style="width:250px"
                                        placeholder="请选择"
                                        filterable
                                        clearable
                                    >
                                        <Option  v-for="item in communityList" :value="item.id"  :key="item.id" >{{ item.name }}</Option>
                                    </Select>
                                </FormItem> -->
                                <FormItem label="面积（㎡）" class="u-input" prop="area">
                                    <Input 
                                        v-model="formItem.area" 
                                        placeholder="请输入" 
                                    />
                                </FormItem>
                                 <FormItem label="可容纳人数" class="u-input" prop="capacity">
                                    <Input
                                        v-model="formItem.capacity" 
                                        placeholder="请输入" 
                                    />
                                </FormItem>
                                <div class="u-upload">
                                        <div class="u-unload-label">封面图片</div>
                                        <UploadFile 
                                            :category="category"
                                            withCredentials
                                            :format="['jpg','png','gif']"
                                            maxSize="300"
                                            
                                        >
                                            <div slot="tip" class="u-unload-tip">图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为4:3；</div>
                                        </UploadFile>
                                </div>
                                <div class="u-upload">
                                        <div class="u-unload-label">会议室图片</div>
                                        <UploadFile 
                                            multiple
                                            :category="category"
                                            withCredentials
                                            :format="['jpg','png','gif']"
                                            maxSize="300"
                                            
                                        >
                                            <div slot="tip" class="u-unload-tip">图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为4:3；</div>
                                        </UploadFile>
                                </div>
                                <FormItem label="会议室被占用设置"  class="u-date">
                                    <DatePicker
                                        type="date"
                                        v-model="formItem.startTime"
                                        placeholder="日期"
                                        style="width: 150px;margin-right:4px;"
                                        @on-change="startChange"
                                    />
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
                                            placeholder="日期"
                                            style="width: 150px;margin-right:4px;"
                                            @on-change="endChange"
                                    />
                                    <TimePicker 
                                            format="HH:mm" 
                                            placeholder="请选择" 
                                            style="width: 96px" 
                                            v-model="formItem.endHour"
                                            @on-change="endHourChange"
                                            @on-clear="endHourClear"
                                        />
                                </FormItem>
                                 <FormItem label="补充描述" style="width:552px">
                                    <Input 
                                        v-model="formItem.descr" 
                                        placeholder=""
                                        type="textarea"
                                    />
                                </FormItem>
                    </DetailStyle>

                    <DetailStyle info="APP商品信息">
                        <FormItem label="上架状态" class="u-input" style="width:250px" prop="appPublish">
                            <RadioGroup v-model="formItem.appPublish" style="width:250px">
                                <Radio label="1">
                                    已上架
                                </Radio>
                                <Radio label="0">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                       <FormItem label="可预订时段" class="u-input"  style="width:350px" prop="appTime">
                           <div style="width:350px;float:left;">
                               <TimePicker 
                                    format="HH:mm" 
                                    placeholder="00:00" 
                                    style="width: 122px" 
                                    v-model="formItem.appStartTime"
                                />
                                <span style="padding:0 10px;">至</span>
                                <TimePicker 
                                    format="HH:mm" 
                                    placeholder="24:00" 
                                    style="width: 122px" 
                                    v-model="formItem.appEndTime"
                                />
                           </div>
                        </FormItem>
                         <FormItem label="忙时单价（￥/0.5h）（11：00-18：00）" class="u-input" prop="appBusyPrice">
                                <Input
                                    v-model="formItem.appBusyPrice" 
                                    placeholder="请输入" 
                                />
                        </FormItem>
                         <FormItem label="闲时单价（￥/0.5h）（其他时段）" class="u-input" prop="appIdlePrice">
                                <Input
                                    v-model="formItem.appIdlePrice" 
                                    placeholder="请输入" 
                                />
                        </FormItem>
                    </DetailStyle>

                    <DetailStyle info="KrMeeting商品信息">
                        <FormItem label="上架状态" class="u-input" style="width:250px" prop="krmPublish">
                            <RadioGroup v-model="formItem.krmPublish" style="width:250px">
                                <Radio label="1">
                                    已上架
                                </Radio>
                                <Radio label="0">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                       <FormItem label="可预订时段" class="u-input"  style="width:350px" prop="krmTime">
                           <div style="width:350px;float:left;">
                               <TimePicker 
                                    format="HH:mm" 
                                    placeholder="00:00" 
                                    style="width: 122px" 
                                    v-model="formItem.krmStartTime"
                                />
                                <span style="padding:0 10px;">至</span>
                                <TimePicker 
                                    format="HH:mm" 
                                    placeholder="24:00" 
                                    style="width: 122px"
                                    v-model="formItem.krmEndTime" 
                                />
                           </div>
                        </FormItem>
                         <FormItem label="单价（￥/0.5h）" class="u-input" prop="kmUnitPrice">
                                <Input
                                    v-model="formItem.kmUnitPrice" 
                                    placeholder="请输入" 
                                />
                        </FormItem>
                         <FormItem label="优惠后单价（￥/0.5h）" class="u-input" prop="kmPromotionUnitPrice">
                                <Input
                                    v-model="formItem.kmPromotionUnitPrice" 
                                    placeholder="请输入" 
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
            category:'',
            formItem:{

            },
            ruleCustom:{
                name:[
                    { required: true, message: '请输入会议室名称', trigger: 'change' }
                ],
                communityId:[
                    { required: true, message: '请选择社区', trigger: 'change' }
                ],
                floor:[
                    { required: true, message: '请选择楼层', trigger: 'change' }
                ],
                // spaceId:[
                //     { required: true, message: '请选择所属空间', trigger: 'change' }
                // ],
                area:[
                    { required: true, message: '请输入会议室面积', trigger: 'change' }
                ],
                capacity:[
                    { required: true, message: '请输入可容纳人数', trigger: 'change' }
                ],
                appPublish:[
                    { required: true, message: '请选择上架状态', trigger: 'change' }
                ],
                appTime:[
                    { required: true, message: '请选择可预订时段', trigger: 'change' }
                ],
                appBusyPrice:[
                    { required: true, message: '请输入忙时单价', trigger: 'change' }
                ],
                appIdlePrice:[
                    { required: true, message: '请输入闲时单价', trigger: 'change' }
                ],
                krmPublish:[
                    { required: true, message: '请选择上架状态', trigger: 'change' }
                ],
                krmTime:[
                    { required: true, message: '请选择可预订时段', trigger: 'change' }
                ],
                kmUnitPrice:[
                    { required: true, message: '请输入单价', trigger: 'change' }
                ],
                kmPromotionUnitPrice:[
                    { required: true, message: '请输入优惠价格', trigger: 'change' }
                ],
                
            },
                
            
            communityList:[]
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
    },
    methods:{
        handleSubmit(){
             let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
            //    if(!this.formItem.iconUrl){
            //         this.isError=true;
            //    }
                // this.$refs[name].validate((valid) => {
                //     if (valid && this.formItem.iconUrl) {
                //         _this.submitCreate();
                //     } else {
                //         _this.$Notice.error({
                //             title:message
                //         });
                //     }
                // }) 
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
<style lang="less">
.g-create-meeting{
    .m-detail-content{
	    padding:30px 24px;
    }
    .u-input{
        display: inline-block;
        width: 252px;
        max-width: 450px;
        margin-right:120px;
        vertical-align:top;
    }
    .u-date{
        width:530px;
        display: inline-block;
        margin-right:120px;
        vertical-align:top;
        label{
            width:100%;
            display: block;
            text-align: left;

        }
        .u-date-txt{
            font-size: 14px;
            color: #666666;
            display: inline-block;
            width:30px;
            text-align: center;
        }
    }
    .u-upload{
        width:100%;
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



