<template>
    <div class='m-settlement-list'>
        <SearchFrom
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
              :type="type"
        />
        <div style="padding:0px 20px;">
            <Tabs 
                :value="type"
                :animated="false"
                @on-click="tabsClick"
            >
            <!-- waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn -->
                <TabPane label="待社区签收" name="waitArrive">
                    <List v-if="type == 'waitArrive'" :type="type" :searchForm="searchForm"/>
                </TabPane>
                <TabPane label="待社区邮寄" name="waitMail" >
                    <List v-if="type == 'waitMail'" :type="type" :searchForm="searchForm"/>
                </TabPane>
                <TabPane label="待社区发放" name="waitProvide" >
                    <List v-if="type == 'waitProvide'" :type="type" :searchForm="searchForm" @provideDone="tabsClick"/>
                </TabPane>
                <TabPane label="待客户领取" name="waitReceive" >
                    <List v-if="type == 'waitReceive'" :type="type" :searchForm="searchForm"/>
                </TabPane>
                <TabPane label="客户已领取" name="alreadyReceive">
                    <List v-if="type == 'alreadyReceive'" :type="type" :searchForm="searchForm"/>
                </TabPane>
                <TabPane label="待社区收回" name="waitReturn">
                    <List v-if="type == 'waitReturn'" :type="type" :searchForm="searchForm"/>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>


<script>
    import SearchFrom from './search-from';
    import utils from '~/plugins/utils';
    import List from './list';
    export default {
       
        components:{
            SearchFrom,
            List
        },
         head() {
            return {
                title: '运营端-氪空间后台管理系统'
            }
        },
        data () {
           return {
               type:'waitArrive',
               searchForm:{}
           }
        },
        mounted(){
             var tab=localStorage.getItem('operation-side-invoice');
             this.type=tab?tab:'waitArrive';
        },
        methods:{
            //格式转换
            dateSwitch(data){
                if(data){
                    return new Date(data).getTime();
                }else{
                    return '';
                }
            },
            tabsClick(val){
                localStorage.setItem('operation-side-invoice',val);
                this.type = val;
            },
            searchClick(params){
                if(params.ticketEndDate){
                    params.ticketEndDate = new Date(params.ticketEndDate).getTime();
                }
                if(params.ticketStartDate){
                    params.ticketStartDate = new Date(params.ticketStartDate).getTime();
                }
                if(params.receiveEndDate){
                    params.receiveEndDate = new Date(params.receiveEndDate).getTime();
                }
                if(params.receiveStartDate){
                    params.receiveStartDate = new Date(params.receiveStartDate).getTime();
                }
                if(params.callbackStartDate){
                    params.callbackStartDate = new Date(params.callbackStartDate).getTime();
                }
                if(params.callbackEndDate){
                    params.callbackEndDate = new Date(params.callbackEndDate).getTime();
                }
                utils.addParams(params);
            },
            clearClick(params){
                utils.addParams(params);
            },
            initData(formItem){
                this.searchForm=formItem;
            }
        }
    }
</script>

<style lang='less' scoped>
   
</style>