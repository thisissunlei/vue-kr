<template>

<div class="g-order">
    <SectionTitle title="服务及设施"></SectionTitle>
    <div class="u-search" >
        <Buttons type="primary" label='新建' checkAction='bill_batch_pay' @click="creatDialog"/>
    </div>
    <div class="u-table">
        <Table border  :columns="columns" :data="tableData" ref="table" stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            
            <div style="float: right;">
                <Page
                    :current="page"
                    :total="totalCount"
                    :page-size="pageSize"
                    @on-change="changePage"
                    show-total
                    show-elevator
                ></Page>
            </div>
        </div>
    </div>

    <Modal
        v-model="openCreat"
        title="基础设施-新建"
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-cancel-title">

            <Form
                ref="form"
                :model="formItem"
                label-position="left"
                :label-width="80"
                class="u-bind u-clearfix"
                :rules="ruleValidate"
            >
                <FormItem label="序号" prop="orderNum">
                    <Input 
                            v-model="formItem.orderNum" 
                            placeholder="请输入序号" 
                            style="width: 250px"
                    />
                </FormItem>

                <FormItem label="名称" prop="lableName">
                    <Input 
                            v-model="formItem.lableName" 
                            placeholder="请输入名称" 
                            style="width: 250px"
                    /> 
                </FormItem>

                <FormItem label="类目" prop="lableType">
                    <SelectFacility :facility="formItem" style="width: 250px" :onchange="changeType"></SelectFacility> 
                </FormItem>

                 <FormItem label="图片" prop="lableUrl">
                   <Input 
                        v-model="formItem.lableUrl" 
                        style="width: 176px;display:inline-block;"
                        :value="formItem.lableUrl"
                    />
                   <Upload
                     name="upfile"
                     ref="upload"
                     :format="['jpg','jpeg','png']" 
                     accept="image" 
                     action="/api/krspace-finance-web/cmtbright/upload-pic"
                     :on-success="uploadPicSuccess"
                     :on-format-error="uploadPicErr"
                     style="display:inline-block;"
                     :before-upload="handleBeforeUpload"
                     :show-upload-list="false"
                   >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                </FormItem>

            </Form>

        </div>

        <div style="text-align:center;" slot="footer">
            <Button type="primary" @click="bindSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 38px" @click="creatDialog">取消</Button>
        </div>

    </Modal>

    <Modal
        v-model="openEdit"
        title="基础设施-修改"
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-cancel-title">

            <Form
                ref="editform"
                :model="editItem"
                label-position="left"
                :label-width="80"
                class="u-bind u-clearfix"
                :rules="ruleValidate1"
            >
                <FormItem label="序号" prop="orderNum">
                    <Input 
                            v-model="editItem.orderNum" 
                            placeholder="请输入序号" 
                            style="width: 250px"
                    />
                </FormItem>

                <FormItem label="名称" prop="lableName">
                    <Input 
                            v-model="editItem.lableName" 
                            placeholder="请输入名称" 
                            style="width: 250px"
                    />
                </FormItem>

                <FormItem label="类目" prop="lableType">
                    <SelectFacility :facility="editItem" style="width: 250px" :onchange="changeType"></SelectFacility> 
                </FormItem>

                 <FormItem label="图片" prop="lableUrl">
                   <Input 
                        v-model="editItem.lableUrl" 
                        style="width: 176px;display:inline-block;"
                        :value="editItem.lableUrl"
                        placeholder="图片地址" 
                    />
                   <Upload
                     ref="upload"
                     name="upfile"
                     :format="['jpg','jpeg','png']" 
                     accept="image" 
                     action="/api/krspace-finance-web/cmtbright/upload-pic"
                     :on-success="uploadPicSuccess"
                     :on-format-error="uploadPicErr"
                     :before-upload="handleBeforeUpload"
                     style="display:inline-block;"
                     :show-upload-list="false"
                     
                   >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                </FormItem>

            </Form>

        </div>

        <div style="text-align:center;" slot="footer">
            <Button type="primary" @click="editSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 38px" @click="editDialog">取消</Button>
        </div>

    </Modal>

    <Message
        :type="MessageType"
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>

    <Modal
        v-model="openDel"
        title="提示信息"
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-del-title" style="text-align:center;">
            {{msg}}
        </div>
        <div slot="footer" style="text-align:center;">
            <Button type="primary" @click="delSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 38px" @click="delDialog">取消</Button>
        </div>
    </Modal>
</div>

</template>


<script>

import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import SearchCompany from '~/components/SearchCompany';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import SelectFacility from '~/components/SelectFacility';
import Buttons from '~/components/Buttons';

export default {
        name: 'receive',
        components:{
            SectionTitle,
            SearchCompany,
            Message,
            SelectFacility,
            Buttons
        },
        data () {
            return {
                form:'form',
                openCreat:false,
                openDel:false,
                openEdit:false,
                tableData:[],
                totalCount:1,
                pageSize:15,
                page:1,
                delId:'',
                msg:'',
                params:{
                    page:1,
                    pageSize:15,
                    customerName:'',
                },
                uploadList:[],
                upfile:[],
                formItem:{
                    lableType:'',
                    lableName:'',
                    lableUrl:'',
                    orderNum:'',
                    lableTypeName:'',
                },
                editItem:{
                    lableType:'',
                    lableName:'',
                    lableUrl:'',
                    orderNum:'',
                    lableTypeName:'',
                    id:'',
                },
                forms:{
                    invoiceContent:''
                },
                openMessage:false,
                MessageType:'',
                warn:'',
                maxlength:500,
                paymentId:'',
                columns: [
                    {
                        title: '序号',
                        key: 'orderNum',
                        align:'center',
                        width:40,
                    },
                    {
                        title: '名称',
                        key: 'lableName',
                        align:'center',
                        width:200,
                    },
                    {
                        title: '图片',
                        key: 'lableUrl',
                        align:'center',
                    },
                    {
                        title: '类目',
                        key: 'lableTypeName',
                        align:'center',
                        width:200
                    },
                    
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:110,
                        render:(h,params)=>{
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'#2b85e4'
                                        },
                                        on: {
                                            click: () => {
                                                this.editDialog(params.row);
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'#2b85e4'
                                        },
                                        on: {
                                            click: () => {
                                                this.delDialog(params.row)
                                            }
                                        }
                                    }, '删除')
                                ]);

                        }
                    }
                ],
                ruleValidate:{

                    lableName: [
                        { required: true, message: '请填写名称'}
                    ],

                    lableType: [
                        { required: true, message: '请选择类目'}
                    ],

                    orderNum: [
                        { required: true, message: '请填写排序号'}
                    ],
                    lableUrl: [
                        { required: true, message: '请上传图片'}
                    ],

                },
                ruleValidate1:{

                    lableName: [
                        { required: true, message: '请填写名称'}
                    ],

                    lableType: [
                        { required: true, message: '请选择类目'}
                    ],

                    orderNum: [
                        { required: true, message: '请填写排序号'}
                    ],
                    lableUrl: [
                        { required: true, message: '请上传图片'}
                    ],

                },

            }
        },
        created(){
             this.getTableData(this.$route.query);
             this.params=this.$route.query;
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
        methods:{
            delDialog(params){
                this.delId = params.id;
                this.msg = '是否确定删除？';
                this.openDel = !this.openDel;
            },
            
            openView(params){
                window.open(`./payment/detail/${params.id}`,'_blank');
            },

            changeType(value){
                this.formItem.lableType=value;
            },

            handleBeforeUpload(){
                const check = this.$refs.upload.fileList.length < 1;
                console.log(this.$refs.upload.fileList);
                if (!check) {
                    console.log("ff");
                    this.$refs.upload.clearFiles();
                    return true;
                }
                return check;  
            },

            creatDialog(params) {
                this.$refs[this.form].resetFields();
                utils.clearForm(this.formItem);
                this.openCreat=!this.openCreat;
            },

            editDialog(params) {
               
                if(!this.openEdit){
                    this.$http.get('get-facility-detail', params).then((res)=>{
                        this.editItem = res.data;
                        
                        console.log("this",this.editItem);
                    }).catch((err)=>{
                        this.$Notice.error({
                            title:err.message
                        });
                    })
                }
                this.openEdit=!this.openEdit;
                
            },

            getTableData(params){
                this.$http.get('get-facility-list', params).then((res)=>{
                    this.tableData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },

            uploadPicSuccess(res,file){
                if(res.code==1){
                    this.formItem.lableUrl = res.data.picUrl;
                    this.editItem.lableUrl = res.data.picUrl;
                }
            },

            uploadPicErr (file) {
                this.$Notice.warning({
                    title: '请选择正确的文件格式',
                    desc: '请选择jpg/png图片'
                });
            },

            onchange(data){
                this.formItem.customerId=data;
            },
            delSubmit () {
                var that = this;
                console.log(this.delId);
                this.$http.delete('post-facility-del', {id:that.delId}).then((r) => {
                    that.msg=r.data.msg;
                    this.getTableData(this.tabParams);
                })
                this.openDel=!this.openDel;
               
            },
            bindSubmit(){
                this.$refs[this.form].validate((valid)=>{
                    if(valid){
                        this.$http.post('post-facility-save', this.formItem).then((res)=>{
                            if(res.code==-1){
                                this.MessageType="error";
                                this.warn=res.message;
                                this.openMessage=true;
                                return;
                            }
                            this.openCreat=false;
                            this.MessageType="success";
                            this.warn="新建成功"
                            this.openMessage=true;
                            this.getTableData(this.params);
                        }).catch((err)=>{
                             this.$Notice.error({
                                title:err.message
                            });
                        })
                    }
                });

            },
            editSubmit(){
                console.log(this.$refs.editform);
                this.$refs.editform.validate((valid)=>{
                    if(valid){
                        this.$http.post('post-facility-save', this.editItem).then((res)=>{
                            if(res.code==-1){
                                this.MessageType="error";
                                this.warn=res.message;
                                this.openMessage=true;
                                return;
                            }
                            this.openEdit=false;
                            this.MessageType="success";
                            this.warn="修改成功"
                            this.openMessage=true;
                            this.getTableData(this.params);
                        }).catch((err)=>{
                             this.$Notice.error({
                                title:err.message
                            });
                        })
                    }
                });

            },

            onChangeOpen(data){
                this.openMessage=data;
            },

            getSearchData(form){
                this.searchData=form;
            },

            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },

            
            onCollection(){
                window.open('./payment/collection','_blank');
            }

        }

    }
</script>
<style lang="less">

.g-order{
   .u-search{
        height:32px;
        margin:16px 0;
        padding:0 20px;
        .u-high-search{
            width:22px;
            height:22px;
            background:url('~/assets/images/upperSearch.png') no-repeat center;
            background-size: contain;
            float:right;

        }
        .m-search{
            color:#2b85e4;
            display:inline-block;
            margin-left:10px;
            font-size:14px;
            cursor:pointer;
        }
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }
    .u-cancel-title{
        width:85%;
        margin:10px auto;
        font-size:14px;
        text-indent: 28px;
    }
    .u-clearfix { zoom:1; }
    .u-clearfix:after {
        clear: both;
        content: '.';
        height: 0;
        display: block;
        visibility: hidden;
    }

}
.u-bind{
  width:330px;
  margin:25px auto 0;
}
.u-upload-title{
    width:500px;
    div{
        width:97%;
    }
    .u-upload-content{
        width:94px;
        height:110px;
        margin:25px auto 0;
        i{
            text-indent: 19px;
        }
    }
}
</style>
