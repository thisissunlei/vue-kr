<template>
    <div class="g-goods-detail">
        <SectionTitle title="编辑社区商品"></SectionTitle>   
        <div class="m-goods-content">
            <Form ref="formItems" :model="formItem" :rules="ruleValidate">
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
                    <FormItem label="详细地址"  style="width:252px" prop="communityAddress">
                        <Input 
                            v-model="formItem.communityAddress" 
                            placeholder="详细地址"
                        />
                    </FormItem>
                    <div class="u-upload">
                        <FormItem label="大厦外景图" class="u-input" prop="buildingImg" style="width:100%">
                                <UploadFile 
                                    v-model="formItem.buildingImg"
                                    :category="category"
                                    withCredentials
                                    :format="['jpg','png','gif']"
                                    :maxSize="2048"
                                    :maxLen="1"
                                    :onSuccess="coverImgSuccess"
                                    :onRemove="coverImgRemove"
                                    :onExceededSize="imgSize"
                                    :onFormatError="imgSizeFormat"
                                    :defaultFileList="buildingImgList"
                                    :imgWidth="120"
                                    :imgHeight="120"
                                >
                                    <div slot="tip" class="u-unload-tip">图片小于1MB，格式为JPG，PNG，GIF，建议图片比例为3:4</div>
                                </UploadFile>
                        </FormItem>
                    </div>
                    <div class="u-upload">
                        <FormItem label="社区展示图册" class="u-input" prop="communityImgs" style="width:100%">
                            <UploadFile 
                                v-model="formItem.communityImgs"
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
                       <FormItem label="上架状态" class="u-input" style="width:250px" prop="appPublished">
                            <RadioGroup v-model="formItem.appPublished" style="width:250px">
                                <Radio label="true">
                                    已上架
                                </Radio>
                                <Radio label="false">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                   </div>
                    <LabelText label="已上架会议室商品数量：">
                        {{goodsInfo.appRoomNum}}
                    </LabelText>
                    <LabelText label="已上架散座商品数量：">
                        {{goodsInfo.appSeatNum}}
                    </LabelText>
                </DetailStyle>
                <DetailStyle info="小程序社区商品信息">
                     <FormItem label="上架状态" class="u-input" style="width:250px" prop="appPublished">
                            <RadioGroup v-model="formItem.appPublished" style="width:250px">
                                <Radio label="true">
                                    已上架
                                </Radio>
                                 <Radio label="false">
                                    待上架
                                </Radio>
                                <Radio label="false">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                    </FormItem>
                    <FormItem label="社区折扣策略"  style="width:252px" prop="communityAddress">
                        <Input 
                            v-model="formItem.communityAddress" 
                            placeholder="社区折扣策略"
                        />
                    </FormItem>
                    <LabelText label="已上架会议室商品数量：">
                        {{goodsInfo.kmRoomNum}}
                    </LabelText>
                    <LabelText label="已上架散座商品数量：">
                        {{goodsInfo.kmSeatNum}}
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
            category:'app/upgrade',
            isAppError:false,
            formItem:{},
            form:{
               startHour:'', 
               endHour:'',
               appStartTime:'00:00:00',
               appEndTime:'23:30:00',
               krmStartTime:'09:00:00',
               krmEndTime:'19:00:00',
            },
            goodsInfo:{},
            ruleValidate: {
                communityAddress: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                buildingImg: [
                    { required: true, message: '请选择图片上传', trigger: 'blur' }
                ],
                communityImgs: [
                    { required: true, message: '请选择图片上传', trigger: 'blur' }
                ],
                appPublished: [
                    { required: true, message: 'APP商品上架状态不能为空', trigger: 'blur' }
                ],
                kmPublished: [
                    { required: true, message: 'KM商品上架状态不能为空', trigger: 'blur' }
                ],
                // date: [
                //     { required: true, message: '不可预订日期选择', trigger: 'blur' }
                // ],
            },
            buildingImgList:[],
            detailImgList:[],
            // statusList:[
            //     {
            //      label:'周末及节假日',
            //      value:'true'   
            //     },
            //     {
            //      label:'无',
            //      value:'false'   
            //     },
            // ],
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false")
        this.getGoodsInfo();
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                
                
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        changeAppStartTime(data){
             this.formItem.appStartTime=`${data}:00`;;
            if(this.formItem.appStartTime && this.formItem.appEndTime){
                this.isAppError=false;
            }else{
                this.isAppError=true;
            }
        },
        changeAppEndTime(data){
            this.formItem.appEndTime=`${data}:00`;
            if(this.formItem.appStartTime && this.formItem.appEndTime){
                this.isAppError=false;
            }else{
                this.isAppError=true;
            }
        },
        getGoodsInfo(){
            let {params}=this.$route;
            let form={
                communityId: params.id
             }
            let appPublish={
                '1':'已上架',
                '0':'未上架'
            }
            let kmPublished={
                '1':'已上架',
                '0':'未上架',
                '2':'待上架'
            }
            let communityStatus={
                '1':'已开业',
                '0':'未开业'
            }
            this.$http.get('get-krmting-mobile-community-detail',form).then((res)=>{
                let data=Object.assign({},res.data)
                let appPublished=toString(res.data.appPublished)
                let kmPublished=toString(res.data.kmPublished);
                data.appPublished=appPublish[appPublished];
                data.kmPublished=kmPublished[kmPublished];
                
                data.communityStatus=communityStatus[res.data.communityStatus];
                this.goodsInfo = data;
                
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        coverImgRemove(){
            this.formItem.coverImg="";
        },
        coverImgSuccess(file){
            this.formItem.coverImg=file.data.url;
            this.$refs.formItems.validateField('coverImg') 
        },
        detailImgsRemove(fileList){
            let imglist=[];
            fileList.map((item)=>{
                imglist.push(item.url)
            })
            let detailImgs=imglist.join(',');
            this.formItem.detailImgs=detailImgs;
        },
        detailImgsSuccess(response, file, fileList){
            let imglist=[].concat(this.imglist);
            fileList.map((item)=>{
                imglist.push(item.url)
            })
            let detailImgs=imglist.join(',');
            this.formItem.detailImgs=detailImgs;
            this.$refs.formItems.validateField('detailImgs');
        },
    	 imgSizeFormat(){
            this.$Notice.error({
                title:'图片格式不正确'
            });
        },
        imgSize(){
           this.$Notice.error({
                title:'图片大小超出限制'
            });
        },


    }
}
</script>

<style lang="less">
    .g-goods-detail{
        .u-input{
            display: inline-block;
            width: 252px;
            max-width: 450px;
            margin-right:120px;
            vertical-align:top;
        }
        .u-error{
            color: #ed3f14;
            font-size: 12px;
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
	    .m-goods-content{
            padding:30px 24px;
            // .help-circled{
            //     width: 20px;
            //     height: 20px;
            //     display: inline-block;
            //     margin-left: -18px;
            //     margin-top: 4px;
                
            // }
           
            // .tips{
            //     position: absolute;
            //     padding:20px;
            //     background: #ccc;
            //     font-size: 18px;
            //     line-height: 30px;
            //     color: #666;
            //     z-index: 99;
            //     left: 60px;
            //     top: 40px;
            // }
            // .tips:after{
            //     border-left: 13px solid transparent;  
            //     border-right: 13px solid transparent;  
            //     border-bottom: 15px solid #ccc;  
            //     content: "";  
            //     position: absolute;      
            //     width: 0; 
            //     left: 50px;
            //     top: -15px;
            // }
        }
		
	}
</style>


