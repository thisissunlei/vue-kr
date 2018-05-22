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
          <div class="card-one item">
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
              <span class="title active">全部工位数</span>
              <span class="title">独立办公室(30间)</span>
              <span class="title">固定办公桌(10个)</span>
              <span class="title">移动办公桌(5个)</span>
            </div>
            <div class="content">
              <span class="number">
                <span class="title">总数</span>
                <span class="num" style="font-size:44px;color: #232428;">255</span>
              </span>
              <span class="number">
                <span class="title">在租</span>
                <span class="num" style="font-size:44px;color: #F5A623;">255</span>
              </span>
              <span class="number">
                <span class="title">合同未生效</span>
                <span class="num" style="font-size:44px;color: #FAD27B;">255</span>
              </span>
              <span class="number">
                <span class="title">未租</span>
                <span class="num" style="font-size:44px;color: #35BC9B;">255</span>
              </span>
              <span class="number">
                <span class="title">不可用</span>
                <span class="num" style="font-size:44px;color: #8290A8;">255</span>
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
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>


            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>


            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>

            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
                  </li>        
                </ul>
              </div>
            </div>


            <div class="box">
              <div class="header">
                <div class="header-left">即将进场  ></div>
                <div class="header-right">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">个</span>/
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">工位</span>
                </div>
              </div>
              <div class="contents">
                <ul >
                  <li v-for="item in list" >
                    <span>{{item.id}}</span>
                    <span>{{item.number}}</span>
                    <span>{{item.customer}}</span>
                    <span>{{item.date}}</span>
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
       optionList:[],
       communityList:[],
       list:[
        {
          id:111,
          number:'2哥',
          customer:'上海今日头条科技有限公司 ',
          date:'3日后  '
        },
        {
          id:111,
          number:'2哥',
          customer:'上海今日头条科技有限公司 ',
          date:'3日后  '
        },
        {
          id:111,
          number:'2哥',
          customer:'上海今日头条科技有限公司 ',
          date:'3日后  '
        },
        {
          id:111,
          number:'2哥',
          customer:'上海今日头条科技有限公司 ',
          date:'3日后  '
        },
       ],
     }
  },
  components:{
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
    }

  }
 }
</script>
