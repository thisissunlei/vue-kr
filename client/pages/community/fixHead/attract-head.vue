<template>
    <div class='slot-head-attract-investment'>
        <div
            class='slot-head-class'
            v-for="item in data"
            :key="item"
         >
            {{item}}
       </div>
    </div>
</template>

<script>
   export default {
    data() {
        return{
            data:['商品名称','商品类型','工位数量','商品定价','招商状态','签约价','折扣','合同开始','合同结束','租期','渠道来源','销售员']
        }
    }
}
</script>

<style lang='less' scoped>
.slot-head-attract-investment{
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
        &:nth-child(2),&:nth-child(8),&:nth-child(9),&:nth-child(12){
            width:100px;
        }
        &:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(10){
            width:90px;
        }
        &:nth-child(7),&:nth-child(3){
            width:60px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
            border-left: solid 1px #e9eaec;
        }
        &:nth-child(11){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
        }
    }
}
     
</style>
