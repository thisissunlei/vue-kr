<template>
  <div class="g-cover-img">
      <img :src="`${imgUrl}?x-oss-process=image/resize,p_50`" alt="">
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
  text-align: center;
  line-height:100px;
  img{
      width:80px;
      height:80px;
      object-fit: contain;
      vertical-align: middle;
  }
  
}
</style>



