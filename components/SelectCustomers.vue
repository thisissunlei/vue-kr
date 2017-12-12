<style lang="less"> 
   
</style>



<template>
    <div class="com-select-customers">
         <Select
            :v-model="name"
            filterable
            remote
            @on-query-change="remoteCustomer"
            :loading="loading1"
            @on-change="changeContent">
            <Option v-for="(option, index) in customerOptions" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import axios from '~/plugins/http.js';

    export default {
        props:['name','onchange'],
        data () {
            return {
                loading1:false,
                customerOptions:[],
            };
        },
        created:function(){
            this.getCusomerList(' ')
        },
        methods: {
            changeContent:function(value){
                console.log('changeContent')
                this.onchange(value)
            },
            remoteCustomer (query) {
                console.log('remoteCustomer',query)

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
                    console.log('r---->', r);
                    list = r.data.customerList;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.company;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.customerOptions = list;
                }, e => {
                    console.log('error',e)
                })

            }
                    
               
        }
    }
</script>