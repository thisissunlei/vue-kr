<template>
    <div class='scoped-container'>
        <div class='order-management'>
            <div class='community-overview'>
                <FeeOverView></FeeOverView>
            </div>
            <div class='community-selection'>
                <p style='margin-bottom:4px'>社区名称</p>
                <Select v-model="targetCommunity" style="width:200px">
                    <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="order-info-list">
                <!-- <OrderInfo></OrderInfo> -->
                <Demo></Demo>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '~/plugins/utils';
import OrderInfo from './orderInfo.vue';
import FeeOverView from './feeOverview.vue'
import Demo from './demo.vue'

export default {
    components: {
        OrderInfo,
        FeeOverView,
        Demo
    },
    data() {
        return {
            targetCommunity: '',//选中的要查看详细工位信息的社区
            communityList: [],//[{communityId,communityName}]
        }
    },
    mounted(){
        this.getOrderInfos();
    },
    methods:{
        //获取客户名下的所有信息
        getOrderInfos(){

        }
    }
}
</script>

<style lang="less">
// .scoped-container/deep/.order-management {
.order-management {
    text-align: left;
    padding-left: 20px;
    .community-overview {
        margin: 20px 0;
    }
    .community-selection {
        margin: 20px 0;
    }
    .order-info-list {
        margin: 20px 0;
    }
}
</style>

