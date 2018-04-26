<template>
  <div class="record-detail">
        <div
            class='record-wrap'
            v-for="item in data" 
            :key="item.id"
        >
            <div class='first'>{{item.uTime|dateFormat('YYYY-MM-dd HH:mm')}}</div>
            <div style="display:inline-block;">
                <div class='second'>
                    <span style="font-weight:bold; ">{{item.updatorName}}&nbsp;</span>
                    <span >{{item.comment}}</span>
                </div>
                <div class='third' v-if="item.detail">
                        <div class="mod-triangle">
                        <div class="t-border"></div>
                        <div class="t-inset"></div>
                    </div>
                    {{item.detail}}
                    
                </div>
            </div>
        </div>
  </div>
</template>


<script>

export default {
    props:{
        data:{
            type:Array,

        }
    },
    data(){
       return {
       }
    },
    mounted(){
        
    },
    methods:{
        
    }
}

</script>

<style lang="less" scoped>
.record-detail{
    margin-top: 20px;
   
        padding:10px;
        margin-left: 12px;
        width:600px;
        display:inline-block;
        border-radius: 4px;
        box-sizing: border-box;
        .record-wrap{
           
            padding-bottom:15px;
            border-bottom:1px solid #EFEFEF;
            .first{
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
                display:inline-block;
                padding-right:30px;
                vertical-align: top;
            }
            .second{
                display:inline-block;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
            }
            .third{
                padding:5px 10px;
                width: 330px;
                background: #F6F6F6;
              
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                color: #666;
                border: 1px solid #EEEEEE;
                box-sizing: border-box;
                border-radius: 4px;
                line-height: 18px;
                position: relative;
               .mod-triangle {
                    display:block;
                    position: absolute;
                    left:5px;
                    top:-13px;
                    z-index:20;
                    .t-border,
                    .t-inset{
                        left:0px;
                        top:0px;
                        width:0;
                        height:0;
                        font-size:0;
                        overflow:hidden;
                        position:absolute;
                        border-width:8px;
                        border-style: solid;
                    }
                    .t-border{
                        border-color:transparent  transparent #EEEEEE transparent;
                        top:-1px;
                    }
                    .t-inset{
                        border-color: transparent  transparent #F6F6F6 transparent;
                    }       
                }
            }
           

        }
    
}
</style>
