<template>

<div>
     
    <Form  :model="formItem" label-position="left"  inline class="equipment-of-group-searchform" >
           
           <FormItem label="楼层：">
                <Select
                    v-model="formItem.floor"
                    style="width:80px"
                    placeholder="请选择楼层"
                    clearable
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
            <FormItem label="门类型：">
                <Select
                    v-model="formItem.doorType"
                    style="width:120px"
                    placeholder="请选择门类型"
                    clearable
                    >
                    <Option
                        v-for="item in doorTypeOptions"
                        :value="item.value"
                        :key="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="设备ID：" class="u-input">
                 <Input
                    v-model="formItem.serialNo"
                    placeholder="请输入设备ID"
                    style="width: 150px"
               />
            </FormItem>
        </Form>
        
        <Button type="primary" icon="ios-search"  @click="searchEquipment" class="search-btn"></Button>

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

        this.getfloorOptions();
        
    },
    props:[
        "communityId","doorTypeOptions"
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
             
            this.$emit('searchEquipment',this.formItem);  
         },
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },

}
</script>
<style lang="less" >
 
    .equipment-of-group-searchform{
        display: inline-block;

    }
    .search-btn{
        vertical-align: top;
        margin-top: 33px;
    }


</style>