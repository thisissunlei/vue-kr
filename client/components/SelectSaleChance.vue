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



<template>
    <div class="com-select-chance">
        <Select v-model="value" filterable :clearable="clearable" :placeholder='placeholder' :loading="loading1" :disabled="disabled" :value="value" @on-change="changeContent">
            <Option v-for="option in salerOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

export default {
    props: {
        clearable: {
            type: Boolean,
            default: false,
        },
        placeholder: '请选择',

        orderitems: {
            type: Object
        }
    },
    data() {
        return {
            disabled: false,
            value: 0,
            saler: '',
            loading1: false,
            salerOptions: [
                {
                    label: '请选择',
                    value: 0
                }
            ]
        };
    },
    watch: {
        salerOptions() {
            debugger;
            this.value = Number(this.orderitems.saleChanceId);
            if (this.value == 0 || !this.value) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        },
        orderitems() {

            this.getSalerChanceList();

        }
    },
    created() {
        // console.log('created')
        // console.log(this.orderitems)
    },
    updated() {
        // console.log('updated')
        // console.log(this.orderitems);
    },
    mounted() {
        // console.log('mounted')
        // console.log(this.orderitems)
    },
    methods: {
        changeContent(value) {
            this.$emit('onChange', value);
        },
        //获取销售机会列表
        getSalerChanceList() {
            let parms = {
                customerId: this.orderitems.customerId,
                communityId: this.orderitems.communityId,
                receiveId: this.orderitems.salerId
            }
            if (!parms.customerId || !parms.communityId || !parms.receiveId) return;
            let list = [];
            let _this = this;
            http.get('get-salechance', parms, r => {
                list = r.data.items;
                _this.salerOptions = list;
            }, error => {
                this.openMessage = true;
                this.MessageType = "error";
                this.warn = error.message;
            }
            )


        }


    }
}
</script>
