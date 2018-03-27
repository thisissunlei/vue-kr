<style lang="less">
.inline-block{
	display: inline-block;
}
.block{
	display: block;
}
.circle{
	&::before{
		content:'';
		display: inline-block;
		width:8px;
		height: 8px;
		border:1px solid #333;
		border-radius: 5px;
	}
}
.ui-labeltext{
	width:45%;
	height: 14px;
	font-size: 14px;
	color: #333333;
	line-height: 14px;
	padding-left:14px;
	margin-bottom:24px;
	.inline-block;
}
.inline{
	.ui-label,.ui-text{
		.inline-block;
	}
}
.unline{
	.ui-label{
		margin-bottom:8px;
	}
	.ui-label,.ui-text{
		.block;
	}
	
}

</style>
<template>
<div  v-bind:class="[inline?unlineClass:inlineClass,labeltextClass]"  >
	<div class="ui-label" :class="{ circle: type=='circle'}">
		{{label}}
	</div>
	<div class="ui-text">
		<slot></slot>
	</div>
</div>
</template>
<script>
export default{
	name:'labelText',
	props:['label','inline','type'],
	data (){
		return{
			labeltextClass:"ui-labeltext",
			inlineClass:"inline",
			unlineClass:"unline"
		}
	}
}
	
</script>