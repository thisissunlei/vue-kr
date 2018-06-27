<template>
    <div class="m-goods-price">
        <div id="goodsPriceScrollFuck" style="display:inline-block;padding:5px 7px;height:100%;overflow:auto;">
               <div  style="display:inline-block;width:100px;">
                    <span class="goods-title">商品</span> 
                    <span 
                        class="left-font"
                        v-for="item in joinData"
                        :key="item.id"
                    >
                        {{item.guidePrice}}
                    </span>
                </div>
                <div   style="display:inline-block;width:100px;"> 
                    <span class="goods-title">当前定价</span> 
                    <span 
                        class="left-font"
                        v-for="item in joinData"
                        :key="item.id"
                    >
                        {{item.guidePrice}}
                    </span>
                </div>
        </div>
        <div class="price-special">
            <span class="goods-title">更新后定价</span> 
            <Input 
                type="textarea"
                v-model="num" 
                placeholder="200个字符以内"
                id="goodsAreaScrollFuck"
            />
        </div>
    </div>
</template>

<script>
let leftPrice='';
let rightPrice='';
export default {
    props: {
        data:{
            type:Array,
            default:()=>[],   
        }
    },
    data() {
        return{
            num:'',
            joinData:[
                {capacity:123,id:101,guidePrice:345},
                {capacity:12,id:201,guidePrice:34},
                {capacity:123,id:102,guidePrice:345},
                {capacity:12,id:202,guidePrice:34},
                {capacity:123,id:103,guidePrice:345},
                {capacity:12,id:203,guidePrice:34},
                {capacity:123,id:1011,guidePrice:345},
                {capacity:12,id:2011,guidePrice:34},
                {capacity:123,id:1021,guidePrice:345},
                {capacity:12,id:2021,guidePrice:34},
                {capacity:123,id:1031,guidePrice:345},
                {capacity:12,id:2031,guidePrice:34},],
        }
    },
    mounted(){
       rightPrice=document.getElementById('goodsAreaScrollFuck').querySelector('textarea');
       leftPrice=document.getElementById('goodsPriceScrollFuck');
       rightPrice.addEventListener('scroll',this.scrollRight,false);
       leftPrice.addEventListener('scroll',this.scrollLeft,false);
    },
    destroyed(){
        rightPrice&&rightPrice.removeEventListener("scroll",this.scrollRight);
        leftPrice&&leftPrice.removeEventListener('resize',this.scrollLeft); 
    },
    methods:{
       scrollLeft(e){
           rightPrice.scrollTop=leftPrice.scrollTop;
       },
       scrollRight(e){
           leftPrice.scrollTop=rightPrice.scrollTop;
       }
    }
}
</script>

<style lang='less'>
     .m-goods-price{
          height:200px;
          .price-special{
              display:inline-block;
              width:200px;
              vertical-align:top;
              height:100%;
                .ivu-input-wrapper{
                    height:100%;
                    textarea.ivu-input{
                        height:100%;
                    }
                }
          }
          .left-font{
              display:inline-block;
              width:100%;
              text-align:center;
              font-size:14px;
          }
          .goods-title{
            width: 100%;
            display: inline-block;
            text-align: center;
            padding: 10px 0;
          }
     }
</style>
