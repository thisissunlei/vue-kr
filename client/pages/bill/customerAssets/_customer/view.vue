

<template>	
    <div class="customer-assets-detail">
		 <SectionTitle title="客户账户详情" v-if="selectedTab!='account'" />
		 <div class="customer-detail" v-if="selectedTab=='account'">
			 <div class="detail-font">客户详情
			 </div><div class="detail-line"><div></div></div>
		 </div>


		<div class="content" v-if="selectedTab!='account'">
			<Row>  
                <Col class="col circle" >
					<div class="title">客户ID：</div>
					<div class="contents">{{customerBasic.id}}</div>
                </Col>
                
                <Col class="col circle">
					<div class="title">客户名称：</div>
					<div class="contents"><span>{{customerBasic.company}}</span></div>
                </Col>
                <Col class="col circle">
					<div class="title">客户状态：</div>
					<div class="contents">{{customerBasic.status}}</div>
                </Col>
            </Row>
		</div>
		<div class="tab-list" v-if="selectedTab!='account'">
			<span class="tab-span"  v-for="(item, index) in firstTab"
                :key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
		</div>
		<!-- 苏岭开始 -->
		<div class="new-tab-wrap" v-if="selectedTab=='account'">
			<div class="new-tab-list">
				<span class="tab-span"  v-for="(item, index) in newFirstTab"
				:key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
			</div>
			<div class="new-tab-content">
				<AccountManagement />
			</div>
		</div>
		<!-- 苏岭结束 -->
		<div class="tab-content">
            	<Basic v-if="selectedTab=='basic'"/>
            	<div v-if="selectedTab=='menber'" class="tab-texts">
            		<img src="./images/member.svg" alt="">
            		<a href="javascript:void(0);" @click="openMember">点击查看会员列表</a>  
            	</div>
            	<div v-if="selectedTab=='bill'" class="tab-texts">
            		<img src="./images/bill.svg" alt="">

            		<a href="javascript:void(0);" @click="openBill">点击查看账单列表</a> 
            	</div>
            	<div v-if="selectedTab=='order'" class="tab-texts">
            		<img src="./images/bill.svg" alt="">

            		<a href="javascript:void(0);" @click="openOrder">点击查看入驻订单列表</a>
            	</div>
				<OrderManagement v-if="selectedTab=='stagingBill'" :customerId="customerId" class="tab-texts"/>
				<JoinInfo v-if="selectedTab=='join'" :customerId="customerId"/>
            	<Waiting v-if="selectedTab=='more' "/>
        </div>
		
    </div>
	

</template>

<script>
	import SectionTitle from '~/components/SectionTitle';
	import LabelText from '~/components/LabelText'; 
	import Assets from './assets.vue'; 
    import Waiting from './waiting.vue'; 
	import Basic from './basic/index.vue'; 
	import JoinInfo from './joinInfo.vue'; 
	import OrderManagement from './orderManagement'
	import AccountManagement from './accountManagement'; 

	export default {
		name:'customerAssetsDetail',
		components:{
			SectionTitle,
			LabelText,
			Assets,
			Waiting,
			Basic,
			JoinInfo,
			OrderManagement,
			AccountManagement
		}, 
		head () {
        	return {
        	    title: "客户账户详情-氪空间后台管理系统"
        	}
 		},
		data (){

			return{
				//一层Tab目录
				firstTab:[{
					name:'基本信息',
					code:'basic'
				},{
					name:'会员信息',
					code:'menber'
				},{
					name:'账单管理',
					code:'bill'
				},{
					name:'入驻信息',
					code:'join'
				},{
					name:'订单管理',
					code:'order'
				},{
					name:'账户信息',
					code:'account'
				},{
					name:'分期账单',
					code:'stagingBill'
				},{
					name:'更多',
					code:'more'
				},],
				newFirstTab:[
					{
					name:'基本资料',
					code:'basic'
				},{
					name:'订单管理',
					code:'order'
				},{
					name:'账单管理',
					code:'bill'
				},{
					name:'合同管理',
					code:'more'
				},{
					name:'入驻信息',
					code:'join'
				},{
					name:'账户管理',
					code:'account'
				},{
					name:'分期对账',
					code:'stagingBill'
				},{
					name:'会员资料',
					code:'menber'
				}],
				selectedTab:'basic',
				customerBasic:{
					customerId:'w',
					customerName:'w',
					status:'w'
				},
				customerStatus:[{
					value:'CREATED',
					status:'已创建'
				},{
					value:'SIGNED',
					status:'已签约'
				},{
					value:'ENTERED',
					status:'已入驻'
				}],

				customerId:''

				
			}
		},
		methods:{
			selectTab(name){
				console.log('selectTab',name);
				// if(name=='order'){
				// 	window.open("/order-center/order-manage/station-order-manage?page=1&pageSize=15&mask=join&customerName="+this.customerBasic.company,'_blank');
				// }
				this.selectedTab = name
			},
			getBasicInfo(){
				// 获取客户进本信息
				let {params}=this.$route;
				this.customerId=params.customer;
				 console.log('route',params.customer)
				 let param = {
				 	customerId:params.customer
				 }
				this.$http.get('top-customer',param).then((res)=>{
					this.customerBasic = res.data;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
			},
			openOrder(){
				window.open("/order-center/order-manage/station-order-manage?page=1&pageSize=15&mask=join&customerName="+this.customerBasic.company,'_blank');
			},
			openBill(){
				// window.open("/bill/list?page=1&pageSize=15&customerName="+this.customerBasic.company,'_blank');
				window.open("/bill/list",'_blank');
			},
			openMember(){
				window.open("/new/#/user/memberManage/list",'_blank');
			},
		},
		mounted(){
			this.getBasicInfo()
			GLOBALSIDESWITCH('false');
			let hash = window.location.hash.split('#')[1];
			this.selectedTab = hash || 'basic'
			GLOBALHEADERSET('客户会员')
		}
	
	}
</script>
<style lang="less" scoped>
    .customer-assets-detail{
		//overflow: hidden;
		.content{
			border-bottom: 1px solid #E8E9E9;
			margin-bottom: 30px;
			padding-left: 13px;
			padding-top:20px;
			padding-bottom:20px;
		}
		/*苏岭开始*/
		.customer-detail{
			height: 50px;
			font-size: 14px;
			color: #666;
			line-height: 50px;
			padding-left: 25px;
			position: relative;;
			.detail-font{
				width:108px;
				display:inline-block;
				text-align:center;
				background:#ccc;
			}
			.detail-line{
				position: absolute;
				left: 133px;
				right: 10px;
				top:0;
				div{
					border-bottom: 1px solid #e8e9e9;
					display:inline-block;
					width:100%;
					vertical-align: bottom;
				}
			}
		}
		.new-tab-wrap{
			padding-left: 25px;
            display: flex;
			.new-tab-list{
				width: 110px;
				display: inline-block;
				.tab-span{
					vertical-align: top;
					display: block;
					width:108px;
					height: 36px;
					line-height: 36px;
					text-align: center;
					background: #F7F7F7;
					border: 1px solid #DFDFDF;
					border-bottom: none;
					color:#666;
					font-size: 14px;
					cursor: pointer;
					transition:all .5;
					
				}
				.tab-span:last-child{
					border-bottom:1px solid #DFDFDF
				}
				.tab-active{
					background-color: #fff;
					border-right:none;
					color:#4A90E2;
					transition:all .5;
				}
			}
			.new-tab-content{
				vertical-align: top;
				flex: 1;
    			width: 0;
			}
		}
		/*苏岭结束*/
		.tab-list{
			margin-left: 25px;
			height: 25px;
			margin-bottom: 30px;
			.tab-span{
				font-size:14px;
				color:#666;
				line-height: 20px;
				display: inline-block;
				cursor: pointer;
			}
			.tab-active{
				color:#4A90E2;
				position: relative;
				font-weight: 500;
				&:after{
					content:'';
					display:inline-block;
					height: 2px;
					width: 28px;
					position: absolute;
					text-align: center;
					background-color: #4A90E2;
					bottom: -6px;
					left: 50%;
					transform:translateX(-50%);
					transition:all 0.5;
				}
			}
			
			.tab-span+.tab-span{
				margin-left: 50px;
			}
		}
		.tab-content{
			// border:1px solid red;
		}
		.tab-texts{
			text-align:center;
			margin:30px;
			margin-top:45px;
			img{
				display:block;
				margin:auto;
				width:100px;
				margin-bottom:20px;
			}
			a{
				color:#499df1;
			}
		}
    }
    .col{
    	width:33%;
    	display:inline-block;
    	vertical-align:top;
    }
    .col>.title{
    	display:inline-block;
    	font-size:14px;
    	font-weight:bold;
    }
    .col>.contents{
    	font-size:14px;
    	vertical-align:top;
    	display:inline-block;
    	&:nth-child(2){
			max-width:70%;
    	}
    }
    .contents>span{
    	display:inline-block;
    	line-height:20px;
    }
    .circle{
		&::before{
			content:'';
			display: inline-block;
			width:8px;
			height: 8px;
			border:1px solid #333;
			border-radius: 5px;
			margin-right:10px;
		}
	}

</style>