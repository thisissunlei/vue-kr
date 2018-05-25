
<template>
  <section class="container">
    <div>
        <krUpload 
            action="//jsonplaceholder.typicode.com/posts/"
            :file="[]"
            type="only"
            :columnDetail="{}"
            :onUpUrl="()=>{}"
        />
    </div>
  </section>
</template>

<script>
import krUpload from '~/components/KrUpload.vue';
export default {
     
    data() {
        return{
           params:{
              serialNumber:'' 
           } 
        }
    },
    components: {
      krUpload
    },
    methods:{
     
    },
    mounted(){
        console.log("555555")
    }
}
</script>

<style>

</style>
