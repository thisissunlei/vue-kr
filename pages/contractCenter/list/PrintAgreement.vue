<style lang='less'>
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
<template>         
<div>
    <p  style={{color:'#999',fontSize:'14px'}}>示例一：未加盖公章的合同</p>

</div>
</template>
<script>
    import axios from 'kr/axios';
    export default{
        props:['mask'],
        data (){
            
            return{
                dateError:false,
                formItem:{
                   communityName:'',
                   contractType:'',
                   customName:'',
                   maxCTime:'',
                   minCTime:'',
                   serialNumber:'',
                },
               
                type:this.mask=='join'?true:false,
                //合同状态
                orderList:[
                    
                    {
                        value:'UNENFORCED',
                        label:'未生效'
                    },
                    {
                        value:'EXECUTED',
                        label:'已生效'
                    },
                    {
                        value:'CANCELLATION',
                        label:'已作废'
                    }
                ],
                //合同类型
                typeList:[],
                communityList:[]
            }
        },
        created:function(){
            var _this=this;
            axios.get('join-bill-community','', r => {    
                   _this.communityList=r.data.items 
                }, e => {
                  _this.$Message.info(e);
            })
            axios.get('get-center-prepare-data','',r => {
                   _this.typeList = r.data.items;
                }, e => {
                  _this.$Message.info(e);
            })
        },
        updated:function(){
            if(this.formItem.minCTime&&this.formItem.maxCTime){
                if(this.formItem.minCTime>this.formItem.maxCTime){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                this.dateError=false; 
            }
            this.$emit('bindData', this.formItem,this.dateError);
        }
    }
</script>

