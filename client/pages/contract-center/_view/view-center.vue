<template>
 <div>
      <Modal
        v-model="openDown"
        title="下载pdf"
        width="660"
      >
            <div style="text-align:center;font-size: 16px;color: #333;">请选择您打印的合同是否需要盖公章？</div>
            
            <div style="height:300px;">
              <div class="cachet-box" @click="selectCachet(false)">
                <img src="./images/noCachet.png" />
                <div>示例一：未加盖公章的合同</div>
                <div :class="!this.isCachet?'select cachet':'select'" ></div>
              </div>
           
              <div class="cachet-box" @click="selectCachet(true)">
                <img src="./images/cachet.png" />
                <div>示例二：加盖公章的合同</div>
                <div :class="this.isCachet?'select cachet':'select'"></div>
              </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="downLoad">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="downSwitch">取消</Button>
            </div>
      </Modal>
     <div class="box">
      <Button type="info" @click="downSwitch">下载pdf</Button>
        <div class="pdf-box"> 
         <pdf  :src="src" ></pdf>
            
        </div>
    </div>
    
 </div>
</template>

<script>
import utils from '~/plugins/utils';

export default {
  data(){
    return {
      isCachet:false,
      openDown:false,
      fileId:'100100',
      src:''
    }
  },
  mounted:function(){
    GLOBALSIDESWITCH("false");
     var that = this;
      this.config();
      var parameter = utils.getRequest()
      parameter.contractType = "NOSEAL"
      this.$http.get('get-station-contract-pdf-id',parameter, r => {    
         console.log(r.data.fileId)
          that.fileId = r.data.fileId || '';
          that.getPdfUrl(r.data.fileId||'');
      }, e => {
          that.$Message.info(e);
      })
  },
  methods:{
    selectCachet(select){
      this.isCachet = select;
      
    },
    config:function(){
        this.$Notice.config({
            top: 80,
            duration: 3
        });
    },
    getPdfUrl(id){
      var that = this;
      var parameter = {id:id};
      this.$http.post('get-station-contract-pdf-url',parameter, r => {    
          that.src = r.data;
      }, e => {
          that.$Message.info(e);
      })
    },
    downLoad(){
      var that = this;
      this.config();
      var parameter = utils.getRequest()
      if(this.isCachet){
        parameter.contractType = "HAVESEAL"
      }else{
        parameter.contractType = "NOSEAL"
      }
      this.$http.get('get-station-contract-pdf-id',parameter, r => {    
          // _this.communityList=r.data.items 
          if(!r.data.fileId){
              that.$Notice.error({
                  title:"fileId不能为空！"
              });
              return;
          }
          // var url = `/api/krspace-op-web/sys/downFile?fileId=${r.data.fileId}`
          // window.location.href = url;
          that.downLoadPdf(r.data);
          that.downSwitch();
      }, e => {
          that.$Message.info(e);
      })
     
    },
    downLoadPdf(params){
                var that=this;
                this.$http.post('get-station-contract-pdf-url', {
                    id:params.fileId,
                    
                }, (response) => {
                
                    // window.open(response.data,"_blank");

                      window.location.href = response.data;
                }, (error) => {
                    that.$Notice.error({
                        title:error.message
                    });
                })   
            },
    downSwitch(){
      this.openDown = !this.openDown;
    }
  }

}
</script>
<style lang="less"> 
.box{
  padding:20px;
  width:210mm;
  margin:auto;
}
.pdf-box{
   height:250mm;
   margin-top:20px;
   overflow:auto;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
}
.cachet-box{
  width:50%;
  position:relative;
  float:left;
  text-align:center;
  cursor: pointer;
  .select{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -31px;
    margin-top: -31px;

  }
  .cachet{
    border: 2px solid #7ED321;
    background: #7ED321 url('~/assets/images/check.svg') no-repeat;
    background-size: 60%;
    background-position:center;
  }
 
}

</style>