<template>
    <div>
    	<Input v-model="value" placeholder="请选择"></Input>
    </div>
</template>


<script>
    export default {
    	props:['value'],
        data () {
            return {
                data1:'detail'
            }
        }
    }
</script>