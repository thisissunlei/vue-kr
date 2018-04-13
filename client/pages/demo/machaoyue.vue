<style lang="less"> 
   
</style>


<template>

    <div>
         <Card >
             <p slot="title">
                section1
            </p>
            <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="left">
                <Form-item label="客户名称" class="bill-search-class" prop="company">
                    <i-input 
                        v-model="formItem.company" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        :maxlength="max"
                    />
                </Form-item>
                <Form-item label="相关社区" class="bill-search-class" prop="communityId"> 
                    <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
            </Form>
            <Button type="primary" @click="submitCreate('formItemOne')">确定1</Button>

         </Card>

         <Card >
             <p slot="title">
                section2
            </p>
            <Form ref="formRightTwo" :model="formItem" :rules="ruleValidateTwo" class="demo-m" label-position="left">
                <Form-item label="客户联系人" class="bill-search-class" prop="contactName">
                    <i-input 
                        v-model="formItem.contactName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        :maxlength="max"
                    />
                </Form-item>
                <Form-item label="联系人手机号" class="bill-search-class" prop="contactTel">
                    <i-input 
                        v-model="formItem.contactTel" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="联系人邮箱" class="bill-search-class" prop="contactMail">
                    <i-input 
                        v-model="formItem.contactMail" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
            </Form>
            <Button type="primary" @click="submitCreate('formRightTwo')">确定2</Button>

         </Card>

         <Card >
             <p slot="title">
                section2
            </p>
            <Form ref="formRightThree" :model="formItem" :rules="ruleValidateThree" class="demo-m" label-position="left">
                <Form-item label="客户名称" class="bill-search-class" prop="companytow">
                    <i-input 
                        v-model="formItem.companyName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        :maxlength="max"
                    />
                </Form-item>
            </Form>
            <Button type="primary" @click="submitCreate('formRightThree')">确定3</Button>
         </Card>

            <Button type="primary" @click="submit">确定all</Button>

        
    </div>
  
</template>
<script>
    import dateUtils from 'vue-dateutils';
    import Buttons from '~/components/Buttons';

import selectCustomers from '~/components/SelectCustomers.vue'

    export default {
        head () {
            return {
                title: "合同列表"
            }
           
        },
        data () {
            const validatephone = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    this.canSubmit = false
                    callback(new Error('请填写客户联系人'));
                }else{
                   
                    this.$http.get('check-company', {company:value}).then( r => {
                        this.canSubmit = true;
                        if(r.message == "ok"){
                            callback()
                        }else{
                           callback(new Error('客户名称不可重复')) 
                        }
                        console.log('company',r.data)
                    }).catch( e => {
                        this.canSubmit = false;
                        callback(new Error('客户名称不可重复')) 

                        
                    })

                }
            };
            return {
                list:'',
                labelWidth:110,
                max:20,
                formItem:{
                },
                ruleValidateOne:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    company:[
                        { required: true, message: '请填写客户名称'},
                        { required: true, trigger: 'blur' ,validator: validateName},
                    ],
                },
                ruleValidateTwo:{
                    contactMail:[
                        { required: true, message: '请填写客户联系人邮箱',type:"email"}
                    ],
                    contactName:[
                        { required: true, message: '请填写客户联系人'}
                    ],
                    contactTel:[
                        { required: true, message: '请填写客户联系人电话'},
                        { required: true, trigger: 'blur' ,validator: validatephone},

                    ],
                },
                ruleValidateThree:{
                    
                    
                    companytow:[
                        { required: true, message: '请填写客户名称'},
                        { required: true, trigger: 'blur' ,validator: validateName},
                    ],
                },
                communityList:[
                    {
                        name:'11',
                        value:'22'
                    },
                    {
                        name:'101',
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
            Buttons,
            selectCustomers
        },
        mounted(){
            this.getData()
        },
        methods:{
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
            submitCreate(name){
                this.$refs[name].validate((valid) => {
                    console.log('validate',valid)
                })
            }  ,
            submit(){
                console.log('submit',this.formItem)
            }
            
        },
        
    }
</script>