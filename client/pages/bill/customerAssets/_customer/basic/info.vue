

<template>  
    <div class="assets-manage">
        <Form ref="basicInfo" :model="basicInfo" :rules="ruleValidate" class="basic-form" label-position="left">
             <Row>  
                <Col class="col">
                    
                    <div class="customer-id">
                        <span class="title">客户ID：</span>
                        <span class="content">{{basicInfo.customerId}}</span>
                    </div>
                </Col>
                
              
                <Col class="col">
                     <EditInput 
                        label="客户联系人：" 
                        :value="basicInfo.person" 
                        prop="person"
                        name="person"
                        :canSubmit.sync="canSubmit"
                        placeholder="客户联系人" 
                        :label-width='labelWidth'
                        :maxLength="200"
                        :onchange="onChange"

                    />
                </Col>
                <Col class="col">
                     <EditSelect  
                        label="联系人电话：" 
                        name="phone"
                        :value="basicInfo.phone" 
                        placeholder="联系人电话" 
                        :canSubmit.sync="canSubmit"
                        :maxLength="200"
                        :data='optionData'
                        :onchange="onSelectChange"
                        :label-width='labelWidth'

                    />
                </Col>
                <Col>
                     <EditInput  
                        label="公司描述：" 
                        :value="basicInfo.text" 
                        name="text"
                        placeholder="公司描述" 
                        :maxLength="200"
                        :label-width='labelWidth'
                        :onchange="onChange"
                        type="textarea"
                    />
                </Col>
                
            </Row>
            
           
            
        </Form>
    </div>
    

</template>

<script>
    import utils from '~/plugins/utils';
import LabelText from '~/components/LabelText';
    import EditInput from '~/components/EditInput'
    import EditSelect from '~/components/EditSelect'


    export default {
        components:{
            EditInput,
            LabelText,
            EditSelect
        },
        data (){
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    this.canSubmit = false
                    callback(new Error('请填写客户联系人'));
                }else{
                    if(value === '111'){
                        this.canSubmit = false
                        callback(new Error('客户联系人名称不可重复'))
                    }else{
                        this.canSubmit = true;
                        callback()
                    }
                    // this.$http.get('contract-date-range', {}).then( r => {
                    //     this.canSubmit = true;
                    //     callback()
                    //     // this.canSubmit = false
                    //     // callback(new Error('客户联系人名称不可重复'));
                    // }).catch( e => {
                    //     console.log('get-only')
                    //     // this.canSubmit = false
                    //     // callback(new Error('客户联系人名称不可重复'));
                    //     this.canSubmit = true;
                    //     callback()
                    // })

                }
            };
            return{
                canSubmit:true,
                ruleValidate:{
                    person:[
                        { required: true, trigger: 'change' ,validator: validateName},
                        { required: true, validator: validateName, trigger: 'blur' },
                    ]
                },
                selectData:[],
                labelWidth:110,
                basicInfo:{
                    customerId:'3232',
                    customerName:'萨达多撒',
                    phone:'1',
                    person:'冯吸臣',
                    text:'啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
                },
                optionData:[
                    {
                        label:'label1',
                        value:'1'
                    },
                    {
                        label:'label2',
                        value:'2'
                    },
                    {
                        label:'label3',
                        value:'3'
                    },
                    {
                        label:'label4',
                        value:'4'
                    },
                ]
            }
        },
        methods:{
            selectTab(name){
                this.selectedTab = name;
            },
            
            getOnlyName(){
                let only = true;
                this.$http.get('contract-date-range', {}).then( r => {
                    return only = false
                }).catch( e => {
                    console.log('get-only')
                    return only = false;
                })
            },
            handleSubmit(){
                console.log('handleSubmit')
                this.$refs.basicInfo.validate((valid) => {
                  if(!valid){
                    this.canSubmit = false;
                    console.log('valid',valid)
                  } else{
                    console.log('=========',this.canSubmit)
                    this.canSubmit = true;
                  } 
                })
            },
            onChange(name,value){

                this.basicInfo[name] = value;
                this.handleSubmit()
            },
            onSelectChange(name,value){
                this.basicInfo[name] = value.value;
                this.handleSubmit()
            },
            changeWeb(){
                console.log('changeWeb',this.basicInfo.web)
            }
        },
        mounted(){
            GLOBALSIDESWITCH('false');
        }
    
    }
</script>
<style lang="less" scoped>
    .basic-form{
        width: 794px;
    }
    .col{
        display: inline-block;
        width: 50%;
        max-width: 400px;
        padding-right: 10px;
        vertical-align:top;
        .customer-id{
            height: 34px;
            line-height: 34px;
            display: inline-block;
            vertical-align: top;
            .title{
                // padding:10px 12px 10px 0;
                text-align: left;
                display: inline-block;
                font-size: 14px;
                color:#666;
                width:110px;
                font-weight: 500;
                &:before{
                    content:'';
                    width:7px;
                    margin-right: 4px;
                    display: inline-block;
                }
            }
            .content{
                font-size: 14px;
                color:#666;

            }
        }
    }
</style>