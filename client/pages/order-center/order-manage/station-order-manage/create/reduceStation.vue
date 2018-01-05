<template>
    <div class="station-list">
       <div class="station-type">{{label}}</div>
       <div>
            <div style="padding-bottom:6px;margin-bottom:6px;">
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox  v-for="(item, index) in stationList" :label="item.name" :key="item.seatId"></Checkbox>
                </CheckboxGroup>
             </div>  
       </div>
    </div>
</template>


<script>
import dateUtils from 'vue-dateutils';


    export default {
        props:['label','stationList','selecedStation'],
        data() {
           return{
            indeterminate: false,
            checkAll: false,
            checkAllGroup: []
           }
        },
         watch:{
            checkAllGroup(val){
                console.log('checkAllGroup',val,this.stationList)
                let list = this.stationList.filter(function(item, index) {
                    console.log('filter',item.name)
                    if (val.indexOf(item.name) != -1) {
                        return true;
                    }
                    return false;
                })   
                this.$emit("on-station-change", list); 

            }
         },
        created(){

        },
        methods: {
              handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = this.stationList.map(item=>{
                        return item.name
                    })
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === this.stationList.length) {
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

