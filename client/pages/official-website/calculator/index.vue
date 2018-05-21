<template>
<div class="g-order">
    <SectionTitle title="计算器"></SectionTitle>
    <div class="u-search" >
        <Buttons type="primary" label='新建' checkAction='cbd_saveoredit' @click="creatDialog"/>
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
        :title='modelTitle'
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-calculator-box">
            <Form
                ref="form"
                :model="formItem"
                label-position="left"
                :label-width="80"
                class="u-bind u-clearfix"
            >
                <FormItem label="城市">
                    <Select
                        v-model="formItem.cityId"
                        style="width:250px"
                        @on-change='getCityCommunity'
                    >
                        <Option
                            v-for="item in cityList"
                            :value="''+item.id"
                            :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="商圈">
                    <Input
                            v-model="formItem.cbdName"
                            placeholder="请输入商圈"
                            style="width: 250px"
                    ></Input>
                </FormItem>
                <FormItem label="商圈租金">
                    <Input
                            v-model="formItem.price"
                            placeholder="请输入租金"
                            style="width: 250px"
                    ></Input>
                </FormItem>
                <FormItem label="社区">
                    <Select v-model="cmtIds" multiple style="width:250px">
                        <Option
                            v-for="item in communityList"
                            :value="''+item.id"
                            :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div style="text-align:center;" slot="footer">
            <Button type="primary" @click="bindSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 38px" @click="creatDialog">取消</Button>
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
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
import Community from './community'

export default {
        components:{
            SectionTitle,
            Message,
            Buttons,
            Community
        },
        data () {
            return {
                form:'form',
                openCreat:false,
                modelTitle:'',
                openDel:false,
                tableData:[],
                totalCount:1,
                pageSize:15,
                page:1,
                delId:'',
                msg:'',
                params:{
                    page:1,
                    pageSize:15,
                },
                cityList: [

                ],
                communityList: [

                ],
                cmtIds:[],
                formItem:{
                    cityId:'',
                    cbdName:'',
                    price:'',
                },
                editItem:{
                    lableType:'',
                    lableName:'',
                    lableUrl:'',
                    orderNum:'',
                    lableTypeName:'',
                    id:'',
                },
                openMessage:false,
                MessageType:'',
                warn:'',
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '城市',
                        key: 'cityName',
                        align:'center',
                        width:120,
                    },
                    {
                        title: '商圈',
                        key: 'cbdName',
                        align:'center',
                        width:150,
                    },
                    {
                        title: '商圈租金',
                        key: 'price',
                        align:'center',
                        width:170,
                    },
                    {
                        title: '社区',
                        key: 'cbdCmtInfos1',
                        align:'center',
                        render:(h,params)=>{
                            return  h(Community,{
                                        props:{
                                            cbdCmtInfos:params.row.cbdCmtInfos
                                        }
                                    });
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:140,
                        render:(h,params)=>{
                                return h('div', [
                                    h(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'编辑',
                                            checkAction:'cbd_saveoredit',
                                            styles:'color:rgb(43, 133, 228)'
                                        },
                                        on: {
                                            click: () => {
                                                this.editDialog(params.row);
                                            }
                                        }
                                    }),
                                    h(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'删除',
                                            checkAction:'cbd_delete',
                                            styles:'color:rgb(43, 133, 228)'
                                        },
                                        on: {
                                            click: () => {
                                                this.delDialog(params.row)
                                            }
                                        }
                                    })
                                ]);

                        }
                    }
                ],
            }
        },
        created(){
             this.getTableData({page:1,pageSize:15});
             this.getCityData()
        },
        mounted () {

        },
        methods:{
            delDialog(params){
                this.delId = params.id;
                this.msg = '是否确定删除？';
                this.openDel = !this.openDel;
            },
            creatDialog(params) {
                this.$refs[this.form].resetFields();
                utils.clearForm(this.formItem);
                this.modelTitle = '新建'
                this.openCreat=!this.openCreat;
            },
            editDialog(params) {
                let arr = []
                params.cbdCmtInfos.forEach((v,i)=>{
                    arr.push(v.cmtId+'')
                })
                this.formItem.cityId=params.cityId+''
                this.formItem.cbdName=params.cbdName
                this.formItem.price=params.price
                this.formItem.id=params.id
                this.cmtIds=arr
                this.modelTitle = '编辑'
                this.openCreat=!this.openCreat;
            },
            getCityData(){
                this.$http.get('get-calculator-city').then((res)=>{
                    this.cityList = res.data
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getCityCommunity(id){
                if(id){
                    this.$http.get('get-calculator-community',{cityId:id}).then((res)=>{
                        this.communityList = res.data
                    }).catch((err)=>{
                        this.$Notice.error({
                            title:err.message
                        });
                    })
                }else{
                    this.communityList = []
                }
            },
            getTableData(params){
                this.$http.get('get-calculator-list', params).then((res)=>{
                    this.tableData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            onchange(data){
                this.formItem.customerId=data;
            },
            delSubmit () {
                var that = this;
                this.$http.post('get-calculator-delete', {id:that.delId}).then((r) => {
                    that.msg=r.data.msg;
                    console.log(this.totalCount)
                    if((this.totalCount-1)%15 == 0){
                        this.params.page = this.params.page-1
                        this.getTableData(this.params)
                    }else{
                        this.getTableData(this.params);
                    }

                })
                this.openDel=!this.openDel;
            },
            bindSubmit(){
                    console.log(this.formItem)
                    this.formItem.cmtIds = this.cmtIds
                    this.$http.post('post-calculator-new', this.formItem).then((res)=>{
                        if(res.code==-1){
                            this.MessageType="error";
                            this.warn=res.message;
                            this.openMessage=true;
                            return;
                        }
                        this.openCreat=false;
                        this.MessageType="success";
                        this.warn="操作成功"
                        this.openMessage=true;
                        this.getTableData(this.params);
                    }).catch((err)=>{
                         this.$Notice.error({
                            title:err.message
                        });
                    })

            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },

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

    .u-clearfix { zoom:1; }
    .u-clearfix:after {
        clear: both;
        content: '.';
        height: 0;
        display: block;
        visibility: hidden;
    }
}
.u-calculator-box{
    .ivu-select-multiple{
        .ivu-select-selection{
            height:auto;
            overflow: auto;
            white-space: normal;
        }
    }
}
.u-bind{
  width:330px;
  margin:25px auto 0;
}
</style>
