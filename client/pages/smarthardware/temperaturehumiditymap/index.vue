<template>
  <div class="g-temp-hunidity">
      <div class="g-temp-hunidity-box">
            <SectionTitle title="温湿度变化" />
            <SearchForm @submitSearchData="submitSearchDataDetail" v-if='showSelectTime'/>
            <div class="table-box">
                <div id="main-info" class="main-info"></div>
            </div>
            
            <Page 
                class="page-component"
                :current="searchData.page"
                :total="totalCount"
                :page-size="searchData.pageSize" 
                show-total 
                show-elevator
                @on-change="pageChanged"
            />
        </div>
        <Modal v-model="showModal" width="350" class-name="temp-humidity-modal">
            <Table :columns="columns1" :data="data1" size="small" :row-class-name="rowClassName">
            </Table>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchForm';
import dateUtils from 'vue-dateutils';


export default {
    head () {
        return {
            title: "温湿度变化"
        }
    },
   components:{
      SectionTitle,SearchForm
   },
   data(){
     return{
        showModal : false,
        showSelectTime : true,
        totalCount:3,
        myChart :null,
        tableScrollTop : 0,
        lastReq : [],
        allData : false,
        searchData :{
            deviceDefId: '',
            pageSize:50,
            startDate : '',
            endDate : '',
            page: 1
        },
        loading : false,
        openTypeList :[],              
        openLogList: [],
        columns1: [
                    {
                        title: '时间',
                        key: 'time',
                        width:'160',
                        render(h,obj){
                           return h('div', [
                                h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.time)))
                            ]);
                            
                        }
                    },
                    {
                        title: '温度',
                        key: 'celsius',
                        // width:'25%',
                        render(h,obj){
                           return h('div', [
                                h('span', obj.row.extra.celsius+"°C")
                            ]);
                            
                        }
                    },
                    {
                        title: '湿度',
                        key: 'humidity',
                        // width:'25%',
                        render(h,obj){
                           return h('div', [
                                h('span', obj.row.extra.humidity+"%")
                            ]);
                            
                        }
                    }
                ],
                data1: []
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.searchData.deviceDefId = this.$route.query.deviceDefId || "";
       this.getListData();
       this.drawTable();
   },
   methods:{
       rowClassName(){
           return 'line-height-low';
       },
       drawTable(){
           let _this =this;
            this.myChart = echarts.init(document.getElementById('main-info'));
            var colors = ['#d14a61','#5793f3'];
            
            var option = {
                color: colors,
                title: {
                    
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                },
                
                legend: {
                    data:['温度','湿度']
                },
                grid:{
                    top:80,
                    left:70,
                    right:60,
                    bottom:40
                },
                toolbox: {
                    right : 30,
                    feature: {
                        
                        myTool1: {
                            show: true,
                            title: '数据视图',
                            icon: 'image://../nav/images/table.svg',
                            onclick: function (){
                                _this.showModal = !this.showModal;
                            }
                        },
                        saveAsImage: {show: true},
                        
                    }
                },
                xAxis: {
                    data: []
                },
                yAxis:[
                    {
                        type: 'value',
                        name: '温度',
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        interval : 6,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    {
                        type: 'value',
                        name: '湿度',
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        interval : 8,
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        max:40
                    }],
                series: [{
                        name: '温度',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '湿度',
                        type: 'line',
                        data: [],
                        yAxisIndex: 1,
                    }
                ]
            };
            this.myChart.showLoading();
            this.myChart.setOption(option);
       },
       submitSearchDataDetail(data){
            var newObj = Object.assign({},this.searchData,data,{page:1});
           this.searchData = newObj;
           this.getListData();
       },
    
       pageChanged(page){
           this.searchData.page =page;
           this.getListData();
       },
       resetData(res){
            var dataArrX = res.data.items.map(function(item,index){
                return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(item.time))
            })
            var tempY = res.data.items.map(function(item,index){
                var temp =item.extra.celsius;
                return temp
            })
            var humidityY = res.data.items.map(function(item,index){
                var humidity =item.extra.humidity;
                return humidity
            })

            this.myChart.setOption({
                xAxis: {
                    data: dataArrX.reverse()
                },
                series: [
                    {
                        name: '温度',
                        type: 'line',
                        data: tempY.reverse()
                    },
                    {
                        name: '湿度',
                        type: 'line',
                        data: humidityY.reverse()
                    }
                ]
            });
       },
       getListData(){

            let _this =this;
            let params = this.searchData;

            this.$http.get('temperaturehumiditymaplist',params).then((res)=>{
                if(res.data.items.length<1){
                    _this.$Notice.info({
                        title: '暂时没有数据',
                        desc: ''
                    });
                }
                _this.totalCount = res.data.totalCount;
                _this.myChart.hideLoading();
                _this.data1 = res.data.items;
                console.log("_this.data1",_this.data1)
                _this.resetData(res);
               
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
       },
   }

}
</script>
<style lang="less">
    .g-temp-hunidity{
        .ivu-form-item{
            margin-bottom: 10px;
        }
        .table-box{
            padding: 0 20px 10px 10px;
            
            .main-info{
                width : 100%;
                height:500px;
            }
        }
        .page-component{
            text-align:right;
            padding:0 20px 20px 0;
        }
    }
    .line-height-low{
        td{
            height:20px;
        }
    }
    .temp-humidity-modal{
        .ivu-modal-footer{
            padding:0;
        }
        .ivu-modal{
            top:50px;
        }
    }
    
</style>


