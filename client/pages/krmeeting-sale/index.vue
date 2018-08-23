<template>
    <div class="g-krmeeting-sale">
        <SectionTitle title="优惠券"></SectionTitle>
         <div class="m-sale-operation">
             <Button type="primary" @click="jumpCreate">新建</Button>
              <div class="u-select">
                    <div class="u-select-list">
                        <span class="u-select-label">优惠券批次</span>
                        <Input
                            v-model="formItem.batchNo"
                            placeholder="请输入搜索关键词"
                            style="width: 150px"
                        />
                    </div>
                    <div class="u-select-list">
                            <span class="u-select-label">优惠券名称</span>
                            <Input
                                v-model="formItem.couponName"
                                placeholder="请输入搜索关键词"
                                style="width: 150px"
                            />
                    </div>
              </div>
             <div class="u-search">
                
                  <div class="u-select-list">
                        <span class="u-select-label">创建时间</span>
                        <DatePicker 
                                v-model="formItem.beginTIme"
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
            v-model="openCreate"
            title="提示信息"
            ok-text="确定"
            cancel-text="取消"
            width="490"
        >
            <div class="u-cancel-title">
                确认要生成优惠券吗，生成后不可编辑？
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitCreateSale">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openCreateSale">取消</Button>
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
              title: "优惠券-氪空间后台管理系统"
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
              formItem:{
                  
              },
              openCreate:false,
              Columns:[
              {
                  title: '优惠券批次',
                  key: 'batchNo',
                  align:'center',
                  fixed: 'left',
                  width: 150,
              },
              {
                  title: '优惠券名称',
                  key: 'couponName',
                  align:'center',
                  fixed: 'left',
                  width: 200,
              },
              {
                  title: '优惠券面额',
                  key: 'amount',
                  align:'center',
                  width: 100,
              },
              {
                  title: '优惠券类型',
                  key: 'ruleType',
                  align:'center',
                  width: 150,
              },
              {
                  title: '有效期类型',
                  key: 'expireType',
                  align:'center',
                  width: 150,
                  render(tag, params){
                      let type={
                          'START_END_TIME':'起止时间',
                          'VALID_DATE':'有效天数'
                      }
                      return type[params.row.expireType];
                  }
              },
              {
                  title: '有效期',
                  key: 'time',
                  align:'center',
                  width: 200,
                  render(tag, params){
                     let startTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.effectAt)) ;
                     let endTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.expireAt)) ;

                    return `${startTime}至${endTime}`;
                  }

              },
              {
                  title: '领取量',
                  key: 'receivingAmount',
                  align:'center',
                  width: 100,
              },
              {
                  title: '领取率',
                  key: 'receivingRate',
                  align:'center',
                  width: 100,
              },
              {
                  title: '使用率',
                  key: 'usageRate',
                  align:'center',
                  width: 100,
              },
              {
                  title: '创建人',
                  key: 'createName',
                  align:'center',
                  width: 150,
              },
              {
                  title: '创建时间',
                  key: 'createTime',
                  align:'center',
                  width: 180,
                  render(tag, params){
                        return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.createTime)) ;
                  }
              },
              {
                  title: '修改人',
                  key: 'updateName',
                  align:'center',
                  width: 150,
              },
              {
                  title: '修改时间',
                  key: 'updateTime',
                  align:'center',
                  width: 180,
                  render(tag, params){
                        return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.updateTime)) ;
                  }
              },
              {
                  title: '操作',
                  key: 'operation',
                  align:'center',
                  width: 150,
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
                                            this.jumpEdit(params.row)
                                        }
                                    }
                                }, '编辑')
                                
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
                                            this.openCreateSale(params.row)
                                        }
                                    }
                                }, '生成优惠券')
                                
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
        this.tabParams=Object.assign({},this.$route.query);
        this.formItem=Object.assign({},this.$route.query);
        this.getTableData(this.tabParams);
     },
      mounted(){
          this.getTableData(this.tabParams)
      },
      methods:{
        getTableData(params){
            this.$http.get('get-coupon-base-by-page', params).then((res)=>{
                    this.saleList=res.data.items;
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
             window.open('/krmeeting-sale/create','_blank');
        },
        jumpEdit(params){
             window.open(`/krmeeting-sale/edit/${params.id}`,'_blank');
        },
        openCreateSale(value){
            this.openCreate=!this.openCreate;
            if(value){
                this.couponBaseId=value.id;
            }
        },
        submitCreateSale(){
            let params={
                    couponBaseId: this.couponBaseId
                }
                this.$http.post('create-coupon', params).then((res)=>{
                    this.$Notice.success({
                        title:'生成优惠券成功'
                    });  
                    this.openCreateSale();
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
            this.tabParams.beginTIme=this.tabParams.beginTIme?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.tabParams.beginTIme)):'';
            this.tabParams.endTime=this.tabParams.endTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.tabParams.endTime)):'';
            utils.addParams(this.tabParams);
        },

      }
}
</script>
<style lang="less">
.g-krmeeting-sale{
     .m-sale-operation{
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
            padding:0 5px;
        }
    }
    .u-table{
        padding:0 20px 30px;
    }
}

</style>


