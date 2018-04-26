<template>
  <div class="archives-detail">
            <ClassificationBox  value="1" title="计划工期" :isBorder="true" type="num">
                 <div slot="content"  >
                    
                    <KrField 
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
                        type="upImage"  
                        label="含税"  
                        placeholder="请输入含税收入" 
                        :value="imgs" 
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
                    <!-- <KrField 
                        :readOrEdit="true" 
                        type="select"   
                        label="含税" 
                        value="1" 
                        placeholder="请输入含税收入" 
                        :selectData="selectData" 
                        :filterable="true"
                        @okClick="okClick"
                    /> -->

                    <!-- <KrField 
                    type="selectTree" 
                    :data="data" 
                    label="含税" 
                    value="formRight.input" 
                    placeholder="请输入含税收入"
                    /> -->


                    <KrField 
                        :readOrEdit="true" 
                        type="upFiles"  
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
                    />
          
                 </div>
            </ClassificationBox>
            <ClassificationBox value="1" title="计划工期" :isBorder="true" type="num">
                 <div slot="content"  >
                     内容
                 </div>
            </ClassificationBox>
  </div>
</template>


<script>
import KrField from '~/components/KrField';
import ClassificationBox from '~/components/ClassificationBox';
export default {
    components:{
        ClassificationBox,
        KrField
    },
    data(){
       return {
           imgs:[],
           openIndex:0,
           collapseData:[
                {
                    label:"物业基础",
                    t_id:1,
                    value:1,
                    children:[
                        {label:'基础信息',value:2,t_id:2},
                        {label:'产权信息',value:3,t_id:3},
                        {label:'周边信息',value:4,t_id:4}
                    ]
               },
               {
                   label:"工程信息",
                   value:5,
                   t_id:5,
                   children:[
                       {label:'基础信息',value:6,t_id:6},
                       {label:'产权信息',value:7,t_id:7},
                       {label:'周边信息',value:8,t_id:8}
                   ]
               }
           ]
       }
    },
    mounted(){
        
    },
    methods:{
        onChange(index){
            this.openIndex = index;
        },
        okClick(){

        }
    }
}

</script>

<style lang="less" >
   .archives-detail{
       background: #ffffff;
        
   }
</style>
