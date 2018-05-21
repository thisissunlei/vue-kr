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
                v-model="facility.lableType"
                filterable
                remote
                :label="facility.lableTypeName"
                :placeholder="value"
                :remote-method="remoteFacility"
                :loading="loading1"
                :disabled="disabled"
            @on-change="changeContent"
            >
            <Option v-for="(option, index) in facilityTypeList" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

    export default {
        props:{
            onchange:Function,
            facility:Object,
            value:String,
            disabled:Boolean
        },
        data () {
            
            return {
                loading1:false,
                facilityTypeList:[],
            };
        },
         mounted:function(){
            this.remoteFacility()
            console.log(this.facility);
        },
        methods: {
            changeContent:function(value){
                this.onchange(value)
            },
            remoteFacility(query) {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.getFacilityTypeList(query)
                    }, 200);
            },
            getFacilityTypeList:function(name){
                let params = {
                    company:name || ''
                }
                let list = [];
                let _this = this;
                http.get('get-facility-type', params, r => {
                    list = r.data;
                   
                    _this.loading1 = false;

                    _this.facilityTypeList = list;
                }, e => {
                    console.log('error--->',e)
                })
                 return list;

            }
                    
               
        },
       
    }
</script>
