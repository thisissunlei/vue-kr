<template>
    <div class="com-select-community">
        <Select :v-model="test.communityId" filterable @on-change="changeContent" :placeholder="value" :disabled="disabled">
            <Option v-for="(option, index) in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


import http from '~/plugins/http.js';

    export default {
        props:["onchange","test","value","disabled"],

        // props:{
        //     onchange:Function,
        //     test:Object,
        //     value:String,
        // },
        data () {
            return {
                community:'',
                loading1:false,
                options1:[],
                labelInValue:true,
                clearable:true
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

                this.$http.get('join-bill-community','').then((response)=>{    
                    list = response.data.items;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.name;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.loading1 = false;
                    _this.options1 = list;
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })
            }    
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