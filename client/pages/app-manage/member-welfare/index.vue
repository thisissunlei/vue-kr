<template>
 <div class="g-member-welfare">
       <SectionTitle title="会员福利管理" />
            <div class="u-search" >
                 <Button type="primary" @click="jumpCreate">新建</Button>
                <span class="u-high-search" @click="showSearch"></span>  
                <SearchForm 
                        :searchFilter="searchFilter"
                        :onSubmit="onSubmit"
                /> 
            </div>
          <div class="u-table">
            <Table  border :columns="welfareColumns" :data="tableList"/>
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
import SearchForm from '~/components/SearchForm';
import utils from '~/plugins/utils';
import HighSearch from './highSearch';

export default {
  components:{
      SectionTitle,
      SearchForm,
      HighSearch
  },
  data(){
      return{
           pageSize:15,
           page:1,
           totalCount:0,
           tableList:[],
           openCancel:false,
           openSearch:false,
           Params:{
              pageSize:15,
              page:1, 
           },
           couponId:'',
           searchFilter:[
               {
                   label:'福利标题',
                   value:'title'
               },
               {
                   label:'创建人',
                   value:'createName'
               }
           ],
           welfareColumns:[
                {
                    title: '福利标题',
                    key: 'title',
                    align:'center'
                },
                {
                    title: '福利类型',
                    key: 'couponType',
                    align:'center',
                    render(h, obj){
                        let type={
                            'OFFLINESTORE':'线下门店',
                            'USERLIFE':'会员生活',
                            'ENTERPRISESERVICE':'企业服务',
                        }
                        return h('span',{},type[obj.row.couponType]);
                    }
                },
                {
                    title: '优惠面值',
                    key: 'faceValue',
                    align:'center'
                },
                {
                    title: '福利范围',
                    key: 'scopeCitys',
                    align:'center'
                },
                {
                    title: '领取有效期',
                    key: 'indate',
                    align:'center',
                    width:260,
                },
                {
                    title: '创建人',
                    key: 'createName',
                    align:'center',
                    width:80,
                },
                {
                    title: '操作',
                    key: 'effective',
                    align:'center',
                    render:(h,params)=>{
                        if(params.row.effective==1){
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
                                }, '详情'),
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
                                            this.jumpEdit(params.row)
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
                                            this.openDown(params.row)
                                        }
                                    }
                                }, '下线')
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
                                }, '详情'),
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
                                            this.jumpEdit(params.row)
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                            
                 }
                },
           ]
      }
  },
  created(){
      let query=this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.getTableData(query);
            this.Params=query;
          
        }else{
            this.getTableData(this.Params)
        }
         
  },
//   mounted(){
//       this.getTableData(this.Params);
//   },
  methods:{
    onSubmit(form){ 
          if(this.Params.title){
            this.Params.title="";
          }
          if(this.Params.createName){
            this.Params.createName="";
          }
          let params=Object.assign({},this.Params,form);
          utils.addParams(params);
      },
    showSearch (params) {
        utils.clearForm(this.searchData);
        this.openSearch=!this.openSearch;
      },
     jumpCreate(){
          window.open(`/app-manage/member-welfare/create`,'_blank');
     },
     jumpView(params){
          window.open(`/app-manage/member-welfare/detail/${params.couponId}`,'_blank');
     },
     jumpEdit(params){
         window.open(`/app-manage/member-welfare/edit/${params.couponId}`,'_blank');
     },
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
            this.$http.get('get-coupon-page', params).then((res)=>{
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
       searchSubmit(){
            let params=Object.assign(this.Params,this.searchData);
            utils.addParams(params);
      },
       showSearch (params) {
        utils.clearForm(this.searchData);
        this.openSearch=!this.openSearch;
      },



  }
}
</script>
<style lang="less">
.g-member-welfare{
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
                margin-left:20px;
            }
    }
    .u-table{
        padding:0 20px;
    } 
    .ivu-table-cell{
        padding:0;
    }
    
}


</style>


