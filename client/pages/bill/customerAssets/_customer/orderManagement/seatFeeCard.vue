<template>
   <div class='seat-info-card'>
        <p class='title'>
            <span @click='clickPanel'>
                <Icon :type='iconType'></Icon> 
                <span>{{item.type}}【</span> {{item.seats}}
                <span>】
                </span>
            </span>
        </p>
        <Table  v-show='showTable' border class='service-charge' :columns='columns' :data='getData(item)'></Table>
    </div>

</template>

<script>
export default {
    data() {
        return {
            showTable: true,
            iconType: "arrow-right-b",
            columns: [
                {
                    title: "服务期",
                    key: "servicePriod",
                    align: "center"
                },
                {
                    title: "服务费计算说明",
                    key: "feeCalDesc",
                    align: "center"
                },
                {
                    title: "单价",
                    key: "price",
                    align: "center"
                },
                {
                    title: "数量",
                    key: "count",
                    align: "center"
                },
                {
                    title: "小计",
                    key: "sum",
                    align: "center"
                }
            ],
            dataList: [],
            dataListDemo: [
                {
                    type: "工位",
                    seats: "03001—03004,03006",
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: "整月以月计算服务费",
                    price: 200,
                    month: 3,
                    seatCount: 5
                },
                {
                    type: "独立房间",
                    seats: "301—304,306",
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: "整月以月计算服务费",
                    price: 200,
                    month: 3,
                    seatCount: 5
                },
                {
                    type: "独立房间",
                    seats: "301—304",
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: "整月以月计算服务费",
                    price: 200,
                    month: 3,
                    seatCount: 5
                },
                {
                    type: "工位",
                    seats: "03001—03004,03006",
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: "整月以月计算服务费",
                    price: 200,
                    month: 3,
                    seatCount: 5
                }
            ]
        };
    },
    mounted() {
        this.formatData();
    },
    methods: {
        formatData() {
            this.dataList = [].concat(this.dataListDemo);
        },
        getData(item) {
            let data = [];
            data.push(item);
            return data;
        },
        clickPanel() {
            this.showTable = !this.showTable;
            this.iconType = this.showTable ? "arrow-down-b" : "arrow-right-b";
        },
        getKey() {
            return uuid.v1();
        }
    }
};
</script>

<style lang="less">
.seat-info-card {
    .title {
        height: 38px;
        line-height: 38px;
        display: inline-block;
        background-color: #f7f7f7;
        span {
            height: 38px;
            line-height: 38px;
            padding-left: 32px;
            color: #666;
            cursor: pointer;
            position: relative;
        }
    }
}
</style>
