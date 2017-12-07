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
            <Form ref="formItem" :model="formItem" :rules="ruleCustom"  label-position="top">
                <Form-item label="合同编号" prop="orderNum"  class='bill-search-class'>
                    <i-input 
                        v-model="formItem.orderNum" 
                        placeholder="请输入合同编号"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="客户名称" prop="customerName" class='bill-search-class'>
                    <i-input 
                        v-model="formItem.customerName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="社区名称" prop="communityName" class='bill-search-class'> 
                    <Select 
                        v-model="formItem.communityName" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.id" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="合同类型" prop="orderType" class='bill-search-class' v-show='type'>
                    <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入订单类型" 
                        style="width: 252px"
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="合同状态" prop="orderStatus" class='bill-search-class'>
                    <Select 
                        v-model="formItem.orderStatus" 
                        placeholder="请输入合同状态" 
                        style="width: 252px"
                    >
                        <Option 
                            v-for="item in orderList" 
                            :value="item.value" 
                            :key="item.value"
                         >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                  
                <FormItem label="创建日期" class="bill-search" prop = "cStartDate">
                    <DatePicker 
                        v-model="formItem.cStartDate"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                    ></DatePicker>
                </FormItem>
                <span class="u-date-txt">至</span>
                <FormItem label="创建日期" class="bill-search" prop = "cEndDate">
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
    import axios from 'kr/axios';
    export default{
        props:['mask'],
        data (){
            const validateStart = (rule, value, callback) => {
                console.log(value,"PPPPPPP",rule)
                if (value && this.formItem.cEndDate) {
                    
                    callback(new Error('Please enter your password again'));
                } else {
                    callback();
                }
            };
            const validateEnd = (rule, value, callback) => {
               console.log(value,"=========")
                // if (value === '') {
                //     callback(new Error('Please enter your password again'));
                // }  else {
                //     callback();
                // }
            };
            const validateNum = (rule, value, callback) =>{
                console.log(value,"--------")
            }
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
                 ruleCustom: {
                    orderNum:[
                        { validator: validateNum, trigger: 'change' }
                    ],
                    cEndDate: [
                        { validator: validateStart, trigger: 'change' }
                    ],
                    cStartDate: [
                        { validator: validateEnd, trigger: 'change' }
                    ],
                },
                type:this.mask=='join'?true:false,
                orderList:[
                    {
                        value:'NOT_EFFECTIVE',
                        label:'未生效'
                    },
                    {
                        value:'EFFECTIVE',
                        label:'已生效'
                    },
                    {
                        value:'INVALID',
                        label:'已作废'
                    }
                ],
                typeList:[
                    {
                        value:'IN',
                        label:'入驻服务订单'
                    },
                    {
                        value:'INCREASE',
                        label:'增值服务订单'
                    },
                    {
                        value:'CONTINUE',
                        label:'续租服务订单'
                    }
                ],
                communityList:[]
            }
        },
        created:function(){
            var _this=this;
            axios.get('join-bill-community','', r => {    
                   _this.communityList=r.data.items 
                }, e => {
                  _this.$Message.info(e);
            })
        },
        updated:function(){
            this.$emit('bindData', this.formItem);
        },
    }
</script>

