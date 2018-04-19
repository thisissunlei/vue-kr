<template>
    <div class='slot-head-warp' :id="indentify=='daily'?'slot-head-daily-inventory':'slot-head-optional-inventory'">
        <div
            :class="indentify=='daily'?'slot-head-class':'slot-optional-class'"
            v-for="item in data"
            :key="item"
         >
            {{item}}
       </div>
    </div>
</template>

<script>
   export default {
    props:{
       indentify:{
           type:String,
           default:''
       }
    },
    data() {
        return{
            data:this.indentify=='daily'?['商品','商品类型','商品属性','面积','工位单价','工位数量','商品总价','当日库存','签约价','最近可租起始日','最近可租结束日']:['商品','商品类型','商品属性','面积','工位单价','工位数量','商品总价','可租起始日','可租结束日'],
        }
    }
}
</script>

<style lang='less' scoped>
.slot-head-warp{
     position: fixed;
     top:60px;
     display: -moz-box; 
     display: -webkit-box; 
     display: box; 
     height:40px;
     line-height:40px;
     background-color: #f8f8f9;
     z-index:999;
  .slot-head-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        font-weight: 700;
        &:nth-child(2){
            width:110px;
        }
        &:nth-child(4),&:nth-child(9){
            width:80px;
        }
        &:nth-child(5),&:nth-child(6),&:nth-child(7),&:nth-child(8){
            width:100px;
        }
        &:nth-child(10),&:nth-child(11){
            width:130px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
            border-left: solid 1px #e9eaec;
        }
        &:nth-child(3){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
        }
    }
    .slot-optional-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        font-weight: 700;
        &:nth-child(2){
            width:110px;
        }
        &:nth-child(4){
            width:80px;
        }
        &:nth-child(5),&:nth-child(6),&:nth-child(7){
            width:100px;
        }
        &:nth-child(8),&:nth-child(9){
            width:130px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
            border-left: solid 1px #e9eaec;
        }
        &:nth-child(3){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
        }
    }
}
     
</style>
