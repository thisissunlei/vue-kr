<template>
  <div class="enter-filed">
      <SectionTitle title="散座"></SectionTitle>
      <div class="seat-form">
          <Form label-position="left">
              <FormItem label="上架状态：">
                  <RadioGroup v-model="tabForms.kmPublished" @on-change="changeKmPublished">
                      <Radio value="0" label="ON">已上架</Radio>
                      <!--<Radio value="1" label="WAIT">预上架</Radio>-->
                      <Radio value="2" label="NOT">下架</Radio>
                  </RadioGroup>
              </FormItem>
          </Form>
      </div>


      <div class='enter-filed-table' id="daily-inventory-table-list">
          <Table :loading="loading" border stripe :columns="tilteAndStyle" :data="list">
              <div slot="loading">
                  <Loading/>
              </div>
          </Table>
          <SlotHead :class="theHead?'header-here':'header-no'" indentify="daily"/>
          <div class='spin-position-fix' v-if="spinLoading">
              <Spin fix size="large"></Spin>
          </div>
          <div :class="theEnd?'list-footer':'on-export-middle'" :style="{left:theEnd?0:left+'px',width:'300px'}" v-if="!!list && list.length>0">
              <div style="display:inline-block;">
                  <Button type='primary'>共{{totalCount}}条</Button>
              </div>
          </div>
      </div>
      <Message
          :type="MessageType"
          :openMessage="openMessage"
          :warn="warn"
          @changeOpen="onMessageChange"
      />
    </div>
</template>


<script>
  import SectionTitle from '~/components/SectionTitle';
import ToolTip from '~/components/ToolTip';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import Message from '~/components/Message';
import SlotHead from './slotHead';
import Loading from '~/components/Loading';
var layoutScrollHeight=0;
    export default {
      head () {
        return {
          title: "散座"
        }
      },
      components:{
        SectionTitle,
        SlotHead,
        Message,
        ToolTip,
        Loading
      },
      data () {
        return {
          list:[],
          loading: true,
          tabForms:{
            page:1,
            pageSize: 50,
            kmPublished: ''
          },
          left:'',
          width:'',
          sideBar:true,
          totalCount: 0,
          spinLoading:false,
          theHead:false,
          theEnd:true,
          tilteAndStyle: [{
            title: '社区',
            key: 'communityName',
            align:'center',
            render:(h,params)=> {
              let status = params.row.communityName ? params.row.communityName : '-'
              return h('span', {}, status)
            }
          }, {
            title: '开放时间',
            key: 'kmStartTime',
            width: 150,
            align:'center',
            render:(h,params)=> {
              let status = params.row.kmStartTime ? params.row.kmStartTime : '-'
              return h('span', {}, status)
            }
          }, {
            title: '今日开放数量',
            key: 'todayGood.quantity',
            width: 120,
            align:'center',
            render:(h,params)=> {
              let status
              if ( !!params.row.todayGood && !!params.row.todayGood.quantity ) {
                status = params.row.todayGood.quantity
              } else {
                status = '-'
              }
              return h('span', {}, status)
            }
          }, {
            title: '今日可订数量',
            key: 'todayGood.remainQuantity',
            width: 120,
            align:'center',
            render:(h,params)=> {
              let status
              if ( !!params.row.todayGood && !!params.row.todayGood.remainQuantity ) {
                status = params.row.todayGood.remainQuantity
              } else {
                status = '-'
              }
              return h('span', {}, status)
            }
          }, {
            title: '今日会员单价',
            key: 'todayGood.priceDecimal',
            width: 120,
            align:'center',
            render:(h,params)=> {
              let status
              if ( !!params.row.todayGood && !!params.row.todayGood.priceDecimal ) {
                status = params.row.todayGood.priceDecimal
              } else {
                status = '-'
              }
              return h('span', {}, status)
            }
          }, {
            title: '今日游客单价',
            key: 'todayGood.guestPriceDecimal',
            width: 120,
            align:'center',
            render:(h,params)=> {
              let status
              if ( !!params.row.todayGood && !!params.row.todayGood.guestPriceDecimal ) {
                status = params.row.todayGood.guestPriceDecimal
              } else {
                status = '-'
              }
              return h('span', {}, status)
            }
          }, {
            title: '上架状态',
            key: 'publishedStr',
            width: 120,
            align:'center',
            render:(h,params)=> {
              let status = params.row.publishedStr ? params.row.publishedStr : '-'
              return h('span', {}, status)
            }
          }, {
            title: '操作',
            key: 'no',
            width: 120,
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
                      this.jumpEdit(params.row);
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
                      this.jumpCheck(params.row);
                    }
                  }
                }, '查看')
              ]);
            }
          }],
          openMessage:false,
          MessageType:'',
          warn:''
        }
      },
      mounted(){
        this.getData()
        var dom=document.getElementById('layout-content-main');
        var dailyTableDom=document.getElementById('daily-inventory-table-list');
        if(dailyTableDom){
          this.left=dailyTableDom.getBoundingClientRect().left;
          this.width=dailyTableDom.getBoundingClientRect().width;
        }
        dom.addEventListener("scroll",this.onScrollListener);
        window.addEventListener('resize',this.onResize);
        var _this=this;
        LISTENSIDEBAROPEN(function (params) {
          _this.sideBar = params;
        })

      },
        watch:{
            sideBar:function(val){
                var dailyTableDom=document.getElementById('daily-inventory-table-list');
                this.left=dailyTableDom.getBoundingClientRect().left;
                this.width=dailyTableDom.getBoundingClientRect().width;
                this.onScrollListener();
            },
            tabForms:function(val,old){
                this.getData()
            }
        },
        destroyed(){
            var dom=document.getElementById('layout-content-main');
            dom.removeEventListener("scroll",this.onScrollListener);
            window.removeEventListener('resize',this.onResize); 
        },
        methods:{
          changeKmPublished(e) {
            layoutScrollHeight = 0
            this.list = []
            this.tabForms.page = 1
            this.loading = true
            this.getData()
          },
          getData(){
            this.$http.get('get-kr-i-list', this.tabForms).then((res)=>{
              this.loading = false
              this.spinLoading = false
              this.totalCount = res.data.totalCount
              this.list = this.list.concat(res.data.items);
              this.$nextTick(() => {
                var div = document.getElementById('layout-content-main')
                div.scrollTop = layoutScrollHeight
              })
            }).catch((error)=>{
              this.$Notice.error({
                title: error.message
              })
            })
          },
          //滚动监听
          onScrollListener(){
            var dom=document.getElementById('layout-content-main');
            var headDom=document.getElementById('slot-head-daily-inventory');
            if(headDom){
              headDom.style.left=this.left+'px';
              headDom.style.width=this.width+'px';
            }

            if(dom.scrollTop>148){
              this.theHead = true;
            }else{
              this.theHead = false;
            }

            if(!this.theEnd && (dom.scrollTop + dom.clientHeight >= dom.scrollHeight)){
              this.theEnd=true;
            }
            if(this.theEnd && (dom.scrollTop + dom.clientHeight < dom.scrollHeight)){
              this.theEnd=false;
            }

            layoutScrollHeight=dom.scrollTop;
            var totalPage=Math.ceil(this.totalCount/this.tabForms.pageSize);
            if(dom.scrollHeight-dom.scrollTop-dom.clientHeight<10){
              if(this.tabForms.page>=totalPage){
                return ;
              }
              if ( !!this.spinLoading ) {
                return;
              }
              this.spinLoading=true;
              this.tabForms.page=Number(this.tabForms.page)+1;
              this.getData();
            }
          },
          //信息提示框
          onMessageChange(data){
            this.openMessage = data;
          },
          jumpEdit(row) {

            window.open(`/krmeeting-seat/${row.communityId}/edit`,'_blank');
          },
          jumpCheck(row) {
            window.open(`/krmeeting-seat/${row.communityId}/view`,'_blank');
          }
        }
    }
</script>

<style lang="less">
    .seat-form {
        padding: 20px 20px 0;
    }
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
}
.enter-filed{
    .enter-filed-table{
        position: relative;
        padding: 0 ;
        padding-bottom:77px;
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
            background-color: #f6f6f6;
        }
        .line{
            display:inline-block;
            width:100%;
            border-top:1px solid #dddee1;
            margin-bottom:10px;
        }
        .daily-table{
            padding-bottom:77px; 
            margin-top: 30px;
            .ivu-tooltip{
                width:100%
            }
            .ivu-tooltip-rel{
                width:100%
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:200px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
            .spin-position-fix {
                position: relative;
                .ivu-spin-fix{
                    height: 50px;
                    bottom:60px;
                    background-color:transparent;
                }
            }
            .list-footer{
                padding:20px 0 20px 20px;
                position: absolute;
                bottom: 0px;
                padding-left:0;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 0;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                    padding-right:5px;
                }
            }
            .statusClass{
                .ivu-table-cell{
                    padding:0 5px;
                }
            }
            .daily-here-date{
                .ivu-table-cell{
                    padding:0 10px;
                }
            }
            .header-here{
                opacity:1;
            }
            .header-no{
                transition: opacity 0.2 ease;
                opacity: 0;
            }
        }
    }
}
     .enter-filed-table{
            padding-bottom:77px; 
            margin:0 20px;
            //margin-top: 30px;
            position: relative;
            .ivu-tooltip{
                width:100%
            }
            .ivu-tooltip-rel{
                width:100%
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:200px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
            .spin-position-fix {
                position: relative;
                .ivu-spin-fix{
                    height: 50px;
                    bottom:60px;
                    background-color:transparent;
                }
            }
            .list-footer{
                padding:20px 0 20px 20px;
                position: absolute;
                bottom: 0px;
                padding-left:0;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 0;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                    padding-right:5px;
                }
            }
            .statusClass{
                .ivu-table-cell{
                    padding:0 5px;
                }
            }
            .daily-here-date{
                .ivu-table-cell{
                    padding:0 10px;
                }
            }
            .header-here{
                opacity:1;
            }
            .header-no{
                transition: opacity 0.2 ease;
                opacity: 0;
            }
        }
</style>


