<template>
  <section class="container">
    <div>
     <krInput 
       :name="params"
       @onEnter="keyEnter"
       @onChange="inputChange"
     />
     
    </div>
  </section>
</template>

<script>
import krInput from '~/components/EnglishInput.vue'

export default {
     transition (to, from) {
        if (!from) return 'slide-left'
        return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    },
    data() {
        return{
           params:{
              serialNumber:'' 
           } 
        }
    },
    components: {
        krInput
    },
    methods:{
      keyEnter(ev){
        console.log(';;;;',ev,this.params);
      },
      inputChange(ev){
        console.log('form-22',this.params);
      }
    }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
