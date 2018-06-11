<template>
    <div class='m-settlement-list'>
        <SearchFrom
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
              :type="type"
        />

        <div style="padding:0px 20px;">
             <Button type="primary" @click="goAddPage">新建</Button>
        </div>

        <div style="padding:0px 20px;">
       

            <Tabs 
                :value="type"
                :animated="false"
                @on-click="tabsClick"
            >
                <TabPane label="待开发票" name="waitMake"> 
                    <List v-if="type == 'waitMake'" :type="type" status="APPLYING"/>
                </TabPane>
                <TabPane label="已开发票" name="alreadyMake" >
                    <List v-if="type == 'alreadyMake'" :type="type" status="INVOICED"/>
                </TabPane>
                <TabPane label="待重开" name="returnMake" >
                    <List v-if="type == 'returnMake'" :type="type" status="RECOVERYED" />
                </TabPane>
                <TabPane label="全部" name="all">
                    <List v-if="type == 'all'" :type="type" status="RECOVERYED,APPLYING,INVOICED"/>
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
                title: '开票系统'
            }
        },
        data () {
           return {
               type:'waitMake',
           }
        },
        mounted(){
             var tab=localStorage.getItem('operation-side-invoice-bill');
             
             this.type=tab?tab:'waitMake';
             this.tabsClick(this.type)
        },
      
        
        created(){
           
        },
    

        methods:{
            goAddPage(params){
                 window.open(`/bill/make-invoice/${params.id}/add-invoice?id=${params.id}&isReady=edit`);
            },
            tabsClick(val){
                localStorage.setItem('operation-side-invoice-bill',val);
                this.type = val;
            },
            searchClick(params){    
                if(params.startRefundTime){
                    params.startRefundTime = new Date(params.startRefundTime).getTime();
                }
                if(params.startTicketTime){
                    params.startTicketTime = new Date(params.startTicketTime).getTime();
                }
                if(params.startTime){
                    params.startTime = new Date(params.startTime).getTime();
                }
                if(params.endRefundTime){
                    params.endRefundTime = new Date(params.endRefundTime).getTime();
                }
                if(params.endTicketTime){
                    params.endTicketTime = new Date(params.endTicketTime).getTime();
                }
                if(params.endTime){
                    params.endTime = new Date(params.endTime).getTime();
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