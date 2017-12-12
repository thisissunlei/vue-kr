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
    <Form  
        ref="formValidate" 
        :model="formItem" 
        :rules="ruleValidate" 
        label-position="left"  
        class="u-clearfix"
        
    >
            <FormItem label="客户名称"  prop="customerId" class="u-input">
                <SearchCompany
                    :test="formItem" 
                    style="width: 250px"
                    :onchange="onchange"
                ></SearchCompany>
            </FormItem>
             <FormItem label="社区名称"  prop="communityId" class="u-input">
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
            <FormItem label="含税收入" prop="amount" class="u-input">
                <Input 
                    v-model="formItem.amount" 
                    placeholder="请输入含税收入" 
                    style="width: 250px"
               ></Input> 
            </FormItem>
            <FormItem label="确认收入日期" prop="dealDate" class="u-input">
                <DatePicker 
                    v-model="formItem.startTime"
                    type="date" 
                    placeholder="请选择确认收入日期" 
                    style="width: 250px;"
                    @on-change="dateChange"
               ></DatePicker>
            </FormItem>
            <FormItem label="收入类型"  prop="incomeType" class="u-input">
                  <Select 
                    v-model="formItem.incomeType" 
                    style="width:250px"
                    placeholder="请选择账单类型" 
                >
                    <Option 
                        v-for="item in incomeType" 
                        :value="item.value" 
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            </FormItem>
        </Form>
</div>
</template>	
<script>
import axios from '~/plugins/http';
import SearchCompany from '~/components/SearchCompany';
import SelectCommunities from '~/components/SelectCommunities';

export default{
    name:'highSearch',
    components:{
        SelectCommunities,
        SearchCompany
    },
    data (){
		return{
			formItem:{
                amount:'',
                communityId:'',
                customerId:'',
                dealDate:'',
                incomeType:'',
                startTime:''
            },
            formValidate:'formValidate',
            incomeType:[
                {
                    value:'MEETING',
                    label:'会议室服务费'
                },
                {
                    value:'PRINT',
                    label:'打印服务费'
                },
                {
                    value:'RENT',
                    label:'工位租金'
                },
            ],
            communityList:[

            ],
            ruleValidate:{
                customerId: [
                        { required: true, message: '请选择客户名称'}
                    ],
                communityId: [
                        { required: true, message: '请选择社区' }
                    ],
                amount: [
                        { required: true, message: '请输入含税收入' }
                    ],
                dealDate: [
                        { required: true, message: '请选择确认收入日期' }
                    ],
                incomeType: [
                        { required: true, message: '请选择账单类型' }
                    ],
            }
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
        onchange(data){
            this.formItem.customerId=data;
        },
        dateChange(date){
            this.formItem.dealDate=date;
        }
        
    },
    updated:function(){
       let callback=this.$refs[this.formValidate].validate;
       let cancel=this.$refs[this.formValidate].resetFields;
        this.$emit('formData', this.formItem,callback,cancel);
    },
	
}
</script>







