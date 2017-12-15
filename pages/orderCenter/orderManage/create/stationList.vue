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
        <div v-for="(item, index) in stationList" style="margin-bottom:20px">
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;" :key="index">
                <Checkbox
                    :indeterminate="indeterminate.index"
                    :value="checkAll[index]"
                    @click.prevent.native="handleCheckAll(index)">全选  =={{checkAll[index]}}   租赁结束日期：{{item.name}}</Checkbox>
            </div>
            <CheckboxGroup :v-model="checkAllGroup[index]" @on-change="checkAllGroupChange">
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
            let checkAllGroup = {};
            let indeterminate = {};
            this.stationList.map((item,index)=>{
                checkAll[index] = false;
                checkAllGroup[index] = false;
                indeterminate[index] = false;
            })
           return{
            indeterminate: indeterminate,
            checkAll: checkAll,
            checkAllGroup:checkAllGroup,
            selecedStations: selecedStation,
           }
        },
        components: {
        },
        update:function(){
            console.log('update')
        },
         watch:{
            selecedStations:function(val){
                let stationVos  =[];
                stationVos = this.stationList.filter(function(item, index) {
                    if (val.indexOf(item.seatId) != -1) {
                        return true;
                    }
                return true;
                });


                this.$emit("on-station-change", stationVos);
            },
            selecedStation:function(val){
            }
         },
        created(){
        },
        methods: {
           handleCheckAll (index) {
                if(this.indeterminate[index]){
                    this.checkAll[index] = false
                }else{
                    this.checkAll[index] = true
                }
                let seleced = this.stationList[index].value.map(item=>{
                    return item.seatId+'';
                })

                if (this.checkAll[index]) {
                    this.checkAllGroup[index] = seleced;
                    this.selecedStations = seleced;
                    console.log(this.checkAllGroup[index])
                } else {
                    this.selecedStations = [];
                }
            },
            checkAllGroupChange (data) {
                console.log('========',data)
                // let stationLength = this.stationList.length;
                // if (data.length === stationLength) {
                //     this.indeterminate = false;
                //     this.checkAll = true;
                // } else if (data.length > 0) {
                //     this.indeterminate = true;
                //     this.checkAll = false;
                // } else {
                //     this.indeterminate = false;
                //     this.checkAll = false;
                // }
            } ,
            selectRow(val){
                this.selecedStations = val;
            }    
               
        }
    }
</script>