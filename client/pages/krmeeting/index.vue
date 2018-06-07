<template>
    <div class="km-order">
         <Tabs value="name1">
            <TabPane label="未过期会议" name="name1">
                <TimeInMeeting/>
            </TabPane>
            <TabPane label="已过期会议" name="name2">
                <TimeoutMeeting/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

import TimeoutMeeting from './timeoutMeeting';
import TimeInMeeting from './timeInMeeting';


export default {
   name:'billList',
    head () {
            return {
                title: "KM会议室"
            }
    },
   data(){
       return {
           
       }
   },
   components:{
       TimeInMeeting,TimeoutMeeting
   },
   mounted(){

   },
   methods:{
        
        
       
    }
 }
</script>
<style>
    
</style>