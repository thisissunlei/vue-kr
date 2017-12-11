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
</style>



<template>
    <div class="station-list">
       <div class="station-type">{{label}}</div>
       <div class="select-station-list">
           <div style="margin-bottom:6px;">
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup v-model="selecedStations" @on-change="checkAllGroupChange">
                <Checkbox  v-for="item in stationList" :label="item.name" :key="item.id"></Checkbox>
            </CheckboxGroup>
       </div>
    </div>
</template>


<script>


    export default {
        props:['label','stationList','selecedStation'],
        data() {
            let selecedStation = []
            if(this.selecedStation.length){
                selecedStation = this.selecedStation.map(item=>{
                    return item.name
                })
            }
           return{
            indeterminate: false,
            checkAll: false,
            selecedStations: selecedStation
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
                let selecedStation = []
                if(val.length){
                    selecedStation = val.map(item=>{
                        return item.name
                    })
                }
                if(selecedStation.length == this.stationList.length){
                    this.checkAll = true
                }else{
                    this.checkAll = false
                }
                this.selecedStations = selecedStation;
            }
         },
        created(){
        },
        methods: {
           handleCheckAll () {
                let all = this.stationList.map(item=>{
                    return item.name
                })
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.selecedStations = all;
                } else {
                    this.selecedStations = [];
                }
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
            }     
               
        }
    }
</script>