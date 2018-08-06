<template>
  <div class="g-app-manage-home">
    <div class="u-home-main-part">
        <div class="u-community-info">
           <span class="u-community-name">{{communityName}}</span>
           <span class="u-change-community-btn" @click="openCommunity">切换社区</span>
        </div>
    </div>
    <div>
         <div>
            <span>会员7天线上化</span>    
            <IconTip style="left:260px;top:-32px;" contentStyle="width:300px" iconStyle="black">
                <p>①  线上化率：已入驻会员获得会员权限满7天后，通过是否登录过APP计算“7天线上化率”；</p>
                <p>②  对比周初：当日的线上化率与上周日的数据对比；</p>
                <p>③  日均上线会员数（当周）：已选中日期所在周的平均值（当周登录APP会员总数/截止该日当周总天数）；</p>
                <p>④  同比前周：当周日均上线会员数与上周7天日均上线会员数的浮动值；</p>
             </IconTip>
         </div>
        <DatePicker 
                class="u-date-right" 
                type="daterange" 
                placement="bottom-end" 
                placeholder="日期" 
                @on-change="changeDate"
             />
    </div>
    <div class="u-table">
        <Table border  :columns="memberColumns" :data="memberList" ref="table" stripe></Table>
        <Button  style="margin-top:30px;" type="primary" @click="onExport">导出(共{{totalCount}}条)</Button>
    </div>
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
import IconTip from '~/components/IconTip';

export default {
   head() {
        return {
            title: '产品运营主页'
        }
    },
    components:{
     IconTip     
   },
   data(){
       return {
           totalCount:0,
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
           communityObj:{},
           memberColumns:[
              {
                  title: '日期',
                  key: 'dataDate',
                  align:'center',
              },
              {
                  title: '激活会员数',
                  key: 'loginNum',
                  align:'center',
              },
              {
                  title: '入驻会员数',
                  key: 'enterNum',
                  align:'center',
              },
              {
                  title: '7天线上化率',
                  key: 'useRate',
                  align:'center',
              },
              {
                  title: '对比昨天',
                  key: 'useRate',
                  align:'center',
              },
              {
                  title: '对比上周日',
                  key: 'useRate',
                  align:'center',
              },
              {
                  title: '日均上线会员数（当周）',
                  key: 'useRate',
                  align:'center',
              },
              {
                  title: '同比前周',
                  key: 'useRate',
                  align:'center',
              },
           ],
       }
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('hometMask')||'member';
      this.getCommunity();
   },
   methods:{
        openCommunity(){
            this.openDialog=!this.openDialog
        },
        changeCommunity(form){
            this.communityObj=form;
        },
        submitChange(){
             this.communityName= this.communityObj.label;
             this.formItem.cmtId=this.cmtId;
             this.openDialog=false;
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
         },
         onExport(){

         }
    }
}
</script>
<style lang="less">
.g-app-manage-home{
    .u-table{
        padding:20px 20px 0;
    }
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


