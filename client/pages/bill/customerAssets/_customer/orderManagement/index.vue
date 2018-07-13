<template>
    <div class='scoped-container'>
        <div class='order-management'>
            <div class='community-selection'>
                <span style='margin-right:5px'>社区</span>
                <Select clearable v-model="targetCommunity" style="width:200px">
                    <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class='community-overview'>
                <!-- <FeeOverView></FeeOverView> -->
            </div>

            <div class="order-info-list">
                <!-- <OrderInfo></OrderInfo> -->
            </div>
            <div class="set-fee-info-list">
                <SetFeeDetail></SetFeeDetail>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '~/plugins/utils';
import OrderInfo from './orderInfo.vue';
import FeeOverView from './feeOverview.vue';
import SetFeeDetail from './setFeeDetail.vue'

export default {
    components: {
        OrderInfo,
        FeeOverView,
        SetFeeDetail
    },
    data() {
        return {
            targetCommunity: '',//选中的要查看详细工位信息的社区
            communityList: [
                {
                    label: "大街",
                    value: 1
                },
                {
                    label: "创业",
                    value: 2
                },
                {
                    label: "酒仙桥",
                    value: 3
                }
            ],//[{communityId,communityName}]
        }
    },
    mounted() {
        this.getOrderInfos();
    },
    methods: {
        //获取客户名下的所有信息
        getOrderInfos() {

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

