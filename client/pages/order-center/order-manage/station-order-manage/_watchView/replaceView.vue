<template>
   <div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			换租订单详情
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="客户名称：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="社区名称：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="销售人员：">
					{{basicInfo.salerName}}
				</LabelText>
				<LabelText label="创建时间：">
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="订单状态：">
					{{basicInfo.orderStatusName}}
				</LabelText>
				<LabelText label="生效时间：">
					{{(basicInfo.effectDate || '-')| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="租赁信息">
				<LabelText label="租赁开始日期：">
					{{basicInfo.startDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="租赁结束日期：">
					{{basicInfo.endDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="分期方式：">
					{{basicInfo.installmentTypeName}}
				</LabelText>
				<LabelText label="首付款日期：">
					{{basicInfo.firstPayTime| dateFormat('YYYY-MM-dd')}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="金额信息">
				<Table :columns="service" :data="serviceData"/>
				<LabelText label="服务费总计：" style="font-weight:bold;">
					{{basicInfo.seatRentAmount}}  {{capitalService}}
				</LabelText>
				<Table :columns="treatment" :data="treatmentData"/>
				<LabelText label="优惠总计：" style="font-weight:bold;">
					{{basicInfo.tactiscAmount}}  {{capitalTreatment}}
				</LabelText>
				<div>
					<LabelText label="服务费总额：" style="color:red;">
						{{basicInfo.rentAmount}}
					</LabelText>
					<LabelText label="履约保证金总额：" style="color:red;">
						{{basicInfo.depositAmount}}
					</LabelText>
				</div>
			</DetailStyle>
			<DetailStyle info="相关合同">
				<Table :columns="contract" :data="contractData"/>
			</DetailStyle>
			<DetailStyle info="分期计划">
				<Table :columns="stagesColumn" :data="installments"/>
				<div class="button-list">
					<div class="table-button" v-if="showButton == true && showAll == false" @click="showAllList">
						<span>展开</span>
						<img class="showAll" src="~assets/images/arrows.svg" />
						
					</div>
					<div class="table-button" v-if="showButton == true && showAll == true"  @click="notAllList">
						<span>收起</span>
						<img class="notAll" src="~assets/images/arrows.svg" />
					</div>
				</div>
			</DetailStyle>
			<DetailStyle info="相关规则">
				<div v-html="basicInfo.versionRemark" style="margin-left:12px"></div>
			</DetailStyle>
		</div>
   </div>	
</template>


<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
	name:'ReplaceView',
	head() {
        return {
            title:'换租订单详情'
        }
    },
	components:{
		DetailStyle,
		LabelText
	},
	data(){
		return{
			
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH('false');
	},

	methods:{
		

	}
}
</script>


<style lang="less" scoped>  

</style>