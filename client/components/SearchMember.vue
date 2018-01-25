<style lang="less"> 
   
</style>



<template>
    <div class="com-select-customers">
         <Select :v-model="test.mbrId" remote filterable :remote-method="remoteCustomer" :loading="loading1" @on-change="changeContent">
            <Option v-for="(option) in customerOptions" :value="''+option.value+''" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
    export default {
        props:{
            onchange:Function,
            test:Object,
            info:Object
        },
        data () {
            return {
                loading1:false,
                customerOptions:[],
                labelInValue:true
            };
        },
        mounted:function(){
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
                    searchName:name || ''
                }
                let flag=[];
                let list = [];
                let _this = this;
                this.$http.get('search-mbr-list', params, r => {
                    list = r.data.mbrList;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.name;
                        obj.value = item.uid;
                        if(_this.info.value){
                            if(item.uid==_this.info.value){
                                flag.push('0');
                            }
                        }
                        return obj;
                    });
                    if (flag.indexOf('0')== -1){
                            list.push(_this.info);
                    }
                    _this.customerOptions = list;
                }, e => {
                    console.log('error',e)
                })

            }
                    
               
        }
    }
</script>