<template>
	<div class="g-data-sync-view">
		<div class="m-detail-header">
			<span class="u-border-left" /> 数据同步详情
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="同步名称：">
					{{detailData.name}}
				</LabelText>
				<LabelText label="批次名称：">
					{{detailData.id}}
				</LabelText>
				<LabelText label="同步数据数：">
					{{detailData.syncDataCount}}
				</LabelText>
				<LabelText label="成功结果数：">
					{{detailData.successDataCount}}
				</LabelText>
				<LabelText label="同步时间：">
					{{detailData.createTime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="操作人：">
					{{detailData.operatorName}}
				</LabelText>
				<LabelText label="同步方式：">
					{{detailData.syncTypeName || '-'}}
				</LabelText>
				<LabelText label="同步状态：" >
					{{detailData.syncStatusName|| '-'}}
				</LabelText>
				<LabelText label="同步数据类型：" >
					{{detailData.syncDataTypeName|| '-'}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="过滤条件">
				<LabelText label="开始时间：">
					{{detailData.startTime| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="结束时间：">
					{{detailData.endTime| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="所选客户：">
					<div style="display:inline-block;vertical-align:top;margin-top:-5px;">
						<span 
							style="display:inline-block;padding:5px;"
							v-for="(item,index) in detailData.customerNames"
							:key="index"
						>{{item}}</span>
					</div>
					
				</LabelText>
				<LabelText label="所选社区：">
					<div style="display:inline-block;vertical-align:top;margin-top:-5px;">
						<span 
							style="display:inline-block;padding: 5px;"
							v-for="(item,index) in detailData.communityNames"
							:key="index"
						>{{item}}</span>
					</div>
					
					
				</LabelText>
			</DetailStyle>
			<!-- <DetailStyle info="传输结果">
				
				<LabelText label="重试次数：" style="font-weight:bold;">
					{{detailData.tryCount}}
				</LabelText>
				
				<LabelText label="最后重试时间：" style="font-weight:bold;">
					{{detailData.lastSyncTime| dateFormat('YYYY-MM-dd')}}
				</LabelText>
                <LabelText label="重试操作人：" style="font-weight:bold;">
					{{detailData.lastSyncUserName}}
				</LabelText>
			</DetailStyle> -->
			<Tabs value="original">
                <TabPane label="原始数据" name="original">
					<Table 
						border 
						:columns="type=='INCOME'?originalAccountsCol:originalReceivableCol" 
						:data="originalData"></Table>
					
					<div  style="margin: 10px;overflow: hidden;">
						
						<div style="float: right;">
						
							<Page 
								:total="this.originalParams.total" 
								:page-size="this.originalParams.pageSize" 
								show-elevator 
								show-total 
								@on-change="originalChange"
							></Page>
						</div>
					</div>
				</TabPane>
                <TabPane label="传输数据" name="transmission">
					 <Table 
					 	border :columns="type!='INCOME'?transmissionReceivableCol:transmissionAccountsCol" 
					 	:data="transmissionData"></Table>
					 <div  style="margin: 10px;overflow: hidden;">
						
						<div style="float: right;">
						
							<Page 
								:total="this.transmissionParams.total" 
								:page-size="this.transmissionParams.pageSize" 
								show-elevator 
								show-total 
								@on-change="transmissionChange"
							></Page>
						</div>
					</div>
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
import fn from './pubilcFn';

export default {
	name: 'JoinView',
	head() {
		return {
			title: '查看数据详情'
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
			//原始应收
			originalAccountsCol:fn.originalAccountsCol.call(this),
			//原始回款
			originalReceivableCol:fn.originalReceivableCol.call(this),
			//传输应收
			transmissionAccountsCol:fn.transmissionAccountsCol.call(this),
			//传输回款
			transmissionReceivableCol:fn.transmissionReceivableCol.call(this),
			//原始数据
			originalData:[],
			
			//传输数据
			transmissionData:[],
			/**
			 * INCOME 表示应收
			 * PAYMENT 表示回款
			*/
			type:this.$route.query.type||'INCOME',
			syncDataId:this.$route.query.syncDataId||0,
			//原始数据参数
			originalParams:{
				page:1,
				pageSize:20,
				syncDataId:this.$route.query.syncDataId||0,
				total:0,
			},
			transmissionParams:{
				page:1,
				pageSize:20,
				syncDataId:this.$route.query.syncDataId||0,
				total:0,
			}

		}
	},

	mounted: function () {
		GLOBALSIDESWITCH('false');
		// GLOBALHEADERSET('订单合同')
		this.getDetailData();
		this.getData();
	},
	

	methods: {
		getData(){
			if(this.type=='INCOME'){
				this.getOriginalAccountsData();
				this.getTransmissionAccountsData();
			}else{
				this.getOriginalReceivableData();
				this.getTransmissionReceivableData();
			}
		
		},

		//获取销售机会列表
		getDetailData() {
			this.$http.get('getKingDeeDetail', {syncDataId:this.syncDataId}, r => {
				
				this.detailData = Object.assign({},r.data);
				
			}, error => {
				this.$Notice.error({
					title: error.message
				});
			}
			)
		},
		//原始数据change
		originalChange(e){
			this.originalParams.page = e;
			if(this.type == 'INCOME'){
				this.getOriginalAccountsData();
			}else{
				this.getOriginalReceivableData();
			}

		},
		transmissionChange(e){
			this.transmissionParams.page = e;
			if(this.type == 'INCOME'){
				this.getTransmissionAccountsData();
			}else{
				this.getTransmissionReceivableData();
			}
		},
		//获取原始应收
		getOriginalAccountsData(){
			let params = Object.assign({},this.originalParams);
			this.$http.get('getOriginalAccountsData', params, r => {
				
				this.originalData = [].concat(r.data.items);
				this.originalParams.page = r.data.page;
				this.originalParams.total = r.data.total;
				
			}, error => {
				this.$Notice.error({
					title: error.message
				});
			})
		},
		//获取原始传输
		getOriginalReceivableData(){
			let params = Object.assign({},this.originalParams);
			this.$http.get('getOriginalReceivableData', params, r => {
				this.originalData = [].concat(r.data.items);
				this.originalParams.page = r.data.page;
				this.originalParams.total = r.data.total;
			}, error => {
				this.$Notice.error({
					title: error.message
				});
			})
		},
		//获取传输应收
		getTransmissionAccountsData(){
			let params = Object.assign({},this.transmissionParams);
			this.$http.get('getTransmissionAccountsData', params, r => {
				this.transmissionData = [].concat(r.data.items);
				this.transmissionParams.page = r.data.page;
				this.transmissionParams.total = r.data.total;
			}, error => {
				this.$Notice.error({
					title: error.message
				});
			})
		},
		//获取传输回款
		getTransmissionReceivableData(){
			let params = Object.assign({},this.transmissionParams);
			this.$http.get('getTransmissionReceivableData', params, r => {
				this.transmissionData = [].concat(r.data.items);
				this.transmissionParams.page = r.data.page;
				this.transmissionParams.total = r.data.total;
			}, error => {
				this.$Notice.error({
					title: error.message
				});
			})
		}

	
		

	}
}
</script>


<style lang="less" scoped>
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
	.ui-text{
		max-width: 80%;
    	// vertical-align: top;
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
		.ui-detail-layout:nth-of-type(1),.ui-detail-layout:nth-of-type(2){
			padding-bottom:50px;
			margin-bottom: 20px;
			border-bottom: 1px solid #e8e9e9;
			
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
