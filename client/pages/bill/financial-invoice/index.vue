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
                :animated="false"
                @on-click="tabsClick"
            >
                <TabPane label="待审核" name="VERIFYING"> 
                    <List v-if="type == 'VERIFYING'&&searchForm.cStartTime" :type="type" :searchForm="searchForm"/>
                </TabPane>
                <TabPane label="已审核" name="PASSED" >
                    <List v-if="type == 'PASSED'&&searchForm.cStartTime" :type="type" :searchForm="searchForm"/>
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
      
        
        created(){
        
        },

        methods:{
            tabsClick(val){
                this.type = val;
            },
            searchClick(params){  
                utils.addParams(params);
            },
            clearClick(params){
                //utils.addParams(params);
            },
            initData(formItem){
                this.searchForm=formItem;
            }
        }
    }
</script>

<style lang='less' scoped>
   
</style>