<template>
    <div class="station-list">
       <div class="station-type">{{label}}</div>
       <div>
            <div style="padding-bottom:6px;margin-bottom:6px;">
                <div class="title" style="border-bottom: 1px solid #e9e9e9">
                    <span class="title-name" style="width:20px"><Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll"></Checkbox></span>
                    <span class="title-name" style="width:100px">工位名称</span>
                    <span class="title-name" style="width:140px">开始时间</span>
                    <span class="title-name" style="width:140px">结束时间</span>
                </div>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox  v-for="(item, index) in stationList" :label="item.name+'/'+item.orderSeatId" class="list-select" :key="item.seatId+'/'+item.orderSeatId">
                    <span class="title-name" style="width:100px">{{item.name}}</span>
                    <span class="title-name" style="width:140px">{{item.startDate |dateFormat('YYYY-MM-dd') }}</span>
                    <span class="title-name" style="width:140px">{{item.endDate|dateFormat('YYYY-MM-dd') }}</span>
                    </Checkbox>
                </CheckboxGroup>
             </div>  
       </div>
    </div>
</template>


<script>
import dateUtils from 'vue-dateutils';


    export default {
        props:{
            label:{
                type: String,
                required: true
            },
            stationList:{
                type:Array,
                required: true
            },
            selecedStation:{
                type:Array
            }
        },
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
                    let value = item.name +'/'+item.orderSeatId;
                    if (val.indexOf(value) != -1) {
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
                        return item.name+'/'+item.orderSeatId
                    })
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                console.log('checkAllGroupChange',data)
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
   .title{
    width: 100%;
    text-align: center;
    height:40px;
    line-height: 40px;
    font-size: 13px;
    background-color: #e6e6e4;
   }
   .title-name{
    display: inline-block;
    text-align: center;

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
   .list-select{
    width: 100%;
    .ivu-checkbox{
        width: 20px;
        text-align: right;
        margin-left: 3px;
    }
   }
   .station-list{
    max-height: 400px;
    overflow: auto;
   }
</style>

