<template>
    <div class="g-goods-detail">
        <SectionTitle title="查看社区商品"></SectionTitle>   
        <div class="m-goods-content">
            <DetailStyle info="社区基本信息">
                <LabelText label="社区名称：">
                    {{goodsInfo.comName}}
                </LabelText>
                <LabelText label="社区编码：">
                    {{goodsInfo.comNumber}}
                </LabelText>
                <LabelText label="所在地区：">
                   {{goodsInfo.area}}
                </LabelText>
                <LabelText label="开业状态：">
                    {{goodsInfo.openStatus}}
                </LabelText>
                <LabelText label="开业时间：">
                    {{goodsInfo.openTime}}
                </LabelText>
            </DetailStyle>
            <DetailStyle info="社区基本运营信息">
                <LabelText label="大厦名称：">
                    <Input v-model="goodsInfo.buildname" class="input"/>
                </LabelText>
                <LabelText label="地址描述：">
                    <Input v-model="goodsInfo.address" class="input"/>
                </LabelText>
                <LabelText label="社区坐标：">
                    <Input v-model="goodsInfo.coordinate" class="input"/>
                </LabelText>
                <LabelText label="大厦外景：">
                    <UploadFile></UploadFile>
                </LabelText>
                
            </DetailStyle>
            <DetailStyle info="APP商品信息">
                <LabelText label="上架状态：">
                    <RadioGroup v-model="goodsInfo.appStatus">
                        <Radio label="已上架">已上架</Radio>
                        <Radio label="未上架">未上架</Radio>
                    </RadioGroup>
                </LabelText>
                <LabelText label="APP可用会议室楼层：">
                    {{goodsInfo.appMeeting}}
                </LabelText>
            </DetailStyle>
            <DetailStyle info="KM会议室商品信息">
                <LabelText label="上架状态：">
                    <RadioGroup v-model="goodsInfo.KMStatus">
                        <Radio label="已上架">已上架</Radio>
                        <Radio label="待上架">待上架</Radio>
                        <Radio label="未上架">未上架</Radio>
                    </RadioGroup>
                </LabelText>
                <LabelText label="社区折扣策略：">
                    <Input v-model="goodsInfo.discountMsg" class="input"/>
                </LabelText>
                <LabelText label="KM可预订会议室数量（个）：">
                   {{goodsInfo.meetingCount}}
                </LabelText>
                 <LabelText label="KM可用会议室楼层：">
                   {{goodsInfo.kmMeeting}}
                </LabelText>
                <LabelText label="KM不可预定日期策略：">
                    <Select
                        v-model="goodsInfo.dateSelect"
                        style="width:100px"
                        placeholder="请选择"
                        clearable
                    >
                        <Option
                            v-for="item in statusList"
                            :value="item.value"
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                    </Select>
                </LabelText>
                <LabelText label="KM不可预定日期：">
                   <!-- <span v-on:mouseover="tipsShow" v-on:mouseout="tipsHide">
                        <Icon type="help-circled" style="font-size:18px;margin-left:-18px;margin-top:8px;"></Icon>
                    </span> -->
                    <!-- <div class="tips" v-show="isShow">
                        <p>温馨提示</p>
                        <p>① 灰色日期为不可预订日期</p>
                        <p>② 单击选中日期，即可设置该日期是否可预订</p>
                        <p>③ 默认所有周末为不可预订</p>
                    </div> -->
                </LabelText>
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
            var params = {orderId :this.$route.query.orderId };
            this.$http.get('', params).then((res)=>{
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
	}
</style>


