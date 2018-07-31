<template>
    <div class="g-member-online">
         <SectionTitle :title="`各社区会员线上化（${sectionTitle}）`" />
         <IconTip style="left:260px;top:-32px;" contentStyle="width:300px" iconStyle="black">
            <p>①  线上化率：已入驻会员获得会员权限满7天后，通过是否登录过APP计算“7天线上化率”；</p>
            <p>②  对比周初：当日的线上化率与上周日的数据对比；</p>
            <p>③  日均上线会员数（当周）：已选中日期所在周的平均值（当周登录APP会员总数/截止该日当周总天数）；</p>
            <p>④  同比前周：当周日均上线会员数与上周7天日均上线会员数的浮动值；</p>
         </IconTip>
         <div :class="[isFixed?'u-search-fixed':'','u-search']" >
             <Button  style="float:left;" type="primary" @click="onExport">导出(共{{totalCount}}条)</Button>
             <DatePicker 
                class="u-date-right" 
                type="date" 
                placeholder="日期" 
                :clearable="false"
                :value="tabParams.dataDate"
                @on-change="changeDate"
                :options="dateOptions"
             />
         </div>
         <div class="u-table">
            <Table border :row-class-name="rowClassName" :columns="Columns" :data="memberList" ref="table" @on-sort-change="sortChange" stripe></Table>
         </div> 
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import RateImg  from './rateImg';
import IconTip from '~/components/IconTip';
import utils from '~/plugins/utils';

export default {
    head() {
        return {
            title: '会员线上化'
        }
    },
    components:{
        SectionTitle,
        RateImg,
        IconTip,
    },
    data(){
        return{
            sectionTitle:'',
            totalCount:0,
            tabParams:{
               dataDate:'',
            },
            isFixed:false,
            Columns:[
              {
                  title: '社区',
                  key: 'communityName',
                  align:'center',
              },
              {
                  title: '线上化率',
                  key: 'onlineRate',
                  align:'center',
                  sortable:'custom',
              },
              {
                  title: '对比前日',
                  key: 'conToOneDaybefore',
                  align:'center',
                  sortable:'custom',
                  render:(h,obj)=>{
                     
                        return h(RateImg ,{
                            props: {
                                detailInfo:obj.row.conToOneDaybefore
                            }
                         });
                 }
              },
              {
                  title: '对比周初',
                  key: 'conToWeekStart',
                  align:'center',
                  sortable:'custom',
                  render:(h,obj)=>{
                       return h(RateImg ,{
                            props: {
                                detailInfo:obj.row.conToWeekStart
                            }
                         });
                    }
              },
              {
                  title: '日均上线会员数（当周）',
                  key: 'onlineUser',
                  align:'center',
                  sortable:'custom',
              },
              {
                  title: '同比前周',
                  key: 'conToWeekBefore',
                  align:'center',
                  sortable:'custom',
                  render:(h,obj)=>{
                       return h(RateImg ,{
                            props: {
                                detailInfo:obj.row.conToWeekBefore
                            }
                        });
                }
              },
            //   {
            //       title: '操作',
            //       key: 'operation',
            //       align:'center',
            //       render:(h,params)=>{
            //             return h('div', [
            //                 h('Button', {
            //                     props: {
            //                         type: 'text',
            //                         size: 'small'
            //                     },
            //                     style: {
            //                         color:'#2b85e4'
            //                     },
            //                     on: {
            //                         click: () => {
            //                             this.jumpView(params.row)
            //                         }
            //                     }
            //                 }, '查看历史')
                            
            //             ]);  
            //         }
            //   },
           ],
           memberList:[],
           dateOptions:{
               disabledDate (date) {
                   return date &&  Date.now() - 86400000 < date.valueOf() ;
               }
           }
        }
    },
    mounted(){
        this.tabParams.dataDate=this.getDay(-1, '-');
        this.getTableData(this.tabParams);
        let memberHome=document.getElementById('layout-content-main');
        var _this=this;
        memberHome.addEventListener("scroll",function(){
             let top=memberHome.scrollTop
            if(top>50){
                _this.isFixed=true;
            }else{
                _this.isFixed=false;
                
            }
        },false);
         
    },
    methods:{
        rowClassName(row,index){
            if(row.averageData==1){
               return 'u-table-row'
            }else{
                return '';
            }
        },
        getDay(num, str){
            let today = new Date();
            let nowTime = today.getTime();
            let ms = 24*3600*1000*num;
            today.setTime(parseInt(nowTime + ms));
            let oYear = today.getFullYear();
            let oMoth = (today.getMonth() + 1).toString();
            let oDay = today.getDate().toString();
            this.sectionTitle=`${oMoth}月${oDay}日`;
            if (oMoth.length <= 1) oMoth = '0' + oMoth;
            if (oDay.length <= 1) oDay = '0' + oDay;
            return oYear + str + oMoth + str + oDay;
        },
        getTableData(params){
             this.$http.get('get-operation-community-use-rate', params).then((res)=>{
                    this.memberList=res.data.items;
                    this.totalCount=this.memberList.length;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
        },
        jumpView(params){

        },
        sortChange(form){
            let orderLine='';
            switch(form.key){
                case 'conToOneDaybefore':
                orderLine='CTOB'
                break;
                case 'conToWeekStart':
                orderLine='CTWS'
                break;
                case 'conToWeekBefore':
                orderLine='CTWB'
                break;
                case 'onlineRate':
                orderLine='OLRT'
                break;
                case 'onlineUser':
                orderLine='OLAV'
                break;
            }
            this.tabParams.orderLine=orderLine;
            if(form.order=='normal'){
               this.tabParams.orderRule='';
            }else{
                if(form.order=='asc'){
                    this.tabParams.orderRule='DESC';
                }
                if(form.order=='desc'){
                    this.tabParams.orderRule='ASC';
                }
               
            }
            
            this.getTableData(this.tabParams);
        },
        changeDate(form){
            this.tabParams.dataDate=form;
            let time=String(form).split('-')
            this.sectionTitle=`${time[1]}月${time[2]}日`;
            this.getTableData(this.tabParams);
        },
        onExport(){
            let form=Object.assign({},this.tabParams);
            utils.commonExport(form,'/api/krspace-op-web/app/operation/community/use-rate/export');
        }
    },
}
</script>

<style lang="less">
.g-member-online{
    .u-search{
        height:64px;
        padding:16px 20px;
        box-sizing: border-box;
    }
    .u-table{
        padding:20px 20px 30px;
    }
    .u-date-right{
      float:right;
      width: 200px;
  }
 .ivu-table .u-table-row td{
    background: rgba(255,157,0,0.30) !important;
 }
  .u-search-fixed{
       width:83.59%;
       position:fixed;
       top:60px;
       right:14px;
       z-index:777;
       background:#fff;
       border-bottom: 1px solid #E8E9E9;
  }
  
  
}

</style>

