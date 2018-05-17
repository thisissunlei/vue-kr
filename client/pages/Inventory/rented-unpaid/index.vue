<template>
  <div class="enter-filed"> 
    <SectionTitle title="已起租未付"></SectionTitle>
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='daily'
    />
    <div class='daily-tab'>
        <Table border :columns="columns"  />
    </div>

  </div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from './searchForm';
import SectionTitle from '~/components/SectionTitle.vue'

    export default {
        name: 'EnterField',
        components:{
            SearchForm,
            SectionTitle
        },
        head() {
            return {
                title: '已起租未付'
            }
        },
        data () {
            return {  
                tabsValue:'dailyList', 
                tabForms:{
                    page:1,
                    pageSize:100,
                },
                endParams:{},
                columns:[
                    {
                        title: '账单类型—ID',
                        key: 'seatType',
                        align:'center',
                        render:(h, params) => {
                            
                        }
                    },
                    {
                        title: '客户名称',
                        key: 'seatType',
                        align:'center',
                    },
                    {
                        title: '服务内容',
                        key: 'seatType',
                        align:'center',
                    },
                    {
                        title: '服务费明细',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '服务开始日',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '账单金额',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '欠款金额',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '逾期时长（服务开始日起）',
                        align:'center',
                        key: 'seatType',
                    },
                ]
            }
        },
        methods:{
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
            //数据变化
            dataParams(data){
                this.endParams=Object.assign({},data);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
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
.enter-filed{
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
