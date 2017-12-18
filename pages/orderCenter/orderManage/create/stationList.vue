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
                    :value="checkAll['seat'+index]"
                    :key="item.name"
                    @on-change="selectDiscount"
                    @click.prevent.native="handleCheckAll(index)">全选    租赁结束日期：{{item.name}}</Checkbox>
            </div>
            <div class="checkbox-list">
                <Checkbox v-for="(value, i) in item.value"  :value="selectSeat['seat'+index+value.name]" @click.prevent.native="selectDiscount(index,value.name)" :key="value.name">{{value.name}}</Checkbox>
            </div>
        </div>
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
            let selectSeat = {};
            this.stationList.map((item,index)=>{
                checkAll['seat'+index] = false;
                item.value.map(value=>{
                    selectSeat['seat'+index+value.name] = false;
                })
                
            })
           return{
            checkAll: checkAll,
            selectSeat:selectSeat,
            selecedStations: selecedStation,
            selectionIndex:[]
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
                if(!this.checkAll['seat'+index]){
                    this.clearAllCheck();
                    this.checkAll['seat'+index] = true;
                }else{
                    this.checkAll['seat'+index] = false;
                    this.clearAllCheck();
                }

                if(!this.checkAll['seat'+index]){
                    return
                }

                let seleced = this.stationList[index].value.map(item=>{
                    this.selectionIndex.push(index)
                    return item.name;
                })
                seleced.map((item)=>{
                    this.selectSeat['seat'+index+item] = true;
                }) 

            },
            clearAllCheck(){
                let checkAll = {};
                let selectSeat = {};
                this.stationList.map((item,index)=>{
                    checkAll['seat'+index] = false;
                    item.value.map(value=>{
                        selectSeat['seat'+index+value.name] = false;
                    })
                    
                })
                this.checkAll = checkAll;
                this.selectSeat = selectSeat;
                this.selectionIndex = []
            },
            selectDiscount (index,name) {
                if(!this.selectSeat['seat'+index+name]){
                   this.selectionIndex.push(index);
                    let diff = this.getDiffStation();
                    if(!diff){
                        return;
                    }
                    this.selectSeat['seat'+index+name] = true; 
                }else{
                    this.selectSeat['seat'+index+name] = false;
                    let selectionIndex = []
                    for(let i in this.selectSeat){
                        if(this.selectSeat[i]){
                           selectionIndex.push(i.slice(4,5))
                        }
                    } 
                    this.selectionIndex = selectionIndex;
                }


                
            },
            getDiffStation(){
                let demo = this.selectionIndex[0];
                let list = this.selectionIndex;
                let num = list.join(",").split(demo).length-1;
                if(num != list.length){
                    this.$Notice.error({
                        title:'不同选择不同时间段的工位'
                    });
                    this.clearAllCheck()
                    return false;
                }
                if(num == list.length){
                    this.checkAll['seat'+demo] = true;
                }
                return true

            },
            selectRow(val){
                this.selecedStations = val;
            }    
               
        }
    }
</script>