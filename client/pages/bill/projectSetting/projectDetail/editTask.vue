<template>
  <div>
      <Form ref="formItem" :model="formItem"  :rules="ruleValidate" label-position="top" style="margin-top:25px;">
                <Form-item label="任务名称"  class="bill-search-class" prop="name">
                    <i-input 
                        v-model="formItem.name" 
                        placeholder="请输入任务名称"
                        style="width: 252px"
                        @on-change="nameChange"
                    />
                </Form-item>
                <Form-item label="计划起止日期" class="bill-search" prop="planStartTime" v-if="!mask">
                            <DatePicker 
                                v-model="formItem.planStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                </Form-item>

                <Form-item label="完成起止日期" class="bill-search" v-if="!mask">
                            <DatePicker 
                                v-model="formItem.actualStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                </Form-item>

                <div v-if="mask">
                        <Form-item label="计划起止日期" class="bill-search" prop="planStartTime">
                            <DatePicker 
                                v-model="formItem.planStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                        <span class="u-date-txt" >至</span>
                        </Form-item>
                        <Form-item prop="planEndTime" style="display:inline-block;vertical-align: middle;margin-top: 22px;padding-left: 0px;">
                            <DatePicker 
                                v-model="formItem.planEndTime"
                                type="date" 
                                placeholder="结束日期" 
                                style="width: 252px"
                            /> 
                    </Form-item>
                    <div  style="color:red;padding-left:32px;padding-bottom:15px;" v-show="dateError">开始日期不能大于结束日期</div> 
               </div>

                <div v-if="mask">
                        <Form-item label="完成起止日期" class="bill-search">
                            <DatePicker 
                                v-model="formItem.actualStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                        <span class="u-date-txt" v-if="mask">至</span>
                        <DatePicker 
                                v-model="formItem.actualEndTime"
                                type="date" 
                                placeholder="结束日期" 
                                style="width: 252px"
                        /> 
                    </Form-item>
                    <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError">开始日期不能大于结束日期</div> 
               </div>

                <FormItem label="任务描述"  class="bill-search-class" style="width:575px">
                        <Input v-model="formItem.descr" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入任务描述..."/>
                        <div style="text-align:right">{{formItem.descr?formItem.descr.length+"/500":0+"/500"}}</div>
                </FormItem>


              <div class='edit-record'>
                    <FormItem label="内部备注" style="width:545px;margin-left:10px;">
                            <Input v-model="formItem.operDescr" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入内部备注..."/>
                            <div style="text-align:right">{{formItem.operDescr?formItem.operDescr.length+"/500":0+"/500"}}</div>
                    </FormItem>
   
                    <div class='title-wrap'>
                        <span class='title-record'>编辑记录</span>
                        <div
                            class='record-wrap'
                            v-for="item in getEdit.operLogs" 
                            :key="item.id"
                            >
                                <div class='first'><span class='circle'></span>{{item.uTime}}</div>
                                <div style="display:inline-block;">
                                    <div class='second'>
                                        <span style="padding-right: 10px;">{{item.updatorName}}</span>
                                        <span>{{item.comment}}</span>
                                    </div>
                                    <div class='third'>
                                        {{item.descr}}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

         </Form>
  </div>
</template>


<script>
import dateUtils from 'vue-dateutils';
export default {
    props:{
        id:{
            type:[Number,String]
        },
        getEdit:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            dateError:false,
            cDateError:false,
            formItem:{
                   name:'',
                   planEndTime:'',
                   planStartTime:'',
                   actualStartTime:'',
                   actualEndTime:'',
                   descr:'',
                   operDescr:''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入任务名称', trigger: 'change' }
                ],
                planStartTime:[
                    { required: true,type: 'date', message: '请输入开始日期', trigger: 'change' }
                ],
                planEndTime:[
                    { required: true, type: 'date',message: '请输入结束日期', trigger: 'change' }
                ]
            },
            mask:true
        }
    },
    created(){    
        this.queryData=this.$route.query; 
    },
    mounted(){
        this.mask=this.getEdit.type=='STAGETASK'?true:false;
        this.formItem=this.getEdit;
    },
    updated:function(){
        if(this.formItem.planStartTime&&this.formItem.planEndTime){
                if(this.formItem.planStartTime>this.formItem.planEndTime){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                    this.dateError=false; 
        }
        if(this.formItem.actualStartTime&&this.formItem.actualEndTime){
                if(this.formItem.actualStartTime>this.formItem.actualEndTime){
                    this.cDateError=true;
                }else{
                    this.cDateError=false; 
                }
            }else{
                    this.cDateError=false; 
        }
        this.$emit('bindData',this.formItem,this.dateError,this.cDateError);
    },
    methods:{
       nameChange(event){
            let params={
                name:event.target.value,
                propertyId:this.queryData.id,
                id:this.id
            }
            this.$http.get('project-name-check',params).then((response)=>{
                    this.formItem.error=false;
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                    });
                    this.formItem.error=true;
                 })
        }
    }
}

</script>

<style lang='less' scoped>
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .bill-search{
        display:inline-block;
        padding-left:32px;
        .u-date-txt{
            padding:0 13px;
            font-size: 14px;
            color: #666;
        }
    }
    .edit-record{
        padding:10px;
        margin-left: 12px;
        width:600px;
        display:inline-block;
        background: #F6F6F6;
        border-radius: 4px;
        box-sizing: border-box;
        max-height: 400px;
        overflow: scroll;
        .title-wrap{
            padding-left: 20px;
        }
        .title-record{
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #333333;
            display:inline-block;
            margin-bottom:20px;
        }
        .record-wrap{
            margin-bottom:20px;
            .first{
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
                display:inline-block;
                padding-right:30px;
                vertical-align: top;
                .circle{
                    width:2px;
                    height:2px;
                    border-radius: 50%;
                    background:#666;
                    display:inline-block;
                    vertical-align: middle;
                    margin-right:3px;
                }
            }
            .second{
                display:inline-block;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
            }
            .third{
                padding:10px;
                width: 330px;
                background: #fff;
                margin-top: 10px;
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                color: #666;
            }
        }
    }

</style>  