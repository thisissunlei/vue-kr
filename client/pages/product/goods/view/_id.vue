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
                   {{goodsInfo.communityStatus}}
                </LabelText>
                <LabelText label="正式开业时间：">
                    {{goodsInfo.openDate}}
                </LabelText>
                 <LabelText label="详细地址：">
                    {{goodsInfo.communityAddress?goodsInfo.communityAddress:'-'}}
                </LabelText>
                <div class="u-img-content">
                    <div class="u-img-title">大厦外景图：</div><span>{{goodsInfo.buildingImg?'':'无'}}</span>
                    <div v-if="goodsInfo.buildingImg">
                        <img :src="goodsInfo.buildingImg" class="u-img-url">
                    </div>
                    
                </div>
                <div class="u-img-content">
                    <div class="u-img-title">社区展示图册：</div><span v-if="!goodsInfo.communityImgs">无</span>
                    <div style="display:block;width:100%;" v-if="goodsInfo.communityImgs">
                        <img 
                            :src="item" 
                            :key="index"
                            class="u-img-url"
                            v-for="(item,index) in goodsInfo.communityImgs"
                         >
                    </div>
                </div>
            </DetailStyle>
            <DetailStyle info="APP社区商品信息">
                <LabelText label="上架状态：">
                   {{goodsInfo.appPublished}}
                </LabelText>
                <LabelText label="已上架会议室商品数量：">
                    {{goodsInfo.appRoomNum}}
                </LabelText>
                <LabelText label="已上架散座商品数量：">
                    {{goodsInfo.appSeatNum}}
                </LabelText>
            </DetailStyle>
            <DetailStyle info="小程序社区商品信息">
                <LabelText label="上架状态：">
                    {{goodsInfo.kmPublished}}
                </LabelText>
                <LabelText label="社区折扣策略：">
                    {{goodsInfo.promotionDesc?goodsInfo.promotionDesc:'-'}}
                </LabelText>
                <LabelText label="已上架会议室商品数量：">
                   {{goodsInfo.kmRoomNum}}
                </LabelText>
                 <LabelText label="已上架散座商品数量：">
                   {{goodsInfo.kmSeatNum}}
                </LabelText>
                <LabelText label="散座营业时段：">
                    {{goodsInfo.kmStartTime}}-{{goodsInfo.kmEndTime}}
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
            goodsInfo:{},
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false")
        this.getGoodsInfo();
    },
    methods:{
        getGoodsInfo(){
            let {params}=this.$route;
            let form={
                communityId: params.id
             }
            let appPublish={
                '1':'已上架',
                '0':'未上架'
            }
            let kmPublished={
                '2':'已上架',
                '0':'未上架',
                '1':'待上架'
            }
            let communityStatus={
                '1':'已开业',
                '0':'未开业'
            }
            this.$http.get('get-krmting-mobile-community-detail',form).then((res)=>{
                let data=Object.assign({},res.data);
                data.appPublished=appPublish[res.data.appPublished];
                data.kmPublished=kmPublished[res.data.kmPublished];
                data.communityStatus=communityStatus[res.data.communityStatus];
                this.goodsInfo = data;
                
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
             margin-bottom:24px;
            .u-img-title{
                color: #333333;
                margin-left:14px;
                display: inline-block;
                font-weight: bold;
            }
            .u-img-url{
                max-width: 132px;
                max-width: 132px;
                float: left;
                margin-right:20px;
            }
        }
	}
</style>


