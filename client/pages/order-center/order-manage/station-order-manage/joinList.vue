<template>
    <div class='m-join-list'>
            
            <div class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="jumpJoin" class='join-btn'>入驻</Button>
                        <Button type="primary" @click="jumpRenew" class='join-btn'>续租</Button>
                        <Button type="primary" @click="jumpReduce" class='join-btn'>减租</Button>
                        <Button type="primary" @click="jumpReplace">换租</Button>
                    </div>

                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>客户名称</span>
                            <i-input 
                                v-model="params.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                         </div>
                         <div class='m-search' @click="submitLowerSearch">搜索</div>
                         <div class="m-bill-search" @click="showSearch">
                           <span/>
                         </div> 
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border  class='list-table'/>
            <div  class='list-footer'>
                    <Buttons label='导出'  type='primary' @click='submitExport' checkAction='seat_order_in_export'/>
                    <Buttons  v-if='hasSeatDataExportRight' label='导出工位数据'  type='primary' @click='submitExportSeat' checkAction='seat_order_in_export' style='margin-left:20px'/>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' show-total show-elevator @on-change="onPageChange"/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch mask='join' @bindData="onUpperChange" :keys="mask" :params="switchParams"/>
                <div slot="footer">
                    <Button type="primary" @click="submitUpperSearch">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
                </div>
            </Modal>
            
            <Modal
                v-model="openNullify"
                title="提示信息"
                width="500"
            >
                <Nullify/>
                <div slot="footer">
                    <Button type="primary" :disabled="nullDisabled" @click="submitNullify">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="closeNullify">取消</Button>
                </div>
            </Modal>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onMessageChange"
            />

            <Modal
                v-model="openApply"
                title="提示信息"
                width="500"
            >
                <ApplyContract/>
                <div slot="footer">
                    <Button type="primary" :disabled="applyDisabled" @click="submitApply">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="closeApply">取消</Button>
                </div>
            </Modal>

    </div>
</template>


<script>

    import HeightSearch from './heightSearch';
    import Nullify from './nullify';
    import ApplyContract from './applyContract';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    import ToolTip from '~/components/ToolTip';

    export default {
        name:'Join',
        components:{
            HeightSearch,
            Nullify,
            Message,
            Buttons,
            ApplyContract,
            ToolTip
        },
        props:{
            mask:String
        },
        data () {
            
            return {
                params:{
                    page:1,
                    pageSize:15,
                    customerName:"",
                },
                hasSeatDataExportRight:false,
                switchParams:{},
                openMessage:false,
                nullDisabled:false,
                applyDisabled:false,
                warn:'',
                MessageType:'',
                upperData:{},
                upperError:false,
                id:'',
                props:{},
                totalCount:1,
                openSearch:false,
                openNullify:false,
                openApply:false,
                joinData:[],

                joinOrder: [
                    {
                        title: '订单编号',
                        key: 'orderNum',
                        align:'center',
                        width:116
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                        render(tag,params){ 
                          var communityName=params.row.communityName;
                              if (communityName.lastIndexOf('社区')==communityName.length-2) {
                                 communityName=communityName.slice(0,communityName.length-2)
                              }           
                          return <span class="u-txt">{communityName}</span>;
                        }
                    },
                    {
                        title: '商品名称',
                        key: 'seatNames',
                        align:'center',
                        width:150,
                        render:(h,params)=>{
                            let setnames=params.row.seatNames;
                            if (!setnames) {
                                return
                            }
                            let setArray=setnames.split('、');
                            let lines=[] 
                            let copyNames=Array.from(setArray)
                            while(copyNames.length>0){
                                let strs=copyNames.splice(0,5)
                                lines.push(h('p',{},strs.join('、'))) 
                            }
                            return h('div', [
                                        h('Tooltip', {
                                            props: {
                                                placement: 'top'
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                                style:{
                                                    textOverflow:'ellipsis',
                                                    whiteSpace:'nowrap',
                                                    overflow: 'hidden',
                                                    width:'130px'
                                                }
                                            },setnames)
                                        ]),
                                        h('div', {slot:'content'},lines),
                                    ])
                                ])
                        }                                    
                    },                    
                    {
                        title: '服务费总额',
                        key: 'rentAmount',
                        align:'center',
                        render(tag,params){ 
                          var money=params.row.rentAmount?utils.thousand(params.row.rentAmount):params.row.rentAmount;                  
                          return <span class="u-txt">{money}</span>;
                        }
                    },
                    {
                        title: '履约保证金',
                        key: 'depositAmount',
                        align:'center',
                        render(tag,params){ 
                          var money=params.row.depositAmount?utils.thousand(params.row.depositAmount):params.row.depositAmount;                  
                          return <span class="u-txt">{money}</span>;
                        }
                    },
                    {
                        title: '订单类型',
                        key: 'orderType',
                        align:'center',
                        width:90,
                        render(tag,params){
                            var orderType={
                               'IN':'入驻服务订单',
                               'INCREASE':'增租服务订单',
                               'CONTINUE':'续租服务订单'
                            }
                            for(var item in orderType){
                                 let typeName=orderType[item]
                                if(item==params.row.orderType){
                                    let typeName=orderType[item]
                                          if (typeName.lastIndexOf('服务订单')==typeName.length-4) {
                                                typeName=typeName.slice(0,typeName.length-4)
                                            }    
                                    return <span class="u-txt">{typeName}</span>;
                                }
                            }
                        }
                    },
                    {
                        title: '租赁期限',
                        key: 'ctime',
                        align:'center',
                        width:192,
                        render(tag, params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate)) +'  至  '+ dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.endDate));
                            return tag('span',time)
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align:'center',
                        render(tag, params){
                            var orderStatus={
                               'NOT_EFFECTIVE':'未生效',
                               'EFFECTIVE':'已生效',
                               'INVALID':'已作废'
                            }
                            for(var item in orderStatus){
                                if(item==params.row.orderStatus){
                                    var style={};
                                    if(item=='NOT_EFFECTIVE'){
                                        style='u-red';
                                    }
                                    if(item=='INVALID'){
                                        style='u-nullify';
                                    }
                                    return <span class={`u-txt ${style}`}>{orderStatus[item]}</span>;
                                }
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align:'center',
                        render(tag, params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.ctime));
                            if (time.split('  ').length==2) {
                                let t1=time.split('  ')[0]
                                let t2=time.split('  ')[1]
                                let lines=[];
                                lines.push(tag('p',t1))
                                lines.push(tag('p',t2))
                                return tag('div',lines);  
                            }
                            return time;
                        }
                    },
                    {
                        title: '生效时间',
                        key: 'effectDate',
                        align:'center',
                        render(tag, params){
                            let time = params.row.effectDate?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.effectDate)):'-'
                            if (time.split('  ').length==2) {
                                let t1=time.split('  ')[0]
                                let t2=time.split('  ')[1]
                                let lines=[];
                                lines.push(tag('p',t1))
                                lines.push(tag('p',t2))
                                return tag('div',lines);  
                            }                           
                           return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(tag,params)=>{
                           var btnRender=[
                               tag(Buttons, {
                                   props: {
                                        type: 'text',
                                        checkAction:'seat_order_view',
                                        label:'查看',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.jumpView(params)
                                        }
                                    }
                                })];
                           if(params.row.orderStatus=='NOT_EFFECTIVE'){
                               btnRender.push(
                                tag(Buttons,{
                                   props: {
                                        type: 'text',
                                        checkAction:'seat_order_contract_apply',
                                        label:'申请合同',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.showApply(params)
                                        }
                                    }
                                }),
                                tag(Buttons, {
                                    props: {
                                        type: 'text',
                                        checkAction:'seat_order_release',
                                        label:'作废',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                            this.showNullify(params)
                                        }
                                    }
                                }))
                                if(params.row.versionType!=1){
                                 btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            checkAction:params.row.orderType=='CONTINUE'?'seat_order_continue_edit':'seat_order_in_edit',
                                            label:'编辑',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.jumpEdit(params)
                                            }
                                        }
                                    }))
                                }
                           }
                           return tag('div',btnRender);  
                        }
                    }
                ]
            }
        },

        watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='join'){
                       this.getListData(this.switchParams);
                       this.params=this.switchParams; 
                    }
                }
            }
        },
        
        mounted(){
            let mask=this.$route.query.mask;
            if(!mask||mask=='join'){
               sessionStorage.setItem('paramsJoin',JSON.stringify(this.$route.query));
            }

            let jsonJoin=JSON.parse(sessionStorage.getItem('paramsJoin'));
            this.switchParams=Object.assign({},jsonJoin,{page:1,pageSize:15});
            this.getListData(this.switchParams);
            this.params=this.switchParams;
        },

        methods:{   
            submitNullify (){
                let params={
                    id:this.id
                };
                 if(this.nullDisabled){
                     return ;
                 }
                 this.nullDisabled=true;
                 this.closeNullify();
                 this.$http.post('join-nullify', params).then((response) => {
                     this.openMessage=true;
                     this.MessageType="success";
                     this.warn='作废成功';
                     this.getListData(this.params);
                }).catch( (error) => {
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                })
            },

            submitApply(){
                let params={
                    id:this.id
                };
                if(this.applyDisabled){
                    return ;
                }
                 this.applyDisabled=true;
                 this.closeApply();
                 this.$http.post('apply-contract', params).then((response)=>{
                     this.openMessage=true;
                     this.MessageType="success";
                     this.warn='申请成功';
                     this.getListData(this.params);
                 }).catch((error)=>{
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
            },

            submitExport (){
                this.props=Object.assign({},this.props,this.params);
                utils.commonExport(this.props,'/api/krspace-op-web/order-seat-add/export');              
            },
            //导出工位数据
            submitExportSeat(){
                this.props=Object.assign({},this.props,this.params);
                utils.commonExport(this.props,'/api/krspace-op-web/order-seat-add/export-all');
            },
            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.mask='join';
                this.params.page=1;
                this.params.pageSize=15;
                this.params.effectEnd=this.params.effectEnd?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.effectEnd)):'';
                this.params.effectStart=this.params.effectStart?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.effectStart)):'';
                this.params.cStartDate=this.params.cStartDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cStartDate)):'';
                this.params.cEndDate=this.params.cEndDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cEndDate)):'';
                utils.addParams(this.params);
            },

            submitLowerSearch(){
                this.params.mask='join';
                utils.addParams(this.params);
            },

            getListData(params){
                 this.$http.get('join-bill-list', params).then((response)=>{
                     this.totalCount=response.data.totalCount;
                     this.joinData=response.data.items;
                     this.openSearch=false;
                     this.hasSeatDataExportRight=response.data.hasSeatExportRight;//是否具有工位数据导出权限
                 }).catch((error)=>{
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
            },

            onPageChange (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },

            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },

            onMessageChange(data){
                this.openMessage=data;
            },

            onKeyEnter: function (ev) {
                this.submitLowerSearch();
            },

            jumpJoin(){
                window.open('/order-center/order-manage/station-order-manage/create/join','_blank');
            },
            jumpReduce(){
                window.open('/order-center/order-manage/station-order-manage/create/reduce','_blank')
            },

            jumpRenew(){
                window.open('/order-center/order-manage/station-order-manage/create/renew','_blank');
            },

            jumpReplace(){
                window.open('/order-center/order-manage/station-order-manage/create/replace','_blank');
            },

            jumpView(params){
                var viewName='';
                if(params.row.orderType=='CONTINUE'){
                    viewName='renewView';  
                }else{
                    viewName='joinView';   
                }
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/${viewName}`,'_blank');
            },

            jumpEdit(values){
                var popup = window.open();
                let params={
                    orderId:values.row.id
                }
                this.$http.get('order-first-payed', params).then((response)=>{
                    let type = '';
                    switch (values.row.orderType){
                        case 'IN':
                            type = 'join';
                            break;
                        case 'INCREASE':
                            type = 'join';
                            break;
                        case 'CONTINUE':
                            type = 'renew';
                            break;
                        default:
                            type = 'join';
                            break;
                    }
                    popup.location = `/order-center/order-manage/station-order-manage/${values.row.id}/${type}`;
                 }).catch((error)=>{
                     popup.close();
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
            },

            showNullify(params){
                this.id=params.row.id;
                this.closeNullify();
            },

            closeNullify(){
                this.openNullify=!this.openNullify;
                this.nullDisabled=false;
            },

            closeApply(){
                this.openApply=!this.openApply;
                this.applyDisabled=false;
            },

            showSearch () {
                this.openSearch=!this.openSearch;
            },

            showApply(params){
                this.id=params.row.id;
                this.closeApply();
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-join-list{
        .list-banner{
            width:100%;
            padding:0 0 0 20px;
            .list-btn{
                display:inline-block;
                width:40%;
                .join-btn{
                    margin-right:20px;
                }
            }
            .list-search{
                margin-bottom:10px;
                display:inline-block;
                width:60%;
                text-align:right;
                .lower-search{
                    display:inline-block;
                    margin:10px 20px;
                }
            }
        }
        .list-table{ 
            margin:20px;
            margin-top:0px;
            // /deep/ .ivu-table-cell{
            //     padding-left: 10px;
            //     padding-right: 10px;
            // }
        }
        .list-footer{
            margin: 10px 20px;
            overflow: hidden;
        }
   }
   .m-bill-search{
        display:inline-block;
        height:22px;
        margin:16px 20px;
        vertical-align: bottom;
        span{
            width:22px;
            height:22px;
            background:url('~assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
            cursor:pointer;
        }
    }
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
     .u-red{
         color:red;
     }
     .u-nullify{
         text-decoration: line-through;
     }
</style>