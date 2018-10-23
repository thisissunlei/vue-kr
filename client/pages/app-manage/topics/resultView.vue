<template>
    <div class="g-result">
        <div class="m-result">
            <div class="u-result-title">
                {{detail.pollName}}{{detail.maxOption>1?'[多选]':'[单选]'}}
            </div>
            <div class="u-result-info">
               {{detail.pollUserCount}}人参与投票 <span class="u-result-status" v-if="detail.expiredTime"> ·  {{detail.expiredTime}}</span>
            </div>
            <div class="u-list">
                <div class="u-select-list" v-for="(item,index) in detail.options" :key="index">
                    <span class="u-select-name">{{item.optionName}}</span>
                    <span class="u-select-count">{{item.optionCount}}票  {{item.optionRate}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name:'result',
  props:{
      detail:{
          type:Object,
          defalut:{}
      }
  }
}
</script>
<style lang="less">
.g-result{
    width:100%;
    height:380px;
    padding:20px 0;
    box-sizing: border-box; 
    .m-result{
        width:326px;
        height:100%;
        overflow: auto;
        margin:0 auto;
        padding-right:15px;
    }
    .u-result-title{
        font-size:16px;
        color:#333333;
        width:100%;
        line-height:24px;
        display: inline-block;
        margin-bottom:7px;
        font-weight: 500;
    }
    .u-result-info{
      color:#666666;
      font-size: 13px; 
      height:18px;
      line-height:18px;
      margin-bottom:20px;
      .u-result-status{
          color:#999999;
      } 
    }
    .u-select-list{
        width:311px;
        height:50px;
        border-radius: 7px;
        margin-bottom:10px;
        background: #F6F6F6;
        display: flex;
        justify-content:space-between;
        padding:0 10px;
        box-sizing: border-box;
        .u-select-name{
           max-width:200px;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           font-size:15px;
           color:#333333;
           line-height:50px;
        }
        .u-select-count{
           font-size:13px;
           color:#666666;
           line-height:50px;
        }
    }


}
</style>


