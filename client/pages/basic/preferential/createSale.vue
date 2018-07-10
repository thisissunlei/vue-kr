<template>
    <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="formContent">
        <FormItem label="优惠类型" prop="type" >
            <Select v-model="formItem.type" style="width:200px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="折扣" v-if="formItem.type == 'discount'" prop="discount">
             <Input v-model="formItem.discount" placeholder="请填写折扣" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="免租期限" v-if="formItem.type == 'freeMap'" prop="month">
             <Input v-model="formItem.month" placeholder="请填写免租期限" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="免租天数" v-if="formItem.type == 'freeMap'" prop="freeDays">
             <Input v-model="formItem.freeDays" placeholder="请填写免租天数" style="width: 200px"></Input>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        props:{
                editData:Object,
                editStatus:String,
            },
        data () {
            const validateDiscount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请先填写折扣'));
                } else if(!(/^(\d|[0-9])(\.\d)?$/.test(value))){
                    callback(new Error('折扣只能为一位小数或整数'));
                }else{
                     callback();
                }
            };
            const validatemonth = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写免租期限'));
                } else if(isNaN(value)){
                    callback(new Error('免租期限只能是整数'));
                }else if(value>12 || value<1){

                }else{
                     callback();
                }
            };
            
            return {
                formItem:{},
                typeList:[
                    {
                        value:'discount',
                        label:'折扣'
                    },
                    {
                        value:'freeMap',
                        label:'免租'
                    }
                ],
                ruleCustom:{
                    type: [
                        { required: true,message: '请选择优惠类型', trigger: 'change' }
                    ],
                    month: [
                        { required: true,message: '请填写免租期限', trigger: 'change' }
                    ],
                    freeDays: [
                        { required: true,message: '请填写免租天数', trigger: 'change' }
                    ],
                    discount: [
                        { required: true, trigger: 'change' ,validator: validateDiscount }
                    ],
                }
                
            }
        },
        watch:{},
        methods:{
        },
        updated:function(){
            if(this.formItem.type == 'discount'){
                this.formItem.month = '';
                this.formItem.freeDays = '';
                // this.formItem.discount = ''
            }
            if(this.formItem.type == 'freeMap'){
                this.formItem.discount = '';
            }


            let data = {}
            data = Object.assign({},this.formItem);
            this.$emit('newPageData', data);
             
            
        
        }
    }
</script>
