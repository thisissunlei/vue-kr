<template>
  <div class="g-app-manage-home">
    <div class="u-home-main-part">
        <div class="u-community-info">
           <span class="u-community-name">{{communityName}}</span>
           <span class="u-change-community-btn" @click="openCommunity">切换社区</span>
           <DatePicker 
                class="u-date-right" 
                type="daterange" 
                placement="bottom-end" 
                placeholder="日期" 
                @on-change="changeDate"
             />
        </div>
    </div>
      <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="会员7天线上化率" name="member">   
                <Member   
                    :mask="key"
                    :detail="formItem"
                />
            </Tab-pane>
            <Tab-pane label="入驻会员活跃情况" name="joinMember">
                <JoinMember 
                    :mask="key"
                    :detail="formItem" 
                /> 
            </Tab-pane>
            <Tab-pane label="活动情况" name="activity">
               <Activity 
                    :mask="key"
                    :detail="formItem"
                />
            </Tab-pane>
      </Tabs>  
     <Modal
        v-model="openDialog"
        title="选择社区"
        ok-text="确定"
        cancel-text="取消"
        width="500"
     >
        <div class="m-community-dialog">
                <span class="u-community-label">社区</span>
                <Select
                        v-model="formItem.cmtId"
                        style="width:250px"
                        placeholder="请选择社区"
                        filterable
                        clearable
                    >
                        <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
                </Select>
        </div>
        <div slot="footer">
            <Button type="primary" @click="changeCommunity">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="openCommunity">取消</Button>
        </div>
    </Modal>
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
           communityName:'全部社区',
           openDialog:false,
           formItem:{
              beginDate:'',
              cmtId:'',
              endDate:'',
           },
           communityList:[],

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
        openCommunity(){
            this.openDialog=!this.openDialog
        },
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
        },
        changeCommunity(){

        },
        changeDate(data){
            this.formItem.beginDate=data[0];
            this.formItem.endDate=data[1];
        },
        getCommunity(){
            //   this.$http.get('join-bill-community','').then((res)=>{
            //     this.communityList=res.data.items;

            //     }).catch((error)=>{
            //         this.$Notice.error({
            //             title:error.message
            //         });
            //     })
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
    margin-bottom:20px;
  }
 
  .u-community-name{
        padding-left:40px;
        font-size: 18px;
        color: #394457;
        margin-right: 30px; 
  }
  .u-change-community-btn{
        font-size: 14px;
        color: #2D8DCD;
        cursor: pointer;
  }
  .u-date-right{
      float:right;
      margin-top:14px;
      margin-right:28px;
      width: 200px

  }
  
}
.m-community-dialog{
    width:300px;
    margin:20px auto;
    .u-community-label{
        padding-right: 20px; 
    }
}
</style>


