<template>
    <div class='slot-head-warp' :id="indentify=='daily'?'slot-head-daily-inventory':'slot-head-optional-inventory'">
        <div
            :class="indentify=='daily'?'slot-head-class':'slot-optional-class'"
            v-for="(item,index) in data"
            :key="item"
            :style="index==0?'border-left:solid 1px #e9eaec':''"
         >
         <span>{{item}}</span>
            
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
            data:['账单类型-ID','客户名称','账单明细','服务开始日','账单金额','欠款金额','逾期时长(服务开始日起)'],
        }
    }
}
</script>

<style lang='less' scoped>
.slot-head-warp{
     position: fixed;
     top:60px;
     /*display: -moz-box; */
     /*display: -webkit-box; */
     display: flex; 
     white-space: normal;
    word-break: break-all;
     height:50px;
     /*line-height:40px;*/
     background-color: #f8f8f9;
     z-index:400;

     vertical-align: middle;
  .slot-head-class, .slot-optional-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        white-space: normal;
        word-break: break-all;
        font-weight: 700;
        height: 50px;
       &:nth-child(4){
            width:110px;
        }
        &:nth-child(3){
            width:250px;
        }
        &:nth-child(5),&:nth-child(6){
            width:100px;
        }
        &:nth-child(7){
            width:200px;
        }
          &:nth-child(1){
            width:120px;
        }
         &:nth-child(3),&:nth-child(2){
            width:100%;
            flex: 1;
            /*-moz-box-flex: 1; */
            /*-webkit-box-flex: 1; */
            /*box-flex:1;*/
            border-left: solid 1px #e9eaec;
        }
        span{
            width: 100%;
            display: inline-block;
            transform: translateY(-50%);
            margin-top: 25px;
        }
    }
}
     
</style>
