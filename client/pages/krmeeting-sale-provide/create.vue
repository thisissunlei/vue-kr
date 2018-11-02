<template>
    <div class="g-create-meeting">
         <SectionTitle title="新建发放"></SectionTitle>
         <Form ref="formItems" :model="formItem" :rules="ruleCustom">
                <div class="m-detail-content">
                    <FormItem label="发放说明" class="u-input"  prop="desc">
                        <Input 
                            v-model="formItem.descr" 
                            placeholder="请输入" 
                            style="width:250px"
                            :maxlength="15"
                        />
                     </FormItem>
                    <FormItem label="发放时间" class="u-input" style="width:1000px" prop="timeType">
                            <RadioGroup v-model="formItem.timeType" style="width:1000px">
                                <Radio label="0">
                                    <span>即时</span>
                                </Radio>
                                <Radio label="1">
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

                    <FormItem label="发放对象" class="u-input" style="width:1000px;position:relative;" prop="userType">
                            <RadioGroup v-model="formItem.userType" style="width:1000px">
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
                                        with-credentials
                                        :isPut="true"
                                        action="/api/op/kmcoupon/provide/add"
                                        v-if="!file"
                                        >
                                        <Button icon="ios-cloud-upload-outline" >上传文件</Button>
                                    </Upload>
                                   <div style="margin-top:3px;" v-if="file!=null">{{file.name}} <span class="u-delete-style" @click="removeFile">删除</span></div>
                                 </div>

                            </RadioGroup> 
                    </FormItem>
                    <div class="u-coupon-contanier">
                             <FormItem label="优惠券批次" style="width:100%" >
                                 <Input 
                                        v-model="batchNo" 
                                        placeholder="输入优惠券批次"
                                        style="width:278px"
                                 />
                                 <span class="u-add-coupon-btn" @click="addCoupon">添加</span>
                                 <div class="u-coupon-content" >
                                     <!-- v-if="couponList.length>0" -->
                                     <table class="u-table">
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
                                                 <td>{{changeTime('YYYY-MM-DD HH:mm:ss',item.effectAt)}}-{{changeTime('YYYY-MM-DD',item.expireAt)}}</td>
                                                 <td>{{changeTime('YYYY-MM-DD HH:mm:ss',item.ctime)}}</td>
                                                 <td>{{item.creatorName}}</td>
                                                 <td>
                                                     <div class="u-number">
                                                         <span>-</span>
                                                          <Input 
                                                                v-model="item.sendQuantity"
                                                                type="text"
                                                                style="width:50px;height:20px;display:inline-block;"
                                                            />
                                                          <span>+</span>
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
                        </div>
                    
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
                userType:'CUSTOM',
            },
            form:{},
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
            file:null,
            couponList:[],
            batchNo:'',
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
        this.couponList=[{
            descr:'111'
        }]
    },
    methods:{
        changeTime(format,item){
            if(item){
                return dateUtils.strFormatToDate(format, item)
            }
        },
         addCoupon(){
                if(!this.batchNo){
                    this.$Notice.error({
                    title:'优惠券批次不能为空'
                    });
                    return;
                }
                this.$http.get('get-kmcoupon-detail-by-batchNo', {batchNo:this.batchNo}).then((res)=>{
                   this.couponList.push(res.data)
                }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                    });
                });
        },
       
        removeFile(){
            this.file=null;
        },
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
            line-height:20px;
            display: inline-block;
            text-align: center;
            border:1px solid #cccccc;
            border-radius: 2px;
            vertical-align: middle;

        }
        .ivu-input{
            height:20px;
        }
    }
}

</style>



