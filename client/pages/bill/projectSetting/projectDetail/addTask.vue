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
                <Form-item label="任务类型" class="bill-search-class" prop="type" style="padding-left: 10px;"> 
                    <Select 
                        v-model="formItem.type" 
                        placeholder="请输入任务类型" 
                        style="width: 252px;"
                        filterable
                        clearable
                        @on-change="typeChange"
                    >
                        <Option v-for="item in taskList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
                <div v-if="mask">
                        <Form-item label="计划起止日期" class="bill-search" prop="planStartTime">
                            <DatePicker 
                                v-model="formItem.planStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                        <span class="u-date-txt">至</span>
                        </Form-item>
                        <Form-item prop="planEndTime" style="display:inline-block;vertical-align: middle;margin-top: 22px;padding-left: 0px;">
                            <DatePicker 
                                v-model="formItem.planEndTime"
                                type="date" 
                                placeholder="结束日期" 
                                style="width: 252px"
                            /> 
                    </Form-item>
                    <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="dateError">开始日期不能大于结束日期</div> 
               </div>

                <div v-if="!mask">
                        <Form-item label="会议节点日期" class="bill-search" prop="planStartTime">
                            <DatePicker 
                                v-model="formItem.planStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                          />
                        </Form-item>
                </div>

             <FormItem label="任务描述"  class="bill-search-class" style="width:575px">
                    <Input v-model="formItem.descr" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入任务描述..."/>
                    <div style="text-align:right">{{formItem.descr?formItem.descr.length+"/500":0+"/500"}}</div>
            </FormItem>

         </Form>
  </div>
</template>


<script>
import dateUtils from 'vue-dateutils';
export default {
    props:{
        id:{
            type:Number
        }
	},
    data(){
        return{
            dateError:false,
            formItem:{
                   name:'',
                   type:'',
                   planEndTime:'',
                   planStartTime:'',
                   descr:''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入任务名称', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请输入任务类型', trigger: 'change' }
                ],
                planStartTime:[
                    { required: true, type: 'date',message: '请输入开始日期', trigger: 'change' }
                ],
                planEndTime:[
                    { required: true, type: 'date',message: '请输入结束日期', trigger: 'change' }
                ]
            },
            taskList:[
                {id:'STAGETASK',name:'阶段任务'},
                {id:'MEETING',name:'会议节点'}
            ],
            mask:true
        }
    },
    created(){    
        this.queryData=this.$route.query; 
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
        this.$emit('bindData',this.formItem,this.dateError);
    },
    methods:{
        typeChange(params){
            if(params=='STAGETASK'){
                this.mask=true;
            }else{
                this.mask=false;
            }
        },
        nameChange(event){
            let params={
                name:event.target.value,
                propertyId:this.queryData.id,
                id:this.id
            }
            this.$http.get('project-name-check',params).then((response)=>{
                    this.listData=response.items; 
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                  });
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

</style>  