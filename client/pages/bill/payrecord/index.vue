<style lang="less"> 
.g-order{
   .u-search{
        height:32px;
        margin:16px 0;
        padding-left: 20px;
        .m-search{
            color:#2b85e4; 
            display:inline-block;
            margin-left:10px;
            font-size:14px;
            cursor:pointer;
        }
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }
    .u-txt-red{
	    color:#FF6868;
	}
}   

</style>
<template>
<div class="g-order">
    <SectionTitle label="交易流水"></SectionTitle>
    <div class="u-search" >
        <div style='display:inline-block;float:right;padding-right:20px;'>
            <Input 
                v-model="tradeNo" 
                placeholder="请输入交易流水号"
                style="width: 252px"
            ></Input>
            <div class='m-search' @click="lowerSubmit">搜索</div>
         </div> 
    </div>
    <div class="u-table">
        <Table border  :columns="columns" :data="tableData" ref="table" stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page 
                    :total="totalCount" 
                    :page-size="pageSize"
                    @on-change="changePage" 
                    show-total 
                    show-elevator
                ></Page>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';

export default {
        components:{
            SectionTitle,
        },
        data () {
            return {
                tableData:[],
                totalCount:1,
                pageSize:15,
                params:{
                    page:1,
                    pageSize:15
                },
                tradeNo:'',
                columns: [
                    {
                        title: '交易流水号',
                        key: 'tradeNo',
                        align:'center',
                    },
                    {
                        title: '付款账户',
                        key: 'payAccount',
                        align:'center'
                        
                    },
                    {
                        title: '收款账户',
                        key: 'receiveAccount',
                        align:'center'
                    },
                    {
                        title: '回款金额（元）',
                        key: 'amount',
                        align:'center',
                        width:160,
                    },
                    
                    {
                        title: '回款方式',
                        key: 'payWay',
                        align:'center',
                        render(h, obj){
                            if(obj.row.payWay==='ALIAPPPAY'){
                                return '支付宝app';
                            }else if(obj.row.payWay==='ALIWEBPAY'){
                                return '支付宝网银';
                            }else if(obj.row.payWay==='WXPAY'){
                                return '微信';
                            }else if(obj.row.payWay==='BANKONLINE'){
                                return '网银';
                            }else if(obj.row.payWay==='BANKTRANSFER'){
                                return '银行转账';
                            }
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                            if(obj.row.payStatus==='WAIT'){
                                return '待支付';
                            }else if(obj.row.payStatus==='SUCCESS'){
                                return '支付成功';
                            }else if(obj.row.payStatus==='FAILED'){
                                return <span class="u-txt-red">支付失败</span>;
                            }
                        }
                    },
                    {
                        title: '处理结果',
                        key: 'dealed',
                        align:'center',
                        render(h, obj){
                            if(obj.row.dealed===true){
                                return '已处理';
                            }else if(obj.row.dealed===false){
                                return '待处理';
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.ctime));
                            return time;
                        }
                    },
                ]
                
            }
        },
        mounted:function(){
            this.getTableData(this.params);
        },
        methods:{
            onExport(){
                 console.log('导出')
            },
            getTableData(params){
                this.$http.get('get-payrecord-list', params, r => {
                    this.tableData=r.data.items;
                    this.totalCount=r.data.totalCount;
                }, e => {
                    console.log('error',e)
                })
            },
            lowerSubmit(){
                this.params.tradeNo=this.tradeNo;
                this.getTableData(this.params);
            },
            changePage(page){
               let Params={
                    page:page,
                    pageSize:this.pageSize
                }
                this.getTableData(Params);
            },
            


        }

    }
</script>