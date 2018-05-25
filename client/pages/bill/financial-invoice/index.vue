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
                <TabPane label="待审核" name="waitAudit"> 
                    <List v-if="type == 'waitAudit'" :type="type"/>
                </TabPane>
                <TabPane label="已审核" name="alreadyAudit" >
                    <List v-if="type == 'alreadyAudit'" :type="type"/>
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
               type:'waitAudit',
           }
        },
      
        
        created(){
        
        },

        methods:{
            tabsClick(val){
                this.type = val;
            },
            searchClick(params){
                console.log(params,"lllllll")
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