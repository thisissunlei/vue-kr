<template>
    <div>
        <div class='chart-tab-left'>
          <div class='chart-left'>
            <Tabs size="small">
                <TabPane label="待开业项目">
                    <TableList
                      :listData="todoData"
                      @rowClick="rowClick"
                    />
                </TabPane>
                <TabPane label="投拓期项目">
                    <TableList
                      :listData="downData"
                      @rowClick="rowClick"
                    />
                </TabPane>
            </Tabs>
          </div>
        </div>
  </div>
</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import TableList from './tableList';

export default {
    data(){
        return{
            todoData:[
                {name:'俊浩中牙膏公园你好好',communityName:'2',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            downData:[
                {name:'1',communityName:'2',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
        }
    },
    components:{
        TableList
    },
    methods:{
        rowClick(item){
            window.open(`./projectSetting/progressView/projectDetail?name=${item.name}&id=${item.tId}&city=${item.city}`,'_blank');
        }
     }
}
</script>

<style lang="less">
   .chart-tab-left{
       padding:14px 0px 30px 0;
       width:246px;
       border: 1px solid #E1E6EB;
       display:inline-block;
       .chart-left{
           .ivu-tabs-bar{
               width:195px;
               margin:0 auto;
           }
       }
    }
</style>
