<template>
    <div class='m-order-list'>
            <div class='list-search'>
                    <div class='lower-search'>
                        <span style='padding-right:10px'>合同编号</span>
                        <EnglishInput 
                            :name="params"
                            @onEnter="keyEnter"
                        />
                    </div>
                    <div class='m-search' @click="submitLower">查询</div>
            </div>

            <div  class='list-banner'>
                <div class='list-btn'>
                    <Button type="primary" @click="showYard">批量归档</Button>
                </div>
            </div>

            <Table :columns="joinOrder" :data="joinData" border class='list-table' @on-selection-change="onBoxSelect"/>

            <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onMessageChange"
            />

            <Modal
                v-model="openYard"
                title="提示信息"
                @on-ok="submitYard"
                width="500"
            >
                <ContractYard @bindData="onYardChange"/>
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
    import EnglishInput from '~/components/EnglishInput.vue'
    

    export default {
        name:'Yard',
        components:{
            Message,
            Buttons,
            SectionTitle,
            ContractYard,
            EnglishInput
        },   
        head() {
            return {
                title: "合同扫码-氪空间后台管理系统"
            }
        },
        data () {    
            return {   
                selectId:[],
                selectUseId:[],

                params:{
                    serialNumber:''
                },
                autofocus:false,
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
                                            this.jumpView(params)
                                        }
                                    }
                                },'查看')];
                           return tag('div',btnRender);  
                        }
                    }
                ]
            }
        },

        mounted(){
          this.autofocus = true;  
        },

        methods:{
            submitYard (){
               let params=Object.assign({},this.yardData);
               let ids=this.selectUseId.join(',');
               params.requestIds=ids;
               this.$http.post('contract-batch-file', params, r => {
                    this.joinData=utils.arrayCompare(this.joinData,this.selectId,'requestId');
                    this.selectUseId=[];
                    this.selectId=[];
                    this.joinData.map((item,index)=>{
                        if(item._checked){
                            this.selectUseId.push(item.requestId);
                            this.selectId.push(item.requestId);
                        }
                    })
                    this.params.serialNumber='';
                    this.joinOldData=this.joinData;
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn='归档成功';
                }, e => {
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                })   
            },

            submitLower(){
                var mask=false;
                if(this.params.serialNumber){
                    this.joinData.map((item,index)=>{
                        if(item.serialNumber==this.params.serialNumber){
                            this.params.serialNumber='';
                            mask=true;
                        }
                    })
                    if(!mask){
                        this.getListData(this.params);
                    }
                }
            },

            jumpView(params){
                window.open(`../../../publicPage/${params.row.id}/pdf-view?contractType=&requestId=${params.row.requestId}`,'_blank');
            },
            
            getListData(params){
                this.$http.get('contract-yard-list', params, r => {
                    let item=r.data;
                    this.params.serialNumber='';
                    if(!item.requestId){
                        this.openMessage=true;
                        this.MessageType="error";
                        this.warn='扫码错误,请尝试手动输入';
                        return;
                    }
                    if(!item.pigeonholed){
                        item._checked=true;
                        this.selectUseId.push(item.requestId);
                        this.selectId.push(item.requestId);
                    }
                    this.joinOldData.push(item);
                    let data=utils.arrayNoRepeat(this.joinOldData);
                    this.joinData=data.reverse();
                }, e => {
                    this.params.serialNumber='';
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                }) 
            },

            keyEnter: function (ev) {
                this.submitLower();
            },

            onBoxSelect(params){
                this.selectId=[];
                this.selectUseId=[];
                if(params.length!=0){
                     params.map((item,index)=>{
                        this.selectId.push(item.requestId);
                        if(!item.pigeonholed){
                            this.selectUseId.push(item.requestId);
                        }
                     })
                }
            },

            onYardChange(params){
                this.yardData=params;
            },

            onMessageChange(data){
                this.openMessage=data;
            },
            
            showYard(){
                utils.clearForm(this.yardData);
                if(this.selectId.length==0){
                    this.$Notice.error({
                        title:'请勾选合同'
                    });
                    return;
                }
                if(this.selectUseId.length==0){
                    this.$Notice.error({
                        title:'不能全部为已归档合同'
                    });
                    return;
                }
                this.openYard=true;
            }
        }
    }
</script>

<style lang='less' scoped>
   .m-order-list{
        .list-banner{
            width:100%;
            padding:0 0 20px 20px;
            .list-btn{
                display:inline-block;
                width:20%;
            }    
        }
        .list-search{
                font-size:18px;
                text-align: center;
                .lower-search{
                    display:inline-block;
                    margin: 40px 20px 20px 0;
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