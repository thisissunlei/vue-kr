<template>
  <div>
       <div  
        class="view-article"
        v-for="(channel,index) in showData"
        :key="index"
       >
           <!-- <Article 
                v-if="leftEndpoint"
                :minCalibration="minCalibration"
                :startDate="leftEndpoint"
                v-for="item in channel"
                :data="channel"
                :key="item.value"
            /> -->
            122334
       </div>
  </div>
</template>


<script>
import Article from './Article';
export default {
    components:{
       Article
    },
    props:{
        data:{
            type:Array
        },
        leftEndpoint:{
            type:Object,
            default:{}
        },
        minCalibration:{
            type:[String,Number],
        }
    },
    data(){
        return{
            showData:[],
            channel:0,
            tasks:[
                {
                    children:[],
                    data:{
                        actualEndTime:'1520179200',
                        actualStartTime:'1519833600',
                        planEndTime:'1520179200',
                        planStartTime:'1519833600',
                        taskType:'STAGETASK'
                    },
                    label:'123',
                    t_id:3,
                    value:3
                },
                {
                    children:[],
                    data:{
                        actualEndTime:'1520524800',
                        actualStartTime:'1520092800',
                        planEndTime:'1520524800',
                        planStartTime:'1520092800',
                        taskType:'STAGETASK'
                    },
                    label:'1232',
                    t_id:2,
                    value:2
                },
                {
                    children:[],
                    data:{
                        actualEndTime:'1520784000',
                        actualStartTime:'1520438400',
                        planEndTime:'1520784000',
                        planStartTime:'1520438400',
                        taskType:'STAGETASK'
                    },
                    label:'1233',
                    t_id:1,
                    value:1
                }
            ]
        }
    },
    mounted(){
        this.allDataFor(this.tasks);
        console.log('ddfff',this.showData);
    },
    methods:{
        //每一个任务的所有数据
        allDataFor(data){
            this.showData[this.channel]=[data[0]];
            for(var i=1;i<data.length;i++){
                var everyStartDay = this.getMaxAndMin(data[i]).min;
                var minChannel= this.showData[this.getChannelMin()];
                var minChannelEndData = minChannel[minChannel.length -1];
                var minChannelEndDay = this.getMaxAndMin(minChannelEndData).max;
                if(everyStartDay>minChannelEndDay){
                    this.showData[this.getChannelMin()].push(data[i])
                }else{
                    this.channel +=1;
                    this.showData[this.channel]=[];
                    this.showData[this.channel].push(data[i])
                }
            }
        },
        getChannelMin(){
            var Obj = [].concat(this.showData)
            var arr = [];
            var key = 1;
            for (var key in Obj) {
                var everArr = [].concat(Obj[key]);
                arr.push({
                    key:key,
                    data:everArr[everArr.length -1]
                    });
            }
            
            var min = this.getMaxAndMin(arr[0].data).max;
            for (var i = 1; i < arr.length; i++) {
                if(min>this.getMaxAndMin(arr[i].data).max){
                    min = this.getMaxAndMin(arr[i].data).max
                    key = arr[i].key;
                }
            }
            return key;
        },
        getMaxAndMin(data){
            var arr = [];
            if(data.data.actualStartTime){
                arr.push(data.data.actualStartTime)
            }
            if(data.data.actualEndTime){
                arr.push(data.data.actualEndTime)
            }
            if(data.data.planStartTime){
                arr.push(data.data.planStartTime)
            }
            if(data.data.planEndTime){
                arr.push(data.data.planEndTime)
            }
            var max = arr[0],min=arr[0];
            for (var i = 1; i < arr.length; i++) {
                if(max<arr[i])
                    max =  arr[i];
                if(min>arr[i])
                    min = arr[i];
            }
            return {
                min:min,
                max:max
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .view-article{
       
    }
</style>
