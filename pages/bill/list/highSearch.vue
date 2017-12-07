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
            <FormItem label="账单编号" class="u-input">
                <Input 
                    v-model="formItem.billNo" 
                    placeholder="请输入账单编号" 
                    style="width: 250px"
               ></Input> 
            </FormItem>
            <FormItem label="客户名称" class="u-input">
               <searchCompany 
                    style="width: 250px"
                    :onchange="onchange"
               ></searchCompany>  
            </FormItem>
            
            <FormItem label="社区名称" class="u-input">
                <Input 
                    v-model="formItem.communityIds" 
                    placeholder="请输入社区名称" 
                    style="width: 250px"
               ></Input>
            </FormItem>
             <FormItem label="账单类型" class="u-input">
                  <Select 
                    v-model="formItem.billType" 
                    style="width:250px"
                    placeholder="请输入账单类型" 
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
            </FormItem>
            <FormItem label="付款截止日期"  class="u-input u-date">
                <DatePicker 
                    type="date" 
                    v-model="formItem.billStartTime" 
                    placeholder="请选择付款开始日期" 
                    style="width: 250px;"
               ></DatePicker> 
                <span class="u-date-txt">至</span>
               <DatePicker 
                    type="date" 
                    v-model="formItem.billEndTime" 
                    placeholder="请选择付款截止日期" 
                    style="width: 250px;"
               ></DatePicker> 
            </FormItem>
             <FormItem label="账单状态" class="u-input">
                  <Select 
                    v-model="formItem.payStatus" 
                    style="width:250px"
                    placeholder="请输入账单状态" 
                >
                    <Option 
                        v-for="item in statusList" 
                        :value="item.value" 
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
        </Form>
</div>
</template>	
<script>
import searchCompany from '~/components/searchCompany';
export default{
    name:'highSearch',
    components:{
        searchCompany
    },
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
                    label:'会议室账单'
                },
                {
                    value:'PRINT',
                    label:'打印服务账单 '
                },
                {
                    value:'CONTRACT',
                    label:'工位服务订单'
                },
            ],
            statusList:[
                {
                    value:'待付款',
                    label:'待付款'
                },
                {
                    value:'已付款',
                    label:'已付款'
                }
            ]
		}
    },
    methods:{
        onchange(data){
            console.log('date-------',data)
        }
    }
	
}
</script>







