<template>
    <div class="upload-phote-box">
    <Upload
        ref="upload"
        v-if="phote==false"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        type="drag"
        name='upfile'
        action="/api/krspace-finance-web/activity/upload-pic/"
        style="display: inline-block">
        <div class="upload-box">
            <Icon type="camera" size="27"></Icon>
        </div>
        
    </Upload>
    <div class="demo-upload-list" v-if="phote!=false">
        <img :src="phote">
        <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline"  @click.native="handleView()"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
        </div>
    </div>
    <Modal :title="imgName" v-model="visible">
        <img :src="phote" v-if="visible" style="width: 100%">
    </Modal>
    </div>
</template>
<script>
    export default {
        props:{
            defaultImg:String,
            photeUrl:String,
        },
        data () {
            return {
                visible: false,
                uploadList: [],
                imgName:'',
                negative: this.defaultImg?this.defaultImg:'',
                phote:this.photeUrl?this.photeUrl:false,
            }
        },
        methods: {
            handleView (name) {
                this.imgName = '图片放大';
                this.visible = true;
            },
            handleRemove (file) {
                this.phote = false
                console.log('删除图片')
            },
            handleSuccess (res, file) {
                // 上传成功后执行的内容
                console.log('res',res)
                this.phote = res.data;
                console.log('file',file)
            },
            handleFormatError (file) {
                // 格式校验失败执行内容
                console.log('格式校验')
                
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                // 校验大小
                console.log('校验大小')
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload (file) {
                // 文件上传前执行
                console.log('文件上传前',file)
                var check = true;
                return check;
            }
        },
        mounted () {
        }
    }
</script>
<style lang="less">
    .upload-phote-box{
        border:1px dashed #dddee1;
        padding:5px;
        padding-bottom: 0;
        border-radius: 4px;
        display: inline-block;
        &:hover{
            border:1px dashed #499df1;
            .ivu-upload-drag{
                border:1px dashed #499df1;
            }
        }
    }
    .demo-upload-list{
        display: inline-block;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 60px;
        border: 1px dashed #dddee1;

        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        // box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .demo-upload-list{
        background-position: center;
        width:200px;
        height: 200px;
        line-height: 200px;
        img{
            width: 100%;
            height: 100%;
        }
        /*background: rgba(0,0,0,.6);*/
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.4);
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .upload-box{
        background:#f6f6f6;
        background-position: center;
        width:200px;
        height: 200px;
        line-height: 200px;
    }
</style>
