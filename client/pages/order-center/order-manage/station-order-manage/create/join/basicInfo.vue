<template>
    <div class="join-basic-info-panel">
        <Row style="margin-bottom:30px">
            <Col class="col">
            <FormItem label="客户名称"
                style="width:252px"
                prop="customerId">
                <!-- <CustomFormItem title='客户名称'> -->
                <selectCustomers name="formItem.customerId"
                    :onchange="changeCustomer" />
                <!-- </CustomFormItem> -->

            </FormItem>
            </Col>

            <Col class="col">
            <FormItem label="所属社区"
                style="width:252px"
                prop="communityId">
                <selectCommunities test="formItem"
                    :onchange="changeCommunity" />
            </FormItem>
            </Col>
            <Col class="col">
            <FormItem label="销售员"
                style="width:252px"
                prop="salerId">
                <SelectSaler name="formItem.salerId"
                    :onchange="changeSaler"
                    :value="salerName"></SelectSaler>

            </FormItem>
            </Col>
            <Col class="col">
            <SelectChanceNew v-if='showSaleChance'
                :params='orderitems'
                v-model="chanceId"
                @on-select-change='changeChance' />
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue';
import SelectChanceNew from './SelectChance/index.vue'

export default {
    components: {
        selectCommunities,
        selectCustomers,
        SelectSaler,
        SelectChanceNew
    },
    props: {
        formItem: {
            communityId: '',
            customerId: '',
            salerId: ''
        },
    },
    data() {
        return {
            showSaleChance: false,
            salerName: '请选择',
            orderitems: {},
            test: "test",
            getFloor: +new Date(),
            chanceId: ''
        }
    },
    computed: {
        ...mapGetters([
            'communityId',
            'customerId',
            'salerId'
        ])
    },
    watch: {
        getFloor() {
            if (this.communityId && this.customerId) {
                this.showSaleChance = true;
                let params = {
                    communityId: this.communityId,
                    customerId: this.customerId
                }
                this.$http.get('get-community-floor', params, r => {
                    this.$store.commit('setFloors', r.data.floor)
                    this.ssoId = r.data.ssoId;
                    this.ssoName = r.data.ssoName;
                    this.$store.commit('changeSSO', { ssoId: this.ssoId, ssoName: this.ssoName })
                    if (!this.formItem.salerId) {
                        this.formItem.salerId = '' + r.data.ssoId
                        this.$store.commit('changeSaler', JSON.stringify(r.data.ssoId))
                        this.salerName = r.data.ssoName;
                    }
                    this.validSaleChance()

                }, e => {
                    this.$Notice.error({
                        title: e.message
                    });

                })
            }
            else {
                this.showSaleChance = false
            }
        },
    },
    methods: {
        changeCustomer(val) {
            this.$store.commit('changeCustomer', val)
            this.formItem.customerId = val
            this.getFloor = +new Date()
        },
        changeCommunity(val) {
            this.$store.commit('changeCommunity', val)
            this.formItem.communityId = val
            this.getFloor = +new Date()
        },
        changeSaler(val) {
            this.$store.commit('changeSaler', val)
            this.formItem.salerId = val
            this.validSaleChance()
        },
        changeChance(val) {
            this.$store.commit('changeChance', val)
        },
        validSaleChance() {
            this.showSaleChance = this.salerId && this.customerId && this.communityId;
            let obj = {};
            obj.customerId = this.customerId;
            obj.communityId = this.communityId;
            obj.salerId = this.salerId;
            // this.defaultChanceID = -1;
            this.orderitems = Object.assign({}, obj);
        },
    },
}
</script>

<style lang="less">
.join-basic-info-panel {
    #chancemsg {
        position: absolute;
        bottom: 2px;
        display: block;
        top: 40px;
    }
    .OpportunityRequired {
        color: #ed3f14;
    }
    .requiremark .ivu-form-item-label::before {
        content: "";
    }
    .title-container {
        display: inline;
        position: absolute;
        top: 9px;
        left: 36px;
        font-size: 12px;
        .title-remind-info {
            color: #ed3f14;
        }
    }
}
</style>
