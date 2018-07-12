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
                                    :onSuccess="buildingImgSuccess"
                                    :onRemove="buildingImgRemove"
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
                                :defaultFileList="communityImgsList"
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
                                <Radio label="1">
                                    已上架
                                </Radio>
                                <Radio label="0">
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
                     <FormItem label="上架状态" class="u-input" style="width:250px" prop="kmPublished">
                            <RadioGroup v-model="formItem.kmPublished" style="width:250px">
                                <Radio label="1">
                                    已上架
                                </Radio>
                                 <Radio label="2">
                                    待上架
                                </Radio>
                                <Radio label="0">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                    </FormItem>
                    <FormItem label="社区折扣策略"  style="width:252px" prop="communityAddress">
                        <Input 
                            v-model="formItem.promotionDesc" 
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
                                    v-model="form.kmStartTime"
                                    @on-change="changeAppStartTime"
                                    :steps="[1,30]"
                                />
                                <span style="padding:0 10px;">至</span>
                                <TimePicker 
                                    format="HH:mm"  
                                    style="width: 122px" 
                                    v-model="form.kmEndTime"
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
                <Button type="primary" @click="handleSubmit('formItems')">确定</Button>
                <Button type="ghost" @click="handleReset('formItems')" style="margin-left: 8px">取消</Button>
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
               kmStartTime:'09:00:00',
               kmEndTime:'19:00:00',
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
               
            },
            buildingImgList:[],
            communityImgsList:[],
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
            let {params}=this.$route;
            let message = '请填写完表单';
            this.$Notice.config({
                top: 80,
                duration: 3
            });
            let _this = this;
            this.formItem.communityId=params.id;
            console.log('this.formItem',this.formItem)
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
           
            this.$http.post('edit-krmting-mobile-community', this.formItem).then((res)=>{
                this.$Notice.success({
                        title:'编辑成功'
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
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        changeAppStartTime(data){
             this.formItem.kmStartTime=data;
            if(this.formItem.kmStartTime && this.formItem.kmEndTime){
                this.isAppError=false;
            }else{
                this.isAppError=true;
            }
        },
        changeAppEndTime(data){
            this.formItem.kmEndTime=data;
            if(this.formItem.kmStartTime && this.formItem.kmEndTime){
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
            let communityStatus={
                '1':'已开业',
                '0':'未开业'
            }
            this.$http.get('get-krmting-mobile-community-detail',form).then((res)=>{
                let data=Object.assign({},res.data);
                let appPublished=String(res.data.appPublished)
                let kmPublished=String(res.data.kmPublished);
                res.data.communityStatus=communityStatus[res.data.communityStatus];
                data.appPublished=appPublished;
                data.kmPublished=kmPublished;
               
                let buildingImgList=[];
                if(data.buildingImg && data.buildingImg!=''){
                    buildingImgList.push({'url':data.buildingImg});
                }
                this.buildingImgList=buildingImgList;

                let communityImgsList=[];
                data.communityImgs && data.communityImgs.map((item)=>{
                    let obj={};
                    obj.url=item;
                    communityImgsList.push(obj)
                })
                this.communityImgsList=communityImgsList;

                this.goodsInfo = res.data;

                delete data.appRoomNum;
                delete data.appSeatNum;
                delete data.buildingName;
                delete data.communityName;
                delete data.kmRoomNum;
                delete data.kmSeatNum;
                delete data.openDate;
                delete data.communityStatus;
                this.formItem=data;
                if(data.kmStartTime){
                    this.form.kmStartTime=data.kmStartTime.substring(0,5);
                }
                if(data.kmEndTime){
                    this.form.kmEndTime=data.kmEndTime.substring(0,5);
                }
                if(data.communityImgs){
                    this.formItem.communityImgs=data.communityImgs.join(',');
                }
                
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
       
        buildingImgRemove(){
            this.formItem.buildingImg="";
        },
        buildingImgSuccess(file){
            this.formItem.buildingImg=file.data.url;
            this.$refs.formItems.validateField('buildingImg') 
        },
        detailImgsRemove(fileList){
            let imglist=[];
            fileList.map((item)=>{
                imglist.push(item.url)
            })
            let communityImgs=imglist.join(',');
            this.formItem.communityImgs=communityImgs;
        },
        detailImgsSuccess(response, file, fileList){
            let imglist=[].concat(this.imglist);
            fileList.map((item)=>{
                imglist.push(item.url)
            })
            let detailImgs=imglist.join(',');
            this.formItem.communityImgs=communityImgs;
            this.$refs.formItems.validateField('communityImgs');
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


