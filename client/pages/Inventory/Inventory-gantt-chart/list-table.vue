<template> 
    <div class='inventory-gatt-left-list'>
        <Tooltip  :placement="index==allData.length-1?'top':'bottom'">
            <div slot="content" class='list-content'>
                <p>工位单价：{{data.unitPrice}}</p>
                <p>商品总价：{{data.quotedPrice}}</p>
                <p v-if="data.propertyDesc">补充描述：{{data.propertyDesc}}</p>
            </div>
            <div class='detail-li' :data-box-id="data.id"
            @mouseover="overShow(data.id)"
            @mouseout="outHide(data.id)"
            :style="!data.location?'line-height:40px;':''"
            >
                <div :style="(data.seatType!='SPACE'&&Number(data.spaceId)>0)?'text-align:right':''">{{data.name}}</div>
                <div :style="(data.seatType!='SPACE'&&Number(data.spaceId)>0)?'text-align:right':''">{{data.location}}</div>
            </div>
        </Tooltip>
    </div>
</template>


<script>

export default {
    props:{
       data:{
           type:Object,
           default:{}
       },
       index:{
           type:[String,Number],
       },
       allData:{
           type:Array,
           default:[]
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

<style lang="less">
  .inventory-gatt-left-list{
        width:100%;
        .ivu-tooltip{
            width:100%;
            .ivu-tooltip-rel{
                width:100%;
            }
            .ivu-tooltip-popper{
                max-width:170px;
                word-break:break-all;
                word-wrap: break-word; 
                font-size:14px;
                .ivu-tooltip-inner{
                    white-space:normal;
                    padding:6px;
                }
            }
        }
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
  }
</style>
