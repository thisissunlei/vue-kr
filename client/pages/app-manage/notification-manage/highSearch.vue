<template>

<div class="g-high-search">

    <Form  :model="formItem" label-position="left"  class="u-clearfix">
    
            <FormItem label="推送目标用户" class="u-input">
                <Select
                    v-model="formItem.cmtId"
                    filterable
                    remote
                    :remote-method="remoteCommunityMethod"
                    :loading="communityLoading"
                    placeholder="请选择"
                    :label-in-value="labelInValue"
                    clearable
                    >
                    <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="点击推送后续动作" class="u-input">
                   <Select
                        clearable
                        v-model="formItem.jumpType"
                        placeholder="请选择"
                        >
                        <Option v-for="(option, index) in jumpTypeList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
            </FormItem>
             <FormItem label="推送创建时间"  class="u-input u-date">
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
                     v-model="formItem.endTime"
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
                customerName:'',
                communityId:''
            },
            communityList:[],
            jumpTypeList:[
                {
                    label:'跳转外链',
                    value:'1'
                },
                {
                    label:'无跳转',
                    value:'0'
                },
            ],
            startDate:'',
            startHour:'00:00',
            endDate:'',
            endHour:'00:00',
            startTime:'',
            endTime:'',
        }
        
    },
    mounted:function(){
         this.getCommunityList(' ')
    },
    methods:{
        //社区
        remoteCommunityMethod(query){
            if (query!== '') {
                this.communityLoading = true;
                setTimeout(() => {
                    this.communityLoading = false;
                    this.getCommunityList(query)
                }, 200);
            } else {
                this.getCommunityList(' ')

            }
        },
         //社区
        getCommunityList(name){
           let params = {
                    cmtName:name
                }
            let list = [];
            let _this = this;
            this.$ajax.get('get-community-new-list', params).then((res)=>{
                list = res;
                list.map((item)=>{
                    let obj =item;
                    obj.label = item.cmtName;
                    obj.value = item.cmtId;
                    return obj;
                });
                _this.communityList = list;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.msg
                });
            })
            return list;
            
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
            beginDate:this.beginDate || '',
            endDate: this.endDate || '',
            jumpType:this.formItem.jumpType || '',
            cmtId:this.formItem.cmtId || ''
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