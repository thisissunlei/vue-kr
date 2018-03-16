<template>
<div class="archives">
    <div class="u-search" >
        <Buttons type="primary" label='新建项目' @click="newArchives" checkAction='seat_order_in_export'/>
    </div>
    <div class="u-table">
        <Table  border :columns="columns" :data="billList"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page 
                    :current="page"
                    :total="totalCount"
                    :page-size="pageSize" 
                    show-total 
                    show-elevator
                    @on-change="changePage"
                ></Page>
            </div>
        </div>
    </div>
    
  
    <Modal
        v-model="openNewArchives"
        title="新建档案"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
        <Form :model="formRight" :rules="ruleValidate" label-position="left">

            <!--<Form-item label="项目名称" class="bill-search-class" prop="name">
                    <i-input 
                        v-model="formRight.name" 
                        placeholder="请输入项目名称"
                        style="width: 252px"
                    /> 
            </Form-item>
            
            <Form-item label="所在地区" class="bill-search-class" prop="city">
                    <KrField 
                        type="cascader" 
                        placeholder="请输入所在地区" 
                        @okClick="okClick"
                        @change="cascaderChange"
                    />
            </Form-item>-->

            <!--<KrField :readOrEdit="true" type="datetime"  label="含税" value="2018-01-02 10:10" placeholder="请输入含税收入"/>
            <KrField :readOrEdit="true" type="city" label="含税" :cityValue="valueCity" placeholder="请输入含税收入" />
            <KrField :readOrEdit="true" type="textarea"  label="含税" value="123er" placeholder="请输入含税收入" :maxLength="200"/>
            <KrField :readOrEdit="true" type="time"  label="含税" value="10:10" placeholder="请输入含税收入"/>
            <KrField :readOrEdit="true" type="date"  label="含税" value="2018-01-02" placeholder="请输入含税收入"/>
            <KrField :readOrEdit="true" type="select"   label="含税" value="1" placeholder="请输入含税收入" :selectData="selectData" :filterable="true"/>

            <KrField :readOrEdit="true" type="text" label="含税" value="什么东西" placeholder="请输入含税收入" />
        
            <KrField type="selectTree" :data="data" label="含税"  placeholder="请输入含税收入" />

            <KrField :readOrEdit="true" type="upFiles" :data="data" label="含税"  placeholder="请输入含税收入" :value="imgs" />-->
          
            <!--<KrField 
                :readOrEdit="true" 
                type="datetime"  
                label="含税" 
                value="2018-01-02 10:10" 
                placeholder="请输入含税收入"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="cascader" 
                label="含税" 
                value="221"
                placeholder="请输入含税收入" 
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="textarea"  
                label="含税" 
                value="123er" 
                placeholder="请输入含税收入" 
                :maxLength="200"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="time"  
                label="含税" 
                value="10:10" 
                placeholder="请输入含税收入"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="date"  
                label="含税" 
                value="2018-01-02" 
                placeholder="请输入含税收入"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="select"   
                label="含税" 
                value="1" 
                placeholder="请输入含税收入" 
                :selectData="selectData" 
                :filterable="true"
                @okClick="okClick"
            />
            <KrField 
                :readOrEdit="true" 
                type="text" 
                label="含税" 
                value="什么东西" 
                placeholder="请输入含税收入" 
                @okClick="okClick"
            />-->
          
            <KrField 
              type="selectTree" 
              :data="data" 
              label="含税" 
              value="formRight.input" 
              placeholder="请输入含税收入"
            />


            <KrField 
                :readOrEdit="true" 
                type="upFiles" 
                :data="data" 
                label="含税"  
                placeholder="请输入含税收入" 
                :value="imgs" 
                @okClick="okClick"
            />

        </Form>
        <div slot="footer">
            <Buttons type="primary" label='完成并创建' @click="newArchivesSubmit" :data="imgs" checkAction='bill_batch_pay'/>
        </div>
    </Modal>
    <!-- <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message> -->
</div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
import KrField from '~/components/KrField';

    export default {
        name: 'Bill',
        components:{
            SectionTitle,
            Message,
            Buttons,
            KrField
        },
        data () {
            return {
                imgs:[{url:'http://krspace-upload.oss-cn-qingdao.aliyuncs.com/erp_public_upload/201801/A/185423628_871.jpg'},
                    {url:'http://krspace-upload.oss-cn-qingdao.aliyuncs.com/erp_public_upload/201712/P/152142442_752.JPG'}
                ],
                totalCount:0,
                openSearch:false,
                openSettle:false,
                openAntiSettle:false,
                openClose:false,
                billList:[],
                itemDetail:{},
                pageSize:15,
                page:1,
                tabParams:{
                    page:1,
                    pageSize:15,
                    customerName:''
                },
                formRight:{
                    input:'',
                    name:'',
                    city:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '项目名称必填', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: '所在城市必填', trigger: 'change' }
                    ]
                },
                /**
                 * 开关部分内容
                */
                openNewArchives:false,
                warn:'',
                MessageType:'',
                billType:{},
                selectData:[
                    {label:'123',value:'1'},
                    {label:'456',value:'2'}
                ],
                valueCity:[3,4,64],
                data:[
                    {
                        title: 'parent 1',
                        expand: true,
                        tId:1,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                tId:2,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        tId:3,
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        tId:4,
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                tId:5,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        tId:6,
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        tId:7,
                                    }
                                ]
                            }
                        ]
                    }
                ],
                columns: [
                    {
                        title: 'ID',
                        key: 'billNo',
                        align:'center',
                        width:100,
                        fixed:'left'
                    },
                    {
                        title: '项目名称',
                        key: 'customerName',
                        align:'center',
                        width:160,
                        fixed:'left'
                    },
                    {
                        title: '城市',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '产品类型',
                        key: 'totalAmount',
                        align:'center',
                    },
                    {
                        title: '计划项目周期',
                        key: 'freeAmount',
                        align:'center',
                    },
                    {
                        title: '当前项目阶段',
                        key: 'payableAmount',
                        align:'center',
                    },
                    {
                        title: '当前项目进度',
                        key: 'paidAmount',
                        align:'center',
                    },
                    {
                        title: '创建时间',
                        key: 'billingDate',
                        align:'center',
                        render(h, obj){
                            if(!obj.row.billingDate){
                                return '-'
                            }
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billingDate));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:90,
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
                                            this.goView(params.row)
                                        }
                                    }
                                }, '查看详情'),
                            ])
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
             this.tabParams=this.$route.query;
             
        },
        methods:{
            okClick(event){
                console.log(event,"--------------");
            },
            change(event){
                console.log(event.target.value,"llllll")
            },
            cascaderChange(event){
                 this.formRight.city=event;
            },
            radioChange(event){
                console.log(event,"event");
            },
            onSelectChange(value){
                console.log(value,"Select")
            },
            //跳转查看页面
            goView(params){
                window.open(`./list/detail/${params.billId}`,'_blank');
            },
            //获取列表数据
            getTableData(params){
                this.$http.get('get-bill-list', params).then((res)=>{
                    this.billList=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
                
            },
            //新建项目创建成功
            newArchivesSubmit(){
                console.log('from--',this.formRight);
            },
            //信息提示框
            onChangeOpen(data){
                this.openMessage=data;
            },
            //页面发生改变
            changePage(page){
                this.tabParams.page=page;
                this.page=page;
                this.getTableData(this.tabParams);
            },
            newArchives(){
                this.openNewArchives = !this.openNewArchives;
            },
            dateChange(value){
                console.log('value-',value);
            }
            
        }

    }
</script>

<style lang="less" scoped>
.archives{
    padding:0 20px;
    .u-search{
            height:32px;
            margin:16px 0;
       
            .u-high-search{
                width:22px;
                height:22px;
                background:url('~/assets/images/upperSearch.png') no-repeat center;
                background-size: contain;
                float:right;
                cursor:pointer;

            }
    }
   
}
.bill-search-class{
        width:50%;
        padding-left:32px;
}
</style>
