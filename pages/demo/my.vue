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
<searchCompany 
    name="customerName"
    style="width: 250px"
    :onchange="onchange"
></searchCompany>  

</div>
  
</template>
<script>
import searchCompany from '~/components/searchCompany';
import Message from '~/components/Message';
import planMap from '~/components/PlanMap.vue';
import SelectCommunities from '~/components/SelectCommunities';

export default {
  components:{
        Message,
        planMap,
        SelectCommunities,
        searchCompany
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
     } ,
    onchange(data){
        console.log('date-------',data)
    }
	
  }
 
</script>
