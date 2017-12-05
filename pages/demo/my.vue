<template>
<div>


<Message 
    type="error" 
    :openMessage="openMessage"
    warn="描述原因，作废失败"
    v-on:changeOpen="onChangeOpen"
></Message>
<planMap :stationsubmit="submits"></planMap>

<p @click="show">按钮</p>



</div>
  
</template>
<script>
import Message from '~/components/Message';
import planMap from '~/components/planMap.vue';
export default {
  components:{
        Message,
        planMap
    },
    data(){
        return{
           openMessage:false 
        }
    },
  methods:{
     show(){
        this.openMessage=true;
     },
     onChangeOpen(data){
         this.openMessage=data;
     },
     submits:function(){
                alert('haha')
            }
  }
 
}
</script>
