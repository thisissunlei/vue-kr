<template>
  <div class="g-icon-manage comment">
     <div class="div-two">
       <div style="padding:10px 10px 10px 0;border-bottom:1px solid #f8f8f8"> 
          <div style="float:right"><Button type="primary" size="small">添加评论</Button></div>
          <div style="border-left:5px solid #4b9ce4;padding-left:5px">项目评论</div>
      
       </div>
       <div style="padding:10px 10px 10px 0;border-bottom:1px solid #f8f8f8">
          <div style="float:left;border-radius:50%;border:1px solid #f7b634;background-color:;width:50px;height:50px">刘钊</div>
          <div style="margin-left:66px;">
              <div style="float:left">
                    <span style="margin:0;padding:0;font-size:14px;">刘钊</span>&nbsp;&nbsp;<span style="color:#c1c1c1">2018.1.1.1.1.1111</span>
              </div>
              <div style="float:right">
                  <a href="" >删除</a>
              </div>

          </div>
       </div>
    </div>
    <div class="div-one">


    </div>
   
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.comment{
  float: left;
  width: 100%;
  min-height: 390px;
  background-color: #f6f6f6;

  .div-one{

    // float: left;
    margin: 20px 450px 20px 20px;
  

    background-color: #fff;
    height: 200px;
  }
  .div-two{
    background-color: #fff;
    float: right;
    margin: 20px 20px 20px 0;
    width: 400px;
    height: 200px;


  }
}


</style>
