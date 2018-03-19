<template>
    <div>
        <div class='tab-second-title'>

        </div>

        <div class='chart-tab-left'>
          <div class='chart-left'>
            <Tabs size="small" @on-click="tabsClick" value="name1">
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
            mask:true
        }
    },
    components:{
        TableList
    },
    methods:{
        //列表跳转详情
        rowClick(item){
            window.open(`./projectSetting/progressView/projectDetail?name=${item.name}&id=${item.tId}&city=${item.city}`,'_blank');
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
   .tab-second-title{
        height:70px;
    }
   .chart-tab-left{
       margin:0 26px;
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
