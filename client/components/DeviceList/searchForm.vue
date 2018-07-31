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
            <FormItem label="楼层：">
                <Select
                    clearable
                    v-model="formItem.floor"
                    style="width:60px"
                    placeholder="请选择楼层"
                    filterable
                    @on-change="onChangeFloor"
                >
                    <Option  v-for="item in floorOptions" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="门类型：">
                <Select
                    clearable
                    v-model="formItem.doorType"
                    style="width:120px"
                    placeholder="请选择门类型"
                    filterable
                    @on-change="onChangeDooType"
                >
                    <Option  v-for="item in doorTypeOptions" :value="item.value" :key="item.value"> {{ item.desc }}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="屏幕标题：">
                <Input v-model="formItem.title" size="large" placeholder="屏幕标题" @on-change="inputTitleChanged"></Input>
            </FormItem>
            <FormItem label="屏幕编号：">
                <Input v-model="formItem.doorCode" size="large" placeholder="屏幕编号" @on-change="inputDoorCodeChanged"></Input>
            </FormItem>
           
            <FormItem>
                
                <Button type="primary"  @click="addDeviceContinue" class="search-btn add-btn">添加并继续</Button>
            </FormItem>
            <FormItem>
                
                <Button type="primary"  @click="addDeviceClose" class="search-btn">添加并关闭</Button>
            </FormItem>

        </Form>
        <Modal v-model="showTime" @on-ok="confirmAddDevice">
            <div class="modal-box" >
                <span>请选择授权时间：</span>
                <DatePicker 
                    type="datetimerange" 
                    format="yyyy-MM-dd HH:mm:ss" 
                    placeholder="请选择授权时间" 
                    @on-change="timerChanged"
                    style="width: 300px"
                >
                </DatePicker>
            </div>
        </Modal>
        

</div>

</template>

<script>
export default{
    name:'equipmentSearch',
    data (){
		return{
            showTime :false,
            imgClass : "img-class",
            timeArr : [],
            doorTypeOptions:[],
            floorOptions:[],
            communityList :[],
			formItem : {

            },

          
		}

    },
    mounted(){

        this.getCommunity();
        this.getDict();
        
    },
    props:[
       'groupLevel'
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

        getDict(){
            this.$http.get('get-smart-hard-dict','').then((res)=>{

                this.doorTypeOptions=res.data.DoorType;

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getFloorOptions(communityId){
            var param = {communityId :communityId }
            this.$http.get('get-space-floor',param).then((res)=>{

                this.floorOptions=res.data.floors.map(function(item,index){
                    return {
                        label :item,
                        value :item
                    }
                });

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        onChangeFloor(floor){
            this.formItem.floor = floor;
            this.searchDevice();
        },
        onChangeCommunity(communityId){

            this.formItem.communityId = communityId||'';
            this.searchDevice();
            if(!communityId){
                this.formItem.floor = '';
                this.floorOptions=[];
            }else{
                this.getFloorOptions(communityId);
            }
            
        },
        onChangeDooType(option){
            this.formItem.doorType = option;
            this.searchDevice();
        },
        inputTitleChanged(e){
            this.formItem.title = e.currentTarget.value;
            this.searchDevice();
        },
        inputDoorCodeChanged(e){
            this.formItem.doorCode = e.currentTarget.value;
            this.searchDevice();
        },
        searchDevice(){
            this.$emit("submitSearchData",this.formItem);
        },
        updated:function(){
            this.$emit('formData', this.formItem);
        },
        switchShowTime:function(){
            this.showTime = !this.showTime ;
        },
        addDeviceContinue:function(){
            this.switchShowTime();
            this.status = "continue"
        },
        addDeviceClose:function(){
            this.switchShowTime();
            this.status = "close"
        },
        confirmAddDevice: function(){
            this.$emit('addDevice',this.status,this.timeArr);
        },
        timerChanged:function(timer){
            this.timeArr = timer;
        },


    },
    
    
    

}
</script>
<style lang="less" >
.all-equipment-list-searchform{
    padding-left:0px;
    .ivu-form-item{
        margin-bottom:10px;
    }
    .search-btn{
       margin:32px 0 0 0;
   }
   
   .btn-box{
        display : inline-block;
        
        .delete-relations{
            margin:32px 12px 0 0 ;
        }
   }
   
   .modal-box{
       padding : 40px 0 0 0 ;
   }
   
}
   


</style>