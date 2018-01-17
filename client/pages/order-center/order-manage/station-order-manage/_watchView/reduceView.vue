<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			减租订单详情
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="客户名称：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="社区名称：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="操作人员：">
					{{basicInfo.operationName}}
				</LabelText>
				<LabelText label="操作时间：">
					{{ctime}}
				</LabelText>
			</DetailStyle>

			<DetailStyle info="减租信息">
				<LabelText label="减租开始时间：">
					{{startDate}}
				</LabelText>
				<LabelText label="减租服务费：">
					{{basicInfo.rentAmount}}
				</LabelText>
				<div class="m-reduce-room">
					<div>减租工位/房间：</div>
					<div style="width:50%;">
						<ul 
						  class="room-list"
						>
							<li 
							  v-for="item in reduceStation" 
							  :key="item.id"
							  style="margin:15px 0;" 
							>
							   <span style="padding-right:20px;">{{ item.seatName}}{{'('+item.type+')'}}</span>
							   <span style="padding-right:20px;">{{ item.startDate}}</span>
							   <span>{{ item.endDate}}</span>
							</li>
						</ul>
					</div>
				</div>
			</DetailStyle>

			<DetailStyle info="相关合同">
				<Table :columns="contract" :data="contractData"/>
			</DetailStyle>
		</div>
	</div>	
</template>


<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import dateUtils from 'vue-dateutils';

export default {
	name:'ReduceView',
	head() {
        return {
            title: '减租详情'
        }
    },
	components:{
		DetailStyle,
		LabelText
	},
	data(){
		return{
			basicInfo:{},
			ctime:'',
			startDate:'',
			reduceStation:[],
            contract:[
               {
				 title: '合同编号',
                 key: 'contractNum',
                 align:'center'	
				},
				{
				 title: '合同金额',
                 key: 'rentAmount',
                 align:'center'	
				},
				{
				 title: '状态',
                 key: 'orderStatusTypeName',
                 align:'center'	
				}  
			],
			contractData:[]
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},

	methods:{
		getDetailData(){
			let {params}=this.$route;
			let from={
				id:params.watchView
			};
			this.$http.get('reduce-bill-detail', from).then((response)=>{  
					this.basicInfo=response.data;


					this.ctime=response.data.ctime?dateUtils.dateToStr('YYYY-MM-DD HH:mm:SS',new Date(response.data.ctime)):'';
					this.startDate=response.data.startDate?dateUtils.dateToStr('YYYY-MM-DD',new Date(response.data.startDate)):'';
					response.data.orderSeatDetailVo&&response.data.orderSeatDetailVo.map((item,index)=>{
							item.startDate=item.startDate?dateUtils.dateToStr('YYYY-MM-DD',new Date(item.startDate)):'';
							item.endDate=item.endDate?dateUtils.dateToStr('YYYY-MM-DD',new Date(item.endDate)):'';
							var stationType='';
							if(item.seatType=='OPEN'){
								stationType='工位';
							}else if(item.seatType=='SPACE'){
								stationType='房间';
							}
							item.type=stationType;
					})
					this.reduceStation=response.data.orderSeatDetailVo||[];
					this.contractData=response.data.orderContractInfo?response.data.orderContractInfo:[];
				}).catch((error)=>{
					this.$Notice.error({
						title:error.message
					});
			})
		}
	}
}
</script>


<style lang="less" scoped> 
   .g-order-detail{
		margin:-10px;
		.m-detail-header{
			height:50px;
			border-bottom: 1px solid #E8E9E9;
			line-height: 50px;
			font-size: 16px;
			color: #666666;
			.u-border-left{
				width:0;
				height:24px;
				border:2px solid  #499DF1;
				margin-right:20px;
			}
		}
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.m-reduce-room{
			padding-left:15px;
			margin-bottom:20px;
			.room-list{
				padding-right:20px;
				padding-top:15px;
				display:inline-block;

			}
		}
	}
</style>