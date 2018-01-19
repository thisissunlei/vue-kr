<style lang="less">
  body{
        padding-left:180px;
        min-height:100%;
        #__nuxt{
            height:100%;
        }
    }
    
</style>

<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
       
            <Row type="flex">
                <Col :span="spanRight">
                    <div class="layout-content" >
                        <div class="layout-content-main" :style="bodyStyle">
                            <nuxt/>
                        </div>
                    </div>
                </Col>
            </Row>
        <div class="layout-copy">
                    &copy;  2011~2016 36氪 | 京ICP备12031756号 | 京公网安备11010802012285号
        </div>

    </div>
</template>
<script>
    export default {
        data () {
            return {
               
                spanRight: 24,
                spanLeft:'',
                bodyStyle:{
                    minHeight:"200px"
                }

            }
        },
        mounted(){
           
            this.bodyStyle.minHeight = document.documentElement.clientHeight-135 + "px";
            var that = this;
            window.onresize = function (params) {
                that.bodyStyle.minHeight = document.documentElement.clientHeight-135 + "px";
            }
        },
        
    }
</script>
