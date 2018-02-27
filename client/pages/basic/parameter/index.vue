<template>
<div class="g-order">
    <SectionTitle title="参数配置"></SectionTitle>
    <div class="u-search" >
        <Button type="primary" @click="onCreate">新建</Button> 
    </div>
    <div class="u-table">
        <Table border  :columns="columns" :data="tableData"  stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
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
    
   <!-- 新建 -->
     <Modal
        v-model="openCreate"
        title="新建参数"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >  
        <Form ></Form>
        <div slot="footer">
            <Button type="primary" @click="onSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancelCreate">取消</Button>
        </div>
    </Modal>

    <!-- 编辑 -->
    <Modal
        v-model="openEdit"
        title="编辑参数"
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-cancel-title">
            {{msg}}
        </div>
        <div slot="footer">
            <Button type="primary" @click="editSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancelEdit">取消</Button>
        </div>
    </Modal>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>
</div>
</template>


<script>

import Form from './form';
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';
import utils from '~/plugins/utils';


export default {
        name: 'Meeting',
        components:{
            Form,
            SectionTitle,
            Message
        },
        data () {
            return {
                openCreate:false,
                openEdit:false,
                totalCount:1,
                tableData:[],
                pageSize:15,
                page:1,
                params:{
                    page:1,
                    pageSize:15,
                    customerName:''
                },
                openMessage:false,
                warn:'',
                MessageType:'',
                msg:'',
                columns: [
                    {
                        title: '名称',
                        key: 'orderNo',
                        align:'center'
                    },
                    {
                        title: '编码',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '值',
                        key: 'communityName',
                        align:'center',
                        width:140,
                    },
                    {
                        title: '描述',
                        key: 'totalAmount',
                        align:'center',
                        width:100,
                    },
                    {
                        title: '是否启用',
                        key: 'orderStatus',
                        align:'center',
                        width:100,
                        render(h, obj){
                            switch (obj.row.orderStatus){
                                case 'VALID':
                                return h('span', { 
                                           style: {
                                                color:'#666666'
                                            }       
                                        }, '已生效');
                                break;
                                case 'CANCEL':
                                return h('span', { 
                                            style: {
                                                color:'#F5A623'
                                            }       
                                        }, '已作废');
                                break;
                                case 'REFUND':
                                return h('span', { 
                                            style: {
                                                color:'#FF6868'
                                            }       
                                    }, '已退订');
                                break;
                            }
                           
                        }
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
                                            this.showEdit(params.row)
                                                
                                        }
                                    }
                                }, '编辑')
                            ]);  
                    
                    }
                    }
                ]
                
            }
        },
        created(){
             this.getTableData(this.$route.query);
             if(!this.$route.query.customerName){
                 this.$route.query.customerName=""
             }
             this.params=this.$route.query;
           
        },
        methods:{
            getTableData(params){
                this.$http.get('join-bill-list', params).then((res)=>{
                    this.tableData=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                 
            },
            onCreate(){
                this.openCreate = true;
            },
            cancelCreate(){
                this.openCreate = false;
            },
            onSubmit(){
                //数据
                //提交数据
                this.openCreate = true;
            },
            editSubmit(){
                this.openEdit = false;
            },
            cancelEdit(){
                this.openEdit = false;
            },
            onChangeOpen(){
                console.log('changeOpen')
            },
            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },
            showEdit(item){
                console.log('openEdit',item);
                this.openEdit = true;
            }


        }

    }
</script>

<style lang="less"> 
.g-order{
  .u-search{
        height:32px;
        margin:16px 20px;
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }
    .m-search{
        color:#2b85e4; 
        display:inline-block;
        margin-left:10px;
        font-size:14px;
        cursor:pointer;
    }
}   
.u-cancel-title{
    width:334px;
    text-align: center;
    margin:40px auto 35px;
    font-size:14px;
}
</style>