<template>
    <div class='m-settlement-list'>
        <div>
            <Tabs 
                :value="type"
                :animated="false"
                @on-click="tabsClick"
            >
                <TabPane label="账户汇总" name="accountSummary"> 
                    <AccountSummary v-if="type == 'accountSummary'" :type="type"/>
                </TabPane>
                <TabPane label="到款明细" name="getDetail"> 
                    <List v-if="type == 'getDetail'" :type="type"/>
                </TabPane>
                <TabPane label="退款明细" name="refundDetail" >
                    <List v-if="type == 'refundDetail'" :type="type"/>
                </TabPane>
                <TabPane label="押金明细" name="depositDetail" >
                    <List v-if="type == 'depositDetail'" :type="type"/>
                </TabPane>
                <TabPane label="消费明细" name="consumptionDetail">
                    <List v-if="type == 'consumptionDetail'" :type="type"/>
                </TabPane>
                <TabPane label="余额明细" name="balanceDetail">
                    <List v-if="type == 'balanceDetail'" :type="type"/>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>


<script>
    import utils from '~/plugins/utils';
    import List from './list';
    import dateUtils from 'vue-dateutils';
    import AccountSummary from './accountSummary';
    export default {
       
        components:{
            List,
            AccountSummary
        },
         head() {
            return {
                title: '账户管理-氪空间后台管理系统'
            }
        },
        data () {
           return {
               type:'accountSummary'
           }
        },
        methods:{
            tabsClick(val){
                this.type = val;
            }      
        }
    }
</script>

<style lang='less'>
  .m-settlement-list{
     .ivu-tabs{
        overflow:inherit;
     }
  }
</style>