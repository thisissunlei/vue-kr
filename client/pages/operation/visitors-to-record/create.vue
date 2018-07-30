<template>
    <div class='daily-search-form'>
        <div class="daily-header">
            <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">

            <Button type="primary" @click="searchClick">搜索</Button>
            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';

export default {
    data() {
            const validatephone = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (value&&!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            return { 
                cityList:[],
                params :{}, 
                formItem:{},
                formItemOld:{},
                ruleDaily: {
                    mobile:[
                        { validator: validatephone, trigger: 'change' }
                    ],
                }
            }
    },
    mounted(){
        this.params=this.$route.query;
        this.getCityList();
    },
    methods:{

        //社区接口
        getCommunityList(id){
           let params =Object.assign({},this.params);
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data;
                if(this.communityList.length>1){
                    this.communityList.unshift({id:' ',name:"全部社区"})
                }
                if(!params.communityId){
                    this.formItem.communityId=''+this.communityList[0].id;
                    this.floorList = []
                }else{
                    this.getFloorList(params.communityId)
                    this.formItem.communityId = ''+params.communityId;
                }
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            let params =Object.assign({},this.params);
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
                if(this.cityList.length>1){
                    this.cityList.unshift({cityId:' ',cityName:"全部城市"})
                    this.formItem.cityId=''+this.cityList[1].cityId;
                    this.formItemOld=Object.assign({},this.formItem,);
                }else{
                    this.formItem.cityId=''+this.cityList[0].cityId;
                    this.formItemOld=Object.assign({},this.formItem);
                }
                if(params.cityId){
                    this.getCommunityList();
                    this.formItem.cityId = ''+params.cityId;
                }
                
                
                this.formItem = Object.assign({},this.formItem,this.$route.query);
                this.$emit('initData',this.formItem);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //获取一级来源
        getFirstChannle(){

        },
        //搜索
        searchClick(){
            this.$refs['formItemDaily'].validate((valid) => {
                if (valid) {
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.floorList = []
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //检查输入字符串字节长度
        fucCheckLength(strTemp) {
            var i,sum;
            sum=0;
            var length = strTemp.length ;
            for(i=0;i<length;i++) {
                if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
                    sum=sum+1;
                }else {
                    sum=sum+2;
                }
            }
            return sum;
        },
        cityChange(param){
            if(param){
                if(param !== this.params.cityId){
                  this.params = {}  
                }
                this.getCommunityList(param)  
            }

            
        },
        communityChange(param){
            if(param){
                this.params = {}
                this.getFloorList(param);
            }
            
        },
        
    }
}
</script>

<style lang='less'>
     .daily-search-form{
         .daily-header{
            padding: 30px 10px 10px 20px;
            .ivu-form .ivu-form-item-label{
                color:#333;
                font-weight: 500;
            }
            .daily-form{
                display:inline-block;
                .ivu-form-item-content{
                    display:inline-block;
                }
                .ivu-form-item:after, .ivu-form-item:before{
                    content: none;
                }
            }
            .priceForm{
                display:inline-block;
                .ivu-form-item-content{
                    display:inline-block;
                }
            }
            .header-icon{
                display:inline-block;
                margin-right:20px;
                vertical-align: top;
                .iconForm{
                    display:inline-block;
                    margin-right:4px;
                    .ivu-form-item-content{
                        display:inline-block;
                    }
                }
                .ivu-tooltip-popper{
                    word-break: break-all;
                    word-wrap: break-word;
                    max-width:200px;
                }
                .ivu-tooltip-inner{
                    white-space: normal;
                }
                .icon-tip{
                    display:inline-block;
                    width:16px;
                    height:16px;
                    background-size: 100%;
                    vertical-align: middle;
                }
                .dateForm{
                    display:inline-block;
                    margin-right:4px;
                }
            }
        }
     }
</style>
