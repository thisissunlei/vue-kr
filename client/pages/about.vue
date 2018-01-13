<template>
  <section class="container">
     <pdf  :src="src" ></pdf>
  </section>
</template>


<script>


export default {

  asyncData ({ req }) {

    return {
      name: req ? 'server' : 'client'
    }
    
  },

  created(){

    console.log(this.$route.query)
  }


}

</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
