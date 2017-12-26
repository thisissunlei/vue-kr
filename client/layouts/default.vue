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
                <div class="layout-content">
                    <div class="layout-content-main">
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

            }
        }
    }
</script>
