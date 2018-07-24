<template>
	<div class="g-data-sync-view">
		<div class="m-detail-header">
			<span class="u-border-left" /> 数据同步详情
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="同步名称：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="批次名称：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="同步数据数：">
					{{basicInfo.salerName}}
				</LabelText>
				<LabelText label="同步时间：">
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="操作人：">
					{{basicInfo.orderStatusName}}
				</LabelText>
				<LabelText label="同步方式：">
					{{(basicInfo.effectDate || '-')| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="同步状态：" v-show='opportunityStr'>
					{{opportunityStr}}
				</LabelText>
				<LabelText label="同步数据类型：" v-show='nullifyReason'>
					{{nullifyReason}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="过滤条件">
				<LabelText label="开始时间：">
					{{basicInfo.startDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="结束时间：">
					{{basicInfo.endDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="所选客户：">
					{{basicInfo.installmentTypeName}}
				</LabelText>
				<LabelText label="所选社区：">
					{{basicInfo.firstPayTime}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="传输结果">
				
				<LabelText label="重试次数：" style="font-weight:bold;">
					{{basicInfo.seatRentAmount}} {{capitalService}}
				</LabelText>
				
				<LabelText label="最后重试时间：" style="font-weight:bold;">
					{{basicInfo.tactiscAmount}} {{capitalTreatment}}
				</LabelText>
                <LabelText label="重试操作人：" style="font-weight:bold;">
					{{basicInfo.tactiscAmount}} {{capitalTreatment}}
				</LabelText>
			</DetailStyle>
			<Tabs value="name1">
                <TabPane label="原始数据" name="original">
					 <Table border :columns="originalCol" :data="originalData"></Table>
				</TabPane>
                <TabPane label="传输数据" name="transmission">
					 <Table border :columns="transmissionCol" :data="transmissionData"></Table>
				</TabPane>
                
            </Tabs>
		</div>
	</div>
</template>


<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
	name: 'JoinView',
	head() {
		return {
			title: '工位订单详情'
		}
	},
	components: {
		DetailStyle,
		LabelText
	},
	data() {
		return {
			detailData:{
				
			},
			originalCol:[ 
				{
					title: 'Name',
					key: 'name'
				},

			],
			originalData:[],
			transmissionCol:[
				{
					title: 'Name',
					key: 'name'
				},
			],
			transmissionData:[]

		}
	},

	mounted: function () {
		GLOBALSIDESWITCH('false');
		// GLOBALHEADERSET('订单合同')
		// this.getDetailData();
	},

	methods: {

		//获取销售机会列表
		getSalerChanceList(parms) {
			let list = [];
			let _this = this;
			this.$http.get('get-salechance', parms, r => {
				r.data.items.data.map(item => {
					list.push({
						label: item.name,
						value: item.id
					})
				})
				let obj = list.find(item => item.value == this.basicInfo.opportunityId)
				this.opportunityStr = obj.label || '';
			}, error => {
				this.$Notice.error({
					title: error.message
				});
			}
			)
		},

		getDetailData() {
			let { params } = this.$route;
			let from = {
				id: params.watchView
			};
			this.$http.get('join-bill-detail', from).then((response) => {
				this.basicInfo = response.data;
				let pars = {
					customerId: this.basicInfo.customerId,
					communityId: this.basicInfo.communityId,
					receiveId: this.basicInfo.salerId,
					orderId:this.basicInfo.id
				}
				this.getSalerChanceList(pars);
				if (response.data.installments.length > 10) {
					this.showButton = true;
					this.showAll = false;
					this.installments = response.data.installments.slice(0, 10)
				} else {
					this.installments = response.data.installments || [];
				}
				this.installmentAll = response.data.installments || [];
				this.nullifyReason = response.data.invalidString;
				this.nullifyRemark = response.data.remark;
				this.capitalTreatment = response.data.tactiscAmount ? utils.smalltoBIG(response.data.tactiscAmount) : '';
				this.capitalService = response.data.seatRentAmount ? utils.smalltoBIG(response.data.seatRentAmount) : '';
				this.serviceData = response.data.orderSeatDetailVo || [];
				this.treatmentData = response.data.contractTactics || [];
				this.contractData = response.data.orderContractInfo ? response.data.orderContractInfo : [];
			}).catch((error) => {
				this.$Notice.error({
					title: error.message
				});
			})
		},
		notAllList() {
			let list = this.installmentAll
			this.showAll = false;
			this.installments = list.slice(0, 10)
		},
		showAllList() {
			let list = this.installmentAll
			this.showAll = true;
			this.installments = list;
		},

	}
}
</script>


<style lang="less" >
.g-data-sync-view {
    // margin:-10px;
    .m-detail-header {
        height: 50px;
        border-bottom: 1px solid #e8e9e9;
        line-height: 50px;
        font-size: 16px;
        color: #666666;
        .u-border-left {
            width: 0;
            height: 24px;
            border: 2px solid #499df1;
            margin-right: 20px;
        }
	}
	.ivu-tabs-nav .ivu-tabs-tab{
		width:50%;
		margin-right:0px;
		text-align:center;
	}
	.ivu-tabs-nav{
		width:100%;
	}
    .m-detail-content {
        padding: 30px 24px;
        .ivu-table-wrapper {
            margin-bottom: 30px;
        }
    }
    .table-button {
        text-align: center;
        cursor: pointer;
        color: #499df1;
        display: inline-block;
        transition: all 0.5s;
        & > span {
            font-size: 16px;
            padding-bottom: 5px;
            padding-top: 10px;
            display: inline-block;
        }
    }
    .button-list {
        text-align: center;
    }
    .notAll {
        display: block;
        margin: 0 auto;
        width: 16px;
        height: 16px;
        transform: rotate(180deg);
        vertical-align: middle;
    }
    .showAll {
        display: block;
        margin: 0 auto;
        width: 16px;
        height: 16px;

        vertical-align: middle;
    }
}
</style>
