<style lang="less">
.ui-message-content{
    height:184px;
    img{
        width:100px;
        height: 100px;
        display: block;
        margin: 20px auto;
    }
    .ui-reminder{
        text-align: center;
        font-size: 18px;
        line-height: 18px;
        color: #333333;
    }
}
.ui-message{
.ivu-modal-footer{
     border:none;
     padding:0;
}
}

</style>
<template>
    <Modal class="ui-message"  v-model="openMessage"  width="443"  >
        <div class="ui-message-content">
            <div v-if="type=='success'">
                <img src="~assets/images/success.png" />
                <p class="ui-reminder">{{warn}}</p>
            </div>
            <div v-else-if="type=='error'">
                <img src="~assets/images/error.png" />
                <p class="ui-reminder">{{warn}}</p>
            </div>
        </div>
        <div slot="footer">
        </div>
    </Modal>
</template>

<script>

export default {
  name:'Message',
  props:['type','openMessage','warn'],
  updated: function () {
        var _this=this;
        if(this.type=='success' && this.openMessage){
            setTimeout(function(){
                _this.openMessage=false;
                _this.$emit('changeOpen',_this.openMessage)
            },1500)
          return;
        }
    this.$emit('changeOpen',this.openMessage)
  }
}
</script>

