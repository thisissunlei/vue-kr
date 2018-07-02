<template>
    <div class="com-select-community">
        <Select v-model="defaultValue" filterable @on-change="changeContent" :placeholder="value" :disabled="disabled">
            <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


import http from '~/plugins/http.js';

    export default {
        props:["onchange","test","value","disabled",'customerId'],

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
                clearable:true,
                defaultValue:''
            };
        },
        mounted:function(){
            this.getCusomerList(' ')
            console.log(this.test)
        },
        watch:{
            customerId(){
                this.getCusomerList();           
            },
            test(){
                console.log(this.test,'watch_test')
                this.defaultValue=this.test.communityIn
            }
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
                    customerId:Number(this.customerId)
                }
                let list = [];
                let _this = this;
                console.log(params)
                this.$http.get('get-cmts-customerid',params).then((response)=>{    
                    response.data.map((item)=>{
                        let obj = Object.create(null);
                        obj.label = item.name;
                        obj.value = item.id;
                        list.push(obj)
                    });
                    _this.loading1 = false;
                    _this.options1 = [].concat(list);
                    console.log(list)
                    _this.$emit("onGetCmtsList",[].concat(list))
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