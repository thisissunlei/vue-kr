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
            data:['商品','商品类型','工位数量','进场日','离场日','租期','当前签约价','当前客户','客户当前在租工位数','随后可续时段','商品当前定价'],
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
     white-space: normal;
    word-break: break-all;
     height:55px;
     /*line-height:40px;*/
     background-color: #f8f8f9;
     z-index:999;
     vertical-align: middle;
  .slot-head-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        white-space: normal;
        word-break: break-all;
        font-weight: 700;
        &:nth-child(2),&:nth-child(8){
            width:110px;
        }
        &:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7),&:nth-child(9),&:nth-child(10),&:nth-child(11){
            width:80px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
            border-left: solid 1px #e9eaec;
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
