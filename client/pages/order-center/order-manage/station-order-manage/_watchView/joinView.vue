<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left" /> 工位订单详情
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="客户名称：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="社区名称：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="销售人员：">
					{{basicInfo.salerName}}
				</LabelText>
				<LabelText label="创建时间：">
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="订单状态：">
					{{basicInfo.orderStatusName}}
				</LabelText>
				<LabelText label="生效时间：">
					{{(basicInfo.effectDate || '-')| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="机会：" v-show='opportunityStr'>
					{{opportunityStr}}
				</LabelText>
        <LabelText label="渠道来源：">
					{{basicInfo.promoCode}}
				</LabelText>
				<LabelText label="作废原因：" v-show='nullifyReason'>
					{{nullifyReason}}
				</LabelText>
				<LabelText label="作废说明：" v-show='nullifyRemark'>
					{{nullifyRemark}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="客户主管理员信息">
				<LabelText label="管理员手机号：">
					{{basicInfo.phone}}
				</LabelText>
				<LabelText label="管理员姓名：">
					{{basicInfo.name}}
				</LabelText>
				<LabelText label="管理员电子邮箱：">
					{{basicInfo.email}}
				</LabelText>
			</DetailStyle>
      <DetailStyle info="补充信息">
				<LabelText label="拟设立公司：">
					{{basicInfo.formulationCompanyName}}
				</LabelText>
				<LabelText label="居间方名称：">
					{{basicInfo.intermediaryName}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="租赁信息">
				<LabelText label="租赁开始日期：">
					{{basicInfo.startDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="租赁结束日期：">
					{{basicInfo.endDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="分期方式：">
					{{basicInfo.installmentTypeName}}
				</LabelText>
				<LabelText label="首付款日期：">
					{{basicInfo.firstPayTime| dateFormat('YYYY-MM-dd')}}
				</LabelText>
			</DetailStyle>
      <DetailStyle info="商品价格明细">
          <GoodPriceDetail :stationList="stationList" style='margin-bottom:20px'/>  
          <div>
            <LabelText label="折扣添加人：" >
					  	{{basicInfo.discountCreaterName}}
					  </LabelText>
					  <LabelText label="折扣原因：" >
					  	{{basicInfo.discountReason}}
					  </LabelText>
          </div>
          <!--感恩开始-->
          <div v-show="orderSeatThanksgivingDayVO.couponCode">
            <LabelText label="活动优惠码：" >
              {{orderSeatThanksgivingDayVO.couponCode}}
            </LabelText>
            <LabelText label="添加人：" >
              {{orderSeatThanksgivingDayVO.couponAdder}}
            </LabelText>
            <LabelText label="优惠码折扣：" >
              {{orderSeatThanksgivingDayVO.discount?orderSeatThanksgivingDayVO.discount+'折':''}}
            </LabelText>
            <LabelText label="状态：" >
              {{orderSeatThanksgivingDayVO.extStatusName}}
            </LabelText>
          </div>
          <!--感恩结束-->
          <div>
					  <LabelText label="服务费总额：" style="color:red;">
					  	{{basicInfo.seatRentAmount| thousand}}&nbsp;&nbsp;&nbsp;{{basicInfo.seatRentAmount| amountInWords}}
					  </LabelText>
					  <LabelText label="履约保证金总额：" style="color:red;">
					  	{{basicInfo.depositAmount| thousand}}&nbsp;&nbsp;&nbsp;{{basicInfo.depositAmount| amountInWords}}
					  </LabelText>
				  </div>
			</DetailStyle>
			<DetailStyle info="相关合同">
				<Table :columns="contract" :data="contractData" />
			</DetailStyle>
			<DetailStyle info="分期计划">
				<Table :columns="stagesColumn" :data="installments" />
				<div class="button-list">
					<div class="table-button" v-if="showButton == true && showAll == false" @click="showAllList">
						<span>展开</span>
						<img class="showAll" src="~assets/images/arrows.svg" />

					</div>
					<div class="table-button" v-if="showButton == true && showAll == true" @click="notAllList">
						<span>收起</span>
						<img class="notAll" src="~assets/images/arrows.svg" />
					</div>
				</div>
			</DetailStyle>
			<DetailStyle info="相关规则">
				<div v-html="basicInfo.versionRemark" style="margin-left:12px"></div>
			</DetailStyle>
		</div>
	</div>
</template>


<script>
import DetailStyle from "~/components/DetailStyle";
import LabelText from "~/components/LabelText";
import utils from "~/plugins/utils";
import dateUtils from "vue-dateutils";
import GoodPriceDetail from "./goodPriceDetail"

export default {
  name: "JoinView",
  head() {
    return {
      title: "查看入驻订单详情-氪空间后台管理系统"
    };
  },
  components: {
    DetailStyle,
    LabelText,
    GoodPriceDetail
  },
  data() {
    return {
      orderSeatThanksgivingDayVO:{},
      stationList:[],
      nullifyReason: "",
      nullifyRemark: "",
      opportunityStr: "",
      basicInfo: {},
      capitalService: "",
      capitalTreatment: "",
      versionRemark: "",
      service: [
        {
          title: "工位/房间编号",
          key: "seatName",
          align: "center"
        },
        {
          title: "类型",
          key: "seatType",
          align: "center",
          render: (h, params) => {
            let type = params.row.seatType;
            let typeName = "开放工位";
            if (type == "SPACE") {
              typeName = "独立办公室";
            } else {
              typeName = "开放工位";
            }
            return typeName;
          }
        },
        {
          title: "工位可容纳人数",
          key: "capacity",
          align: "center"
        },
        {
          title: "标准单价(元/月)",
          key: "originalPrice",
          align: "center"
        },
        {
          title: "开始日期",
          key: "startDate",
          align: "center",
          render(tag, params) {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.startDate)
            );
            return time;
          }
        },
        {
          title: "结束日期",
          key: "endDate",
          align: "center",
          render(tag, params) {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.endDate)
            );
            return time;
          }
        },
        {
          title: "小计",
          key: "originalAmount",
          align: "center"
        }
      ],

      treatment: [
        // {
        // 	title: '优惠类型',
        // 	key: 'tacticsName',
        // 	align: 'center'
        // },
        {
          title: "开始日期",
          key: "freeStart",
          align: "center",
          render(tag, params) {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.freeStart)
            );
            return time;
          }
        },
        {
          title: "结束日期",
          key: "freeEnd",
          align: "center",
          render(tag, params) {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.freeEnd)
            );
            return time;
          }
        },
        {
          title: "折扣比例",
          key: "discountNum",
          align: "center",
          render(tag, params) {
            if (params.row.discountNum == 0) {
              return "-";
            } else {
              return params.row.discountNum;
            }
          }
        },
        {
          title: "优惠添加人",
          key: "addUserName",
          align: "center"
        }
      ],

      contract: [
        {
          title: "合同编号",
          key: "contractNum",
          align: "center",
          render(h, params) {
            return h(
              "div",
              {
								style:{
									color:'rgb(43, 133, 228)',
									cursor:"pointer"
								},
                on: {
                  click: () => {
                    window.open(
                      `/order-center/contract-manage/contract-list/list?serialNumber=${
                        params.row.contractNum
                      }`,
                      "_blank"
                    );
                  }
                }
              },
              params.row.contractNum
            );
          }
        },
        {
          title: "合同金额",
          key: "rentAmount",
          align: "center"
        },
        {
          title: "状态",
          key: "orderStatusTypeName",
          align: "center"
        }
      ],
      installments: [],
      serviceData: [],
      treatmentData: [],
      contractData: [],
      showButton: false,
      showAll: false,
      stagesColumn: [
        {
          title: "分期类型",
          key: "installmentCategoryStr"
        },
        {
          title: "账单日",
          key: "billingDate",
          render: (h, params) => {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.billingDate)
            );
            return time;
          }
        },
        {
          title: "最后付款日",
          key: "lastPaymentDate",
          render: (h, params) => {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.lastPaymentDate)
            );
            return time;
          }
        },
        {
          title: "分期开始时间",
          key: "startDate",
          render: (h, params) => {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.startDate)
            );
            return time;
          }
        },
        {
          title: "分期结束时间",
          key: "startDate",
          render: (h, params) => {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.endDate)
            );
            return time;
          }
        },
        {
          title: "分期金额",
          key: "totalAmount",
          render: (h, params) => {
            return utils.thousand(params.row.totalAmount);
          }
        },
        {
          title: "支付状态",
          key: "payStatusStr"
        }
      ]
    };
  },

  mounted() {
    GLOBALSIDESWITCH("false");
    // GLOBALHEADERSET('订单合同')
    this.getDetailData();
  },

  methods: {
    //获取销售机会列表
    getSalerChanceList(parms) {
      let list = [];
      let _this = this;
      this.$http.get(
        "get-salechance",
        parms,
        r => {
          r.data.items.data.map(item => {
            list.push({
              label: item.name,
              value: item.id
            });
          });
          let obj = list.find(
            item => item.value == this.basicInfo.opportunityId
          );
          this.opportunityStr = obj.label || "";
        },
        error => {
          this.$Notice.error({
            title: error.message
          });
        }
      );
    },

    getDetailData() {
      let { params } = this.$route;
      let from = {
        id: params.watchView
      };
      this.$http
        .get("join-bill-detail", from)
        .then(response => {
          console.log('response.data');
          console.log(JSON.stringify(response.data));
          this.basicInfo = response.data;
          let pars = {
            customerId: this.basicInfo.customerId,
            communityId: this.basicInfo.communityId,
            receiveId: this.basicInfo.salerId,
            orderId: this.basicInfo.id
          };
          this.getSalerChanceList(pars);
          if (response.data.installments.length > 10) {
            this.showButton = true;
            this.showAll = false;
            this.installments = response.data.installments.slice(0, 10);
          } else {
            this.installments = response.data.installments || [];
          }
          this.installmentAll = response.data.installments || [];
          this.nullifyReason = response.data.invalidString;
          this.nullifyRemark = response.data.remark;
          this.capitalTreatment = response.data.tactiscAmount
            ? utils.smalltoBIG(response.data.tactiscAmount)
            : "";
          this.capitalService = response.data.seatRentAmount
            ? utils.smalltoBIG(response.data.seatRentAmount)
            : "";
          this.serviceData = response.data.orderSeatDetailVo || [];
          this.treatmentData = response.data.contractTactics || [];
          this.contractData = response.data.orderContractInfo
            ? response.data.orderContractInfo
            : [];
          this.stationList=response.data.orderSeatDetailVo||[]
          this.orderSeatThanksgivingDayVO=response.data.orderSeatThanksgivingDayVO||{}
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    },
    notAllList() {
      let list = this.installmentAll;
      this.showAll = false;
      this.installments = list.slice(0, 10);
    },
    showAllList() {
      let list = this.installmentAll;
      this.showAll = true;
      this.installments = list;
    }
  }
};
</script>


<style lang="less" scoped>
.g-order-detail {
  // margin:-10px;
  .m-detail-header {
    height: 50px;
    border-bottom: 1px solid #e8e9e9;
    line-height: 50px;
    font-size: 16px;
    color: #666666;
    .u-border-left {
      width: 0;
      height: 24px;
      border: 2px solid #499df1;
      margin-right: 20px;
    }
  }
  .m-detail-content {
    padding: 30px 24px;
    .ivu-table-wrapper {
      margin-bottom: 30px;
    }
  }
  .table-button {
    text-align: center;
    cursor: pointer;
    color: #499df1;
    display: inline-block;
    transition: all 0.5s;
    & > span {
      font-size: 16px;
      padding-bottom: 5px;
      padding-top: 10px;
      display: inline-block;
    }
  }
  .button-list {
    text-align: center;
  }
  .notAll {
    display: block;
    margin: 0 auto;
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
    vertical-align: middle;
  }
  .showAll {
    display: block;
    margin: 0 auto;
    width: 16px;
    height: 16px;

    vertical-align: middle;
  }
}
</style>
