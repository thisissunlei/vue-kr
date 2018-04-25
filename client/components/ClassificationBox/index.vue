<template>
  <div class="classification-box">
        <div class="hander">
            <div class="icon"><span class="title-num" v-if="value && type=='num'">{{value}}</span><span v-if="!value || type=='icon'" class="circle"></span></div>
            
            <div class="title"><span>{{title}}</span><span v-if="promptText" style="font-size:14px;color:red;">{{promptText}}</span></div>
        </div>
        <div class="content" :style="{borderWidth:isBorder?'1px':'0px'}">
            <slot name="content"></slot>
            <div class="tag" :style="tagStyle()"></div>
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
        },
        isEnd:{
            type:Boolean,
            default:false,
        },
        promptText:{
            type:String,
            default:'',
        }
    },
    data(){
        return{
           
        }
    },
    methods:{
        tagStyle(event){
            if(this.isEnd){
                return {top:'auto',bottom:'-8px',marginTop:'0px'};
            }
            return {};
        },

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
        width: 60px;
        // border: 1px solid #499DF1;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #499DF1;
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
        background-image:url(images/tuxing.png); 

        background-size: 100% 100%;
        .title-num{
            display: block;
            height: 40px;
            width: 40px;
            text-align: center;
            line-height: 40px;
            vertical-align: middle;
        }
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

    .content{
        padding-left: 40px;
        padding-top:15px;
        padding-bottom:15px;  
        border-left:1px  dashed #499DF1;
        margin-left: 20px;
        position: relative;
        margin-top: -2px;
        .tag{
            display: inline-block;
            position: absolute;
            left: -8px;
            width: 16px;
            background: #fff;
            height: 16px;
            border-radius: 50%;
            // bottom: -8px;
            top: 50%;
            margin-top: -8px;
            background-image:url(images/end_icon.svg); 
            background-size: 100% 100%;
        }
    }
}



</style>
