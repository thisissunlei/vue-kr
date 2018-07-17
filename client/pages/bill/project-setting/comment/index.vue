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
    <div class="div-two" id="divTwoId">
      <div style="padding:10px 10px 10px 0;border-bottom:1px solid #f8f8f8">
        <div style="float:right">
          <Button type="primary" size="small" @click="addClickMethod">添加备注</Button>
        </div>
        <div style="border-left:5px solid #4b9ce4;padding-left:5px;font-size:16px">项目备注</div>
      </div>
      <div v-if="comments.length>0">
        <Scroll :on-reach-bottom="getcomments" :height='heightDiv' style="overflow-y:auto">
          <div dis-hover v-for="(item, index) in comments" :key="index" style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
            <div :style="{float:'left',borderRadius:'50%',backgroundColor:'rgb(68, 187, 243)',width:'50px',height:'50px',lineHeight:'50px',textAlign:'center',color:'#fff',fontSize:'16px'}">{{item.creator.length>2?item.creator.slice(item.creator.length-2,3):item.creator}}</div>
            <div style="margin-left:66px;min-height:60px">
              <div style="height:25px">
                <div style="float:left">
                  <span style="margin:0;padding:0;font-size:14px;">{{item.creator}}</span>&nbsp;&nbsp;<span style="color:#c1c1c1">{{item.cTime |data }}</span>
                </div>
                <div style="float:right">
                  <!-- <a v-if="!item.canDel" @click='replyMethod(item.id,item.creator)'>回复</a> -->
                  <a @click="confirm(item.id)" v-if="item.canDel">删除</a>
                </div>
                <div style="clear:both;"></div>
              </div>
              <div style="text-align:left">
                <div v-if="false"><span><span style="color:#ccc"> 回复了&nbsp;&nbsp;</span><span>{{item.replyCreator}}:</span></span>
                </div>
                <span style="font-size:14px">
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
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAACCCAIAAADQc1PnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDctMDlUMTU6Mzg6MDcrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA3LTA5VDA3OjM4OjEzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA3LTA5VDA3OjM4OjEzKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MEM2NjA3OTdCNkYxMUU4ODcwQUJBQjJENTE0MUU1QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MEM2NjA3QTdCNkYxMUU4ODcwQUJBQjJENTE0MUU1QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBz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" alt="" >
      </div>

    </div>
    <div class="div-one" id="divOneId">
      <div style="padding:10px 10px 10px 0;border-bottom:1px solid #f8f8f8">

        <div style="border-left:5px solid #4b9ce4;padding-left:5px;text-align:left;font-size:16px">项目档案</div>
      </div>
      <Row>
        <div class="row-info-one">
          <div style="fontSize:16px;text-align:left;padding-top:10px">
            <Col span="8" style="padding-left:10px">核心信息</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8"> &nbsp;</Col>
          </div>
          <div>
            <Col span="8" v-for='(item) in  typeCodeInfo' :key="item.id" style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
            <div style="font-size:12px;color:#666">{{item.displayName}}</div>
            <OverFlowLabel style="font-size:16px;color:#333;height:50px;overflow:hidden" :label=" (Array.isArray(item.fieldValue) && item.fieldValue.length>0)?item.fieldValue:!Array.isArray(item.fieldValue)?(item.fieldValue?item.fieldValue:'-'):'-'" />
            </Col>
            <Col span="8" v-for='(item) in  coreinfoBusiness' :key="item.id" style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
            <div style="font-size:12px;color:#666">{{item.displayName}}</div>
            <OverFlowLabel style="font-size:16px;color:#333;height:50px;overflow:hidden" :label=" (Array.isArray(item.fieldValue) && item.fieldValue.length>0)?item.fieldValue:!Array.isArray(item.fieldValue)?(item.fieldValue?item.fieldValue:'-'):'-'" />
            </Col>
            <Col span="8" v-for='(item) in  coreinfoFinance' :key="item.id" style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
            <div style="font-size:12px;color:#666">{{item.displayName}}</div>
            <div style="font-size:16px;color:#333;height:50px;overflow:hidden">
              <OverFlowLabel :label="(Array.isArray(item.fieldValue) && item.fieldValue.length>0)?item.fieldValue:!Array.isArray(item.fieldValue)?(item.fieldValue?item.fieldValue:'-'):'-'  " />
            </div>
            </Col>
          </div>

        </div>
        <div class="row-info-middle" style="float:left;width:100%"><span style="color：#666;display: inline-block;">以下为完整档案 </span></div>
        <div class="row-info-two">
          <div class="tab-box"  style="box-shadow:rgba(0, 0, 0, 0.1) 0px 3px 5px -1px;">
          <Col span="12">
          <div class="info-title" style="color:#4F9EED">
            <div @click="getInfo(1)" :style="isClick?{borderBottom:'2px solid #4F9EED',textAlign:'center', cursor: 'pointer'}:{textAlign:'center',cursor: 'pointer'}">物业档案</div>
          </div>
          </Col>
          <Col span="12">
          <div>
            <div @click="getInfo(2)" class="info-title" :style="!isClick?{borderBottom:'2px solid #4F9EED' ,textAlign:'center',cursor: 'pointer'}:{textAlign:'center', cursor: 'pointer'}">产品档案</div>
          </div>
          </Col>
          </div>
          <div v-if="isClick" style="    padding-left: 5px;">
          <div v-for=" item in  propertyData" :key="item.id">
            <div style="float:left;width:100%">
              <Col span="8">
              <div style="margin-left:-5px;font-size:16px;padding-bottom:10px;padding-top:10px;"><span style="background-color: #468cdf; color: rgb(255, 255, 255); display: inline-block;padding: 5px 20px;width: 220px; background: linear-gradient(to right, #468cdf 0%,#ffffff 100%);">{{item.label}}</span></div>

              </Col>
              <Col span="8"> &nbsp;
              </Col>
              <Col span="8"> &nbsp;
              </Col>
            </div>
            <div style="float:left;width:100%;">
              <template v-for="data in item.data">

                                    <div v-if="data.fieldType =='FILE' && data.fieldValue.length>0 ">
                                      <Col span="24" :key="data.id">
                                      <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                           <UpFiles :value="data.fieldValue" :commentColor="true" style="overflow:hidden"></UpFiles>
                                      </Col>
                                    </div>
                                    <div v-else>

                                       <Col span="8" :key="data.id">
                                        <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                        <div style="padding-left:5px;font-size:16px;;margin:5px 0">{{data.fieldValue && !Array.isArray(data.fieldValue) ?data.fieldValue : "-"}}</div>
                                      </Col>
                                    </div>
                          </template>

                          </div>
                            <div style="float:left;width:100%;margin-buttom:20px;margin-top:20px">
                            <template v-for="(datas,index) in item.children">
                              <div :style="index==0?{float:'left',width:'100%',marginButtom:'20px',marginTop:'20px'}:{paddingTop: '20px',float:'left',width:'100%',marginButtom:'20px',marginTop:'20px',borderTop:'1px solid #eee'}">
                                <Col span="8">
                                <div style="padding-left:5px;font-size:16px;padding-bottom:10px;text-decoration:underline">{{datas.label}}</div>

                                </Col>
                                <Col span="8"> &nbsp;
                                </Col>
                                <Col span="8"> &nbsp;
                                </Col>
                              </div>
                              <template v-for="data in datas.data">


                                        <div v-if="data.fieldType =='FILE' && data.fieldValue.length>0 ">
                                          <Col span="24" :key="data.id">
                                          <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                              <UpFiles :value="data.fieldValue" :commentColor="true" style="overflow:hidden"></UpFiles>
                                          </Col>
                                        </div>
                                        <div v-else>

                                          <Col span="8" :key="data.id">
                                            <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                            <div style="padding-left:5px;font-size:16px;;margin:5px 0">{{data.fieldValue && !Array.isArray(data.fieldValue) ?data.fieldValue : "-"}}</div>
                                          </Col>
                                        </div>
                                  </template>
                                </template>
                          </div>

                      </div>
                    </div>

                    <div v-else style="padding-left: 5px;padding-right: 5px;">
                        <div v-for=" item in  productData" :key="item.id">
            <div style="float:left;width:100%;">
              <Col span="8">
              <div style="margin-left:-5px;font-size:16px;padding-bottom:10px;padding-top:10px;"><span style="background-color: #468cdf; color: rgb(255, 255, 255); display: inline-block;padding: 5px 20px;width: 220px; background: linear-gradient(to right, #468cdf 0%,#ffffff 100%);">{{item.label}}</span></div>

              </Col>
              <Col span="8"> &nbsp;
              </Col>
              <Col span="8"> &nbsp;
              </Col>
            </div>
            <div style="float:left;width:100%;">
              <template v-for="data in item.data">

                                    <div v-if="data.fieldType =='FILE' && data.fieldValue.length>0 ">
                                      <Col span="24" :key="data.id">
                                      <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                           <UpFiles :value="data.fieldValue" :commentColor="true" style="overflow:hidden"></UpFiles>
                                      </Col>
                                    </div>
                                    <div v-else>

                                       <Col span="8" :key="data.id">
                                        <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                        <div style="padding-left:5px;font-size:16px;;margin:5px 0">{{data.fieldValue && !Array.isArray(data.fieldValue) ?data.fieldValue : "-"}}</div>
                                      </Col>
                                    </div>
                          </template>

                          </div>
                            <div style="float:left;width:100%;margin-buttom:20px;margin-top:20px">
                            <template v-for="(datas,index) in item.children">
                              <div :style="index==0?{float:'left',width:'100%',marginButtom:'20px',marginTop:'20px'}:{paddingTop: '20px',float:'left',width:'100%',marginButtom:'20px',marginTop:'20px',borderTop:'1px solid #eee'}">
                                <Col span="8">
                                <div style="padding-left:5px;font-size:16px;padding-bottom:10px;text-decoration:underline">{{datas.label}}</div>

                                </Col>
                                <Col span="8"> &nbsp;
                                </Col>
                                <Col span="8"> &nbsp;
                                </Col>
                              </div>
                              <template v-for="data in datas.data">


                                        <div v-if="data.fieldType =='FILE' && data.fieldValue.length>0 ">
                                          <Col span="24" :key="data.id">
                                          <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                              <UpFiles :value="data.fieldValue" :commentColor="true" style="overflow:hidden"></UpFiles>
                                          </Col>
                                        </div>
                                        <div v-else>

                                          <Col span="8" :key="data.id">
                                            <div style="padding-left:5px;color:#666;font-size:12px;margin:5px 0">{{data.displayName||'-'}}</div>
                                            <div style="padding-left:5px;font-size:16px;;margin:5px 0">{{data.fieldValue && !Array.isArray(data.fieldValue) ?data.fieldValue : "-"}}</div>
                                          </Col>
                                        </div>
                                  </template>
                                </template>
                          </div>

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
                    <Input   v-model="formItem.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="500" :placeholder="placeholder">
                    </Input>
                </FormItem>
            </Form>

            <div class="demo-upload-list" v-for="item in uploadList" :key='item.id'>
<template v-if="item.status === 'finished'">
  <img :src="item.url">
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
  import Vue from 'vue'
  import "./index.less"
  import krCity from './krCity.js';
  import KrInput from './KrInput.vue'
  import PhotoAlbum from '~/components/PhotoAlbum'
  import OverFlowLabel from './overFlowLabel'
  import IndexData from './indexData'
  import IndexMethod from './indexMethod'
  import PublicHander from '../public-hander'
  import UpFiles from "~/components/KrField/UpFiles"
  export default {
    components: {
      KrInput,
      PhotoAlbum,
      OverFlowLabel,
      PublicHander,
      UpFiles
    },
    data() {
      return IndexData.call(this)
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


         let tab;
        let i = 1;
      this.$nextTick(() => {


      setTimeout(()=>{


        (document.getElementsByClassName('div-one')[0]).onscroll= function(){


          if(i==1){
            tab =  document.getElementsByClassName('tab-box')[0].offsetTop;
            i+=1
          }
         let divOne =  document.getElementsByClassName('div-one')[0].scrollTop;


        let tabdom =  document.getElementsByClassName('tab-box')[0]
        let divinfoOne =   document.getElementsByClassName('row-info-one')[0].clientWidth;//row-info-one
        let divinfoOneheight =    document.getElementsByClassName('div-one')[0].offsetTop;

              // console.log(tab,document.getElementsByClassName('div-one')[0].scrollTop)
              if(tab<document.getElementsByClassName('div-one')[0].scrollTop){



                      tabdom.style.position='fixed'
                      tabdom.style.top=divinfoOneheight+'px'
                      tabdom.style.width=divinfoOne+'px'
                      tabdom.style.backgroundColor="#fff"
                      tabdom.style.zIndex=900


                    }else{

                      tabdom.style.position=''
                      tabdom.style.top=divinfoOneheight+'px'
                      tabdom.style.width=divinfoOne+'px'
                      tabdom.style.backgroundColor="#fff"
                      tabdom.style.zIndex=900
                    }
                    // console.log(this.tabBox,"-")
              }
      })





        setTimeout(() => {
          let oneDom = document.getElementById("divOneId");
          let twoDom = document.getElementById("divTwoId");
          console.log(oneDom, winHeight, "PPPP", top, "oooo", bottom)
          if (oneDom) {
            oneDom.style.height = winHeight - top - bottom + 'px';
            this.heightDiv = winHeight - top - bottom - 20;
          }
          if (twoDom) {
            twoDom.style.height = winHeight - top - bottom + 'px';

            this.heightDiv = winHeight - top - bottom - 20;
          }
        }, 500)


      })
      // this.getDeletePermission()
      // this.memberDetailList()
    },
    methods: IndexMethod
  }
</script>

<style lang='less'>

</style>
