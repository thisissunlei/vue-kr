<template>
    <div class="km-order">
        <Form  :model="formItem" label-position="left" inline class="all-kr-mmeting-order">
            <FormItem>
                <Input v-model="formItem.orderNo" placeholder="按订单编号搜索" clearable style="width: 300px"/>
            </FormItem>
            <FormItem style="padding-left: 20px;">
                <Input v-model="formItem.reserverPhone" placeholder="按手机号搜索" clearable style="width: 300px"/>
            </FormItem>
            <div></div>
            <FormItem label="预订的社区:" class="form-item">
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
                    v-model="formItem.orderShowStatus"
                    style="width:100px"
                    placeholder="请选择订单状态"
                    clearable
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
                        v-model="formItem.cStartTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始日期和时间"
                        style="width: 160px"
                ></DatePicker>

                <span class="timer-span">至</span>
                <DatePicker
                        v-model="formItem.cEndTime"
                        type="datetime"
                        format="yyyy-MM-dd 23:59:59"
                        value="yyyy-MM-dd 23:59:59"
                        placeholder="结束日期和时间"
                        style="width: 160px"
                ></DatePicker>
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
           formItem : {
             cEndTime: ''
           }
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
        submitSearchData(){
            let _this =this;
            var beginTime =new Date(_this.formItem.cStartTime).getTime();
            var endTime =new Date(_this.formItem.cEndTime).getTime();
            if(beginTime && endTime && beginTime>endTime){
                this.$Notice.warning({
                    title: '订单生成开始时间不能大于结束时间',
                    desc: true ? '' : '订单生成开始时间不能大于结束时间'
                });
                return;
            }

            if ( !!this.formItem.orderNo ) {
              var b = /^[0-9a-zA-Z]*$/g
              if( !b.test(this.formItem.orderNo) ) {
                this.$Notice.warning({
                  title: '订单编号为字母或数字组合'
                });
                return;
              }
              if ( this.formItem.orderNo.length > 20 ) {
                this.$Notice.warning({
                  title: '订单编号不能超过20个字符'
                });
                return;
              }
            }


            if ( !!this.formItem.reserverPhone ) {
              var t = /^[1][3,4,5,7,8][0-9]{9}$/
              if ( !t.test(this.formItem.reserverPhone) ) {
                this.$Notice.warning({
                  title: '请输入正确格式的手机号'
                });
                return;
              }
            }

            this.$emit("submitSearchData",this.formItem);
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
        width:445px;
        
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