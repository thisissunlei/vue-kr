<template>
    <div class='seat-info-card'>
        <p class='title'>
            <span @click='clickPanel'>
                <Icon :type='iconType'></Icon>
                <span>{{data[0]['type']}}【</span> {{data[0]['seats']}}
                <span>】
                </span>
            </span>
        </p>
        <Table v-show='showTable' border class='service-charge' :columns='columns' :data='data'></Table>
    </div>

</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            showTable: true,
            iconType: "arrow-right-b",
        };
    },
    methods: {
        clickPanel() {
            this.showTable = !this.showTable;
            this.iconType = this.showTable ? "arrow-down-b" : "arrow-right-b";
        },
    }
};
</script>

<style lang="less">
.seat-info-card {
    margin-bottom: 5px;
    box-sizing: border-box;
    .title {
        height: 40px;
        width: 100%;
        line-height: 40px;
        display: inline-block;
        background-color: #f7f7f7;
        padding-left: 32px;
        color: #666;
        span {
            cursor: pointer;
        }
    }
    .service-charge {
        margin: 2px 10px 5px 30px;
        .colPadRight {
            .ivu-table-cell {
                text-align: right;
                padding-right: 5px;
                padding-left: 5px;
            }
        }
    }
}
</style>
