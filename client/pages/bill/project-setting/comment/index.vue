<template>
    <div class="g-icon-manage comment">
        <div class='comment-title'>
          <!-- <div class='title-right'><Button  type="default" style="color:#4F9EED;border:1px solid #4F9EED;background-color:#fff"  >终止该项目</Button> <Button  type="default" style="color:#4F9EED;border:1px solid #4F9EED;background-color:#fff" @click="openProject" >项目成员</Button> <Button  type="default" style="color:#4F9EED;border:1px solid #4F9EED;background-color:#fff" >查看编辑纪录</Button> <Button type="primary" >编辑档案</Button></div>

                    <div class='title-left'>
                        <div class='title-name-line'><span class='title-name' @click="goback"  style="cursor: pointer;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目管理系统&nbsp;|</span>

                        <span  style="color:#499DF1;font-size:14px">>{{city}}-{{name}}</span>
                        </div>

                    </div> -->
          </div>
           <PublicHander :name="name" :city="city" :isComment="true" @goback="goback" />
        <div class="div-two" id ="divTwoId">
            <div style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
                <div style="float:right">
                    <Button type="primary" size="small" @click="addClickMethod">添加备注</Button>
                </div>
                <div style="border-left:5px solid #4b9ce4;padding-left:5px">项目备注</div>
            </div>
            <div v-if="comments.length>0">
            <Scroll :on-reach-bottom="getcomments" :height='heightDiv' style="overflow-y:auto">
                <div dis-hover v-for="(item, index) in comments" :key="index" style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
                    <div :style="{float:'left',borderRadius:'50%',backgroundColor:'rgb(68, 187, 243)',width:'50px',height:'50px',lineHeight:'50px',textAlign:'center',color:'#fff'}">{{item.creator.length>2?item.creator.slice(item.creator.length-2,3):item.creator}}</div>
                    <div style="margin-left:66px;min-height:60px">
                        <div style="height:25px">
                            <div style="float:left">
                                <span style="margin:0;padding:0;font-size:14px;">{{item.creator}}</span>&nbsp;&nbsp;<span style="color:#c1c1c1">{{item.cTime |data }}</span>
                            </div>
                            <div style="float:right">
                                <!-- <a v-if="!item.canDel" @click='replyMethod(item.id,item.creator)'>回复</a> -->
                                <a  @click="confirm(item.id)"  v-if="item.canDel">删除</a>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                        <div style="text-align:left">
                            <div v-if="false"><span><span style="color:#ccc"> 回复了&nbsp;&nbsp;</span><span>{{item.replyCreator}}:</span></span>
                            </div>
                            <span>
                          {{item.comment}}
                        </span>
                        </div>
                        <div v-for="(img1,index) in item.photo" :key="index" style="width:130px;height:100px;text-align:center;display:inline-block;float:left;overflow:hidden">
                         <img :src="img1.preUrl" @click='queryImgMethod(item.photo,index)' style="float:left;height:100%;padding:5px;" alt="">
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </Scroll>
            </div>
            <div v-else style="height:50px;line-height50px;text-align:center;font-size:20px">
                <img src="data:image/png;base64,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" alt="">
            </div>

        </div>
        <div class="div-one" id="divOneId">
            <div style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">

                <div style="border-left:5px solid #4b9ce4;padding-left:5px;text-align:left">项目档案</div>
            </div>
            <Row>
              <div class="row-info-one">
                <div style="fontSize:16px;text-align:left;padding-top:10px">
                    <Col span="8" style="padding-left:10px">核心信息</Col>
                    <Col span="8"> &nbsp;</Col>
                    <Col span="8"> &nbsp;</Col>
                </div>
                <div>
                    <Col span="8" v-for='(item,index) in  typeCodeInfo' :key="item.id" style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">{{item.displayName}}</div>
                        <OverFlowLabel style="font-size:16px;color:#333;maxHeight:50px;overflow:hidden" :label="item.fieldValue?item.fieldValue:'-'" />
                    </Col>
                    <Col span="8" v-for='(item,index) in  coreinfoBusiness' :key="item.id" style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">{{item.displayName}}</div>
                        <OverFlowLabel style="font-size:16px;color:#333;maxHeight:50px;overflow:hidden" :label="item.fieldValue?item.fieldValue:'-'" />
                    </Col>
                    <Col span="8" v-for='(item,index) in  coreinfoFinance' :key="item.id" style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">{{item.displayName}}</div>
                        <div style="font-size:16px;color:#333;maxHeight:50px;overflow:hidden">
                            <OverFlowLabel :label="item.fieldValue?item.fieldValue:'-'" />
                        </div>
                    </Col>
                </div>

              </div>
              <div class="row-info-middle" style="float:left;width:100%"><span  style="color：#aaa;display: inline-block;">以下为完整档案 </span></div>
               <div class="row-info-two">
                    <Col span="12"  >
                        <div  class="info-title" style="color:#4F9EED"><div @click="getInfo(1)"   :style="isClick?{borderBottom:'2px solid #4F9EED',textAlign:'center', cursor: 'pointer'}:{textAlign:'center'}">物业档案</div></div>
                    </Col>
                    <Col span="12">
                        <div><div @click="getInfo(2)"  class="info-title"   :style="!isClick?{borderBottom:'2px solid #4F9EED' ,textAlign:'center'}:{textAlign:'center', cursor: 'pointer'}">产品档案</div></div>
                    </Col>
                    <div v-for=" item in  propertyData" :key="item.id">
                      <div style="float:left;width:100%">
                          <Col span="8" >
                          <div  style="padding-left:5px;font-size:16px;padding-bottom:10px">{{item.label}}</div>

                        </Col>
                        <Col span="8" >
                            &nbsp;
                        </Col>
                        <Col span="8" >
                            &nbsp;
                        </Col>
                        </div>
                          <div style="float:left;width:100%">
                            <template v-for="data in item.data" >

                                  <div v-if="data.fieldType =='FILE' && data.fieldValue.length>0 ">
                                    <Col span="24" :key="data.id">
                                    <div style="padding-left:5px;color:#aaa;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                         <UpFiles :value="data.fieldValue" :commentColor="true" style="overflow:hidden"></UpFiles>
                                    </Col>
                                  </div>
                                  <div v-else>

                                     <Col span="8" :key="data.id">
                                      <div style="padding-left:5px;color:#aaa;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                      <div style="padding-left:5px;font-size:12px;;margin:5px 0">{{data.fieldValue && !Array.isArray(data.fieldValue) ?data.fieldValue : "-"}}</div>
                                    </Col>
                                  </div>

                            </template>

                      </div>
                    </div>


               </div>
            </Row>
        </div>
        <Modal v-model="modal2" width=600 id='modal2'>
            <div style='width:560px'>
                <img :src='modal2ImgUrl'  style='width:560px;'>
            </div>
        </Modal>
        <Modal v-model="modal1" :mask-closable="false" :title="modlalTitle">
            <div slot='footer'>
                <Button type="default" @click='cancel'>取消</Button>
                <Button type="info" @click='ok'>确定</Button>
            </div>
            <Form :model="formItem" ref="ruleValidate" :rules="ruleValidate">
                <FormItem prop="comment">
                    <Input   v-model="formItem.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="placeholder">
                    </Input>
                </FormItem>
            </Form>

            <div class="demo-upload-list" v-for="item in uploadList" :key='item.id'>
                <template v-if="item.status === 'finished'">
                    <img :src="item.url"  >
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
</template>
<template v-else>
    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
</template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="1000000"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :data="data"
        :action="getupfileurl"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;border:1px dashed #ccc;text-align:center">
            <Icon type="camera" size="20"></Icon>
        </div>
    </Upload>
    <div>
    <span>最多只能上传9张图片</span>
    </div>
</Modal>
<Modal v-model="modalProject" title="项目成员" width=700>
    <div slot='footer'>
        <Button type="default" @click='cancelproject'>取消</Button>
        <Button type="info" @click='okproject'>确定</Button>
    </div>
    <div>
            <Row>
                <Col span="12" v-if="memberDetailView" v-for="(item,index) in  memberDetail" :key="index"><label style="width:100px;display:inline-block;text-align:right;padding-right:3px;"> {{item.displayName}} </label> <KrInput :readOrEdit="true" :value="item.memberName" style="width:160px" @okClick="okClick($event,item)" /></Col>
            </Row>
    </div>
<div>
</div>
</Modal>
   <PhotoAlbum v-if="isPhotoAlbum" :data='imgData' @downFile="downFile" :eyeIndex="eyeIndex" @close = "closeOrOpen"></PhotoAlbum>
  </div>
</template>

<script>
    import  "./index.less"
    import krCity from './krCity.js';
    import KrInput from './KrInput.vue'
    import PhotoAlbum from '~/components/PhotoAlbum'
    import OverFlowLabel from './overFlowLabel'
    import IndexData from './indexData'
    import IndexMethod from './indexMethod'
    import PublicHander from '../public-hander'
    import UpFiles from "~/components/KrField/UpFiles"
    export default {
        components:{
            KrInput,
            PhotoAlbum,
            OverFlowLabel,
            PublicHander,
            UpFiles
        },
        data() {
            return  IndexData.call(this)
        },
        filters: {
            data: function(input) {
                var d = new Date(input);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                var hour = d.getHours();
                var minutes = d.getMinutes();
                var seconds = d.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
            }
        },
        mounted() {
            GLOBALSIDESWITCH("false");
            let winHeight = document.body.clientHeight;
            let top = 185;
            let bottom = 68;
            this.getcomments()
            this.getUpUrl()
            this.uploadList = this.$refs.upload.fileList;
            this.queryInfoMethod()
            this.queryInfoPropertyMethod()
            this.queryInfoProductMethod()
            this.$nextTick(()=>{

               setTimeout(()=> {
                 let oneDom = document.getElementById("divOneId");
                 let twoDom =  document.getElementById("divTwoId");
                 console.log(oneDom,winHeight,"PPPP",top,"oooo",bottom)
                 if(oneDom){
                   oneDom.style.height = winHeight - top -bottom +'px';
                   this.heightDiv = winHeight - top -bottom-20;
                 }
                 if(twoDom){
                   twoDom.style.height = winHeight - top -bottom +'px';

                   this.heightDiv = winHeight - top -bottom-20;
                 }
               },500)


            })
            // this.getDeletePermission()
            // this.memberDetailList()
        },
        methods: IndexMethod
    }
</script>
<style lang='less'>
</style>
