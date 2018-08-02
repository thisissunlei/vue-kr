<template>
    <div class='slot-head-warp' :id="indentify=='daily'?'slot-head-daily-inventory':'slot-head-optional-inventory'">
        <div
            :class="indentify=='daily'?'slot-head-class':'slot-optional-class'"
            v-for="item in data"
            :key="item"
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
            data:['社区','开放时间','今日开放数量','今日可订数量','今日会员单价','今日游客单价','上架状态','操作'],
        }
    }
}
</script>

<style lang='less' scoped>
.slot-head-warp{
     position: fixed;
     top:60px;
     display: flex; 
     white-space: normal;
    word-break: break-all;
     height: 40px;
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
        height: 40px;
      width: 120px;
        &:nth-child(1){
            width: 100%;
            flex: 1.5;
            border-left: solid 1px #e9eaec;
        }
        &:nth-child(2){
            width: 150px;
        }
        span{
            width: 100%;
            display: inline-block;
            transform: translateY(-50%);
            margin-top: 20px;
        }
    }
}
     
</style>
