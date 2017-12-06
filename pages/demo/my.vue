<template>
<div>


<Message 
    type="error" 
    :openMessage="openMessage"
    warn="描述原因，作废失败"
    v-on:changeOpen="onChangeOpen"
></Message>
<Dialog 
:onClose="close">
    
<planMap :stationsubmit="submits"></planMap>

</Dialog>

<p @click="show">按钮</p>



</div>
  
</template>
<script>
import Message from '~/components/Message';
import planMap from '~/components/planMap.vue';
import Dialog from '~/components/Dialog.vue';
export default {
  components:{
        Message,
        planMap,
        Dialog
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
     close:function(){
        console.log('close')
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
