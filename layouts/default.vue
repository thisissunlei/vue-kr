
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

		.nav {
			margin-left:200px;
			height:50px;
		}
	}

	.sidebar {
		position:fixed;
		width:240px;
		background-color:#fff;
		border-right:1px solid #eee;
		top:50px;
		left:0;
		bottom:0;

	}

	.main {
		margin-left:240px;
		padding-left:20px;
		padding-top:20px;
		padding-right:20px;
	}

</style>



<template>

<div>

	<div class="header">

	<Menu mode="horizontal" :theme="theme1" active-name="1" class="nav">
        <MenuItem name="1">
            首页
        </MenuItem>
        <MenuItem name="2">
            综合办公
        </MenuItem>
        <MenuItem name="3">
            人事管理
        </MenuItem>

          <MenuItem name="4">
            运营管理
        </MenuItem>

          <MenuItem name="5">
            财务管理
        </MenuItem>

         <MenuItem name="6">
            基础管理
        </MenuItem>

         <MenuItem name="7">
            智能硬件
        </MenuItem>

    </Menu>
	</div>

	<div class="sidebar">

	 <Menu  active-name="1" class="nav">
        <MenuGroup title="内容管理">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                文章管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                评论管理
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="统计分析">
            <MenuItem name="3">
                <Icon type="heart"></Icon>
                用户留存
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                流失用户
            </MenuItem>
        </MenuGroup>
    </Menu>


	</div>

	<div class="main">
  		<nuxt/>
	</div>

  	<div class="footer"></div>

</div>

</template>