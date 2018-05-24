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
            data:['商品','商品类型','工位数量','距进场日','进场日','即将进场客户','客户是否新入住','联系人','联系方式','离场日','租期'],
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
  .slot-head-class,.slot-optional-class{
        text-align: center;
        border-right:solid 1px #e9eaec;
        border-bottom:solid 1px #e9eaec;
        white-space: normal;
        word-break: break-all;
        font-weight: 700;
        &:nth-child(2){
            width:110px;
        }
        &:nth-child(7),&:nth-child(8){
            width:100px;
        }
        &:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(9),&:nth-child(10),&:nth-child(11){
            width:80px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
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
