

<template>  
    <div class="assets-manage basic-form">
       <Form ref="basicInfo" :model="basicInfo" label-position="left">
             <Row>  
              
                <Col class="col">
                    <FieldBox label="客户id：" 
                        :value="basicInfo.id" 
                        :label-width='labelWidth'/>

                </Col>
                <Col class="col">
                    <FieldBox label="客户名称：" 
                        :value="basicInfo.company" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="客户联系人：" 
                        :value="basicInfo.contactName" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="联系人电话：" 
                        :value="basicInfo.contactTel" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="公司规模：" 
                        :value="basicInfo.scaleName" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="行业分类：" 
                        :value="basicInfo.industryName" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="融资轮次：" 
                        :value="basicInfo.roundName" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="运营状态：" 
                        :value="basicInfo.stateName" 
                        :label-width='labelWidth'/>
                </Col>
                <Col class="col">
                    <FieldBox label="公司官网：" 
                        :value="basicInfo.website" 
                        :label-width='labelWidth'/>
                </Col>
                <Col>
                    <FieldBox label="公司描述：" 
                        :value="basicInfo.companyIntroduce" 
                        :label-width='labelWidth'/>
                </Col>
                
            </Row>
            
        </Form>   
            
    </div>
    

</template>

<script>
    import utils from '~/plugins/utils';
import FieldBox from '~/components/FieldBox';
    // import EditInput from '~/components/EditInput'
    // import EditSelect from '~/components/EditSelect'


    export default {
        components:{
            FieldBox,
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
                    // person:[
                    //     { required: true, trigger: 'change' ,validator: validateName},
                    //     { required: true, validator: validateName, trigger: 'blur' },
                    // ],
                    // web:[
                    //     { trigger: 'change' ,type:'url', message: '请填写正确的公司网址'},
                    // ]
                },
                selectData:[],
                labelWidth:110,
                basicInfo:{},
            }
        },
        methods:{
            selectTab(name){
                this.selectedTab = name;
            },
            getBasicInfo(){
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                 }
                this.$http.get('get-customer-info-detail', param).then( r => {
                    this.basicInfo = r.data
                    console.log('this.basicInfo====>',this.basicInfo)
                }).catch( e => {
                    console.log('get-only')
                })
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
            changeWeb(name,value){
                this.basicInfo[name] = value;
                console.log('changeWeb',this.basicInfo.web)
            }
        },
        mounted(){
            GLOBALSIDESWITCH('false');
            this.getBasicInfo()
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