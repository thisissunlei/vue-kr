<template>
<div>


<Message 
    type="success" 
    :openMessage="openMessage"
    warn="描述原因，作废失败"
    v-on:changeOpen="onChangeOpen"
></Message>

<p @click="show">按钮</p>
<selectCommunities></SelectCommunities>


</div>
  
</template>
<script>
import Message from '~/components/Message';
import SelectCommunities from '~/components/selectCommunities';
export default { 
  components:{
        Message,
        SelectCommunities
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
     }
  }
 
}
</script>
