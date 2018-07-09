<template>
    <div class="g-add-manage">
        <div class="u-form">
            <Form ref="formItems" :model="formItem" :rules="ruleCustom"  label-position="top">
                <div class="u-part">
                    <div class="u-part-number">1</div>
                    <div class="u-part-title">确认会员信息</div>
                    <div class="u-part-tip">温馨提示：您可以添加非本企业员工作为管理员，此类管理员不占用会员名额</div>
                    <div class="u-part-line"></div>
                    <div class="u-part-content">
                         <FormItem label="手机号" style="width:252px" prop="iconName">
                            <Input 
                                v-model="formItem.iconName" 
                                placeholder="请输入手机号"
                            />
                        </FormItem>
                    </div>
                   

                </div>
                <div class="u-part">
                    <div class="u-part-number">2</div>
                    <div class="u-part-title">管理的社区</div>
                    <div class="u-part-tip">温馨提示：如需取消该员工管理员身份，将所有社区取消勾选并点击“确认”即可</div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            formItem:{

            },
            ruleCustom:{
                iconName:[
                    { required: true, message: '请输入图标名称', trigger:'change' }
                ],
                destUrl:[
                    { required: true, message: '请输入跳转地址', trigger: 'change' }
                ],
                enable:[
                    { required: true, message: '请选择是否启用', trigger: 'change' }
                ],
                iconType:[
                    { required: true, message: '请选择图标类型', trigger:'change' }
                ],
                iconLocation:[
                    { required: true, message: '请选择Icon位置', trigger: 'change' }
                ],
                orderNum:[
                    { required: true, message: '请输入排序号', trigger: 'change' }
                ],
                
                iconDesc:[
                    { required: true, message: '请输入图片描述', trigger: 'change' }
                ],
          }
             
        }
    }
}
</script>
<style lang="less">
.g-add-manage{
    .u-form{
        box-sizing: border-box;
        form{
            width: 100%;

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
            height:286px;
            width:0;
            border-left:1px dashed #333333;
            position: absolute;
            left:14px;
            top:30px;
            display: none;
        }
        .u-part-content{
            padding-left:44px;
            box-sizing: border-box;
        }
    }
}
</style>


