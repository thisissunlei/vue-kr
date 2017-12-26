<style lang="less"> 
   
</style>


<template>

    <div>
        
        {{list}}
            <Button type="primary" @click="handleSubmit()" >提交</Button>

    </div>
  
</template>
<script>
    import dateUtils from 'vue-dateutils';

    export default {
        head () {
            return {
                title: "合同列表"
            }
           
        },
        data () {
            return {
                list:''
            }
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
        
    }
</script>