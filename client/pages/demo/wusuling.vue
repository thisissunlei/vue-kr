<template>
    <div>
       <FlagLabel label="123" 
            :data="timeObj"
            :startDate="{
                year:2018,
                month:3,
                dayNum:31
            }"
            minCalibration="50"
        />
    </div>
</template>

<script>
import FlagLabel from '~/components/FlagLabel';
import ToolTip from '~/components/ToolTip';
export default {
    components:{
        FlagLabel,
        ToolTip
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
      
    }
}
</script>

<style lang='less' scoped>
     
</style>
