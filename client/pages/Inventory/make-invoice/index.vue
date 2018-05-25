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
            <!-- waitArrive,waitMail,waitReceive,alreadyReceive,waitReturn -->
                <TabPane label="待签收" name="waitArrive"> 
                    <List v-if="type == 'waitArrive'" :type="type"/>
                </TabPane>
                <TabPane label="待邮寄" name="waitMail" >
                    <List v-if="type == 'waitMail'" :type="type"/>
                </TabPane>
                <TabPane label="待领取" name="waitReceive" >
                    <List v-if="type == 'waitReceive'" :type="type"/>
                </TabPane>
                <TabPane label="已领取" name="alreadyReceive">
                    <List v-if="type == 'alreadyReceive'" :type="type"/>
                </TabPane>
                <TabPane label="待退还" name="waitReturn">
                    <List v-if="type == 'waitReturn'" :type="type"/>
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
               type:'waitArrive',
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