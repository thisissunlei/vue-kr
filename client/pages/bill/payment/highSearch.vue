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
}


</style>

<template>

<div class="g-high-search">
    <Form  :model="formItem" label-position="left"  class="u-clearfix">
            <FormItem label="交易流水号" class="u-input">
                <Input
                    v-model="formItem.tradeNo"
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
                    v-model="formItem.starttime"
                    placeholder="请选择开始日期"
                    style="width: 250px;"
                     @on-change="startChange"
               ></DatePicker>
                <span class="u-date-txt">至</span>
               <DatePicker
                    type="date"
                    v-model="formItem.endtime"
                    placeholder="请选择结束日期"
                    style="width: 250px;"
                    @on-change="endChange"
               ></DatePicker>
            </FormItem>
            <FormItem label="支付方式" class="u-input u-right">
                  <Select
                    v-model="formItem.payWay"
                    style="width:250px"
                    placeholder="请选择支付方式"
                    >
                    <Option
                        v-for="item in payWay"
                        :value="item.value"
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="收款账户" class="u-input u-right-none">
                <Input
                    v-model="formItem.receiveAccount"
                    placeholder="请输入收款账户"
                    style="width: 250px"
               ></Input>
            </FormItem>
        </Form>
</div>

</template>

<script>

export default{
    name:'highSearch',
    data (){
		return{
			formItem:{
                tradeNo:'',
                starttime:"",
                endtime:'',
                startTime:'',
                endTime:'',
                payWay:'',
                customerName:'',
                receiveAccount:''
            },
            payWay:[    
                {
                    value:'NONE',
                    label:'社区变更'
                },
                {
                    value:'BANKTRANSFER',
                    label:'银行转账 '
                },
                {
                    value:'ALIAPPPAY',
                    label:'支付宝app'
                },
                {
                    value:'WXPAY',
                    label:'微信 '
                },
                {
                    value:'DEP_RENT',
                    label:'押金转租 '
                },
                 {
                    value:'TRANSFER',
                    label:'转移'
                },
                {
                    value:'RENT_DEP',
                    label:'租金转押'
                },
                {
                    value:'ALIWEBPAY',
                    label:'支付宝网银'
                },
                {
                    value:'BANKONLINE',
                    label:'网银'
                },
                {
                    value:'BANLANCE',
                    label:'余额支付 '
                },
                {
                    value:'FUNDS_TRANSFER',
                    label:'资金转移'
                }
            ],

		}

    },
     methods:{

        startChange(data){
            this.formItem.startTime=data;
        },
        endChange(date){
            this.formItem.endTime=date;
        }
        
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },

}
</script>
