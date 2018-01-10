<template>
   <div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"/>
		离场详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="离场编号：">
			    {{detailData.withdrawalNum}}
			</LabelText>
			<LabelText label="离场状态：">
				{{detailData.withDrawalStatusName}}
			</LabelText>
			<LabelText label="客户名称：">
				{{detailData.csrName}}
			</LabelText>
			<LabelText label="离场社区名称：">
				{{detailData.cmtName}}
			</LabelText>
            <LabelText label="服务尾日：">
				{{detailData.detailData}}
			</LabelText>
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
	components:{
		DetailStyle,
		LabelText
	},
	head() {
        return {
            title: '入驻详情'
        }
    },
	data(){
		return{
			detailData:{},
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH("false");
		let {params}=this.$route;
		let from={
			id:params.watchView
		};
		var that=this;
	    this.$http.get('get-from-field-view', from, r => {
			that.detailData = r.data;	   
    	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
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
	}
</style>