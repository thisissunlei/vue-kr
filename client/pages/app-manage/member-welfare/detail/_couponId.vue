<template>
  <div class="g-member-welfare-detail">
      	<SectionTitle title="会员福利-福利详情"></SectionTitle>
        <div class="m-detail-content">
            <DetailStyle info="基本信息">
                  <LabelText label="创建人：" style="width:1100px;">
                    {{basicInfo.createName}}
                  </LabelText>
                  <LabelText label="创建时间：" style="width:1100px;">
                    {{basicInfo.ctime}}
                  </LabelText>
            </DetailStyle>
             <DetailStyle info="领取情况">
                  <div class="u-table">
                      <Table border :columns="columns" :data="getinfoList"></Table>
                  </div>
            </DetailStyle>
             <DetailStyle info="展示信息">
                  <LabelText label="福利类型：" style="width:1100px;">
                    {{basicInfo.couponTypetxt}}
                  </LabelText>
                   <LabelText  label="福利标题：" style="width:1100px;">
                    {{basicInfo.title}}
                  </LabelText>
                  <LabelText label="福利描述：" style="width:1100px;">
                    {{basicInfo.descr}}
                  </LabelText>
                  <LabelText label="福利面值：" style="width:1100px;">
                    {{basicInfo.faceValue}}
                  </LabelText>
                  <div class="u-img-content">
                      <div class="u-img-title">福利封面：</div>
                      <div><img :src="basicInfo.couponCover" class="u-img-url">{{basicInfo.couponCover?'':'无'}}</div>
                  </div>
                  <LabelText label="福利标签：" style="width:1100px;">
                     <div v-if="basicInfo.tagsList">
                         <span 
                          v-for="(item,index) in basicInfo.tagsList" 
                          class="u-tag"
                          :key="index"
                        >{{item.name}}</span>
                     </div>
                    <div v-if="!basicInfo.tagsList">
                      无
                    </div>
                  </LabelText>
                   <LabelText label="内部会员提供：" style="width:1100px;">
                    {{basicInfo.fromInner==1?'是':'否'}}
                  </LabelText>
            </DetailStyle>
            <DetailStyle info="详细信息">
                  <LabelText label="详细地址：" style="width:1100px;">
                    {{basicInfo.merchantAddress?basicInfo.merchantAddress:'无'}}
                  </LabelText>
                  <LabelText label="地图坐标：" style="width:1100px;">
                    {{loacl}}
                  </LabelText>
                  <LabelText label="联系电话：" style="width:1100px;">
                    {{basicInfo.merchantPhone?basicInfo.merchantPhone:'无'}}
                  </LabelText>
                  <LabelText label="使用提示：" style="width:1100px;">
                    {{basicInfo.useRule?basicInfo.useRule:'无'}}
                  </LabelText>
                   <LabelText label="福利简介：" style="width:1100px;">
                    {{basicInfo.couponDetail}}
                  </LabelText>
                  <div class="u-img-content">
                      <div class="u-img-title">福利图册：</div>
                      <div class="u-img-list">
                        <img 
                          v-for="(item, index) in basicInfo.couponImgs"
                          :src="item.url" 
                          :key="index"
                          class="u-img-url" />
                    {{basicInfo.couponImgs && basicInfo.couponImgs.length>0?'':'无'}}
                    </div>
                  </div>
            </DetailStyle>
             <DetailStyle info="领取限制">
                 <LabelText label="福利范围：" style="width:1100px;">
                    <span v-if="basicInfo.couponScope==1">不限</span>
                    <div v-if="basicInfo.couponScope!=1">
                         <span 
                              v-for="(item,index) in basicInfo.citys" 
                              class="u-tag"
                              :key="index"
                          >{{item.name}}</span>
                    </div>
                  </LabelText>
                   <LabelText label="领取有效期：" style="width:1100px;">
                    {{basicInfo.indate}}
                  </LabelText>
                   <LabelText label="领取方式：" style="width:1100px;">
                    {{basicInfo.getWayTxt}}
                  </LabelText>
                   <LabelText   v-if="basicInfo.getWay=='ONLINE'" label="领取链接：" style="width:1100px;">
                    {{basicInfo.getUrl}}
                  </LabelText>
                  <div class="u-img-content" v-if="basicInfo.getWay=='OFFLINE'">
                      <div class="u-img-title">商户LOGO：</div>
                      <div><img :src="basicInfo.merchantLogo" class="u-img-url">{{basicInfo.merchantLogo?'':'无'}}</div>
                  </div>
                 
             </DetailStyle>
        </div>
  </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import dateUtils from 'vue-dateutils';

export default {
    components:{
      DetailStyle,
      LabelText,
      SectionTitle
    },
    head() {
       return {
            title: '福利详情-氪空间后台管理系统'
        }
  },
    data(){
      return{
        basicInfo:{
          tags:[],
        },
        getinfoList:[],
        tagList:[],
        loacl:'',
        columns:[
          {
              title: '会员收藏次数',
              key: 'collectCount',
              align:'center'	
          },
          {
              title: '会员领取次数',
              key: 'getCount',
              align:'center'	
          },
          {
              title: '会员发帖数',
              key: 'discussCount',
              align:'center'	
          },
          {
              title: '综合人气值',
              key: 'hotValue',
              align:'center'	
          },
        ]  
       
      }
    },
    mounted:function(){
        this.getTagList();
        this.getInfo();
        GLOBALSIDESWITCH("false")
	 },
   methods:{
      getTagList(){
          this.$http.get('get-coupon/tag-list', {name:this.tag}).then((res)=>{
              this.tagList=res.data.tags;
          }).catch((error)=>{
              this.$Notice.error({
                  title:error.message
              });
          });
      },
      getInfo(){
        var _this=this;
        let {params}=this.$route;
        let from={
          couponId:params.couponId
        };
        let type={
              'OFFLINESTORE':'线下门店',
              'USERLIFE':'会员生活',
              'ENTERPRISESERVICE':'企业服务',
            }
        let getWayType={
          'OFFLINE':'到店出示身份',
          'ONLINE':'在线领取',
          'DETAIL':'详情中展示'
        }

        this.$http.get('get-coupon-detail', from).then((res)=>{
                  let data = res.data;
                  let tags=[];
                  data.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(data.ctime));
                  data.couponTypetxt=type[data.couponType];
                  let tableinfo={
                    collectCount:data.collectCount,
                    getCount:data.getCount,
                    discussCount:data.discussCount,
                    hotValue:data.hotValue
                  }
                 
                  data.getWayTxt=getWayType[data.getWay];
                  this.tagList.map((tagItem)=>{
                    data.tagIds.map((idItem)=>{
                        if(tagItem.id==idItem){
                           tags.push(tagItem) 
                        }
                    })
                  })
                  data.tagsList=tags;
                  this.basicInfo = data;
                  this.getinfoList.push(tableinfo)
                  if(data.longitude && data.latitude){
                       this.loacl=`${data.longitude},${data.latitude}`
                  }else{
                       this.loacl='无'
                  }
                 

        }).catch((error)=>{
          this.$Notice.error({
              title:error.message
            });
        });
      },

	}

}
</script>
<style lang="less">
.g-member-welfare-detail{
  .m-detail-content{
      padding:30px 24px;
  }
   .u-img-content{
        width:100%;
        display: inline-block;
        margin-bottom:6px;
        .u-img-title{
            float:left;
            color: #333;
            margin-left:14px;
            font-weight: 700;
        }
        .u-img-url{
            max-width: 132px;
            max-height: 132px;
            float: left;
            margin-bottom:30px;
        }
    }
    .u-img-list{
      margin-bottom:15px;
    }
    .u-tag{
        padding:0 5px;
    }
    .u-table{
      padding:0 20px;
      margin-bottom:20px;
      box-sizing: border-box;
    }
    
}

</style>



