<template>
  <div class="g-pdf-download">
      <div class="u-pdf-title">
        请选择您打印的账单是否需要盖公章?
      </div>
      <div class="u-print-img-content">
          <div class="u-left-img u-print-box" @click="changeCheck('0')">
              <div class="u-print-img">
                 <span :class="[checked?'checked-logo':'check-logo']"></span>
              </div>
              <div class="u-print-title">示例一：未加盖公章的合同</div>
          </div>
          <div class="u-right-img  u-print-box" @click="changeCheck('1')">
              <div class="u-print-img">
                <span :class="[checked?'check-logo':'checked-logo']"></span>
              </div>
              <div class="u-print-title">示例二：加盖公章的合同</div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
   data(){
     return{
        checked:true,
        seal:'0',
     }
   },
   methods:{
     changeCheck(index){
        this.checked=!this.checked;
        //0:不带章 1:带章
        this.seal=index;
        this.$emit('formData',this.seal);
     }
   }


}
</script>

<style lang="less">
.g-pdf-download{
  
  .u-pdf-title{
    text-align: center;
    margin-top:20px;
    margin-bottom:20px;
    font-weight: 600;
    font-size:16px;
    color:#333;
  }
  .u-print-img-content{
    width:438px;
    height:300px;
    margin:0 auto;
    display: flex;
    margin-bottom:30px;
    .u-print-img{
      width:190px;
      height:270px;
      cursor: pointer;
    }
    .u-print-box{
      width:190px;
      height:290px;
      text-align: center;
      .check-logo{
          border:2px solid #fff;
          width: 55px;
          height: 55px;
          border-radius: 55px;
          display: inline-block;
          margin-top: 95px;

        }
        .checked-logo{
          border: 2px solid #7ED321;
          background: #7ED321 url('~/assets/images/check.svg') no-repeat ;
          display: inline-block;
          margin-top: 95px;
          width: 55px;
          height: 55px;
          border-radius: 55px;
          background-position:center;
        }
    }
    .u-print-title{
      font-size: 14px;
      color: #999;
      height:20px;
      line-height:20px;
      padding:14px 0;
      text-align: center;
     
    }
  }
  .u-left-img{
      justify-content:flex-start;
      margin-right:80px;
      .u-print-img{
         background:pink;
      }
  }
  .u-right-img{
      justify-content:flex-end;
      .u-print-img{
         background:#eee;
      }
      
  }
 

}



</style>



