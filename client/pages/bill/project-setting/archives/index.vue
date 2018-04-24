<template>
<div class="archives">
    <div class="u-search" >
        <Button type="primary"  @click="newArchives">新建项目</Button>
    </div>

    <div id="object-seting-archives" class="u-table" style="position:relative;">
        <Table border :columns="columns" :data="billList"></Table>
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
        title="新建项目"
        ok-text="确定"
        cancel-text="取消"
        width="373"
        className="vertical-center-modal"
     >
        <AddArchives @bindData="onAddArchives" ref="fromFieldArchives" v-if="openNewArchives"/>
        <div slot="footer" style="text-align:center;">

            <Button type="primary" :disabled="!allowSubmit" @click="submitAddArchives('formRight')">完成并创建</Button>
        </div>
    </Modal>
    <Message
        :type="MessageType"
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    />
</div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
import KrField from '~/components/KrField';
import KrTree from '~/components/KrTree';
import AddArchives from './add-archives';
import publicFn from '../publicFn';
import Loading from '~/components/Loading'

    export default {
        name: 'Bill',
        components:{
            SectionTitle,
            Message,
            Buttons,
            KrField,
            KrTree,
            AddArchives,
            Loading
        },
        data () {
            return {
                totalCount:0,
                openSettle:false,
                openAntiSettle:false,
                openMessage:false,
                openClose:false,
                billList:[],
                itemDetail:{},
                pageSize:15,
                page:1,
                isLoading:true,
                tabParams:{
                    page:1,
                    pageSize:15,
                    query:'CTIMEDESC'
                },
                addData:{},
                /**
                 * 开关部分内容
                */
                openNewArchives:false,
                warn:'',
                MessageType:'',
                billType:{},
                allowSubmit:true,
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        align:'center',
                        width:100,
                    },
                    {
                        title: '项目名称',
                        key: 'name',
                        align:'center',
                        width:160,
                    },
                    {
                        title: '城市',
                        key: 'city',
                        align:'center',
                    },
                    {
                        title: '当前项目计划进度',
                        key: 'plannedTask',
                        align:'center',

                    },

                    {
                        title: '当前项目实际进度',
                        className:'current-range',
                        colspan:2,
                        key: 'taskStatus',
                        align:'center',
                        sortable: true,
                        render(h, obj){

                            var row='';
                            if(!obj.row.tasks){
                                return  h('div', {
                                    attrs: {
                                        class: 'row-current-more current-more-task table-null'
                                    },
                                }, '-')
                            }
                            let that = this;
                            if(obj.row.tasks){
                                row=obj.row.tasks.map((item,index)=>{
                                    return h('div', [
                                        h('Tooltip', {
                                            props: {
                                                placement: 'top',
                                                content: item.currentTask
                                            }
                                        }, [
                                        h('div', {
                                            attrs: {
                                                class: publicFn.getDivClass(index,obj),
                                            },
                                        }, item.currentTask?`${item.currentTask}`:'-')
                                    ])
                                    ])
                                })
                                return row
                            }
                        }

                    },

                    {
                        title: '当前项目实际进度状态',
                        className:'current-range',
                        key: 'task',
                        align:'center',

                        render(h, obj){
                           var row='';
                           if(!obj.row.tasks){
                                return  h('div', {
                                    attrs: {
                                        class: 'row-current-more current-more-task table-null'
                                    },
                                }, '-')
                            }
                           if(obj.row.tasks){
                               row=obj.row.tasks.map((item,index)=>{

                                   let showVal = !item.taskStatusDesc?'-':item.taskStatusDesc;
                                  return h('div', [
                                       h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: showVal
                                         }
                                        }, [
                                        h('div', {
                                            attrs: {
                                             class: publicFn.getDivClass(index,obj)
                                            },
                                            style:{color:publicFn.getDivColor(item.taskStatus)}
                                        }, showVal)
                                    ])
                                  ])
                                })
                                return row
                           }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'cTime',
                        align:'center',
                        sortable: true,
                        render(h, obj){
                            if(!obj.row.cTime){
                                return '-'
                            }
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.cTime));
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
             this.tabParams=Object.assign({},this.$route.query,{page:1,pageSize:15});
          
            
            
        },
        mounted(){
               this.$nextTick(()=>{
                    let tableDom = document.querySelectorAll('#object-seting-archives table')[0];
                    this.colspan();
                    
                    utils.tableSort(tableDom,this.shortChange);
                    
                    
                })
        },
        methods:{
            colspan(){
                var thDom = document.querySelectorAll('#object-seting-archives table .current-range');
                if(thDom && thDom.length!=0){
                    thDom[0].colSpan = 2;
                    thDom[1].parentNode.removeChild( thDom[1]);
                }
            },
            
            //排序按钮
            shortChange(event){
                console.log(event,"ppppp")
                if(event.label === '创建时间'){
                    if(event.order === 'asc'){
                        this.tabParams.query = 'CTIMEASC';
                    }else{
                        this.tabParams.query = 'CTIMEDESC';
                    }
                }else{
                    if(event.order === 'asc'){
                         this.tabParams.query = 'TASKASC';
                    }else{
                        this.tabParams.query = 'TASKDESC';
                    }
                }
                this.getTableData(this.tabParams)
            },
            //跳转查看页面
            goView(params){
                window.location.href=`./project-setting/project-detail?name=${params.name}&id=${params.id}&city=${params.city}&status=${params.status}`;
            },
            //获取列表数据
            getTableData(params){
                this.isLoading = true;
                this.$http.get('project-archives-list', params).then((res)=>{
                    this.billList=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.isLoading = false;
                }).catch((error)=>{
                    this.isLoading = false;
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })

            },
            onAddArchives(params){
                this.addData=params;
            },
            //新建项目创建成功
            submitAddArchives(name){

                var newPageRefs = this.$refs.fromFieldArchives.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {
                        isSubmit = false
                    }
                })
                if(!isSubmit){
                    return;
                }
                this.addData.province=this.addData.citys[0];
                this.addData.city=this.addData.citys[1];
                this.addData.county=this.addData.citys[2];
                this.allowSubmit = false;
                this.$http.post('project-archives-add',this.addData).then((res)=>{
                    this.getTableData(this.tabParams);
                    this.newArchives();
                    this.openMessage=true;
                    this.warn='新建成功';
                    this.MessageType="success";
                    this.allowSubmit = true;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                    this.allowSubmit = true;
                })
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
                utils.clearForm(this.addData);
                this.openNewArchives = !this.openNewArchives;
                if(this.openNewArchives){
                    this.allowSubmit = true;
                }
            }
        }
    }
</script>

<style lang="less">
.archives{
    padding:0 20px;
    //iview组件样式修改
    .ivu-icon-arrow-up-b::before{
        //  content: '';
    }
    .ivu-icon-arrow-down-b::before{
        //  content: '';
    }
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
    .table-null{
        line-height: 47px;
    }
    .current-range{
        //border-bottom: none;
        .ivu-table-cell{
            padding:0;
            height:100%;
        .ivu-tooltip{
            .row-current-more{
                //border-bottom:1px solid #e9eaec;
                padding: 15px 0 10px 0;
            }
            .noBorder{
                border-bottom:none;
            }
        }
      }
      .ivu-table-cell > div{
            border-bottom:solid 1px #e9eaec;
            &:last-child{
                border-bottom:none;
            }
      }
    }
    .ivu-table-header{
        .ivu-table-cell{
            height:auto;
        }
        thead{
            tr{
                th{
                    &:nth-child(5){
                        border-bottom:solid 1px #e9eaec;
                    }
                    &:nth-child(6){
                        border-bottom:solid 1px #e9eaec;
                    }
                }
            }
        }
    }
    tr.ivu-table-row-hover td{
        background-color: #F7F9FB;
    }
    .ivu-table-header{
        thead{
            height:50px;
            line-height:50px;
        }
    }
    .ivu-table th{
         background-color: #FAFCFF;
    }
}

.ivu-tooltip{
    width:100%;
    //border-bottom: 1px solid #e9eaec;
    .ivu-tooltip-rel{
       width:100%;
    }
}
.current-more-task{
    width:100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

</style>
