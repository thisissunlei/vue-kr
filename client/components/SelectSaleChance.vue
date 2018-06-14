<style lang="less">
   .com-select-chance{
    ::-webkit-input-placeholder { color:#666; }
    ::-moz-placeholder { color:#666; } /* firefox 19+ */
    :-ms-input-placeholder { color:#666; } /* ie */
    input:-moz-placeholder { color:#666; }
   }
</style>



<template>
    <div class="com-select-chance">
         <Select
            :v-model="saler"
            filterable
            :clearable="clearable"
            :placeholder='placeholder'          
            :loading="loading1"
            :disabled="disabled"
            :value="value"
            @on-change="changeContent">
            <Option v-for="(option, index) in salerOptions" :value="option"  :key="index">{{option}}</Option>
        </Select>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

    export default {
        props:{
            
            disabled:{
                type:Boolean,
                default:false,
            },
            clearable:{
                type:Boolean,
                default:false,
            },
            placeholder:'请选择',
            value:{
                type:String,
                default:'默认销售机会',
            }
        },
        data () {
            return {
                saler:'',
                loading1:false,
                salerOptions:[
                    '北京','北京2','北京3'
                ]
            };
        },
        mounted(){

        },
        methods: {
            changeContent(value){
                // this.onchange(value)
                this.$emit('onChange',value);
            },
            getSalerList(name){
                let params = {
                    phoneOrEmail:name
                }
                let list = [];
                let _this = this;
                http.get('get-saler', params, r => {
                    list = r.data.slice(0,10);
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.lastname;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.loading1 = false;
                    _this.salerOptions = list;
                }, e => {

                    console.log('error',e)
                })

            }


        }
    }
</script>
