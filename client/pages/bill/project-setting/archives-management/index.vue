<template>
  <div class="archives-management">
        <div class="content">
            <div class="collapse">
                <KrCollapse :openIndex="openIndex" :data="collapseData" @onChange="onChange"/>
            </div>
            <div class="archives-box">
                <ArchivesDetail />
            </div>
        </div>
  </div>
</template>


<script>
import KrCollapse from '~/components/KrCollapse';
import ArchivesDetail from '../archives-detail'
export default {
    components:{
        KrCollapse,
        ArchivesDetail
    },
    data(){
       return {
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
        }
    }
}

</script>

<style lang="less" >
   .archives-management{

        background: #f5f7f9 ;

        
       .content{
           width: 100%;
           height:500px;
           padding-top:20px;
           padding-left: 285px; 
           background: #F6F6F6 ;
           position: relative;
           transition: all 0.3s;
           box-sizing: border-box;
           .collapse{
                position: absolute;
                top: 20px;
                left: 0px;
                width: 265px;
                height: 500px;
                background: #ffffff;

           }
           .archives-box{
               background: #ffffff;
               min-height: 500px;
               right: 0px;
               overflow: auto;
               height: 500px;
           }
       }
   }
</style>
