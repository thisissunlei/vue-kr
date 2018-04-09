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
        title="新建项目"
        ok-text="确定"
        cancel-text="取消"
        width="373"
     >
        <AddArchives @bindData="onAddArchives" ref="fromFieldArchives" v-if="openNewArchives"/> 
        <div slot="footer" style="text-align:center;">
            <Button type="primary" @click="submitAddArchives('formRight')">完成并创建</Button>
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
import AddArchives from './addArchives';

    export default {
        name: 'Bill',
        components:{
            SectionTitle,
            Message,
            Buttons,
            KrField,
            KrTree,
            AddArchives
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
                tabParams:{
                    page:1,
                    pageSize:15,
                    customerName:''
                },
                addData:{},
                /**
                 * 开关部分内容
                */
                openNewArchives:false,
                warn:'',
                MessageType:'',
                billType:{},
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
                        title: '计划项目周期',
                        key: 'plannedPeriod',
                        align:'center',
                        render(h, obj){
                            var label='-';
                            if(obj.row.status==1){
                                label='-';
                            }else{
                                label=obj.row.plannedPeriod;
                            }
                            return label
                        }
                    },
                    {
                        title: '当前项目阶段',
                        className:'current-range',
                        key: 'task',
                        align:'center',
                        render(h, obj){
                           var row='';
                           if(obj.row.tasks){
                               row=obj.row.tasks.map((item,index)=>{
                                  return h('div', [
                                       h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.taskName
                                         }
                                        }, [
                                        h('div', {
                                            attrs: {
                                             class: index!=obj.row.tasks.length-1?'row-current-more current-more-task':'row-current-more current-more-task noBorder'
                                            }
                                        }, item.taskName?`${item.taskName}`:'-')
                                    ])
                                  ]) 
                                })
                                return row
                           }
                          
                        }
                    },
                    {
                        title: '当前项目进度状态',
                        key: 'task',
                        className:'current-range',
                        align:'center',
                        render(h, obj){
                           var row='';
                           if(obj.row.tasks){
                               row=obj.row.tasks.map((item,index)=>{
                                    let label='';
                                    let colorStyle='';
                                    if(item.progressStatus<0){
                                        label='延期'+Math.abs(item.progressStatus)+'天'
                                        colorStyle="color: #FF6868;"
                                    }else if(item.progressStatus===0){
                                        label='正常'
                                    }else if(item.progressStatus>0){
                                        label='提前'+item.progressStatus+'天'
                                        colorStyle="color: #F5A623"
                                    }else{
                                        label='-'
                                    }

                                    return h('div', [
                                       h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content:label
                                         }
                                        }, [
                                        h('div', {
                                            attrs: {
                                             class: index!=obj.row.tasks.length-1?'row-current-more current-more-task':'row-current-more current-more-task noBorder'
                                            },
                                            style:colorStyle
                                        }, `${label}`)
                                    ])
                                  ]) 
                               })
                           }
                           return row
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'cTime',
                        align:'center',
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
        methods:{
            //跳转查看页面
            goView(params){
                window.location.href=`./projectSetting/projectDetail?name=${params.name}&id=${params.id}&city=${params.city}&status=${params.status}`;
            },
            //获取列表数据
            getTableData(params){
                this.$http.get('project-archives-list', params).then((res)=>{
                    this.billList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((error)=>{
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
                this.$http.post('project-archives-add',this.addData).then((res)=>{
                    this.getTableData(this.tabParams);
                    this.newArchives();
                    this.openMessage=true;
                    this.warn='新建成功';
                    this.MessageType="success";
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
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
            }
        }
    }
</script>

<style lang="less">
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
