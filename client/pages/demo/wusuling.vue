<template>
    <div>
       <FlagLabel label="你好中国" 
            :data="timeObj"
            :startDate="{
                year:2018,
                month:3,
                dayNum:31
            }"
            minCalibration="50"
        />
        <ImportFile 
            url="//jsonplaceholder.typicode.com/posts/"
            @downFile="downFile"
            @close="close"
            @success="success"
            @error="error"
        />
    </div>
</template>

<script>
import FlagLabel from '~/components/FlagLabel';
import ToolTip from '~/components/ToolTip';
import ImportFile from '~/components/ImportFile';
export default {
    components:{
        FlagLabel,
        ToolTip,
        ImportFile
    },
    data() {
        return{
            timeObj:{
                actualEndTime:1521590400000,
                actualStartTime:1520726400000,
                planEndTime:1521504000000,
                planStartTime:1520640000000
            }
        }
    },
    methods:{
       downFile(){

       },
       close(){
        
       },
       error(){

       },
       success(){
           
       }
    }
}
</script>

<style lang='less' scoped>
     
</style>
