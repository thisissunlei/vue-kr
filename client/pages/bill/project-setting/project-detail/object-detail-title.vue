
<template>

    <div class="object-detail-title">
        <div class="task-name">
            <span>{{data.name}}</span>
            <span 
                v-if="data.taskStatus"
                class="task-status" 
                style="background: #EEEEEE;color: #666666;"
            >
                <span 
                    class="actual"
                    :style="{
                        background:getActualBgColor(),
                        color:'#495060'
                    }"
                >{{data.taskStatusDesc}}</span>
            </span>
        </div>
        <div class="object-name">{{data.projectName}}</div>
    </div>

</template>
<script>
import publicFn from '../publicFn'
export default{
   props:{
        data:{
            type:Object
        },
        taskStatus:{
            type:String,
        }
   },
   data(){
       return {
           status:this.taskStatus,
       }
   },
   watch:{
       taskStatus:function (params) {
      
           this.status = this.taskStatus;
       }
   },
   methods:{
       getActualBgColor(){
            let taskStatus = this.data.taskStatus;
            if(taskStatus == "DONE"){
                return '#afd882'
            }else{
                return "#eee"
            }
       },
   }
}
	
</script>
<style lang="less" scoped>
    .object-detail-title{
        display: inline-block;
        height: 40px;
        vertical-align: middle;
        .task-name{
            font-size: 16px;
            line-height: 20px;
        }
        .object-name{
            font-size: 14px;
            color: #666666;
            line-height: 20px;
        }
        .task-status{
            display: inline-block;
            height: 20px;
            line-height: 20px;
            border-radius: 15px;
            margin-left: 10px;
            background: #EEEEEE;
            .actual{
                display: inline-block;
                height: 100%;
                min-width: 50px;
                padding: 0px 10px;
                border-radius: 15px;
                text-align: center;
                font-size: 12px;
                font-weight: bold;
                
            }
        }
    }
</style>
