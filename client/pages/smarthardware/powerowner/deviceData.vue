<template>

<div class="device-info">
     
    <div class="item">
        <span>智能硬件ID：</span><span>{{data.deviceId}}</span>
    </div>
    <div class="item">
        <span>屏幕展示编号：</span><span>{{data.deviceCode}}</span>
    </div>
    <div class="item">
        <span>屏幕展示标题：</span><span>{{data.title}}</span>
    </div>

</div>

</template>

<script>

export default{
    name:'equipmentSearch',
    data (){
		return{
          
		}

    },
    mounted(){
        
    },
    props:{
      data:{
        type :Object 
      }  
    },
    components: {
     
    },
    methods:{

    }

}
</script>
<style lang="less" >

   .device-info{
       margin-bottom: 9px;
       background: #eee;
        border-radius: 7px;
        padding: 10px;
       .item{
           display: inline-block;
           width: 33%;
            span{
                font-size: 14px;
            }
       }
   }


</style>