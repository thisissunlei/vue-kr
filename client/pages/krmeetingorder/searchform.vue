<template>
    <div class="km-order">
        <Form  :model="formItem" label-position="left" inline class="all-kr-mmeting-order">
            <FormItem label="订单所属社区:" class="form-item">
                <Select
                    v-model="formItem.communityId"
                    style="width:150px"
                    placeholder="请选择社区"
                    clearable
                    >
                    <Option
                        v-for="item in communityList"
                        :value="item.id"
                        :key="item.id"
                    >
                        {{ item.name }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="订单状态:"  class="form-item-status">
                <Select
                    v-model="statusStr"
                    style="width:340px"
                    placeholder="请选择订单状态"
                    clearable
                    multiple
                    >
                    <Option
                        v-for="item in meetingStatusOptions"
                        :value="item.name"
                        :key="item.name"
                    >
                        {{ item.desc }}
                    </Option>
                </Select>
            </FormItem>
             <FormItem label="订单生成时间:" class="form-item-timer">
                <DatePicker 
                    v-model="formItem.createBeginTime"
                    type="datetime" 
                    format="yyyy-MM-dd HH:mm"
                    value="yyyy-MM-dd HH:mm"
                    placeholder="开始日期和时间" 
                    style="width: 140px"
                    @on-change="dataChanged"
                ></DatePicker>
                
                <span class="timer-span">至</span>
                <DatePicker 
                    v-model="formItem.createEndTime"
                    type="datetime" 
                    format="yyyy-MM-dd HH:mm"
                    value="yyyy-MM-dd HH:mm"
                    placeholder="结束日期和时间" 
                    style="width: 140px"
                    @on-change="dataChanged"
                ></DatePicker>
                
            </FormItem>
            <FormItem label="" class="form-item-search">
            
                <SearchForm
                    :searchFilter="searchFilter"
                    :openSearch = true
                    :notShowSearchIconProps = true
                    @serachFormDataChanged="changeSearchFormData"
                /> 
            </FormItem>
            <Button type="primary" icon="ios-search" @click="submitSearchData">搜索</Button>
             
        </Form>
    </div>
</template>

<script>


import SearchForm from '~/components/SearchForm';

export default {
   name:'serachform',
    head () {
            return {
                // title: "KM会议室订单"
            }
    },
   data(){
       return {
           communityList : [],
           statusStr:[],
           formItem : {},
           searchFilter:[
               {
                   label:'手机号',
                   value:'PHONE'
               },
               {
                   label:'订单编号',
                   value:'ORDER'
               }
           ]
       }
   },
   props:[
       "meetingStatusOptions"
   ],
   components:{
       SearchForm
   },
   mounted(){
      this.getCommunity();
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
        
       
        changeSearchFormData(searchData){
            for(var key in searchData ){
                var param = {
                    keyWordType : key,
                    keyWord : searchData[key]
                }
            }
            
            var newObj = Object.assign({},this.formItem,param);
            console.log("newObj",newObj);
            this.formItem = newObj;
        },
        submitSearchData(){
            let _this =this;
            var beginTime =new Date(_this.formItem.createBeginTime).getTime();
            var endTime =new Date(_this.formItem.createEndTime).getTime();
            if(beginTime && endTime && beginTime>endTime){
                this.$Notice.warning({
                    title: '订单生成开始时间不能大于结束时间',
                    desc: true ? '' : '订单生成开始时间不能大于结束时间'
                });
                return;
            }
            this.formItem.statusStr=[].concat(this.statusStr).join(',');
            this.$emit("submitSearchData",this.formItem);
        },
        dataChanged(){
            // console.log("this.formItem",this.formItem);
        }
    }
 }
</script>
<style>
.all-kr-mmeting-order{
    padding:20px;
    padding-bottom: 0;
}
    .form-item{
      width:260px;  
    }
    .form-item-timer{
        width:405px; 
        
    }
    .form-item-timer .timer-span{
            padding: 0 5px;
        } 
    .form-item-search{
        width:310px; 
    }
    .form-item-status{
        width:430px;
    }
</style>