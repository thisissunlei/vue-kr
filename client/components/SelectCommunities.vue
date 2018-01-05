<style lang="less"> 

   .com-select-community{
    ::-webkit-input-placeholder { color:#666; }
    ::-moz-placeholder { color:#666; } /* firefox 19+ */
    :-ms-input-placeholder { color:#666; } /* ie */
    input:-moz-placeholder { color:#666; }
   }


</style>



<template>
    <div class="com-select-community">
         <Select
            :v-model="test.communityId"

            filterable
            remote
             :placeholder="value"

            :remote-method="remoteMethod1"
            :loading="loading1"
            @on-change="changeContent">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


import http from '~/plugins/http.js';

    export default {
        props:{
            test:Object,
            onchange :Function,
            value:String
        },
        data () {
            return {
                community:'',
                loading1:false,
                options1:[],
            };
        },

        mounted:function(){

            this.getCusomerList(' ')
        },
        methods: {
            changeContent:function(value){

                this.onchange(value)
            },

            remoteMethod1 (query) {

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
                    communityName:name
                }
                let list = [];
                let _this = this;
                
                http.get('get-mainbill-community', params, r => {
                    list = r.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.communityname;
                        obj.value = item.id+'';
                        return obj;
                    });
                     _this.loading1 = false;
                    _this.options1 = list;
                }, e => {
                    console.log('error',e)
                })
                return list;

            }
                    
               
        }
    }
</script>