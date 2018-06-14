<template>

<div>
     
    <Form  :model="formItem" label-position="left" inline class="all-equipment-list-searchform">
            <FormItem label="社区：">
                <Select
                    clearable
                    v-model="formItem.communityId"
                    style="width:150px"
                    placeholder="请选择社区"
                    filterable
                    @on-change="onChangeCommunity"
                >
                    <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="智能硬件ID：">
                <Input v-model="formItem.deviceId" size="large" placeholder="智能硬件ID"></Input>
            </FormItem>
            <FormItem label="姓名：">
                <Input v-model="formItem.memberName" size="large" placeholder="姓名"></Input>
            </FormItem>
            <FormItem label="手机号：">
                <Input v-model="formItem.phone" size="large" placeholder="手机号"></Input>
            </FormItem>
            <FormItem label="日期：">
                <DatePicker 
                    v-model="formItem.time"
                    type="daterange" 
                    placement="bottom-end" 
                    placeholder="选择日期" 
                    style="width: 180px"
                >
                </DatePicker>
            </FormItem>
            <Button type="primary" icon="ios-search" @click="searchEquipment" class="search-btn">搜索</Button>
        </Form>
        

</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
           
            communityList :[],
			formItem : {
                // communityId : '',
                // deviceId:'',
                // memberName : '',
                // phone : '',

            },
          
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
        getCommunity(){
            
            this.$http.get('join-bill-community','').then((res)=>{

                this.communityList=res.data.items;

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        onChangeCommunity(communityId){

            this.formItem.communityId = communityId;
        },
        searchEquipment(){

            console.log("searchEquipment---")
            this.$emit("submitSearchData",this.formItem);
        }


    },
    updated:function(){
        this.$emit('formData', this.formItem);
    },
    

}
</script>
<style lang="less" >
.all-equipment-list-searchform{
    padding-left:20px;
    .search-btn{
       margin-top:32px;
   }
}
   


</style>