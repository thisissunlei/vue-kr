<template>
    <div class="customer-manager-panel"
        v-if="isManager">
        <div class="info-button">
            <Button type="primary"
                @click="addEditOpen"
                class='join-btn'>{{isAddEdit?'变更':'添加'}}</Button>
        </div>
        <Row style="margin-bottom:30px">
            <div v-if="!isAddEdit"
                style="margin-bottom:20px;color:#ed3f14;">主管理员信息必填，请点击右上角按钮添加</div>
            <div v-if="isAddEdit">
                <LabelText label="管理员手机号"
                    :inline="true"
                    type="star">
                    {{customerInfo.phone}}
                </LabelText>
                <LabelText label="管理员姓名"
                    :inline="true"
                    type="star">
                    {{customerInfo.name}}
                </LabelText>
                <LabelText label="管理员电子邮箱"
                    :inline="true"
                    type="star">
                    {{customerInfo.email}}
                </LabelText>
            </div>
        </Row>
        <Modal v-model="isAddManager"
            :title="manageTitle"
            width="665">
            <AddManager v-if="isAddManager"
                :customerId="customerId"
                @formData="getformData"
                @submitFn="getFunction" />
            <div slot="footer">
                <Button type="primary"
                    @click="addManagerSubmit">确定</Button>
                <Button type="ghost"
                    style="margin-left: 8px"
                    @click="addEditOpen">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LabelText from '~/components/LabelText';
import AddManager from '../../addAdministrator';

export default {
    components: {
        LabelText,
        AddManager
    },
    props: {
        value: ''
    },
    data() {
        return {
            formData: {},
            customerInfo: {},
            isManager: false,
            submitManager: null,
            isAddManager: false,
            isAddEdit: false,
            managerId: '',
            manageTitle: '',
        }
    },
    computed: {
        ...mapGetters([
            'communityId',
            'customerId',
        ])
    },
    watch: {
        communityId() {
            this.validIsManager()
        },
        customerId() {
            this.validIsManager()
        }
    },
    methods: {
        addManagerSubmit(params) {
            this.submitManager && this.submitManager(this.managerSubmit);
        },
        //变更管理员
        managerSubmit() {
            let Params = Object.assign({}, this.formData);
            Params.customerId = this.customerId;
            Params.communityId = this.communityId;
            var _this = this;
            this.$http.post('store-change-manager', Params).then((res) => {
                this.isAddManager = false;
                this.customerInfo = Object.assign({}, this.formData);
                this.managerId = res.data.managerId;
                this.isAddEdit = true;
                this.$Notice.success({
                    title: '变更管理员成功'
                });
            }).catch((err) => {
                this.$Notice.error({
                    title: err.message
                });
            })
        },
        addEditOpen() {
            this.manageTitle = this.isAddEdit ? '主管理员变更' : '主管理员添加';
            this.isAddManager = !this.isAddManager;
        },
        getformData(form) {
            this.formData = form;
        },
        getFunction(form) {
            this.submitManager = form;
        },
        validIsManager() {
            this.isManager = this.customerId && this.communityId;
            if (!this.isManager) {
                return;
            }
            let params = {};
            params.customerId = this.customerId;
            params.communityId = this.communityId;
            var _this = this;
            this.$http.get('order-search-manager', params).then((res) => {
                this.isAddEdit = res.data.hasChiefManager;
                this.customerInfo = Object.assign({}, res.data);
                this.managerId = res.data.managerId ? res.data.managerId : '';
            }).catch((err) => {
                this.$Notice.error({
                    title: err.message
                });
            })
        },
    },
}
</script>

<style lang="less">
.customer-manager-panel {
    position: relative;
    .ui-labeltext {
        width: 50%;
        max-width: 450px;
        padding-left: 0;
        height: auto;
        margin-bottom: 0;
        .ui-text {
            margin-bottom: 10px;
        }
        .ui-label {
            font-size: 12px;
            color: #495060;
            font-weight: 400;
        }
    }
    .info-button {
        position: absolute;
        top: -45px!important;
        right: 414px;
    }
}
</style>
