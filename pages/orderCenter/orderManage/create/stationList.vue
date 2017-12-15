<style lang="less"> 
   .select-station-list{
    border:1px solid #e9eaec;
    padding:10px;
   }
   .station-type{
    padding:10px 0;
    font-size: 14px;
    position: relative;
    margin-left: 5px;
    &&:before{
        content:'*';
        color: red;
        position: absolute;
        font-size: 18px;
        left:-7px;

    }
   }
   .station-list{
    max-height: 400px;
    overflow: auto;
   }
</style>



<template>
    <div class="station-list">
       <div class="station-type">{{label}}</div>
       <div>
        <div v-for="(item, index) in stationList">
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;" :key="index">
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll.box+index"
                    @click.prevent.native="handleCheckAll">{{item.name}}</Checkbox>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox  v-for="(value, i) in item.value" :label="value.seatId" key="value+i"></Checkbox>
            </CheckboxGroup>
        </div>
            <!-- <Table border ref="selection" :columns="columns" :data="stationList" @on-selection-change="selectRow"></Table> -->
       </div>
    </div>
</template>


<script>
import dateUtils from 'vue-dateutils';


    export default {
        props:['label','stationList','selecedStation'],
        data() {
            let selecedStation = []
            if(this.selecedStation.length){
                selecedStation = this.selecedStation.map(item=>{
                    return item.name
                })
            }
            let checkAll = {};
            this.stationList.map((item,index)=>{
                checkAll['box'+index] = false
            })
            console.log('=====',checkAll)
           return{
            indeterminate: false,
            checkAll: checkAll,
            checkAllGroup:false,
            selecedStations: selecedStation,
            columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工位房间编号',
                        key: 'seatId'
                    },
                    {
                        title: '标准单价（元/月）',
                        key: 'price'
                    },
                    {
                        title: '租赁期限',
                        key: 'address',
                        render: (h, params) => {
                            return h('strong',  dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.originStart))+'至'+ dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.originEnd)))
                        }
                    }
                ],
           }
        },
        components: {
        },
        update:function(){
            console.log('update')
        },
         watch:{
            selecedStations:function(val){
                this.$emit("on-station-change", val);
            },
            selecedStation:function(val){
            }
         },
        created(){
        },
        methods: {
           handleCheckAll () {
                // let all = this.stationList.map(item=>{
                //     return item.name
                // })
                // if (this.indeterminate) {
                //     this.checkAll = false;
                // } else {
                //     this.checkAll = !this.checkAll;
                // }
                // this.indeterminate = false;

                // if (this.checkAll) {
                //     this.selecedStations = all;
                // } else {
                //     this.selecedStations = [];
                // }
            },
            checkAllGroupChange (data) {
                let stationLength = this.stationList.length;
                if (data.length === stationLength) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            } ,
            selectRow(val){
                this.selecedStations = val;
            }    
               
        }
    }
</script>