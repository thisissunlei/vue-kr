<style lang="less"> 
.demo-m{
    width: 400px;
}
</style>


<template>

    <div>
        <Waiting 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onChangeOpen"
        ></Waiting>
    
    </div>
</template>
<script>
    import dateUtils from 'vue-dateutils';
    import Waiting from '~/components/Waiting';

    export default {
        head () {
            return {
                title: "合同列表",
            }
           
        },
        data () {
           
            return {
                MessageType:'error',
                openMessage:true,
                warn:'合同列表',

            }
        },
        components:{
            Waiting
        },
        methods:{
            onChangeOpen(){
                this.openMessage = false;
            }
        },
    }
</script>
<style lang="less">
    .demo{
        padding:20px;
    }
</style>
