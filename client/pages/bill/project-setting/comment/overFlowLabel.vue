<template>
  <div class="overflow-label" :id="overflowId">
      {{label}}
  </div>
</template>

<script>

export default {
 
  components: {
  },
  props:{
      label:{
          type:String,
          default:''
      }
  },
//   watch:{
//       label(){
//           console.log(this.label.length)
//       }
//   },
  data () {
    return {
        overflowId:'overflow'+this._uid
    }
  },
  mounted(){
      this.$nextTick(()=>{
          console.log()
          const labelDom = document.getElementById(this.overflowId);
          const labelHeight = labelDom.clientHeight;
          if(labelHeight>35){
              labelDom.className='overflow';
          }
          console.log(labelHeight,"oooooo")
      })
    //   console.log(this.label,"pppppooooo")
      
  }
}
</script>

<style lang="less" scoped>


    .overflow{position: relative; max-height: 35px;overflow: hidden;}
    .overflow::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
    }



    
</style>

