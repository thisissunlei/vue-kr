<template>
    <div class="com-select-customers">
        <Select v-model="customer" clearable  filterable remote :placeholder="value" :remote-method="remoteCustomer" :loading="loading1" :disabled="disabled" @on-change="changeContent" :label-in-value="labelInValue" :multiple='multiple'>
            <Option v-for="(option, index) in customerOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


//import http from '~/plugins/http.js';


    export default {
        props:{
            onchange :Function,
            value:String,
            disabled:Boolean,
            labelInValue:{
                default:false,
                type:Boolean
            },
            url:{
                type:String,
                default:'get-customer'
            },
            multiple:{
                type:Boolean,
                default:false
            },
        },
    
        data() {

            return {
                customer: [],
                loading1: false,
                customerOptions: [],
            };
        },
    mounted: function () {
        this.remoteCustomer(' ')
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
            this.$ajax.get(this.url,params).then((r)=>{
                list = r;
                list.length && list.map((item) => {
                let obj = item;
                obj.label = item.company;
                obj.value = item.id + '';
                return obj;
            });
            _this.loading1 = false;

            _this.customerOptions = list;
            }).catch((err) => {
                this.$Notice.error({
                    title: err.msg
                });
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