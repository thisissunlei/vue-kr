<template>
  <div class="photo-album">
      <div class="mask"  @click="close"></div>
      
     
      <div>
           
            <div class="view-img-box" style="padding:0px 40px;">
               
                <img :src="data[urlIndex].url" alt="">
                <div 
                    class="back"
                    style="left:-60px;"
                    @click="backClick"
                >
                </div>

                <div
                    class="forward"
                    style="right:-60px;"
                    @click="forwardClick"
                >
                </div>
                <span class="close-btn " @click="close"></span>
                <Button class="down-img" @click="downImage(data[urlIndex].url)" type="primary">下载原图</Button>
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
            },
            downImage(url){
                this.$emit('downImage',url)
                console.log(url,"pppppppp")
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
    .down-img{
        position: absolute;
        left: 50%;
        bottom: 30px;
        width: 130px;
        transform: translateX(-50%);
    }
    .close-btn{
        position: absolute;
        top: 30px;
        width: 36px;
        height: 36px;
        background-image: url(./images/close.svg);
        background-size:101%;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #ffffff;

        right: 25px;
        top: -18px;
        color: #fff;
        font-size: 36px;
        // background: brown;
        border-radius: 50%;
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
        max-width: 1200px;
        height: 100%;
        border-radius:6px;
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
        background-size:90%;
        background-repeat: no-repeat;
    }
    .back{
        background-image: url(./images/arrow_left.svg);
        
    }
    .forward{
        background-image: url(./images/arrow_right.svg);
    }
    // .back:hover,.forward:hover{
    //     background: #ccc;
    //     cursor: pointer;
    // }
}
</style>

