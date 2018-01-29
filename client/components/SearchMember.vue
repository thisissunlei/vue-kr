<template>
    <div class="ui-select-member">
         <Select 
            :v-model="test.mbrId" 
            remote 
            filterable 
            :remote-method="remoteCustomer" 
            :loading="loading1" 
            @on-change="changeContent"
            :placeholder="value"
        >
            <Option v-for="(option) in customerOptions" :value="''+option.value+''" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
    export default {
        props:{
            onchange:Function,
            test:Object,
            value:String,
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
                let list = [];
                let _this = this;
                this.$http.get('search-mbr-list', params, r => {
                    list = r.data.mbrList;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.name;
                        obj.value = item.uid;
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

<style lang="less"> 
.ui-select-member{
    ::-webkit-input-placeholder { color:#666; }
    ::-moz-placeholder { color:#666; } /* firefox 19+ */
    :-ms-input-placeholder { color:#666; } /* ie */
    input:-moz-placeholder { color:#666; }
}

</style>