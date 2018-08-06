<template>

<div>
     
    <Form  :model="formItem" label-position="left" inline class="member-list-searchform">
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
                    @on-change="onChangeCompanys"
                    filterable
                    remote
                    :remote-method="getCompany"
                    :loading="loadingCompany"
                >
                    <Option  v-for="item in companyList" :value="item.id" :key="item.id"> {{ item.company }}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="姓名：">
                <Input v-model="formItem.name" size="large" placeholder="姓名" @on-change="inputNameChange"></Input>
            </FormItem>
            <FormItem label="电话：">
                <Input v-model="formItem.phone" size="large" placeholder="电话" @on-change="inputPhoneChange"></Input>
            </FormItem>
           
            
            <Button type="primary" icon="ios-plus-outline" @click="addMemberContinue" class="search-btn">添加并继续</Button>
            <Button type="primary" icon="ios-close-outline" @click="addMemberClose" class="search-btn">添加并关闭</Button>
        </Form>
        

</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
            loadingCompany :false,
           companyList:[],
            communityList :[],
            companyName:'',
			formItem : {

            },
          
		}

    },
    mounted(){

        this.getCommunity();
        this.getCompany('');
        
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
        getCompany(value){
            this.loadingCompany = true;
            var param = {
                companyName : value
            }
            this.$http.get('get-samrt-hard-company-list',param).then((res)=>{
                this.loadingCompany = false;

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
        inputNameChange(e){
            this.formItem.name = e.currentTarget.value;
            this.$emit("submitSearchData",this.formItem);
        },
        inputPhoneChange(e){
            this.formItem.phone = e.currentTarget.value;
            this.$emit("submitSearchData",this.formItem);
        },
       
        updated:function(){
            this.$emit('formData', this.formItem);
        },
        deleteRelations:function(){
            this.$emit('deleteRelations');
        },
        addMemberContinue:function(){
            this.addMember("continue")
        },
        addMemberClose:function(){
            this.addMember("close")
        },
        addMember: function(param){
            this.$emit('addMember',param);
        }


    },
    
    
    

}
</script>
<style lang="less" >
.member-list-searchform{
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