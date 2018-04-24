<template>
  <div class="g-member-welfare-detail">
      	<SectionTitle title="会员福利-福利详情"></SectionTitle>
        <div class="m-detail-content">
            <DetailStyle info="基本信息">
                  <LabelText label="创建人：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="创建时间：" style="width:1100px;">
                    {{basicInfo.incomeType}}
                  </LabelText>
            </DetailStyle>
             <DetailStyle info="领取信息">
                  <LabelText label="会员点击次数：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                   <LabelText label="会员已领取数量：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
            </DetailStyle>
             <DetailStyle info="展示信息">
                  <LabelText label="福利类型：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="福利标题：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="福利面值：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <div class="u-img-content">
                      <div class="u-img-title">福利封面：</div>
                      <div><img :src="basicInfo.imgUrl" class="u-img-url">{{basicInfo.imgUrl?'':'无'}}</div>
                  </div>
                  <LabelText label="福利标签：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
            </DetailStyle>
             <DetailStyle info="福利限制">
                  <LabelText label="领取有效期：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="可抵扣账单期限：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="发放总数量：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="每个团队限领数量：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
                  <LabelText label="每个会员限领数量：" style="width:1100px;">
                    {{basicInfo.id}}
                  </LabelText>
             </DetailStyle>
            <DetailStyle info="领取记录">
            
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
        basicInfo:{}
      }
    },
    mounted:function(){
        //this.getInfo();
        GLOBALSIDESWITCH("false")
	 },
   methods:{
		
      getInfo(){
        var _this=this;
        let {params}=this.$route;
        let from={
          notificationId:params.notificationId
        };

        this.$http.get('get-notification-detail', from).then((res)=>{
                  let data = res.data;
                  data.jump=jumplist[data.jumpType];
                  this.targetDetail=data.targetDetail || '';
                
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
    
}

</style>



