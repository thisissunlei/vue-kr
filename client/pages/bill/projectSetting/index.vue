<template>
  <div class="project-setting">
        <Tabs size="default" :value="tabs" @on-click="tabsClick">
            <TabPane label="项目档案管理" name="tab1">
                <Archives v-if="mask"/>
                
            </TabPane>
            <TabPane label="开业进度总览" name="tab2">
                 
                <ProgressView v-if="!mask"/>

            </TabPane>
        </Tabs>
  </div>
</template>


<script>

import Archives from './Archives'
import ProgressView from './ProgressView';
export default {
    components:{
        Archives,
        ProgressView
    },
    data(){
        return{
            mask:true,

            tabs:'tab1'
        }
    },
    mounted(){
        GLOBALSIDESWITCH("false");
        this.tabs=sessionStorage.getItem('chartSetting')||'tab1';
        if(this.tabs=='tab2'){
            this.mask=false;
        }
    },
    methods:{
        tabsClick(key){
            if(key=='tab2'){
                this.mask=false;
            }else{
                this.mask=true;
            }
            this.tabs=key;
            sessionStorage.setItem('chartSetting',key);
        }
    }
}

</script>

<style lang="less" >
    .project-setting{
        .ivu-tabs{
            overflow: visible;
        }
        .nav-text.ivu-tabs-nav{
            width: 100%;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            width: 50%;
            text-align: center;
        }
        .ivu-tabs-bar{
            margin: 0px;
        }
    }
</style>
