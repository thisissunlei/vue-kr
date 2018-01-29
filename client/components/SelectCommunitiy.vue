<template>
    <div class="com-select-community">
         <Select
            v-model="test.communityId"
            filterable
            remote
            :remote-method="remoteMethod1"
            :loading="loading1"
            @on-change="changeContent"
            placeholder="请选择"
            :label="test.label"
            :label-in-value="labelInValue"
            clearable
            >
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
    export default {
        props:{
            onchange:Function,
            test:Object,
        },
        data () {
            return {
                loading1:false,
                options1:[],
                labelInValue:true,
            };
        },
        mounted:function(){
           
            this.getCusomerList(' ')
        },
        methods: {
            changeContent:function(value){
               this.onchange(value);
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
                this.$http.get('get-mainbill-community', params).then((res)=>{
                    list = res.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.communityname;
                        obj.value = item.id+'';
                        return obj;
                    });
                    _this.options1 = list;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                return list;

            }
                    
               
        }
    }
</script>
