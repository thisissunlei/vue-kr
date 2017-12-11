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
            <FormItem label="订单编号" class="u-input">
                <Input 
                    v-model="formItem.orderNo" 
                    placeholder="请输入订单编号" 
                    style="width: 250px"
               ></Input> 
            </FormItem>
            <FormItem label="客户名称" class="u-input">
               <Input 
                    v-model="formItem.customerName" 
                    placeholder="请输入客户名称" 
                    style="width: 250px"
               ></Input>  
            </FormItem>
            
            <FormItem label="收入确认时间" class="u-input  u-date">
               <DatePicker 
                    type="date" 
                    v-model="formItem.startTime" 
                    placeholder="请选择付款开始日期" 
                    style="width: 250px;"
                    @on-change="startChange"
               ></DatePicker> 
               <span class="u-date-txt">至</span>
               <DatePicker 
                    type="date" 
                     v-model="formItem.endTime" 
                    placeholder="请选择付款截止日期" 
                    style="width: 250px;"
                    @on-change="endChange"
               ></DatePicker>   
            </FormItem>
            <FormItem label="社区名称" class="u-input">
                 <Select 
                        v-model="formItem.communityIds" 
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
	data (){
		return{
			formItem:{
                orderNo:'',
                customerName:'',
                communityIds:'',
                beginTime:'',
                endTime:''
            },
            communityList:[]
		}
    },
    created:function(){
        axios.get('join-bill-community','', r => {    
                this.communityList=r.data.items 
            }, e => {
                this.$Message.info(e);
        })
    },
    methods:{
        startChange(date){
            this.formItem.billStartTime=date;
        },
        endChange(date){
            this.formItem.billEndTime=date;
        }
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },
}
</script>







