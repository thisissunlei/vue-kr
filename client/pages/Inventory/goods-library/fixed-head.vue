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
    props:{
        isShowEdit:{
            type:Boolean
        }
    },
    watch:{
      isShowEdit:function(val){
          if(!val){
              this.data.push('操作');
          }else{
              if(this.data.length==11){
                  this.data.splice(10,1);
              }
          }
      }
    },
    data() {
        return{
            data:['商品名称','商品类型','工位数量','商品属性','面积','商品定价','当前状态','后续状态变化','设备绑定','商品位置']
        }
    }
}
</script>

<style lang='less' scoped>
.slot-head-attract-investment{
     position: fixed;
     top:60px;
     text-align: center;
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
        &:nth-child(2),&:nth-child(10){
            width: 120px;
        }
        &:nth-child(11){
            width:100px;
        }
        &:nth-child(9){
            width: 60px;
        }
        &:nth-child(3),&:nth-child(5),&:nth-child(6),&:nth-child(7){
            width:90px;
        }
        &:nth-child(4){
             width:120px;
        }
        &:nth-child(8){
            width: 150px;
        }
        &:nth-child(1){
            width:100%;
            -moz-box-flex: 1; 
            -webkit-box-flex: 1; 
            box-flex:1;
        }
    }
}
     
</style>
