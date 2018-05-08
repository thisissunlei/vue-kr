<template>
  <div class="project-setting">
        <Tabs size="default" :value="tabs" @on-click="tabsClick" :animated="false">
            <TabPane label="待开业项目" name="PREPARE">
                <!--项目管理档案列表
                 <Archives v-if="mask"/> 
                -->
                <ProjectView />
            </TabPane>
            <TabPane label="已开业项目" name="OPENED">

                <!-- 项目总览
                    <ProgressView v-if="!mask"/> 
                -->
               <ProjectView />
                
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
            mask:true,
            tabs:'PREPARE'
        }
    },
    mounted(){
        GLOBALSIDESWITCH("false");
        var tabDom = document.querySelectorAll('.project-setting .ivu-tabs')[0];
        if(sessionStorage.getItem('chartSetting')==""){
            sessionStorage.setItem('chartSetting','PREPARE');
        }
        this.tabs=sessionStorage.getItem('chartSetting')||'PREPARE';
        if(this.tabs=='OPENED'){
            this.mask=false;
            tabDom.style.overflow = 'visible';
        }else{
             tabDom.style.overflow = 'hidden';
        }
    },
    methods:{
        tabsClick(key){
            var tabDom = document.querySelectorAll('.project-setting .ivu-tabs')[0];

            if(key=='OPENED'){
                tabDom.style.overflow = 'visible';
                this.mask=false;

            }else{
                tabDom.style.overflow = 'hidden';
                this.mask=true;
            }
            this.tabs=key;
            sessionStorage.setItem('chartSetting',key);
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
            border: 20px solid #fff;
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
        .ivu-tabs-bar{
            margin: 0px;
        }
    }
</style>
