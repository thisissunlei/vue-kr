import  "./index.less"
import krCity from './krCity.js';
import KrInput from './KrInput.vue'
import PhotoAlbum from '~/components/PhotoAlbum'
import OverFlowLabel from './overFlowLabel'
import IndexData from './indexData'
import { resolve } from "url";
import utils from '~/plugins/utils'
export  default  {

  getInfo(params){


    if(params ===1){
      this.isClick = true;
      this.queryInfoPropertyMethod()
    }else{
      this.isClick = false;
      this.queryInfoProductMethod()
    }

  },
  goback(){

  },
  closeOrOpen(){
      this.isPhotoAlbum = false
  },
  memberDetailList(val){
      this.$http.get('member-detail-list',{projectId:this.projectId}).then(res=>{
          this.memberDetail = res.data;
          this.memberDetailView = this.modalProject;
      }).catch((e)=>{
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
          code: 'coreinfo',//property product
          projectId: this.projectId
      }
      this.$http.get('list-type-code', param).then((res) => {

          for (let i = 0; i < res.data.items[0].data.length; i++) {
              // cityData
              if (res.data.items[0].data[i].displayName === '所属区县') {
                  let str = res.data.items[0].data[i].fieldValue.split(',')
                  res.data.items[0].data[i].fieldValue = krCity(str)
              }
              if (res.data.items[0].data[i].fieldType === 'SELECT') {
                  this.$http.get('get-enum-all-data', {
                      enmuKey: res.data.items[0].data[i].param
                  }).then((response) => {
                      for (let item of response.data) {
                          // console.log(item.desc, " console.log( item.desc2)")
                          if (item.value === res.data.items[0].data[i].fieldValue) {
                              res.data.items[0].data[i].fieldValue = item.desc;
                          }
                      }
                  }).catch((error) => {
                    throw error
                  })
              }
          }
          this.typeCodeInfo = res.data.items[0].data
          for (let i = 0; i < res.data.items[1].data.length; i++) {
            // cityData

            if (res.data.items[1].data[i].fieldType === 'SELECT') {
                this.$http.get('get-enum-all-data', {
                    enmuKey: res.data.items[1].data[i].param
                }).then((response) => {
                    for (let item of response.data) {
                        console.log(item.desc, " console.log( item.desc1)")
                        if (item.value === res.data.items[1].data[i].fieldValue) {
                            res.data.items[1].data[i].fieldValue = item.desc;
                        }
                    }
                }).catch((error) => {
                  throw error
                })
            }
        }
        this.coreinfoBusiness = res.data.items[1].data
        for (let i = 0; i < res.data.items[2].data.length; i++) {

          if (res.data.items[2].data[i].fieldType === 'SELECT') {
              this.$http.get('get-enum-all-data', {
                  enmuKey: res.data.items[2].data[i].param
              }).then((response) => {
                  for (let item of response.data) {
                      console.log(item.desc, " console.log( item.desc123)")
                      if (item.value === res.data.items[2].data[i].fieldValue) {
                          res.data.items[2].data[i].fieldValue = item.desc;
                      }
                  }
              }).catch((error) => {
                throw error
              })
          }
      }


          this.coreinfoFinance = res.data.items[2].data
      }).catch((e) => {
          console.log(e)
      })
  },
  queryInfomation(i,j,j1,res){
            // console.log( res.data.items[i].children[j1].data[j2]," res.data.items[i].children[j1].data[j2]")
            this.$http.get('get-enum-all-data', {
              enmuKey: res.data.items[i].children[j].data[j1].param
          }).then((response) => {
              for (let item of response.data) {


                    if (item.value === res.data.items[i].children[j].data[j1].fieldValue) {
                      res.data.items[i].children[j].data[j1].fieldValue = item.desc;
                    }


              }

          }).catch((error) => {
            throw error
          })
  },
  queryInfomationProperty(i,j,res){
    this.$http.get('get-enum-all-data', {
      enmuKey: res.data.items[i].data[j].param
  }).then((response) => {
      for (let item of response.data) {

          if(res.data.items[i].data.length>0){
            if (item.value === res.data.items[i].data[j].fieldValue) {
              res.data.items[i].data[j].fieldValue = item.desc;
           }
          }

      }
  }).catch((error) => {
    throw error
  })
  },
  queryInfoPropertyMethod() {
    let param = {
        code: 'property',//property product
        projectId: this.projectId
    }
    this.$http.get('list-type-code-detail', param).then((res) => {



      for (let i = 0; i < res.data.items.length; i++) {
        for(let j = 0; j < res.data.items[i].data.length; j++){
          if (res.data.items[i].data[j].displayName === '所属区县') {
            let str = res.data.items[i].data[j].fieldValue.split(',')
            res.data.items[i].data[j].fieldValue = krCity(str)
          }
          if (res.data.items[i].data[j].fieldType === 'SELECT') {
            this.queryInfomationProperty(i,j,res)
        }
      }

        if(res.data.items[i].children){
          for(let j = 0; j < res.data.items[i].children.length; j++){
            if (res.data.items[i].children[j].data) {
            for(let j1 = 0; j1 < res.data.items[i].children[j].data.length; j1++){

              if (res.data.items[i].children[j].data[j1].displayName === '所属区县') {
                let str = res.data.items[i].children[j].data[j1].fieldValue.split(',')
                console.log(krCity(str),"krCity(str)")
                res.data.items[i].children[j].data[j1].fieldValue = krCity(str)
              }
                  if (res.data.items[i].children[j].data[j1].fieldType === 'SELECT') {
                    // console.log( res.data.items[i].children[j1].data[j2]," res.data.items[i].children[j1].data[j2]")
                        this.queryInfomation(i,j,j1,res);

                  }
                }
              }
            }
        }


    }

    this.propertyData = res.data.items;


    }).catch((e) => {
        console.log(e)
    })
},

queryInfoProductMethod() {
  let param = {
      code: 'product',//property product
      projectId: this.projectId
  }
  this.$http.get('list-type-code-detail', param).then((res) => {

    for (let i = 0; i < res.data.items.length; i++) {
      for(let j = 0; j < res.data.items[i].data.length; j++){
        if (res.data.items[i].data[j].fieldType === 'SELECT') {
          this.queryInfomationProperty(i,j,res)
      }
    }

      if(res.data.items[i].children){
        for(let j = 0; j < res.data.items[i].children.length; j++){
          if (res.data.items[i].children[j].data) {
          for(let j1 = 0; j1 < res.data.items[i].children[j].data.length; j1++){


                if (res.data.items[i].children[j].data[j1].fieldType === 'SELECT') {
                  // console.log( res.data.items[i].children[j1].data[j2]," res.data.items[i].children[j1].data[j2]")
                      this.queryInfomation(i,j,j1,res);

                }
              }
            }
          }
      }


  }



    this.productData = res.data.items;
    console.log(res,'product')
  }).catch((e) => {
      console.log(e)
  })
},

  queryImgMethod(img,param) {
      this.isPhotoAlbum = true;
      this.eyeIndex=param;
      this.imgData = img.map(item =>{
          return {fieldUrl :item.ossUrl};
      })
  },
  addClickMethod() {
      this.modlalTitle = '添加备注' //'添加评论'
      this.placeholder = '写备注...  ';
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

      this.imgUplaodId.splice(this.imgUplaodId.indexOf(file.response.data.id), 1);
      console.log(file,this.imgUplaodId)
  },
  handleSuccess(res, file) {
      this.imgUplaodId.push(res.data.id)
      console.log(this.imgUplaodId, 'this.imgUplaodId')
      file.url = res.data.url;
      file.name = '' + Math.random;
  },
  handleFormatError(file) {
      this.$Notice.warning({
          title: '系统提示',
          desc: '' + file.name + '文件格式不对，请上传图片'
      });
  },
  handleMaxSize(file) {
      this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
  },
  downFile(param1,param2){
    console.log(param1,param2)
      utils.downImg(param1,param2)
  },
  handleBeforeUpload() {
    new Promise((resolve,reject)=>{
        return  this.getUpUrl().then(()=>{
              resolve()
          })
      })

      const check = this.uploadList.length < 10;
      if (!check) {
          this.$Notice.warning({
              title: '最多只能上传9张图片'
          });
      }
      return (check)
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

      // this.$Message.info('取消');
      this.modal1 = false;
  },
  confirm(param) {
      this.$Modal.confirm({
          title: '系统提示',
          content: '<p>确认删除这条评论吗？</p>',
          onOk: () => {
              this.$http.delete('actions-delete', {
                  id: param
              }).then((res) => {
            this.comments.splice(0, this.comments.length);
            this.getcomments()
            this.getUpUrl()

            this.queryInfoMethod()
            this.queryInfoPropertyMethod()
            this.queryInfoProductMethod()
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
        if('update'===val){
          this.comments.splice(0, this.comments.length);
        }
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
     return new Promise((resolve,reject)=>{

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
              resolve()
          }).catch((err) => {
              this.$Notice.error({
                  title: err.message
              });
              reject()
            })
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
