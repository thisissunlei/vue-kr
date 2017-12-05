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
    &.u-right{
        margin-right:30px;  
    }
    &.u-right-none{
        margin-right:0;
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
            <FormItem label="交易流水号" class="u-input">
                <Input 
                    v-model="formItem.billNo" 
                    placeholder="请输入交易流水号" 
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
            <FormItem label="回款日期"  class="u-input u-date">
                <DatePicker 
                    type="date" 
                    v-model="formItem.billStartTime" 
                    placeholder="请选择开始日期" 
                    style="width: 250px;"
               ></DatePicker> 
                <span class="u-date-txt">至</span>
               <DatePicker 
                    type="date" 
                    v-model="formItem.billEndTime" 
                    placeholder="请选择结束日期" 
                    style="width: 250px;"
               ></DatePicker> 
            </FormItem>
            <FormItem label="回款方式" class="u-input u-right">
                  <Select 
                    v-model="formItem.billType" 
                    style="width:250px"
                    placeholder="请选择回款方式" 
                    >
                    <Option 
                        v-for="item in typeList" 
                        :value="item.value" 
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="收款账户" class="u-input u-right-none">
                <Input 
                    v-model="formItem.communityIds" 
                    placeholder="请输入收款账户" 
                    style="width: 250px"
               ></Input>
            </FormItem>
             
            
        </Form>
</template>	
<script>
export default{
    name:'highSearch',
    data (){
		return{
			formItem:{
                billNo:'',
                customerName:'',
                communityIds:'',
                billType:'',
                beginTime:'',
                endTime:'',
                billStartTime:'',
                billEndTime:'',
            },
            typeList:[
                {
                    value:'MEETING',
                    label:'银行转账'
                },
                {
                    value:'PRINT',
                    label:'支付宝 '
                },
                {
                    value:'CONTRACT',
                    label:'工位服务订单'
                },
            ],
            
		}
	}
	
}
</script>







