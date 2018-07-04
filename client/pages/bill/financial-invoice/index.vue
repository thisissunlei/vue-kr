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
                <TabPane label="待审核" name="VERIFYING"> 
                    <List v-if="type == 'VERIFYING'" :type="type" :searchForm="searchForm"/>
                </TabPane>
                <TabPane label="已审核" name="PASSED" >
                    <List v-if="type == 'PASSED'" :type="type" :searchForm="searchForm"/>
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
               type:'VERIFYING',
               searchForm:{}
           }
        },
        mounted(){
            var tab=localStorage.getItem('financial-invoice-toAndDone');
            this.type=tab?tab:'VERIFYING';
        },
        methods:{
            tabsClick(val){
                localStorage.setItem('financial-invoice-toAndDone',val);
                this.type = val;
            },
            searchClick(params){ 
                if(params.cStartTime){
                    params.cStartTime = new Date(params.cStartTime).getTime();
                }
                if(params.cEndTime){
                    params.cEndTime = new Date(params.cEndTime).getTime();
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