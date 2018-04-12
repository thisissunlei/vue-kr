

<template>	
    <div class="customer-assets-detail">
		 <SectionTitle title="客户账户详情"  />


		<div class="content">
			<LabelText label="客户ID：" type="circle" style="width:30%">
				{{customerBasic.id}}
			</LabelText>
			<LabelText label="客户名称："  type="circle" style="width:30%">
				{{customerBasic.company}}
			</LabelText>
			<LabelText label="客户状态："  type="circle" style="width:30%">
				{{customerBasic.status}}
			</LabelText> 
		</div>
		<div class="tab-list">
			<span class="tab-span"  v-for="(item, index) in firstTab"
                :key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
		</div>
		<div class="tab-content">
            	<Assets v-if="selectedTab=='account'"/>
            	<Basic v-if="selectedTab=='basic'"/>
            	<Waiting v-if="selectedTab!='account' && selectedTab!='basic'"/>
        </div>
		
    </div>
	

</template>

<script>
	import SectionTitle from '~/components/SectionTitle';
	import LabelText from '~/components/LabelText'; 
	import Assets from './assets.vue'; 
    import Waiting from './waiting.vue'; 
    import Basic from './basic/index.vue'; 

	export default {
		name:'customerAssetsDetail',
		components:{
			SectionTitle,
			LabelText,
			Assets,
			Waiting,
			Basic
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
				}]

				
			}
		},
		methods:{
			selectTab(name){
				console.log('selectTab',name)
				this.selectedTab = name
			},
			getBasicInfo(){
				// 获取客户进本信息
				let {params}=this.$route;
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
			}
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
			height:50px;
			line-height: 50px;
			border-bottom: 1px solid #E8E9E9;
			margin-bottom: 30px;
			padding-left: 13px;
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
    }
</style>