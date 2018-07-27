<template>
    <div class="m-goods-price">
        <div style="font-size: 14px;font-weight: 500;padding-left: 40px;">即将修改以下<span style="color:red;">{{data.length}}</span>个商品定价：</div>
        <div v-if="!priceList.length" style="text-align: center;">
            <div>
                <span class="goods-title">商品</span>
                <span class="goods-title">当前定价</span>
                <span class="goods-title" style="width:210px;">更新后定价</span>
            </div>
            <div id="goodsPriceScrollFuck" class="goodsPriceScrollFuck" @mouseover="leftOver" @mouseout="leftOut">
                    <div  style="display:inline-block;width:100px;vertical-align:top;">
                        <span 
                            class="left-font"
                            v-for="item in joinData"
                            :key="item.id"
                        >
                            {{item.name}}
                        </span>
                    </div>
                    <div   style="display:inline-block;width:100px;vertical-align:top;"> 
                        <span 
                            class="left-font"
                            v-for="item in joinData"
                            :key="item.id"
                        >
                            {{item.quotedPrice}}
                        </span>
                    </div>
            </div>
            <div class="price-special">
                <Input 
                    type="textarea"
                    v-model="numArea" 
                    id="goodsAreaScrollFuck"
                    placeholder="在此输入换行隔开"
                    @on-change="areaChange"
                    @on-keydown="keyDown"
                />
            </div>
        </div>

        <div v-if="priceList.length" style="margin-top:10px;">
            <Table 
               stripe   
               :columns="priceColumns" 
               :data="priceList" 
               height="260"
               border>
            </Table>
            <div style="margin-top:20px;">
                <Input 
                    v-model="remark" 
                    placeholder="修改原因最多100字"
                    type="textarea"
                    :maxlength="100"
               />
            </div>
        </div>

        <div slot="footer" style="margin: 30px 0;text-align: center;">
                <Button v-if="!priceList.length" type="primary" @click="submitPriceFirst">修改</Button>
                <Button v-if="!priceList.length" type="ghost" style="margin-left:20px" @click="cancelFirst">取消</Button>
                <Button v-if="priceList.length" type="primary" @click="submitPriceSecond">确认修改</Button>
                <Button v-if="priceList.length" type="ghost" style="margin-left:20px" @click="cancelSecond">取消</Button>
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
            numArea:'',
            numReplace:'',
            joinData:[],
            remark:'',
            priceColumns:[
                {
                    title: '商品',
                    key: 'name',
                    align:'center',
                },
                {
                    title: '当前定价',
                    key: 'quotedPrice',
                    align:'center',
                },
                {
                    title: '更新后定价',
                    key: 'newPrice',
                    align:'center',
                }
            ],
            priceList:[],
            changeList:[]
        }
    },
    mounted(){
       this.joinData=[].concat(this.data);
       rightPrice=document.getElementById('goodsAreaScrollFuck').querySelector('textarea');
       leftPrice=document.getElementById('goodsPriceScrollFuck');
       rightPrice.addEventListener('scroll',this.scrollRight,false);
    },
    destroyed(){
        rightPrice&&rightPrice.removeEventListener("scroll",this.scrollRight);
    },
    methods:{
       keyDown(event){
            event = event || window.event;
            if(this.changeList.length==this.data.length){
                if(event.keyCode == 13) {
                  event.returnValue = false;
                }
            }
       },
       areaChange(e){
           let middle=e.target.value.replace(/\n/g,'-');
           this.numReplace=e.target.value.replace(/\n/g,'-');
           this.changeList=middle.split('-');
           if(this.changeList.length>=this.data.length){
               this.changeList.splice(this.data.length,this.changeList.length-this.data.length);
               this.numReplace=([].concat(this.changeList)).join('-');
               this.numArea=([].concat(this.changeList)).join('\n');
           }  
       },
       submitPriceFirst(){
           let data={
                goodsList:JSON.stringify([].concat(this.data)),
                newPriceContents:this.numReplace
            }
            this.$http.post('goods-change-price',data).then((response)=>{
                this.priceList=response.data;
            }).catch((error)=>{
               this.$Notice.error({
                    title:error.message
                }); 
            })
       },
       submitPriceSecond(){
           let data={
                goodsList:JSON.stringify([].concat(this.priceList)),
                newPriceContents:this.numReplace,
                remark:this.remark
            }
            this.$http.post('goods-change-price',data).then((response)=>{
                this.$emit('submit');
            }).catch((error)=>{
               this.$Notice.error({
                    title:error.message
                }); 
            })
       },
       cancelFirst(){
           this.$emit('cancel');
       },
       cancelSecond(){
           this.priceList=[];
       },
       leftOver(){
           leftPrice.style.overflow='hidden';
       },
       leftOut(){
           leftPrice.style.overflow='auto';
       },
       scrollRight(e){
           leftPrice.scrollTop=rightPrice.scrollTop;
       }
    }
}
</script>

<style lang='less'>
     .m-goods-price{
          height: 400px;
          .price-special{
              display:inline-block;
              width:200px;
              vertical-align:top;
              height:300px;
                .ivu-input-wrapper{
                    height:100%;
                    textarea.ivu-input{
                        height:100%;
                        line-height: 26px;
                    }
                }
          }
          .left-font{
              display:inline-block;
              width:100%;
              text-align:center;
              font-size:14px;
              line-height: 26px;
          }
          .goods-title{
            width: 100px;
            display: inline-block;
            text-align: center;
            padding: 10px 0;
            font-size:14px;
            font-weight:500;
          }
          .goodsPriceScrollFuck{
              display:inline-block;
              padding:5px 7px;
              height:100%;
              height:300px;
              overflow:auto;
          }
          .goodsPriceScrollFuck::-webkit-scrollbar {
               width:0px;
          }
     }
</style>
