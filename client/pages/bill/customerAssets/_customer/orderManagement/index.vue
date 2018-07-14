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
                <FeeOverView></FeeOverView>
            </div>

            <div class="order-info-list">
                <OrderInfo @onShowCalDetail='handleShowCalDetail'></OrderInfo>
            </div>
            <div class="set-fee-info-list">
                <Modal v-model="seatFeeDetailListModal" width='830' @on-cancel='handleCloseModal'>
                    <p slot="header" style="padding-left:15px">明细</p>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                    <seatFeeDetailList></seatFeeDetailList>
                    <div class="seat-fee-detail-list-modal-footer" slot="footer">
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '~/plugins/utils';
import OrderInfo from './orderInfo.vue';
import FeeOverView from './feeOverview.vue';
import seatFeeDetailList from './seatFeeDetailList.vue'

export default {
    components: {
        OrderInfo,
        FeeOverView,
        seatFeeDetailList,
    },
    data() {
        return {
            spinShow: true,
            seatFeeDetailListModal: false,
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

        },
        handleShowCalDetail(orderNo) {
            this.seatFeeDetailListModal = true;
            setTimeout((orderNo) => {
                document.querySelectorAll('.seat-fee-detail-list-modal-footer')[0].parentNode.style.display = "none";
                this.spinShow = false
            }, 3000);
        },
        handleCloseModal() {
            this.spinShow = true

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
    .set-fee-info-list {
    }
    .seat-fee-detail-list-modal {
        .ivu-modal-footer {
            display: none;
        }
    }
}
</style>

