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
                    <Option  v-for="item in companyList" :value="item.id" :key="item.id"> {{ item.company }}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="组名称：">
                <Input v-model="formItem.name" size="large" placeholder="组名称" @on-change="inputChanged"></Input>
            </FormItem>
           
            
            <div class="float-right">
                <Tips :imgClass = "imgClass" tipsDirection="left-start" :tipsContent="tipsContent"/>
                
                <Button type="primary"  @click="addGroups" class="delete-relations">添加组</Button>
                <Button type="error"  @click="deleteRelations" class="delete-relations">解除关系</Button>
            </div>

        </Form>
        

</div>

</template>

<script>
import Tips from '~/components/Tips';
export default{
    name:'equipmentSearch',
    data (){
		return{
            imgClass : "img-class",
            tipsContent:[{text:"父级组只能添加设备组作为其子集"},{text:"同样,设备组只能添加父级组作为其父级"}]
            
            ,
            companyList:[],
            communityList :[],
			formItem : {

            },
          
		}

    },
    mounted(){

        this.formItem.deviceId = this.$route.query.deviceId || "";
        this.$route.query.deviceId && this.searchEquipment();
        this.getCommunity();
        this.getCompany();
        
    },
    props:[
       
    ],
    components: {
     Tips
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
            
            this.$http.get('get-samrt-hard-company-list','').then((res)=>{

                this.companyList=res.data.items;

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        onChangeCommunity(communityId){

            this.formItem.communityId = communityId;
            this.searchEquipment();
        },
        onChangeCompanys(customerId){
            this.formItem.customerId = customerId;
            this.searchEquipment();
        },
        inputChanged(e){
            this.formItem.name = e.currentTarget.value;
            this.searchEquipment();
        },
        searchEquipment(){
            this.$emit("submitSearchData",this.formItem);
        },
        updated:function(){
            this.$emit('formData', this.formItem);
        },
        deleteRelations:function(){
            this.$emit('deleteRelations');
        },
        addGroups: function(){
            this.$emit('addGroups');
        }


    },
    
    
    

}
</script>
<style lang="less" >
.all-equipment-list-searchform{
    padding-left:20px;
    .search-btn{
       margin-top:32px;
   }
   .float-right{
        float : right;
        
        .delete-relations{
            margin:32px 12px 0 0 ;
        }
   }
   .img-class{

   }
   
}
   


</style>