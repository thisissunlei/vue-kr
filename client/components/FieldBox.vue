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
    .ivu-form-item-content{
        // padding-top:7px;
        position: relative;
    }
    .text{
        padding-top: 7px;
        color: #666;
        font-size: 14px;
        line-height: 20px;
    }
    .edit-input{
        width: 200px;
    }
    .operation{
        display: inline-block;
        position: absolute;
        top: 50%;
        transform:translateY(-50%);
        height: 32px;
        line-height: 32px;
        vertical-align: top;
        padding:0 6px;
        &>span{
            display: inline-block;
        }

    }
    .g-edit-input textarea{
        width: 100%;
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
    .edit-url{
        padding-right: 50px;
    }
    .url-style{
        right:0;
    }
</style>



<template>
    <div class="g-edit-input">
    <FormItem :label="label" :label-width="labelWidth">

        <div class="text">{{value}}</div>
                
    </FormItem>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

    export default {
        props:{
            value:String,//数值
            name:String,
            label:String,//名称
            labelWidth:Number,//标题宽度
            placeholder:String,
        },
        data () {
            return {
                // 修改后的数据
                customer:this.value,
            };
        },
         mounted:function(){
        },
        methods: {
                    
               
        }
    }
</script>
