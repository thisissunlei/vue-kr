<template>
    <div id="components-demo">
        <buttoncounter></buttoncounter>
        <buttoncounter></buttoncounter>
        <buttoncounter></buttoncounter>
    </div>
</template>
<script>
import Vue from 'vue'

var buttoncounter = Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

export default {
    components: {
        buttoncounter
    }
}
</script>
<style lang="less">
</style>

