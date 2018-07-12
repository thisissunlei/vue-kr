<template>
    <div class="com-select-customers">
        <Select v-model="customer" clearable  filterable remote :placeholder="value" :remote-method="remoteCustomer" :loading="loading1" :disabled="disabled" @on-change="changeContent" :label-in-value="labelInValue">
            <Option v-for="(option, index) in customerOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


import http from '~/plugins/http.js';

export default {
    props: {
        onchange: Function,
        value: String,
        disabled: Boolean,
        labelInValue: {
            default: false,
            type: Boolean
        }
    },
    data() {

        return {
            customer: '',
            loading1: false,
            customerOptions: [],
        };
    },
    mounted: function () {
        this.remoteCustomer()
    },
    methods: {
        changeContent: function (customer) {
            this.onchange(customer)
        },

        mounted:function(){
            this.getCusomerList(' ')
        },

        getCusomerList: function (name) {
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

                _this.customerOptions = list;
            }, e => {
                console.log('error--->', e)
            })
           

        },
        remoteCustomer(query) {
            this.loading1 = true;
            setTimeout(() => {
                this.getCusomerList(query)
            }, 200);
        },
    }
}
</script>

<style lang="less"> 
    .com-select-community{
            ::-webkit-input-placeholder { color:#666; }
            ::-moz-placeholder { color:#666; } /* firefox 19+ */
            :-ms-input-placeholder { color:#666; } /* ie */
            input:-moz-placeholder { color:#666; }

    }
</style>