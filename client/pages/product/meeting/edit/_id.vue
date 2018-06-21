<template>
    <div class="g-create-meeting">
         <SectionTitle title="编辑会议室"></SectionTitle>
         <Form ref="formItems" :model="formItem" :rules="ruleCustom">
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
                                        remote
                                        @on-change="getFloor"
                                        :label="formItem.communityName"

                                    >
                                        <Option v-for="(option, index) in communityList" :value="`${option.value}`" :key="index">{{option.label}}</Option>
                                    </Select>
                                 </FormItem>
                                 <FormItem label="所在楼层" class="u-input" prop="floor">
                                    <Select
                                        v-model="formItem.floor"
                                        style="width:250px"
                                        placeholder="请选择"
                                        filterable
                                        clearable
                                        remote
                                        :label="formItem.floor"
                                    >
                                        <Option  v-for="item in floorsList" :value="`${item.value}`"  :key="item.value" >{{ item.label }}</Option>
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
                                     <FormItem label="封面图片" class="u-input" prop="coverImg" style="width:100%">
                                        <UploadFile 
                                            v-model="formItem.coverImg"
                                            :category="category"
                                            withCredentials
                                            :format="['jpg','png','gif']"
                                            :maxSize="300"
                                            :maxLen="1"
                                            :onSuccess="coverImgSuccess"
                                            :onRemove="coverImgRemove"
                                            :onExceededSize="imgSize"
                                            :onFormatError="imgSizeFormat"
                                            :defaultFileList="coverImgList"
                                        >
                                            <div slot="tip" class="u-unload-tip">图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为4:3；</div>
                                        </UploadFile>
                                    </FormItem>
                                </div>
                                <div class="u-upload">
                                    <FormItem label="会议室图片" class="u-input" prop="detailImgs" style="width:100%">
                                        <UploadFile 
                                            v-model="formItem.detailImgs"
                                            multiple
                                            :category="category"
                                            withCredentials
                                            :format="['jpg','png','gif']"
                                            :maxSize="300"
                                            :onSuccess="detailImgsSuccess"
                                            :onRemove="detailImgsRemove"
                                            :onExceededSize="imgSize"
                                            :onFormatError="imgSizeFormat"
                                            :defaultFileList="detailImgList"
                                            
                                        >
                                            <div slot="tip" class="u-unload-tip">图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为4:3；</div>
                                        </UploadFile>
                                    </FormItem>
                                </div>
                                <div class="u-community-check-list">
                                        <div class="u-unload-label">
                                            会议室配套设施
                                        </div>
                                        <CheckboxGroup v-model="checkGroup" @on-change="checkGroupChange">
                                            <Checkbox v-for="item in deviceList" :key="item.value" :label="item.value">{{item.label}}</Checkbox>
                                        </CheckboxGroup>
                                </div> 
                                <FormItem label="会议室被占用设置"  class="u-date">
                                    <DatePicker
                                        type="date"
                                        v-model="startTime"
                                        placeholder="日期"
                                        style="width: 150px;margin-right:4px;"
                                        @on-change="startChange"
                                    />
                                        <TimePicker 
                                            format="HH:mm" 
                                            placeholder="请选择" 
                                            style="width: 96px" 
                                            v-model="form.startHour"
                                            @on-change="startHourChange"
                                            @on-clear="startHourClear"
                                            :steps="[1,30]"
                                        />
                                        <span class="u-date-txt">至</span>
                                    <DatePicker
                                            type="date"
                                            v-model="endtime"
                                            placeholder="日期"
                                            style="width: 150px;margin-right:4px;"
                                            @on-change="endChange"
                                    />
                                    <TimePicker 
                                            format="HH:mm" 
                                            placeholder="请选择" 
                                            style="width: 96px" 
                                            v-model="form.endHour"
                                            @on-change="endHourChange"
                                            @on-clear="endHourClear"
                                            :steps="[1,30]"
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
                                <Radio label="true">
                                    已上架
                                </Radio>
                                <Radio label="false">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
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
                                <Radio label="true">
                                    已上架
                                </Radio>
                                <Radio label="false">
                                    未上架
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                       <FormItem label="可预订时段" class="u-input ivu-form-item-required"  style="width:350px"  >
                           <div style="width:350px;float:left;">
                               <TimePicker 
                                    format="HH:mm" 
                                    style="width: 122px" 
                                    v-model="form.krmStartTime"
                                    :steps="[1,30]"
                                    @on-change="changeKrmStartTime"
                                    :disabled-hours="[0,1,2,3,4,5,6,7,8,20,21,22,23]"
                                />
                                <span style="padding:0 10px;">至</span>
                                <TimePicker 
                                    format="HH:mm"
                                    style="width: 122px"
                                    v-model="form.krmEndTime" 
                                    :steps="[1,30]"
                                    @on-change="changeKrmEndTime"
                                    :disabled-hours="[0,1,2,3,4,5,6,7,8,20,21,22,23]"
                                />
                                <div v-if="isKrmError" class="u-error">请选择可预订时段</div>
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
import dateUtils from 'vue-dateutils';

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
                name:'',
                appBusyPrice:'',
                appIdlePrice:'',
                appEndTime:'23:30',
                appPublish:'',
                appStartTime:'00:00',
                area:'',
                capacity:'',
                communityId:'',
                coverImg:'',
                descr:'',
                detailImgs:'',
                floor:'',
                kmPromotionUnitPrice:'',
                kmUnitPrice:'',
                krmEndTime:'19:00',
                krmPublish:'',
                krmStartTime:'09:00',
                lockBeginTime:'',
                lockEndTime:'',
                meetingDevices:''
            },
            form:{
               startHour:'', 
               endHour:'',
               appStartTime:'00:00',
               appEndTime:'23:30',
               krmStartTime:'09:00',
               krmEndTime:'19:00',

            },
            isKrmError:false,
            isAppError:false,
            startTime:'',
            startHour:'',
            endtime:'',
            endHour:'',
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
                
                appBusyPrice:[
                    { required: true, message: '请输入忙时单价', trigger: 'change' }
                ],
                appIdlePrice:[
                    { required: true, message: '请输入闲时单价', trigger: 'change' }
                ],
                krmPublish:[
                    { required: true, message: '请选择上架状态', trigger: 'change' }
                ],
                kmUnitPrice:[
                    { required: true, message: '请输入单价', trigger: 'change' }
                ],
                kmPromotionUnitPrice:[
                    { required: true, message: '请输入优惠价格', trigger: 'change' }
                ],
                coverImg:[
                    { required: true, message: '请上传封面图', trigger: 'change' }
                ],
                detailImgs:[
                    { required: true, message: '请上传详情图片', trigger: 'change' }
                ],
                
            },  
            floorsList:[],
            communityList:[],
            imglist:[],
            endDates:'',
            startDate:'',
            coverImgList:[],
            detailImgList:[],
            checkGroup:[],
            checkList:[],
            deviceList:[]

        }
    },
    created(){
       
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
        this.getCommunityList('');
        this.getDetailInfo()
        this.getDeviceList();
    },
    methods:{
        getDeviceList(){
            this.$http.get('get-krmting-room-device-list').then((res)=>{
              let list = []
                res.data.devices.map((item)=>{
                    let obj ={};
                    obj.label = item.name;
                    obj.value = item.id;
                    list.push(obj)
                });
                this.deviceList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        checkGroupChange(data){
            
            let checkList=[].concat(this.checkGroup)
            this.checkList=checkList.join(',');
            this.formItem.meetingDevices=this.checkList;
        },
        getDetailInfo(){
             let {params}=this.$route;
             let form={
                roomId: params.id
             }
              this.$http.get('get-krmting-room-detail', form).then((res)=>{
                    let data =Object.assign({},res.data);
                    data.floor=String(data.floor);
                    data.capacity=String(data.capacity);
                    data.appPublish=String(data.appPublish);
                    data.krmPublish=String(data.krmPublish);
                    data.communityId=String(data.communityId);
                    this.startTime=data.lockBeginTime;
                    this.endtime=data.lockEndTime;
                    this.form.appStartTime=data.appStartTime.substring(0,6);
                    this.form.appEndTime=data.appEndTime.substring(0,6);
                    this.form.krmStartTime=data.krmStartTime.substring(0,6);
                    this.form.krmEndTime=data.krmEndTime.substring(0,6);
                    let coverImgList=[];
                    coverImgList.push({'url':data.coverImg});
                    this.coverImgList=coverImgList;
                    let detailImgList=[];
                    data.detailImg.map((item)=>{
                        let obj={};
                        obj.url=item;
                        detailImgList.push(obj)
                    })
                    this.detailImgList=detailImgList;
                    this.formItem=data;
                    if(data.lockBeginTime){
                         this.startDate==dateUtils.dateToStr("YYYY-MM-DD", new Date(data.lockBeginTime));
                        this.formItem.lockBeginTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(data.lockBeginTime));
                        this.form.startHour=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(data.lockBeginTime)).substr(11,5);
                    }
                    if(data.lockEndTime){
                        this.endDates=dateUtils.dateToStr("YYYY-MM-DD", new Date(data.lockEndTime));
                        this.formItem.lockEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(data.lockEndTime));
                         this.form.endHour=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(data.lockEndTime)).substr(11,5);
                    }
                    if(data.detailImg){
                         this.formItem.detailImgs=data.detailImg.join(',');
                    }
                    let checkGroup=[];
                    if(data.meetingDevices){
                        data.meetingDevices.map((item)=>{
                            checkGroup.push(item.id)
                        })
                        
                    }
                     this.checkGroup= checkGroup;
                     this.formItem.meetingDevices=[].concat(checkGroup).join(',')
                    
                    

                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                });
        },
        changeAppStartTime(data){
             this.formItem.appStartTime=data;
            if(this.formItem.appStartTime && this.formItem.appEndTime){
                this.isAppError=false;
            }else{
                this.isAppError=true;
            }
        },
        changeAppEndTime(data){
            this.formItem.appEndTime=data;
            if(this.formItem.appStartTime && this.formItem.appEndTime){
                this.isAppError=false;
            }else{
                this.isAppError=true;
            }
        },
        changeKrmStartTime(data){
             this.formItem.krmStartTime=data;
            if(this.formItem.krmStartTime && this.formItem.krmEndTime){
                this.isKrmError=false;
            }else{
                this.isKrmError=true;
            }
        },
        changeKrmEndTime(data){
             this.formItem.krmEndTime=data;
            if(this.formItem.appStartTime && this.formItem.krmEndTime){
                this.isKrmError=false;
            }else{
                this.isKrmError=true;
            }
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
        coverImgRemove(){
            this.formItem.coverImg="";
        },
        coverImgSuccess(file){
            this.formItem.coverImg=file.data.url;
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
            
        },
        getFloor(){
            if(!this.formItem.communityId){
                this.formItem.floor="";
                return
            }
             let params = {
                    communityId:this.formItem.communityId
                }
            this.$http.get('get-krmting-room-floor-list', params).then((res)=>{
             
              let list = []
                res.data.floors.map((item)=>{
                    let obj ={};
                    obj.label = item;
                    obj.value = item;
                    list.push(obj)
                });
                this.floorsList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
            
        },
        handleSubmit(name){
             let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
              console.log('this.formItem----->>>',this.formItem)
            //    if(this.startDate && this.startHour){
            //        this.formItem.lockBeginTime=`${this.startDate} ${this.startHour}:00`;
            //    }else{
            //        this.formItem.lockBeginTime=""
            //    }
            //    if(this.endDates && this.endHour){
            //        this.formItem.lockEndTime=`${this.endDates} ${this.endHour}:00`;
            //    }else{
            //         this.formItem.lockEndTime=""
            //    }
              
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
          //社区
       getCommunityList(name){
            let params = {
                    cmtName:name
                }
            this.$http.get('get-community-new-list', params).then((res)=>{
           
               let list= []
               res.data.cmts.map((item)=>{
                   let obj ={};
                    obj.label = item.cmtName;
                    obj.value = item.cmtId;
                    if(item.cmtId>0){
                        list.push(obj)
                    }
                    
                });
                this.communityList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
            
            
        },
        submitCreate(){
            let {params}=this.$route;
            this.formItem.id=params.id;
           
            this.$http.post('add-krmting-room', this.formItem).then((res)=>{
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
        startChange(date){
            this.startDate=date;
        },
        endChange(date){
            console.log('date',date)
            this.endDates=date;
        },
        startHourChange(date){

            this.startHour=date;
        },
        endHourChange(date){
            this.endHour=date;
        },
        startHourClear(){
            this.startHour='00:00:00';
        },
        endHourClear(){
            this.endHour='00:00:00';
        }
    }
    
}
</script> 
<style lang="less">
.g-create-meeting{
     .u-community-check-list{
        margin-bottom:10px;
    }
    .m-detail-content{
        width:100%;
        max-width: 1300px;
        box-sizing: border-box;
	    padding:30px 24px;
    }
    .u-error{
        color: #ed3f14;
        font-size: 12px;
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



