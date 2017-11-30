
<style lang="less"> 

	*{
		margin:0;
		padding:0;
	}

	body{
		position:relative;
	}

	.header {
		height:50px;
		border-bottom:1px solid #eee;
	}

	.sidebar {
		position:fixed;
		width:200px;
		background-color:#fff;
		border-right:1px solid #eee;
		top:50px;
		left:0;
		bottom:0;
	}

	.main {
		margin-left:200px;
		padding-left:20px;
		padding-top:20px;
		padding-right:20px;
	}

</style>



<template>

<div>

	<div class="header"></div>

	<div class="sidebar"></div>

	<div class="main">
  		<nuxt/>
	</div>

  	<div class="footer"></div>

</div>

</template>