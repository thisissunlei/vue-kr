<style lang="less">

.g-income-detail{
	.m-detail-content{
		padding:30px 24px;
	}
}

</style>

<template>

<div class="g-income-detail">
	<SectionTitle label="收入详情"></SectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="收入编号：">
				{{basicInfo.id}}
			</LabelText>
			<LabelText label="收入类型：">
				{{incomeType}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
			<LabelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</LabelText>
			<LabelText label="含税收入：">
				￥{{basicInfo.amount}}
			</LabelText>
			<LabelText label="收入确认时间：">
				{{dealDate}}
			</LabelText>
			<LabelText label="操作人员：">
				{{basicInfo.createrName}}
			</LabelText>
			<LabelText label="操作时间：">
				{{ctime}}
			</LabelText>
		</DetailStyle>
	</div>
</div>

</template>

<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import SectionTitle from '~/components/SectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		LabelText,
		SectionTitle
	},
	data(){
		return{
			basicInfo:{},
			incomeType:[],
			dealDate:"",
			ctime:'',
		}
	},
	mounted:function(){
		this.getInfo();
		GLOBALSIDESWITCH("false")
	},
	methods:{
	
		getInfo(){
		
			var _this=this;
			
			let {params}=this.$route;
			
			let from={
				id:params.id
			};

			var incomeType = {
					'MEETING':'会议室账单',
					'PRINT':'打印服务账单',
					'CONTRACT':'工位服务订单'
			}
			
			this.$http.get('get-income-detail', from, res => {
			
				let data = res.data;
				this.basicInfo = data;
				this.dealDate = dateUtils.dateToStr("YYYY-MM-DD",new Date(data.dealDate));
				this.ctime = dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.ctime));

				this.incomeType = incomeType[data.incomeType];

				}, err => {
					this.$Notice.error({
						title:err.message
					});
        		});
				

		},
	},




}


</script>
