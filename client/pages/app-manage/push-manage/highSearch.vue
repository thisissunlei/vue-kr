<template>

<div class="g-high-search">

    <Form  :model="formItem" label-position="left"  class="u-clearfix">
    
            <FormItem label="推送目标用户" class="u-input">
                <Select
                    v-model="formItem.cmtId"
                    filterable
                    remote
                    :remote-method="remoteCommunityMethod"
                    :loading="communityLoading"
                    placeholder="请选择"
                    :label-in-value="labelInValue"
                    clearable
                    >
                    <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="点击推送后续动作" class="u-input">
                   <Select
                        clearable
                        v-model="formItem.jumpType"
                        placeholder="请选择"
                        >
                        <Option v-for="(option, index) in jumpTypeList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
            </FormItem>
            
        </Form>
        
</div>

</template>	

<script>

export default{
    name:'highSearch',
    data(){
        return{
            labelInValue:true,
            formItem:{
                customerName:'',
                communityId:''
            },
            communityList:[],
            jumpTypeList:[
                {
                    label:'启动页APP（至首页）',
                    value:'HOMEPAGE'
                },
                {
                    label:'跳转活动',
                    value:'ACTIVITY'
                },
                {
                    label:'跳转外链',
                    value:'HTML'
                },
            ],
        }
        
    },
    mounted:function(){
         this.getCommunityList(' ')
    },
    methods:{
        //社区
        remoteCommunityMethod(query){
            if (query!== '') {
                this.communityLoading = true;
                setTimeout(() => {
                    this.communityLoading = false;
                    this.getCommunityList(query)
                }, 200);
            } else {
                this.getCommunityList(' ')

            }
        },
         //社区
        getCommunityList(name){
           let params = {
                    cmtName:name
                }
            let list = [];
            let _this = this;
            this.$http.get('get-community-new-list', params).then((res)=>{
                list = res.data.cmts;
                list.map((item)=>{
                    let obj =item;
                    obj.label = item.cmtName;
                    obj.value = item.cmtId;
                    return obj;
                });
                _this.communityList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
            return list;
            
        },
    },
    updated:function(){
    
        this.$emit('formData', this.formItem);
        
    }
}
</script>
<style lang="less"> 

.g-high-search{

    form{
        width:540px;
        margin:0 auto;
    }
    .u-clearfix { zoom:1; }
    .u-clearfix:after {
        clear: both;
        content: '.';
        height: 0;
        display: block;
        visibility: hidden;
    }
    
    .u-input{
        width:250px;
        float:left;
        margin-bottom:10px;
        &:nth-child(2n-1){
            margin-right:30px;
        }
    }

    .u-date{
    
        width:530px; 
        
        label{
            width:100%;
            display: block;
        }
        
        .u-date-txt{
            font-size: 14px;
            color: #666666;
            display: inline-block;
            width:30px;
            text-align: center
        }
        
    }
}   

</style>