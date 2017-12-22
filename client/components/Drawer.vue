<template>

<div v-if="isOpen" class= "ui-drawer" >
	<div class= "drawer-modal" >
        <div class= "drawer-body">
            <div class="u-drawer-title">
                {{title}}<span class="u-close" @click="onClose"></span>
            </div>
		    <slot></slot>
		</div>
	</div>
</div>
</template>

<script>
    export default {
       props:['title','openDrawer','close'],
       data(){
           return{
               isOpen:this.openDrawer
           }
       },
        watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    this.isOpen=nextProps.openDrawer;
                }
            }
        },
        methods:{
            onClose(){
                this.isOpen=!this.isOpen;
                this.close && this.close();
            }
        },
        updated: function () {
             this.$emit('changeOpen',this.isOpen)
        }
    }
</script>

<style lang="less">
.ui-drawer{
    position: fixed;
    z-index: 550;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: transparent; 
    font-size: 14px;
    .drawer-modal{
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 550;
    }
    .drawer-body{
        width:750px;
        position: absolute;
        right: 0;
        top:0;
        bottom:0;
        overflow-y: auto;
        background:#fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23);
        padding:36px 45px;
        box-sizing: border-box;
    }
    .u-drawer-title{
        font-size: 18px;
        .u-close{
            width:20px;
            height: 20px;
            background:url('~/assets/images/close.svg') no-repeat center center;
            float: right;
            vertical-align: -3px;
        }
    } 
}
.ui-drawer-in{
    animation: ui-drawer-in 450ms cubic-bezier(0.23, 1, 0.32, 1);
}
.ui-drawer-out{
    animation: ui-drawer-out 450ms cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes ui-drawer-in
{
  from {transform: translateX(100%);}
  to {transform: translateX(0%);}
}

@keyframes ui-drawer-out
{
   from {transform: translateX(-100%);}
    to {transform: translateX(0%);}
 
}
</style>