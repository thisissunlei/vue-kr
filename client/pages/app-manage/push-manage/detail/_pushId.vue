<template>

<div class="g-push-detail">
	<SectionTitle title="推送详情"></SectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="创建人：">
				{{basicInfo.createrName}}
			</LabelText>
			<LabelText label="创建时间：">
				{{basicInfo.ctime}}
			</LabelText>
			<LabelText label="推送目标用户：">
				{{basicInfo.targetDesc}}
			</LabelText>
            <div class="u-merber-content" v-if="basicInfo.targetType=='2'">
                 <div class="u-small-trigon"></div>
                 <LabelText label="所在社区：">
                    {{targetDetail.cmtName}}
                </LabelText>
                 <LabelText label="性别：">
                    {{targetDetail.genderDesc?targetDetail.genderDesc:'-'}}
                </LabelText>
                 <LabelText label="已入驻时长：">
                    {{targetDetail.enterTimeDesc?targetDetail.enterTimeDesc:'-'}}
                </LabelText>
                <LabelText label="当前月份：">
                    {{targetDetail.birthMonthDesc?targetDetail.birthMonthDesc:'-'}}
                </LabelText>
                <LabelText label="企业管理员用户：">
                    {{targetDetail.leaderDesc?targetDetail.leaderDesc:'-'}}
                </LabelText>
            </div>
		</DetailStyle>
         <DetailStyle info="推送显示内容">
             <LabelText label="推送标题：" style="width:1100px;">
				{{basicInfo.title?basicInfo.title:'-'}}
			</LabelText>
			<LabelText label="推送内容：" style="width:1100px;" >
				{{basicInfo.content}}
			</LabelText>
			
		</DetailStyle>
        <DetailStyle info="推送显示内容">
            <LabelText label="后续动作：">
				{{basicInfo.jump}}
			</LabelText>
            <div class="u-jump-content" v-if="basicInfo.jumpType!='HOMEPAGE'">
                 <div class="u-small-trigon"></div>
                 <div class="u-jump-desc">
                     {{basicInfo.jumpDesc}}
                 </div>
            </div>
            
        </DetailStyle>
	</div>
</div>

</template>

<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import SectionTitle from '~/components/SectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		LabelText,
		SectionTitle
    },
    head () {
        return {
            title: "推送详情-氪空间后台管理系统"
        }
    },
	data(){
		return{
            basicInfo:{},
            targetDetail:{},
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
			let jumplist={
               'HOMEPAGE':'启动页APP（至首页）' ,
               'ACTIVITY':'跳转活动',
               'HTML':'跳转外链'
            }
			let from={
				pushId:params.pushId
			};
			this.$http.get('get-app-push-detail', from).then((res)=>{
                let data = res.data;
                data.jump=jumplist[data.jumpType];
                this.targetDetail=data.targetDetail || '';
                if(data.jumpType=='HTML'){
                     data.jumpDesc=data.jumpUrl;
                }else if(data.jumpType=='ACTIVITY'){
                     data.jumpDesc=data.activityTitle;
                }
                
               
                this.basicInfo = data;
			}).catch((error)=>{
				this.$Notice.error({
						title:error.message
					});
			});
			
		},
	},




}


</script>

<style lang="less">

.g-push-detail{
	.m-detail-content{
        padding-top:30px;
        .ui-label{
            font-weight: 500;
            color:#666666;
        }
    }
    .u-merber-content{
        width:570px;
        height:132px;
        padding-top:20px;
        padding-left:16px;
        background:#F6F6F6;
        margin-bottom:30px;
        border-radius: 3px;
        margin-left:14px;
        position: relative;
        margin-top:-5px;
        .u-small-trigon{
            width:0;
            height:0;
            border:6px solid transparent;
            border-bottom-color: #F6F6F6;
            position: absolute;
            top:-12px;
            left:130px;
        }
    }
    .u-jump-content{
        position: relative;
        .u-small-trigon{
            width:0;
            height:0;
            border:6px solid transparent;
            border-bottom-color: #F6F6F6;
            position: absolute;
            top:-16px;
            left:110px;
        }
        .u-jump-desc{
            background:#F6F6F6;
            color:#666666;
            display: inline;
            line-height:40px;
            font-size:14px;
            padding:16px;
            border-radius: 3px;
            margin-left: 14px;
        }
    }
}

</style>

