<template>
  <div class="overflow-label">
            <div v-if="!showTooltip"  :id="overflowId">
                {{label}}
            </div>
           <Tooltip v-if="showTooltip" :content="label"  :always="always"  placement="bottom">
            <div  :id="overflowId" :class="overflowLabelName" @click="getAlways">
                {{label}}
            </div>
             <div slot="content" >
                    <div style="width:200px;word-wrap:break-word; word-break:break-normal;white-space: initial;" >
                    <!-- <div style="position:absolute;top:3px;right:3px;cursor:pointer;"  @click="getAlways">X</div> -->
                    {{label}}
                    </div>
            </div>
        </Tooltip>
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
        always:false,
        overflowLabelName:'overflow',
        overflowId:'overflow'+this._uid,
        showTooltip:false,
    }
  },
  mounted(){
      this.$nextTick(()=>{

          const labelDom = document.getElementById(this.overflowId);
          const labelHeight = labelDom.clientHeight;
          if(labelHeight>56){
              this.showTooltip  = true;
              this.overflowLabelName='overflow';

          }

      })

  },
  methods:{
      getAlways() {
          this.always = !this.always;
      }
  }
}
</script>

<style lang="less" scoped>


    .overflow{position: relative; max-height: 50px;overflow: hidden;cursor: pointer;}
    .overflow::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
    }




</style>

