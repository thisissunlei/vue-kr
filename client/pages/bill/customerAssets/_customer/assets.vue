

<template>	
    <div class="assets-manage">
        <div class="money-list">
            <div class="money-div">
                <span class="name">账户余额</span>
                <span class="money">￥10000</span>
            </div>
            <div class="between">=</div>
            <div class="money-div">
                <span class="name">账户余额</span>
                <span class="money">￥10000</span>
            </div>
            <div  class="between">-</div>
            <div class="money-div">
                <span class="name">账户余额</span>
                <span class="money">￥10000</span>
            </div>
            <div class="between">-</div>
            <div class="money-div">
                <span class="name">账户余额</span>
                <span class="money">￥10000</span>
            </div>
        </div>

        <div class="asset-content">
            <div class="tab-list">
                <span class="tab-span"  v-for="(item, index) in tablist"
                :key="index" @click='selectTab(item.code)' :class="{'tab-active':selectedTab==item.code}">{{item.name}}</span>
            </div>
            <div class="tab-content">
                <GiveMoney v-if="selectedTab == 'play'"/>
                <GiveMoney v-if="selectedTab == 'balance'"/>
                <GiveMoney v-if="selectedTab == 'spending'"/>
                <GiveMoney v-if="selectedTab == 'refunds'"/>
            </div>
        </div>
    </div>
	

</template>

<script>
    import GiveMoney from './giveMoney.vue'; 

	export default {
		name:'orderManange',
		components:{
            GiveMoney,
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

				
			}
		},
		methods:{
            selectTab(name){
                this.selectedTab = name;
            }
		},
		mounted(){
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
                }
                .tab-span:last-child{
                    border-bottom:1px solid #DFDFDF
                }
                .tab-active{
                    background-color: #fff;
                    border-right:none;
                    color:#4A90E2;
                }
            }
            .tab-content{
                vertical-align: top;
            }
        }
    }
</style>