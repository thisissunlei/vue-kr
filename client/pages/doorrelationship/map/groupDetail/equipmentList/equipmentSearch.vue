<template>

<div class="g-high-search g-payment-search">
    <Form  :model="formItem" label-position="left"  class="u-clearfix">
           
           <FormItem label="楼层">
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
        </Form>
</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
			formItem : {},
            floorOptions : []
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
         }
        
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },

}
</script>
<style lang="less" >
 



</style>