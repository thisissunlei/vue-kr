import  "./index.less" 
import krCity from './krCity.js';
import KrInput from './KrInput.vue'
import PhotoAlbum from '~/components/PhotoAlbum'
import OverFlowLabel from './overFlowLabel'
import IndexData from './indexData'
export  default  {
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
  queryImgMethod(img,param) {
      this.isPhotoAlbum = true;
      this.eyeIndex=param;
      this.imgData = img.map(item =>{
          return {fieldUrl :item.ossUrl};
      })
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
