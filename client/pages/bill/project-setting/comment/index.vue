<template>
    <div class="g-icon-manage comment">
        <div class='detail-title'>
                    <div class='title-left'>
                        <div class='title-name-line'><span class='title-name'>项目档案</span></div>
                        <div class='title-bread'>
                            <Breadcrumb separator=">">
                                <BreadcrumbItem to="/bill/project-setting">首页</BreadcrumbItem>
                                <BreadcrumbItem><span  style="cursor:pointer;">开业进度总览>骏豪-中央公园广场-物业档案</span></BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div class='title-right'><Button type="primary"  >查看编辑记录</Button></div>
                    <div class='title-right'><Button type="default" style="color:#4F9EED;border:1px solid #4F9EED" @click="openProject" >项目成员</Button></div>
        </div>
        <div class="div-two">
            <div style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
                <div style="float:right">
                    <Button type="primary" size="small" @click="addClickMethod">添加评论</Button>
                </div>
                <div style="border-left:5px solid #4b9ce4;padding-left:5px">项目评论</div>
            </div>
            <Scroll :on-reach-bottom="getcomments" :height='500'>
                <div dis-hover v-for="(item, index) in comments" :key="index" style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
                    <div :style="{float:'left',borderRadius:'50%',backgroundColor:'rgb(68, 187, 243)',width:'50px',height:'50px',lineHeight:'50px',textAlign:'center',color:'#fff'}">{{item.creator.length>2?item.creator.slice(item.creator.length-2,3):item.creator}}</div>
                    <div style="margin-left:66px;min-height:60px">
                        <div style="height:25px">
                            <div style="float:left">
                                <span style="margin:0;padding:0;font-size:14px;">{{item.creator}}</span>&nbsp;&nbsp;<span style="color:#c1c1c1">{{item.cTime |data }}</span>
                            </div>
                            <div style="float:right">
                                <a v-if="!item.canDel" @click='replyMethod(item.id,item.creator)'>回复</a>
                                <a v-else @click="confirm(item.id)">删除</a>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                        <div style="text-align:left">
                            <div v-if="!item.canDel"><span><span style="color:#ccc"> 回复了&nbsp;&nbsp;</span><span>{{item.replyCreator}}:</span></span>
                            </div>
                            <span>
                          {{item.comment}}
                        </span>
                        </div>
                        <div v-for="(img1,index) in item.photo" 
                            :key="index"
                            style="width:130px;height:100px;text-align:center;display:inline-block;float:left;overflow:hidden">
                         <img :src="img1.preUrl" @click='queryImgMethod(item.photo,index)' style="float:left;height:100%;padding:5px;" alt="">
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </Scroll>
        </div>
        <div class="div-one">
            <div style="padding:10px 10px 10px 10px;border-bottom:1px solid #f8f8f8">
    
                <div style="border-left:5px solid #4b9ce4;padding-left:5px;text-align:left">项目档案</div>
            </div>
            <Row>
                <div style="fontSize:16px;text-align:left;padding-top:10px">
                    <Col span="8" style="padding-left:10px">核心信息</Col>
                    <Col span="8"> &nbsp;</Col>
                    <Col span="8"> &nbsp;</Col>
                </div>
                <div>
                    <Col span="8" :key="index" v-for=' (item,index) in  typeCodeInfo' style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">&nbsp;{{item.displayName}}</div>
                        <OverFlowLabel :label="item.fieldValue?item.fieldValue:'-'" />
                    </Col>
                    <Col span="8" :key="index" v-for=' (item,index) in  coreinfoBusiness' style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">&nbsp;{{item.displayName}}</div>
                        <OverFlowLabel :label="item.fieldValue?item.fieldValue:'-'" />
                    </Col>
                    <Col span="8" :key="index" v-for=' (item,index) in  coreinfoFinance' style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">&nbsp;{{item.displayName}}</div>
                        <div style="font-size:16px;color:#333;maxHeight:50px;overflow:hidden">
                            <OverFlowLabel :label="item.fieldValue?item.fieldValue:'-'" />
                        </div>
                    </Col>
                </div>
            </Row>
        </div>
        <Modal v-model="modal2" width=600 id='modal2'>
            <div style='width:560px'>
                <img :src='modal2ImgUrl' style='width:560px;'>
            </div>
        </Modal>
        <Modal v-model="modal1" :title="modlalTitle">
            <div slot='footer'>
                <Button type="default" @click='cancel'>取消</Button>
                <Button type="info" @click='ok'>确定</Button>
            </div>
            <Form :model="formItem" ref="ruleValidate" :rules="ruleValidate">
                <FormItem prop="comment">
                    <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="placeholder">
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
        :max-size="2048"
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
   <PhotoAlbum v-if="isPhotoAlbum" :data='imgData' :eyeIndex="eyeIndex" @close = "closeOrOpen"></PhotoAlbum>
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
    export default {
        components:{
            KrInput,
            PhotoAlbum,
            OverFlowLabel
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
            this.getcomments()
            this.getUpUrl()
            this.uploadList = this.$refs.upload.fileList;
            this.queryInfoMethod()
            this.memberDetailList()
        },
        methods: IndexMethod
    }
</script>
<style lang='less'>
</style>
