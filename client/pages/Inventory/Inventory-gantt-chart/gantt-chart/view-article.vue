<template>
  <div class="view-article" :data-article-id="id"
    @mouseover="overShow(id)"
    @mouseout="outHide(id)"
   >
        <div 
            class="view-channel"
            v-if="data && data.tasks && data.tasks.length"
        >
            
            <Article 
                v-if="leftEndpoint.year"
                :minCalibration="minCalibration"
                :startDate="leftEndpoint"
                 v-for="item in data.tasks"
                :data="item"
                :key="item.id"
                :todayDetail="todayDetail"
                @editClick="editClick"
            />
            
            
        </div>
  </div>
</template>


<script>
import Article from './article';
export default {
    components:{
        Article,
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
        },
        todayDetail:{
            type:Object,
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
        } 
        console.log(this.data,"ppppppp")
        setTimeout(() => {
            var leftDom = document.querySelectorAll('div[data-box-id="'+this.showData.id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-article-id="'+this.showData.id+'"]')[0];
            if(leftDom&&rightDom){
                if(leftDom.offsetHeight>rightDom.offsetHeight){
                    rightDom.style.height=leftDom.offsetHeight+'px';
                }else{
                    leftDom.style.height=rightDom.offsetHeight+'px';
                }
            }
        },100);
    },
    methods:{
        editClick(id){
            this.$emit('editClick',id,this.id);
        },
       
        //每一个任务的所有数据
        allDataFor(data){
            
         
            //获取所有数据
            var allData = [].concat(this.allArrSort(data));
            //所有通道数据
            var allChannel = [];

            //循环所有数据
            var startObj = Object.assign({},allData[0]);
            startObj.key = this.channel;
            allChannel[this.channel]=[startObj];
            for (var i = 1; i < allData.length; i++) {
                
                if(allData[i].data.planStartTime){
                   var everyData = allData[i];//每一个数据
                    var minData = this.getChannelMin(allChannel);//最小行的最后一个数据
                    
                    var minDataEnd = this.getMaxAndMin(minData).max;//最小行最后一个数据的最大值
                    
                    var everyDataStart = this.getMaxAndMin(everyData).min;//当前元素的最小值
                    if(everyDataStart>minDataEnd){
                        everyData.key = minData.key;
                        allChannel[minData.key].push(everyData);
                    }else{
                        everyData.key = this.channel;
                        var newChannel = [everyData];
                        allChannel.push(newChannel);
                        this.channel++;
                    }
                }
                
                
            }
            return allChannel;
           
        },
        getChannelMin(allArr){
           
            var allChannel = [].concat(allArr);
            var arr = [];
            var data = {};
            var min = 0;
            for(var i=0;i<allChannel.length;i++){
                arr.push(allChannel[i][allChannel[i].length-1]);
            }
             
            var minObj = arr[0];
             minObj.min = this.getMaxAndMin(minObj).max;
            if(arr.length ===1){
                data = arr[0];
            }else {
                for (var i = 1; i < arr.length; i++) {
                    
                    var channelObj = arr[i];
                    channelObj.min =  this.getMaxAndMin(channelObj).max;
                    if(minObj.min>channelObj.Object){
                       minObj = channelObj;
                    }
                }
            }
            return Object.assign({},minObj);

            
        },
        allArrSort(data){
            var allArr = [].concat(data);
            var isSwap = '';
            for (var i = 0; i < allArr.length; i++) {
               isSwap = false;
                for (var j = 0; j < allArr.length-1-i; j++) {
                    if(this.getMaxAndMin(allArr[j]).min >this.getMaxAndMin(allArr[j+1]).min){
                        isSwap = true;
                        var temp = Object.assign({},allArr[j+1]);
                        allArr[j+1] =Object.assign({},allArr[j]);
                        allArr[j] = Object.assign({},temp);
                    }
                    
                }
                if(!isSwap){
                    break;
                }
            }
            return allArr;
        },
        getMaxAndMin(data){
            var arr = [];
           if(data.data.actualStartTime && data.data.actualEndTime){
                arr.push(data.data.actualStartTime)
                arr.push(data.data.actualEndTime)
            }
           
            if(data.data.planStartTime && data.data.planEndTime){
                arr.push(data.data.planStartTime)
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

<style lang="less" scoped>
    .view-article{
       position: relative;
        background:#fff;
        margin-top:5px;
        &:first-child{
            margin-top:0px;
            border-top:none;
           
        }
        .view-channel{
            border-bottom:1px solid #F1F1F1;
            position: relative;
            width: 100%;
            height: 32px;
           
        }
    }
   
</style>
