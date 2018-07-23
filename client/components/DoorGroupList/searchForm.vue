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
            <FormItem label="公司：">
                <Select
                    clearable
                    v-model="formItem.customerId"
                    style="width:150px"
                    placeholder="请选择公司"
                    filterable
                    @on-change="onChangeCompanys"
                >
                    <Option  v-for="item in companyList" :value="item.id" :key="item.id"> {{ item.companyName }}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="组名称：">
                <Input v-model="formItem.name" size="large" placeholder="组名称" @on-change="inputchange"></Input>
            </FormItem>
           
            
            <Button type="primary" icon="ios-plus-outline" @click="addGroupsContinue" class="search-btn">添加并继续</Button>
            <Button type="primary" icon="ios-close-outline" @click="addGroupsClose" class="search-btn">添加并关闭</Button>
        </Form>
        

</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
           companyList:[],
            communityList :[],
			formItem : {

            },
          
		}

    },
    mounted(){

        this.formItem.deviceId = this.$route.query.deviceId || "";
        this.getCommunity();
        this.getCompany();
        
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
        getCompany(){
            
            this.$http.get('get-company-list','').then((res)=>{

                this.companyList=res.data.items;

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        onChangeCommunity(communityId){

            this.formItem.communityId = communityId;
            this.$emit("submitSearchData",this.formItem);

        },
        onChangeCompanys(customerId){
            this.formItem.customerId = customerId;
            this.$emit("submitSearchData",this.formItem);

        },
        inputchange(e){
            this.formItem.name = e.currentTarget.value;
            this.$emit("submitSearchData",this.formItem);
        },
       
        updated:function(){
            this.$emit('formData', this.formItem);
        },
        deleteRelations:function(){
            this.$emit('deleteRelations');
        },
        addGroupsContinue:function(){
            this.addGroups("continue")
        },
        addGroupsClose:function(){
            this.addGroups("close")
        },
        addGroups: function(param){
            this.$emit('addGroups',param);
        }


    },
    
    
    

}
</script>
<style lang="less" >
.all-equipment-list-searchform{
    padding-left:20px;
    .search-btn{
       margin:32px 10px 0 0 ;
   }
   .float-right{
       float : right;
        .delete-relations{
            margin:32px 12px 0 0 ;
        }
   }
   
}
   


</style>