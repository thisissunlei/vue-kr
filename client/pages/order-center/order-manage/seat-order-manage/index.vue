<template>
    <div class="km-order">
        <SectionTitle title="散座订单"></SectionTitle>
        <SearchForm 
            @submitSearchData = "submitSearchData"
            :meetingStatusOptions ="meetingStatusOptions"
        />
        <div class="seat-table-box table-box" id="daily-inventory-table-list">
            <Table border :loading="loading" :columns="tilteAndStyle" :data="krMeetingList"></Table>
            <!--<SlotHead :class="theHead?'header-here':'header-no'" indentify="daily"/>-->
            <div :class="theEnd?'list-footer':'on-export-middle'" :style="{left:theEnd?0:left+'px',width:'300px'}" v-if="!!krMeetingList && krMeetingList.length>0">
                <div style="display:inline-block;">
                    <Button type='primary'>共{{totalCount}}条</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchform';
import dateUtils from 'vue-dateutils';
import SlotHead from './slotHead';
var layoutScrollHeight = 0;


export default {
   name:'billList',
    head () {
            return {
                title: "散座订单-氪空间后台管理系统"
            }
    },
   data(){
       return {
         searchparams : {
           page: 1,
           pageSize: 50
         },
         left: '',
         width: '',
         sideBar: true,
         totalCount: 0,
         theEnd: true,
         theHead:false,
         loading: true,
         meetingStatusOptions : [],
         tilteAndStyle: [
           {
             title: '订单编号',
             key: 'orderNo',
             minWidth: 160
           },
           {
             title: '预订的社区',
             key: 'communityName',
             align:'center',
             minWidth: 150
           },
           {
             title: '预订数量（个·天）',
             key: 'quantity',
             width: 100,
             align:'center',
           },
           {
             title: '预订天数（天）',
             key: 'reserveDays',
             width: 100,
             align:'center',
           },
           {
             title: '订单金额（元）',
             key: 'realCost',
             width: 100,
             align:'center',
           },
           {
             title: '预订人手机号',
             key: 'seatOrderExtInfo.linkPhone',
             width: 120,
             align:'center',
             render:(h,params)=> {
               let status
               if ( !!params.row.seatOrderExtInfo && !!params.row.seatOrderExtInfo.linkPhone ) {
                 status = params.row.seatOrderExtInfo.linkPhone
               } else {
                 status = ''
               }
               return h('span', {}, status)
             }
           },
           {
             title: '订单生成时间',
             key: 'ctime',
             width: 180,
             align:'center',
             className: 'order-ctime',
             render: (h, params) => {
               return h('div', [

                 h('span', this.returnCtime(params.row.ctime))
               ]);
             }
           },
           {
             title: '订单状态',
             key: 'orderShowStatusName',
             align:'center',
             minWidth: 100
           },
           {
             title: '操作',
             key: '操作',
             width: 100,
             align: 'center',
             render: (h, params) => {
               return h('div', [
                 h('Button', {
                   props: {
                     type: 'primary',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.toDetail(params)
                     }
                   }
                 }, '查看')
               ]);
             }
           }
         ],
         krMeetingList: []
           
       }
   },
   components:{
       SectionTitle,SearchForm, SlotHead
   },
   mounted(){
      this.getkrmeetingStatus();
      this.getListData();
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
    }
  },
   methods:{
        submitSearchData(params){
            var beginTime =( params.cStartTime && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.cStartTime)))||"";
            var endTime = (params.cEndTime && dateUtils.dateToStr("YYYY-MM-DD 23:59:59", new Date(params.cEndTime)))||"";

            var timeObject ={
              cStartTime : beginTime,
              cEndTime : endTime
            }
          this.loading = true
          this.searchparams.page = 1
          layoutScrollHeight = 0
          this.krMeetingList = []
            var newParams = Object.assign({},this.searchparams,params,timeObject)
            this.searchparams = newParams;
            this.getListData();

        },
        toDetail(params){
            window.open(`/order-center/order-manage/seat-order-manage/detail?orderId=${params.row.id}`,'_blank');
        },
        getListData(){
          var params = this.searchparams;
          this.$http.get('get-kr-o-list', params).then((res)=>{
            this.loading = false
            this.totalCount = res.data.totalCount
            this.krMeetingList = this.krMeetingList.concat(res.data.items)
            this.$nextTick(() => {
              var div = document.getElementById('layout-content-main')
              div.scrollTop = layoutScrollHeight
            })
          }).catch((err)=>{
            this.$Notice.error({
              title:err.message
            });
          })
        },
        returnText(param){
            var meetingStatusOptions = this.meetingStatusOptions;
            for(var i =0;i<meetingStatusOptions.length;i++){
                if(param == meetingStatusOptions[i].name){
                    
                    return meetingStatusOptions[i].desc;
                }
            }
        },
     // 获取订单状态列表
        getkrmeetingStatus(){
            
            this.$http.get('getkrmeetingstatus','').then((res)=>{

                var resultItems = res.data.status;
                this.meetingStatusOptions = resultItems;
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        returnCtime(param){
            var cTime = param && dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(param))||"";
            return cTime
        },
     onScrollListener() {
       var header = document.getElementsByClassName('ivu-table-header')
       var dom=document.getElementById('layout-content-main');
       var headDom=document.getElementById('slot-head-daily-inventory');
       if(headDom){
         headDom.style.left = this.left+'px';
         headDom.style.width = this.width+'px';
       }
       if(dom.scrollTop > 200){
         this.theHead = true;
         header[0].style.position = 'fixed'
         header[0].style.zIndex = '23'
         header[0].style.top = '60px'
       }else{
         this.theHead = false;
         header[0].style.position = 'static'
       }

       if(!this.theEnd && (dom.scrollTop + dom.clientHeight >= dom.scrollHeight)){
         this.theEnd = true;
       }
       if(this.theEnd && (dom.scrollTop + dom.clientHeight < dom.scrollHeight)){
         this.theEnd = false;
       }

       layoutScrollHeight = dom.scrollTop;
       var totalPage = Math.ceil(this.totalCount/this.searchparams.pageSize);
       if(dom.scrollHeight-dom.scrollTop-dom.clientHeight<10){
         if(this.searchparams.page >= totalPage){
           return ;
         }

         this.searchparams.page = Number(this.searchparams.page)+1;
         this.getListData();
       }
     },
     onResize() {}
        
    }
 }
</script>
<style lang="less">
    .seat-table-box{
        position: relative;
        margin: 0 20px;
        padding-bottom: 77px;
        .list-footer{
            position: absolute;
            bottom: 0;
            padding:20px 0 20px 0;
        }
        .on-export-middle{
            position: fixed;
            bottom: 53px;
            z-index: 999;
            left: 20px;
            padding:17px 0 20px 0;
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