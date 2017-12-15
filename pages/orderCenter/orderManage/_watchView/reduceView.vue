<style lang="less"> 
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
		}
	}
</style>
<template>
<div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"></span>
		减租订单详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="客户名称：">
				{{basicInfo.customerName}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="操作人员：">
				{{basicInfo.operationName}}
			</labelText>
			<labelText label="操作时间：">
				{{ctime}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="减租信息">
			<labelText label="减租开始时间：">
				{{startDate}}
			</labelText>
            <labelText label="减租服务费：">
				{{basicInfo.rentAmount}}
			</labelText>
            <div class="m-reduce-room">
				<div>减租工位/房间：</div>
				<div style='width:50%;'>
					<span v-for="item in reduceStation" :key="item.id" 
					style='padding-right:20px;padding-top:15px;display:inline-block;'>
						{{ item.seatName}}{{'('+item.type+')'}}
					</span>
				</div>
			</div>
		</DetailStyle>
		<DetailStyle info="相关合同">
			<Table :columns="contract" :data="contractData"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>

import axios from 'kr/axios';
import DetailStyle from '~/components/detailStyle';
import labelText from '~/components/labelText';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		labelText
	},
	head() {
        return {
            title: '减租详情'
        }
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
		let {params}=this.$route;
		let from={
			id:params.watchView
		};
		var _this=this;
	     this.$http.get('reduce-bill-detail', from, r => {
				   _this.basicInfo=r.data;


				   _this.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(r.data.ctime));
				   _this.startDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.startDate));
				   r.data.seatReduceDetailVo&&r.data.seatReduceDetailVo.map((item,index)=>{
					    var stationType='';
					    if(item.seatType=='OPEN'){
							stationType='工位';
						}else if(item.seatType=='SPACE'){
							stationType='房间';
						}
						item.type=stationType;
				   })
				   _this.reduceStation=r.data.seatReduceDetailVo||[];
				   _this.contractData=r.data.orderContractInfo[0].contractNum?r.data.orderContractInfo:[];
           	}, e => {
                _this.$Message.info(e);
        })
	}
}
</script>