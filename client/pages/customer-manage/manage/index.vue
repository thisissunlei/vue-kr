<template>
<div class="customer-assets">
   <SectionTitle title="客户中心"></SectionTitle>
        
            <div class='list-banner'>
                    <div class='list-btn'>
                        <Buttons label='新建'  type='primary' @click='createNew' checkAction='customer_add' class='join-btn'/>
                        <Buttons label='转移'  type='primary' @click='createSwitch' checkAction='customer_transfer' v-if="isSwitch"/>
                    </div>

                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>客户名称</span>
                            <i-input 
                                v-model="params.company" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                         </div>
                         <div class='m-search' @click="lowerSubmit">搜索</div>
                         <div class="m-bill-search" @click="showSearch"><span />
                         </div> 
                   </div>
            </div>
        <div class="table-list">
            <Table  
             border 
             :columns="columns" 
             :data="accountList"
             @on-selection-change="selectTabel" 
             />
             <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page" 
                        :total="totalCount" 
                        :page-size="pageSize" 
                        @on-change="changePage" 
                        show-total 
                        show-elevator
                    ></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="openSearch"
            title="高级搜索"
            width="660"
        >
            <HeightSearch mask='join' @bindData="onUpperChange" :params="switchParams"/>
            <div slot="footer">
                <Button type="primary" @click="submitUpperSearch">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="openCreate"
            title="新建客户"
            width="660"
        >
            <CreateCustomer  @newData="newCustomer" ref="fromFieldNewPage" v-if="openCreate" />
            <div slot="footer">
                <Button type="primary" @click="submitCreate('fromFieldValidate')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="createNew">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="openEdit"
            title="编辑客户"
            width="660"
        >
            <EditCustomer  @editCustomer="editCustomer" ref="editCustomerData" :initailData ="editData" v-if="openEdit" />
            <div slot="footer">
                <Button type="primary" @click="submitEdit('editCustomerData')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="openEditDialog">取消</Button>
            </div>
        </Modal>

        <Modal
            v-model="openSwitch"
            title="转移客户"
            width="445"
        >
           <SwitchCustomer @bindData="getSwitchData" v-if="openSwitch" ref="fromFieldSwitch" :switchIds="switchIds"/>
            <div slot="footer">
                <Button type="primary" @click="submitSwitch('switchForm')">确定</Button>
                <Button type="ghost" @click="newSwitch">取消</Button>
            </div>
        </Modal>

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
    import Buttons from '~/components/Buttons';
    import utils from '~/plugins/utils';
    import HeightSearch from './heightSearch';
    import CreateCustomer from './createCustomer';
    import dateUtils from 'vue-dateutils';
    import SwitchCustomer from './switchCustomer';
    import Message from '~/components/Message';
    import EditCustomer from './editCustomer';

    export default {
        name: 'customerAssets',
        components:{
            SectionTitle,
            Buttons,
            CreateCustomer,
            HeightSearch,
            SwitchCustomer,
            Message,
            EditCustomer
        },    
        head () {
            return {
                title: "客户管理-氪空间后台管理系统"
            }
        },
        data () {
            return {
                openEdit : false,
                editData : {},
                totalCount:0,
                page:1,
                pageSize:15,
                openSearch:false,
                openSwitch:false,
                switchParams:{},
                openCreate:false,
                upperError:'',
                newPageData:{},
                editPageData:{},
                canSubmit:true,
                editCanSubmit : true,
            /*转移客户*/
            isSwitch:false,
            switchIds:'',
            switchForm:{},
            MessageType:'',
            openMessage:false,
            warn:'',
            /*转移客户*/

            params:{
                pageSize:15,
            },
            accountList:[],
            columns: [
                    
                    {   
                        type: 'selection',
                        title: '客户ID',
                        key: 'id',
                        align:'center',
                        width:60,
                    },
                    {
                        title: '客户类型',
                        key: 'customerTypeName',
                        align:'center',
                    },
                    {
                        title: '客户名称',
                        key: 'company',
                        align:'center',
                    },
                    {
                        title: '意向/入驻社区',
                        key: 'customerCommunitis',
                        align:'center',
                    },
                    {
                        title: '行业分类',
                        key: 'industryName',
                        align:'center',
                    },
                    {
                        title: '客户领取人',
                        key: 'receiveName',
                        align:'center',
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align:'center',
                        render(tag, params){
                            return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.createTime)) ;
                        }
                    },
                    {
                        title: '客户状态',
                        key: 'customerStatus',
                        align:'center',
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:90,
                        render:(h,params)=>{
                           
                            var arr = [ h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color:'#2b85e4'
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetail(params.row)
                                            }
                                        }
                            }, '查看')];
                            if(!params.row.crmId){
                                arr.push(h(Buttons, 
                                            {
                                                props: {
                                                    type: 'text',
                                                    checkAction:'seat_order_view',
                                                    label:'编辑',
                                                    styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openEditFun(params.row)
                                                    }
                                                }
                                            }, '编辑'))
                            }

                            return h('div',arr);

                        
                        }
                    }
                ]
        }
        },
         created(){
          var params=Object.assign({},{pageSize:15},this.$route.query);
          this.getListData(params);
          this.params=params; 
        },
        methods:{
            lowerSubmit(){
                this.params.page = 1;
                utils.addParams(this.params);
            },
            getListData(params){
                params = Object.assign({},params)
                this.$http.get('get-client-list',params).then((res)=>{
                    this.accountList=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.params = params;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            onKeyEnter: function (ev) {
                this.lowerSubmit();
            },
            showDetail(item){
                let url = '/bill/customerAssets/'+item.id+'/view#basic'
                window.open(url,'_blank');
            },
            changePage(page){
                this.params.page = page;
                this.getListData(this.params)
            },
            createNew(){
                this.openCreate = !this.openCreate;
                console.log('createNew')
            },
            showSearch(){
                this.openSearch = !this.openSearch;
            },
            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.page=1;
                this.params.pageSize=15;
                this.params.startDate=this.params.startDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.startDate)):'';
                this.params.endDate=this.params.endDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.endDate)):'';
                utils.addParams(this.params);
                this.getListData(this.params)

            },
            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },
            submitCreate(name){

                var newPageRefs = this.$refs.fromFieldNewPage.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid) => {
                    if (!valid || !this.canSubmit) {

                        isSubmit = false
                    }else{
                        var addNewData = this.newPageData;
                        console.log("addNewData",addNewData);
                       this.$http.post('add-customer',addNewData).then( r => {
                            this.openCreate = false;
                            this.getListData();
                            this.$Message.success('新增成功');
                        }).catch( e => {
                            this.$Notice.error({
                                title:e.message
                            });
                        })
                    }
                })

                

            },
            submitEdit(name){
                var editPageRefs = this.$refs.editCustomerData.$refs;
                var isSubmit = true;
                editPageRefs[name].validate((valid,data) => {
                    if (!valid || !this.editCanSubmit) {

                        isSubmit = false
                    }else{
                        console.log("this.editPageData",this.editPageData);
                       this.$http.post('edit-customer',this.editPageData).then( r => {
                            this.openEditDialog();
                            this.getListData();
                            this.$Message.success('编辑成功');
                        }).catch( e => {
                            this.$Notice.error({
                                title:e.message
                            });
                        })
                    }
                })
            },
            editCustomer(data,submit){
                this.editCanSubmit = submit;
                this.editPageData = Object.assign({},data);
                var params = Object.assign({},data)  
            },
            newCustomer(data,submit){
                this.canSubmit = submit;
                this.newPageData = Object.assign({},data);
                console.log(data,"oooooo".data)
            },

            //获取form数据
            getSwitchData(formItem){
                this.switchForm=formItem;
            },
            //转移开关
            newSwitch(){
                this.openSwitch=!this.openSwitch;
            }, 
            //打开转移
            createSwitch(){
                this.newSwitch();
                // this.$http.get('customer-is-switch',{customerIds:this.switchIds}).then((response)=>{  
                    
                // }).catch((error)=>{
                //     this.openMessage=true;
                //     this.MessageType="error";
                //     this.warn=error.message;
                // }) 
            },
            //转移客户提交
            submitSwitch(name){
                var newPageRefs = this.$refs.fromFieldSwitch.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {
                        isSubmit = false
                    }
                })
                if(!isSubmit){
                    return;
                }
                var params=Object.assign({},this.switchForm);
                params.customerIds=this.switchIds;
                this.$http.get('customer-list-switch',params).then((response)=>{  
                    this.newSwitch();
                    this.getListData();
                    this.switchIds='';
                    this.isSwitch=false;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                }) 
            },
            //复选框选择
            selectTabel(selection){
                this.isSwitch=selection.length!=0?true:false;
                if(selection.length){
                    var strArr=[];
                    selection.map((item,index)=>{
                        strArr.push(item.id);
                    })
                    this.switchIds=strArr.join();
                }
            },
            //信息提示框
            onMessageChange(data){
                this.openMessage=data;
            },
            openEditFun(param){
                
                //获取编辑客户回显数据
                this.$http.get('get-customer-detail',{customerId : param.id}).then((res)=>{
                    // PERSONAL  ENTERPRISE
                    console.log("res.data.detail",res.data.detail,"res.data.detail.communityId",res.data.detail.communityId)
                    var responseData = Object.assign({},res.data.detail)
                    this.editData = Object.assign({},responseData);
                    // this.editData = res.data.detail;

                    

                    
                    this.openEditDialog();

                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                
            },
            openEditDialog(){
                this.openEdit = !this.openEdit;
            },

        }
    }
</script>

<style lang="less" scoped>
.customer-assets{
    position: relative;
    .div-search{
        text-align: right;
        padding:20px ;
    }
    .table-list{
        padding:0 20px;
    }
    .list-btn{
        display:inline-block;
        width:20%;
    }
    .m-search{
        color: #2b85e4;
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
    }
    .list-banner{
            width:100%;
            padding:0 0 0 20px;
            .list-btn{
                display:inline-block;
                width:20%;
                .join-btn{
                    margin-right:30px;
                }
            }
            .list-search{
                margin-bottom:10px;
                display:inline-block;
                width:80%;
                text-align:right;
                .lower-search{
                    display:inline-block;
                    margin:10px 20px;
                    margin-right:5px;
                }
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
}
</style>
