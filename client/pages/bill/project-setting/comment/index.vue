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
                    <div class='title-right'><Button type="primary" @click="openProject" >项目成员</Button></div>
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
                                <a v-if="item.canDel" @click='replyMethod(item.id,item.creator)'>回复</a>
                                <a v-else @click="confirm(item.id)">删除</a>
    
                            </div>
                            <div style="clear:both;"></div>
                        </div>
    
                        <div style="text-align:left">
                            <div v-if="item.canDel"><span><span style="color:#ccc"> 回复了&nbsp;&nbsp;</span><span>{{item.replyCreator}}:</span></span>
                            </div>
    
                            <span>
                          {{item.comment}}
                        </span>
                        </div>
                        <div v-for="(img1,index) in item.photos" :key="index" style="width:130px;height:100px;text-align:center;display:inline-block;float:left;overflow:hidden">
    
                            <img :src="img1" @click='queryImgMethod(img1)' style="float:left;height:100%;padding:5px;" alt="">
    
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
                    <Col span="8" v-for=' item in  typeCodeInfo' style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">&nbsp;{{item.displayName}}</div>
                        <OverFlowLabel :label="item.fieldValue?item.fieldValue:'-'" />
                    </Col>
                    <Col span="8" v-for=' item in  coreinfoBusiness' style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
                        <div style="font-size:12px;color:#aaa">&nbsp;{{item.displayName}}</div>
                        <OverFlowLabel :label="item.fieldValue?item.fieldValue:'-'" />
                    </Col>
                    <Col span="8" v-for=' item in  coreinfoFinance' style="margin-top:10px;margin-buttom:10px;padding-left:10px;text-align:left">
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
   
  </div>
</template>

<script>
    import krCity from './krCity.js';
    import KrInput from './KrInput.vue'
    import OverFlowLabel from './overFlowLabel'
    export default {
        components:{
            OverFlowLabel,
             KrInput  
        },
    
        data() {
            return {
                memberDetail:[],
                memberDetailView:false,
                modalProject:false,
                coreinfoBusiness: [],
                coreinfoFinance: [],
                typeCodeInfo: [],
                modal2ImgUrl: '',
                modlalTitle: '回复评论',
                placeholder: '回复  ',
                getuploadData: {},
                getupfileurl: "",
                page: 1,
                data: {},
                imgUplaodId: [],
                pageSize: 10,
                comments: [],
                totalCount: 0,
                modal1: false,
                modal2: false,
                projectId: $route.query.queryId,
                photos: "",
                replyId: null,
                formItem: {
                    comment: ''
                },
                defaultList: [
    
                ],
                imgName: '',
                uploadList: [],
                ruleValidate: {
                    comment: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                }
            }
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
        methods: {
            memberDetailList(val){
                this.$http.get('member-detail-list',{projectId:this.projectId}).then(res=>{
                  
                 
                    this.memberDetail = res.data;
                   
                    this.memberDetailView = this.modalProject;
                    
                }).catch((e)=>{
                    // this.$Notice.warning({
                    // title: '',
                    // desc: e
                });
                
            },
            okClick(val,item){
                
                console.log(val,item,"val")
                let param = {
                    code:item.code,
                    memberName:val.value,
                    projectId:this.projectId,
                }
                this.$http.post('member-actions-edit',param).then(res=>{
                    console.log(res)
                }).catch(e=>{
                    this.$Notice.warning({
                        title: "系统错误"
                    });
                })
            },
            openProject(){
                this.memberDetailList('openProject')
                this.modalProject = true;

            },
            okproject(){
                this.modalProject=false;
                setTimeout(()=>{
                    this.memberDetailView=false;
                },500)
               
                
            },
            cancelproject(){
                this.modalProject=false;
                setTimeout(()=>{
                    this.memberDetailView=false;
                },500)
            },
            queryInfoMethod() {
                let param = {
                    code: 'coreinfo',
                    projectId: this.projectId
                }
                this.$http.get('list-type-code', param).then((res) => {
    
                    for (let i = 0; i < res.data.items[0].data.length; i++) {
                        // cityData
                        if (res.data.items[0].data[i].displayName === '所属区县') {
                            let str = res.data.items[0].data[i].fieldValue.split(',')
                            res.data.items[0].data[i].fieldValue = krCity(str)
    
                        }
                        if (res.data.items[0].data[i].displayName === '产品类型') {
                            this.$http.get('get-enum-all-data', {
                                enmuKey: res.data.items[0].data[i].param
                            }).then((response) => {
                                for (let item of response.data) {
                                    console.log(item.desc, " console.log( item.desc)")
                                    if (item.value === res.data.items[0].data[i].fieldValue) {
                                        res.data.items[0].data[i].fieldValue = item.desc;
                                    }
                                }
                            }).catch((error) => {
    
                            })
    
                        }
    
                    }
                    this.typeCodeInfo = res.data.items[0].data
                    this.coreinfoBusiness = res.data.items[1].data
                    this.coreinfoFinance = res.data.items[2].data
    
                }).catch((e) => {
                    console.log(e)
                })
    
            },
            queryImgMethod(img) {
                this.modal2 = true;
                this.modal2ImgUrl = img
    
            },
            addClickMethod() {
                this.modlalTitle = '添加评论'
                this.placeholder = '写评论...  ';
                this.modal1 = true
            },
            updateing(event, file, fileList) {
                this.data['x:original_name'] = file.name;
                console.log(this.data)
            },
            replyMethod(id, val) {
    
                this.modlalTitle = '回复评论'
                this.placeholder = '回复  ' + val
                this.modal1 = true
                this.replyId = id
            },
            handleView(name) {
                this.imgName = name;
    
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.imgUplaodId.splice(this.imgUplaodId.indexOf(file.id), 1);
    
            },
            handleSuccess(res, file) {
                this.imgUplaodId.push(res.data.id)
                console.log(this.imgUplaodId, 'this.imgUplaodId')
                file.url = res.data.url;
                file.name = '' + Math.random;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < 9;
    
                if (!check) {
                    this.$Notice.warning({
                        title: '文件数过多'
                    });
                }
    
                return check;
    
    
            },
            ok() {
                if (this.modlalTitle === '回复评论') {
                    this.actionsAdd('param')
                } else {
                    this.actionsAdd()
                }
    
    
            },
            cancel() {
    
                this.uploadList.splice(0, this.uploadList.length);
                this.imgUplaodId = [];
                this.formItem.comment = ''
                this.$Message.info('取消');
                this.modal1 = false;
            },
    
            confirm(param) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '<p>确定删除？</p>',
                    onOk: () => {
                        this.$http.delete('actions-delete', {
                            id: param
                        }).then((res) => {
                            this.$Message.info('删除成功');
                        }).catch(e => {
                            this.$Message.info('删除失败');
                        })
    
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
            },
            getcomments(val) {
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    projectId: this.projectId
                }
    
                this.$http.get('typePage', param).then((res) => {
    
                    if (res.data.items && res.data.items.length > 0) {
                        for (let i = 0; i < res.data.items.length; i++) {
                            this.comments.push(res.data.items[i])
                        }
    
                        this.page += 1
                    }
    
    
    
                    this.totalCount = res.data.totalCount
    
                    console.log(res)
                }).catch((e) => {
                    console.log(e)
                })
            },
    
            getUpUrl() {
                let category = 'pm/file';
    
                var form = new FormData();
                this.$http.get('get-vue-upload-url', {
                    category: category,
                    isPublic: false
    
                }).then((res) => {
    
                    var response = res.data;
    
                    let params = Object.assign({}, res.data);
                    delete params.serverUrl;
                    delete params.sign;
                    delete params.ossAccessKeyId;
                    delete params.maxSizeKb;
    
                    this.data = params;
                    this.data.signature = res.data.sign;
                    this.data.OSSAccessKeyId = res.data.ossAccessKeyId;
                    this.pathPrefix = params.pathPrefix;
                    this.data.key = res.data.pathPrefix;
                    this.data['x:original_name'] = '7e3e6709c93d70cf312a368af4dcd100bba12b60.jpg';
    
                    this.getupfileurl = response.serverUrl;
    
                }).catch((err) => {
    
                    this.$Notice.error({
                        title: err.message
                    });
    
                })
            },
            actionsAdd(val) {
    
                this.photos = this.imgUplaodId.join(',')
                let param = {
                    comment: this.formItem.comment,
                    projectId: this.projectId,
                    photos: this.photos,
                    replyId: val ? this.replyId : null
                }
                this.$refs['ruleValidate'].validate((valid) => {
                    if (valid) {
                        this.$http.post('actions-add', param).then((res) => {
    
                            this.uploadList.splice(0, this.uploadList.length);
                            this.imgUplaodId = [];
                            this.formItem.comment = ''
                            this.comments.splice(0, this.comments.length);
                            this.page = 1;
                            this.getcomments('update')
                            this.$Message.info('发布成功');
                            this.modal1 = false;
    
                            console.log(res)
                        }).catch((e) => {
                            this.modal1 = false;
                            this.$Message.info('发布失败');
                            console.log(e)
                        })
                    } else {
    
                    }
    
                })
    
            }
        }
    }
</script>

<style lang='less'>
    #modal2 {
        .ivu-modal-footer {
            display: none;
        }
    }
    
    .ivu-upload.ivu-upload-select {
        float: left;
    }
    
    .demo-upload-list-cover {
        .ivu-icon.ivu-icon-ios-eye-outline {
            display: none
        }
    }
    
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }
    
    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }
    
    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }
    
    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }
    
    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    
    .comment {
        float: left;
        width: 100%;
        min-height: 390px;
        background-color: #f6f6f6;
        .div-one {
            // float: left;
            margin: 20px 450px 20px 20px;
            background-color: #fff;
            min-height: 200px;
        }
        .div-two {
            background-color: #fff;
            float: right;
            margin: 20px 20px 20px 0;
            width: 400px;
            height: 550px;
            overflow: hidden;
        }
    }

     .edit-left-bar{

       width:100%;
       background: #fff;
       display:inline-block;
       .ivu-tabs{
            overflow: visible;
        }
        .nav-text.ivu-tabs-nav{
            width: 100%;
        }
        .ivu-tabs-ink-bar{
            top:0px;
            height: 4px;
           
            border-top: 0px;
            border-bottom: 0px;
            box-sizing: border-box;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            width: 50%;
            text-align: center;
            line-height: 35px;
            padding: 8px 20px;
            
        }
        .ivu-tabs-no-animation{
            overflow: visible !important;
        }
        .ivu-tabs-bar{
            margin: 0px;
        }
       
       .detail-title{
           background: #F5F6FA;
           height:50px;
           .title-left{
                display:inline-block;
                margin-top: 5px;
                .title-name-line{
                    display:inline-block;
                    padding-right:6px;
                    height:14px;
                    line-height: 14px;
                    border-right:2px solid #999;
                    margin-right:6px;
                    .title-name{
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #666666;
                    }
                }
                .title-bread{
                    display:inline-block;
                    .ivu-breadcrumb .ivu-breadcrumb-item-link{
                        color:#499df1;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    .ivu-breadcrumb .ivu-breadcrumb-item-separator{
                        font-size: 14px;
                        color: #2A2A2A;
                        font-family: PingFangSC-Medium;
                        margin: 0 6px 0 3px;
                    }
                }
           }
           .title-right{
               float:right;
           }
       }
       .detail-detail{
           width:100%;
           background: #fff;
           display:inline-block;
       }
   }
   .sure-sign{
        text-align: center;
        max-width: 300px;
        margin: 0 auto;
        line-height: 26px;
        font-size: 14px;
    }
</style>
