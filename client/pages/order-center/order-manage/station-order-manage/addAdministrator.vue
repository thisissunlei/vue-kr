<template>
    <div class="g-add-manager">
        <div class="u-form">
            <Form ref="formItems" :model="formItem" :rules="ruleCustom"  label-position="top">
                <div class="u-part">
                    <div class="u-part-title">
                        管理员可在APP中查看和支付账单，可在官网添加会员、分配会员门禁权限、申请发票等，<span style="color:red;">请与客户确认无误后再填写</span>
                    </div>
                    <div class="u-part-content">
                         <FormItem label="手机号" style="width:252px;display:inline-block;margin-right:30px;" prop="phone">
                            <Input 
                                v-model="formItem.phone" 
                                placeholder="请输入手机号"
                                :maxlength='11'
                                
                            />
                        </FormItem>
                        <Button type="primary" class="u-search-btn"  @click="searchInfo">搜索</Button>
                        <div v-if="ifShow">       
                            <FormItem label="姓名" class="u-input" prop="name">
                                <Input 
                                    v-model="formItem.name" 
                                    placeholder="请输入姓名"
                                />
                            </FormItem>
                            <FormItem label="邮箱" class="u-input" prop="email">
                                <Input 
                                    v-model="formItem.email" 
                                    placeholder="请输入邮箱"
                                    type="email"
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import LabelText from '~/components/LabelText';

export default {
    props:{
        customerId:{
            type:[Number,String]
        }
    },
    components:{
		LabelText,
    },
    data(){

        const validatePhone= (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(!value){
                    callback(new Error('请输入手机号码'));
                }else if (value&&!reg.test(value)) {
                    callback(new Error('请输入数字'));
                }else{
                    callback();
                }
        };

        return{
            checkAll:false,
            ifCheckError:false,
            checkAllGroup:[],
            checkList:"",
            communityList:[],
            ifShow:false,
            formItem:{
               phone:'',
               name:'',
               email:'',
            },
            ruleCustom:{
                phone:[
                    {validator:validatePhone,required: true,  trigger:'change' }
                ],
                name:[
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                email:[
                    {required: true, message: '请输入邮箱', trigger: 'change' }
                ],
          }       
        }
    },
    mounted() {
        this.$emit('submitFn', this.handleSubmit);
    },
    methods:{
        searchInfo(){
            let phone=this.formItem.phone;
            let form={
              mbrPhone: phone ,
              customerId:this.customerId
            }
            this.$http.get('search-phone-member', form).then((res)=>{
                let data=Object.assign({},res.data);
                this.formItem.name=data.name;
                this.formItem.email=data.email;
                this.ifShow=true;      
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        },
        handleSubmit:function(callback) {
			this.$refs.formItems.validate((valid) => {
				if (valid) {
                    callback && callback();
				}
			})
        }
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },
}
</script>
<style lang="less">
.g-add-manager{
    .u-form{
        box-sizing: border-box;
        .u-error-tip{
            color:#ed3f14;
            font-size: 14px;
            margin-bottom: 20px;
            margin-top: -10px;
        }
        .u-card-tip{
            color:#ed3f14;
            font-size: 12px;
            margin-top: -18px;
        }
        .u-card-error-tip{
            .ivu-input{
                border: 1px solid #ed3f14;
                box-shadow: none;
                &:focus{
                    box-shadow: 0 0 0 2px rgba(237,63,20,.2);
                }
            }

        }    
        .u-error-check{
            color:#ed3f14;
            font-size: 14px;
            margin-bottom: 10px;
            padding-left: 44px;
        }
        form{
            width: 100%;
            padding-left:10px;
            box-sizing: border-box;
        }
        .u-input{
            width:252px;
            display: inline-block;
            margin-right:30px;
        }
        .u-part{
            display: inline-block;
            width:100%;
            position: relative;
        }
        .u-part-number{
            width:28px;
            height:28px;
            line-height: 26px;
            text-align: center;
            font-size: 14px;
            color: #333333;
            border-radius: 100% 100%;
            border: 1px solid #333333;
            display: inline-block;
            margin-right:15px;
        
        }
        .u-part-title{
           display: inline-block;
           line-height: 30px;
           font-size: 14px;
           color: #333333;
           font-weight: bold;
           padding-left: 44px;
           margin-bottom: 20px;
        }
        .u-part-tip{
            font-size: 12px;
            color: #999999;
            text-indent:44px;
            margin-bottom:10px;
        }
        .u-part-line{
            height:266px;
            width:0;
            border-left:1px dashed #333333;
            position: absolute;
            left:14px;
            top:30px;
        }
        .u-part2-line{
            width:0;
            height:100%;
            border-left:1px dashed #333333;
            position: absolute;
            left:14px;
            top:30px;
            display: inline-block;
        }
        .u-part-content{
            padding-left:44px;
            box-sizing: border-box;
        }
        .u-community-check-list{
            margin-top:16px;
            padding:0 46px;
            .u-all-check{
                margin-bottom:12px;
            }
        }
        .u-search-btn{
            height: 30px;
            margin-top: 24px;
            line-height: 15px;
        }
        .u-label-text{
             font-size: 12px;
            color: #495060;
            .u-text{
                line-height: 40px;
            }
        }
        
    }
}
</style>


