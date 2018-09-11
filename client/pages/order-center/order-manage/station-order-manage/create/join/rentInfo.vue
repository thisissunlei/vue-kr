<template>
    <div class="rent-info-panel">
        <Row style="margin-bottom:30px">
            <Col class="col">
            <CustomFormItem title='租赁开始日期'>
                <DatePicker type="date"
                    placeholder="租赁开始时间"
                    v-model="startDate"
                    style="display:block"
                    @on-change="changeBeginTime"></DatePicker>
                <div class="pay-error"
                    v-if="timeError">租赁开始时间不得大于结束时间</div>
            </CustomFormItem>
            </Col>
            <Col class="col"
                v-if="false">
            <CustomFormItem title='租赁结束日期'>
                <DatePicker type="month"
                    placeholder="租赁结束日期"
                    format="yyyy-MM-dd"
                    v-model="endDate"
                    style="display:block"
                    @on-change="changeEndTime"></DatePicker>
            </CustomFormItem>
            </Col>

            <Col class="col">
            <CustomFormItem title='租赁结束日期'>
                <DatePicker type="date"
                    placeholder="租赁结束日期"
                    format="yyyy-MM-dd"
                    v-model="endDate"
                    style="display:block"
                    @on-change="changeEndDateStatus"></DatePicker>
            </CustomFormItem>

            </Col>
            <Col class="col">
            <CustomFormItem title='租赁时长'>
                <Input v-model="timeRange"
                    placeholder="租赁时长"
                    disabled></Input>

            </CustomFormItem>
            </Col>
            <Col class="col">
            <CustomFormItem title='签署日期'>
                <DatePicker type="date"
                    placeholder="签署日期"
                    format="yyyy-MM-dd"
                    v-model="signDate"
                    style="display:block"></DatePicker>
            </CustomFormItem>

            </Col>
        </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dateUtils from 'vue-dateutils';

import CustomFormItem from './FormItem.vue'

export default {
    components: {
        CustomFormItem
    },
    data() {
        return {
            startDate: '',
            endDate: "",
            signDate: '',
            timeRange: '',
            timeError: ''
        }
    },

    watch: {
        startDate(val) {
            this.$store.commit('changeStartDate', val)
        },
        endDate(val) {
            this.$store.commit('changeEndDate', val)

        },
        signDate(val) {
            this.$store.commit('changeSignDate', val)

        },
        timeRange(val) {
            this.$store.commit('changeTimeRange', val)

        },
    },
    methods: {
        changeBeginTime(val) {//租赁开始时间的触发事件，判断时间大小
            // this.clearStation()
            if (!val || !this.endDate) {
                return;
            }
            let error = false;

            val = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(val))
            let params = {
                end: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.endDate)),
                start: val
            }
            if (new Date(val) > new Date(this.endDate)) {
                error = true;
                this.$Notice.error({
                    title: '租赁开始时间不得大于结束时间'
                })
            } else {
                this.contractDateRange(params)
            }
            this.timeError = error;

        },
        changeEndTime(val) {//租赁结束时间的触发事件，判断时间大小
            debugger
            // this.clearStation()
            if (!val) {
                return;
            }

            val = this.dealEndDate(val);
            let error = false;

            val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(val));
            this.endDate = val;

            if (!this.startDate) {
                return;
            }
            let params = {
                start: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.startDate)),
                end: val
            }

            if (new Date(this.startDate) > new Date(val)) {
                error = true;
                this.$Notice.error({
                    title: '租赁开始时间不得大于结束时间'
                })
            } else {
                this.contractDateRange(params)
            }
            this.timeError = error;
            // this.clearStation();

        },
        dealEndDate(val) {
            let str = val.split('-');
            let year = str[0];
            let month = parseInt(str[1], 10);
            var d = new Date(year, month, 0);
            let day = d.getDate();
            val = year + '-' + month + '-' + day;
            return val;

        },

        changeEndDateStatus(val) {
            // this.clearStation()
            if (!val) {
                return;
            }

            let error = false;

            val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(val));
            this.endDate = val;

            if (!this.startDate) {
                return;
            }
            let params = {
                start: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.startDate)),
                end: val
            }

            if (new Date(this.startDate) >= new Date(val)) {
                error = true;
                this.$Notice.error({
                    title: '租赁开始时间不得大于等于结束时间'
                })
            } else {
                this.contractDateRange(params)
            }
            this.timeError = error;
            // this.clearStation();
        },
        contractDateRange(params) {//获取租赁范围
            let _this = this;

            this.$http.get('contract-date-range', params).then(r => {
                _this.timeRange = r.data;
            }).catch(e => {
                _this.$Notice.error({
                    title: e.message
                });
            })
        },
    },
}
</script>

<style lang="less">
.rent-info-panel {
    font-size: 12px;
    .pay-error {
        color: #ed3f14;
    }
}
</style>
