

<template>	
    <div class="assets-manage">
        <div class="money-list">
            <div class="money-div">
                <span class="name">账户余额</span>
                <span class="money">￥ {{ (balance/100).toFixed(2) | thousand}}</span>
            </div>
            <div class="between">=</div>
            <div class="money-div">
                <span class="name">客户打款</span>
                <span class="money">￥{{(play/100).toFixed(2)|thousand}}</span>
            </div>
            <div  class="between">-</div>
            <div class="money-div">
                <span class="name">客户消费</span>
                <span class="money">￥{{(spending/100).toFixed(2)|thousand}}</span>
            </div>
            <div class="between">-</div>
            <div class="money-div">
                <span class="name">客户退款</span>
                <span class="money">￥{{(refunds/100).toFixed(2)|thousand}}</span>
            </div>
            <div class="between">-</div>
            <div class="money-div">
                <span class="name">申请中的余额</span>
                <span class="money">￥{{(applying/100).toFixed(2)|thousand}}</span>
            </div>
        </div>

        <div class="asset-content">
            <div class="tab-list">
                <span class="tab-span"  v-for="(item, index) in tablist"
                :key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
            </div>
            <div class="tab-content">
                <GiveMoney v-if="selectedTab == 'play'"/>
                <Balance v-if="selectedTab == 'balance'" @update-data="updateData"/>
                <Spending v-if="selectedTab == 'spending'"/>
                <Refunds v-if="selectedTab == 'refunds'"/>
            </div>
        </div>
    </div>
	

</template>

<script>
    import GiveMoney from './giveMoney.vue'; 
    import Balance from './balance.vue'; 
    import Spending from './spending.vue'; 
    import Refunds from './refunds.vue'; 
    import utils from '~/plugins/utils';

	export default {
		name:'orderManange',
		components:{
            GiveMoney,
            Balance,
            Spending,
            Refunds,
		},
		data (){
			return{
                //tablist
                tablist:[{
                    name:'账户余额',
                    code:'balance'
                },{
                    name:'客户打款',
                    code:'play'
                },{
                    name:'客户消费',
                    code:'spending'
                },{
                    name:'客户退款',
                    code:'refunds'
                },],
                selectedTab:'balance',
                balance:20012.34,//客户余额
                refunds:3421.22,//客户退款
                spending:22.11,//客户消费
                play:342423423.32,//客户打款
                applying:0, //申请中的余额
				
			}
		},
		methods:{
            selectTab(name){
                this.selectedTab = name;
            },
            getAccountInformation(){
                //获取账户信息下公式列表
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                 }
                this.$http.get('account-detail',param).then((res)=>{
                    this.balance = res.data.balance;
                    this.refunds = res.data.refund;
                    this.spending = res.data.consumption;
                    this.play = res.data.payment;
                    this.applying=res.data.applying;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            updateData(){
                this.getAccountInformation()
            }
		},
		mounted(){
            this.getAccountInformation()
			GLOBALSIDESWITCH('false');
		}
	
	}
</script>
<style lang="less" scoped>
    .assets-manage{
        .money-list{
            padding-left:25px;
            margin-bottom: 30px;
            &>div{
                display: inline-block;
            }
            .between{
                width:40px;
                text-align: center;
                height: 60px;
                line-height: 60px;
                vertical-align:top;
            }
            .money-div{
                background: #F5F6FA;
                border: 1px solid #E1E6EB;
                border-radius: 8px;
                height: 60px;
                width: 118px;
                text-align: center;
                .name{
                    font-size: 14px;
                    line-height: 14px;
                    color:#333;
                    display: block;
                    height:30px;
                    line-height: 30px;
                }
                .money{
                    color: #4A90E2;
                    font-size:12px;
                }
            }
        }
        .asset-content{
            padding-left: 25px;
            display: flex;
            .tab-list{
                width: 110px;
                display: inline-block;
                .tab-span{
                    vertical-align: top;
                    display: block;
                    width:80px;
                    height: 30px;
                    line-height: 30px;
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
            .tab-content{
                vertical-align: top;
            }
        }
    }
</style>