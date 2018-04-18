<template>
       <div class='tab-select'>
            <RadioGroup v-model="params.countSelf">
                <Radio label="1">原价</Radio>
                <Radio label="0">折扣</Radio>
            </RadioGroup>
            <Select 
                v-model="params.discount" 
                style="width: 100px"
                clearable
                @on-change="countChange"	
            >
                <Option v-for="item in discountList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
        </div>
</template>

<script>
export default {
    data() {
        return{
           params:{
               countSelf:'1',
               discount:' '
           },
           discountList:[],
        }
    },
    mounted(){
        this.getDiscount();
    },
    methods:{
        //折扣价
        countChange(param){
            this.params.discount=this.params.countSelf=='0'?param:'';
            this.$emit('countChange',this.params.discount);
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
        right:50px;
        z-index: 100;
    }
</style>
