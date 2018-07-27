<template>
  <div :class="[textClass,'g-rate-img']" >
      <span class="u-txt">{{detailInfo}}</span>
      <span class="u-rate-img"></span>
  </div>
</template>
<script>
export default {
  name:'rateImg',
  props:{
      detailInfo:{
          type:String
      },
  },
  data(){
    return{
        textClass:'' 
    }
  },
  mounted(){
    if(this.detailInfo){
        this.getClass(this.detailInfo)
		}
  },
  watch: {
			$props: {
				deep: true,
				handler(nextProps) {
          if(this.detailInfo){
              this.getClass(this.detailInfo)
          }
				
				}
			}

	},
  methods:{
    getClass(value){      
      let regAdd=/\+/;
      let regReduce=/\-/;
      if(regAdd.test(value)){
          this.textClass='u-add-rate';
      }
      if(regReduce.test(value)){
          this.textClass='u-reduce-rate'
      }
    }
  }

}
</script>
<style lang="less">
.g-rate-img{
  .u-txt{
      display: inline-block;
  }
  .u-rate-img{
    width:6px;
    height:10px;
    display: inline-block;
    padding-left: 10px;
    vertical-align: -1px;
  }
  &.u-add-rate{
    .u-txt{
      color: #FF6868;
    }
    .u-rate-img{
      background: url('./images/icon_arrow_up.svg') no-repeat center center;
      background-size: 100% 100%;
    }

  }

  &.u-reduce-rate{
    .u-txt{
      color: #7ED321;
    }
    .u-rate-img{
      background: url('./images/icon_arrow_down.svg') no-repeat center center;
      background-size: 100% 100%;
    }
  }
}


</style>



