<template>
  <div>
        <div class='m-watch-record' style="max-height: 400px;overflow-y: scroll;">
             <ul
               class='record-wrap'
               v-for="item in watchRecord" 
               :key="item.uTime"
             >
                 <li class='first'>{{item.uTime|dateFormat('MM-dd HH:mm')}}</li>
                 <li class='second'>
                        <div class='seconds'>
                            <span style="padding-right: 10px;">{{item.updator}}</span>
                            <span>{{item.comment}}</span>
                        </div>
                        <div class='thirds' style="font-weight:500">
                            {{item.detail}}
                        </div>
                 </li>
             </ul>
        </div>
  </div>
</template>


<script>

export default {
    props:{
        watchRecord:Array,
        default:[]
    },
    data(){
        return{
            
        }
    },
    methods:{

    }
}
</script>

<style lang="less" scoped>
    .m-watch-record{
        .record-wrap{
            margin:15px;
            border-bottom:solid 1px #ddd;
            li{
                font-size: 14px;
                color: #666666;
            }
            .first{
                display:inline-block; 
                padding-right:30px;
                vertical-align: top;
            }
            .second{
                display:inline-block;
                div{
                    margin-bottom:20px;
                }
                .seconds{
                display:inline-block;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
                }
                .thirds{
                    width: 400px;
                    background: #fff;
                    font-family: PingFang-SC-Regular;
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }
</style>
