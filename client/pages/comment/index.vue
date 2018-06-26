<template>
  <div class="g-icon-manage comment">
     <div class="div-two">
       <div style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8"> 
          <div style="float:right"><Button type="primary" size="small">添加评论</Button></div>
          <div style="border-left:5px solid #4b9ce4;padding-left:5px">项目评论</div>
      
       </div>

<Scroll :on-reach-bottom="getcomments">
       

         <div dis-hover v-for="(item, index) in comments" :key="index" style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
          <div style="float:left;border-radius:50%;border:1px solid #f7b634;background-color:#f7b634;width:50px;height:50px;line-height:50px;text-align:center;color:#fff">{{item.creator.length>2?item.creator.slice(item.creator.length-3,2):item.creator}}</div>
          <div style="margin-left:66px;min-height:60px">
            <div style="height:25px">

              <div style="float:left">
                    <span style="margin:0;padding:0;font-size:14px;">{{item.creator}}</span>&nbsp;&nbsp;<span style="color:#c1c1c1">{{item.cTime}}</span>
              </div>
              <div style="float:right">
                  <a v-if="item.canDel" >回复</a>
                   <a v-else >删除</a>
                  
              </div>
              <div style="clear:both;"></div>
            </div>
    
              <div >
                <span>
                  {{item.comment}}
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
    </Scroll>
      



       <!-- <div style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
          <div style="float:left;border-radius:50%;border:1px solid #f7b634;background-color:#f7b634;width:50px;height:50px;line-height:50px;text-align:center;color:#fff">刘钊</div>
          <div style="margin-left:66px;min-height:60px">
            <div style="height:25px">

              <div style="float:left">
                    <span style="margin:0;padding:0;font-size:14px;">刘钊</span>&nbsp;&nbsp;<span style="color:#c1c1c1">2018.1.1.1.1.1111</span>
              </div>
              <div style="float:right">
                  <a href="" > 回复</a>
              </div>
              <div style="clear:both;"></div>
            </div>
    
              <div >
                <div><span><span style="color:#ccc"> 回复了&nbsp;&nbsp;</span><span>王冬梅:</span></span></div>
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
       </div> -->

    </div>
    <div class="div-one">


    </div>


    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formItem" :label-width="80">
          <FormItem label="Text">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写评论">
            </Input>
        </FormItem>
        </Form>

        <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
    </Modal>
   
  </div>
</template>

<script>

export default {

data(){
  return{
    page:1,
    pageSize:10,
    comments:[],
    totalCount:0,
    modal1: false,
    formItem: {
        
        textarea: ''
    }
  }
},
mounted(){
  this.getcomments()
},
methods:{
  ok () {
      this.$Message.info('Clicked ok');
  },
  cancel () {
      this.$Message.info('Clicked cancel');
  },
  getcomments(){
    let param = {page:this.page,pageSize:this.pageSize ,projectId:38}
    this.$http.get('typePage',param).then((res)=>{
      if(res.data.items && res.data.items.length>0)
      for(let i = 0 ;i<res.data.items.length;i++){
          this.comments.push (res.data.items[i])
      }
     

      this.totalCount = res.data.totalCount
   
      console.log(res)
    }).catch((e)=>{
      console.log(e)
    })
  }
}


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
    height: 500px;
    overflow: auto;


  }
}


</style>
