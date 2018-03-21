<template>
  <div>
       <div>

       </div>
  </div>
</template>


<script>

export default {
    props:{
        data:{
            type:Array
        }
    },
    data(){
        return{
            showData:{},
            channel:1,
        }
    },
    mounted(){
        console.log(this.data.tasks);
    },
    methods:{
        //每一个任务的所有数据
        allDataFor(data){
            this.showData[this.channel]=[data[1]];
            for(var i=1;i<data.length;i++){
                var everyStartDay = this.getMaxAndMin(data[i]).min;
                var minChannel= this.showData[this.getChannelMin()];
                var minChannelEndData = minChannel[minChannel.length -1];
                var minChannelEndDay = this.getMaxAndMin(minChannelEndData).max;
                if(everyStartDay>minChannelEndDay){
                    this.showData[this.getChannelMin()].push(data[i])
                }else{
                    this.channel +=1;
                    this.showData[this.channel].push(data[i])
                }
            }
        },
        getChannelMin(){
            var Obj = Object.assign({},this.showData)
            var arr = [];
            var key = 1;
            for (var key in Obj) {
                var everArr = [].concat(Obj[key]);
                arr.push({
                    key:key,
                    data:everArr[everArr.length -1]
                    });
            }
            var min = this.getMaxAndMin(arr[1].data).max;
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
