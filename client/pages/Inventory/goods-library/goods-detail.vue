<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			商品详情
		</div>
		<div style="padding-left:60px;font-weight: 700;font-size:14px;padding-top:20px;margin-bottom:20px;">
			<div style="font-size:26px;">{{basicInfo.name}}</div>
			<div>商品定价：<span style="color:red;font-size:26px;">{{basicInfo.quotedPrice?basicInfo.quotedPrice+'元':'-'}}</span></div>
			<div style="padding-top: 10px;">工位单价：{{basicInfo.avgPrice?basicInfo.avgPrice+'元':'-'}}</div>
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="城市：">
					{{basicInfo.cityName}}
				</LabelText>
				<LabelText label="社区：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="楼层：">
					{{basicInfo.floor?basicInfo.floor+'层':'-'}}
				</LabelText>
				<LabelText label="类型：">
					{{basicInfo.goodsTypeName}}
				</LabelText>
				<LabelText label="工位：">
					{{basicInfo.capacity?basicInfo.capacity+'工位':'-'}}
				</LabelText>
				<LabelText label="面积：">
					{{basicInfo.area?basicInfo.area+'平方':'-'}}
				</LabelText>
				<LabelText label="方位：">
					{{basicInfo.locationTypeName}}
				</LabelText>
				<LabelText label="套间：">
					{{basicInfo.suiteTypeName}}
				</LabelText>
				<LabelText label="位置：">
					{{basicInfo.goodsLocationText}}
				</LabelText>
				<LabelText label="描述：">
					{{basicInfo.remark}}
				</LabelText>
				<LabelText label="空间：">
					{{basicInfo.basicSpaceName}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="启用状态">
				<Table border :columns="service" :data="serviceData"/>
			</DetailStyle>
			<DetailStyle info="商品修改记录">
				<Table border :columns="contract" :data="contractData"/>
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
	name:'RenewView',
	head() {
        return {
            title: '商品详情'
        }
    },
	components:{
		DetailStyle,
		LabelText
	},
	data(){
		return{
			basicInfo:{},
			service:[
				{
				 title: '时间',
                 key: 'startDate',
				 align:'center',
				 render(tag,params){
					 let startTime=params.row.startDate;
					 let endTime=params.row.endDate;
					 let start=startTime?dateUtils.dateToStr('YYYY-MM-DD',new Date(startTime)):'-';
					 let end=endTime?dateUtils.dateToStr('YYYY-MM-DD',new Date(endTime)):'-';
					 let time='-';
					 if(startTime&&endTime){
						 time=start+' － '+end;
					 }else if(startTime&&!endTime){
						 time=start+'起';
					 }else if(!startTime&&endTime){
						 time='-'+end;
					 }
					 return tag('span',{},time);
				 }	
                },
				{
                    title:'状态',
                    key:'goodsStatusName',
					align:'center',
					render(tag,params){
					 let status=params.row.goodsStatusName;
					 return tag('span',{
						 style:{
							 color:(status=='下架'||status=='不可用')?'red':''
						 }
					 },status);
				    }	
                },
				{
				 title: '时长',
                 key: 'days',
				 align:'center',
				 render(tag,params){
					 let status=params.row.days?params.row.days+'天':'-';
					 return tag('span',{},status);
				 } 	
                }
			],

            contract:[
               {
				 title: '修改内容',
                 key: 'typeName',
                 align:'center'	
				},
				{
				 title: '修改前',
                 key: 'contentBefore',
                 align:'center'	
				},
				{
				 title: '修改后',
                 key: 'contentAfter',
                 align:'center'	
				},
				{
				 title: '修改时间',
                 key: 'utime',
				 align:'center',
				 render(tag,params){
					 let time=params.row.utime?dateUtils.dateToStr('YYYY-MM-DD HH:mm',new Date(params.row.utime)):'-';
					 return tag('span',{},time);
				 }		
				},
				{
				 title: '操作者',
                 key: 'creator',
                 align:'center'	
				},
				{
				 title: '备注',
                 key: 'remark',
                 align:'center'	
				}   
			],

			serviceData:[],
			contractData:[]
		}
	},

	mounted:function(){
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},
    
	methods:{
		getDetailData(){
			let params={
				id:this.$route.query.id,
				goodsType:this.$route.query.goodsType
			};
			this.$http.get('goods-detail', params).then((response)=>{  
					this.basicInfo=response.data;
		
					this.serviceData=response.data.followStatus||[];
					this.contractData=response.data.goodsOperateLogs||[];
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
		// margin:-10px;
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
			padding: 15px 24px 30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.table-button{
			text-align: center;
			cursor: pointer;
			color:#499DF1;
			display: inline-block;
			transition:all .5s;
			&>span{
				font-size: 16px;
				padding-bottom:5px;
				padding-top:10px;
				display: inline-block;
			}
		}
		.button-list{
			text-align: center;
		}
		.notAll{
			display: block;
			margin:0 auto;
			width:16px;
			height: 16px;
			transform: rotate(180deg);
			vertical-align: middle;
		}
		.formula{
			margin-left:12px;
			&>div{
				margin:10px 0;
			}
		}
	}
</style>