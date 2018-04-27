<template>
 <div class="g-member-welfare">
       <SectionTitle title="会员福利管理" />
        <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建</Button>
            <!-- <div style='display:inline-block;float:right;padding-right:20px;'>
                    <Input 
                        v-model="Params.stewardName" 
                        placeholder="请输入管家名称"
                        style="width: 240px"
                    />
                    <div class='m-search' @click="submitLower">搜索</div>
            </div> -->
            
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
export default {
  components:{
      SectionTitle
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
                        return type[obj.row.couponType];
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
                    align:'center'
                },
                {
                    title: '创建人',
                    key: 'createName',
                    align:'center'
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
  mounted(){
      this.getTableData(this.Params);
  },
  methods:{
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



  }
}
</script>
<style lang="less">
.g-member-welfare{
    .u-search{
        height:32px;
        margin:16px 0;
        padding:0 20px;
    }
    .u-table{
        padding:0 20px;
    } 
    .ivu-table-cell{
        padding:0;
    }
    
}


</style>


