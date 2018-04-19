<template>
  <div class="daily-inventory"> 
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @submitExport="submitExport"
      @initData="initData"
      identify='daily'
    />
    <div class='daily-tab'>
        <Discount 
           @countChange="countChange"
        />
        <Tabs value="dailyList" :animated="false">
                <Tab-pane label="以列表方式展示" name="dailyList">   
                     <div class="daily-table" id="daily-table-list">
                        <Table border stripe :columns="columns" :data="dailyData"></Table>
                        <div  class='list-footer fixed-footer' :style="{left:left+'px',width:width+'px'}">
                                <div style="display:inline-block;">
                                    <Button type='primary' @click='submitStatistical'>统计</Button>
                                </div>
                                <div style="float: right;">
                                    <Page 
                                        :current="tabForms.page"
                                        :total="totalCount"
                                        :page-size="tabForms.pageSize" 
                                        show-total 
                                        show-elevator
                                        @on-change="changePage"
                                   />
                                </div>
                        </div>
                    </div>
                </Tab-pane>

                <Tab-pane label="以时间轴方式展示" name="dailyTime">
                    
                </Tab-pane>
        </Tabs> 
    </div>

    <Modal
        v-model="openStatistical"
        title="统计信息"
        class-name="vertical-center-modal"
        width="600"
     >
        <div style="height:500px;overflow:auto;">
            <Statistical :data="dailyInnerData"/>
        </div>
        <p slot="footer" style="opacity:0;"></p>
    </Modal>

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
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import KrField from '~/components/KrField';
import SearchForm from '../searchForm';
import Statistical from '../statistical';
import Discount from '../discount';

    export default {
        name: 'Daily',
        components:{
            Message,
            KrField,
            SearchForm,
            Statistical,
            Discount
        },
        data () {
            return {   
                warn:'',
                MessageType:'',
                openMessage:false,
                openStatistical:false,
                left:'',
                width:'',

                tabForms:{},
                totalCount:0,
                dailyData:[],
                dailyInnerData:[],
                columns: [
                    {
                        title: '商品',
                        key: 'name',
                        align:'center',
                        render(tag, params){
                            var renCap=params.row.type=='SPACE'?params.row.capacity:'';
                            var location=params.row.location?params.row.location:'-'
                            return h('div', [
                                       h('Tooltip', {
                                            props: {
                                                placement: 'top',
                                                content: location
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                            },params.row.name+'  '+renCap),
                                            h('div',{
                                                style:{
                                                    textOverflow:'ellipsis',
                                                    whiteSpace:'nowrap',
                                                    overflow: 'hidden'
                                                }
                                            },params.row.location),
                                        ])
                                 ])
                            ])
                        }
                    },
                    {
                        title: '商品类型',
                        key: 'type',
                        align:'center',
                        width:110,
                        render(tag, params){
                            var ren=params.row.type?params.row.type:'-';
                            return <span>{ren}</span>
                        }
                    },
                    {
                        title: '商品属性',
                        key: 'property',
                        align:'center',
                        render(tag, params){
                            var desc=params.row.propertyDesc?params.row.propertyDesc:'-'
                            return h('div', [
                                       h('Tooltip', {
                                            props: {
                                                placement: 'top',
                                                content: desc
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                            },params.row.property),
                                            h('div',{
                                                style:{
                                                    textOverflow:'ellipsis',
                                                    whiteSpace:'nowrap',
                                                    overflow: 'hidden'
                                                }
                                            },params.row.propertyDesc),
                                        ])
                                 ])
                            ])
                        }
                    },
                    {
                        title: '面积',
                        key: 'area',
                        align:'center',
                        width:80,
                        render(tag, params){
                            var ren=params.row.area?params.row.area:'-';
                            return <span>{ren}</span>
                        }
                    },
                    {
                        title: '工位单价',
                        key: 'unitPrice',
                        className:'priceClass',
                        align:'center',
                        width:100,
                        render(tag, params){
                            return <span style="text-align:right;width: 100%;display: inline-block;">{params.row.unitPrice}</span>
                        }
                    },
                    {
                        title: '工位数量',
                        key: 'capacity',
                        align:'center',
                        width:100,
                        render(tag, params){
                            var ren=params.row.capacity?params.row.capacity:'-';
                            return <span>{ren}</span>
                        }
                    },
                    {
                        title: '商品总价',
                        key: 'quotedPrice',
                        className:'priceClass',
                        align:'center',
                        width:100,
                        render(tag, params){
                            return <span style="text-align:right;width: 100%;display: inline-block;">{params.row.quotedPrice}</span>
                        }
                    },
                    {
                        title: '当日库存',
                        key: 'statusName',
                        align:'center',
                        width:100,
                        render(tag, params){
                            var ren=params.row.statusName?params.row.statusName:'-'
                            return <span style={params.row.statusName=='不可用'?'color:red':''}>{ren}</span>
                        }
                    },
                    {
                        title: '签约价',
                        key: 'price',
                        className:'priceClass',
                        align:'center',
                        width:80,
                        render(tag, params){
                            var status=params.row.status;
                            var renEnd=(status=='AVAILABLE'||status=='DISABLE')?'-':params.row.price
                            return <span style="text-align:right;width: 100%;display: inline-block;">{renEnd}</span>
                        }
                    },
                    {
                        title: '最近可租起始日',
                        key: 'recentStart',
                        align:'center',
                        width:130,
                        render(tag, params){
                            var ren=params.row.recentStart?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentStart)):'-';
                            return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '最近可租结束日',
                        key: 'recentEnd',
                        align:'center',
                        width:130,
                        render(tag, params){
                            var ren=params.row.recentEnd?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentEnd)):'-';
                            return <span>{ren}</span>;
                        }
                    }
                ]    
            }
        },
        mounted(){
            var dom=document.getElementById('layout-content-main');
            var dailyTableDom=document.getElementById('daily-table-list');
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
            dom.addEventListener("scroll",this.onScrollListener)
        },
        methods:{
            initData(formItem){
                this.tabForms=Object.assign({},formItem,{page:1,pageSize:15});
                this.getTableData(this.tabForms); 
            },
            //获取列表数据
            getTableData(values){
                var params=Object.assign({},values);
                params.inventoryDate=this.dateSwitch(params.inventoryDate);
                this.$http.get('getDailyInventory', params).then((res)=>{
                    this.dailyData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })        
            },
            //信息提示框
            onMessageChange(data){
                this.openMessage=data;
            },
            //页面发生改变
            changePage(page){
                this.tabForms.page=page;
                this.getTableData(this.tabForms);
            },
            //统计开关
            cancelStatical(){
                this.openStatistical=!this.openStatistical;
            },
            //格式转换
            dateSwitch(data){
                return data?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data)):'';
            },
            //获取统计数据
            getStatistal(){
                 this.tabForms.inventoryDate=this.dateSwitch(this.tabForms.inventoryDate);
                 this.$http.get('getDailyStatiscal',this.tabForms).then((res)=>{
                    this.dailyInnerData=res.data;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })
            },
            //打开统计
            submitStatistical(){
                this.cancelStatical();
                this.getStatistal();
            },
            //滚动监听
            onScrollListener(){    
                var dom=document.getElementById('layout-content-main');
                var headDom=document.querySelectorAll('div.daily-table table thead')[0];
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
                var classVal = headDom.getAttribute("class");
                if(dom.scrollTop>=294){
                     if(!classVal){
                         headDom.setAttribute("class",'daily-head-class');
                     }
                }else{
                    if(classVal){
                        classVal = classVal.replace("daily-head-class","");
                        headDom.setAttribute("class",classVal);
                    }
                }
            },
            //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.getTableData(this.tabForms);
            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.getTableData(this.tabForms);
            },
            submitExport(){
                utils.commonExport(this.tabForms,'/api/krspace-finance-web/inventory/export');
            },
            //折扣价
            countChange(param){
                this.tabForms.discount=param;
                this.getTableData(this.tabForms);
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
            .daily-head-class{
                position: fixed;
                top:60px;
            }
            .list-footer{
                padding:20px 0;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                }
            }
        }
    }
}

</style>
