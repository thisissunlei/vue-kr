<template>
  <div class="classification-box">
      <div class="hander">
          <div class="icon"><span v-if="value && type=='num'">{{value}}</span><span v-if="!value || type=='icon'" class="circle"></span></div>
         
          <div class="title"><span>{{title}}</span></div>
      </div>
      <div class="content" :style="{borderWidth:isBorder?'1px':'0px'}">
          <slot name="content"></slot>
      </div>
  </div>
</template>

<script>
 export default {
    props:{
        value:{
            type:[String,Number]
        },
        type:{
            default:'num',
            type:String
        },
        title:{
            type:[String,Number]
        },
        isBorder:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
           
        }
    },
    methods:{
        handleClick(event){
        this.$emit('click',event)
        }
    },
    mounted(){
        this.showText = this.$slots.default !== undefined;
    }
 }
</script>

<style lang="less" scoped> 
.classification-box {
    line-height: 40px;
    vertical-align: middle;
    .icon{
        display: inline-block;
        height: 40px;
        width: 40px;
        border: 1px solid #499DF1;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #499DF1;
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
        .circle{
            height: 20px;
            width: 20px;
            display: inline-block;
            background: #499DF1;
            border-radius: 20px;
            position: relative;
            top: 3px;
            left: 1px;
            
          
        }
        .circle:before{
            content: '';
        }
    }
    .title{
        display: inline-block;
        // padding-left: 25px;
        position: relative;
        line-height: 40px;
        vertical-align: middle;
        span{
            position: relative;
            padding-left: 5px;
            top: 0px;
            font-size: 16px;
            color: #499DF1;
            display: inline-block;
        }
    }
    .title:before{
        content: '';
        display: inline-block;
        width: 22px;
        height: 1px;
        background: #499DF1;
        position: relative;
        top: -5px;

    }
    .content{
        padding-left: 40px;
        padding-top:15px;
        padding-bottom:15px;  
        border-left:1px  dashed #499DF1;
        margin-left: 20px;
    }
}



</style>
