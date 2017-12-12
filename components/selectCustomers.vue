<style lang="less"> 
   .com-select-customers{
    ::-webkit-input-placeholder { color:#666; }
    ::-moz-placeholder { color:#666; } /* firefox 19+ */
    :-ms-input-placeholder { color:#666; } /* ie */
    input:-moz-placeholder { color:#666; }
   }
</style>



<template>
    <div class="com-select-customers">
         <Select
            v-model="customer"
            filterable
            remote
            :placeholder="value"
            @on-query-change="remoteCustomer"
            :loading="loading1"
            @on-change="changeContent"
            >
            <Option v-for="(option, index) in customerOptions" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import axios from '~/plugins/http.js';

    export default {
        props:['onchange','value'],
        data () {
            this.getCusomerList(' ');
            return {
                customer:'',
                loading1:false,
                customerOptions:[],
            };
        },
        watch:{
            value:function(){
                console.log('watch',this.value)
            }
        },
        methods: {
            changeContent:function(value){
                this.onchange(value)
            },
            remoteCustomer (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        this.getCusomerList(query)
                    }, 200);
                } else {
                    this.getCusomerList(' ')

                }
            },
            getCusomerList:function(name){
                let params = {
                    company:name
                }
                let list = [];
                let _this = this;
                axios.get('get-customer', params, r => {
                    list = r.data.customerList;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.company;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.customerOptions = list;
                    // _this.customer = '10089'
                }, e => {
                    console.log('error',e)
                })

            }
                    
               
        }
    }
</script>