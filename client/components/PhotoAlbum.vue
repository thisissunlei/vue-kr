<template>
  <div class="photo-album">
      <div class="mask">

      </div>
      <div>
            <div 
                class="back"
                style="left:0px;"
                @click="backClick"
            >
                <span 
                    class=" ivu-icon ivu-icon-ios-arrow-back"
                >
                
                </span>
            </div>
            <div style="padding:0px 40px;">
                <img :src="data[urlIndex].url" alt="">
            </div>
            <div
                class="forward"
                style="right:0px;"
                @click="forwardClick"
            >
                <span
                    class="ivu-icon ivu-icon-ios-arrow-forward"
                    
                >
                
                </span>
            </div>
      </div>
     
  </div>
</template>

<script>
    export default {
        props:{
            data:{
                default:()=>[],
                type:Array
            },
            show:{
                default:false,
                type:Boolean
            },
            eyeIndex:{
                default:0,
                type:Number

            }
            
        },
        data(){
            return {
                urlIndex:this.eyeIndex
            }
        },
        methods:{
            backClick(){
                if(this.urlIndex == 0){
                    this.urlIndex = this.data.length -1;
                }else {
                    this.urlIndex--;
                }

            },
            forwardClick(){
                if(this.urlIndex == this.data.length -1){
                    this.urlIndex = 0;
                }else {
                    this.urlIndex++
                }

            }
        },
        mounted(){
            console.log(this.urlIndex,this.eyeIndex)
            this.urlIndex = this.eyeIndex;

        }
    }
</script>

<style lang="less" scoped>
.photo-album{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    text-align: center;
    img{
        max-width: 80%;
        
    }
    .mask{
        background: rgba(0,0,0,.6);
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .back,.forward{
        font-size:40px;
        position:absolute;
        padding: 0 10px;
        line-height:100vh;
        top:0px;
        cursor: pointer;
        color: #fff;
    }
    .back:hover,.forward:hover{
        background: #ccc;
        cursor: pointer;
    }
}
</style>

