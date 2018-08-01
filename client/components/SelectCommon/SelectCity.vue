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
        styles:{
            type:Object
        }
    },
    data() {
        return {
            modelValue: '',
            salerOptions: []
        };
    },
    watch: {
        value() {
            this.modelValue =''+this.value
        }
    },
    mounted(){
       this.getSalerChanceList();  
    },
    methods: {
        changeContent(item) {
            this.modelValue =""+item;
            this.$emit('input', this.modelValue);
        },
        //获取销售机会列表
        getSalerChanceList() {
            let list = [];
            this.$http.get('getDailyCity').then((res)=>{
                res.data.map(item => {
                    list.push({
                        label: ''+item.cityName,
                        value: ''+item.cityId
                    })
                })
                this.salerOptions = [].concat(list);
                this.modelValue=this.modelValue?this.modelValue:list[0].value;
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

