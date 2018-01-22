<template>
 <div>
    <div v-if="!isLoading">
        <Modal
          v-model="openDown"
          title="下载pdf-"
          width="660"
        >
        <div style="text-align:center;font-size: 16px;color: #333;">请选择您打印的合同是否需要盖公章？</div>   
        <div style="height:300px;">
          <div class="cachet-box" @click="selectCachet(false)">
            <img src="./images/noCachet.png" />
            <div>示例一：未加盖公章的合同</div>
            <div :class="!this.isCachet?'select cachet':'select'" />
          </div>
        
          <div class="cachet-box" @click="selectCachet(true)">
            <img src="./images/cachet.png" />
            <div>示例二：加盖公章的合同</div>
            <div :class="this.isCachet?'select cachet':'select'"/>
          </div>
        </div>

        <div slot="footer">
            <Button type="primary" @click="downLoadBtn">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="downSwitch">取消</Button>
        </div>

      </Modal>

      <div class="box">
        <KrPdf
          v-if="openPage"
          :pdfurl="src"
          :downSwitch="downSwitch"
        />

      </div>
    </div>
    <Loading v-if="isLoading" />
     <Message 
          :type="MessageType" 
          :openMessage="openMessage"
          :warn="warn"
          @changeOpen="onMessageChange"
      />
    
 </div>
</template>

<script>
import utils from '~/plugins/utils';
import Loading from '~/components/Loading';
import KrPdf from '~/components/KrPdf';
import Message from '~/components/Message';
export default {
  components:{
    Loading,
    KrPdf,
    Message
  },
  data(){
    return {
      isCachet:false,
      openDown:false,
      fileId:'100100',
      src:'',
      numPages:1,
      page:1,
      openPage:false,
      newWin:'',
      isLoading:false,
      MessageType:'error',
      openMessage:false,
      warn:'',
      time : new Date()
    }
  },
  mounted:function(){
    
    GLOBALSIDESWITCH("false");
    this.config();
    this.getPdfId();
  },
  methods:{
   
    getPdfId(){
      var parameter = utils.getRequest()
      parameter.contractType = "NOSEAL"
      this.$http.get('get-station-contract-pdf-id',parameter, r => {  
         
          this.fileId = r.data.fileId || '';
          this.getPdfUrl(r.data.fileId||'');
      },e  => {

        var newTime=new Date();
        var difference = newTime.getTime() - this.time.getTime();
        if(difference>30*1000){
          this.openMessage=true;
          this.warn=e.message;
          this.isLoading = false;
          return;
        }
        this.isLoading = true;
          setTimeout(() => {
            this.getPdfId();
          }, 1000);
      })
    },

    selectCachet(select){
      this.isCachet = select;
    },

    getNumPage(detail){
      this.numPages = detail||1;
    },

    pageReduce(){
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
      var parameter = {id:id};
      this.$http.post('get-station-contract-pdf-url',parameter, r => {    
        this.src = r.data;
        this.openPage = true;
      }, e => {
        if(!e.message){
          e.message = "后台出错请联系管理员"
        }
        this.$Message.info(e);
      })
    },

    downLoadBtn(){
      this.config();
      var parameter = utils.getRequest()
      if(this.isCachet){
        parameter.contractType = "HAVESEAL"
      }else{
        parameter.contractType = "NOSEAL"
      }
      // this.newWin = window.open()
      this.$http.get('get-station-contract-pdf-id',parameter, r => {    
        if(!r.data.fileId){
          this.$Notice.error({
            title:"后台出错请联系管理员"
          });
          return;
        }
        this.downLoadPdf(r.data);
        this.downSwitch();
      }, e => {
        this.$Message.info(e);
      })
    },

    downLoadPdf(params){
        this.$http.post('get-station-contract-pdf-url', {
          id:params.fileId,
        }, (response) => {
          // this.newWin.location = response.data;
          utils.downFile(response.data)
        }, (error) => {
          this.$Notice.error({
            title:error.message||"后台出错请联系管理员"
          });
        })   
    },
    onMessageChange(data){
        this.openMessage=data;
    },
    downSwitch(){
      this.openDown = !this.openDown;
    }
  }

}
</script>
<style lang="less" scoped> 
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