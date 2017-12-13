<style lang="less"> 
   
</style>



<template>
    <div class="com-select-customers">
         <Select
            v-model="test.customerId"
            filterable
            remote
            @on-query-change="remoteCustomer"
            :loading="loading1"
            @on-change="changeContent">
            <Option 
                v-for="(option, index) in companyOptions" 
                :value="option.value" 
                :key="index"
            >{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import axios from '~/plugins/http.js';

    export default {
        props:['name','onchange','test'],
        data () {
            return {
                loading1:false,
                companyOptions:[],
            };
        },
        created:function(){
            this.getCusomerList(' ')
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
                    companyName:name
                }
                let list = [];
                let _this = this;
                axios.get('getCompanyInfo', params, r => {
                    list = r.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.value  = item.csrId;
					    obj.label = item.companyName;
                        return obj;
                    });
                    _this.companyOptions = list;
                }, e => {
                    console.log('error',e)
                })

            }
                    
               
        },
       
         
    }
</script>