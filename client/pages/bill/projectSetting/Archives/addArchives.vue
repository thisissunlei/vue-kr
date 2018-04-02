<template>
  <div class='add-archives'>
       <Form ref="formRight" :model="formRight" :rules="ruleValidate" label-position="left">

            <Form-item label="项目名称" class="bill-search-class" prop="name" style="margin-bottom:30px;">
                    <i-input 
                        v-model="formRight.name" 
                        placeholder="请输入项目名称"
                        style="width: 252px;"
                    /> 
            </Form-item>
            
            <Form-item label="所在地区" class="bill-search-class city-class" prop="maskCity">
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

          
            <!--<KrField 
                :readOrEdit="true" 
                type="datetime"  
                label="含税" 
                value="2018-01-02 10:10" 
                placeholder="请输入含税收入"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="cascader" 
                label="含税" 
                value="221"
                placeholder="请输入含税收入" 
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="textarea"  
                label="含税" 
                value="123er" 
                placeholder="请输入含税收入" 
                :maxLength="200"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="time"  
                label="含税" 
                value="10:10" 
                placeholder="请输入含税收入"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="date"  
                label="含税" 
                value="2018-01-02" 
                placeholder="请输入含税收入"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="select"   
                label="含税" 
                value="1" 
                placeholder="请输入含税收入" 
                :selectData="selectData" 
                :filterable="true"
                @okClick="okClick"
            />

            <KrField 
              type="selectTree" 
              :data="data" 
              label="含税" 
              value="formRight.input" 
              placeholder="请输入含税收入"
            />


            <KrField 
                :readOrEdit="true" 
                type="upFiles" 
                :data="data" 
                label="含税"  
                placeholder="请输入含税收入" 
                :value="imgs" 
                @okClick="okClick"
            />


            <KrField 
                :readOrEdit="true" 
                type="text" 
                label="含税" 
                value="什么东西" 
                placeholder="请输入含税收入" 
                @okClick="okClick"
            />-->
          
            
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
        }
    }
}
</script>

<style lang="less">
    .add-archives{
        .ivu-form-item-error-tip{
            width:250px;
        }
    }
    
</style>
