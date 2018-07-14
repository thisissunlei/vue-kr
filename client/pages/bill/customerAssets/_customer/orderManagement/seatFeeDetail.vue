<template>
    <Collapse v-model="value1" @on-change='collapseChange'>
        <Panel v-for='(item,index) in dataList' :key='getKey()' >
             <p style='display:inline'><span>{{item.type}}【</span> {{item.seats}}<span>】</span></p> 
            <div slot="content">
                <Table border class='service-charge' :columns="columns" :data="getData(item)"></Table>
            </div>
        </Panel>
    </Collapse>
</template>
<script>
import uuid from 'uuid'

export default {
    data() {
        return {
            value1: [],
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
            
            this.dataList=[].concat(this.dataListDemo)
       
        },
        getData(item){
            let data=[];
            data.push(item)
            return data
        },
        collapseChange(){
            console.log(this.value1)
        },
        getKey(){
            return uuid.v1()
        }
    }
}
</script>

<style lang="less">
</style>
