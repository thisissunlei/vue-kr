<template>
    <div class="g-add-manage">
        <div class="u-form">
            <Form ref="formItems" :model="formItem" :rules="ruleCustom"  label-position="top">
                <div class="u-part">
                    <div class="u-part-number">1</div>
                    <div class="u-part-title">确认会员信息</div>
                    <div class="u-part-tip">温馨提示：您可以添加非本企业员工作为管理员，此类管理员不占用会员名额</div>
                    <div class="u-part-line" ></div>
                    <div class="u-part-content">
                         <FormItem label="手机号" style="width:252px;display:inline-block;margin-right:30px;" prop="iconName">
                            <Input 
                                v-model="formItem.mbrPhone" 
                                placeholder="请输入手机号"
                            />
                        </FormItem>
                         <Button type="primary" class="u-search-btn"  @click="searchInfo">搜索</Button>
                        <div class="u-error-tip" v-if="ifError">该手机号尚未成为氪空间注册用户，继续“添加管理员”后会自动为TA创建账号</div>
                         <FormItem label="姓名" class="u-input" prop="iconName">
                            <Input 
                                v-model="formItem.mbrName" 
                                placeholder="请输入姓名"
                            />
                        </FormItem>
                        <FormItem label="邮箱" class="u-input" prop="iconName">
                            <Input 
                                v-model="formItem.mbrEmail" 
                                placeholder="请输入邮箱"
                            />
                        </FormItem>
                         <FormItem label="身份证号" class="u-input" >
                            <Input 
                                v-model="formItem.mbrIdCardNo" 
                                placeholder="请输入邮箱"
                            />
                        </FormItem>
                        <div class="u-label-text u-input">
                            <div class="u-label">
                                类型
                            </div>
                            <div class="u-text">
                               {{companyType}}
                            </div>
                        </div>
                    </div>
                   

                </div>
                <div class="u-part">
                    <div class="u-part-number">2</div>
                    <div class="u-part-title">管理的社区</div>
                    <div class="u-part-tip">温馨提示：如需取消该员工管理员身份，将所有社区取消勾选并点击“确认”即可</div>
                     <div class="u-community-check-list">
                        <div class="u-all-check">
                            <Checkbox v-model="checkAll" @on-change="onCheckAll" >全选</Checkbox>
                        </div>
                        <CheckboxGroup v-model="checkAllGroup" @on-change="checkGroupChange">
                            <Checkbox v-for="item in communityList" :key="item.cmtId" :label="item.cmtId">{{item.cmtName}}</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import LabelText from '~/components/LabelText';

export default {
    components:{
		LabelText,
	},
    data(){
        return{
            checkAll:false,
            checkAllGroup:[],
            checkList:"",
            communityList:[],
            ifError:false,
            formItem:{

            },
            ruleCustom:{
                mbrPhone:[
                    { required: true, message: '请输入手机号码', trigger:'change' }
                ],
                mbrName:[
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                mbrEmail:[
                    { required: true, message: '请输入邮箱', trigger: 'change' }
                ],
          },
          companyType:'',
             
        }
    },
    methods:{
        searchInfo(){
            let phone=this.formItem.phone;
            let form={
              phone: phone 
            }
            this.$http.get('get-customer-manager-user-detail', form).then((res)=>{
                this.formItem=Object.assign(this.formItem,res.data);
                this.companyType=res.data.mbrType==1?"在职员工":'非企业员工';
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        },
        checkGroupChange(data){
            let checkList=[].concat(this.checkAllGroup)
            this.checkList=checkList.join(',')
            if(checkList.length==this.communityList.length){
                this.checkAll=true; 
            }else{
                this.checkAll=false; 
            }
            this.$emit('checkData',this.checkList)
        },
        onCheckAll(){
          let checkList=[];
           if(this.checkAll){
              this.communityList.map((item)=>{
                    checkList.push(item.cmtId);
              })
              this.checkAllGroup=[].concat(checkList);
              this.checkList=checkList.join(',');
              
           }else{
               this.checkAllGroup=[];
               this.checkList="";
           }
           this.$emit('checkData',this.checkList)
              
        },
    }
}
</script>
<style lang="less">
.g-add-manage{
    .u-form{
        box-sizing: border-box;
        .u-error-tip{
            color:#ed3f14;
            font-size: 14px;
            margin-bottom: 20px;
            margin-top: -10px;
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


