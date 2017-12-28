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
                v-model="params.bizTradeNo"
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
                    :current="page"
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
import utils from '~/plugins/utils';

export default {
        components:{
            SectionTitle,
        },
        data () {
            return {
                tableData:[],
                totalCount:1,
                pageSize:15,
                page:1,
                params:{
                    page:1,
                    pageSize:15,
                    bizTradeNo :'',
                },
               
                columns: [
                    {
                        title: '交易流水号',
                        key: 'bizTradeNo',
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
                        title: '支付方式',
                        key: 'payWay',
                        align:'center',
                        render(h, obj){
                            let payWay={
                                'ALIAPPPAY':'支付宝app',
                                'ALIWEBPAY':'支付宝网银',
                                'WXPAY':'微信',
                                'BANKONLINE':'网银',
                                'BANKTRANSFER':'银行转账',
                            }
                            return payWay[obj.row.payWay];
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.payStatus){
                                case 'WAIT':
                                    return '待支付';
                                break;
                                case 'SUCCESS':
                                    return '支付成功';
                                break;
                                case 'FAILED':
                                    return <span class="u-txt-red">支付失败</span>;
                                break;
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
                            let time = dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.ctime));
                            return time;
                        }
                    },
                ]

            }
        },
        created(){
             this.getTableData(this.$route.query);
             this.params=this.$route.query;
        },
        methods:{
            onExport(){

            },
            getTableData(params){

                this.$http.get('get-payrecord-list', params, res => {
                    this.tableData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }, err => {
					this.$Notice.error({
						title:err.message
					});
        		})

            },
            lowerSubmit(){
                this.page=1;
                this.params.page=1;
                utils.addParams(this.params);

            },
            changePage(page){

               this.params.page=page;
               this.page=page;
               this.getTableData(this.params);

            },
            
        }

    }
</script>
