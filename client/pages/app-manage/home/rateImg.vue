<template>
  <div class="g-tv-card" @click="click">
      <div class="u-img">
        <img :src="imgUrl" alt="">
      </div>
      <div class="u-txt">{{fileName}}</div>
  </div>
</template>
<script>
export default {
  name:'tvcard',
  props:{
      detailInfo:{
          type:String
      },
  },
  data(){
    return{
        imgUrl:'',  
    }
  },
  mounted(){
                        let regAdd=/\+/;
                      let regReduce=/\-/;
                      let imgClass="";
                      let textClass="";

                      if(regAdd.test()){
                          textClass='u-add-rate'
                      }
                      if(regReduce.test()){
                          textClass='u-reduce-rate'
                      }
  },
  methods:{
    
  }

}
</script>
<style lang="less">
.g-tv-card{
  height:80px;
  padding:10px;
  .u-img{
    width:80px;
    height:60px;
    float:left;
    img{
      width:100%;
      height:100%;
      object-fit: contain;
    }
  }
  .u-txt{
     float:left;
     width:60%;
     height: 60px;
     line-height: 60px;
     text-align: left;
     padding-left:15px
  }
  

}
</style>



