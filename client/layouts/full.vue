<style lang="less">

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;


    }

    .layout-breadcrumb{
        padding: 10px 15px 0;
    }

    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
          height:990px;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);

        .open-sidebar{
              display:inline-block;
        }
        .nav {
            display:inline-block;
        }
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                        <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="1">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">合同管理</span>
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">基础配置</span>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">活动列表</span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">

                    <Menu mode="horizontal" :theme="theme1" active-name="1" class="nav">

                     <MenuItem name="0">
             <Button type="text" @click="toggleClick" >
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
        </MenuItem>
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

         <Submenu name="3" class="user">
            <template slot="title">
               <Avatar icon="person" size="large" />
               张屈
            </template>
            <MenuGroup title="基本信息">
                <MenuItem name="3-4">个人中心</MenuItem>
                <MenuItem name="3-5">退出</MenuItem>
            </MenuGroup>
        </Submenu>
         
    </Menu>



                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Index</BreadcrumbItem>
                        <BreadcrumbItem href="#">Apps</BreadcrumbItem>
                        <BreadcrumbItem>App</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">Content</div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            }
        }
    }
</script>