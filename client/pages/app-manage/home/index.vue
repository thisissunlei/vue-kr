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
                <div class="u-member-tip" v-if="isTip">
                    <div class="u-member-small-trigon"></div>
                    已入驻会员获得会员权限满7天后，通过是否登录过APP计算“7天线上化率”，用以分析引导入驻会员加入线上APP社群情况；
                    <span class="u-member-tip-close" @click="tipClose"></span>
                </div>
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
                        v-model="cmtId"
                        style="width:250px"
                        placeholder="请选择社区"
                        filterable
                        clearable
                        :label-in-value="true"
                        @on-change="changeCommunity"
                    >
                        <Option  v-for="item in communityList" :value="item.cmtId" :key="item.cmtId"> {{ item.cmtName }}</Option>
                </Select>
        </div>
        <div slot="footer">
            <Button type="primary" @click="submitChange">确定</Button>
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
           cmtId:'',
           communityList:[],
           isTip:true,
           communityObj:{},
       }
   },
   components:{
      Member,
      JoinMember,
      Activity      
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('paymentMask')||'member';
      this.getCommunity();
   },
   methods:{
        tipClose(){
            this.isTip=!this.isTip
        },
        openCommunity(){
            this.openDialog=!this.openDialog
        },
        tabsClick(key){
           this.key=key;
        },
        changeCommunity(form){
            this.communityObj=form;
        },
        submitChange(){
             this.communityName= this.communityObj.label;
             this.formItem.cmtId=this.cmtId;
        },
        changeDate(data){
            this.formItem.beginDate=data[0];
            this.formItem.endDate=data[1];
        },
        getCommunity(){
              this.$http.get('get-community-new-list','').then((res)=>{
                this.communityList=res.data.cmts;

                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
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
  .u-member-tip{
        width:800px;
        background:rgba(0,0,0,0.7);
        font-size:13px;
        color:#fff;
        padding:8px;
        border-radius: 3px;
        margin-left:15px;
        text-align: left;
        line-height: 18px;
        box-shadow:0 0 2px rgba(0,0,0,.2);
        position: relative;
    }
    .u-member-small-trigon{
        width:0;
        height:0;
        border:6px solid transparent;
        border-bottom-color: rgba(0,0,0,0.7);
        position: absolute;
        top:-12px;
        left:8%;
        margin-left:-3px;
    } 
    .u-member-tip-close{
        float:right;
        width:10px;
        height:10px;
        background: url('~/assets/images/close.svg') no-repeat center center;
        background-size:100% 100%;
        margin-top:3px;
        margin-right:10px;
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


