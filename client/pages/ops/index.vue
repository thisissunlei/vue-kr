<template>
  <div class="g-ops">
      <SectionTitle title="运维工具管理"></SectionTitle>
      <div class="m-detail-content">
            <DetailStyle info="数据层">
               <div class="u-btn-list">
                    <a href="http://op.krspace.cn/api/op/druid/index.html" target="_blank" class="u-ops-btn">正式 druid-op 监控</a>
                    <a href="http://optest04.krspace.cn/api/op/druid/index.html" target="_blank" class="u-ops-btn">测试04 druid-op 监控</a>
               </div>
            </DetailStyle>
            <DetailStyle info="服务层">
                <div class="u-btn-list">
                        <a href="http://192.168.205.3:8077/#" target="_blank" class="u-ops-btn">正式dubbo监控</a>
                        <a href="http://192.168.205.2:8077/" target="_blank" class="u-ops-btn">测试01dubbo监控</a>
                        <a href="http://192.168.205.3:8077/" target="_blank" class="u-ops-btn">测试02dubbo监控</a>
                        <a href="http://192.168.206.3:8077/" target="_blank" class="u-ops-btn">测试03dubbo监控</a>
                        <a href="http://192.168.206.4:8077/" target="_blank" class="u-ops-btn">测试04dubbo监控</a>
                </div>
            </DetailStyle>
            <DetailStyle info="定时任务">
                 <div class="u-btn-list">
                        <a href="http://192.168.203.5:63391/#" target="_blank" class="u-ops-btn">正式dd定时</a>
                        <a href="http://192.168.205.2:8899/" target="_blank" class="u-ops-btn">测试01dd定时</a>
                        <a href="http://192.168.205.3:8899/" target="_blank" class="u-ops-btn">测试02dd定时</a>
                        <a href="http://192.168.206.3:8899/" target="_blank" class="u-ops-btn">测试03dd定时</a>
                        <a href="http://192.168.206.4:8899/" target="_blank" class="u-ops-btn">测试04dd定时</a>
                 </div>
            </DetailStyle>
            <DetailStyle info="消息中间件">
                 <div class="u-btn-list">
                      <a href="http://192.168.203.8:15672/#/" target="_blank" class="u-ops-btn">正式mq</a>
                 </div>
                
            </DetailStyle>
	  </div>
     
  </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';

export default {
    components:{
		DetailStyle,
		SectionTitle
	},
}
</script>

<style lang="less">
.g-ops{
    .m-detail-content{
        padding:30px 24px;
        a{
            display: inline-block;
            color:#2d8cf0;
            height:36px;
            line-height: 34px;
            border:1px solid #2d8cf0;
            border-radius: 4px;
            padding:0 16px;
            margin-right:15px;
            margin-bottom:16px;
            cursor: pointer;
            font-weight:500;
            &:hover{
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
                background-color:rgba(73,157,241,0.08);
            }
        }
        .u-btn-list{
           padding-left:15px;
           margin-bottom:10px;
        }
	}
}

</style>

