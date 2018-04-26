<template>
  <div class="project-setting">
        <Tabs size="default" :value="tabs" @on-click="tabsClick" :animated="false">
            <TabPane label="列表视图" name="tab1">
                <Archives v-if="mask"/>

            </TabPane>
            <TabPane label="日历视图" name="tab2">

                <ProgressView v-if="!mask"/>

            </TabPane>
        </Tabs>
  </div>
</template>


<script>

import Archives from './archives'
import ProgressView from './progress-view';
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
        var tabDom = document.querySelectorAll('.project-setting .ivu-tabs')[0];
        this.tabs=sessionStorage.getItem('chartSetting')||'tab1';
        if(this.tabs=='tab2'){
            this.mask=false;
            tabDom.style.overflow = 'visible';
        }else{
             tabDom.style.overflow = 'hidden';
        }
    },
    methods:{
        tabsClick(key){
            var tabDom = document.querySelectorAll('.project-setting .ivu-tabs')[0];

            if(key=='tab2'){
                tabDom.style.overflow = 'visible';
                this.mask=false;

            }else{
                tabDom.style.overflow = 'hidden';
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
        .ivu-tabs-ink-bar{
            top:0px;
            height: 4px;
            border: 20px solid #fff;
            border-top: 0px;
            border-bottom: 0px;
            box-sizing: border-box;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            
            text-align: center;
            line-height: 35px;
            padding: 8px 20px;
        }
        .ivu-tabs-bar{
            margin: 0px;
        }
    }
</style>
