<template>
       <div class='floor-tab-select'>
            <RadioGroup v-model="params.countSelf" @on-change="radioChange">
                <Radio label="1">原价</Radio>
                <Radio label="0">折扣</Radio>
            </RadioGroup>
            <Select 
                v-model="params.discount" 
                style="width: 100px;"
                clearable
                @on-change="countChange"	
            >
                <Option v-for="item in discountList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
        </div>
</template>

<script>
var count='';
export default {
    data() {
        return{
           params:{
               countSelf:'1',
               discount:' '
           },
           discountList:[],
           num:0,
           mapNull:''
        }
    },
    mounted(){
        this.getDiscount();
        var mapCount=localStorage.getItem('inventory-floor-map-discount');
        var mapSelf=localStorage.getItem('inventory-floor-map-countSelf');
        this.params.discount=mapCount?Number(mapCount):' ';
        count=this.params.discount;
        this.mapNull=mapSelf;
        this.params.countSelf=mapSelf?mapSelf:'1';
    },
    methods:{
        radioChange(param){
            var discount='';
            discount=param==1?'':this.params.discount;
            this.$emit('countChange',discount,param);
            localStorage.setItem('inventory-floor-map-countSelf',param);
        },
        //折扣价
        countChange(param){
            this.num=this.num+1;
            if(this.num!=1||!this.mapNull||count==' '){
                this.params.countSelf=(typeof param)=='number'?'0':'1';
            }
            localStorage.setItem('inventory-floor-map-discount',param);
            localStorage.setItem('inventory-floor-map-countSelf',this.params.countSelf);
            this.$emit('countChange',param,this.params.countSelf);
        },
        //获取折扣价
        getDiscount(){
            var discountArr=[];
            var index=0.1;
            for(var i=0;i<99;i++){
                discountArr.push({value:index,label:index+'折'})
                index=(index*10000+0.1*10000)/10000;
            }
            discountArr.reverse();
            discountArr.unshift({value:' ',label:'无'})
            this.discountList=discountArr;
        }
    }
}
</script>

<style lang='less' scoped>
    .floor-tab-select{
        position: absolute;
        right:20px;
        z-index: 100;
        top: 18px;
    }
</style>
