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
                        @recordClick="recordClick"
                        

                    />
                    <KrField 
                        :readOrEdit="true" 
                        type="cascader" 
                        label="含税" 
                        value="221"
                        placeholder="请输入含税收入" 
                        @recordClick="recordClick"
                        @okClick="okClick"
                    />
                    <KrField 
                        :readOrEdit="true" 
                        type="textarea"  
                        label="含税" 
                        value="123er" 
                        placeholder="请输入含税收入" 
                        :maxLength="200"
                        @recordClick="recordClick"
                        @okClick="okClick"
                    />
                    <KrField 
                        :readOrEdit="true" 
                        type="time"  
                        label="含税" 
                        value="10:10" 
                        placeholder="请输入含税收入"
                        @recordClick="recordClick"
                        @okClick="okClick"
                    />
                    <KrField 
                        :readOrEdit="true" 
                        type="upImage"  
                        label="含税"  
                        placeholder="请输入含税收入" 
                        :value="imgs" 
                        @okClick="okClick"
                        @recordClick="recordClick"
                    /> 
                    <KrField 
                        :readOrEdit="true" 
                        type="date"  
                        label="含税" 
                        value="2018-01-02" 
                        placeholder="请输入含税收入"
                        @recordClick="recordClick"
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
                        @recordClick="recordClick"
                        @okClick="okClick"
                    /> -->

                    <!-- <KrField 
                        type="selectTree" 
                        :data="data" 
                        label="含税" 
                        value="formRight.input" 
                        @recordClick="recordClick"
                        placeholder="请输入含税收入"
                    /> -->


                    <KrField 
                        :readOrEdit="true" 
                        type="upFiles"  
                        label="含税"  
                        placeholder="请输入含税收入" 
                        :value="imgs" 
                        @okClick="okClick"
                        @recordClick="recordClick"
                    /> 
                    


                    <KrField 
                        :readOrEdit="true" 
                        type="text" 
                        label="含税" 
                        value="什么东西" 
                        placeholder="请输入含税收入" 
                        @recordClick="recordClick"
                        @okClick="okClick"

                    />
          
                 </div>
            </ClassificationBox>
            <ClassificationBox value="1" title="计划工期" :isBorder="true" type="num">
                 <div slot="content"  >
                     内容
                 </div>
            </ClassificationBox>
            <Drawer 
                :openDrawer="openRecord"
                iconType="view-icon"
                :close="cancelRecord"
                width="735"
            >   
                <div class="record-title" slot="title">
                    <div class="big-text">编辑记录</div>
                    <div class="small-text">招商经理</div>
                </div>
                <RecordDetail :data="data"/>
            </Drawer>
  </div>
</template>


<script>
import KrField from '~/components/KrField';
import ClassificationBox from '~/components/ClassificationBox';
import Drawer from '~/components/Drawer'
import RecordDetail from './record-detail'

export default {
    components:{
        ClassificationBox,
        KrField,
        Drawer,
        RecordDetail
    },
    data(){
       return {
           openRecord:false,
           imgs:[],
           openIndex:0,
           data:[
               {comment:'dasdfsdf',detail:"ppp",uTime:'123134112',updator:'作者以'},
               {comment:'vvvvv',detail:"kkkk",uTime:'65656756756',updator:'作者以'},
               {comment:'dasdfsdf',detail:"ppp",uTime:'123134112',updator:'作者以'}
           ],
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

        },
        recordClick(value){
            console.log(value,"ooooooo")
            this.cancelRecord();
        },
        cancelRecord(){
            this.openRecord = !this.openRecord;
        }
    }
}

</script>

<style lang="less" >
   .archives-detail{
       background: #ffffff;
        .record-title{
            display: inline-block;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            vertical-align: middle;
            .big-text{
                height: 22px;
                line-height: 22px;
                font-size: 16px;
                color: #333333;
            }
            .small-text{
                line-height: 20px;
                height: 20px;
                font-size: 14px;
                color: #666666;
            }
        }
   }
</style>
