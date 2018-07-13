<template>
    <Collapse v-model="value">
        <Panel v-for='(item,index) in dataList' :key="index" :name="''+index">
             <p style='display:inline'><span>{{item.type}}【</span> {{item.seats}}<span>】</span></p> 
            <div slot="content">
                <Table border class='service-charge' :columns="columns" :data="getData(item)"></Table>
            </div>
        </Panel>
    </Collapse>
</template>
<script>
export default {
    data() {
        return {
            value: [],
            columns: [
                {
                    title: '服务期',
                    key: 'servicePriod',
                    align: 'center',
                },
                {
                    title: '服务费计算说明',
                    key: 'feeCalDesc',
                    align: 'center',
                },
                {
                    title: '单价',
                    key: 'price',
                    align: 'center',
                },
                {
                    title: '数量',
                    key: 'count',
                    align: 'center',
                },
                {
                    title: '小计',
                    key: 'sum',
                    align: 'center',
                },
            ],
            dataList:[],
            dataListDemo: [
                {
                    type: '工位',
                    seats: '03001—03004,03006',
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 3,
                    seatCount: 5,
                },
                {
                    type: '独立房间',
                    seats: '301—304,306',
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 3,
                    seatCount: 5,
                },
                {
                    type: '独立房间',
                    seats: '301—304',
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 3,
                    seatCount: 5,
                },
                {
                    type: '工位',
                    seats: '03001—03004,03006',
                    startDate: 1431886394915,
                    endDate: 1531486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 3,
                    seatCount: 5,
                }
            ]
        }
    },
    mounted(){
        this.formatData();
    },
    methods:{
        formatData(){
            this.value= Array.from(Array(this.dataListDemo.length), (v,k) =>''+k);
            this.dataList=[].concat(this.dataListDemo)
        },
        getData(item){
            let data=[];
            data.push(item)
            return data
        }
    }
}
</script>

<style lang="less">
</style>
