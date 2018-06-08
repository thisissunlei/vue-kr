<template>
   <div class="g-replace-order-detail">
		<SectionTitle title="发票详情" ></SectionTitle>
		<div class="create-order">
            <Card id="step-one">
                <p slot="title" class="card-title">
                   发票信息
                </p>
                <LabelText :inline="inline" label="申请编号：">
                    {{formItem.applyNum}}
                </LabelText>
                <LabelText  :inline="inline" label="发票规格：">
                    {{formItem.invoiceType}}
                </LabelText>
                <LabelText :inline="inline" label="需退换发票金额："  v-if="invoiceStatus == 'TO_RETURN'">
                    {{formItem.needRefund}}
                </LabelText>
                <LabelText :inline="inline" label="实际退换发票金额：" v-if="invoiceStatus == 'TO_RETURN'">
                    {{formItem.refund}}
                </LabelText>
                <LabelText :inline="inline" label="发票内容：" v-if="invoiceStatus == 'TO_RETURN'">
                    {{formItem.invoiceContent}}
                </LabelText>
                <LabelText :inline="inline" label="相关账单：" v-if="invoiceStatus == 'TO_RETURN'">
                    <div>343333</div>
                            <div>343333</div>
                            <div>343333</div>
                            <div>343333</div>
                </LabelText>
                <LabelText :inline="inline" label="发票金额："  v-if="invoiceStatus != 'TO_RETURN'">
                    {{formItem.amount}}
                </LabelText>
                <LabelText :inline="inline" label="发票张数："  v-if="invoiceStatus != 'TO_RETURN'">
                    {{formItem.invoiceCount}}
                </LabelText>
                <LabelText :inline="inline" label="申请人员："  v-if="invoiceStatus != 'TO_RETURN'">
                    {{formItem.applyUserName}}
                </LabelText>
                <LabelText :inline="inline" label="申请时间："  v-if="invoiceStatus != 'TO_RETURN'">
                    {{formItem.ctime  |dateFormat('YYYY-MM-dd')}}
                </LabelText>
                <LabelText :inline="inline" label="备注信息："  v-if="invoiceStatus != 'TO_RETURN'">
                    {{formItem.remark}}
                </LabelText>



            </Card>
            <span class="space"></span>
            <Card id="step-two" v-if="invoiceStatus != 'TO_RETURN'">
                <p slot="title" class="card-title">
                   明细信息
                </p>
                <span class="card-header"></span>
                <Table :columns="detailInfo" style="margin-bottom:20px" :data="formItem.invoiceDetailList"></Table>

            </Card>
            <span class="space"></span>

            <Card id="step-three">
                <p slot="title" class="card-title">
                    开票信息
                </p>
                <span class="card-header"></span>

                <LabelText :inline="inline" label="发票抬头：">
                    {{formItem.invoiceTitle}}
                </LabelText>
                <LabelText :inline="inline" label="纳税人识别码：">
                    {{formItem.taxpayerNumber}}
                </LabelText>
                <LabelText :inline="inline" label="注册地址：">
                    {{formItem.registerAddress}}
                </LabelText>
                <LabelText :inline="inline" label="注册电话：">
                    {{formItem.registerPhone}}
                </LabelText>
                <LabelText :inline="inline" label="开户银行：">
                    {{formItem.bank}}
                </LabelText>
                <LabelText :inline="inline" label="银行账户：">
                    {{formItem.bankAccount}}
                </LabelText>
            </Card>
            <span class="space"></span>
            <Card id="step-four">
                <p slot="title" class="card-title">
                    我司信息
                </p>
                <span class="card-header"></span>

                <LabelText  :inline="inline"label="社区名称：">
                    {{formItem.communityName}}
                </LabelText>
                <LabelText  :inline="inline"label="公司名称">
                    {{formItem.corporationName}}
                </LabelText>
            </Card>
            <span class="space" ></span>
            <Card id="step-four" v-if="invoiceStatus != 'TO_RETURN'">
                <p slot="title" class="card-title">
                    领取方式
                </p>
                <span class="card-header"></span>
                <LabelText :inline="inline" label="领取方式：">
                    {{formItem.receiveMethodName}}
                </LabelText>
                <LabelText :inline="inline" label="收件人员：">
                    {{formItem.invoicePostVO.recipient}}
                </LabelText>
                <LabelText :inline="inline" label="手机号码：">
                    {{formItem.invoicePostVO.phone}}
                </LabelText>
                <LabelText :inline="inline" label="收件地址：">
                    {{formItem.invoicePostVO.recipientAddress}}
                </LabelText>
                
            </Card>
            <span class="space" ></span>
            <Card id="step-four" v-if="invoiceStatus != 'TO_RETURN'">
                <p slot="title" class="card-title">
                    账单信息
                </p>
                <span class="card-header"></span>
                <Table :columns="billInfo" style="margin-bottom:20px" :data="formItem.amountDetailList" ></Table>
                
            </Card>
            <span class="space"></span>
            <Card id="step-four" v-if="invoiceStatus != 'TO_RETURN'">
                <p slot="title" class="card-title">
                    其他信息
                </p>
                <span class="card-header"></span>

                <LabelText  :inline="inline"label="开票人员：">
                    {{formItem.ticketer}}
                </LabelText>
                <LabelText  :inline="inline"label="开票时间：">
                    {{formItem.ticketTime   |dateFormat('YYYY-MM-dd')}}
                </LabelText>
            </Card>
        </div>
   </div>	
</template>

<script>

    import SectionTitle from '~/components/SectionTitle.vue'
    import LabelText from '~/components/LabelText';
    import dateUtils from 'vue-dateutils';
    import Buttons from '~/components/Buttons';
    import utils from '~/plugins/utils';

export default {
    head() {
        return {
            title:'发票详情'
        }
    },
    props:{
    },
    components:{
        SectionTitle,
        LabelText
    },
    data(){
        return {
            invoiceStatus:'normal',
            inline:true,
            invoicePostVO:[],
            billInfo:[
                {
                    title: '账单编号',
                    key: 'billNum',
                    align:'center'
                },
                {
                    title: '账单类型',
                    key: 'bizType',
                    align:'center'
                },
                {
                    title: '可开票金额',
                    key: 'total',
                    align:'right'
                },
            ],
            detailInfo: [
                {
                    title: '发票内容',
                    key: 'contentTypeName',
                    align:'center'
                },
                {
                    title: '开票金额',
                    key: 'amount',
                    align:'center'
                },
                {
                    title: '税率',
                    key: 'taxRate',
                    align:'center'
                },
                {
                    title: '税额',
                    key: 'taxRate',
                    align:'center'
                },
                {
                    title: '不含税额',
                    key: 'taxRate',
                    align:'center'
                },
            ],
            formItem:{}
        }
    },
    
    mounted:function(){
        GLOBALSIDESWITCH('false');
        this.getDetail()
    },

    methods:{
        getDetail(){
            let view = this.$route.params.view;
            this.$http.get('csr-invoice-invoiceDetail', {invoiceId:view}).then( r => {
                 this.formItem = r.data;
                 this.invoiceStatus = r.data.invoiceStatus;
            }).catch( e => {
                this.$Notice.error({
                    title:e.message
                });

            })
        }
    }
}
</script>

<style lang='less'>
    .create-order{
        padding:30px 20px;
    }
    .space{
        display: inline-block;
        height: 30px
    }
    .card-header{
            display: inline-block;
            width: 100%;
            height:10px;
        }
    .create-order .ivu-card-head{
        background-color: #f7f7f7;
    }
</style>