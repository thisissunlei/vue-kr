<template>
  <div class="project-setting">
        <Tabs size="default">
            <TabPane label="项目档案管理">
                <archives />
            </TabPane>
            <TabPane label="项目档案管理">
                <ProgressView/>
            </TabPane>
        </Tabs>
  </div>
</template>


<script>

import archives from './archives'
import ProgressView from './progressView';
export default {
    components:{
        archives,
        ProgressView
    },
    data(){
        return{

        }
    },
    methods:{
        
    },

 
}

</script>

<style lang="less" >
    .project-setting{
        
        .ivu-tabs-bar{
            margin: 0px;
        }
    }
</style>
