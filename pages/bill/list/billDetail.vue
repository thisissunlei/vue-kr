<style lang="less">
.g-bill-detail{
		.m-detail-content{
			padding:30px 24px;
		}

	}
</style>
<template>
<div class="g-bill-detail">
	<sectionTitle label="账单详情"></sectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="账单编号：">
				{{basicInfo.nubmer}}
			</labelText>	
			<labelText label="账单类型：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="客户名称：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="付款截止日期：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="账单状态：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="账单总金额：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="实际付款金额：">
				{{basicInfo.nubmer}}
			</labelText>
			<labelText label="账单生成时间：">
				{{basicInfo.nubmer}}
			</labelText>
		</DetailStyle>
		<DetailStyle info="费用明细">
			<Table :columns="columns" :data="data1"></Table>
		</DetailStyle>	

	</div>
</div>
</template>
<script>
import axios from '~/plugins/http.js';
import DetailStyle from '~/components/detailStyle';
import labelText from '~/components/labelText';
import sectionTitle from '~/components/sectionTitle.vue';
export default {
	components:{
		DetailStyle,
		labelText,
		sectionTitle
	},
	data(){
		return{
			columns:[
				{
				 title: '订单编号',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '商品名称',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '备注',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '金额',
                 key: 'number',
                 align:'center'	
				}
			]
		}
	},
	created:function(){
		this.basicInfo={
			nubmer:"02201712010001"
		}
		
		
	}


}

	
</script>
