<template>

<div>
     
    <Form  :model="formItem" label-position="left">
           
           <FormItem label="楼层：">
                <Select
                    v-model="formItem.floor"
                    style="width:250px"
                    placeholder="请选择楼层"
                    
                    >
                    <Option
                        v-for="item in floorOptions"
                        :value="item.value"
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="客户名称：" class="u-input">
                 <Input
                    v-model="formItem.serialNo"
                    placeholder="请输入设备ID"
                    style="width: 250px"
               />
            </FormItem>
        </Form>
        <div>
            <Button type="primary" @click="searchEquipment">搜索</Button>
        </div>

</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
			formItem : {},
            floorOptions : [],
		}

    },
    mounted(){
    //   this.getfloorOptions();
        console.log("this.communityId",this.communityId);
        this.getfloorOptions();
        
    },
    props:[
        "communityId"
    ],
    methods:{

        getfloorOptions(){
            var  param = {communityId : this.communityId};
              this.$http.get('getFloorOptions',param).then((res)=>{
                var resData=res.data.floors;
                var floorOptions = [];
                for(var i=0;i<resData.length;i++){
                    floorOptions[i]={
                        label : resData[i],
                        value : resData[i],
                    }
                }
                this.floorOptions = floorOptions;

                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
         },
         searchEquipment(){
            console.log("this.formItem",this.formItem);
            this.$emit('searchEquipment',this.formItem);  
         },
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },

}
</script>
<style lang="less" >
 



</style>