<style lang="less">
.ui-message-content{
    height:220px;
    
    
    img{
        width:156px;
        height: 156px;
        display: block;
        margin: 20px auto;
    }
    .ui-reminder{
        text-align: center;
        font-size: 14px;
        line-height: 26px;
        color: #333333;
    }
}
.ui-message{
    position: relative;
    z-index:1200;
.ivu-modal-footer{
     border:none;
     padding:0;
}
.u-txt-green{
    color: #77cd50;
}
.u-txt-red{
    color:#FF6868;
}
}
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    .ivu-icon-ios-close-empty{
      color:#EDEDED;
    }
    }

</style>
<template>
    <Modal class="ui-message" class-name="vertical-center-modal" v-model="flag"  width="443"  :mask-closable="closable">
        <div class="ui-message-content">
            <div>
                <img src="~assets/images/data.jpg" />
                <p class="ui-reminder">亲，现在数据略有不准哦！！</p>
            </div>
        </div>
        <div slot="footer">
        </div>
    </Modal>
</template>

<script>

export default {
  name:'Waiting',
  props:['openMessage'],
  data(){
      return{
          flag:this.openMessage,
          closable:false
      }
  },
  watch: {
        $props: {
            deep: true,
            handler(nextProps) {
                this.flag=nextProps.openMessage;
            }
        }
    },
  updated: function () {
        var _this=this;
        if(this.type=='success' && this.flag){
            setTimeout(function(){
                _this.flag=false;
                _this.$emit('changeOpen',_this.flag)
            },1500)
          return;
        }
    this.$emit('changeOpen',this.flag)
  }
}
</script>

