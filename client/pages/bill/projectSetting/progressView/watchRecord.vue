<template>
  <div>
        <div class='m-watch-record'>
             <ul
               class='record-wrap'
               v-for="item in recordData" 
               :key="item.time"
             >
                 <li class='first'>{{item.time}}</li>
                 <li class='second'>
                     <div>{{item.detail}}</div>
                     <div style="color:#333;font-weight:500;">{{item.who}}</div>
                 </li>
             </ul>
        </div>
  </div>
</template>


<script>

export default {
    props:{
        recordData:Array,
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
            }
        }
    }
</style>
