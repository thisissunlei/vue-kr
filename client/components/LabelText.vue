<style lang="less" >
.ui-labeltext{
		width:45%;
		height: 14px;
		font-size: 14px;
		color: #333333;
		line-height: 14px;
		padding-left:14px;
		margin-bottom:24px;
		display: inline-block;
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
	.star{
		&::before{
			content: '*';
			display: inline-block;
			line-height: 1;
			font-family: SimSun;
			font-size: 12px;
			color: #ed3f14;
		}
	}
	.ui-label{
		font-weight: bold;
		line-height: 20px;
	}
	
}

.ui-label-text-inline{
	.ui-label,.ui-text{
		display: inline-block;
	}
}
.ui-label-text-unline{
	.ui-label{
		margin-bottom:8px;
	}
	.ui-label,.ui-text{
		display: block;
	}
	
}

</style>
<template>
<div  :class="getClassName()"  >
	<div :class="getLabelClass()">
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
	},
	methods:{
		getClassName(){
			var className = 'ui-labeltext';
			if(this.inline){
				className +=' ui-label-text-unline';
			}else {
				className +=' ui-label-text-inline';
			}
			return className;
		},
		getLabelClass(){
			var className = 'ui-label';
			if(this.type=='circle'){
				className +=' circle';
			}else if(this.type=='star'){
				className +=' star';
			}
			return className;
		}
	}
}
	
</script>