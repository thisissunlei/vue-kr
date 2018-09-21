<template>
  <div class="g-cover-img">
      <img :src="imgUrl" alt="">
  </div>
</template>
<script>
export default {
  name:'coverImg',
  props:{
      imgUrl:{
          type:String,
          defalut:''
      }
  }
}
</script>
<style lang="less">
.g-cover-img{
  height:100px;
  padding:5px;
  img{
      width:80px;
      height:80px;
      object-fit: contain;
  }
  
}
</style>



