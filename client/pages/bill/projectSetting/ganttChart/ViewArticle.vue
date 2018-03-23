<template>
  <div class="view-article" :data-article-id="id">
        <div 
            v-if="showData.length"
            v-for="channels in showData"
            :key="channels.id"
        >
            <Article 
                    v-if="leftEndpoint"
                    :minCalibration="minCalibration"
                    :startDate="leftEndpoint"
                    v-for="item in channels"
                    :data="item"
                    :key="item.id"
                />
            
            
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
            type:Object
        },
        leftEndpoint:{
            type:Object,
         
        },
        minCalibration:{
            type:[String,Number],
        },
        id:{
            type:[String,Number]
        }
    },
    data(){
        return{
            showData:[],
            channel:0,
            isLoading:true,
        }
    },
    mounted(){
        if(this.data.tasks && this.data.tasks.length){
            this.showData = [].concat(this.allDataFor(this.data.tasks));

            var leftDom = document.querySelectorAll('li[data-box-id="'+this.showData.id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-article-id="'+this.showData.id+'"]')[0];
            if(leftDom&&rightDom){
                if(leftDom.offsetHeight>rightDom.offsetHeight){
                    rightDom.style.height=this.showData.length + 70+'px';
                }else{
                    leftDom.style.height=rightDom.offsetHeight+'px';
                }
            }
        } 
        
    },
    methods:{
       
        //每一个任务的所有数据
        allDataFor(data){
            var allArr = [];
           allArr[this.channel]=[data[0]];
            for(var i=1;i<data.length;i++){
                var everyStartDay = this.getMaxAndMin(data[i]).min;
                var minChannel= allArr[this.getChannelMin(allArr)];
                var minChannelEndData = minChannel[minChannel.length -1];
                var minChannelEndDay = this.getMaxAndMin(minChannelEndData).max;
                if(everyStartDay>minChannelEndDay){
                    allArr[this.getChannelMin(allArr)].push(data[i])
                }else{
                    this.channel +=1;
                    allArr[this.channel]=[];
                    allArr[this.channel].push(data[i])
                }
            }
            return allArr;
           
        },
        getChannelMin(allArr){
            var Obj = [].concat(allArr)
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
        height: 70px;
        border-top: 1px solid #E1E6EB;;
        border-bottom: 1px solid #E1E6EB;
    }
</style>
