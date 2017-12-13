<style lang="less">

</style>
<template>

    <div>
        <DatePicker type="date" @open-change = "openChange" @on-change = "handleChange" placeholder="Select date" style="width: 200px"></DatePicker>
    </div>

</template>
<script>
export default{
    name:'krDatePicker',
    methods: {
        handleChange(data){
            console.log(this,"LLLLL")
            this.$emit('change', data)
        },
    }
}
	
</script>