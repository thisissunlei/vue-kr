<template>
       <div class='tab-select'>
            <RadioGroup v-model="params.countSelf" @on-change="radioChange">
                <Radio label="1">原价</Radio>
                <Radio label="0">折扣</Radio>
            </RadioGroup>
            <div style="display:inline-block;margin:0 7px 0 2px;">
                <Tooltip content="表中的价格均不显示小数，选择折扣的功能仅为方便计算折后价，是否能以此折扣成交以及签约价以合同与订单为准" placement="top">
                  <span class='icon-tip'></span>
                </Tooltip>
            </div>
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
export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    data() {
        return{
           params:{
               countSelf:'1',
               discount:' '
           },
           discountList:[],
           num:0,

           dailyNull:'',
           optionalNull:''
        }
    },
    mounted(){
        this.getDiscount();
        var dailyCount=localStorage.getItem('daily-inventory-discount');
        var optionalCount=localStorage.getItem('optional-inventory-discount');
        var dailySelf=localStorage.getItem('daily-inventory-countSelf');
        var optionalSelf=localStorage.getItem('optional-inventory-countSelf');
        if(this.identify=='daily'){
            this.params.discount=dailyCount?Number(dailyCount):' ';
            this.dailyNull=dailySelf;
            this.params.countSelf=dailySelf?dailySelf:'1';
        }else{
            this.params.discount=optionalCount?Number(optionalCount):' ';
            this.optionalNull=optionalSelf;
            this.params.countSelf=optionalSelf?optionalSelf:'1'; 
        }
    },
    methods:{
        radioChange(param){
            var discount='';
            discount=param==1?'':this.params.discount;
            this.$emit('countChange',discount,param);
            if(this.identify=='daily'){
                localStorage.setItem('daily-inventory-countSelf',param);
            }else{
                localStorage.setItem('optional-inventory-countSelf',param);
            }
        },
        //折扣价
        countChange(param){
            this.num=this.num+1;
            if(this.num!=1||(this.identify=='daily'&&this.dailyNull==null)||(this.identify=='optional'&&this.optionalNull==null)){
                this.params.countSelf=(typeof param)=='number'?'0':'1';
            }
            if(this.identify=='daily'){
                localStorage.setItem('daily-inventory-discount',param);
                localStorage.setItem('daily-inventory-countSelf',this.params.countSelf);
            }else{
                localStorage.setItem('optional-inventory-discount',param); 
                localStorage.setItem('optional-inventory-countSelf',this.params.countSelf); 
            }
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

<style lang='less'>
    .tab-select{
        position: absolute;
        right:20px;
        z-index: 100;
        top:-10px;
        .ivu-tooltip-popper{
            word-break: break-all;
            word-wrap: break-word;
            max-width:300px;
            left: -2px !important;
            top: -95px !important;
        }
        .ivu-tooltip-inner{
            white-space: normal;
        }
        .icon-tip{
            display:inline-block;
            width:16px;
            height:16px;
            background:url(img/q1.svg) no-repeat center;
            background-size: 100%;
            vertical-align: middle;
        }
    }
</style>
