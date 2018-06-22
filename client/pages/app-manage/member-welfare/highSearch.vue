<template>

<div class="g-high-search">

    <Form  :model="formItem" label-position="left"  class="u-clearfix">
            <FormItem label="福利标题" class="u-input">
                 <Input
                    v-model="formItem.title"
                    placeholder="请输入福利标题"
                    style="width: 250px"
               />
            </FormItem>
            <FormItem label="创建人" class="u-input">
                 <Input
                    v-model="formItem.createName"
                    placeholder="请输入创建人"
                    style="width: 250px"
               />
            </FormItem>
            
            <FormItem label="福利类型" class="u-input">
                   <Select
                        clearable
                        v-model="formItem.couponType"
                        placeholder="请选择"
                        >
                        <Option v-for="(option, index) in couponTypeList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
            </FormItem>
            <FormItem label="福利范围" class="u-input">
                <Select
                    v-model="formItem.cityId"
                    placeholder="请选择"
                    :label-in-value="labelInValue"
                    clearable
                    >
                    <Option v-for="(option, index) in cityList" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
            </FormItem>
             <FormItem label="领取有效期"  class="u-input u-date">
                <DatePicker
                    type="date"
                    v-model="formItem.startTime"
                    placeholder="请选择开始日期"
                    style="width: 150px;margin-right:4px;"
                     @on-change="startChange"
               ></DatePicker>
                <TimePicker 
                    format="HH:mm" 
                    placeholder="请选择" 
                    style="width: 96px" 
                    v-model="formItem.startHour"
                     @on-change="startHourChange"
                     @on-clear="startHourClear"
                />
                <span class="u-date-txt">至</span>
               <DatePicker
                    type="date"
                     v-model="formItem.endtime"
                    placeholder="请选择截止日期"
                    style="width: 150px;margin-right:4px;"
                     @on-change="endChange"
               ></DatePicker>
               <TimePicker 
                    format="HH:mm" 
                    placeholder="请选择" 
                    style="width: 96px" 
                    v-model="formItem.endHour"
                    @on-change="endHourChange"
                    @on-clear="endHourClear"
                />
            </FormItem>
        </Form>
        
</div>

</template>	

<script>

export default{
    name:'highSearch',
    data(){
        return{
            labelInValue:true,
            communityLoading:false,
            formItem:{
                title:'',
                createName:'',
                cityId:'',
                couponType:'',
            },
            couponTypeList:[],
            cityList:[],
            startDate:'',
            startHour:'00:00',
            endDate:'',
            endHour:'00:00',
            startTime:'',
            endtime:'',
            cityId:[],
            couponType:'',
        }
        
    },
    mounted:function(){
         this.getCityType()
    },
    methods:{
        getCityType(){
             this.$http.get('get-city-and-type', '').then((res)=>{
                   res.data.types.map((item)=>{
                       item.value=item.code;
                       item.label=item.name;
                       return item;
                   })
                   res.data.citys.map((item)=>{
                       item.value=item.id;
                       item.label=item.name;
                       return item;
                   })
                   this.couponTypeList=res.data.types;
                   this.cityList=res.data.citys;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
        },
        startChange(date){
            this.startDate=date;
        },
        endChange(date){

            this.endDates=date;
        },
        startHourChange(date){
            this.startHour=date;
        },
        endHourChange(date){
            this.endHour=date;
        },
        startHourClear(){
            this.startHour='00:00:00';
        },
        endHourClear(){
            this.endHour='00:00:00';
        }

    },
    updated:function(){
        if(this.startDate && this.startHour){
            
            this.beginDate=`${this.startDate} ${this.startHour}:00`
        }
        if(this.endDates && this.endHour){
            this.endDate=`${this.endDates} ${this.endHour}:00`
        }
        let form={
            beginTime:this.beginDate || '',
            endTime: this.endDate || '',
            couponType:this.formItem.couponType || '',
            cityId:this.formItem.cityId || '',
            createName:this.formItem.createName || '',
            title:this.formItem.title || '',
            page:1,
            pageSize:15,
        }
        this.$emit('formData', form);
        
    }
}
</script>
<style lang="less"> 

.g-high-search{

    form{
        width:540px;
        margin:0 auto;
    }
    .u-clearfix { zoom:1; }
    .u-clearfix:after {
        clear: both;
        content: '.';
        height: 0;
        display: block;
        visibility: hidden;
    }
    
    .u-input{
        width:250px;
        float:left;
        margin-bottom:10px;
        &:nth-child(2n-1){
            margin-right:30px;
        }
    }

    .u-date{
    
        width:530px; 
        
        label{
            width:100%;
            display: block;
        }
        
        .u-date-txt{
            font-size: 14px;
            color: #666666;
            display: inline-block;
            width:30px;
            text-align: center
        }
        
    }
}   

</style>