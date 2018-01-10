<template>
    <div class='m-order-list'>

            <SectionTitle label = "合同扫码"/>

            <div  class='list-banner'>
                    <div class='list-btn'>
                        <Button type="primary" @click="showYard">批量归档</Button>
                    </div>

                    <div class='list-search'>
                         <div class='lower-search'>
                            <span style='padding-right:10px'>合同编号</span>
                            <i-input 
                                v-model="params.serialNumber" 
                                placeholder="请输入客户名称"
                                style="width: 252px"
                                @keyup.enter.native="showKey($event)"
                            />
                        </div>
                        <div class='m-search' @click="showKey">查询</div>
                   </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border class='list-table' @on-selection-change="selectData"/>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onChangeOpen"
            />

            <Modal
                v-model="openYard"
                title="提示信息"
                @on-ok="yardSubmit"
                width="500"
            >
                <ContractYard @bindData="bindYard"/>
            </Modal>

    </div>
</template>

<script>
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    import SectionTitle from '~/components/SectionTitle';
    import ContractYard from './ContractYard';
    

    export default {
        name:'Yard',
        components:{
            Message,
            Buttons,
            SectionTitle,
            ContractYard
        },
        data () {    
            return {   
                selectId:[],

                params:{
                    serialNumber:""
                },

                openYard:false,
                openMessage:false,
                warn:'',
                MessageType:'',
                joinOldData:[],
                joinData:[],   
                yardData:{},

                joinOrder: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '合同编号',
                        key: 'serialNumber',
                        align:'center'
                    },
                    {
                        title: '合同名称',
                        key: 'lesseeName',
                        align:'center'
                    },
                    {
                        title: '合同请求标题',
                        key: 'title',
                        align:'center'
                    },
                    {
                        title: '创建人',
                        key: 'creatorName',
                        align:'center'
                    },
                    {
                        title: '创建时间',
                        key: 'cTime',
                        align:'center',
                        render(tag, params){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.cTime));
                            return time;
                        }
                    },
                    {
                        title: '归档状态',
                        key: 'pigeonholedName',
                        align:'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(tag,params)=>{
                           var btnRender=[
                               tag('Button', {
                                   props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.showView(params)
                                        }
                                    }
                                },'查看')];
                           return tag('div',btnRender);  
                        }
                    }
                ]
            }
        },

        methods:{
            showKey: function (ev) {
                let param={
                    serialNumber:ev.target.value,
                }
                let searchParams=Object.assign({},this.params,param);
                 this.getListData(searchParams);
            },

            showYard(){
                if(this.selectId.length==0){
                    this.$Notice.error({
                        title:'请勾选归档合同'
                    });
                    return;
                }
                this.openYard=true;
            },

            showView(params){
                window.open(`./${params.row.id}/view`,params.row.id);
            },
            
            getListData(params){
                this.$http.get('contract-yard-list', params, r => {
                    this.joinOldData.push(r.data.items);
                    let data=utils.arrayNoRepeat(this.joinOldData);
                    this.joinData=data.reverse();
                }, e => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                }) 
            },

            selectData(params){
                if(params.length!=0){
                     let id=[];
                     params.map((item,index)=>{
                       id.push(item.id);
                     })
                    this.selectId=id;
                }else{
                    this.selectId=[]; 
                }
            },

            bindYard(params){
                this.yardData=params;
            },

            yardSubmit (){
               let params=Object.assign({},this.yardData);
               params.requestId=this.selectId;
               this.$http.post('contract-batch-file', params, r => {
                    this.joinData=utils.arrayCompare(this.joinData,this.selectId,'id');
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn='归档成功';
                }, e => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                })   
            },

            onChangeOpen(data){
                this.openMessage=data;
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-order-list{
        .list-banner{
            width:100%;
            padding:0 0 0 20px;
            .list-btn{
                display:inline-block;
                width:20%;
            }
            .list-search{
                margin:10px 0;
                display:inline-block;
                width:80%;
                text-align:right;
                padding-right: 20px;
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
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
</style>