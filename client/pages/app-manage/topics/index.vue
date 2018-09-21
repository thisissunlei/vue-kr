<template>
 <div class="g-topics">
       <SectionTitle title="话题" />
            <div class="m-topics-operation">
                <div class="u-select">
                            <div class="u-select-list">
                                <span class="u-select-label">话题类型</span>
                                <Select
                                    clearable
                                    v-model="formItem.type"
                                    placeholder="请选择"
                                    style="width:100px"
                                    >
                                    <Option v-for="(option, index) in typeList" :value="option.value" :key="index">{{option.label}}</Option>
                                </Select>
                            </div>
                            <div class="u-select-list">
                                    <span  class="u-select-label">话题标题</span>
                                    <Input
                                        v-model="formItem.title"
                                        placeholder="请输入搜索关键词"
                                        style="width: 150px"
                                    />
                            </div>
                            <div class="u-select-list">
                                    <span  class="u-select-label">发起人</span>
                                    <Input
                                        v-model="formItem.createrName"
                                        placeholder="请输入搜索关键词"
                                        style="width: 150px"
                                    />
                            </div>
                             <Button type="primary" @click="lowerSubmit">搜索</Button>
                    </div>
            </div> 
          <div class="u-table">
            <Table  border :columns="topicsColumns" :data="tableList"/>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize" 
                        show-total 
                        show-elevator
                        @on-change="changePage"
                    />
                </div>
            </div>
        </div>
        <Modal
            v-model="openCancel"
            title="下线"
            ok-text="确定"
            cancel-text="取消"
            width="490"
        >
            <div style="text-align:center;font-size:14px;margin-top:20px;">
               下线后，该福利会即时从APP端隐藏，并且会员不可领取
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitDown">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openDown">取消</Button>
            </div>
        </Modal>
        <Modal
                v-model="openSearch"
                title="高级查询"
                ok-text="确定"
                cancel-text="取消"
                width="660"
        >
                <HighSearch @formData="getSearchData"></HighSearch>
                <div slot="footer">
                    <Button type="primary" @click="searchSubmit">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
                </div>
        </Modal>

 </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import utils from '~/plugins/utils';
import CoverImg from './coverImg';

export default {
  components:{
      SectionTitle,
      CoverImg
  },
    head() {
        return {
            title: '话题管理-氪空间后台管理系统'
        }
    },
  data(){
      return{
           pageSize:15,
           page:1,
           totalCount:0,
           tableList:[],
           typeList:[
               {
                   label:'普通话题',
                   value:'NORMAL'
               },
               {
                   label:'投票中',
                   value:'POLLING'
               },
               {
                   label:'投票已结束',
                   value:'POLLEND'
               },
           ],
           Params:{
              pageSize:15,
              page:1, 
           },
           formItem:{

           },
           openCancel:false,
           topicsColumns:[
                {
                    title: '话题封面',
                    key: 'coverImg',
                    align:'center',
                    width:100,
                    render:(h,params)=>{
                        return h(CoverImg ,{
                            props: {
                                imgUrl:params.row.coverImg,
                            }
                         });
                    }
                },
                {
                    title: '话题标题',
                    key: 'title',
                    align:'center',
                },
                {
                    title: '话题描述',
                    key: 'description',
                    align:'center',
                    width:260,
                },
                {
                    title: '话题类型',
                    key: 'type',
                    align:'center'
                },
                {
                    title: '关注人数',
                    key: 'followCount',
                    align:'center',
                    width:80,
                },
                {
                    title: '参与讨论数',
                    key: 'discussCount',
                    align:'center',
                    width:80,
                },

                {
                    title: '发起人',
                    key: 'createrName',
                    align:'center',
                },
                {
                    title: '创建时间',
                    key: 'ctime',
                    align:'center',
                },
                {
                    title: '操作',
                    key: 'type',
                    align:'center',
                    render:(h,params)=>{
                        if(params.row.type=='NORMAL'){
                            if(params.row.stick=='1'){
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
                                                    this.jumpView(params.row)
                                                }
                                            }
                                        }, '取消置顶'),
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
                                                    this.openDown(params.row)
                                                }
                                            }
                                        }, '删除')
                                    ]); 
                            }else{
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
                                                    this.jumpView(params.row)
                                                }
                                            }
                                        }, '置顶'),
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
                                                    this.openDown(params.row)
                                                }
                                            }
                                        }, '删除')
                                    ]); 
                            }
                            
                        }else{
                            if(params.row.stick=='1'){
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
                                                    this.jumpView(params.row)
                                                }
                                            }
                                        }, '取消置顶'),
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
                                                    this.jumpView(params.row)
                                                }
                                            }
                                        }, '投票结果'),
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
                                                    this.openDown(params.row)
                                                }
                                            }
                                        }, '删除')
                                    ]); 
                            }else{
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
                                                    this.jumpView(params.row)
                                                }
                                            }
                                        }, '置顶'),
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
                                                    this.jumpView(params.row)
                                                }
                                            }
                                        }, '投票结果'),
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
                                                    this.openDown(params.row)
                                                }
                                            }
                                        }, '删除')
                                    ]); 
                            }
                        }
                            
                 }
                },
           ]
      }
  },
  created(){
    //   let query=this.$route.query;
    //     if (Object.keys(query).length !== 0) {
    //         this.getTableData(query);
    //         this.Params=query;
          
    //     }else{
    //         this.getTableData(this.Params)
    //     }
    this.tableList=[
        {
          'coverImg' :'http://img5.imgtn.bdimg.com/it/u=415293130,2419074865&fm=27&gp=0.jpg',
          'title':'话题标题话题标题话题标题话题标题',
          'followCount':100000
        }
    ] 
         
  },
  methods:{
        openDown(params){
            this.openCancel=!this.openCancel;
            if(params){
                this.couponId=params.couponId
            }
        },
        changePage(page){
            this.Params.page=page;
            this.page=page;
            this.getTableData(this.Params);
        },
        submitDown(){
                let params={
                        couponId: this.couponId
                    }
                    this.$http.post('coupon-offline', params).then((res)=>{
                        this.$Notice.success({
                            title:'下线成功'
                        });  
                        this.openDown();
                        this.getTableData(this.Params);
                    }).catch((err)=>{
                        this.$Notice.error({
                            title:err.message
                        });
                    })
                    
        },
        getTableData(params){
                this.$http.get('get-app-console-talkpoint-page', params).then((res)=>{
                    this.tableList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            
        },
        getSearchData(form){
            this.searchData=form;
        },
       lowerSubmit(){
            let params=Object.assign({},this.formItem);
            this.tabParams=Object.assign({},params);
            utils.addParams(this.tabParams);
        },
       showSearch (params) {
            utils.clearForm(this.searchData);
            this.openSearch=!this.openSearch;
        },



  }
}
</script>
<style lang="less">
.g-topics{
    .m-topics-operation{
         padding:20px 0;
         height:70px;
         box-sizing: border-box;
    }
    .u-select{
        display: inline-block;
        padding-left:20px;
        height:40px;
        
    }
    .u-select-list{
        display: inline-block;
        margin:0 20px;
    
    }
    .u-select-label{
        padding-right:10px;
        white-space:nowrap; 
    }
    .u-table{
        padding:0 20px;
    } 
    .ivu-table-cell{
        padding:0;
    }
    
}


</style>


