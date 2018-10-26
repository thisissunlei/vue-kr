<template>
    <div class="g-door-permmision-owner">
        <SectionTitle :title="title" />
        <div class="upgrade-log-list">
           <LogList/>
        </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import LogList from './logList';



export default {
   components:{
      SectionTitle,
      LogList
   },
   head () {
        return {
            title: "设备升级记录"
        }
    },
   data(){
     return{
        typeName : ''
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.typeName = this.$route.query.typeName;
       this.versionCode = this.$route.query.versionCode;
   },
   computed: {

       title : function(){
            return "升级记录（升级类型："+ this.typeName + "；版本编号："+this.versionCode+"）"
       }
   },
   methods:{
       
        
    }

}
</script>
<style lang="less">
    .upgrade-log-list{
       padding-top:10px;
    }
</style>

