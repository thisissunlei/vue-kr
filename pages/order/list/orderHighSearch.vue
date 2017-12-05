<style lang="less"> 
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

    
</style>
<template>
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
                    v-model="formItem.beginTime"
                    type="date" 
                    placeholder="请选择开始时间" 
                    style="width: 250px"
               ></DatePicker>
               <span class="u-date-txt">至</span>
               <DatePicker 
                    v-model="formItem.endTime"
                    type="date" 
                    placeholder="请选择结束时间" 
                    style="width: 250px"
               ></DatePicker>   
            </FormItem>
            <FormItem label="社区名称" class="u-input">
               <Select 
                    v-model="formItem.communityIds" 
                    placeholder="请输入社区名称" 
                    style="width: 250px"
               >
                <Option value="beijing">New York</Option>
               </Select> 
            </FormItem>
        </Form>
</template>	
<script>
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
            }
		}
	}
}
</script>







