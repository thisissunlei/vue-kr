<template>
    <div class='slot-head-warp' :id="indentify=='daily'?'slot-head-daily-inventory':'slot-head-optional-inventory'">
        <div
            :class="indentify=='daily'?'slot-head-class':'slot-optional-class'"
            v-for="(item,index) in data"
            :key="index"
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
            data:['日期','开放数量 (个)','可预订数量 (个)','会员价 (个·天)','会员优惠价 (个·天)','游客价 (个·天)','游客优惠价 (个·天)'],
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
     z-index:23;

     vertical-align: middle;
  .slot-head-class, .slot-optional-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        white-space: normal;
        word-break: break-all;
        font-weight: 700;
        height: 50px;
        // &:nth-child(2){
        //     width:75px;
        // }
        // &:nth-child(4){
        //     width:80px;
        // }
        // &:nth-child(3){
        //     width:65px;
        // }

        // &:nth-child(5),&:nth-child(6){
        //     width:105px;
        // }
        // &:nth-child(7){
        //     width:80px;
        // }
        // &:nth-child(8){
        //     width:80px;
        // }
        // &:nth-child(10){
        //     width:95px;
        // }
        // &:nth-child(11){
        //     width:110px;
        // }
        
        
        
        // &:nth-child(12){
        //     width:75px;
        // }
        
        
        // &:nth-child(1),&:nth-child(9){
            width:100%;
            flex: 1.5;
            /*-moz-box-flex: 1; */
            /*-webkit-box-flex: 1; */
            /*box-flex:1;*/
            border-left: solid 1px #e9eaec;
        // }
        span{
            width: 100%;
            display: inline-block;
            transform: translateY(-50%);
            margin-top: 25px;
        }
    }
}
     
</style>
