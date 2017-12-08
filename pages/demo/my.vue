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
import SelectCommunities from '~/components/selectCommunities';
export default { 
  components:{
        Message,
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
     onChangeOpen(data){
         this.openMessage=data;
     } ,
    onchange(data){
        console.log('date-------',data)
    }
	
  }
 
}
</script>
