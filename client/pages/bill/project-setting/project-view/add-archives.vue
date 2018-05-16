<template>
  <div class='add-archives'>
       <Form ref="formRight" :model="formRight" :rules="ruleValidate" label-position="left">

            <Form-item label="项目名称" class="bill-archives-class" prop="name" style="margin-bottom:30px;">
                    <i-input 
                        v-model="formRight.name" 
                        placeholder="请输入项目名称"
                        style="width: 252px;"
                        @on-change="nameChange"
                    /> 
            </Form-item>
            
            <Form-item label="所在地区" class="bill-archives-class city-class" prop="maskCity">
                    <i-input 
                        v-model="formRight.maskCity" 
                        style="display:none;"
                    /> 
                    <KrField 
                        type="cascader" 
                        :mask="mask"
                        placeholder="请输入所在地区" 
                        @change="cascaderChange"
                    />
            </Form-item>

          
        </Form>
  </div>
</template>


<script>
import KrField from '~/components/KrField';
export default {
    components:{
       KrField
    },
    data(){
        return{
          formRight:{
                name:'',
                city:'',
                county:'',
                province:'',
                citys:'',
                maskCity:''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '项目名称必填且最多20个字符', trigger: 'change',max:20 }
                ],
                maskCity:[
                    { required: true, message: '所在城市必填', trigger: 'change' }
                ]
            },
            mask:false  
        }
    },
    mounted(){
        this.mask=true;
    },
    updated:function(){
        this.$emit('bindData',this.formRight);
    },
    methods:{
        cascaderChange(event){
            this.formRight.citys=event;
            this.formRight.maskCity=event.length?'123':'';
        },
        nameChange(event){
            this.formRight.name=event.target.value.trim();
        }
    }
}
</script>

<style lang="less">
    .add-archives{
        .ivu-form-item-error-tip{
            width:250px;
        }
        .edit-label{
            display: block !important;
            padding-right: 55px !important;
        }
        .bill-archives-class{
            padding-left:32px;
            height: 48px;
        }
        .city-class{
             .ivu-form-item-error-tip{
                width:250px;
                margin-top: 25px;
            }
        }
        .ivu-cascader .ivu-input{
            padding-right: 25px;
        }
    }
    
</style>
