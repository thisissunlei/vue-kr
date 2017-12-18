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
                    :indeterminate="indeterminate['seat'+index]"
                    :value="checkAll['seat'+index]"
                    :key="item.name"
                    @click.prevent.native="handleCheckAll(index)">全选    租赁结束日期：{{item.name}}</Checkbox>
            </div>
            <CheckboxGroup :v-model="checkAllGroup['seat'+index]" @on-change="checkAllGroupChange">
                <Checkbox  v-for="(value, i) in item.value" :label="value.name" :key="value.name"></Checkbox>
            </CheckboxGroup>
        </div>

        <!-- <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup> -->
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
                checkAll['seat'+index] = false;
                checkAllGroup['seat'+index] = [];
                indeterminate['seat'+index] = false;
            })
            console.log('data===========>',checkAllGroup)
           return{
            indeterminate: indeterminate,
            checkAll: checkAll,
            checkAllGroup:checkAllGroup,
            selecedStations: selecedStation,
            // indeterminate: true,
            // checkAll: false,
            // checkAllGroup: ['香蕉', '西瓜']

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
                let _this = this;
               this.stationList.map(function(item, index) {
                    if(_this.checkAll[index]){
                        stationVos = item.value.filter((value,i)=>{
                           
                            if (val.indexOf(value.seatId) == -1) {
                                return false;
                            }
                             return true;
                         })
                         console.log('filter',stationVos)
                    }
                     
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
                if(this.indeterminate['seat'+index]){
                    this.checkAll['seat'+index] = false
                }else{
                    this.checkAll['seat'+index] = true
                }
                this.indeterminate['seat'+index] = false;
                let seleced = this.stationList[index].value.map(item=>{
                    return item.name;
                })

                if (this.checkAll['seat'+index]) {
                    this.checkAllGroup['seat'+index] = seleced;
                    this.selecedStations = seleced;
                    console.log('=========================',this.checkAllGroup)
                } else {
                    this.selecedStations = [];
                }
            },
            checkAllGroupChange (data) {
                // if (data.length === 3) {
                //     this.indeterminate = false;
                //     this.checkAll = true;
                // } else if (data.length > 0) {
                //     this.indeterminate = true;
                //     this.checkAll = false;
                // } else {
                //     this.indeterminate = false;
                //     this.checkAll = false;
                // }
            },
            selectRow(val){
                this.selecedStations = val;
            }    
               
        }
    }
</script>