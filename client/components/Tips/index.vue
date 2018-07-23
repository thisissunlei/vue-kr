<template>
    <div class="tip-box">
     
        <Tooltip :placement="toolTipsDiraction">
            <span  >
                <img src="./images/tips.svg" class="imgInitialClass"/>
            </span>
            <div slot="content" class="tool-tip-box">
                <p v-for="tipcontent in tipContentsArr">{{tipcontent.text}}</p>
            </div>
        </Tooltip>
    </div>


</template>

<script>

export default{
    name:'tips',
    data (){
		return{
            imgSpanClass : "imgInitialClass",
            toolTipsDiraction : "bottom",
            tipContentsArr : [{text:"增加一条提示吧"},{text:"增加一条提示吧"}]
		}

    },
    mounted(){

        if(this.imgClass){
            this.imgInitialClass = this.imgClass;
        }
        if(this.tipsDirection){
            this.toolTipsDiraction = this.tipsDirection;
        }
        if(this.tipsContent){
            console.log("this.tipsContent",this.tipsContent);
            this.tipContentsArr =this.tipsContent
        }
        
    },
    props:[
       "imgClass","tipsDirection",'tipsContent'
    ],
    components: {
     
    },
    methods:{
        


    },
    
    
    

}
</script>
<style lang="less" >
.tip-box{
    display: inline-block;
    vertical-align:bottom;
    padding: 5px 10px;
    .imgInitialClass{
        width : 25px;
        vertical-align:top;
    }

}
    
   
</style>