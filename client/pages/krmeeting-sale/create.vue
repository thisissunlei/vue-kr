<template>
    <div class="g-create-meeting">
         <SectionTitle title="新建优惠券信息"></SectionTitle>
         <Form ref="formItems" :model="formItem" :rules="ruleCustom">
                <div class="m-detail-content">
                    <DetailStyle info="基本信息">
                               <FormItem label="优惠券名称" class="u-input"  prop="name">
                                    <Input 
                                        v-model="formItem.name" 
                                        placeholder="请输入" 
                                        style="width:250px"
                                    />
                                </FormItem>
                                <FormItem label="优惠券面额" class="u-input" prop="communityId">
                                    <Input 
                                        v-model="formItem.name" 
                                        placeholder="请输入" 
                                        style="width:250px"
                                    />
                                 </FormItem>
                                  <FormItem label="优惠券类型" class="u-input" style="width:250px" prop="appPublish">
                                        <RadioGroup v-model="formItem.appPublish" style="width:250px">
                                            <Radio label="true">
                                                满 <Input 
                                                    v-model="formItem.name" 
                                                    placeholder="请输入" 
                                                    style="width:80px"
                                                />元可用
                                            </Radio>
                                            <Radio label="false">
                                               无门槛金额
                                            </Radio>
                                        </RadioGroup> 
                                </FormItem>
                                 <FormItem label="发放数量" class="u-input" prop="floor">
                                   <Input 
                                        v-model="formItem.name" 
                                        placeholder="请输入" 
                                        style="width:250px"
                                    />
                                </FormItem>
                    </DetailStyle>
                    <DetailStyle info="基本规则">
                        <FormItem label="有效期类型" class="u-input" style="width:250px" prop="krmPublish">
                            <RadioGroup v-model="formItem.krmPublish" style="width:250px">
                                <Radio label="true">
                                     <FormItem label="起止时间"  class="u-date">
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
                                </Radio>
                                <Radio label="false">
                                   领取后，当天有效，有效天数<Input 
                                                    v-model="formItem.name" 
                                                    placeholder="请输入" 
                                                    style="width:80px"
                                                />天
                                </Radio>
                            </RadioGroup> 
                        </FormItem>
                        <FormItem label="每人限领" style="width:252px">
                            <Input 
                                v-model="formItem.descr" 
                                placeholder=""
                                type="textarea"
                            />次
                        </FormItem>
                        <FormItem label="使用范围" class="u-input" style="width:250px" prop="appPublish">
                                <RadioGroup v-model="formItem.appPublish" style="width:250px">
                                    <Radio label="true">
                                       不限
                                    </Radio>
                                    <Radio label="false">
                                        会议室
                                    </Radio>
                                    <Radio label="false">
                                        散座
                                    </Radio>
                                </RadioGroup> 
                        </FormItem>
                        <FormItem label="使用说明" style="width:552px">
                            <Input 
                                v-model="formItem.descr" 
                                placeholder=""
                                type="textarea"
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
                name:'',
                appBusyPrice:'',
                appIdlePrice:'',
                appEndTime:'23:30:00',
                appPublish:'',
                appStartTime:'00:00:00',
                area:'',
                capacity:'',
                communityId:'',
                coverImg:'',
                descr:'',
                detailImgs:'',
                floor:'',
                kmPromotionUnitPrice:'',
                kmUnitPrice:'',
                krmStartTime:'09:00:00',
                krmEndTime:'19:00:00',
                krmPublish:'',
                lockBeginTime:'',
                lockEndTime:'',
                meetingDevices:''
            },
            form:{
               startHour:'', 
               endHour:'',
               appStartTime:'00:00:00',
               appEndTime:'23:30:00',
               krmStartTime:'09:00:00',
               krmEndTime:'19:00:00',

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
            checkGroup:[],
            checkList:[],
            deviceList:[]
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
        this.getCommunityList('');
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
        changeAppStartTime(data){
             this.formItem.appStartTime=`${data}:00`;
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
        changeKrmStartTime(data){
             this.formItem.krmStartTime=`${data}:00`;
            if(this.formItem.krmStartTime && this.formItem.krmEndTime){
                this.isKrmError=false;
            }else{
                this.isKrmError=true;
            }
        },
        changeKrmEndTime(data){
             this.formItem.krmEndTime=`${data}:00`;
            if(this.formItem.krmStartTime && this.formItem.krmEndTime){
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
            this.$refs.formItems.validateField('detailImgs') 
            
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
               
               if(this.startDate && this.startHour){
                   this.formItem.lockBeginTime=`${this.startDate} ${this.startHour}:00`;
               }else{
                   this.formItem.lockBeginTime=""
               }

               if(this.endDates && this.endHour){
                   this.formItem.lockEndTime=`${this.endDates} ${this.endHour}:00`;
               }else{
                    this.formItem.lockEndTime=""
               }
             
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
            this.$http.post('add-krmting-room', this.formItem).then((res)=>{
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
        startChange(date){
            this.startDate=date;
        },
        endChange(date){
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
        margin-bottom:24px;
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



