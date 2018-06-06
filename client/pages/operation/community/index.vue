<template>
    <div class="operation-community"> 
      <!-- 选择社区 -->
        <div class="community">
          <img src="~/assets/images/main.png" alt="" style="margin:17.5px 20px;width:23px;">
          <div class="city" style="width:100px;margin-right:15px;display:inline-block;vertical-align:top;">
            <Select v-model="city" >
              <Option v-for="types in optionList" :value="types.value" :key="types.value" >{{ types.label }}</Option>
            </Select>
          </div>
          <div class="community" style="width:250px;display:inline-block;vertical-align:top;">
            <Select v-model="communityId" @on-change="changeCommunity">
              <Option v-for="types in communityList" :value="types.value" :key="types.value" >{{ types.label }}</Option>
            </Select>
          </div>
        </div> 
        <!-- 第一行内容区 -->
        <div class="tab-list">
          <div class="card-one item"  v-on:click="openCustomer">
            <span class="content">
              <img src="~/assets/images/customer.png" alt="" style="margin:15px auto;width:30px;height:30px;margin-top:20px;">
            </span>
            <span class="content title">现入驻客户</span>
            <span class="content number"><span>{{pageData.settledCustomer}}</span>个</span>
          </div>
          <div class="card-two item">
            <span class="content">
              <img src="~/assets/images/member.png" alt="" style="margin:12px auto;width:36px;height:33px;margin-top:20px;">
            </span>
            <span class="content title">现入驻会员</span>
            <span class="content number"><span>{{pageData.settledMember}}</span>个</span>
          </div>
          <div class="card-three">
            <div class="tabs">
              <span class="title"  v-bind:class="{active:tab=='all'}" v-on:click="changeTab('all')">全部工位数</span>
              <span class="title" v-bind:class="{active:tab=='office'}" v-on:click="changeTab('office')">独立办公室(30间)</span>
              <span class="title" v-bind:class="{active:tab=='fixedDest'}"  v-on:click="changeTab('fixedDest')">固定办公桌(10个)</span>
              <span class="title" v-bind:class="{active:tab=='mobileDesk'}"  v-on:click="changeTab('mobileDesk')">移动办公桌(5个)</span>
            </div>
            <div class="content">
              <span class="number">
                <span class="title">总数</span>
                <span class="num" v-if="tab=='all'" style="font-size:40px;color: #232428;">{{pageData.allSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:40px;color: #232428;">{{pageData.allSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:40px;color: #232428;">{{pageData.noRentFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:40px;color: #232428;">{{pageData.noRentMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">在租</span>
                <span class="num" v-if="tab=='all'" style="font-size:40px;color: #F5A623;">{{pageData.rentSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:40px;color: #F5A623;">{{pageData.rentSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:40px;color: #F5A623;">{{pageData.rentFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:40px;color: #F5A623;">{{pageData.rentMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">合同未生效</span>
                <span class="num"  v-if="tab=='all'" style="font-size:40px;color: #FAD27B;">{{pageData.uneffectSpaceNum}}</span>
                <span class="num" v-if="tab=='office'"  style="font-size:40px;color: #FAD27B;">{{pageData.uneffectSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'"  style="font-size:40px;color: #FAD27B;">{{pageData.uneffectFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'"  style="font-size:40px;color: #FAD27B;">{{pageData.uneffectMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">未租</span>
                <span class="num" v-if="tab=='all'" style="font-size:40px;color: #35BC9B;">{{pageData.noRentSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:40px;color: #35BC9B;">{{pageData.noRentSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:40px;color: #35BC9B;">{{pageData.noRentFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:40px;color: #35BC9B;">{{pageData.rentMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">不可用</span>
                <span class="num" v-if="tab=='all'" style="font-size:40px;color: rgb(191, 196, 207);;">{{pageData.unusefulSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:40px;color: rgb(191, 196, 207);;">{{pageData.unusefulSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:40px;color: rgb(191, 196, 207);;">{{pageData.unusefulFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:40px;color: rgb(191, 196, 207);;">{{pageData.unusefulMoveStationsNum}}</span>
              </span>
            </div>
            
          </div>
        </div>
        <!-- 列表区 -->
        <div class="bill-list"> 
          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openEnter">即将进场  ></div>
                <div class="header-right" v-if="list.length">今日：
                  <span :style="!list.length?'':'color: #FF6868;'">{{list[0].remark1}}</span><span style="font-size:12px">个</span>/
                  <span :style="!list.length?'':'color: #FF6868;'">{{list[0].remark2}}</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂时还没有这方面数据哦亲~</div>
              </div>

              <div class="contents"  v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <Tooltip :content="item.issueName" placement="top-start" class="table-cell">
                        <div class="ellipsis">{{item.issueName}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.capacity}}工位</span>
                    <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer" >
                      <div class="ellipsis">{{item.customerName}}</div>
                    </Tooltip>
                    <span class="table-cell">
                       {{item.toPutawayDay?(Number(item.toPutawayDay)==1?'今日':(Number(item.toPutawayDay)==2?'明日':item.toPutawayDay+'日后')):'0'}}
                      </span>
                  </li>        
                </ul>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left" @click="openOver">即将到期  ></div>
                <div class="header-right" v-if="DueList.length">今日：
                  <span :style="list[0].remark1==0?'':'color: #FF6868;'">{{DueList[0].remark1}}</span><span style="font-size:12px">个</span>/
                  <span :style="list[0].remark2==0?'':'color: #FF6868;'">{{DueList[0].remark2}}</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!DueList.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂时还没有这方面数据哦亲~</div>
              </div>
              <div class="contents" v-if="DueList.length">
                <ul >
                  <li v-for="item in DueList" >
                     <Tooltip :content="item.issueName" placement="top-start" class="table-cell">
                        <div class="ellipsis" >{{item.issueName}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.capacity}}工位</span>
                    <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                      <div class="ellipsis">{{item.customerName}}</div>
                    </Tooltip>
                    <span class="table-cell">
                      <!-- {{item.rentDays}} -->
                        <!-- {{Number(item.rentDays)==1?'今日':(Number(item.rentDays)==2?'明日':item.rentDays+'日后')}} -->
                          {{item.toPutawayDays?(Number(item.toPutawayDays)==1?'今日':(Number(item.toPutawayDays)==2?'明日':item.toPutawayDays+'日后')):'-'}}
                        </span> 
                  </li>        
                </ul>
              </div>
            </div>
          </div>
          <div class="line-one">
           <div class="box">
              <div class="header">
                <div class="header-left" @click="openrented">已起租未付   ></div>
                <div class="header-right" v-if="unpaidList.length">
                  <span :style="list[0].remark1==0?'':'color: #FF6868;'">{{unpaidList[0].remark1}}</span><span style="font-size:12px">笔</span>/共
                  <span :style="list[0].remark2==0?'':'color: #FF6868;'">{{unpaidList[0].remark2}}</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="unpaidList.length">
                <ul >
                  <li v-for="item in unpaidList" value="item.value" :key="item.value" >
                  <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell">   

                    <div class="ellipsis table-cell"  style="color:#4A90E2;flex:2">{{item.bizTypeName+item.billId}}</div>
                       </Tooltip>

                      <span  class="table-cell">{{item.customerName}}</span>
                    <Tooltip :content="item.debt" placement="top-start" class="table-cell customer">
                      <div class="ellipsis" >{{item.debt}}元</div>
                    </Tooltip>

                    <span class="table-cell">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
             <div class="box">
              <div class="header">
                <div class="header-left">逾期未付(工位) ></div>
                <div class="header-right" v-if="Overdue.length">
                  <span :style="list[0].remark1==0?'':'color: #FF6868;'">{{Overdue[0].remark1}}</span><span style="font-size:12px">笔</span>/共
                  <span :style="list[0].remark2==0?'':'color: #FF6868;'">{{Overdue[0].remark2}}</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="Overdue.length">
                <ul >
                  <li v-for="item in Overdue" >
                  <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell ">      
                    <div class="ellipsis table-cell"  style="color:#4A90E2;">{{item.bizTypeName+item.billId}}</div>
                       </Tooltip>
                      <span  class="table-cell">{{item.customerName}}</span>
                    <Tooltip :content="item.debt" placement="top-start" class="table-cell customer">
                      <div class="ellipsis">{{item.debt}}元</div>
                    </Tooltip>
        
                    <span class="table-cell">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>
          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left">逾期未付(会议室) ></div>
                <div class="header-right" v-if="Overdue.length">
                  <span :style="list[0].remark1==0?'':'color: #FF6868;'">{{Overdue[0].remark1}}</span><span style="font-size:12px">笔</span>/共
                  <span :style="list[0].remark2==0?'':'color: #FF6868;'">{{Overdue[0].remark2}}</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!Overdue.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="Overdue.length">
                <ul >
                   <li v-for="item in Overdue" >
                      <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell ">      
                    <div class="ellipsis table-cell"  style="color:#4A90E2;">{{item.bizTypeName+item.billId}}</div>
                       </Tooltip>
                      <span  class="table-cell">{{item.customerName}}</span>
                    <Tooltip :content="item.debt" placement="top-start" class="table-cell customer">
                      <div class="ellipsis">{{item.debt}}元</div>
                    </Tooltip>
        
                    <span class="table-cell">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>


      
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openOverUnpaid('station')">逾期未付(打印) ></div>
                <div class="header-right" v-if="Overdue.length">
                  <span :style="list[0].remark1==0?'':'color: #FF6868;'">{{Overdue[0].remark1}}</span><span style="font-size:12px">笔</span>/共
                  <span :style="list[0].remark2==0?'':'color: #FF6868;'">{{Overdue[0].remark2}}</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!Overdue.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="Overdue.length">
                <ul >
                     <li v-for="item in Overdue" >
                <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell ">      
                    <div class="ellipsis table-cell"  style="color:#4A90E2;">{{item.bizTypeName+item.billId}}</div>
                       </Tooltip>
                      <span  class="table-cell">{{item.customerName}}</span>
                    <Tooltip :content="item.debt" placement="top-start" class="table-cell customer">
                      <div class="ellipsis">{{item.debt}}元</div>
                    </Tooltip>
        
                    <span class="table-cell">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" @click="clappointment">预约参观  ></div>
                 <div class="header-right" v-if="appointment.length">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">人</span>
                </div>
              </div>
              <div class="contents" style="text-align:center"  v-if="!appointment.length">
                <img src="~/assets/images/waiting.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">小哥哥小姐姐正在尽全力开发，敬请期待哦亲~</div>
              </div>
                  <div class="contents" v-if="appointment.length">
                <ul >
                  <li v-for="item in appointment" >
                    <span class="table-cell ellipsis" style="flex:2">{{item.name}}</span>
                    <Tooltip :content="item.tel" placement="top-start" class="table-cell customer" style="flex:5">
                      <div class="ellipsis" >{{item.tel}}</div>
                    </Tooltip>
                                       
                  <Tooltip :content="item.vtime" placement="top-start" class="table-cell " style="flex:1">
                    <span class="table-cell">{{item.vtime}}</span>
                    </Tooltip>
                  </li>        
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openVisitor">会员访客   ></div>
                <div class="header-right" v-if="nappointment.length">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">人</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!nappointment.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂时还没有这方面数据哦亲~</div>
                
              </div>

              <div class="contents" v-if="nappointment.length">
                <ul >
                  <li v-for="item in nappointment" >
                 <Tooltip :content="item.company" placement="top-start" class="table-cell customer" style="flex:1.5">
                    <span class="table-cell ellipsis" >{{item.visitName}}</span>
                     </Tooltip>
                    <span class="table-cell" style="flex:0.8"> →</span>
                    <span class="table-cell" style="flex:0.5">{{item.name}}</span>
                    <Tooltip :content="item.company" placement="top-start" class="table-cell customer" style="flex2">
                      <div class="ellipsis" >{{item.company}}</div>
                    </Tooltip>
              <Tooltip :content="item.visitTime" placement="top-start" class="table-cell customer" style="flex:1">
                    <span class="table-cell">{{item.visitTime}}</span>
                     </Tooltip>
                  </li>        
                </ul>
              </div>
            </div>



          </div>
        </div>
    </div>
</template>

<script>
import './index.less';
import ToolTip from '~/components/ToolTip';
export default {
  name:'List',
  head(){
    return {
      title: '运营主页'
    }
  },
  data(){
     return {
       city:'',
       communityId:'',
       tab:'all',
       optionList:[],
       communityList:[],
       list:[],
       DueList:[],
       unpaidList:[],
       Overdue:[],
       appointment:[],
       nappointment:[],
         page:1,
        pageSize:100,
         remark1:'',
         remark2:'',
         ifHomePageFlag:'',


       pageData:{},

        joinData:[],
     }
  },
  components:{
    ToolTip
  },
  watch:{
    
    city(value){
      
      let list = this.optionList.filter(item=>{
        if(item.value == value){
          return true;
        }
        return false;
      })
      this.communityList = list[0].communitys;
      this.communityId = this.communityList[0].value;
    }
  },
  mounted(){
       
              this.getCommunityList();

  },
  methods:{
 
    //列表请求
    	getHomeList(){ 
        this.pageData={
          "settledCustomer":'',//现入住客户
          "settledMember":'',//先入住会员
          "allSeatsNum":'',//总数
           "allSpaceNum":'',//再组
          "noRentFixStationsNum":'',//固定办公
           "noRentMoveStationsNum":'',//移动办公桌
           "unusefulSeatsNum":'',//不可用工位数
           "unusefulFixStationsNum":'',//不可用办公桌
           "unusefulMoveStationsNum":'',//不可用移动办公室
           "unusefulSpaceNum":'',//不可用办公室个数
          "uneffectFixStationsNum":'',	//合同未生效固定办公桌数量	
          "uneffectMoveStationsNum":'', //	合同未生效移动办公桌数量		
          "uneffectSeatsNum":'',	//合同未生效工位数	
          "uneffectSpaceNum":'',	//合同未生效办公室个数
          "noRentFixStationsNum":'',	//未租固定办公桌数量		
          "noRentMoveStationsNum":'',	//未租移动办公桌数量		
          "noRentSeatsNum":'',	//未租工位数		
          "noRentSpaceNum":'',	//未租办公室个数		
          "rentFixStationsNum":'',	//在租固定办公桌数量		
          "rentMoveStationsNum":'',	//在租移动办公桌数量		
          "rentSeatsNum":'',	//在租工位数	
          "rentSpaceNum":'',	//在租办公室个数
        };
        // return ;
				this.$http.get('getOperating','').then((res)=>{
          // console.log('wwwwwwwwwww',res.data)
          this.pageData=res.data;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      
      
      //即将进场
      getComingList(){ 
        let data={
             ifHomePageFlag:'Y',
             communityId:this.communityId
        };
				this.$http.get('getImtPutawayList',data).then((res)=>{         
            // console.log('即将到期即将到期即将到期即将到期',res.data)
             this.list=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      //即将到期
      getDueList(){ 
            let data={
             ifHomePageFlag:'Y',
             communityId:this.communityId
        };
				this.$http.get('getDueList',data).then((res)=>{         
            // console.log('esesad',res.data)
             this.DueList=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      //起租未付
      getunpaidList(){ 
          let data={
             ifHomePageFlag:'Y',
             communityId:this.communityId
        };
				this.$http.get('unpaidList',data).then((res)=>{         
            console.log('esesad起租未付esesad起租未付esesad起租未付esesad起租未付',res.data)
             this.unpaidList=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      //逾期未付
      getOverdueList(){ 
              let data={
             ifHomePageFlag:'Y',
             communityId:this.communityId
        };
				this.$http.get('Overduelist',data).then((res)=>{         
            // console.log('esesad',res.data)
             this.Overdue=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
       //预约参观
      getAnappointmentListList(){ 
				this.$http.get('AnappointmentList','').then((res)=>{         
            // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',res.data)
             this.appointment=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
         //会员访客
      getAnappointmentList(params){ 
				this.$http.get('gitVisitorsList',params).then((res)=>{         
            // console.log('会员',res.data)
             this.nappointment=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
  
  
    getCommunityList(){
      this.$http.get('get-community-list', '').then( r => {
          this.optionList = r.data.map(item=>{

            item.communitys = item.communitys.map(value=>{
              let i = value;
              i.value = value.id + '';
              i.label = value.name;
              return i;
            })
            let obj = item;
            obj.value = item.id + '';
            obj.label = item.name;
            return obj;
          })
          this.city = this.optionList[0].value;
          this.communityId = this.optionList[0].communitys[0].value;
          console.log('wwwww11111111wwww',this.city);
          console.log('222222222222222',this.communityId);
      }).catch( e => {
        this.$Notice.error({
            title:e.message
        })
      })
    },
    changeCommunity(value){
      console.log('changeCommunity',value)
      this.communityId = value;
        this.getHomeList();
        this.getComingList();
        this.getDueList();
        this.getunpaidList();
        this.getOverdueList();
        this.getAnappointmentListList();
        this.getAnappointmentList();


    },
    changeTab(type){
      this.tab = type;
    },
    openCustomer(){
       window.open('/customer-manage/manage?pageSize=15&page=1&communityId='+this.community,'_blank')
    },
    openVisitor(){
      window.open('/new/#/community/visitor/list','_blank')
    },
      clappointment(){
      window.open('/new/#/community/communityManage/visitorsToRecord','_blank')
    },
    openEnter(){
      window.open('/inventory/enter-field','_blank')
    },
    openOver(){
      window.open('/inventory/over-date','_blank')
    },
    openOver(){
      window.open('/inventory/over-date','_blank')
    },
    openrented(){
      window.open('/inventory/rented-unpaid','_blank')
    },
    openOverUnpaid(type){
      window.open('/inventory/over-date-unpaid?type='+type,'_blank')
    },

  },
  created(){
        this.getComingList();

  }
 }
</script>
