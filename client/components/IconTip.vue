
<template>
<div :class="[iconStyle=='black'?'u-black':'u-white','ui-icon-tip']">
	<div class="u-icon"></div>
    <div class="u-tip u-show" :style=contentStyle>
        <div class="u-icon-small-trigon"></div>
        <slot></slot>
    </div>
	
</div>

</template>
<script>
export default{
    name:'iconTip',
    /**
	 *  @param {String} iconStyle iconTip风格显示，值：white， black ；默认 white
	 * 	@param {String} contentStyle  内容区样式
	*/
    props:{
        iconStyle:{
           type:String,
           default:'white'
        },
        contentStyle:{
           type:String
        }
    }
}
	
</script>

<style lang="less">
.u-clearfix { zoom:1; }
.u-clearfix:after {
  clear: both;
  content: '.';
  height: 0;
  display: block;
  visibility: hidden;
}
.left{
	float: left;
}

.ui-icon-tip{
     width:12px;
     height:12px;
     position: relative;
     z-index: 100;
     .u-icon{
        width:12px;
        height:12px;
        &:hover+.u-show{
            display: inline-block;
        } 
     }
    .u-tip{
        display: none;
        width:210px;
        font-size:12px;
        position: absolute;
        left:60%;
        top:15px;;
        padding:8px;
        border-radius: 3px;
        transform: translateX(-50%);
        text-align: left;
        line-height: 18px;
       
    }
    .u-icon-small-trigon{
        width:0;
        height:0;
        position: absolute;
        top:-5px;
        left:50%;
        margin-left:-3px;
    } 
    &.u-white{
       .u-icon{
            background:url('~/assets/images/icontip.svg') no-repeat center;
            background-size: contain; 
       }  
       .u-tip{
            background:#fff;
            color:#999999;
            box-shadow:0 0 2px rgba(0,0,0,.2);
       }
       .u-icon-small-trigon{
            border:3px solid transparent;
            border-bottom-color: #fff;
       }
       
     }
     &.u-black{
        .u-icon{
            background:url('~/assets/images/question.svg') no-repeat center;
            background-size: contain;
         }
         .u-tip{
            color: #FFFFFF;
            background: #575D6A;

         }
         .u-icon-small-trigon{
            border:3px solid transparent;
            border-bottom-color: #575D6A;
         }
     }
    
	
}
		

</style>