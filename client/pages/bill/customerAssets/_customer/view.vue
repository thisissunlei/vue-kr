

<template>	
    <div class="customer-assets-detail">
		 <SectionTitle title="客户账户详情" type="detailTitle" />

		<div class="content">
			<LabelText label="客户名称：">
				456
			</LabelText>
			<LabelText label="客户名称：">
				456
			</LabelText>

			<div>
				<div class="formula">
					<div class="text">账户余额</div>
					<div class="money">￥1,000.00</div>
				</div>
				<span class="symbol">-</span>
			</div>
			<div style="margin-top:30px;">
				<Tabs type="card">
					<TabPane label="账户余额">标签一的内容</TabPane>
					<TabPane label="客户打款">标签二的内容</TabPane>
					<TabPane label="客户消费">标签三的内容</TabPane>
					<TabPane label="客户退款">标签三的内容</TabPane>
				</Tabs>
			</div>
			
		</div>
		
    </div>
	

</template>

<script>
	import SectionTitle from '~/components/SectionTitle';
	import LabelText from '~/components/LabelText'; 
	export default {
		name:'customerAssetsDetail',
		components:{
			SectionTitle,
			LabelText
		},
		data (){
			return{
				
			}
		},
		methods:{

		},
		mounted(){
			GLOBALSIDESWITCH('false');
		}
	
	}
</script>
<style lang="less" scoped>
    .customer-assets-detail{
		.content{
			padding: 20px;
			.formula{
				text-align: center;
				width: 120px;
				height: 60px;
				border: 1px solid #333;
				position: relative;
				display: inline-block;
				.text{
					position: absolute;
					top: 10px;
					width: 100%;
				}
				.money{
					position: absolute;
					bottom: 10px;
					width: 100%;
				}				
			}
			.symbol{
				display: inline-block;
				padding: 0 15px;
				vertical-align:top;
				line-height: 60px;
			}
		}
    }
</style>