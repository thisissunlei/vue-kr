<template>
   <div class="g-replace-order-detail">
		<SectionTitle title="换租订单详情" ></SectionTitle>
		<div class="create-order">
            <Card id="step-one">
                <p slot="title" class="card-title">
                   基本信息
                </p>
                <a v-if="showEdit == true" href="#" slot="extra" @click.prevent="editCard(0)">
                	编辑
		        </a>
                <span class="card-header"></span>
                <LabelText :inline="inline" label="客户名称：">
                    {{formItem.customerName}}
                </LabelText>
                <LabelText  :inline="inline" label="社区名称：">
                    {{formItem.communityName}}
                </LabelText>
                <LabelText :inline="inline" label="换租原因：">
                    {{formItem.replaceMemo || '无'}}
                </LabelText>
                <LabelText :inline="inline" label="渠道来源：" >
                    {{formItem.promoCode || '无'}}
                </LabelText>
                <LabelText :inline="inline" label="居间方名称：" >
                    {{formItem.intermediaryName || '无'}}
                </LabelText>

            </Card>
            <span class="space"></span>
            <Card id="step-two">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <a v-if="showEdit == true" href="#" slot="extra" @click.prevent="editCard(1)">
                	编辑
		        </a>
                <span class="card-header"></span>

                <LabelText :inline="inline" label="换租服务开始日：">
                    {{formItem.startDate |dateFormat('YYYY-MM-dd')}}
                </LabelText>
                <!-- <Table :columns="oldStatonColumns" :data="formItem.oldStation"></Table> -->
                <Table :columns="oldStatonColumns" style="margin-bottom:20px" :data="formItem.oldSeatList"></Table>

            </Card>
            <span class="space"></span>

            <Card id="step-three">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <a v-if="showEdit == true" href="#" slot="extra" @click.prevent="editCard(2)">
                	编辑
		        </a>
                <span class="card-header"></span>
                
                <GoodPriceDetail :stationList="formItem.seats" style='margin-bottom:20px'/>  
                <div>
                  <LabelText label="折扣添加人：">
		        			  	{{formItem.discountCreaterName}}
		        			  </LabelText>
		        			  <LabelText label="折扣原因：">
		        			  	{{formItem.discountReason}}
		        			  </LabelText>
                </div>

                <LabelText :inline="inline" label="优惠折扣：" v-if="formItem.discountNum">
                    {{formItem.discount}}折
                </LabelText>
                <LabelText :inline="inline" label="折扣添加人：" v-if="discountAdder">
                    {{discountAdder}}
                </LabelText>
                <!-- <Table :columns="oldStatonColumns" :data="formItem.oldStation"></Table> -->
                <!-- <Table :columns="newStatonColumns" style="margin-bottom:20px" :data="formItem.seats"></Table> -->
                <LabelText :inline="inline" label="免租开始日：" v-if="formItem.freeStartDate" >
                    {{formItem.freeStartDate |dateFormat('YYYY-MM-dd')}}
                </LabelText>
                <LabelText :inline="inline" label="免租添加人：" v-if="rentFreeAdder">
                    {{rentFreeAdder}}
                </LabelText>
                <!-- <Table :columns="newStatonMoneyColumns" style="margin-bottom:20px" :data="formItem.serviceDetailsList"></Table> -->
                <LabelText :inline="inline" label="付款周期：">
                    {{formItem.installmentName}}
                </LabelText>
                <LabelText :inline="inline" label="服务保证金：">
                    ￥{{formItem.newStationData[0].totalDeposit | thousand }}
                </LabelText>
                <LabelText :inline="inline" label="首付款日期：">
                    {{formItem.firstPayTime  |dateFormat('YYYY-MM-dd')}}
                </LabelText>
            </Card>
            <span class="space"></span>
            <Card id="step-four">
                <p slot="title" class="card-title">
                    服务费信息
                </p>
                <a v-if="showEdit == true" href="#" slot="extra" @click.prevent="editCard(3)">
                	编辑
		        </a>
                <span class="card-header"></span>

                <Table :columns="oldInfoColumns" style="margin:20px 0" :data="formItem.newStationData"></Table>
                <Table :columns="newInfoColumns" style="margin:20px 0" :data="formItem.newStationData"></Table>
                <LabelText  :inline="inline" label="退还服务费：">
                    ￥{{formItem.changeServiceFee | thousand}}
                </LabelText>
                <LabelText  :inline="inline" label="旧服务保证金转新（剩余扣除）">
                    ￥{{formItem.transferDepositAmount | thousand}}
                </LabelText>
                <LabelText :inline="inline" label="扣除服务保证金：">
                    ￥{{formItem.back | thousand}}
                </LabelText>
            </Card>
            <div class="buttons" v-if="showSubmit">

                <Button type="ghost" @click="editCard(3)">取消</Button>
                <span class="between"></span>
                <Button type="primary" @click="submit">提交</Button>
                    
            </div>
        </div>
        <Modal
            v-model="openService"
            title="服务费明细"
            ok-text="保存"
            cancel-text="取消"
            width="90%"
            class-name="vertical-center-modal"
         >
           <div class="content">
               
               <div class="header" style="font-size:14px;">
                   <span class="left">
                      {{detailService.seatType =='SPACE'?'独立房间':'独立工位'}} {{detailService.codeName}}
                   </span>
                   <span class="right" style="float:right">
                       ￥{{detailService.totalAmount |thousand}}
                   </span>
               </div>
               <Table :columns="serviceColumns" style="margin:10px 0" :data="detailService.details"></Table>
           </div>
            <div slot="footer">
                <Button type="primary" @click="cancel">确定</Button>
            </div>
        </Modal>
   </div>	
</template>


<script>

    import SectionTitle from '~/components/SectionTitle.vue'
    import LabelText from '~/components/LabelText';
    import dateUtils from 'vue-dateutils';
    import Buttons from '~/components/Buttons';
    import utils from '~/plugins/utils';
    import goodsPriceColumn from "./listData/goodsPriceData";
    import GoodPriceDetail from "./_watchView/goodPriceDetail"

export default {
	name:'JoinView',
	head() {
        return {
            title:'换租订单详情'
        }
    },
    props:{
        data:Object,
        type:String,
        showEdit:{
            type:Boolean,
            default:true
        },
        showSubmit:{
            type:Boolean,
            default:true
        }
    },
	components:{
		SectionTitle,
        LabelText,
        GoodPriceDetail
	},
	data(){
		return {
            // discountAdder:'',
            // rentFreeAdder:'',
            openService:false,
            inline:false,
            formItem:this.data,
            oldStatonColumns:[
                {
                    title: '工位编号/房间名称',
                    key: 'seatNum',
                    align: 'center'
                },
                {
                    title: '产品类型',
                    key: 'seatType',
                    align: 'center',
                    render:(h,params)=>{
                        let type = '开放工位';
                        if(params.row.seatType == 'SPACE'){
                            type = '独立房间';
                        }else{
                            type = '开放工位';
                        }
                        return type;
                    }
                },
                {
                    title: '原服务开始日',
                    key: 'startDate',
                    align: 'center',
                    render:(h,params)=>{
                        return dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.startDate))
                    }
                },
                {
                    title: '原服务结束日',
                    key: 'endDate',
                    align: 'center',
                    render:(h,params)=>{
                        return dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.endDate))
                    }
                },
                {
                    title: '欲更换服务日',
                    key: 'name',
                    align: 'center',
                    render: (h, params) => {
                        return dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.changeBegin)) +'至'+ dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.endDate))
                    }
                },
            ],
            newStatonColumns:goodsPriceColumn.call(this),
            newStatonMoneyColumns:[
                {
                    title: '工位编号/房间名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '服务开始日',
                    key: 'startDate',
                    align: 'center'
                },
                {
                    title: '服务结束日',
                    key: 'endDate',
                    align: 'center'
                },
                {
                    title: '不计算服务费区间',
                    key: 'name',
                    align: 'center',
                    render:(h,params)=>{
                        if(params.row.freeStartDate){
                           return dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.freeStartDate))+'至'+params.row.endDate  
                       }else{
                        return '暂无免租'
                       }
                        
                    }
                },
                {
                    title: '签约价',
                    key: 'signPrice',
                    align: 'center'
                },
                {
                    title: '金额',
                    key: 'totalRent',
                    align: 'center',
                    render: (h, params) => {
                        return '￥'+utils.thousand(params.row.totalRent)
                    }
                },
                {
                    title: '操作',
                    key: 'name',
                    align: 'center',
                    render: (h, params) => {
                            return  h(Buttons, {
                                    props: {
                                        type: 'text',
                                        label:'明细',
                                        checkAction:'seat_order_view',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                           this.getServiceDetail(params.row)
                                        }
                                    }
                                })
                        }
                },
            ],
            newInfoColumns:[
                {
                    title: '服务费总额',
                    key: 'totalServiceFee',
                    align: 'center',
                    render: (h, params) => {
                        return '￥'+utils.thousand(params.row.totalServiceFee)
                    }
                },
                {
                    title: '服务保证金',
                    key: 'totalDeposit',
                    align: 'center',
                    render: (h, params) => {
                        return '￥'+utils.thousand(params.row.totalDeposit)
                    }
                },
            ],
            oldInfoColumns:[
                {
                    title: '减少服务费',
                    key: 'reduceServiceFee',
                    align: 'center',
                    render: (h, params) => {
                        return '￥'+utils.thousand(params.row.reduceServiceFee)
                    }
                },
                {
                    title: '退还服务费',
                    key: 'changeServiceFee',
                    align: 'center',
                    render: (h, params) => {
                        return '￥'+utils.thousand(params.row.changeServiceFee)
                    }
                },
                {
                    title: '工位已交保证金',
                    key: 'changeDeposit',
                    align: 'center',
                    render: (h, params) => {
                        return '￥'+utils.thousand(params.row.changeDeposit)
                    }
                },
            ],
            detailService:{
                codeName:'',
                details:[],
                totalAmount:'',
                seatType:''
            },
            serviceColumns:[
                {
                    title: '服务期',
                    key: 'reduceServiceFee',
                    align: 'center',
                    render:(h,params)=>{
                        return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.start_date)) +'~'+dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.end_date))
                    }
                },
                {
                    title: '服务费计算说明',
                    key: 'calculat_descr',
                    align: 'center'
                },
                {
                    title: '单价',
                    key: 'unit_price',
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'count',
                    align: 'center'
                },
                {
                    title: '小计',
                    key: 'amount',
                    align: 'right',
                    render:(h,params)=>{
                        return '￥'+utils.thousand(params.row.amount);
                    }
                },
            ]

		}
	},
	computed:{
        discountAdder:{
            get(){
                let discount=this.data.tacticsVOs&&this.data.tacticsVOs.find(e=>e.tacticsType==1)
               if (discount) {
                   return discount.addUserName
               }
               return ''
            }
        },
        rentFreeAdder:{
            get(){
                let rentFree=this.data.tacticsVOs&&this.data.tacticsVOs.find(e=>e.tacticsType==3)
               if (rentFree) {
                   return rentFree.addUserName
               }
               return ''
            }
        }
    },
	mounted(){
		GLOBALSIDESWITCH('false');
        GLOBALHEADERSET('订单合同');
        console.log('replaceview-seatinfo',this.data)
	},

	methods:{
		editCard(value){
            console.log('editCards，换租查看 新工位信息编辑')
			this.$emit("editCards", value); 
		},
		submit(){
            let formData = Object.assign({},this.data);
            formData.paidDepositAmount = this.data.newStationData[0].changeDeposit;
            formData.reduceRentAmount = this.data.newStationData[0].reduceServiceFee;
            formData.refundRentAmount =this.data.newStationData[0].changeServiceFee;
            formData.rentAmount = this.data.newStationData[0].totalServiceFee
            formData.oldSeatList = JSON.stringify(formData.oldSeatList);
            formData.seats.map(item=>{
                if (!item.discountNum) {
                    item.discountNum=10
                }
            })
            formData.seats = JSON.stringify(formData.seats);
            formData.saleList = JSON.stringify(formData.saleList);
            formData.serviceDetailsList = JSON.stringify(formData.serviceDetailsList)
            formData.endDate = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(formData.endDate))
            formData.signDate = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(formData.signDate))
            formData.startDate = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(formData.startDate))
            formData.firstPayTime = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(formData.firstPayTime))
            formData.newStationData = '';
            formData.depositAmount = this.data.newStationData[0].totalDeposit

            formData.oldDepositAmount = this.data.newStationData[0].changeDeposit
            //清除无用数据
            formData.newSeatCombin = '';
            formData.feeResultVO = '';
            formData.oldSeatInfo = '';
            formData.newSeatInfo = '';
            formData.tacticsVOs = ''


            let url = 'save-replace';

            if(formData.id){
                url = 'save-edit-replace'
            }

            this.$http.post(url, formData).then( r => {
                 window.close();
                window.opener.location.reload();

            }).catch( e => {
                this.$Notice.error({
                    title:e.message
                });

            })
		},
        getServiceDetail(item){
                // 计算得出免租后真正的结束日期
                var endTime = ''
                if(item.freeStartDate){
                    endTime = new Date(item.freeStartDate)
                    endTime = endTime.setDate(endTime.getDate()-1);
                    endTime = new Date(endTime).getTime()
                }else{
                    endTime = item.endDate;
                }
                


                let list = item.seatIds.map(value=>{
                    let obj = {};
                    obj.seatId = value;
                    obj.seatType = item.seatType;
                    return obj;
                })
                // let price = item.signPrice.split('元')[0]
                let price = item.price
                // price=price.replace(/\,/g,'')
                let params = {
                    codeName:item.name,
                    endDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate)),
                    realEndDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(endTime)),
                    seats:JSON.stringify(list),
                    signPrice:price,
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate))
                }
                this.$http.post('get-seat-combin-detail', params).then( r => {
                    this.openService = true;
                    this.detailService = r.data
                }).catch( e => {
                    this.$Notice.error({
                        title:e.message
                    });

                })
            },
        cancel(){
            this.openService = false;
        }

	}
}
</script>


<style lang="less">  
	.g-replace-order-detail{
        .reason{
            width: 100%;
            .ui-label{
                vertical-align: top;
                display: inline-block;
                width: 75px;
            }
            .ui-text{
                display: inline-block;
                width: 80%;
            }
        }
		.create-order{
			padding:30px;
		}
		.space{
			display: inline-block;
			width: 100%;
			height: 20px;
		}
		.buttons{
            text-align: center;
            margin:30px auto 30px;
        }
        .between{
            display: inline-block;
            width: 20px;
        }
        .card-header{
            display: inline-block;
            width: 100%;
            height:10px;
        }
        .ui-labeltext{
            padding-left: 0px;
        }
	}
</style>