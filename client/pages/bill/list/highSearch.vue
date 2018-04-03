
<template>
<div class="g-high-search">
    <Form  :model="formItem" label-position="left"  class="u-clearfix">
            <FormItem label="账单编号" class="u-input">
                <Input
                    v-model="formItem.billNo"
                    placeholder="请输入账单编号"
                    style="width: 250px"
               />
            </FormItem>
            <FormItem label="客户名称" class="u-input">
                 <Input
                    v-model="formItem.customerName"
                    placeholder="请输入客户名称"
                    style="width: 250px"
               />
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
            <FormItem label="账单日"  class="u-input u-date">
                <DatePicker
                    type="date"
                    v-model="formItem.startTime"
                    placeholder="请选择开始日期"
                    style="width: 250px;"
                    @on-change="startChange"
               ></DatePicker>
                <span class="u-date-txt">至</span>
               <DatePicker
                    type="date"
                     v-model="formItem.endTime"
                    placeholder="请选择截止日期"
                    style="width: 250px;"
                    @on-change="endChange"
               ></DatePicker>
            </FormItem>
            <FormItem label="付款截止日期"  class="u-input u-date">
                <DatePicker
                    type="date"
                    v-model="formItem.DueStartTime"
                    placeholder="请选择开始日期"
                    style="width: 250px;"
                    @on-change="dueStartChange"
               ></DatePicker>
                <span class="u-date-txt">至</span>
               <DatePicker
                    type="date"
                     v-model="formItem.DueEndTime"
                    placeholder="请选择截止日期"
                    style="width: 250px;"
                    @on-change="dueEndChange"
               ></DatePicker>
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
                billNo:'',
                customerName:'',
                communityId:'',
                billType:'',
                startTime:'',
                endTime:'',
                DueEndTime:'',
                DueStartTime:''

            },
            statusList:[
                {
                    value:'WAIT',
                    label:'待付款'
                },
                {
                    value:'PAID',
                    label:'已付清'
                },
                 {
                    value:'PAYMENT',
                    label:'未付清'
                },
            ],
		}
    },
     props:{
         typeList:Array,
         communityList:Array
    },
    methods:{
        startChange(date){
            this.formItem.billStartTime=date;
        },
        endChange(date){
            this.formItem.billEndTime=date;
        },
        dueStartChange(date){
            this.formItem.billDueStartTime=date;
        },
        dueEndChange(date){
            this.formItem.billDueEndTime=date;
        }
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },

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