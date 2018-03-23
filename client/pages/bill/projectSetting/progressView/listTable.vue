<template>   
        <div class='detail-li' :data-box-id="data.id">
            <p @click="rowClick(data)">{{data.name}}</p>
            <p>{{data.cityName}}</p>
            <p v-if="test=='INVEST'" style="color:#499df1;cursor:pointer;" @click="operationClick(data)">确认已签署合同</p>
        </div>
</template>


<script>

export default {
    props:{
       data:{
           type:Object,
           default:{}
       },
       test:{
           type:String,
           default:''
       }
    },
    mounted(){
        setTimeout(() => {
            var leftDom = document.querySelectorAll('div[data-box-id="'+this.data.id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-article-id="'+this.data.id+'"]')[0];
            if(leftDom&&rightDom){
                if(leftDom.offsetHeight>rightDom.offsetHeight){
                    rightDom.style.height=leftDom.offsetHeight+'px';
                }else{
                    leftDom.style.height=rightDom.offsetHeight+'px';
                }
            }    
        },100);
    },
    methods:{
        rowClick(item){
            this.$emit('rowClick',item);
        },
        operationClick(item){
            this.$emit('operationClick',item);
        }
    }
}
</script>

<style lang="less" scoped>
        .detail-li{
           width:100%;
           height:70px;
           border: 1px solid #E1E6EB;
           border-right:none;
           border-left:none;
           display:table;    
           &:nth-child(2n+1){
              background: #F5F6FA;
           }
           &:last-child{
              border-bottom: 2px solid #E1E6EB;
           }
           p{
                display:inline-block;
                border-right:1px solid #E1E6EB;
                width:33%;
                padding:10px;
                height:100%;
                display:table-cell;
                vertical-align:middle;
                word-break:break-all;    
                text-align: center;
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                color: #666666;
                line-height: 16px;
                font-weight: 500;
                &:nth-child(3){
                    border-right:none;
                }
                &:nth-child(1){
                    cursor: pointer;
                }
            }
        }
</style>
