<template>
  <div class="daily-inventory"> 
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='daily'
    />
    <div class='daily-tab'>
        <Discount 
           @countChange="countChange"
           identify='daily'
        />
        <Tabs value="dailyList" :animated="false" @on-click="tabsClick">
                <Tab-pane label="以列表方式展示" name="dailyList">  
                    <DailyTable
                      v-if="tabsValue=='dailyList'"
                      :tabForms="endParams"
                    /> 
                </Tab-pane>

                <Tab-pane label="以时间轴方式展示" name="dailyTime">
                     <GanttChart 
                       v-if="tabsValue=='dailyTime'"
                       :tabForms="endParams"
                       identify='daily'
                     />
                </Tab-pane>
        </Tabs> 
    </div>

  </div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from '../searchForm';
import Discount from '../discount';
import GanttChart from '../Inventory-gantt-chart';
import DailyTable from './dailyTable';

    export default {
        name: 'Daily',
        components:{
            SearchForm,
            Discount,
            GanttChart,
            DailyTable
        },
        data () {
            return {  
                tabsValue:'dailyList', 
                tabForms:{
                    page:1,
                    pageSize:100,
                },
                endParams:{}
            }
        },
        methods:{
            tabsClick(key){
                this.tabsValue=key;
            },
            //数据变化
            dataParams(data){
                this.endParams=Object.assign({},data);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
            //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.dataParams(this.tabForms);
            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.dataParams(this.tabForms);
            },
            //折扣价
            countChange(param,countRadio){
                if(countRadio==1){
                    this.tabForms.discount='';
                }else{
                    this.tabForms.discount=param;
                }
                if(!this.tabForms.cityId){
                    return ;
                }
                this.dataParams(this.tabForms);
            }
        }
    }
</script>

<style lang="less">
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
}
.daily-inventory{
    .daily-tab{
        position: relative;
        padding: 0 20px;
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
            background-color: #f6f6f6;
        }
        .daily-table{
            padding-bottom:77px; 
            margin-top: 30px;
            .ivu-tooltip{
                width:100%
            }
            .ivu-tooltip-rel{
                width:100%
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:200px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
            .spin-position-fix {
                position: relative;
                .ivu-spin-fix{
                    height: 50px;
                    bottom:60px;
                    background-color:transparent;
                }
            }
            .list-footer{
                padding:20px 0 20px 0;
                position: absolute;
                bottom: 0px;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 0;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                    padding-right:5px;
                }
            }
            .statusClass{
                .ivu-table-cell{
                    padding:0 5px;
                }
            }
            .daily-here-date{
                .ivu-table-cell{
                    padding:0 10px;
                }
            }
            .header-here{
                opacity:1;
            }
            .header-no{
                transition: opacity 0.2 ease;
                opacity: 0;
            }
        }
    }
}

</style>
