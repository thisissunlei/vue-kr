<template>
    <div class="g-create-meeting">
         <SectionTitle title="新建发放"></SectionTitle>
         <Form ref="formItems" :model="formItem" :rules="ruleCustom">
                <div class="m-detail-content">
                    <FormItem label="发放说明" class="u-input"  prop="descr">
                        <Input 
                            v-model="formItem.descr" 
                            placeholder="请填写发放说明" 
                            style="width:250px"
                            :maxlength="15"
                        />
                     </FormItem>
                    <FormItem label="发放时间" class="u-input" style="width:1000px" prop="timeType">
                            <RadioGroup v-model="formItem.timeType" @on-change="timeChange" style="width:1000px;position: relative;">
                                <Radio label="NOW">
                                    <span>即时</span>
                                </Radio>
                                <Radio label="CRON">
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
                                        @on-change="hourChange"
                                    />
                                </div>
                            </RadioGroup> 
                            <div v-if="timeError" class="u-time-error">{{errorTip}}</div>
                    </FormItem>
                    

                    <FormItem label="发放对象" class="u-input" style="width:1000px;position:relative;" prop="userType">
                            <RadioGroup v-model="formItem.userType" @on-change="typeChange" style="width:1000px">
                                <Radio label="ALL" >
                                    <span style="margin-right:20px;">全部用户</span>
                                </Radio>
                                <Radio label="CUSTOM">
                                    <span style="margin-right:20px;">自定义</span>
                                </Radio>
                                <Radio label="UPLOAD">
                                    上传手机号
                                </Radio>
                                <div class="u-custom-style"  v-if="formItem.userType=='CUSTOM'">
                                    <Input 
                                        v-model="formItem.phones" 
                                        placeholder=""
                                        type="textarea"
                                    />
                                </div>
                                 <div class="u-upload-style" v-if="formItem.userType=='UPLOAD'">
                                      <Upload
                                        :before-upload="handleUpload"
                                        name="file"
                                        :format="['xls','xlsx']"
                                        with-credentials
                                        :isPut="true"
                                        action="/api/op/kmcoupon/provide/add"
                                        v-if="!fileName"
                                        @on-format-error="formatError"
                                        >
                                        <Button icon="ios-cloud-upload-outline" >上传文件</Button>
                                    </Upload>
                                   <div style="margin-top:3px;" v-if="fileName!=null">{{fileName}} <span class="u-delete-style" @click="removeFile">删除</span></div>
                                 </div>

                            </RadioGroup> 
                    </FormItem>
                    <div v-if="userTypeError" class="u-error">{{userTypeTip}}</div>
                    <div class="u-coupon-contanier">
                             <FormItem label="优惠券批次" class="ivu-form-item-required" style="width:100%" >
                                 <Input 
                                        v-model="batchNo" 
                                        placeholder="输入优惠券批次"
                                        style="width:278px"
                                 />
                                 <span class="u-add-coupon-btn" @click="addCoupon">添加</span>
                                 <div class="u-coupon-content"   >
                                     <table class="u-table" v-if="couponList.length>0">
                                         <thead>
                                             <tr class="u-thead">
                                                 <th>优惠券ID</th>
                                                 <th>优惠券名称</th>
                                                 <th>备注</th>
                                                 <th>面额(元)</th>
                                                 <th>数量</th>
                                                 <th>有效期</th>
                                                 <th>创建时间</th>
                                                 <th>创建人</th>
                                                 <th>发放张数</th>
                                             </tr>
                                         </thead>
                                         <tbody class="u-tabody">
                                             <tr  
                                                v-for="(item,index) in couponList"
                                                :key="index"
                                              >
                                                 <td>{{item.id}}</td>
                                                 <td>{{item.couponName}}</td>
                                                 <td>{{item.remark}}</td>
                                                 <td>{{item.amount}}</td>
                                                 <td>{{item.quantity}}</td>
                                                 <td>{{getTimeType(item)}}</td>
                                                 <td>{{changeTime('YYYY-MM-DD HH:mm:ss',item.ctime)}}</td>
                                                 <td>{{item.creatorName}}</td>
                                                 <td>
                                                     <div class="u-number">
                                                         <span :class="[item.sendQuantity<=0?'':'u-click-color','u-sub']" @click="sendSubNumber(index,item)"> -</span>
                                                          <Input 
                                                                v-model="item.sendQuantity"
                                                                type="text"
                                                                class="u-send-quantity"
                                                            />
                                                          <span :class="[item.sendQuantity>=item.remainCount?'':'u-click-color','u-add']"  @click="sendAddNumber(index,item)"> +</span>
                                                     </div>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                     <div 
                                        class="u-tag" 
                                        v-for="(item,index) in couponList"
                                        :key="index"
                                      >
                                         <span class="u-tag-close"></span>
                                        {{item.name}}
                                     </div>
                                 </div>
                             </FormItem>
                             <div v-if="couponListError" class="u-error">{{couponListTip}}</div>
                        </div>
                    
                </div>
                  <FormItem  style="padding-left:100px;margin-top:40px;">
                    <Button type="primary" @click="handleSubmit('formItems')" :disabled="disabled" >提交</Button>
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
                userType:'CUSTOM',
                phones:'',
                descr:''
            },
            form:{},
            disabled:false,
            startTime:'',  
            startHour:'',
            endtime:'',
            endHour:'',
            ruleCustom:{
                descr:[
                    { required: true, message: '请输入发放说明', trigger: 'change' }
                ],
                timeType:[
                    {required: true,message: '请选择发放时间',  trigger: 'change' }
                ],
                userType:[
                    {required: true,  message: '请选择发放对象', trigger: 'change' }
                ],
                
            }, 
            errorTip:'',
            timeError:false,
            amountError:false,
            amountErrorTxt:'',
            file:null,
            couponList:[],
            batchNo:'',
            userTypeError:false,
            userTypeTip:'',
            fileName:null,
            hour:'',
            couponListTip:'',
            couponListError:false,
            

        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
    },
    methods:{
        formatError(){
            this.$Notice.error({
                title:'文件格式不正确'
            });
        },
        hourChange(data){
            this.hour=`${data}:00`;
        },
        timeChange(){
            this.startTime="";
            this.startHour="";
        },
        typeChange(){
            this.formItem.phones="";
            this.file=null;
            this.userTypeError=false;
        },
        sendSubNumber(index,item){
            item.sendQuantity--;
            if(item.sendQuantity<=0){
                this.couponList.splice(index, 1);
            }else{
                this.couponList[index].sendQuantity=item.sendQuantity;
            }
           
        },
        sendAddNumber(index,item){
            if(item.sendQuantity>=item.remainCount){
                item.sendQuantity==item.remainCount;
            }else{
                item.sendQuantity++
            }
            this.couponList[index].sendQuantity=item.sendQuantity;
        },
        getTimeType(item){
            if(item.expireType=="START_END_TIME"){
                let startTime= this.changeTime("YYYY-MM-DD HH:mm:ss",item.effectAt);
                let endTime=this.changeTime("YYYY-MM-DD HH:mm:ss",item.expireAt);
                return `${startTime}至${endTime}`;
            }else if(item.expireType=="VALID_DATE"){
                return `${item.effectDay}天`
            }
        },
        changeTime(format,item){
             format=format?format:'YYYY-MM-DD HH:mm:ss';
            if(item){
                return dateUtils.dateToStr(format, new Date(item))
            }
        },
        addCoupon(){
                if(!this.batchNo){
                    this.$Notice.error({
                    title:'优惠券批次不能为空'
                    });
                    return;
                }
                let couponFlag=[];
                 this.$http.get('get-kmcoupon-detail-by-batchNo', {batchNo:this.batchNo}).then((res)=>{
                    res.data.sendQuantity=1;
                    if(this.couponList.length==0){
                        this.couponList.push(res.data);
                    }else{
                        this.couponList.map((item,index)=>{
                            if(item.id==res.data.id){
                                couponFlag.push(1)
                            }else{
                                 couponFlag.push(0)
                            }
                        })
                        if(couponFlag.indexOf(1)==-1){
                            this.couponList.push(res.data);
                        }
                    }
                    
                   
                    this.batchNo=null;
                    this.couponListError=false; 
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                        });
                });
                 
               
        },
        getCoupon(){
            
        },
        removeFile(){
            this.file=null;
            this.fileName=null;
        },
        handleUpload(file){
            this.file=file;
            this.fileName=file.name;
            return false;
        },
        trimStr(str){
             return str.replace(/(^\s*)|(\s*$)/g,"");
        },
        handleSubmit(name){
             let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
                this.formItem.descr=this.trimStr(this.formItem.descr);
                this.formItem.phones=this.trimStr(this.formItem.phones);
                if(this.formItem.timeType=="NOW"){
                    this.formItem.ptime=""
                }else if(this.formItem.timeType=="CRON"){
                    if(this.startTime && this.hour){
                        this.timeError=false;
                        this.formItem.ptime=this.changeTime("YYYY-MM-DD",this.startTime)+' '+this.hour;
                    }else{
                        this.timeError=true;
                        this.errorTip='请选择发放时间';
                        this.formItem.ptime=""
                    }  
                }
                if(this.formItem.userType=="CUSTOM"){

                    if(this.formItem.phones){
                        if(/，/.test(this.formItem.phones)){
                            this.userTypeError=true;
                            this.userTypeTip='请使用英文逗号';
                        }else{
                                let phone=this.formItem.phones.split(',');
                                let flag=[];
                                phone.map((item)=>{
                                    if(/^1\d{10}$/.test(item)){
                                        flag.push(1)
                                    }else{
                                        flag.push(0)
                                    }
                                })
                                if(flag.indexOf(0)<=-1){
                                    this.userTypeError=false;
                                }else{
                                    this.userTypeError=true;
                                    this.userTypeTip='请输入手机号格式不正确';
                                }
                        }
                       
                    }else{
                        this.userTypeError=true;
                        this.userTypeTip='请填写发放对象手机号';
                    }

                }else if(this.formItem.userType=="UPLOAD"){

                    if(this.fileName){
                        this.userTypeError=false;
                    }else{
                        this.userTypeError=true;
                        this.userTypeTip='请上传手机号';
                    }

                }else{
                     this.userTypeError=false;
                }
                if(this.couponList.length>0){
                     this.formItem.baseInfos=JSON.stringify(this.couponList);
                     this.couponListError=false; 
                }else{
                    this.couponListError=true;
                    this.couponListTip="请添加优惠券"
                }
               
                this.$refs[name].validate((valid) => {
                    if (valid && this.formItem.baseInfos) {
                         _this.disabled = true;
                        _this.submitCreate();
                    } else {
                         _this.disabled = false;
                        _this.$Notice.error({
                            title:message
                        });
                    }
                }) 
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
                    setTimeout(function(){
                        window.close();
                        window.opener.location.reload();
                    },1000) 
            }).catch((err)=>{
                this.disabled = false;
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
     .u-time-error{
        color: #ed3f14;
        font-size: 12px;
        left:0;
        top:40px;
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

    .u-custom-style{
        width:500px;
    }
    .u-upload-style{
        width:550px;
        position: absolute;
        left:300px;
        top:30px;
    }
    .u-delete-style{
        color:#499df1;
        cursor: pointer;
        padding-left:10px;
    }
    .u-coupon-contanier{
        .u-add-coupon-btn{
            padding-left:10px;
            color:#499DF1;
            font-size: 14px;
            line-height:32px;
            cursor: pointer;
        }
        .u-coupon-content{
            margin-top: 20px;
        }
       
    }

    .u-table{
		width:100%;
		border:1px solid #E1E6EB;
		border-collapse:collapse;
		font-size: 14px;
		td,th{
			height:40px;
			border:1px solid #E1E6EB;
			color: #666666;
			text-align: center;
		}
		.u-thead{
			background: #F5F6FA;
			th{
				color: #333333;
				font-weight: 400;
				
				
			}
		}
		.u-tabody{
			tr{
				&:hover{
					background: #F6F6F6;
				}
			}
		}
		
    }
    
    .u-number{
        span{
            width:20px;
            height:20px;
            display: inline-block;
            text-align: center;
            border:1px solid #cccccc;
            border-radius: 2px;
            vertical-align: middle;

        }
        .u-sub{
            line-height:16px;
        }
        .u-add{
            line-height:18px;
        }
        .ivu-input{
            height:20px;
        }
        .u-click-color{
            border:1px solid #499df1 !important;
            color:#499df1  !important;
        }
    }
    
    .u-send-quantity{
        width:40px;
        height:20px;
        display:inline-block;
        text-align:center;
        input{
            text-align: center;
        }
    }
}

</style>



