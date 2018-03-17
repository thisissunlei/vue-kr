<template>
  <div>
      <Form ref="formItem" :model="formItem"  :rules="ruleValidate" label-position="top" style="margin-top:25px;">
                <Form-item label="任务名称"  class="bill-search-class" prop="orderNum">
                    <i-input 
                        v-model="formItem.orderNum" 
                        placeholder="请输入任务名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="任务类型" class="bill-search-class" prop="task" style="padding-left: 10px;"> 
                    <Select 
                        v-model="formItem.task" 
                        placeholder="请输入任务类型" 
                        style="width: 252px;"
                        filterable
                        clearable
                        @on-change="typeChange"
                    >
                        <Option v-for="item in taskList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
                <div v-if="mask">
                        <Form-item label="计划起止日期" class="bill-search" prop="cStartDate">
                            <DatePicker 
                                v-model="formItem.cStartDate"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                        <span class="u-date-txt">至</span>
                        </Form-item>
                        <Form-item prop="cEndDate" style="display:inline-block;vertical-align: middle;margin-top: 22px;padding-left: 0px;">
                            <DatePicker 
                                v-model="formItem.cEndDate"
                                type="date" 
                                placeholder="结束日期" 
                                style="width: 252px"
                            /> 
                    </Form-item>
                    <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="dateError">开始日期不能大于结束日期</div> 
               </div>

                <div v-if="!mask">
                        <Form-item label="会议节点日期" class="bill-search" prop="cStartDate">
                            <DatePicker 
                                v-model="formItem.cStartDate"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                          />
                        </Form-item>
                </div>

             <FormItem label="任务描述"  class="bill-search-class" style="width:575px">
                    <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入任务描述..."/>
                    <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

         </Form>
  </div>
</template>


<script>
import dateUtils from 'vue-dateutils';
export default {
    data(){
        return{
            dateError:false,
            formItem:{
                   orderNum:'',
                   task:'s',
                   cEndDate:'',
                   cStartDate:'',
                   remark:''
            },
            ruleValidate: {
                orderNum: [
                    { required: true, message: '请输入任务名称', trigger: 'change' }
                ],
                task: [
                    { required: true, message: '请输入任务类型', trigger: 'change' }
                ],
                cStartDate:[
                    { required: true, type: 'date',message: '请输入开始日期', trigger: 'change' }
                ],
                cEndDate:[
                    { required: true, type: 'date',message: '请输入结束日期', trigger: 'change' }
                ]
            },
            taskList:[
                {id:'s',name:'阶段任务'},
                {id:'k',name:'会议节点'}
            ],
            mask:true
        }
    },
    updated:function(){
        if(this.formItem.cStartDate&&this.formItem.cEndDate){
                if(this.formItem.cStartDate>this.formItem.cEndDate){
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
            if(params=='s'){
                this.mask=true;
            }else{
                this.mask=false;
            }
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