<style lang="less"> 
   
</style>



<template>
    <div class="com-select-customers">
         <Select
            :v-model="test.customerId"
            filterable
            remote
            :loading="loading1"
            @on-change="changeContent"
            :remote-method="remoteCustomer"
            clearable
            >
            <Option 
                v-for="option in companyOptions" 
                :value="option.value" 
                :key="option.value"
            >{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

    export default {
        props:{
            test:Object,
            onchange:Function
        },
       
        data () {
            return {
                loading1:false,
                companyOptions:'',
            };
        },
        mounted:function(){
            this.getCusomerList('')
        },
        methods: {
            changeContent:function(value){
                this.onchange(value)
            },
            remoteCustomer (query) {
                this.loading1 = true;
                setTimeout(() => {
                    this.getCusomerList(query)
                }, 200);
            },
            getCusomerList:function(name,type){
                let params = {
                    customerName:name || ''
                }
                let list = [];
                let _this = this;
                http.get('get-payment-customer-like', params).then( r => {
                    list = r.data.items;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.company;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.loading1 = false;

                    _this.companyOptions = list;
                }).catch( e => {
                    console.log('error--->',e)
                })
               
               
            }
                    
               
        },
    }
</script>
