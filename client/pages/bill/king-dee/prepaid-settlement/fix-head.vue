<template>
    <div class='slot-head-overdue-nooperation'>
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
            data:['合同编号','客户名称','合同类型','销售员','服务开始日','首付款金额','首付款欠款金额','是否上传附件','逾期时长(服务开始日)']
        }
    }
}
</script>

<style lang='less' scoped>
.slot-head-overdue-nooperation{
     position: fixed;
     top:60px;
     display: -moz-box; 
     display: -webkit-box; 
     display: box; 
     height:40px;
     line-height:40px;
     background-color: #f8f8f9;
     z-index:400;
  .slot-head-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        font-weight: 700;
        &:nth-child(3),&:nth-child(7),&:nth-child(8){
            width:100px;
        }
        &:nth-child(6){
            width:90px;
        }
        &:nth-child(4){
            width:80px;
        }
        &:nth-child(5){
            width:110px;
        }
        &:nth-child(9){
            width:135px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
            border-left: solid 1px #e9eaec;
        }
        &:nth-child(2){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
        }
    }
}
     
</style>
