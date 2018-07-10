<template>
    <div class="g-goods-detail">
        <SectionTitle title="查看社区商品"></SectionTitle>   
        <div class="m-goods-content">
            <DetailStyle info="社区基本信息">
                <LabelText label="社区名称：">
                    {{goodsInfo.communityName}}
                </LabelText>
                <LabelText label="大厦名称：">
                    {{goodsInfo.buildingName}}
                </LabelText>
                <LabelText label="正式开业状态：">
                   {{goodsInfo.area}}
                </LabelText>
                <LabelText label="正式开业时间：">
                    {{goodsInfo.openTime}}
                </LabelText>
                 <LabelText label="详细地址：">
                    {{goodsInfo.openTime}}
                </LabelText>
                <div class="u-img-content">
                    <div class="u-img-title">大厦外景图：</div>
                    <div><img :src="basicInfo.imgUrl" class="u-img-url">{{basicInfo.imgUrl?'':'无'}}</div>
                </div>
                <div class="u-img-content">
                    <div class="u-img-title">社区展示图册：</div>
                    <div><img :src="basicInfo.imgUrl" class="u-img-url">{{basicInfo.imgUrl?'':'无'}}</div>
                </div>
            </DetailStyle>
            <DetailStyle info="APP社区商品信息">
                <LabelText label="上架状态：">
                   {{goodsInfo.appMeeting}}
                </LabelText>
                <LabelText label="已上架会议室商品数量：">
                    {{goodsInfo.appMeeting}}
                </LabelText>
                <LabelText label="已上架散座商品数量：">
                    {{goodsInfo.appMeeting}}
                </LabelText>
            </DetailStyle>
            <DetailStyle info="小程序社区商品信息">
                <LabelText label="上架状态：">
                    {{goodsInfo.appMeeting}}
                </LabelText>
                <LabelText label="社区折扣策略：">
                    {{goodsInfo.appMeeting}}
                </LabelText>
                <LabelText label="已上架会议室商品数量：">
                   {{goodsInfo.meetingCount}}
                </LabelText>
                 <LabelText label="已上架散座商品数量：">
                   {{goodsInfo.kmMeeting}}
                </LabelText>
                <LabelText label="散座营业时段：">
                    {{goodsInfo.kmMeeting}}
                </LabelText>
                <!-- <LabelText label="不可预订日期策略：">
                    {{goodsInfo.kmMeeting}}
                </LabelText> -->
            </DetailStyle>
        </div>
    </div>
</template>

<script>
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import SectionTitle from '~/components/SectionTitle';
import UploadFile from '~/components/UploadFile';
import dateUtils from 'vue-dateutils';
export default {
    components:{
        DetailStyle,
		LabelText,
        SectionTitle,
        UploadFile
    },
    head(){
        return{
            title:"查看社区商品"
        }
    },
    data(){
        return{
            statusList:[
                {
                 label:'周末及节假日',
                 value:'true'   
                },
                {
                 label:'无',
                 value:'false'   
                },
            ],
            goodsInfo:{
                comName:"慈云社社区",
                comNumber:"BZJB",
                area:"北京市/北京市/朝阳区",
                openStatus:"已开业",
                openTime:"2017-3-3",
                buildname:"住邦2000",
                address:"北京市朝阳区八里庄西里100号住邦2000",
                coordinate:"116.501734，39.921302",
                appMeeting:"5层 6层",
                appStatus:"未上架",
                KMStatus:"未上架",
                discountMsg:"限时5折优惠",
                meetingCount:"5",
                kmMeeting:"5层 6层",
                dateSelect:"false"
            },
        }
    },
    mounted:function(){
		GLOBALSIDESWITCH("false")
    },
    methods:{
        getGoodsInfo(){
            var params = {communityId :this.$route.query.id };
            this.$http.get('get-krmting-mobile-community-detail', params).then((res)=>{
                this.goodsInfo = res.data
                
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        }
    }
}
</script>

<style lang="less">
    .g-goods-detail{
		.m-goods-content{
            padding:30px 24px;
            .input{
                width: 300px;
            }
        }
         .u-img-content{
            width:100%;
            display: inline-block;
            .u-img-title{
                float:left;
                font-weight: 500;
                color: #666666;
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


