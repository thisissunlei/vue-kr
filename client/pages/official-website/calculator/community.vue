
<template>
    <div>
        <span v-for="(item,index) in cbdCmtInfos" :key="index" class="g-calcuator-community">
            {{item.cmtName}}
        </span>
    </div>
</template>
<script>
export default{
    props:{
        cbdCmtInfos:{
            type:Array,
            default:[]
        }
    },
    mounted:function(){
    },
    updated:function(){

    },

}
</script>

<style lang="less" scoped>
.g-calcuator-community{

}
</style>







