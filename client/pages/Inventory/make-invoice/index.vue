<template>
    <div class='m-settlement-list'>
        <SearchFrom
              @searchClick="searchClick"
              @clearClick="clearClick"
              :type="type"
        />
        <div style="padding:0px 20px;">
            <Tabs 
                :value="type"
                :animated="false"
                @on-click="tabsClick"
            >
            <!-- waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn -->
                <TabPane label="待签收" name="waitArrive"> 
                    <List v-if="type == 'waitArrive'" :type="type" />
                </TabPane>
                <TabPane label="待邮寄" name="waitMail" >
                    <List v-if="type == 'waitMail' " :type="type" />
                </TabPane>
                <TabPane label="待领取" name="waitReceive" >
                    <List v-if="type == 'waitReceive' " :type="type" />
                </TabPane>
                <TabPane label="已领取" name="alreadyReceive">
                    <List v-if="type == 'alreadyReceive' " :type="type" />
                </TabPane>
                <TabPane label="待退还" name="waitReturn">
                    <List v-if="type == 'waitReturn' " :type="type" />
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>


<script>
    import SearchFrom from './search-from';
    import utils from '~/plugins/utils';
    import publicFn from './publicFn';
    import List from './list';
    export default {
       
        components:{
            SearchFrom,
            List
        },
         head() {
            return {
                title: '开票系统'
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
                // console.log('searchClick',params)
                 this.searchForm= Object.assign({},publicFn.dateSwitch.call(this,params,'init'));
                 console.log(this.searchForm,"ppppppp")
                // params.ticketEndDate=this.dateSwitch(params.ticketEndDate);
                // params.ticketStartDate=this.dateSwitch(params.ticketStartDate);
                // params.receiveEndDate=this.dateSwitch(params.receiveEndDate);
                // params.receiveStartDate=this.dateSwitch(params.receiveStartDate);
                // params.callbackStartDate=this.dateSwitch(params.callbackStartDate);
                // params.callbackEndDate=this.dateSwitch(params.callbackEndDate);
                // console.log('params',params)
                // return;
                // return ;
                utils.addParams(params);
            },
            clearClick(params){
                utils.addParams(params);
            },
            initData(formItem){
                console.log('init--->',formItem)
                this.searchForm=formItem;
            }
        }
    }
</script>

<style lang='less' scoped>
   
</style>