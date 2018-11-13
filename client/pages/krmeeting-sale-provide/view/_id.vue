<template>
    <div class="g-create-meeting">
         <SectionTitle title="查看优惠券发放信息"></SectionTitle>
         <div class="m-detail-content">
             <DetailStyle info="基本信息">
                 <LabelText label="发放说明：">
                    {{detailInfo.descr}}
                </LabelText>
                 <LabelText label="发放时间：">
                    {{detailInfo.ptime?changeTime('yyyy-MM-dd HH:mm:ss',detailInfo.ptime):'即时'}}
                </LabelText>
                 <LabelText label="发放对象：">
                    {{detailInfo.user}} <a class="u-file" v-if="detailInfo.userType=='UPLOAD'">{{detailInfo.fileName}}</a>
                </LabelText>
                <div class="u-phone-list" v-if="detailInfo.userType=='CUSTOM'">
                     <div class="u-small-trigon"></div>
                     {{detailInfo.phones}}
                </div>
              </DetailStyle>
              <DetailStyle info="优惠券信息">
                  <table class="u-table">
                    <thead>
                        <tr class="u-thead">
                            <th>优惠券ID</th>
                            <th>优惠券名称</th>
                            <th>备注</th>
                            <th>面额(元)</th>
                            <th>数量</th>
                            <th>有效期</th>
                            <th>创建时间</th>
                            <th>创建人</th>
                            <th>发放张数</th>
                        </tr>
                    </thead>
                    <tbody class="u-tabody">
                        <tr  
                        v-for="(item,index) in couponList"
                        :key="index"
                        >
                            <td>{{item.id}}</td>
                            <td>{{item.couponName}}</td>
                            <td>{{item.remark}}</td>
                            <td>{{item.amount}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{changeTimeType(item)}}</td>
                            <td>{{changeTime('YYYY-MM-DD HH:mm:ss',item.ctime)}}</td>
                            <td>{{item.creatorName}}</td>
                            <td>{{item.sendQuantity}}</td>
                        </tr>
                    </tbody>
                </table>
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
           detailInfo:{},
           couponList:[],
        }
    },
    mounted:function(){
        GLOBALSIDESWITCH("false");
        this.getDetailInfo();
    },
    methods:{
       getDetailInfo(){
            let {params}=this.$route;
            let userType={
                'ALL':'全部用户',
                'CUSTOM':'自定义用户',
                'UPLOAD':'上传手机号'
            }

            this.$http.get('get-kmcoupon-provide-detail',{id:params.id}).then((res)=>{
                let data=Object.assign({},res.data);
                data.user=userType[data.userType];
                this.couponList=data.baseInfoList || [];
                this.detailInfo=data;
              
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        changeTime(format,item){
             format=format?format:'YYYY-MM-DD HH:mm:ss';
            if(item){
                return dateUtils.dateToStr(format, new Date(item))
            }
        },
        changeTimeType(item){
            let time;
            if(item.expireType=='START_END_TIME'){
                time=this.changeTime("YYYY-MM-DD HH:mm:ss",item.effectAt)+'至'+this.changeTime("YYYY-MM-DD",item.expireAt)
            }else if(item.expireType=='VALID_DATE'){
                time=`${item.effectDay}天`
            }
            return time
        }
        
    }
    
}
</script> 
<style lang="less">
.g-create-meeting{
    .m-detail-content{
        width:100%;
        max-width: 1200px;
        box-sizing: border-box;
	    padding:30px 24px;
    }
    .u-file{
        color:#499df1;
        padding-left:20px;
        cursor: pointer;
    }
    .u-table{
		width:100%;
		border:1px solid #E1E6EB;
		border-collapse:collapse;
		font-size: 14px;
		td,th{
			height:40px;
			border:1px solid #E1E6EB;
			color: #666666;
			text-align: center;
		}
		.u-thead{
			background: #F5F6FA;
			th{
				color: #333333;
				font-weight: 400;
				
				
			}
		}
		.u-tabody{
			tr{
				&:hover{
					background: #F6F6F6;
				}
			}
		}
    }
    .u-phone-list{
        width:500px;
        min-height:50px;
        padding-top:20px;
        padding-left:16px;
        background:#F6F6F6;
        margin-bottom:14px;
        border-radius: 3px;
        position: relative;
         .u-small-trigon{
            width:0;
            height:0;
            border:6px solid transparent;
            border-bottom-color: #F6F6F6;
            position: absolute;
            top:-12px;
            left:100px;
        }
    }
}

</style>



