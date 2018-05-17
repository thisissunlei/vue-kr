<template>
  <div class="enter-filed"> 
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='daily'
    />
    <div class='daily-tab'>
        <Table border :columns="columns" :data="tableList" />
    </div>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onMessageChange"
    />

  </div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from './searchForm';
import Message from '~/components/Message';

    export default {
        name: 'EnterField',
        components:{
            SearchForm,
            Message
        },
        data () {
            return {  
                tabsValue:'dailyList', 
                tabForms:{
                    page:1,
                    pageSize:100,
                },
                endParams:{},
                tableList:[],
                columns:[
                    {
                        title: '商品',
                        key: 'seatType',
                        align:'center',
                    },
                    {
                        title: '商品类型',
                        key: 'seatType',
                        align:'center',
                    },
                    {
                        title: '工位数量',
                        key: 'seatType',
                        align:'center',
                    },
                    {
                        title: '进场日',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '离场日',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '租期',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '当前签约价',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '当前客户',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '客户当前在租工位数',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '随后可续时段',
                        align:'center',
                        key: 'seatType',
                    },
                    {
                        title: '商品定价',
                        align:'center',
                        key: 'seatType',
                    },
                ],
                openMessage:false,
                MessageType:'',
                warn:''
            }
        },
        mounted(){
            this.getData(this.endParams);
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
                console.log('数据变化=======',this.endParams)
                this.getData(this.endParams);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
            getData(params){
                this.$http.get('getDueList', params).then((res)=>{
                    this.tableList = []
                }).catch((error)=>{
                    this.tableList = []
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                }) 
            },
            //信息提示框
            onMessageChange(data){
                this.openMessage=data;
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
