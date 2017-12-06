<style lang='less'>
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .bill-search{
        display:inline-block;
        padding-left:32px;
        .u-date-txt{
            padding:0 25px;
            font-size: 14px;
            color: #666;
        }
    }

</style>  
    <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="订单编号" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="formItem.orderNum" 
                        placeholder="请输入订单编号"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="客户名称" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="formItem.customerName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="社区名称" class='bill-search-class'> 
                    <Select 
                        v-model="formItem.communityName" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                    >
                        <Option 
                            v-for="item in statusList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="订单类型" 
                    class='bill-search-class'>
                    <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入订单类型" 
                        style="width: 252px"
                    >
                        <Option 
                            v-for="item in statusList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="订单状态" 
                    class='bill-search-class'>
                    <Select 
                        v-model="formItem.orderStatus" 
                        placeholder="请输入订单状态" 
                        style="width: 252px"
                    >
                        <Option 
                            v-for="item in statusList" 
                            :value="item.value" 
                            :key="item.value"
                         >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                    <Form-item label="支付状态" 
                    class='bill-search-class'>
                    <Select 
                        v-model="formItem.payStatus" 
                        placeholder="请输入支付状态" 
                        style="width: 252px"
                    >
                        <Option 
                            v-for="item in statusList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <FormItem label="创建日期" class="bill-search">
                    <DatePicker 
                        v-model="formItem.cStartDate"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                ></DatePicker>
                <span class="u-date-txt">至</span>
                <DatePicker 
                        v-model="formItem.cEndDate"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                ></DatePicker>   
             </FormItem>
            </Form>
</template>
<script>
    export default{
        data (){
            return{
                formItem:{
                   orderNum:'',
                   customerName:'',
                   payStatus:'',
                   orderStatus:'',
                   orderType:'',
                   communityName:'',
                   cEndDate:'',
                   cStartDate:''
                },
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
    }
</script>

