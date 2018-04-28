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
                    callback(new Error('请先选择首付款日期'));
                } else if(new Date(this.formItem.startDate)<new Date(value)){
                    callback(new Error('首付款日期不得晚于起始日期'));
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
                        { required: true,message: '请填写折扣', trigger: 'change' }
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
