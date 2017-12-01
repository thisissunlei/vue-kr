<style lang="less"> 
    label{
        width:250px;
        line-height: 14px;
        color: #333333;
        padding-bottom: 10px;
        display: inline-block;
    }
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
    
</style>
<template>
	<form class="u-clearfix">
            <div class="u-input">
               <label>账单编号</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入账单编号" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>客户名称</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入客户名称" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>社区名称</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入社区名称" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>账单类型</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入账单类型" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>账单金额</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入账单金额" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>结账金额</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入结账金额" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>付款截止日期</label>
               <DatePicker 
                    type="date" 
                    placeholder="请选择付款截止日期" 
                    style="width: 250px"
               ></DatePicker> 
            </div>
            <div class="u-input">
               <label>账单状态</label>
                <Select 
                    v-model="model1" 
                    style="width:250px"
                    placeholder="请输入账单状态" 
                >
                    <Option 
                        v-for="item in typeList" 
                        :value="item.value" 
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </div>
        </form>
</template>	
<script>
export default{
	name:'highSearch',
	data (){
		return{
			typeList:[
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
	}
}
</script>







