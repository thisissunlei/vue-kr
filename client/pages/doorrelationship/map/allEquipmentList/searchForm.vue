<template>

<div>
     
    <Form  :model="formItem" label-position="left" inline class="all-equipment-list-searchform">
            <FormItem label="社区：">
                <Select
                    v-model="communityId"
                    style="width:150px"
                    placeholder="请选择社区"
                    filterable
                    @on-change="onChangeCommunity"
                    disabled
                >
                    <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
                </Select>
            </FormItem>
           <FormItem label="楼层：">
                <Select
                    v-model="formItem.floor"
                    style="width:150px"
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
                    style="width:150px"
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
            <FormItem label="其他："> 
                <SearchForm 
                    :searchFilter="searchFilter"
                    :openSearch = true
                    @serachFormDataChanged="onSubmitSearchForm"
                    :notShowSearchIconProps = true
                />
            </FormItem>
        </Form>
        
        <Button type="primary" icon="ios-search" @click="searchEquipment" class="search-btn"></Button>
        <Button type="primary" icon="ios-plus-outline"  @click="addEquipmentToGroup"  class="search-btn"></Button>

</div>

</template>

<script>
import SearchForm from '~/components/SearchForm';
export default{
    name:'equipmentSearch',
    data (){
		return{
           
            communityList :[],
			formItem : {},
            floorOptions : [],
            
            searchFilter:[
                    {
                        label:'屏幕编号',
                        value:'doorCode'
                    },
                    {
                        label:'屏幕标题',
                        value:'title'
                    },
                    {
                        label:'硬件ID',
                        value:'deviceId'
                    }
            ],
            searchFormData:{},
            otherSearchData : {}
		}

    },
    mounted(){

        var param = {communityId : this.communityId};
        this.getCommunity(this.getfloorOptions,param);
        
    },
    props:[
        "communityId","doorTypeOptions"
    ],
    components: {
     SearchForm
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
             let _this = this;
            console.log("otherSearchData",_this.otherSearchData)

            var newSearchData = Object.assign({},_this.otherSearchData,_this.formItem,{communityId:_this.communityId})
            console.log("newSearchData",newSearchData)
            this.$emit('searchEquipment',_this.formItem,newSearchData);  
         },
        getCommunity(callback,sendMsg){
            
            this.$http.get('join-bill-community','').then((res)=>{

                this.communityList=res.data.items;

                callback && callback(sendMsg);
                
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
        },



        onSubmitSearchForm(value){
            console.log("value====>",value);
            this.otherSearchData = value;
            console.log("this,.otherSearchData",this.otherSearchData)
        },


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