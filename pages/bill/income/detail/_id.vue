<style lang="less">
.g-income-detail{
	.m-detail-content{
		padding:30px 24px;
	}
}
</style>
<template>
<div class="g-income-detail">
	<sectionTitle label="收入详情"></sectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="收入编号：">
				{{basicInfo.id}}
			</labelText>	
			<labelText label="收入类型：">
				{{incomeType}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</labelText>
			<labelText label="含税收入：">
				{{basicInfo.amount}}
			</labelText>
			<labelText label="收入确认时间：">
				{{dealDate}}
			</labelText>
			<labelText label="操作人员：">
				{{basicInfo.creater}}
			</labelText>
			<labelText label="操作时间：">
				{{ctime}}
			</labelText>
		</DetailStyle>
	</div>
</div>
</template>
<script>
import axios from '~/plugins/http.js';
import DetailStyle from '~/components/detailStyle';
import labelText from '~/components/labelText';
import sectionTitle from '~/components/sectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		labelText,
		sectionTitle
	},
	data(){
		return{
			basicInfo:{}
		}
	},
	created:function(){
		this.getInfo();
	},
	methods:{
		getInfo(){
			var _this=this;
			let {params}=this.$route
			let from={
				id:params.id
			};
			axios.get('get-income-detail', from, r => {
				let data=r.data;
				this.basicInfo=data;
				this.dealDate=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.dealDate));
				this.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.ctime));
				if(data.incomeType=='MEETING'){
					this.incomeType='会议室账单';
				}else if (data.incomeType=='PRINT'){
					this.incomeType='打印服务账单';
				}else if (data.incomeType=='CONTRACT'){
					this.incomeType='工位服务订单';
				}
                
           	}, e => {
                console.log('error',e)
            })
		},
	}


}

	
</script>
