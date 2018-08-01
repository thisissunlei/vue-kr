<template>
    <div class="com-select-chance">
        <Select v-model="modelValue" :style="styles"  filterable placeholder="请选择" :disabled="disabled" @on-change="changeContent">
            <Option v-for="option in salerOptions" :value="''+option.value" :key="''+option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>

export default {
    
    props: {
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //文本框上绑定的值
        value: "",
        //接口参数
        params:{
            type:Object,
            default:{}
        },
        //下拉框样式
        styles:{
            type:Object
        },
        //是否要全部
        isGetAll:{
            type:Boolean
        }
    },
    data() {
        return {
            modelValue: '',
            oldOrderitemsStr:'',
            salerOptions: [],
            num:0
        };
    },
    watch: {
        value() {
            this.modelValue =''+this.value
        },
        params(){
            let orderitemsStr = JSON.stringify(this.params);
            if (orderitemsStr === this.oldOrderitemsStr)
                return;
            this.oldOrderitemsStr = orderitemsStr;
            this.getSalerChanceList();  
        }
    },
    methods: {
        changeContent(item) {
            this.modelValue =""+item;
            this.$emit('input', this.modelValue);
        },
        sortValue(list){
            let value='';
            if(this.isGetAll){
                if(list.length>2){
                    value=list[1].value;
                }else if(list.length==1){
                    value=list[0].value;
                }   
            }else{
                let value=list.length?list[0].value:'';
            } 
            return value
        },
        //获取销售机会列表
        getSalerChanceList() {
            if(!(this.params.communityId.trim())){
                this.salerOptions=[];
                return ;
            }
            let list = [];
            this.$http.get('getDailyFloor',{communityId:this.params.communityId}).then((res)=>{
                res.data.map(item => {
                    list.push({
                        label: ''+item.floorName,
                        value: ''+item.floor
                    })
                })
                let len=list.length;
                let rou=this.$route.query;
                if(len>1&&this.isGetAll){
                    list.unshift({value:' ',label:'全部楼层'})
                }
                this.salerOptions = [].concat(list);  

                if(rou.cityId&&this.num<1){
                    this.modelValue=rou.floor;
                }else {
                    this.modelValue=this.sortValue(list);
                }

                //针对点击搜索清除按钮
                let initParams={
                    communityId:this.params.communityId,
                    floor:this.modelValue
                }
                if(this.num<1&&!rou.cityId){
                    this.$emit('init',initParams)
                }
                this.num++;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        }
    }
}
</script>

<style lang="less">
.com-select-chance {
    display:inline-block;
    ::-webkit-input-placeholder {
        color: #666;
    }
    ::-moz-placeholder {
        color: #666;
    } /* firefox 19+ */
    :-ms-input-placeholder {
        color: #666;
    } /* ie */
    input:-moz-placeholder {
        color: #666;
    }
}
</style>

