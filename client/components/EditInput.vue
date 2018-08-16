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
    <FormItem :label="label" :prop="prop" :label-width="labelWidth">

        <div v-show="!showEditInput" class="text">{{value}} <span @click="showEdit" style="color:#4A90E2" class="icon-edit"></span></div>
        <Input v-if="showEditInput && type== 'text'" v-model="customer"  :placeholder="placeholder" @on-change="change" class="edit-input"/>
        <Input v-if="showEditInput && type=='textarea'" v-model="customer"  :placeholder="placeholder" @on-change="change" type="textarea" style="width:70%"/>
        <Input v-if="showEditInput && type=='url'" v-model="customer"  :placeholder="placeholder" @on-change="changeUrl" :type="type" class="edit-url">
            <span slot="prepend">http://</span>
        </Input>
        <div class="operation" v-show="showEditInput"  v-bind:class="{ 'url-style': type=='url' }">
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
            canSubmit:{
                default:true,
                type:Boolean
            
            },//校验是否可以提交
            submitValue:Function,//提交方法
            cancelValue:Function,//取消方法
            type:{
                default:'text',
                type:String
            }
        },
        data () {
            let urlArray = this.value
            if(this.type == 'url'){
                console.log('url')
                urlArray = this.value.split('http://')[1]

            }
            return {
                // 修改后的数据
                customer:urlArray,
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
                console.log('edit-input',this.customer)
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
            changeUrl(e){
                console.log('changeUrl',this.customer)
                if(this.customer.indexOf('http://') == 0){
                   this.customer = this.customer.split('http://')[1]
                }
                console.log('changeUrl--2',this.customer)

                this.onchange(this.name,'http://'+this.customer)

            }
                    
               
        }
    }
</script>
