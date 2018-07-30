<template>
  <div class="enter-filed"> 
    <SectionTitle title="预约参观"></SectionTitle>
    <div class="buttons" style="margin-top:20px;">
        <span style="display:inline-block;width:20px"></span>
        <Button type='primary' @click='submitExport'>新建</Button>
        <span style="display:inline-block;width:20px"></span>
        <Button type='primary' @click='submitExport'>导入</Button>
        <span style="display:inline-block;width:20px"></span>
        <Button type='primary' @click='submitExport'>导出</Button>
        
    </div>
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='daily'
    />
    <div class='enter-filed-table'>
        <Table :loading="loading" :height="height" border stripe :columns="columns" :data="dailyOldData">            
            <div slot="loading">
                    <Loading/>
            </div> 
        </Table>
        <div style="float: right;margin:10px 0">
            <Page 
                :current="page" 
                :total="totalCount" 
                :page-size="pageSizes" 
                @on-change="changePage" 
                show-total 
                show-elevator
            ></Page>
        </div>
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
import ToolTip from '~/components/ToolTip';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from './searchForm';
import Message from '~/components/Message';
import Loading from '~/components/Loading';
import SectionTitle from '~/components/SectionTitle.vue'

var layoutScrollHeight=0;
    export default {
        name: 'EnterField',
        components:{
            SearchForm,
            Message,
            ToolTip,
            Loading,
            SectionTitle
        },
        head() {
            return {
                title: '预约参观'
            }
        },
        data () {
            return {  
                dailyOldData:[],
                totalCount:0,
                loading:true,
                spinLoading:false,
                tabsValue:'dailyList', 
                theHead:false,
                theEnd:true,
                sideBar:true,
                height:'200',
                tabForms:{
                    page:1,
                    pageSize:15,
                },
                totalPages:'',
                page:1,
                pageSizes:15,
                endParams:{},
                tableList:[],
                columns:[
                    {
                        title: '姓名',
                        key: 'name',
                        align:'center',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '电话',
                        key: 'mobile',
                        width:110,
                        align:'center',
                    },
                    {
                        title: '一级来源',
                        key: 'channelTypeStr',
                        width:70,
                        align:'center',
                    },
                    {
                        title: '二级来源',
                        align:'center',
                        width:80,
                        key: 'channelName',
                    },
                    {
                        title: '官网预约参数',
                        align:'center',
                        width:110,
                        key: 'startDate',
                    },
                    {
                        title: '预约城市',
                        align:'center',
                        width:70,
                        key: 'cityName'
                    },
                    {
                        title: '预约社区',
                        width:90,
                        align:'center',
                        key: 'communityName',
                    },
                    {
                        title: '参观日期',
                        align:'center',
                        width:100,
                        key: 'appiontTime',
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        width:130,
                        key: 'cTime',
                        render(h,params){
                            
                        }
                    },
                    {
                        title: '是否联系',
                        align:'center',
                        width:110,
                        key: 'endDate',
                    },
                    {
                        title: '是否到访',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                        render(h,params){
                            return params.row.rentDays+'天'
                        }
                    },
                    {
                        title: '终端来源',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                    },
                    {
                        title: '推介人姓名',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                    },
                    {
                        title: '推介人电话',
                        align:'center',
                        width:130,
                        key: 'rentDays',
                    },
                    {
                        title: '拜访人数',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                    },
                    {
                        title: '是否注册会员',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                    },
                    {

                        title: '操作',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                    },
                ],
                openMessage:false,
                MessageType:'',
                warn:''
            }
        },
        mounted(){
            if(this.tabForms.cityId){
                this.tabForms = this.$route.query;
                this.getCommonParam(); 
            }   
            var height = document.body.clientHeight-200;
            console.log('mounted',height)
            this.height = height;

        },
        watch:{
            tabForms:function(val,old){
                this.getCommonParam();
                this.getData(this.tabForms); 
            }
        },
        methods:{
            getCommonParam(){
                this.tabForms.page=1;
                this.dailyOldData=[];
                this.loading=true;
            },
            //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.endParams=Object.assign({},this.tabForms);
                utils.addParams(this.tabForms);

            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},formItem);
                this.endParams=Object.assign({},this.tabForms);
                utils.addParams(this.tabForms);
            },
            //数据变化
            dataParams(data){
                this.endParams=Object.assign({},data);
                // this.getData(this.endParams);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
            getData(params){
                // getImtPutawayList
                this.$http.get('getImtPutawayList', params).then((res)=>{
                    this.tableList=res.data.items;
                    this.dailyIndentify=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.page=res.data.page;
                    this.loading=false;
                    this.spinLoading=false;
                    this.dailyOldData=this.tableList;

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
            submitExport(){
                utils.commonExport(this.tabForms,'/api/order/operation/imtPutaway/list-excel');
            },
            changePage(page){
                this.tabForms.page = page;
                this.getData(this.tabForms)
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
    .enter-filed{
        .enter-filed-table{
            position: relative;
            padding: 0 ;
            .line{
                display:inline-block;
                width:100%;
                border-top:1px solid #dddee1;
                margin-bottom:10px;
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
                .list-footer{
                    padding:20px 0 20px 20px;
                    position: absolute;
                    bottom: 0px;
                    padding-left:0;
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
     .enter-filed-table{
            padding-bottom:77px; 
            margin:0 20px;
            //margin-top: 30px;
            position: relative;
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
                padding:20px 0 20px 20px;
                position: absolute;
                bottom: 0px;
                padding-left:0;
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
</style>


