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
        <FormItem label="社区名称" class="u-input">
                  <Select 
                        v-model="formItem.cmtId" 
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
            <FormItem label="是否已设管理员" class="u-input">
                  <Select 
                    v-model="formItem.manager" 
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
    </Form>
</div>
</template>	
<script>
export default{
    name:'highSearch',
    data (){
		return{
			formItem:{
                manager:'',
                cmtId:'',
            },
            typeList:[
                {
                    value:-1,
                    label:'全部'
                },
                {
                    value:0,
                    label:'未设置'
                },
                {
                    value:1,
                    label:'已设置'
                },
            ],
            communityList:[]
		}
    },
    mounted:function(){
        this.$http.get('join-bill-community','', r => {    
                this.communityList=r.data.items 
            }, e => {
                this.$Message.info(e);
        })
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },
	
}
</script>







