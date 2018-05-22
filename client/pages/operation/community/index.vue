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
            <Select v-model="community" @on-change="changeCommunity">
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
            <span class="content title">先入住客户</span>
            <span class="content number"><span>30</span>个</span>
          </div>
          <div class="card-two item">
            <span class="content">
              <img src="~/assets/images/member.png" alt="" style="margin:15px auto;width:30px;height:30px;margin-top:20px;">
            </span>
            <span class="content title">先入住会员</span>
            <span class="content number"><span>305</span>个</span>
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
                <span class="num" v-if="tab=='all'" style="font-size:44px;color: #232428;">255</span>
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: #232428;">25</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: #232428;">2</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: #232428;">0</span>
              </span>
              <span class="number">
                <span class="title">在租</span>
                <span class="num" v-if="tab=='all'" style="font-size:44px;color: #F5A623;">255</span>
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: #F5A623;">25</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: #F5A623;">2</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: #F5A623;">0</span>
              </span>
              <span class="number">
                <span class="title">合同未生效</span>
                <span class="num"  v-if="tab=='all'" style="font-size:44px;color: #FAD27B;">255</span>
                <span class="num" v-if="tab=='office'"  style="font-size:44px;color: #FAD27B;">25</span>
                <span class="num" v-if="tab=='fixedDest'"  style="font-size:44px;color: #FAD27B;">2</span>
                <span class="num" v-if="tab=='mobileDesk'"  style="font-size:44px;color: #FAD27B;">0</span>
              </span>
              <span class="number">
                <span class="title">未租</span>
                <span class="num" v-if="tab=='all'"style="font-size:44px;color: #35BC9B;">255</span>
                <span class="num" v-if="tab=='office'"style="font-size:44px;color: #35BC9B;">25</span>
                <span class="num" v-if="tab=='fixedDest'"style="font-size:44px;color: #35BC9B;">2</span>
                <span class="num" v-if="tab=='mobileDesk'"style="font-size:44px;color: #35BC9B;">0</span>
              </span>
              <span class="number">
                <span class="title">不可用</span>
                <span class="num" v-if="tab=='all'" style="font-size:44px;color: #8290A8;">255</span>
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: #8290A8;">25</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: #8290A8;">2</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: #8290A8;">0</span>
              </span>
            </div>
            
          </div>
        </div>
        <!-- 列表区 -->
        <div class="bill-list"> 
          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right" v-if="list.length">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>

              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂时还没有这方面数据哦亲~</div>
              </div>

              <div class="contents"  v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <Tooltip :content="item.id" placement="top-start" class="table-cell">
                        <div class="ellipsis">{{item.id}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.number}}</span>
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer" >
                      <div class="ellipsis">{{item.customer}}</div>
                    </Tooltip>
                    <span class="table-cell">{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left">即将到期  ></div>
                <div class="header-right" v-if="list.length">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂时还没有这方面数据哦亲~</div>
              </div>
              <div class="contents" v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                     <Tooltip :content="item.id" placement="top" class="table-cell">
                        <div class="ellipsis" >{{item.id}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.number}}</span>
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer">
                      <div class="ellipsis">{{item.customer}}</div>
                    </Tooltip>
                    <span class="table-cell">{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>

          </div>
          <div class="line-one">
           <div class="box">
              <div class="header">
                <div class="header-left">已起租未付   ></div>
                <div class="header-right" v-if="list.length">
                  <span style="color: #FF6868;">19</span><span style="font-size:12px">笔</span>/共
                  <span style="color: #FF6868;">3033333</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <div class="ellipsis table-cell"  style="color:#4A90E2;flex:2">{{item.id}}</div>
                    
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer">
                      <div class="ellipsis" >{{item.customer}}</div>
                    </Tooltip>
                    <span  class="table-cell">3232313元</span>
                    <span class="table-cell">{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left">逾期未付(工位) ></div>
                <div class="header-right" v-if="list.length">
                  <span style="color: #FF6868;">19</span><span style="font-size:12px">笔</span>/共
                  <span style="color: #FF6868;">3033333</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <div class="ellipsis table-cell"  style="color:#4A90E2">{{item.id}}</div>
                    
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer">
                      <div class="ellipsis">{{item.customer}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.number}}元</span>
                    <span class="table-cell">{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
            

            <div class="box">
              <div class="header">
                <div class="header-left">逾期未付(会议室) ></div>
                <div class="header-right" v-if="list.length">
                  <span style="color: #FF6868;">19</span><span style="font-size:12px">笔</span>/共
                  <span style="color: #FF6868;">3033333</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <div class="ellipsis table-cell"  style="color:#4A90E2;">{{item.id}}</div>
                    
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer">
                      <div class="ellipsis">{{item.customer}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.number}}元</span>
                    <span class="table-cell">{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>


            <div class="box">
              <div class="header">
                <div class="header-left">逾期未付(打印) ></div>
                <div class="header-right" v-if="list.length">
                  <span style="color: #FF6868;">19</span><span style="font-size:12px">笔</span>/共
                  <span style="color: #FF6868;">3033333</span><span style="font-size:12px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了! 没有逾期的账单 !</div>
              </div>
              <div class="contents" v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <div class="ellipsis table-cell"  style="color:#4A90E2;">{{item.id}}</div>
                    
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer">
                      <div class="ellipsis">{{item.customer}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.number}}元</span>
                    <span class="table-cell">{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left">预约参观  ></div>
              </div>
              <div class="contents" style="text-align:center">
                <img src="~/assets/images/waiting.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">小哥哥小姐姐正在尽全力开发，敬请期待哦亲~</div>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left">会员访客   ></div>
                <div class="header-right" v-if="list.length">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">人</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂时还没有这方面数据哦亲~</div>
              </div>

              <div class="contents" v-if="list.length">
                <ul >
                  <li v-for="item in list" >
                    <span class="table-cell ellipsis" style="flex:2">{{item.id}}</span>
                    <span class="table-cell"> → </span>
                    <Tooltip :content="item.customer" placement="top" class="table-cell customer" style="flex:5">
                      <div class="ellipsis" >{{item.customer}}</div>
                    </Tooltip>
                    <span class="table-cell">{{item.date}}</span>
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
       community:'',
       tab:'all',
       optionList:[],
       communityList:[],
       list:[],
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
    }
  },
  mounted(){
    this.getCommunityList()
  },
  methods:{
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
          this.community = this.optionList[0].communitys[0].value;
      }).catch( e => {
        this.$Notice.error({
            title:e.message
        })

      })
    },
    changeCommunity(value){
      console.log('changeCommunity',value)
      this.community = value
    },
    changeTab(type){
      this.tab = type;
    },
    openCustomer(){
       window.open('/customer-manage/manage?pageSize=15&page=1&communityId='+this.community,'_blank')
    }

  }
 }
</script>
