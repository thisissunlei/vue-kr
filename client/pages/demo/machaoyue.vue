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
        <Form ref="formRight" :model="formRight" :rules="ruleValidate" class="demo-m" label-position="top">
            <KrField 
                :readOrEdit="true" 
                type="text"  
                label="含税" 
                value="123er" 
                name='try'
                inline="true"
                placeholder="请输s入含税收入" 
                :maxLength="200"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="select"  
                label="selectData" 
                value="202" 
                name='try'
                inline="true"
                placeholder="selectData" 
                :selectData="selectData"
                :maxLength="200"
                @okClick="okClick"
            />
             <KrField 
                :readOrEdit="true" 
                type="date"  
                label="selectData" 
                value="202" 
                name='try'
                inline="true"
                placeholder="selectData" 
                :maxLength="200"
                @okClick="okClick"
            />
        </Form>
    </div>
</template>
<script>
    import SinglePhone from '~/components/SinglePhone'
    import dateUtils from 'vue-dateutils';
import KrField from '~/components/KrField';


    export default {
        head () {
            return {
                title: "合同列表",
            }
           
        },
        data () {
            return {
                list:'',
                formRight:{},
                ruleValidate:{

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
                photeUrl:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201803/D/150334902_58.png'
            }
        },
        components:{
            SinglePhone,
            KrField
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
            okClick(value){
                console.log('okClick',value)
            },
            handleSubmit(){
                let saleList = []
                let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date());
                let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date());
                let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date());
                let formItem = {} 
                saleList = []
                formItem.installmentType = 'ONE';
                formItem.deposit = '2';
                formItem.saleList=JSON.stringify([]);
                formItem.seats=JSON.stringify(saleList);
                formItem.customerId='10086';
                formItem.communityId='4';
                formItem.salerId='4';
                formItem.signDate = signDate;
                formItem.rentAmount=12300;
                formItem.firstPayTime=dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date());

                formItem.startDate = start;
                formItem.endDate =end;
                formItem.ssoId = 2;
                formItem.ssoName = '11';
                let _this = this;
                 this.$http.post('save-join', formItem).then( r => {
                    console.log('demo-success')
                    // window.location.href='/orderCenter/orderManage';
                }).catch(e => {
                     _this.$Notice.error({
                        title:e.message
                    })

                        console.log('error',e)
                })
                
            },
            
            
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
