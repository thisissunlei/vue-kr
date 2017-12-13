<style lang="less">

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        padding-top: 65px;
    }

    .layout-breadcrumb{
        padding: 10px 15px 0;
    }

    .layout-content{
        min-height: 800px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        padding-bottom:40px;
    }
    .layout-content-main{
        // padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
        width:100%;
        height: 40px;
        position: absolute;
        left:0;
        bottom:0;
        border-top: solid 1px #e8e9e9;
        background:#fff;
        
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
              float:left;
        }

        .user {
            float:right;
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
            
            <Col :span="spanRight">
               
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Index</BreadcrumbItem>
                        <BreadcrumbItem href="#">Apps</BreadcrumbItem>
                        <BreadcrumbItem>App</BreadcrumbItem>
                    </Breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <nuxt/>
                    </div>
                </div>
                <div class="layout-copy">
                    &copy;  2011~2016 36氪 | 京ICP备12031756号 | 京公网安备11010802012285号
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
               
                spanRight: 24,
                spanLeft:'',

            }
        },
        computed: {
            // iconSize () {
            //     return this.spanLeft === 5 ? 14 : 24;
            // }
        },
        methods: {
        
            // toggleClick () {
            //     if (this.spanLeft === 5) {
            //         this.spanLeft = 2;
            //         this.spanRight = 22;
            //     } else {
            //         this.spanLeft = 5;
            //         this.spanRight = 19;
            //     }
            // }
        }
    }
</script>