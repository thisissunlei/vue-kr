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
<template>
<div class="g-high-search">
    <Form  :model="formItem" label-position="left"  class="u-clearfix">
            <FormItem label="客户名称" class="u-input">
               <Input 
                    v-model="formItem.customerName" 
                    placeholder="请输入客户名称" 
                    style="width: 250px"
               ></Input>
            </FormItem>
            <FormItem label="社区名称" class="u-input">
                    <Select 
                        v-model="formItem.communityId" 
                        style="width:250px"
                        placeholder="请选择社区" 
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.id" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
        </Form>
</div>
</template>	
<script>
import axios from 'kr/axios';

export default{
    name:'highSearch',
    data(){
		return{
			formItem:{
                customerName:'',
                communityId:''
            },
            communityList:[],
		}
    },
    created:function(){
        axios.get('join-bill-community','', r => {    
                this.communityList=r.data.items 
            }, e => {
                this.$Message.info(e);
        })
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },
	
}
</script>







