<template>
    <div class="g-create-meeting">
         <SectionTitle title="查看优惠券信息"></SectionTitle>
         <div class="m-detail-content">
             <DetailStyle info="基本信息">
                 <LabelText label="优惠券名称：">
                    {{detailInfo.couponName}}
                </LabelText>
                 <LabelText label="优惠券面额：">
                    {{detailInfo.amount}}
                </LabelText>
                 <LabelText label="优惠券类型：">
                    {{detailInfo.ruleType}}
                </LabelText>
                <LabelText label="发放数量：">
                    {{detailInfo.quantity}}份
                </LabelText>
              </DetailStyle>
              <DetailStyle info="基本规则">
                  <LabelText label="有效期类型：">
                    {{detailInfo.expireType}}
                </LabelText>
                 <LabelText label="每人限领：">
                    {{detailInfo.gainLimit}}次
                </LabelText>
                 <LabelText label="使用范围：">
                    {{detailInfo.usageType}}
                </LabelText>
                 <LabelText label="使用说明：" style="width:1000px;">
                    {{detailInfo.instructions}}
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
        SectionTitle,
        DetailStyle,
        LabelText
    },
    data(){
        
        return {
           detailInfo:{}
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
        this.getDetailInfo();
    },
    methods:{
       getDetailInfo(){
            let {params}=this.$route;
            let usageType={
                'ANY':'不限',
                'MEETING':'会议室',
                'SEAT':'散座'
            }

            this.$http.get('get-kmcoupon-detail',{id:params.id}).then((res)=>{
                let data=Object.assign({},res.data);
                data.usageType=usageType[data.usageType];
                data.effectAt=dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(data.effectAt));
                data.expireAt=dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(data.expireAt));

                if(data.ruleType=="NO_THRESHOLD"){
                    data.ruleType='无门槛金额';
                }else if(data.ruleType=="FULL_REDUCTION"){
                     data.ruleType=`满${data.frAmount}元可用`;
                }
                if(data.expireType=="START_END_TIME"){
                    data.expireType=`起止时间 ${data.effectAt} 至 ${data.expireAt}`;
                }
                

               
                this.detailInfo=data;
              
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        
        
        
        

       
    }
    
}
</script> 
<style lang="less">
.g-create-meeting{
    .u-community-check-list{
        margin-bottom:24px;
    }
    .m-detail-content{
        width:100%;
        max-width: 1200px;
        box-sizing: border-box;
	    padding:30px 24px;
    }
    .u-error{
        color: #ed3f14;
        font-size: 12px;
        margin-top:-20px;
        margin-bottom:12px;
    }
    .u-input{
        display: inline-block;
        width: 252px;
        max-width: 450px;
        margin-right:120px;
        vertical-align:top;
    }
   
    .u-date-txt{
        font-size: 14px;
        color: #666666;
        display: inline-block;
        width:30px;
        text-align: center;
    }
    
    .u-upload{
        width:100%;
       .ivu-form-item-label{
           width:100%;
           text-align: left;
       } 
    }
    .u-unload-label{
        font-size: 12px;
        line-height:30px;
        color:#495060;
    }
    .u-unload-tip{
        line-height:30px;
        text-indent: 12px;
        color:#495060;
        font-size: 12px;

    }
}

</style>



