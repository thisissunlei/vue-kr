<template>
    <div class='m-reduce-list'>
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


            <Table :columns="joinOrder" :data="joinData" border class='list-table'/>
            <div style="margin: 10px 20px;overflow: hidden">
                    <Buttons label='导出'  type='primary' @click='submitExport' checkAction='seat_order_reduce_export'/>
                    <div style="float: right;">
                        <Page :total="totalCount" :page-size='15' @on-change="onPageChange" show-total show-elevator/>
                    </div>
            </div>

            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch @bindData="onUpperChange" mask='reduce' :keys="mask" :params="switchParams"/>
                <div slot="footer">
                    <Button type="primary" @click="submitUpperSearch">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
                </div>
            </Modal>

            <Modal
                v-model="openNullify"
                title="提示信息"
                width="500"
            >
                <Nullify/>
                <div slot="footer">
                    <Button type="primary" @click="submitNullify" :disabled="nullDisabled">确定</Button>
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
                    <Button type="primary" @click="submitApply" :disabled="applyDisabled">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="closeApply">取消</Button>
                </div>
            </Modal>

    </div>
</template>


<script>
    import HeightSearch from './heightSearch';
    import ApplyContract from './applyContract';
    import Nullify from './nullify';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';

    export default {
        name:'Reduce',
        components:{
            HeightSearch,
            Nullify,
            Message,
            Buttons,
            ApplyContract
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

                switchParams:{},
                openMessage:false,
                nullDisabled:false,
                applyDisabled:false,
                warn:'',
                MessageType:'',
                upperData:{},
                upperError:false,
                totalCount:1,
                id:'',
                props:{},
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
                                lines.push( h('p',copyNames.splice(0,5).join('、'))) 
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
                        title: '减租开始日期',
                        key: 'startDate',
                        align:'center',
                        render(tag,params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate));
                            return tag('span',time);
                        }
                    },
                    {
                        title: '减租金额',
                        key: 'rentAmount',
                        align:'center',
                        render(tag,params){ 
                          var money=params.row.rentAmount?utils.thousand(params.row.rentAmount):'';                  
                          return <span class="u-txt">{money}</span>;
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
                                        checkAction:'seat_order_reduce_view',
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
                                            checkAction:'seat_order_reduce_edit',
                                            label:'编辑',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.jumpEdit(params)
                                            }
                                        }
                                    }, '编辑'))
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
                    if(nextProps.mask=='reduce'){
                       this.getListData(this.switchParams);
                       this.params=this.switchParams; 
                    }
                }
            }
        },
        
        mounted(){
            let mask=this.$route.query.mask;
            if(!mask||mask=='reduce'){
               sessionStorage.setItem('paramsReduce',JSON.stringify(this.$route.query));
            }

            let jsonJoin=JSON.parse(sessionStorage.getItem('paramsReduce'));
            this.switchParams=Object.assign({},jsonJoin,{page:1,pageSize:15});
            this.getListData(this.switchParams);
            this.params=this.switchParams;
        },


        methods:{
            getListData(params){
                 this.$http.get('reduce-bill-list', params).then((response)=>{
                     this.totalCount=response.data.totalCount;
                     this.joinData=response.data.items;
                     this.openSearch=false;
                 }).catch((error)=>{
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                 })
            },

            submitNullify (){
                var _this=this;
                let params={
                    id:this.id
                };
                 if(this.nullDisabled){
                     return ;
                 }
                 this.nullDisabled=true;
                 this.closeNullify();
                 this.$http.post('join-nullify', params).then((response)=>{
                     this.openMessage=true;
                     this.MessageType="success";
                     this.warn='作废成功';
                     this.getListData(this.params);
                 }).catch((error)=>{
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

            submitLowerSearch(){
                 this.params.mask='reduce';
                 utils.addParams(this.params);
            },

            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.mask='reduce';
                this.params.page=1;
                this.params.pageSize=15;
                this.params.cStartDate=this.params.cStartDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cStartDate)):'';
                this.params.cEndDate=this.params.cEndDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.cEndDate)):'';
                this.params.effectEnd=this.params.effectEnd?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.effectEnd)):'';
                this.params.effectStart=this.params.effectStart?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.effectStart)):'';
                utils.addParams(this.params);
            },

            submitExport (){
                this.props=Object.assign({},this.props,this.params);
                utils.commonExport(this.props,'/api/krspace-op-web/order-seat-reduce/export');
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

            onKeyEnter: function (ev) {
                this.submitLowerSearch();
            },

            onMessageChange(data){
                this.openMessage=data;
            },

            showSearch () {
                this.openSearch=!this.openSearch;
            },

            showNullify(params){
                this.id=params.row.id;
                this.closeNullify();
            },

            jumpReduce(){
                window.open('/order-center/order-manage/station-order-manage/create/reduce','_blank')
            },

            jumpEdit(params){
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/reduce`,'_blank')
            },

            showApply(params){
                this.id=params.row.id;
                this.closeApply();
            },

            jumpView(params){
                window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/reduceView`,'_blank');
            },
            jumpReplace(){
                window.open('/order-center/order-manage/station-order-manage/create/replace','_blank');
            },
            jumpJoin(){
                window.open('/order-center/order-manage/station-order-manage/create/join','_blank');
            },

            jumpRenew(){
                window.open('/order-center/order-manage/station-order-manage/create/renew','_blank');
            },

            closeNullify(){
                this.openNullify=!this.openNullify;
                this.nullDisabled=false;
            },

            closeApply(){
                this.openApply=!this.openApply;
                this.applyDisabled=false;
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-reduce-list{
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