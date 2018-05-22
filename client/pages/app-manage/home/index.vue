<template>
  <div class="g-app-manage-home">
    <div class="u-home-main-part">

    </div>
      <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="会员7天线上化率" name="member">   
                <Member   :mask="key"/>
            </Tab-pane>
            <Tab-pane label="入驻会员活跃情况" name="joinMember">
                <JoinMember :mask="key" /> 
            </Tab-pane>
            <Tab-pane label="活动情况" name="activity">
               <Activity :mask="key"/>
            </Tab-pane>
      </Tabs>  
    
  </div>
</template>
<script>
import Member from './member';
import JoinMember from './joinMember';
import Activity from './activity';

export default {
   head() {
        return {
            title: '产品运营主页'
        }
    },
   data(){
       return {
           activeKey:'member',
           key:'',
           joinMemberPage:1,
           joinMemberTotalCount:0,
           pageSize:15,
           memberList:[],
           
           
       }
   },
   components:{
      Member,
      JoinMember,
      Activity      
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('paymentMask')||'member';
   },
   methods:{
        tabsClick(key){
           this.key=key;
        },
        memberChangePage(){
            this.params.page=page;
            this.page=page;
            this.getTableData(this.params);
        },
        joinMemberChangePage(){
            this.params.page=page;
            this.page=page;
            this.getTableData(this.params);
        }
    }
}
</script>
<style lang="less">
.g-app-manage-home{
  .u-home-main-part{
    background-color: #fff;
    height: 60px;
    border-radius: 4px;
    width: 100%;
    line-height: 60px;
    margin-bottom: 20px;
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.1);
    margin-bottom:10px;
  }
  
}
</style>


