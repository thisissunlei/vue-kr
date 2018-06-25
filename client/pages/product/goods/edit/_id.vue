<template>
    <div class="g-goods-detail">
        <SectionTitle title="编辑社区商品"></SectionTitle>   
        <div class="m-goods-content">
            <DetailStyle info="社区基本信息">
                <LabelText label="社区名称：">
                    {{goodsInfo.comName}}
                </LabelText>
                <LabelText label="社区编码：">
                   {{goodsInfo.comNumber}}
                </LabelText>
                <LabelText label="所在地区：">
                    {{goodsInfo.area}}
                </LabelText>
                <LabelText label="开业状态：">
                    {{goodsInfo.openStatus}}
                </LabelText>
                <LabelText label="开业时间：">
                    {{goodsInfo.openTime}}
                </LabelText>
            </DetailStyle>
            <Form ref="goodsFormValidate" :model="goodsInfo" :rules="ruleValidate" :label-width="100">
                <DetailStyle info="社区基本运营信息">
                    <Row>
                        <Col span="11">
                            <FormItem label="大厦名称：" prop="buildname">
                                <Input v-model="goodsInfo.buildname" class="input"/>
                            </FormItem>
                        </Col>
                        <Col span="13">
                            <FormItem label="地址描述：" prop="address">
                                <Input v-model="goodsInfo.address" class="input"/>
                            </FormItem>
                         </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                            <FormItem label="社区坐标：" prop="coordinate">
                                <Input v-model="goodsInfo.coordinate" class="input"/>
                            </FormItem>
                        </Col>
                        <Col span="13">
                            <FormItem label="大厦外景：" prop="fileList" require>
                                <UploadFile></UploadFile>
                            </FormItem>
                        </Col>
                    </Row>
                </DetailStyle>
                <DetailStyle info="APP商品信息">
                    <Row>
                        <Col span="11">
                            <FormItem label="上架状态：" prop="appStatus">
                                <RadioGroup v-model="goodsInfo.appStatus">
                                    <Radio label="已上架">已上架</Radio>
                                    <Radio label="未上架">未上架</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="13">
                            <LabelText label="APP可用会议室楼层：">
                                {{goodsInfo.appMeeting}}
                            </LabelText>
                        </Col>
                    </Row>
                </DetailStyle>
                <DetailStyle info="KM会议室商品信息">
                    <Row>
                        <Col span="11">
                            <FormItem label="上架状态：" prop="KMStatus">
                                <RadioGroup v-model="goodsInfo.KMStatus">
                                    <Radio label="已上架">已上架</Radio>
                                    <Radio label="待上架">待上架</Radio>
                                    <Radio label="未上架">未上架</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="13">
                            <FormItem label="社区折扣策略：" prop="discountMsg"  :label-width="120">
                                <Input v-model="goodsInfo.discountMsg" class="input"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <LabelText label="KM可预定会议室数量（个）：">
                        {{goodsInfo.meetingCount}}
                    </LabelText>
                    <LabelText label="KM可用会议室楼层：">
                        {{goodsInfo.kmMeeting}}
                    </LabelText>

                    <Row>
                        <Col span="11">
                            <FormItem label="KM不可预订日期策略：" prop="dateSelect" :label-width="180">
                                <Select
                        v-model="goodsInfo.dateSelect"
                        style="width:100px"
                        placeholder="请选择"
                        clearable
                    >
                        <Option
                            v-for="item in statusList"
                            :value="item.value"
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                    </Select>
                            </FormItem>
                        </Col>
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


