<style lang="less">
.g-bill{
    .u-search{
            height:32px;
            margin:16px 0;
            padding:0 20px;
            .u-high-search{
                width:22px;
                height:22px;
                background:url('~/assets/images/upperSearch.png') no-repeat center;
                background-size: contain;  
                float:right;
            }
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }  
}
</style>

<template>
<div class="g-bill">
    <sectionTitle label="收入管理"></sectionTitle>
    <div class="u-search" >
        <Button type="primary" @click="showIncome">挂收入</Button>
        <span class="u-high-search" @click="showSearch"></span>   
    </div>
    <div class="u-table">
        <Table  border :columns="columns1" :data="billList" @on-select="onSelectList" ></Table>
        <div style="margin: 10px;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page :total="totalCount" show-total show-elevator></Page>
            </div>
        </div>
    </div>
     <Modal
        v-model="openSearch"
        title="高级查询"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >
        <HighSearch></HighSearch>
    </Modal>
     <Modal
        v-model="openIncome"
        title="挂收入"
        ok-text="确定"
        cancel-text="取消"
        width="660"
        @on-ok="addSubmit"
     >
        <AddIncome v-on:formData="getAddData"></AddIncome>
    </Modal>
    
</div>
</template>


<script>
import axios from 'kr/axios';
import HighSearch from './highSearch';
import dateUtils from 'vue-dateutils';
import sectionTitle from '~/components/sectionTitle';
import AddIncome from './addIncome';
    export default {
        name: 'income',
        components:{
            HighSearch,
            sectionTitle,
            AddIncome
        },
        data () {
            return {
                totalCount:0,
                openSearch:false,
                openSettle:false,
                openAntiSettle:false,
                openIncome:false,
                tabParams:{
                    page:1,
                    pageSize:15
                },
                billList:[],
                addData:{},
                columns1: [
                    {
                        title: '收入编号',
                        key: 'id',
                        align:'center',
                        width:80
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                        width:180
                    },
                    {
                        title: '所在社区',
                        key: 'communityName',
                        align:'center',
                        width:150
                    },
                    {
                        title: '含税收入',
                        key: 'amount',
                        align:'center'
                    },
                    {
                        title: '收入确认时间',
                        key: 'dealDate',
                        align:'center',
                        width:110,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.dealDate));
                            return time;
                        }
                    },
                     {
                        title: '收入类型',
                        key: 'incomeType',
                        align:'center',
                        width:110,
                        render(h, obj){
                            if(obj.row.incomeType==='MEETING'){
                                return '会议室';
                            }else if(obj.row.incomeType==='PRINT'){
                                return '打印服务 ';
                            }else if(obj.row.incomeType==='CONTRACT'){
                                return '工位服务';
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:100,
                        render:(h,params)=>{
                           return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openView(params.row)
                                        }
                                    }
                                }, '查看')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        created:function(){
            this.getTableData(this.tabParams);
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            openView(params){
                 location.href=`./income/detail/${params.id}`;
            },
            onExport(){
                 console.log('导出')
            },
            showIncome(){
               this.openIncome=true;
            },
            onSelectList(){

            },
            getTableData(params){
                axios.get('get-income-list', params, r => {
                    this.billList=r.data.items;
                    this.totalCount=r.data.totalCount;
                }, e => {
                    console.log('error',e)
                })
            },
            getAddData(form){
                this.addData=form;
            },
            addSubmit(form){
                let params=this.addData;
                console.log('this.addData.dealDate',this.addData.dealDate)
                axios.post('add-income', params, r => {
                    this.$Modal.success(r.message)
                }, e => {
                    this.$Modal.error(e.message)
                })
            }
            
        }

    }
</script>