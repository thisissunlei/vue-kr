
<template>         
    <Form ref="fromFieldValidate" :model="validate" :rules="ruleValidate" label-position="top">
        <FormItem label="社区名称" prop="cmtId" class='bill-search-class'> 
            <Select 
                v-model="validate.cmtId" 
                placeholder="请输入社区名称" 
                style="width: 252px"
                filterable
                clearable
                @on-change="getCustomerList"
            >
                <Option 
                    v-for="item in communityList" 
                    :value="item.id" 
                    :key="item.id"
                >
                    {{ item.name }}
                </Option>
            </Select> 
        </FormItem>

        <FormItem label="客户名称" prop="csrId" class='bill-search-class'>
            <Select 
                v-model="validate.csrId" 
                placeholder="请输入客户名称" 
                style="width: 252px"
                filterable
                clearable
            >
                <Option 
                    v-for="item in customerList" 
                    :value="item.id" 
                    :key="item.id"
                >
                    {{ item.name }}
                </Option>
            </Select> 
        </FormItem>
        
        <FormItem label="离场日期" prop="leaveDate" class="bill-search">
            <DatePicker 
                v-model="validate.leaveDate"
                type="date" 
                placeholder="请选择离场日期" 
                style="width: 252px"
            />
            
        </FormItem>
    </Form>
</template>



<script>
    import Vue from 'vue';
    export default{
        props:{
            close:Function,
            params:Object,
        },
        data (){
            return{
                dateError:false,

                validate:{
                   cmtId:'',
                   csrId:'',
                   leaveDate:'',
                },

                ruleValidate:{
                    cmtId:[
                        { required: true, message: '社区名称为必填项'}
                    ],
                    csrId:[
                        { required: true, message: '客户名称为必填项'}
                    ],
                    leaveDate:[
                        { required: true, message: '离场日期为必填项'}
                        
                    ]
                },
                customerList:[],
                communityList:[]
            }
        },
        mounted:function(){
           this.getCommunityList();
        },
        methods:{
            getCommunityList(){
                this.$http.get('join-bill-community','', r => {    
                    this.communityList=r.data.items 
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })
            },

            getCustomerList(){
                if(!this.validate.cmtId){
                    return;
                }
                var params = {
                    communityId:this.validate.cmtId
                }
                this.$http.get('get-from-field-customer',params, r => {    
                    this.customerList=r.data 
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })  
            },
        },
        
        updated:function(){
            var data = false;
            var haveNull = false;
            for(let key in this.validate){
                if(!this.validate[key]){
                    haveNull = true;
                }
            }
            if(!haveNull){
                data = Object.assign({},this.validate);
            }
            this.$emit('newPageData', data);  
        
        }
    }
</script>

<style lang='less' scoped>
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .bill-search{
        display:inline-block;
        padding-left:32px;
        .u-date-txt{
            padding:0 25px;
            font-size: 14px;
            color: #666;
        }
    }

</style> 