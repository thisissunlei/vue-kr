<template>
    <div class="scoped-container">
        <div class="order-management">
            <div class="community-selection">
                <span style="margin-right:5px">社区</span>
                <Select clearable v-model="targetCommunity" style="width:200px">
                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{item.name }}</Option>
                </Select>
            </div>
            <div class="community-overview">
                <FeeOverView :serviceChargeData="serviceChargeData" :depositCashData="depositCashData"></FeeOverView>
            </div>

            <div class="order-info-list">
                <OrderInfo :billData="billData" :orderData="orderData" @onShowCalDetail="handleShowCalDetail"></OrderInfo>
            </div>
            <div class="set-fee-info-list">
                <Modal v-model="seatFeeDetailListModal" width="830" @on-cancel="handleCloseModal">
                    <p slot="header" style="padding-left:15px">明细</p>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                    <seatFeeDetailList :orderId="orderId" v-if="seatFeeDetailListModal" />
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
    props: {
        customerId: ''
    },
    data() {
        return {
            serviceChargeData:[],
            depositCashData:[],
            billData:[],
            orderData:[],
            orderId: '',
            spinShow: true,
            seatFeeDetailListModal: false,
            targetCommunity: '',//选中的要查看详细工位信息的社区
            communityList: [],//[{communityId,communityName}]
        }
    },
    watch: {
        targetCommunity() {
            this.getFeeDataList(this.customerId,this.targetCommunity)
        }
    },
    mounted() {
        this.getCommunityList();
    },
    methods: {
        // 获取社区列表
        getCommunityList() {
            let param = {
                customerId: this.customerId
            };
            this.$http.get('get-fee-communitys', param).then((r) => {
                this.communityList = r.data
                if (r.data.length > 0) {
                    this.targetCommunity = ''+r.data[0].id;
                }

            }).catch((err) => {
                this.$Notice.error({
                    title: err.message
                });
            })
        },
        //获取Table Data
        getFeeDataList(customerId, communityId) {
            if (!customerId||!communityId) {
                return;
            }
            let params = {
                customerId: customerId,
                communityId: communityId
            }
            this.$http.get('get-fee-overivew-list', params).then((r) => {  
                console.log(r.data)
                this.serviceChargeData =[].concat(r.data.fee) ;
                this.depositCashData = [].concat(r.data.deposit);
                this.billData=[].concat(r.data.bill)
                this.orderData=[].concat(r.data.order)
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        handleShowCalDetail(orderNo) {
            this.seatFeeDetailListModal = true;
            this.orderId = orderNo
            setTimeout((orderNo) => {
                document.querySelectorAll('.seat-fee-detail-list-modal-footer')[0].parentNode.style.display = "none";
                this.spinShow = false
            }, 3000);
        },
        handleCloseModal() {
            this.spinShow = true
        },
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

