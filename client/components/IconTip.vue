
<template>
<div class="ui-icon-tip">
	<div class="u-icon"></div>
    <div class="u-tip u-show">
        <div class="u-icon-small-trigon"></div>
        <slot></slot>
    </div>
	
</div>

</template>
<script>
export default{
	name:'iconTip',
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
        background:url('~/assets/images/icontip.svg') no-repeat center;
        background-size: contain; 
        &:hover+.u-show{
            display: inline-block;

        } 
    }
    .u-tip{
        display: none;
        width:210px;
        background:#fff;
        font-size:12px;
        color:#999999;
        position: absolute;
        left:60%;
        top:15px;;
        padding:8px;
        border-radius: 3px;
        margin-left:-105px;
        text-align: left;
        line-height: 18px;
        box-shadow:0 0 2px rgba(0,0,0,.2);
    }
    .u-icon-small-trigon{
        width:0;
        height:0;
        border:3px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        top:-5px;
        left:50%;
        margin-left:-3px;
    } 
    
	
}
		

</style>