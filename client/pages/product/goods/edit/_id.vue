<template>
    <div class="g-goods-detail">
        <SectionTitle title="编辑社区商品"></SectionTitle>   
        <div class="m-goods-content">
            <Form ref="goodsFormValidate" :model="goodsInfo" :rules="ruleValidate" :label-width="100">
                <DetailStyle info="社区基本信息">
                    <LabelText label="社区名称：">
                        {{goodsInfo.communityName}}
                    </LabelText>
                    <LabelText label="大厦名称：">
                        {{goodsInfo.buildingName}}
                    </LabelText>
                    <LabelText label="正式开业状态：">
                    {{goodsInfo.communityStatus}}
                    </LabelText>
                    <LabelText label="正式开业时间：">
                        {{goodsInfo.openDate}}
                    </LabelText>
                    <FormItem label="详细地址"  style="width:294px" prop="name">
                        <Input 
                            v-model="formItem.title" 
                            placeholder="详细地址"
                        />
                    </FormItem>
                    <div class="u-upload">
                        <FormItem label="封面图片" class="u-input" prop="name" style="width:100%">
                                <UploadFile 
                                    v-model="formItem.coverImg"
                                    :category="category"
                                    withCredentials
                                    :format="['jpg','png','gif']"
                                    :maxSize="2048"
                                    :maxLen="1"
                                    :onSuccess="coverImgSuccess"
                                    :onRemove="coverImgRemove"
                                    :onExceededSize="imgSize"
                                    :onFormatError="imgSizeFormat"
                                    :defaultFileList="coverImgList"
                                    :imgWidth="120"
                                    :imgHeight="120"
                                >
                                    <div slot="tip" class="u-unload-tip">图片小于1MB，格式为JPG，PNG，GIF，建议图片比例为3:4</div>
                                </UploadFile>
                        </FormItem>
                    </div>
                    <div class="u-upload">
                        <FormItem label="会议室图片" class="u-input" prop="name" style="width:100%">
                            <UploadFile 
                                v-model="formItem.detailImgs"
                                multiple
                                :category="category"
                                withCredentials
                                :format="['jpg','png','gif']"
                                :maxSize="2048"
                                :onSuccess="detailImgsSuccess"
                                :onRemove="detailImgsRemove"
                                :onExceededSize="imgSize"
                                :onFormatError="imgSizeFormat"
                                :defaultFileList="detailImgList"
                                :imgWidth="120"
                                :imgHeight="120"
                                
                            >
                                <div slot="tip" class="u-unload-tip">图片小于1MB，格式为JPG，PNG，GIF，建议图片比例为4:3；</div>
                            </UploadFile>
                        </FormItem>
                    </div>
                </DetailStyle>
                <DetailStyle info="APP社区商品信息">
                   <div>
                       <FormItem label="上架状态" class="u-input" style="width:250px" prop="appPublish">
                            <RadioGroup v-model="formItem.appPublish" style="width:250px">
                                <Radio label="true">
                                    已上架
                                </Radio>
                                <Radio label="false">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                   </div>
                    <LabelText label="已上架会议室商品数量">
                        {{goodsInfo.meetingCount}}
                    </LabelText>
                    <LabelText label="已上架散座商品数量">
                        {{goodsInfo.meetingCount}}
                    </LabelText>
                    
                </DetailStyle>
                <DetailStyle info="小程序社区商品信息">
                    
                    <LabelText label="KM可预定会议室数量（个）：">
                        {{goodsInfo.meetingCount}}
                    </LabelText>
                    <LabelText label="KM可用会议室楼层：">
                        {{goodsInfo.kmMeeting}}
                    </LabelText>
                    <FormItem label="可预订时段" class="u-input ivu-form-item-required"  style="width:350px"   >
                           <div style="width:350px;float:left;">
                               <TimePicker 
                                    format="HH:mm" 
                                    style="width: 122px" 
                                    v-model="form.appStartTime"
                                    @on-change="changeAppStartTime"
                                    :steps="[1,30]"
                                />
                                <span style="padding:0 10px;">至</span>
                                <TimePicker 
                                    format="HH:mm"  
                                    style="width: 122px" 
                                    v-model="form.appEndTime"
                                    @on-change="changeAppEndTime"
                                    :steps="[1,30]"
                                />
                                 <div v-if="isAppError" class="u-error">请选择可预订时段</div>
                           </div>
                    </FormItem>
                    <!-- <Row>
                       
                        <Col span="13" style="position:relative">
                            <FormItem label="KM不可预订日期：" prop="date" :label-width="140">
                                <span v-on:mouseover="tipsShow" v-on:mouseout="tipsHide" class="help-circled">
                                    <Icon type="help-circled" style="font-size:18px;"></Icon>
                                </span>
                               
                                <calendar></calendar>
                            </FormItem>
                            <div class="tips" v-show="isShow">
                                <p>温馨提示</p>
                                <p>① 灰色日期为不可预订日期</p>
                                <p>② 单击选中日期，即可设置该日期是否可预订</p>
                                <p>③ 默认所有周末为不可预订</p>
                            </div>
                        </Col>
                       
                    </Row>
                     -->
                </DetailStyle>
                
                 
            </Form>
            <div style="text-align:center">
                <Button type="primary" @click="handleSubmit('goodsInfo')">确定</Button>
                <Button type="ghost" @click="handleReset('goodsInfo')" style="margin-left: 8px">取消</Button>
            </div>
        </div>
    </div>
</template>

<script>
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import SectionTitle from '~/components/SectionTitle';
import UploadFile from '~/components/UploadFile';
import dateUtils from 'vue-dateutils';
import calendar from '../calendar.vue'
export default {
     components:{
        DetailStyle,
		LabelText,
        SectionTitle,
        UploadFile,
        calendar
    },
    head(){
        return{
            title:"编辑社区商品"
        }
    },
    data(){
        return{
            isShow:false,
            statusList:[
                {
                 label:'周末及节假日',
                 value:'true'   
                },
                {
                 label:'无',
                 value:'false'   
                },
            ],
            formItem:{

            },
             goodsInfo:{
                comName:"慈云社社区",
                comNumber:"BZJB",
                area:"北京市/北京市/朝阳区",
                openStatus:"已开业",
                openTime:"2017-3-3",
                buildname:"住邦2000",
                address:"北京市朝阳区八里庄西里100号住邦2000",
                coordinate:"116.501734，39.921302",
                appMeeting:"5层 6层",
                appStatus:"未上架",
                KMStatus:"未上架",
                discountMsg:"限时5折优惠",
                meetingCount:"5",
                kmMeeting:"5层 6层",
                dateSelect:"false"
            },
            ruleValidate: {
                name: [
                    { required: true, message: '大厦名称不能为空', trigger: 'blur' }
                ],
                addressMsg: [
                    { required: true, message: '地址描述不能为空', trigger: 'blur' }
                ],
                comMsg: [
                    { required: true, message: '社区坐标不能为空', trigger: 'blur' }
                ],
                fileList: [
                    { required: true, message: '请选择图片上传', trigger: 'blur' }
                ],
                // fileList:fileListRule,
                appStatus: [
                    { required: true, message: 'APP商品上架状态不能为空', trigger: 'blur' }
                ],
                kmStatus: [
                    { required: true, message: 'KM商品上架状态不能为空', trigger: 'blur' }
                ],
                discountMsg: [
                    { type: 'string', max: 10, message: '最多10个字符', trigger: 'change' }
                ],
                dateSelect: [
                    { required: true, message: '请选择KM不可预订日期策略', trigger: 'blur' }
                ],
                // date: [
                //     { required: true, message: '不可预订日期选择', trigger: 'blur' }
                // ],
            },
        }
    },
    mounted:function(){
		GLOBALSIDESWITCH("false")
    },
    methods: {
        handleSubmit (name) {
           
            this.$refs[name].validate((valid) => {
                
                if (valid) {
                    this.$Message.success('Success!');
                    // let para = Object.assign({}, this.goodsInfo);
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
    	tipsShow(){
            this.isShow = true
        },
        tipsHide(){
            this.isShow = false;
        }

    }
}
</script>

<style lang="less">
    .g-goods-detail{
		.m-goods-content{
            padding:30px 24px;
            .ivu-form .ivu-form-item-label{
                font-size: 14px;
                color: #333;
                font-weight: 700;
            }
            .help-circled{
                width: 20px;
                height: 20px;
                display: inline-block;
                margin-left: -18px;
                margin-top: 4px;
                
            }
            .input{
                width: 300px;
            }
            .tips{
                position: absolute;
                padding:20px;
                background: #ccc;
                font-size: 18px;
                line-height: 30px;
                color: #666;
                z-index: 99;
                left: 60px;
                top: 40px;
            }
            .tips:after{
                border-left: 13px solid transparent;  
                border-right: 13px solid transparent;  
                border-bottom: 15px solid #ccc;  
                content: "";  
                position: absolute;      
                width: 0; 
                left: 50px;
                top: -15px;
            }
		}
		
	}
</style>


