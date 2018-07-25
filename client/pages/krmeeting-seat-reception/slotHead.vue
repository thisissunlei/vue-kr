<template>
    <div class='slot-head-warp' :id="indentify=='daily'?'slot-head-daily-inventory':'slot-head-optional-inventory'">
        <div
            :class="indentify=='daily'?'slot-head-class':'slot-optional-class'"
            v-for="item in data"
            :key="item"
         >
         <span v-html="item"></span>
            
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
            data:['使用日期','预计到场时间','预订的社区','预订座位数','已到场人数','联系电话','预订人身份','预订人所在社区','操作'],
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
            &:nth-child(3), &:nth-child(8){
                flex: 1.5;
                padding-left: 20px;
                width: 100%;
            }
            &:nth-child(1){
                border-left: solid 1px #e9eaec;
                width: 160px;
            }
            &:nth-child(2),
            &:nth-child(6),
            &:nth-child(7){
                width: 120px;
            }
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(9){
                width: 100px;
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
