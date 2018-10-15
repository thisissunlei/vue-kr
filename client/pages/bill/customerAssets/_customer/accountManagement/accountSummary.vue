<template>
   <div class="account-summary">
        <div style="margin-top:30px;">
            <Table 
                :columns="allColumns" 
                :data="allData"
                border
            />
        </div>
        <div style="margin-top:20px;">
            <span class="table-name">押金汇总:</span>
            <Table 
                :columns="depositColumns" 
                :data="depositData"
                border
            />
        </div>
        <div style="margin-top:20px;">
            <span class="table-name">消费汇总:</span>
            <Table 
                :columns="consumeColumns" 
                :data="consumeData"
                border
            />
        </div>
    </div> 
</template>

<script>
import publicFn from './pageMerge.js';
import utils from '~/plugins/utils';
export default {
    data(){
        return {
            allColumns:[
                {
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',            
                },
                {
                    title: '余额',
                    key: 'balanceAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.balanceAmount?'¥'+utils.thousand(params.row.balanceAmount):'-';
                        return <span style="text-align:right;">{end}</span>;
                    }
                },
                {
                    title: '打款',
                    key: 'paymentAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.paymentAmount?'¥'+utils.thousand(params.row.paymentAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '退款',
                    key: 'refundAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.refundAmount?'¥'+utils.thousand(params.row.refundAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '消费',
                    key: 'comsumeAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.comsumeAmount?'¥'+utils.thousand(params.row.comsumeAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '押金',
                    key: 'depositAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.depositAmount?'¥'+utils.thousand(params.row.depositAmount):'-';
                        return <span >{end}</span>;
                    }
                }
            ],
            depositColumns:[
                {
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',            
                },
                {
                    title: '押金款项',
                    key: 'itemVOs',
                    align:'center',
                    render(tag, params){
                        return publicFn.mergeCell(h,params.row.itemVOs,'depositType')
                    }
                },
                {
                    title: '可用',
                    key: 'itemVOs',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        return publicFn.mergeCell(h,params.row.itemVOs,'freeDeposit','money')
                    }
                },
                {
                    title: '在押',
                    key: 'itemVOs',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        return publicFn.mergeCell(h,params.row.itemVOs,'deposit','money')
                    }
                },
                {
                    title: '冻结',
                    key: 'itemVOs',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        return publicFn.mergeCell(h,params.row.itemVOs,'lockDeposit','money')
                    }
                },
                {
                    title: '转移中',
                    key: 'itemVOs',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        return publicFn.mergeCell(h,params.row.itemVOs,'transferDeposit','money')
                    }
                }
            ],
            consumeColumns:[
                {
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',            
                },
                {
                    title: '工位服务费',
                    className:'cell-right',
                    key: 'rentAmount',
                    align:'center',
                    render(tag, params){
                        var end=params.row.rentAmount?'¥'+utils.thousand(params.row.rentAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '会议室服务费',
                    key: 'mettingAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.mettingAmount?'¥'+utils.thousand(params.row.mettingAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '打印服务费',
                    key: 'printAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.printAmount?'¥'+utils.thousand(params.row.printAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '注册服务费',
                    key: 'registerAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.registerAmount?'¥'+utils.thousand(params.row.registerAmount):'-';
                        return <span >{end}</span>;
                    }
                },
                {
                    title: '其他',
                    key: 'otherAmount',
                    className:'cell-right',
                    align:'center',
                    render(tag, params){
                        var end=params.row.otherAmount?'¥'+utils.thousand(params.row.otherAmount):'-';
                        return <span >{end}</span>;
                    }
                }
            ],
            allData:[],
            depositData:[],
            consumeData:[]
        }
    },
    mounted(){
        this.getAllList();
        this.getDepositList();
        this.getConsumeList();
    },
    methods:{
        getAllList(){
            var params={
                customerId:this.$route.params.customer
            }
            this.$http.get('account-all-summary',params).then((response)=>{
                this.allData=response.data;
            }).catch((error)=>{
                 this.$Notice.error({
                    title:error.message
                }); 
            })
        },
        getDepositList(){
            var params={
                customerId:this.$route.params.customer
            }
            this.$http.get('account-deposit-summary', params).then((response)=>{
                this.depositData=response.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                }); 
            })
        },
        getConsumeList(){
            var params={
                customerId:this.$route.params.customer
            }
            this.$http.get('account-consume-summary', params).then((response)=>{
                this.consumeData=response.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                }); 
            })
        }
    }
}
</script>

<style lang="less">
.account-summary{
  padding-right:20px;
  .cell-right{
      .ivu-table-cell{
          text-align: right;
      }
  }
  .current-range{
    .ivu-table-cell{ 
        .ivu-tooltip{
            width:100%;
            .ivu-tooltip-rel{
                width:100%;
                .row-current-more{
                    padding: 15px 0 10px 0;
                }
                .noBorder{
                    border-bottom:none;
                }
            }
        }
    }
    .ivu-table-cell > div{
            border-bottom:solid 1px #e9eaec;
            &:last-child{
                border-bottom:none;
            }
        }
    .current-more-task{
        width:100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .table-null{
        line-height: 47px;
    }
  }
  .table-name{
      font-size:14px;
      font-weight:bold;
      margin-bottom:10px;
      display:inline-block;
  }
}
</style>


