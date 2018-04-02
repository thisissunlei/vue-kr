<template>
    <div class="demo">
        <SinglePhone :defaultImg="defaultImg" :photeUrl="photeUrl"/>
    </div>
</template>
<script>
    import SinglePhone from '~/components/SinglePhone'

    export default {
        data () {
            return {
                defaultImg:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201803/W/150220446_340.png',
                // photeUrl:''
                photeUrl:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201803/D/150334902_58.png'

            }
        },
        components:{
            SinglePhone
        },
        methods: {
            
        },
        mounted () {
        }
    }
</script>
<style lang="less">
    .demo{
        padding:20px;
    }
</style>
