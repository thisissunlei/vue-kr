<style lang="less"> 
.demo-m{
    width: 400px;
}
</style>


<template>

    <div>
        
        {{list}}
        <SinglePhone :defaultImg="defaultImg" :photeUrl="photeUrl"/>
            <Button type="primary" @click="handleSubmit()" >提交</Button>
        <Form ref="formRight" :model="formRight" :rules="ruleValidate" class="demo-m" label-position="left">


                <EditInput name="formRight.discount" :value="formRight.discount" :onchange="onchange" prop="discount" label="客户" :labelWidth="labelWidth"/>
        </Form>
    </div>
</template>
<script>
    import SinglePhone from '~/components/SinglePhone'
    import EditInput from '~/components/EditInput'
    import dateUtils from 'vue-dateutils';
import KrField from '~/components/KrField';

import selectCustomers from '~/components/SelectCustomers.vue'

    export default {
        head () {
            return {
                title: "合同列表",
            }
           
        },
        data () {
            return {
                list:'',
                labelWidth:110,
                formRight:{
                    discount:'',
                    discounts:'0000',
                    customerId:''
                },
                ruleValidate:{
                    discount:[
                        { required: true, message: '请选择客户', trigger: 'blur' }
                    ],
                    discounts:[
                        { required: true, message: '请选择客户', trigger: 'blur' }
                    ],
                    customerId:[
                        { required: true, message: '请选择客户', trigger: 'change' }

                    ]
                },
                selectData:[
                    {
                        label:'11',
                        value:'22'
                    },
                    {
                        label:'101',
                        value:'202'
                    }

                ],
                defaultImg:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201803/W/150220446_340.png',
                // photeUrl:''
                photeUrl:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201803/D/150334902_58.png',
                showEditInput:false,
            }
        },
        components:{
            SinglePhone,
            KrField,
            EditInput,
            selectCustomers
        },
        methods:{
            showEdit(){
                this.showEditInput = true;
                console.log('=====',this.showEditInput )

            },
            changeCustomer(value){
                this.formRight.customerId = value;
                console.log('=====',value)
            },
            getData(){
                this.$http.get('join-bill-detail',{
                   id : 203
                }).then( (response) => {
                    this.list = response.installmentType
                    console.log('=======>',response)
                }).catch( (error) => {
                    console.log('error======>',error)
                }) 
            },
            onchange(value){
                this.formRight.discount = value
                console.log('okClick',value)
            },
            handleSubmit(){
                this.$refs.formRight.validate((valid) => {
                    console.log('validate',valid)
                })
            }  
            
        },
        mounted () {
        }
    }
</script>
<style lang="less">
    .demo{
        padding:20px;
    }
</style>
