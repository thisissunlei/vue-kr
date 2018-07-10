<template>
  <div class="g-device-detail-box">
      <SectionTitle title="硬件设备详情"></SectionTitle>
      <div class="g-device-detail">
            <Button 
                type="primary" 
                icon="ios-refresh-empty" 
                class="fresh-btn"  
                @click="freshReportInfo"
                v-if="SecondeVersion"
            >
                刷新设备上报信息
            </Button>
            <div class="device-detail-info">
                <div class="connect-info info-box">
                    <div class="item-info">
                        <span>硬件ID：</span><span>{{deviceVO.deviceId}}</span>
                    </div>
                    <div class="item-info" v-if="!SecondeVersion">
                        <span>锁是否连接：</span><span>{{deviceDetail.lockConnected?"已连接":"未连接"}}</span>
                    </div>
                    <div class="item-info" v-if="!SecondeVersion">
                        <span>屏幕是否连接：</span><span>{{deviceDetail.screenConnected?"已连接":"未连接"}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>标记：</span><span>{{deviceVO.name}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>底层固件版本：</span><span>{{deviceVO.driverV}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>APP版本：</span><span>{{deviceVO.v}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>IP地址：</span><span>{{deviceVO.ip}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>当前连接服务器：</span><span>{{deviceVO.loginedServer}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>最后连接时间：</span><span>{{this.returnDate(deviceVO.loginedUtime)}}</span>
                    </div>
                    <div class="item-info" v-if="SecondeVersion">
                        <span>最后断开时间：</span><span>{{this.returnDate(deviceVO.logoutTime)}}</span>
                    </div>
                    <div class="json-str" v-if="SecondeVersion">
                        <div class="half-div"><span>设备上报信息:</span><span><pre id="json-str-report"></pre></span></div>
                        <div class="half-div"><span>设备影子信息:</span><span><pre id="json-str-desired"></pre></span></div>
                    </div>
               
                    <div class="item-info">
                        <span>社区名称：</span><span>{{deviceDetail.communityName}}</span>
                    </div>
                    <div class="item-info" >
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
                        <span>二维码有效期：</span><span>{{this.returnDate(deviceDetail.qrExpireAt)}}</span>
                    </div>
                    <div class="block-line">
                        <span>二维码地址：</span><span>{{deviceDetail.qrImgUrl}}</span>
                    </div>
                    <div class="block-line">
                        <span>二维码：</span>
                        <img :src="deviceDetail.qrImgUrl" class="qrStyle"/>
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
         deviceVO : {},
         SecondeVersion : true,
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.getdeviceDetail();
   },
   methods:{
       
        getdeviceDetail(){

            let _this =this;
            let params = {id: this.$route.query.id || ''};
            let maker = this.$route.query.maker;
            var url ;
            if(maker == "KRSPACE"){
                this.SecondeVersion = true;
                url = 'get-smart-hardware-door-device-detail'
            }else{
                this.SecondeVersion = false;
                url = 'get-smart-hardware-door-device-detail-v1'
            }
            this.$http.get(url,params).then((res)=>{
                if(maker == "KRSPACE"){
                    this.deviceDetail = res.data;
                    this.deviceVO= res.data.deviceVO || {};
                    if(res.data.deviceVO){
                        document.getElementById('json-str-report').innerHTML= _this.syntaxHighlight(this.deviceVO.reported);
                        document.getElementById('json-str-desired').innerHTML= _this.syntaxHighlight(this.deviceVO.desired);
                    }
                }else{
                    this.deviceVO= res.data;
                    this.deviceDetail = res.data;
                }
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
        },

        freshReportInfo(){
            let _this =this;
            let params = {deviceId: this.deviceVO?this.deviceVO.deviceId:''};
            this.$http.get('get-smart-hardware-report-info',params).then((res)=>{
                
                document.getElementById('json-str-report').innerHTML= _this.syntaxHighlight(res.data.reported);
                   
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
        },
        returnDate(timestamp){
            if(!timestamp){
                return "无"
            }
            return  dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(timestamp))
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
                padding: 10px;
                p{
                    font-size: 18px;
                    font-weight: 500;
                }
                .item-info{
                    margin-top:5px;
                    display: inline-block;
                    width: 25%;
                    span{
                        font-size:14px;
                    }
                }
                .block-line{
                    margin-top:5px;
                    span{
                        font-size:14px;
                    }
                    .qrStyle{
                        width:50px;
                        height:50px;
                    }
                }
                .json-str{
                    margin-top:5px;
                    span{
                       font-size:14px; 
                    }
                    .half-div{
                        display: inline-block;
                        width:50%;
                        vertical-align:top;
                    }
                }
            }
        }
    
    }
</style>





