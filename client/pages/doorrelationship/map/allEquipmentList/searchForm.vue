<template>

<div>
     
    <Form  :model="formItem" label-position="left" inline class="all-equipment-list-searchform">
            <FormItem label="社区：">
                <Select
                    v-model="communityId"
                    style="width:150px"
                    placeholder="请选择社区"
                    filterable
                    clearable
                    @on-change="onChangeCommunity"
                >
                    <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
                </Select>
            </FormItem>
           <FormItem label="楼层：">
                <Select
                    v-model="formItem.floor"
                    style="width:150px"
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
            <FormItem label="门类型：">
                <Select
                    v-model="formItem.floor"
                    style="width:150px"
                    placeholder="请选择门类型"
                    
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
            <FormItem label="客户名称：" >
                 <Input
                    v-model="formItem.serialNo"
                    placeholder="请输入设备ID"
                    style="width: 150px"
               />
            </FormItem>
        </Form>
        
        <Button type="primary" icon="ios-search" @click="searchEquipment" class="search-btn">搜索</Button>
        <Button type="primary" icon="ios-plus-outline"  @click="addEquipmentToGroup"  class="search-btn">添加</Button>

</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
            communityId : null,
            communityList :[],
			formItem : {},
            floorOptions : [],
            doorTypeOptions:[
                {value:"GATE",label : "大门"},
                {value:"MEETING",label : "会议室"},
                {value:"OFFICE",label : "独立办公室"}
            ]
		}

    },
    mounted(){
 
        this.getCommunity();
        
    },
    props:[
        
    ],
    components: {
     
    },
    methods:{

        getfloorOptions(param){
            
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
        getCommunity(){
            
            this.$http.get('join-bill-community','').then((res)=>{

                this.communityList=res.data.items;

                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        onChangeCommunity(option){
            var params = {communityId : option}
            this.getfloorOptions(params);
        },
        addEquipmentToGroup(){
            this.$emit("addEquipmentToGroup")
        }
    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },

}
</script>
<style lang="less" >
    .all-equipment-list-searchform{
        display: inline-block;
    }
    .search-btn{
        display: inline-block;
        margin-top: 33px;
        margin: 33px 10px 0 0;
        vertical-align: top;
    }



</style>