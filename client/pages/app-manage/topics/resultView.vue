<template>
    <div class="g-result">
        <div class="m-result">
            <div class="u-result-title">
                选择你最爱吃的早餐 [单选] 
            </div>
            <div class="u-result-info">
               3人参与投票 <span class="u-result-status"> ·  距离结束还有6天23时59分</span>
            </div>
            <div class="u-list">
                <div class="u-select-list">
                    <span class="u-select-name">肯德基</span>
                    <span class="u-select-count">2票  70%</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.g-result{
    width:100%;
    height:400px;
    padding:20px 0;
    box-sizing: border-box; 
    .m-result{
        width:311px;
        height:100%;
        overflow: auto;
        margin:0 auto;
    }
    .u-result-title{
        font-size:16px;
        color:#333333;
        height:30px;
        line-height:30px;
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


