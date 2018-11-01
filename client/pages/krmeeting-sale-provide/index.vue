<template>
    <div class="g-krmeeting-sale">
        <SectionTitle title="优惠券发放"></SectionTitle>
         <div class="m-sale-operation">
             <Button type="primary" @click="jumpCreate">新建</Button>
             <div class="u-search">
                 <div class="u-select-list">
                        <span class="u-select-label">发放说明</span>
                        <Input
                            v-model="formItem.desc"
                            placeholder="请输入搜索关键词"
                            style="width: 200px"
                        />
                    </div>
                  <div class="u-select-list">
                        <span class="u-select-label">发放时间</span>
                        <DatePicker 
                                v-model="formItem.beginTime"
                                type="date"
                                format="yyyy-MM-dd" 
                                placeholder="创建开始日期" 
                                style="width: 200px"
                            />
                        <span class="u-date-txt">至</span>
                            <DatePicker 
                                v-model="formItem.endTime"
                                type="date" 
                                format="yyyy-MM-dd"
                                placeholder="创建结束日期" 
                                style="width: 200px"
                            />
                    </div>
                  <Button type="primary" @click="lowerSubmit">查询</Button>
             </div>
            
        </div>
         <div class="u-table">
            <Table border :columns="Columns" :data="saleList"  stripe></Table>
             <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize" 
                        show-total 
                        show-elevator
                        @on-change="onPageChange"
                    />
                </div>
            </div>
         </div> 
          <Modal
            v-model="openDelete"
            title="提示信息"
            ok-text="确定"
            cancel-text="取消"
            width="490"
        >
            <div class="u-cancel-title">
                确认删除该发放规则吗？
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitDeleteSale">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openDeleteSale">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
     head () {
          return {
              title: "优惠券发放-氪空间后台管理系统"
          }
      },
      components:{
        SectionTitle,
       
      },
      data(){
          return{
              page:1,
              pageSize:15,
              totalCount:0,
              tabParams:{
                  page:1,
                  pageSize:15
              },
              formItem:{},
              openDelete:false,
              Columns:[
              {
                  title: '发放ID',
                  key: 'id',
                  align:'center',
                  fixed: 'left',
                  width: 80,
              },
              {
                  title: '发放说明',
                  key: 'desc',
                  align:'center',
                  fixed: 'left',
                  width: 200,
              },
              {
                  title: '优惠券名称',
                  key: 'couponNames',
                  align:'center',
                  fixed: 'left',
                  width: 150,

              },
               {
                  title: '发放对象',
                  key: 'userType',
                  align:'center',
                  width: 200,
                  render(tag, params){
                      let type={
                          'ALL':'全部用户',
                          'CUSTOM':`自定义用户(${params.row.totalCount})`,
                          'UPLOAD':`上传手机号(${params.row.sendCount})`
                      }
                      return type[params.row.userType];
                  }
                  
              },
              {
                  title: '发放时间',
                  key: 'ptime',
                  align:'center',
                  width: 180,
                  render(tag, params){
                        let time=dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.ptime)) ;
                        return time;
                  }
              },
              {
                  title: '发放数量(张数)',
                  key: 'totalCount',
                  align:'center',
                  width: 150,
              },
              {
                  title: '使用率',
                  key: 'usageRate',
                  align:'center',
                  width: 100,
              },
              {
                  title: '创建时间',
                  key: 'ctime',
                  align:'center',
                  width: 180,
                  render(tag, params){
                        return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.ctime)) ;
                  }
              },
              {
                  title: '创建人',
                  key: 'creator',
                  align:'center',
                  width: 150,
              },
              {
                  title: '操作',
                  key: 'operation',
                  align:'center',
                  width: 180,
                  fixed: 'right',
                  render:(h,params)=>{
                        if(params.row.producted==1){
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
                                }, '查看'),
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
                                            this.openDeleteSale(params.row)
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
                                            this.openDeleteSale(params.row)
                                        }
                                    }
                                }, '删除')
                                
                            ]); 
                        }                       
                        
                    }
              },
           ],
           saleList:[],
           couponBaseId:'',

          }
      },
    created(){
        this.tabParams=Object.assign({},this.$route.query,{pageSize:15,page:1});
        this.formItem=Object.assign({},this.$route.query);
        this.getTableData(this.tabParams);
     },
      mounted(){
          this.getTableData(this.tabParams)
      },
      methods:{
        getTableData(params){
            this.$http.get('get-kmcoupon-provide-page', params).then((res)=>{
                    this.saleList=res.data.items;
                    this.totalCount=res.data.totalCount;
            }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
            })
        },
        onPageChange(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
        },
        jumpCreate(){
             window.open('/krmeeting-sale-provide/create','_blank');
        },
        jumpEdit(params){
             window.open(`/krmeeting-sale-provide/edit/${params.id}`,'_blank');
        },
        jumpView(params){
             window.open(`/krmeeting-sale-provide/view/${params.id}`,'_blank');
        },
        openDeleteSale(value){
            this.openDelete=!this.openDelete;
            if(value){
                this.couponBaseId=value.id;
            }
        },
        submitDeleteSale(){
            let params={
                    couponBaseId: this.couponBaseId
                }
                this.$http.post('delete-op-kmcoupon-provide', params).then((res)=>{
                    this.$Notice.success({
                        title:'删除成功'
                    });  
                    this.openDeleteSale();
                    this.getTableData(this.tabParams);
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                 
        },
         lowerSubmit(){
            let params=Object.assign({},this.formItem);
            params.page=1;
            params.pageSize=15;
            this.tabParams=Object.assign({},params);
            this.tabParams.beginTime=this.tabParams.beginTime?dateUtils.dateToStr("YYYY-MM-DD",new Date(this.tabParams.beginTime)):'';
            this.tabParams.endTime=this.tabParams.endTime?dateUtils.dateToStr("YYYY-MM-DD",new Date(this.tabParams.endTime)):'';
            utils.addParams(this.tabParams);
        },

      }
}
</script>
<style lang="less">
.g-krmeeting-sale{
        .ivu-table-fixed-right::before,
        .ivu-table-fixed::before {
            z-index: 3;
        }
        .ivu-tooltip-inner {
            white-space: normal;
        }
        .ivu-table-fixed-right {
            width: 150px !important;
        }
     .m-sale-operation{
         padding:20px 20px;
         height:130px;
         .u-select-list{
             display: inline-block;
             margin:0 20px;
            
         }
         .u-select-label{
             padding-right:10px;
             white-space:nowrap; 
         }
         .u-search{
             display: inline-block;
             height:50px;
             margin-top:15px;
             margin-left:20px;
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
            padding:0 5px;
        }
    }
    .u-table{
        padding:0 20px 30px;
    }
}

</style>


