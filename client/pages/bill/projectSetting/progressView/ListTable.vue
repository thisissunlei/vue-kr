<template>   
        <div class='detail-li' :data-box-id="data.id"
         @mouseover="overShow(data.id)"
         @mouseout="outHide(data.id)"
        >
            <p @click="rowClick(data)">{{data.name}}</p>
            <p :class="noRight">{{data.cityName}}</p>
            <!-- <p v-if="test=='INVEST'" style="border-right:none;">
                <Button type="primary" @click="operationClick(data)" style="cursor:pointer;">确认已签署合同</Button>
            </p> -->
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
    data(){
        return {
            noRight:''
        }
    },
    mounted(){
        if(this.test=='PREPARE'){
            this.noRight='noRight';
        }
        setTimeout(() => {
            this.nameAndContentHright();
        },100);
    },
    methods:{
        nameAndContentHright(){
            var leftDom = document.querySelectorAll('div[data-box-id="'+this.data.id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-article-id="'+this.data.id+'"]')[0];
            if(leftDom&&rightDom){
                if(leftDom.offsetHeight>rightDom.offsetHeight){
                    rightDom.style.height=leftDom.offsetHeight+'px';
                }else{
                    leftDom.style.height=rightDom.offsetHeight+'px';
                }
            }    
        },
        rowClick(item){
            this.$emit('rowClick',item);
        },
        operationClick(item){
            this.$emit('operationClick',item);
        },
        overShow(id){
            var leftDom = document.querySelectorAll('div[data-box-id="'+id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-article-id="'+id+'"]')[0];
            if(leftDom&&rightDom){
                leftDom.style.background="#F7F9FB";
                rightDom.style.background="#F7F9FB";
            }
        },
        outHide(id){
            var leftDom = document.querySelectorAll('div[data-box-id="'+id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-article-id="'+id+'"]')[0];
            if(leftDom&&rightDom){
                leftDom.style.background="#fff";
                rightDom.style.background="#fff";
            }
        }
    }
}
</script>

<style lang="less" scoped>
        .detail-li{
           width:100%;
           height:32px;
           border: 1px solid  #F6F6F6;
           border-right:none;
           border-left:none;
           display:table;   
           background:#fff; 
           margin-top: 5px;
           &:first-child{
               margin-top:0px;
               border-top: none;
           }
           p{
                display:inline-block;
                border-right:1px solid  #F6F6F6;
                width:50%;
                padding:10px;
                height:100%;
                display:table-cell;
                vertical-align:middle;
                word-break:break-all;    
                text-align: center;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color:#333333;
                line-height: 16px;
                font-weight: 400;
                &:nth-child(1){
                    cursor: pointer;
                    font-weight: bold;
                }
            }
            .noRight{
                border-right:none;
            }
        }
</style>
