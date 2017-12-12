<style lang="less"> 
   .com-select-saler{
    ::-webkit-input-placeholder { color:#666; }
    ::-moz-placeholder { color:#666; } /* firefox 19+ */
    :-ms-input-placeholder { color:#666; } /* ie */
    input:-moz-placeholder { color:#666; }
   }
</style>



<template>
    <div class="com-select-saler">
         <Select
            :v-model="saler"
            filterable
            remote
            :placeholder="value"
            @on-query-change="remoteSaler"
            :loading="loading1"
            @on-change="changeContent">
            <Option v-for="(option, index) in salerOptions" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import axios from '~/plugins/http.js';

    export default {
        props:['value','onchange'],
        data () {
            return {
                saler:'',
                loading1:false,
                salerOptions:[],
            };
        },
        created:function(){
            // this.getCusomerList(' ')
        },
        methods: {
            changeContent:function(value){
                this.onchange(value)
            },
            remoteSaler (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        this.getSalerList(query)
                    }, 200);
                } 

            },
            getSalerList:function(name){
                let params = {
                    phoneOrEmail:name
                }
                let list = [];
                let _this = this;
                axios.get('get-saler', params, r => {
                    list = r.data.slice(0,10);
                    list.map((item)=>{
                        let obj = item;
                        console.log('======',item)
                        obj.label = item.lastname;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.salerOptions = list;
                }, e => {

                    console.log('error',e)
                })

            }
                    
               
        }
    }
</script>