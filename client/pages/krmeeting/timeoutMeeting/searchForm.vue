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
            
             <FormItem label="会议时间:" class="form-item-timer">
                <DatePicker 
                    v-model="formItem.beginTime"
                    type="datetime" 
                    format="yyyy-MM-dd HH:mm"
                    value="yyyy-MM-dd HH:mm"
                    placeholder="开始日期和时间" 
                    style="width: 140px"
                ></DatePicker>
                
                <span class="timer-span">至</span>
                <DatePicker 
                    v-model="formItem.endTime"
                    type="datetime" 
                    format="yyyy-MM-dd HH:mm"
                    value="yyyy-MM-dd HH:mm"
                    placeholder="结束日期和时间" 
                    style="width: 140px"
                ></DatePicker>
                
            </FormItem>
            <FormItem label="" class="form-item-search">
            
                <SearchFormInput 
                    :searchFilter="searchFilter"
                    @changeSearchFormData = "changeSearchFormData"
                /> 
            </FormItem>
            <Button type="primary" icon="ios-search" @click="submitSearchData">搜索</Button>
             
        </Form>
    </div>
</template>

<script>

import SearchFormInput from '~/components/SearchFormInput';
import SearchForm from '~/components/SearchForm';
import dateUtils from 'vue-dateutils';


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
           formItem : {},
           searchFilter:[
               {
                   label:'手机号',
                   value:'phone'
               }
           ]
       }
   },
   props:[
       "meetingStatusOptions"
   ],
   components:{
       SearchForm,SearchFormInput
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
            
            var param = {
                 phone:  searchData.searchValue
            }
            var newObj = Object.assign({},this.formItem,param);
            this.formItem = newObj;
        },
        submitSearchData(){
            let _this =this;
            var beginTime =new Date(_this.formItem.beginTime).getTime();
            var endTime =new Date(_this.formItem.endTime).getTime();
            if(beginTime && endTime && beginTime>endTime){
                this.$Notice.warning({
                    title: '订单生成开始时间不能大于结束时间',
                    desc: true ? '' : '订单生成开始时间不能大于结束时间'
                });
                return;
            }
            
            var beginTime =( _this.formItem.beginTime && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(_this.formItem.beginTime)))||"";
            var endTime = (_this.formItem.endTime && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(_this.formItem.endTime )))||"";

            var timeObject ={
                beginTime : beginTime,
                endTime : endTime
            }
            var newParams = Object.assign({},this.formItem,timeObject);
            this.$emit("submitSearchData",newParams);
        },
       
    }
 }
</script>
<style>
.all-kr-mmeting-order{
    /* padding:20px;
    paddint-top: 0;
    padding-bottom: 0; */
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
        width:200px;
    }
</style>