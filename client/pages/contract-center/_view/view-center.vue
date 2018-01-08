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
        <div style="width:100%;padding:20px;">
          <Button type="info" @click="downSwitch">下载pdf</Button>
          <div style="float:right;">
            <Button @click="pageSub" icon="minus"></Button>
            {{page+'/'+numPages}}
            <Button @click="pageAdd" icon="plus"></Button>
          </div>
        </div>
        <div class="pdf-box" v-if="openPage"> 
          <pdf  :src="src" page="10" :height="'100mm'" style="height:300px" @num-pages="getNumPage" :page = "page" dpi="10"></pdf> 
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
      src:'',
      numPages:1,
      page:1,
      openPage:false
    }
  },
  mounted:function(){
    this.openPage = true;
    GLOBALSIDESWITCH("false");
     var that = this;
      this.config();
      var parameter = utils.getRequest()
      parameter.contractType = "NOSEAL"
      this.$http.get('get-station-contract-pdf-id',parameter, r => {    
          that.fileId = r.data.fileId || '';
          that.getPdfUrl(r.data.fileId||'');
      }, e => {
           that.$Notice.error({
              title:error.message||"后台出错请联系管理员"
            });
      })
  },
  methods:{
    selectCachet(select){
      this.isCachet = select;
      
    },
    getNumPage(detail){
      this.numPages = detail||1;
      console.log(detail,"iiiiiii")
    },
    pageSub(){
      if(this.page==1){
        this.page = 1;
      }else {
        this.page -=1;
      }
    },
    pageAdd(){
      if(this.page==this.numPages){
        this.page = this.numPages;
      }else {
        this.page +=1;
      }
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
        if(!e.message){
          e.message = "后台出错请联系管理员"
        }
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
          if(!r.data.fileId){
              that.$Notice.error({
                        title:error.message||"后台出错请联系管理员"
              });
              return;
          }
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
                        title:error.message||"后台出错请联系管理员"
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
  position: relative;
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