<template>
    <div class="order-info-container">
        <div class='info-title'>
            <span class='order-number'></span>
            <span class='order-amount'></span>
        </div>
        <div class='order-fees-stages'>
            <Table :columns="feesStagesColumns" :data="feesStagesDatas"></Table>
        </div>
        <div class='order-fees-other'>
            <Table :columns="feesOtherColumns" :data="feesOtherDatas"></Table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            feesStagesColumns:[],
            feesOtherColumns:[],
            feesStagesDatas:[],
            feesOtherDatas:[],
        }
    }
}
</script>
<style>

</style>
