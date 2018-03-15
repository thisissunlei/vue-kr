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
                <div>
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

                <div>
                        <Form-item label="完成起止日期" class="bill-search">
                            <DatePicker 
                                v-model="formItem.cStDate"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 252px"
                            />
                        <span class="u-date-txt">至</span>
                        <DatePicker 
                                v-model="formItem.cEDate"
                                type="date" 
                                placeholder="结束日期" 
                                style="width: 252px"
                        /> 
                    </Form-item>
                    <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError">开始日期不能大于结束日期</div> 
               </div>

                <FormItem label="任务描述"  class="bill-search-class" style="width:575px">
                        <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入任务描述..."/>
                        <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
                </FormItem>

                <div class='edit-record'>
                    <span class='title-record'>编辑记录</span>
                    <div
                        class='record-wrap'
                        v-for="item in editRecord" 
                        :key="item.time"
                        >
                            <div class='first'><span class='circle'></span>{{item.time}}</div>
                            <div class='second'>
                                <Poptip trigger="hover" :content=item.who placement="bottom">
                                  {{item.detail}}
                                </Poptip>
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
        editRecord:Array,
        default:[]
    },
    data(){
        return{
            dateError:false,
            cDateError:false,
            formItem:{
                   orderNum:'',
                   cEndDate:'',
                   cStartDate:'',
                   cStDate:'',
                   cEDate:'',
                   remark:''
            },
            ruleValidate: {
                orderNum: [
                    { required: true, message: '请输入任务名称', trigger: 'change' }
                ],
                cStartDate:[
                    { required: true,type: 'date', message: '请输入开始日期', trigger: 'change' }
                ],
                cEndDate:[
                    { required: true, type: 'date',message: '请输入结束日期', trigger: 'change' }
                ]
            }
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
        if(this.formItem.cStDate&&this.formItem.cEDate){
                if(this.formItem.cStDate>this.formItem.cEDate){
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
        margin-left: 30px;
        width:562px;
        display:inline-block;
        background: #F6F6F6;
        border-radius: 4px;
        box-sizing: border-box;
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
        }
    }

</style>  