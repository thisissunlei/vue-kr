<template>
  <div class="g-device-detail-box">
      <SectionTitle title="硬件设备详情"></SectionTitle>
      <div class="g-device-detail">
            <Button type="primary" icon="ios-refresh-empty" class="fresh-btn">刷新设备上报信息</Button>
            <div class="device-detail-info">
                <div class="connect-info info-box">
                    <p>连接信息</p>
                    <div class="item-info">
                        <span>硬件ID：</span><span>{{deviceVO.deviceId}}</span>
                    </div>
                    <div class="item-info">
                        <span>标记：</span><span>{{deviceVO.name}}</span>
                    </div>
                    <div class="item-info">
                        <span>底层固件版本：</span><span>{{deviceVO.driverV}}</span>
                    </div>
                    <div class="item-info">
                        <span>APP版本：</span><span>{{deviceVO.v}}</span>
                    </div>
                    <div class="item-info">
                        <span>IP地址：</span><span>{{deviceVO.ip}}</span>
                    </div>
                    <div class="item-info">
                        <span>当前连接服务器：</span><span>{{deviceVO.loginedServer}}</span>
                    </div>
                    <div class="item-info">
                        <span>最后连接时间：</span><span>{{deviceVO.loginedUtime}}</span>
                    </div>
                    <div class="item-info">
                        <span>最后断开时间：</span><span>{{deviceVO.logoutTime}}</span>
                    </div>
                    <div class="json-str">
                        <div><span>设备上报信息:</span><span><pre id="json-str-report"></pre></span></div>
                        <div><span>设备影子信息:</span><span><pre id="json-str-desired"></pre></span></div>
                    </div>
                </div>
                <div class="basic-info info-box">
                    <p>基本信息</p>
                    <div class="item-info">
                        <span>社区名称：</span><span>{{deviceDetail.communityName}}</span>
                    </div>
                    <div class="item-info">
                        <span>楼层：</span><span>{{deviceDetail.floor}}</span>
                    </div>
                    <div class="item-info">
                        <span>房间：</span><span>{{deviceDetail.roomName}}</span>
                    </div>
                    <div class="item-info">
                        <span>门类型：</span><span>{{deviceDetail.doorTypeName}}</span>
                    </div>

                    <div class="item-info">
                        <span>屏幕展示编号：</span><span>{{deviceDetail.doorCode}}</span>
                    </div>
                    <div class="item-info">
                        <span>屏幕展示标题：</span><span>{{deviceDetail.title}}</span>
                    </div>
                    <div class="item-info">
                        <span>厂家：</span><span>{{deviceDetail.makerName}}</span>
                    </div>
                    <div class="item-info">
                        <span>二维码有效期：</span><span>{{deviceDetail.qrExpireAt}}</span>
                    </div>
                    <div class="block-line">
                        <span>二维码地址：</span><span>{{deviceDetail.qrImgUrl}}</span>
                    </div>
                    <div class="block-line">
                        <span>二维码：</span><span>{{deviceDetail.qrExpireAt}}</span>
                    </div>
                    <div class="block-line">
                        <span>备注：</span><span>{{deviceDetail.memo}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';


export default {
   components:{
      SectionTitle,
   },
   data(){
     return{
         deviceDetail : {},
         deviceVO : {}
     }
   },
   created(){

   },
   mounted(){
       this.getdeviceDetail();
   },
   methods:{
       
        getdeviceDetail(){

            let _this =this;
            let params = {id: this.$route.query.id || ''};
                this.$http.get('get-smart-hardware-door-device-detail',params).then((res)=>{
                    this.deviceDetail = res.data;
                    this.deviceVO= res.data.deviceVO;
                    if(res.data.deviceVO){
                        document.getElementById('json-str-report').innerHTML= _this.syntaxHighlight(this.deviceVO.reported);
                        document.getElementById('json-str-desired').innerHTML= _this.syntaxHighlight(this.deviceVO.desired);
                    }
                    console.log("res",res);
                }).catch((error)=>{
                    _this.$Notice.error({
                        title:error.message
                    });
                })
        },
        syntaxHighlight(json){
            if(!json){
                return;
            }
            json = JSON.parse(json);
            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
      
      
   }

}
</script>
<style lang="less">
    .g-device-detail-box{
        .g-device-detail{
            padding:10px 20px;
            .string { color: green; }
            .number { color: darkorange; }
            .boolean { color: blue; }
            .null { color: magenta; }
            .key { color: red; }
            .fresh-btn{
                margin-left:5px;
            }
            .info-box{
                margin: 20px 0 ;
                border: solid 1px #eee;
                border-radius: 6px;
                padding: 10px;
                box-shadow: 10px 10px 20px #d5d4d4;
                p{
                    font-size: 18px;
                    font-weight: 500;
                }
                .item-info{
                    margin-top:5px;
                    display: inline-block;
                    width: 33%;
                    span{
                        font-size:14px;
                    }
                }
                .block-line{
                    margin-top:5px;
                    span{
                        font-size:14px;
                    }
                }
                .json-str{
                    margin-top:5px;
                    span{
                       font-size:14px; 
                    }
                }
            }
        }
    
    }
</style>





