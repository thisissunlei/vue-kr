<template>
  <div class="g-icon-manage comment">
     <div class="div-two">
       <div style="padding:10px 10px 10px 0;border-bottom:1px solid #f8f8f8"> 
          <div style="float:right"><Button type="primary" size="small">添加评论</Button></div>
          <div style="border-left:5px solid #4b9ce4;padding-left:5px">项目评论</div>
      
       </div>
       <div style="padding:10px 10px 10px 0;border-bottom:1px solid #f8f8f8">
          <div style="float:left;border-radius:50%;border:1px solid #f7b634;background-color:#f7b634;width:50px;height:50px;line-height:50px;text-align:center;color:#fff">刘钊</div>
          <div style="margin-left:66px;min-height:60px">
            <div style="height:25px">

              <div style="float:left">
                    <span style="margin:0;padding:0;font-size:14px;">刘钊</span>&nbsp;&nbsp;<span style="color:#c1c1c1">2018.1.1.1.1.1111</span>
              </div>
              <div style="float:right">
                  <a href="" >删除</a>
              </div>
              <div style="clear:both;"></div>
            </div>
    
              <div >
                <span>
                  属性是一个简写属性,用于设置四个 border-*-radius 属性。 提示:该属性允许您为元素添加圆角边框!
                </span>
              </div>
              <div>

                <img src="" style="float:left;width:130px;height:100px;padding:5px;border:1px solid #ccc"  alt="">
                <img src="" style="float:left;width:130px;height:100px;padding:5px;border:1px solid #ccc"  alt="">
                <img src="" style="float:left;width:130px;height:100px;padding:5px;border:1px solid #ccc"  alt="">
                <img src="" style="float:left;width:130px;height:100px;padding:5px;border:1px solid #ccc"  alt="">
              </div>

          </div>
          <div style="clear:both;"></div>
       </div>
    </div>
    <div class="div-one">


    </div>
   
  </div>
</template>

<script>
 import './img1.png'

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
