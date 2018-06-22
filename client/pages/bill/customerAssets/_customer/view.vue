

<template>	
    <div class="customer-assets-detail">
		 <SectionTitle title="客户账户详情"  />


		<div class="content">
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
		<div class="tab-list">
			<span class="tab-span"  v-for="(item, index) in firstTab"
                :key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
		</div>
		<div class="tab-content">
            	<Assets v-if="selectedTab=='account'"/>
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

	export default {
		name:'customerAssetsDetail',
		components:{
			SectionTitle,
			LabelText,
			Assets,
			Waiting,
			Basic,
			JoinInfo
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
					name:'更多',
					code:'more'
				},],
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
				if(name=='order'){
					window.open("/order-center/order-manage/station-order-manage?page=1&pageSize=15&mask=join&customerName="+this.customerBasic.company,'_blank');
				}
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
		.content{
			border-bottom: 1px solid #E8E9E9;
			margin-bottom: 30px;
			padding-left: 13px;
			padding-top:20px;
			padding-bottom:20px;
		}
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