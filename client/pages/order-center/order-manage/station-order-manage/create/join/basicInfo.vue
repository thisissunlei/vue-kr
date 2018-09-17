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
                <!-- <CustomFormItem title='所属社区'> -->
                <selectCommunities test="formItem"
                    :onchange="changeCommunity" />
                <!-- </CustomFormItem> -->

            </FormItem>
            </Col>
            <Col class="col">
            <FormItem label="销售员"
                style="width:252px"
                prop="salerId">
                <!-- <CustomFormItem title='销售员'> -->
                <SelectSaler name="formItem.salerId"
                    :onchange="changeSaler"
                    :value="salerName"></SelectSaler>
                <!-- </CustomFormItem> -->

            </FormItem>
            </Col>
            <Col class="col">
            <FormItem v-bind:class="{requiremark:!OpportunityRequired}"
                label="机会"
                style="width:252px"
                prop="salerId"
                v-show="showSaleChance">
                <!-- <CustomFormItem title='机会'
                :required='OpportunityRequired'
                v-show='showSaleChance'> -->
                <SelectChance name="formItem.opportunityId"
                    @onChange="changeChance"
                    @gotChanceList='handleGotChancelist'
                    v-show="showChanceSelector"
                    :showType="showChanceSelector"
                    :orderitems='orderitems'
                    :defaultValue='defaultChanceID'
                    :disabled='chanceDisable'></SelectChance>
                <!-- </CustomFormItem> -->
            </FormItem>
            <div v-if='remindinfoNewUser'
                class="title-container">(
                <span class="title-remind-info">{{chanceRemindStr}}</span>)</div>
            <div v-if='remindinfo'
                class="title-container">(如是
                <span class="title-remind-info">{{chanceRemindStr}}</span>)</div>
            <p v-if="!showChanceSelector"
                id='chancemsg'
                v-bind:class="{ OpportunityRequired: OpportunityRequired }">{{opportunityTipStr}}</p>
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue';
import SelectChance from '~/components/SelectSaleChance.vue';
import CustomFormItem from './FormItem.vue'

export default {
    components: {
        selectCommunities,
        selectCustomers,
        SelectSaler,
        SelectChance,
        CustomFormItem
    },
    props: {
        formItem: {
            communityId: '',
            customerId: '',
            salerId:''
        },
    },
    data() {
        return {
            salerName: '请选择',
            chanceDisable: false,
            remindinfoNewUser: false,
            remindinfo: false,
            chanceRemindStr: "",
            defaultChanceID: 0,
            opportunityTipStr: '您没有可用的机会，请确认登录账户或前往CRM检查',
            OpportunityRequired: true,
            showChanceSelector: true,
            orderitems: null,
            test: "test",
            showSaleChance: false,

            getFloor: +new Date(),
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
                        this.formItem.salerId=''+r.data.ssoId
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
        handleGotChancelist(parms) {
            if (parms.isNewUser) {
                this.remindinfo = false
                if (parms.count == 1) {
                    this.remindinfoNewUser = false
                    this.chanceRemindStr = '';
                    this.showChanceSelector = true;
                    // this.defaultChanceID =parms.list[1].value; 
                    // this.$set(this.orderitems, 'saleChanceId', parms.list[1].value)
                }
                else if (parms.count > 1) {
                    this.remindinfoNewUser = false
                    this.chanceRemindStr = '';
                    this.showChanceSelector = true;
                }
                else if (parms.count == 0) {
                    this.remindinfoNewUser = true
                    this.chanceRemindStr = '入驻订单必须绑定机会'
                    this.showChanceSelector = false;
                    this.OpportunityRequired = true;
                    this.formItem.saleChanceId = '';
                    this.opportunityTipStr = '您没有可用的机会，请确认登录账户或前往CRM检查'
                }
            }
            else {
                this.remindinfoNewUser = false
                this.remindinfo = true
                this.chanceRemindStr = '新入驻客户，须选择机会'
                this.OpportunityRequired = false;
                if (parms.count == 0) {
                    this.showChanceSelector = false;
                    this.formItem.saleChanceId = "";
                    this.opportunityTipStr = '您没有可用机会，客户增租续租时不必须'
                }
                else if (parms.count >= 1) {
                    this.showChanceSelector = true;
                    this.defaultChanceID = ''
                }
            }
        }
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
