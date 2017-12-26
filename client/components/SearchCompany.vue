<style lang="less"> 
   
</style>



<template>
    <div class="com-select-customers">
         <Select
            :v-model="test.customerId"
            filterable
            remote
            :loading="loading1"
            @on-change="changeContent"
            :remote-method="remoteCustomer"
            >
            <Option 
                v-for="(option, index) in companyOptions" 
                :value="option.value" 
                :key="index"
            >{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


    export default {
        props:['name','onchange','test'],
        data () {
            return {
                loading1:false,
                companyOptions:'',
            };
        },
        mounted:function(){
            this.getCusomerList('')
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
                   this.getCusomerList('');
                }
            },
            getCusomerList:function(name,type){
                 let params = {
                    companyName:name
                }
                let list = [];
                let _this = this;
                this.$http.get('getCompanyInfo', params, r => {
                    list = r.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.companyName;
                        obj.value = item.csrId;
                        return obj;
                    });
                    _this.companyOptions = list;
                }, e => {
                    console.log('error',e)
                })
                return list;
            }
                    
               
        },
    }
</script>
