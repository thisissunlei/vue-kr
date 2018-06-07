<template>
  <div class="project-setting" id="projectSetting">
        <Tabs size="default" :value="tabs" @on-click="tabsClick" :animated="false">
            <TabPane label="待开业项目" name="PREPARE">
                <!--项目管理档案列表
                 <Archives v-if="mask"/> 
                -->
                <ProjectView type="PREPARE"  v-if="tabs=='PREPARE'"/>
            </TabPane>
            <TabPane label="已开业项目" name="OPENED">

                <!-- 项目总览
                    <ProgressView v-if="!mask"/> 
                -->
               <ProjectView type="OPENED"  v-if="tabs=='OPENED'" />
            </TabPane>
        </Tabs>
  </div>
</template>


<script>

import Archives from './archives'
import ProjectView from './project-view';
export default {
    components:{
        Archives,
        ProjectView
    },
    data(){
        return{
         
            tabs:'PREPARE'
        }
    },
    mounted(){
        GLOBALSIDESWITCH("false");
        var tabDom = document.querySelectorAll('.project-setting .ivu-tabs')[0];
       
        // this.tabs=sessionStorage.getItem('chartSetting') ||'PREPARE';
        // if(this.tabs=='OPENED'){
        //     this.mask=false;
        //     tabDom.style.overflow = 'visible';
        // }else{
        //      tabDom.style.overflow = 'hidden';
        // }
    },
    methods:{
        tabsClick(key){
            // var tabDom = document.querySelectorAll('.project-setting .ivu-tabs')[0];

            this.tabs=key;
            // sessionStorage.setItem('chartSetting',key);
        },
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
        .ivu-tabs-ink-bar{
            top:0px;
            height: 4px;
            border-top: 0px;
            border-bottom: 0px;
            box-sizing: border-box;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            width: 50%;
            text-align: center;
            line-height: 35px;
            padding: 8px 20px;
            
        }
        .ivu-tabs-no-animation{
            overflow: visible !important;
        }
        .ivu-tabs-bar{
            margin: 0px;
        }
    }
</style>