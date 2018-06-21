
<template>
  <section class="container">
    <div>
        <krUpload 
            :file="[]"
            type="only"
            :columnDetail="{}"
           
        />
    </div>
  </section>
</template>

<script>
import krUpload from '~/components/KrUpload';
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
