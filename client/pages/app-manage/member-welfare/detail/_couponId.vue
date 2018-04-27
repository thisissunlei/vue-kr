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
                  <LabelText label="会员点击次数：" style="width:1100px;">
                    {{basicInfo.getCount}}
                  </LabelText>
            </DetailStyle>
             <DetailStyle info="展示信息">
                  <LabelText label="福利类型：" style="width:1100px;">
                    {{basicInfo.couponType}}
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
                     <div v-if="basicInfo.tags.length>0">
                         <span 
                          v-for="(item,index) in basicInfo.tags" 
                          class="u-tag"
                          :key="index"
                        >{{item.name}}</span>
                     </div>
                    <div v-if="basicInfo.tags.length<=0">
                      无
                    </div>
                  </LabelText>
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
    data(){
      return{
        basicInfo:{
          tags:[],
        }
      }
    },
    mounted:function(){
        this.getInfo();
        GLOBALSIDESWITCH("false")
	 },
   methods:{
		
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

        this.$http.get('get-coupon-detail', from).then((res)=>{
                  let data = res.data;
                  data.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(data.ctime));
                  data.couponType=type[data.couponType];
                  this.basicInfo = data;

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
        }
        .u-img-url{
            max-width: 132px;
            max-width: 132px;
            float: left;
            margin-bottom:30px;
        }
    }
    .u-tag{
        padding:0 5px;
    }
    
}

</style>



