<template>
    <div class='order-management'>
        <div class='community-overview'></div>
        <div class='community-selection'>
            <p>社区名称</p>
            <Select v-model="targetCommunity" style="width:200px">
                <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="order-info-list">
            <OrderInfo></OrderInfo>
        </div>
    </div>
</template>

<script>
import utils from '~/plugins/utils';
import OrderInfo from './orderInfo.vue';

export default {
    data(){
        return{
            targetCommunity:'',//选中的要查看详细工位信息的社区
            communityList:[],//[{communityId,communityName}]
        }
    }
}
</script>

<style>
</style>

