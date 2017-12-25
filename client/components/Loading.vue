<template lang="html">
  <div v-if="loading">
    <Spin fix>
        <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
        <div>加载中...</div>
    </Spin>
  </div>
</template>

<script>
export default {
  props:['loading']
}
</script>

<style scoped>
  .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
   }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
</style>