<template>   
        <div class='detail-li' :data-box-id="data.id"
         @mouseover="overShow(data.id)"
         @mouseout="outHide(data.id)"
        >
            <div>{{data.name}}</div>
            <div>{{data.name}}</div>
        </div>
</template>


<script>

export default {
    props:{
       data:{
           type:Object,
           default:{}
       }
    },
    data(){
        return {
           
        }
    },
    mounted(){
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
           height:54px;
           border: 1px solid  #F1F1F1;
           border-right:none;
           border-left:none;
           border-bottom: none;
           background:#fff;
           padding:0 5px; 
           &:first-child{
               border-top: none;
           }
           &:last-child{
               border-bottom:1px solid  #F1F1F1;
           }
           div{
                height:50%;
                text-align: center;
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                color: #333333;
                font-weight: 400;
                &:first-child{
                    padding-top: 8px;
                }
                &:last-child{
                    padding-bottom: 8px;
                }
            }
        }
</style>
