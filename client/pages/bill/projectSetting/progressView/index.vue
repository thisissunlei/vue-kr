<template>
    <div>
       
        <!-- 甘特图部分 -->
        <GanttChart>
             <div class='chart-tab-left' slot="leftBar">
                <div class='chart-left'>
                    <Tabs size="small" value="name1" @on-click="tabsClick">
                        <TabPane label="待开业项目" name="name1">
                            <TableList
                                :listData="todoData"
                                @rowClick="rowClick"
                                v-if="mask"
                            />
                        </TabPane>
                        <TabPane label="投拓期项目" name="name2">
                            <TableList
                                :listData="downData"
                                @rowClick="rowClick"
                                v-if="!mask"
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </GanttChart>
        <!-- 左侧切换部分内容 -->
           
      
    </div>

</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

import TableList from './tableList';
import GanttChart from '../ganttChart';
export default {
    components:{
        TableList,
        GanttChart
    },
    data(){
        return{
            todoData:[
                {name:'俊浩中牙膏公园你好好俊浩中牙膏公园你好好',communityName:'俊浩中牙膏公园skdjsjkjckjksjkvjcksjkvkdhdfkdsjhjhsdjkhjhsdjf',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            downData:[
                {name:'1',communityName:'2',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            mask:true
        }
    },
    mounted(){
       
        // this.getYears(this.showData);

    },
    methods:{
        //列表跳转详情
        rowClick(item){
            window.open(`./projectSetting/projectDetail?name=${item.name}&id=${item.tId}&city=${item.city}`,'_blank');
        },
        //tab切换
        tabsClick(key){
            if(key=='name2'){
                this.mask=false;
            }else{
                this.mask=true;
            }
        }
    }

}
</script>

<style lang="less">
  
    .chart-tab-left{
        width:246px;
        border: 1px solid #E1E6EB;
        display:inline-block;
        border-bottom: none;
        .chart-left{
            .ivu-tabs-nav{
                width:100%;
                height: 51px;
                padding-top: 8px;
                .ivu-tabs-ink-bar{
                    width:58px !important;
                    left: 31px;
                }
            }
        }
        .ivu-tabs-mini .ivu-tabs-tab{
            width:50%;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: 14px;
        }
        .ivu-tabs-nav .ivu-tabs-tab-active{
            color: #4A90E2;
        }
    }
       
       
   
</style>
