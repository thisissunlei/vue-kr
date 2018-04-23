<template>
	<div class="g-order-detail">
            <ReplaceView @editCards="editCard" :data.sync="overViewData" v-if="editCard"/>
		
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
				newStationData:[]
			}
		}
	},

	mounted:function(){
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},

	methods:{
		getDetailData(){
			let {params}=this.$route;
			let from={
				id:params.watchView
			};
			this.$http.get('get-replace-detail', from).then((response)=>{  
					console.log('======',response.data)
					this.overViewData = response.data;
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