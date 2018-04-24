<template>
	<div class="g-order-detail">
            <ReplaceView :editCard="editCard" :data.sync="overViewData" type="view"
            v-if="show"/>
		
	</div>	
</template>


<script>

import dateUtils from 'vue-dateutils';
    import ReplaceView from '../replaceView.vue'

export default {
	name:'RenewView',
	head() {
        return {
            title: '续租详情'
        }
    },
	components:{
		ReplaceView,
	},
	data(){
		return{
			editCard:false,
			overViewData:{
			},
			show:false,
			payList:[
                {value:'ONE',label:'月付'},
                {value:'TWO',label:'两月付'},
                {value:'THREE',label:'季付'},
                {value:'SIX',label:'半年付'},
                {value:'TWELVE',label:'年付'},
                {value:'ALL',label:'全款'},
            ],
		}
	},

	mounted:function(){
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},
	watch:{
		overViewData(){
			this.show = true
		}
	},

	methods:{
		getDetailData(){
			let {params}=this.$route;
			let from={
				id:params.watchView
			};
			this.$http.get('get-replace-detail', from).then((response)=>{  
					let overViewData = response.data;

					overViewData.oldSeatList = response.data.oldSeatInfo.map(item=>{
						let obj = Object.assign({},item);
						obj.endDate = item.prepEndDate;
						obj.changeBegin = item.prepStartDate;
						return obj;
					});
					overViewData.seats = response.data.newSeatInfo.map(item=>{
						item.originalPrice = item.marketPrice;
						item.saleNum = response.data.discount || '-';
						return item;
					})
					let array = [];
					array.push(response.data.feeResultVO)
					overViewData.newStationData = array;
					overViewData.serviceDetailsList = response.data.newSeatCombin.map(item=>{
						item.startDate =dateUtils.dateToStr('YYYY-MM-DD',new Date(item.startDate)) 
						item.endDate =dateUtils.dateToStr('YYYY-MM-DD',new Date(item.endDate)) 
						return item;
					});

					overViewData.changeServiceFee = response.data.feeResultVO.reduceServiceFee;
					this.payList.map(item=>{
						if(item.value == response.data.installmentType){
							overViewData.installmentName = item.label
						}
					})
					overViewData.transferDepositAmount = response.data.feeResultVO.changeDeposit
					

					overViewData.freeStartDate = response.data.freeStartDate || response.data.realStartDate;
					overViewData.startDate = response.data.realStartDate
					overViewData.back = response.data.feeResultVO.lockDeposit
					this.overViewData = overViewData
				}).catch((error)=>{
					this.$Notice.error({
						title:error.message
					});
			})
		},
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
			padding:30px 24px;
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
		.showAll{
			display: block;
			margin:0 auto;
			width:16px;
			height: 16px;

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