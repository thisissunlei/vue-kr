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
                    <List v-if="type == 'all'" :type="type"/>
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
                //   utils.addParams(params);
            },
            initData(){

            }
            
        }
    }
</script>

<style lang='less' scoped>
   
</style>