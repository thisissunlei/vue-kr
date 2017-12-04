<style lang="less"> 
   
</style>



<template>
    <div class="com-select-community">
         <Select
            :v-model="name"
            filterable
            remote
            :remote-method="remoteMethod1"
            :loading="loading1"
            @on-change="changeContent">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
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
                options1:[],
            };
        },
        created:function(){
            console.log('com-select-community')
            this.getCusomerList(' ')
        },
        methods: {
            changeContent:function(value){
                console.log('changeContent',value)
                this.onchange(value)
                console.log('onchange',value)
            },
            remoteMethod1 (query) {
                console.log('remoteMethod1',query)
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
                axios.get('get-mainbill-community', params, r => {
                    console.log('r', r);
                    list = r.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.communityname;
                        obj.value = item.id;
                        return obj;
                    });
                    _this.options1 = list;
                }, e => {
                    console.log('error',e)
                })
                return list;

            }
                    
               
        }
    }
</script>