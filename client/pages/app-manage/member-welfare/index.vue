<template>
 <div class="g-member-welfare">
       <SectionTitle title="会员福利管理" />
            <div class="m-welfare-operation">
                 <Button type="primary" @click="jumpCreate">新建</Button>
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
                <div class="u-search">
                    <div class="u-select-list">
                            <span class="u-select-label">福利标题</span>
                            <Input
                                v-model="formItem.title"
                                placeholder="请输入搜索关键词"
                                style="width: 150px"
                            />
                    </div>
                    <div class="u-select-list">
                            <span class="u-select-label">创建人</span>
                            <Input
                                v-model="formItem.createName"
                                placeholder="请输入搜索关键词"
                                style="width: 150px"
                            />
                    </div>
                    <Button type="primary" @click="lowerSubmit">搜索</Button>
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
       
 </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
  components:{
      SectionTitle,
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
           Params:{
              pageSize:15,
              page:1, 
           },
           couponId:'',
           formItem:{
               couponType:'',
               beginTime:'',
               endTime:'',
               title:'',
               createName:'',
           },
           couponTypeList:[],
           cityList:[],
           communityLoading:false,
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
      let query=Object.assign({},this.$route.query);
      var _this=this;
      this.getCityType(function(){
            if (Object.keys(query).length !== 0) {
                _this.Params=Object.assign({},query);
                let formItem=Object.assign({},query);
                _this.formItem=formItem;
                _this.formItem.startTime=formItem.beginTime;
                _this.formItem.endtime=formItem.endTime;
               
                 _this.getTableData(query);
            }else{
                _this.getTableData(_this.Params)
            } 
      })
        
        
         
  },

  methods:{
    getCityType(callback){
             this.$http.get('get-city-and-type', '').then((res)=>{
                   res.data.types.map((item)=>{
                       item.value=item.code;
                       item.label=item.name;
                       return item;
                   })
                   res.data.citys.map((item)=>{
                       item.value=item.id;
                       item.label=item.name;
                       return item;
                   })
                   this.cityList=res.data.citys;
                   this.couponTypeList=res.data.types;
                  
                    callback && callback();
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
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
      
      lowerSubmit(){
          if(this.formItem.startTime){
            let beginTime=dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.startTime));
            this.formItem.beginTime=`${beginTime} 00:00:00`;
          }else{
              this.formItem.beginTime=""
          }
          if(this.formItem.endtime){
            let endTime=dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.endtime));
            this.formItem.endTime=`${endTime} 23:59:59`;
          }else{
              this.formItem.endTime=""
          }
            let formItem=Object.assign({},this.formItem);
            if(formItem.startTime){
              delete formItem.startTime;
            }
            if(formItem.endtime){
                delete formItem.endtime;
            }
           
            let params=Object.assign(this.Params,formItem);
            utils.addParams(params);
      },
      



  }
}
</script>
<style lang="less">
.g-member-welfare{
    .m-welfare-operation{
         padding:20px 20px;
         height:130px;
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
         .u-search{
             height:50px;
             margin-top:15px;
             .u-select-list{
                 margin-left:0;
             }
         }
        .m-search{
            color:#2b85e4;
            display:inline-block;
            margin-left:10px;
            font-size:14px;
            cursor:pointer;
        }
        .u-date-txt{
           padding-right:5px; 
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


