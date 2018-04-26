<template>
  <div class="photo-album">
      <div class="mask"></div>
      
     
      <div>
           
            <div class="view-img-box" style="padding:0px 40px;">
                <span class="close-btn ivu-icon ivu-icon-close-round" @click="close"></span>
                <img :src="data[urlIndex].url" alt="">
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

            },
            close(){
                this.$emit('close')
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
    z-index: 999;
    .close-btn{
        position: absolute;
        top: 30px;
        width: 36px;
        height: 36px;

        right: 18px;
        top: -18px;
        color: #fff;
        font-size: 36px;
        background: brown;
        cursor: pointer;
    }
    .view-img-box{
        position: absolute;
        height: 70%;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        text-align: center;
    }
    img{
        // width: 80%;
       
        max-width: 1200px;
        height: 100%;
        // height: 790px;
        
      
        
        
    }
    .mask{
        background: rgba(0,0,0,.3);
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
        width: 36px;
        height: 36px;
        top:0px;
        cursor: pointer;
        color: #fff;
        top: 50%;
        transform: translateY(-50%);
    }
    .back:hover,.forward:hover{
        background: #ccc;
        cursor: pointer;
    }
}
</style>

