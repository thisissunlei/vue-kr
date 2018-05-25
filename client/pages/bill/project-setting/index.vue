<template>
  <div class="project-setting" id="projectSetting">
        <Tabs size="default" :value="tabs" @on-click="tabsClick" :animated="false">
            <TabPane label="待开业项目" name="PREPARE">
                <ProjectView  v-if="tabs=='PREPARE'"/>
            </TabPane>

            <TabPane label="已开业项目" name="OPENED">
               <ProjectView  v-if="tabs=='OPENED'" />
            </TabPane>
        </Tabs>
  </div>
</template>


<script>

import ProjectView from './project-view';
export default {
    components:{
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
       
        this.tabs=sessionStorage.getItem('chartSetting') ||'PREPARE';
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
