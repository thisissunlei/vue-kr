<template>
 <div class="g-topics">
       <SectionTitle title="话题" />
              <div class="u-select">
                        <div class="u-select-list">
                            <span class="u-select-label">福利类型</span>
                            <Select
                                clearable
                                v-model="formItem.couponType"
                                placeholder="请选择"
                                style="width:100px"
                                >
                                <Option v-for="(option, index) in couponTypeList" :value="option.value" :key="index">{{option.label}}</Option>
                            </Select>
                        </div>
                        <div class="u-select-list">
                                <span  class="u-select-label">福利范围</span>
                                <Select
                                    v-model="formItem.cityId"
                                    placeholder="请选择"
                                    style="width:100px"
                                    clearable
                                    >
                                    <Option v-for="(option, index) in cityList" :value="`${option.value}`" :key="index">{{option.label}}</Option>
                                </Select>
                        </div>
                        <div class="u-select-list u-date">
                                <span  class="u-select-label">领取有效期</span>
                                <DatePicker
                                        type="date"
                                        v-model="formItem.startTime"
                                        placeholder="请选择开始日期"
                                        style="width: 150px;margin-right:4px;"
                                ></DatePicker>
                                <span class="u-date-txt">至</span>
                                <DatePicker
                                        type="date"
                                        v-model="formItem.endtime"
                                        placeholder="请选择截止日期"
                                        style="width: 150px;margin-right:4px;"
                                ></DatePicker>
                        </div>
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
    head() {
        return {
            title: '会员福利-氪空间后台管理系统'
        }
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
.g-topics{
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


