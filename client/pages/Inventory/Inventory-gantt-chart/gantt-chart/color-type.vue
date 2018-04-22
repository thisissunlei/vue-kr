<template>
  <div style="display:inline-block;margin-top: 6px;padding:0px 10px;">
        <span style="vertical-align:middle;color:#999;font-size:14px;font-family: PingFangSC-Medium;">{{title}}</span>
        <span
            class="article"
            :style="{background:color,verticalAlign:'middle'}"
        ></span>
    </div>
</template>


<script>

export default {
    
    props:{
        title:{
            type:String
        },
       color:{
           type:String
       }
    },
}
</script>

<style lang="less" scoped>

   
</style>
