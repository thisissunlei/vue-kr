<template>
    <div class="contract-center-list">
        <SectionTitle title="数据监控" />
        <div style='text-align:right;margin-bottom:10px'>
            <div style='display:inline-block;margin:10px 20px;'>
                <span style='padding-right:10px'>订单号</span>
                <i-input 
                    v-model="params.customName" 
                    placeholder="请输入订单号"
                    style="width: 252px"
                    
                />
            </div>
            <div style='display:inline-block;margin:10px 20px;'>
                <span style='padding-right:10px'>客户名称</span>
                <i-input 
                    v-model="params.customName" 
                    placeholder="请输入客户名称"
                    style="width: 252px"
                />
            </div>
            <div style='display:inline-block;margin:10px 20px;'>
                <Select 
                    v-model="formItem.priceType" 
                    style="width: 90px;margin-right:20px;"
                    clearable
                >
                        <Option v-for="item in priceList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                </Select> 
            </div>
            <Button type="primary" @click="submitLowerSearch">搜索</Button>
        </div>
        <Table 
            border 
            ref="selection" 
            :columns="columns" 
            :data="detail" 
            style="margin:20px"
           
        />
        <div style="margin: 10px 20px;overflow: hidden">
            <Button type="primary" @click="onExport">导出</Button>
            <div style="float: right;">
                <Page :total="totalCount" :page-size='15' @on-change="onPageChange" show-total show-elevator/>
            </div>
        </div>
    </div>
</template>


<script>
    import SectionTitle from '~/components/SectionTitle';
    import Loading from '~/components/Loading';
    import krUpload from '~/components/KrUpload';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import Buttons from '~/components/Buttons';
    export default {
        head () {
            return {
                title: "合同列表"
            }
           
        },

        components: {
            SectionTitle,
            krUpload,
            Loading,
            Message,
            Buttons
        },
       
        data () {
            return {
                params:{
                    page:1,
                    pageSize:15,
                },
                loadingStatus: true,
                otherAgreed:0,
                upperData:{},//高级查询的数据
                upperError:false,
                openSearch:false,
                detail:[],
                describeData:{},//其他约定的数据
                totalCount:1,
                downType:"down",
                priceList:[
                    {value:'1',label:'费用、收入、回款校验'},
                    {value:'2',label:'明细、分期、日费用支付状态校验'},
                    {value:'3',label:'押金、工位押金表、客户押金表校验'},
                    {value:'4',label:'工位收入表与收入中心收入表校验'},
                ],
                columns: [
                    
                    {
                        title: '社区id',
                        key: 'communityId',
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                       
                    },
                    {
                        title: '校验结果说明',
                        key: 'content',
                        align:'center'
                    },
                    {
                        title: '客户id',
                        key: 'customerId',
                        align:'center'
                       
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '校验类型',
                        key: 'validateType',
                        align:'center'
                    },
                    {
                        title: '创建时间',
                        key: 'startAndEnd',
                        align:'center',
                        width: 150,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.cTime));
                            return time;
                        }
                    },
                ],
                detail:[]
            }
        },
       created(){
          var params=Object.assign({},{page:1,pageSize:15},this.$route.query);
          this.getListData(params);
          this.params=params; 
        },

        mounted(){
         
        },
        
        methods:{

            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            
            onExport (){
                var params = Object.assign({},this.params);
                utils.commonExport(params,'/api/krspace-erp-web/wf/station/contract/enter/export');
            },

            getListData(params){
                 this.config()
                 this.$http.get('get-validate-list', params, r => {
                    this.totalCount=r.data.totalCount;
                    this.detail=r.data.items;
                    this.openSearch=false;
                   this.loadingStatus=false;
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })   
            },

            //分页事件
            onPageChange (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },

            //获取其他约定的信息
            getOtherConvention(params){
                this.config()
                this.$http.get('get-contract-other-convention-data', params, r => {
                    this.describeData.otherAgreed=r.data.otherAgreed;
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })   
            },
      
            //搜索框
            submitLowerSearch(){
                this.params.page = 1;
                utils.addParams(this.params);
            },

            // 高级查询修改
            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },

             //高级查询确定
            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params.page = 1;
                this.params=Object.assign({},this.params,this.upperData);
                this.params.pigeonholed=this.params.pigeonholed?(this.params.pigeonholed=='true'?true:false):'';
                this.params.minCTime=this.params.minCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.minCTime)):'';
                this.params.maxCTime=this.params.maxCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.maxCTime)):'';
                utils.addParams(this.params);

            }, 
        }
    }
</script>
<style lang="less" > 
    
</style>