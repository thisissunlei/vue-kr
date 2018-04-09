<style lang="less"> 
   .com-select-customers{
    ::-webkit-input-placeholder { color:#666; }
    ::-moz-placeholder { color:#666; } /* firefox 19+ */
    :-ms-input-placeholder { color:#666; } /* ie */
    input:-moz-placeholder { color:#666; }
   }
   .g-edit-input .ivu-form-item .ivu-form-item-label{
        font-size: 14px;
        color:#666;
        font-weight: 500;
    }
    .ivu-form-item{
        margin-bottom: 20px;
    }
    .label-text{
        font-size: 14px;
        color: #666;
    }
    .ivu-form-item-label{
        &:before{
            content:'';
            width:7px;
            margin-right: 4px;
            display: inline-block;
        }
    }
    .text{
        color: #666;
        font-size: 14px;
    }
    .edit-input{
        width: 200px;
    }
    .operation{
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: top;
        padding:0 6px;
        &>span{
            display: inline-block;
        }

    }
    .icon-error ,.icon-right{
        display: inline-block;
        line-height: 34px;
    }
    .icon-edit:before{
        color:#4A90E2;
    }
    .icon-error:before{
        color:#999;
        font-size: 16px;
    }
    .icon-right:before{
        color:#FF6868;
        font-size: 16px;
        padding-right:4px;

    }
</style>



<template>
    <div class="g-edit-input">
    <FormItem :label="label" :prop="prop" :label-width="labelWidth">

        <div v-show="!showEditInput" class="text">{{value}} <span @click="showEdit" style="color:#4A90E2" class="icon-edit"></span></div>
        <Input v-if="showEditInput" v-model="customer"  :placeholder="placeholder" @on-change="change" class="edit-input"/>
        <div class="operation" v-show="showEditInput">
            <span @click="okClick" >
                <Icon class="icon-right"></Icon>
            </span>
            <span @click="cancelClick">
                <Icon  class="icon-error"></Icon>
            </span>        
        </div>
                
    </FormItem>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

    export default {
        props:{
            onchange :Function,//修改数值
            value:String,//数值
            prop:String,//校验方法,字段名称
            name:String,
            label:String,//名称
            labelWidth:Number,//标题宽度
            placeholder:String,
            canSubmit:Boolean,//校验是否可以提交
            submitValue:Function,//提交方法
            cancelValue:Function,//取消方法
        },
        data () {
            
            return {
                // 修改后的数据
                customer:this.value,
                //是否编辑
                showEditInput:false,
                //传进来的元数据
                labelValue:this.value,
            };
        },
         mounted:function(){
        },
        methods: {
            showEdit(){
                this.showEditInput = true;
                this.customer = this.value;
            },
            change(e){
                this.onchange(this.name,this.customer)
            },
            okClick(){
                if(!this.customer || !this.canSubmit){
                    return;
                }
                this.showEditInput = false;
            },
            cancelClick(){
                this.customer = this.labelValue;
                this.showEditInput = false;
                this.onchange(this.name,this.labelValue)
            },
                    
               
        }
    }
</script>
