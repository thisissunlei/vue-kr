<template>
 <div class="g-member-welfare">
       <SectionTitle title="免费额度优惠券管理" />
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
            <Table  border :columns="couponColumns" :data="tableList"/>
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
           couponColumns:[
                {
                    title: '福利标题',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '福利类型',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '优惠面值',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '发放数量',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '领取数量',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '领取有效期',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '创建人',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '操作',
                    key: 'mbrName',
                    align:'center',
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
                        }
                },
           ]
      }
  },
  mounted(){
      this.tableList=[
          {
              mbrName:1111,
              id:1
          }
      ]
  },
  methods:{
     jumpCreate(){
          window.open(`/app-manage/coupon/create`,'_blank');
     },
     jumpView(params){
          window.open(`/app-manage/coupon/detail/${params.id}`,'_blank');
     },
     jumpEdit(params){
         window.open(`/app-manage/coupon/edit/${params.id}`,'_blank');
     },
     openDown(params){
           this.openCancel=!this.openCancel;
           if(params){
               //this.notificationId=params.notificationId
            }
     },
    changePage(page){
        this.tabParams.page=page;
        this.page=page;
        this.getTableData(this.tabParams);
    },
     submitDown(){
            let params={
                    notificationId: this.notificationId
                }
                // this.$http.post('delete-notification', params).then((res)=>{
                //     this.$Notice.success({
                //         title:'删除成功'
                //     });  
                //     this.openDelete();
                //     this.getTableData(this.Params);
                // }).catch((err)=>{
                //     this.$Notice.error({
                //         title:err.message
                //     });
                // })
                 
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


