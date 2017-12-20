<template>
<div class="g-setting-detail">
	<SectionTitle label="企业管理员详情"></SectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="企业名称：">
				{{basicInfo.id}}
			</LabelText>	
			<LabelText label="已入驻社区：">
				{{incomeType}}
			</LabelText>
			<LabelText label="入驻状态：">
				{{basicInfo.communityName}}
			</LabelText>
		</DetailStyle>
        <DetailStyle info="员工列表">
            <Table border :columns="list" :data="listInfo"></Table>
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
			incomeType:null,
			dealDate:"",
            ctime:'',
            listInfo:[],
			list:[
				{
				 title: '姓名',
                 key: 'orderNo',
				 align:'center',
                },
                {
				 title: '联系电话',
                 key: 'orderNo',
				 align:'center',
                },
                {
				 title: '邮箱',
                 key: 'orderNo',
				 align:'center',
                },
                {
				 title: `管理员(${this.num})`,
                 key: 'orderNo',
				 align:'center',
				},
			]
		}
	},
	mounted:function(){
        this.getInfo();
        this.num=0;
		GLOBALSIDESWITCH("false")
	},
	methods:{
		getInfo(){
			var _this=this;
			let {params}=this.$route
			let from={
				id:params.id
			};
			this.$http.get('get-income-detail', from, r => {
				let data=r.data;
				this.basicInfo=data;
				this.dealDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(data.dealDate));
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
	},
	



}

	
</script>
<style lang="less">
.g-setting-detail{
	.m-detail-content{
		padding:30px 24px;
	}
}
</style>
