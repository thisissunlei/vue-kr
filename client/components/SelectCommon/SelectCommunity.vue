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
        disabled: {
            type: Boolean,
            default: false
        },
        value: "",
        params:{
            type:Object,
            default:{}
        },
        isRouteParams:{
            type:Object,
            default:{}
        },
        styles:{
            type:Object
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
            if(list.length>2){
                value=list[1].value;
            }else if(list.length==1){
                value=list[0].value;
            }
            return value
        },
        //获取销售机会列表
        getSalerChanceList() {
            let list = [];
            this.$http.get('getDailyCommunity',{cityId:this.params.cityId}).then((res)=>{
                res.data.map(item => {
                    list.push({
                        label: ''+item.name,
                        value: ''+item.id
                    })
                })
                if(list.length&&list.length>1){
                    list.unshift({value:' ',label:'全部社区'})
                }
                this.salerOptions = [].concat(list);  

                if(this.isRouteParams.communityId&&this.num<1){
                    this.modelValue=this.isRouteParams.communityId;
                }else {
                    this.modelValue=this.sortValue(list);
                }

                if(this.num<1&&!this.isRouteParams.cityId){
                    this.modelValue=this.sortValue(list);
                    this.$emit('init',{cityId:this.params.cityId,communityId:this.modelValue})
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

