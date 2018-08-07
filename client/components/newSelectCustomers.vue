<template>
    <div class="com-select-chance">
        <Select v-model="modelValue" :style="styles"  filterable placeholder="请选择" :disabled="disabled" @on-change="changeContent">
            <Option v-for="option in salerOptions" :value="''+option.value" :key="''+option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import http from '~/plugins/http.js';
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
            salerOptions: [],
           loading1: false,
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
          let params = {
                company: name || ''
            }
            let list = [];
            let _this = this;
            http.get('get-customer', params, r => {
                list = r.data.customerList;
                list.map((item) => {
                    let obj = item;
                    obj.label = item.company;
                    obj.value = item.id + '';
                    return obj;
                });
                _this.loading1 = false;

                _this.salerOptions = list;
            }, e => {
                console.log('error--->', e)
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

