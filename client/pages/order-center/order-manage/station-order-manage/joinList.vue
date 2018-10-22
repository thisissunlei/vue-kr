<template>
  <div class="m-join-list">
    <div class="list-banner">
      <div class="list-btn">
        <Button type="primary" @click="jumpJoin" class="join-btn">入驻</Button>
        <Button type="primary" @click="jumpRenew" class="join-btn">续租</Button>
        <Button type="primary" @click="jumpReduce" class="join-btn">减租</Button>
        <Button type="primary" @click="jumpReplace">换租</Button>
      </div>
      <!-- 搜索 -->
      <div class="list-search">
        <div class="lower-search">
          <span style="padding-right:10px">客户名称</span>
          <i-input
            v-model="params.customerName"
            placeholder="请输入客户名称"
            style="width: 252px"
            @keyup.enter.native="onKeyEnter($event)"
          />
        </div>
        <div class="m-search" @click="submitLowerSearch">搜索</div>
        <!-- 高级查询 -->
        <div class="m-bill-search" @click="onShowSearch">
          <span/>
        </div>
      </div>
    </div>
    <div class="table-container">
      <!-- 表格组件 -->
      <Table :columns="joinOrder" :data="joinData" border="" class="list-table-join"/>
    </div>
    <!-- 列表底部包括 导出 和 分页 -->
    <div class="list-footer">
      <Buttons label="导出" type="primary" @click="submitExport" checkAction="seat_order_in_export"/>
      <Buttons
        v-if="hasSeatDataExportRight"
        label="导出工位数据"
        type="primary"
        @click="submitExportSeat"
        checkAction="seat_order_in_export"
        style="margin-left:20px"
      />
      <!-- 分页组件 -->
      <div style="float: right;">
        <Page
          :total="totalCount"
          :page-size="15"
          show-total
          show-elevator
          @on-change="onPageChange"
        />
      </div>
    </div>
    <!-- 高级搜索 -->
    <Modal v-model="openSearch" title="高级搜索" width="660">
      <HeightSearch mask="join" @bindData="onUpperChange" :keys="mask" :params="switchParams"/>
      <div slot="footer">
        <Button type="primary" @click="submitUpperSearch">确定</Button>
        <Button type="ghost" style="margin-left:8px" @click="onShowSearch">取消</Button>
      </div>
    </Modal>
    <!-- 作废订单弹窗 -->
    <Modal id="nullifymodel" v-model="openNullify" title="请确认是否作废订单" width="500">
      <Nullify
        v-if="openNullify"
        :id="id"
        @refershList="refershJoinList"
        @closeModalForm="closeNullify"
      />
      <div id="nulldiv" slot="footer"></div>
    </Modal>
    <!-- 提示信息弹窗 -->
    <Message
      :type="MessageType"
      :openMessage="openMessage"
      :warn="warn"
      @changeOpen="onMessageChange"
    />
    <!-- 申请合同弹窗 -->
    <Modal v-model="openApply" title="提示信息" width="500">
      <ApplyContract
        v-if="openApply"
        :requireChineseEnglish="requireChineseEnglish"
        @onSelectionChange="onSelectApplyContract"
      />
      <div slot="footer">
        <Button type="primary" :disabled="applyDisabled" @click="submitApply">确定</Button>
        <Button type="ghost" style="margin-left:8px" @click="closeApply">取消</Button>
      </div>
    </Modal>
  </div>
</template>


<script>
import HeightSearch from "./heightSearch";
import Nullify from "./nullify";
import ApplyContract from "./applyContract";
import dateUtils from "vue-dateutils";
import utils from "~/plugins/utils";
// 入住列表的数据
import joinListData from "./listData/joinData";
import Message from "~/components/Message";
import Buttons from "~/components/Buttons";
import ToolTip from "~/components/ToolTip";

export default {
  name: "Join",
  components: {
    HeightSearch,
    Nullify,
    Message,
    Buttons,
    ApplyContract,
    ToolTip
  },
  props: {
    mask: String
  },
  data() {
    return {
      params: {
        page: 1,
        pageSize: 15,
        customerName: ""
      },
      requireChineseEnglish: false,
      contractLanguage: "CHINESE", //合同语言类型
      hasSeatDataExportRight: false,
      switchParams: {},
      openMessage: false,
      nullDisabled: false,
      applyDisabled: false,
      warn: "",
      MessageType: "",
      upperData: {},
      upperError: false,
      id: "",
      props: {},
      totalCount: 1,
      openSearch: false,
      openNullify: false,
      openApply: false,
      joinData: [],
      //列表数据格式
      joinOrder: joinListData.call(this)
    };
  },

  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        if (nextProps.mask == "join") {
          let switchParams = Object.assign(
            { customerName: this.$route.query.customerName || "" },
            this.switchParams
          );
          this.getListData(switchParams);
          this.params = Object.assign({}, switchParams);
        }
      }
    }
  },

  mounted() {
    let mask = this.$route.query.mask;
    if (!mask || mask == "join") {
      sessionStorage.setItem("paramsJoin", JSON.stringify(this.$route.query));
    }

    let jsonJoin = JSON.parse(sessionStorage.getItem("paramsJoin"));
    this.switchParams = Object.assign(
      {},
      jsonJoin,
      { page: 1, pageSize: 15 },
      this.$route.query
    );
    this.getListData(this.switchParams);
    this.params = this.switchParams;
  },

  methods: {
    //跳转合同别彪
    gocontractlist(params) {
      this.$http
        .get("get-order-seat-serial-number", { orderId: params.row.id })
        .then(response => {
          window.open(
            `/order-center/contract-manage/contract-list/list?serialNumber=${
              response.data
            }`,
            "_blank"
          );
        })
        .catch(error => {
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },
    //获取作废原因
    refershJoinList(params) {
      this.getListData(this.params);
      this.openNullify = false;
    },
    submitNullify() {
      let params = {
        id: this.id
      };
      if (this.nullDisabled) {
        return;
      }
      this.nullDisabled = true;

      this.$http
        .post("join-nullify", params)
        .then(response => {
          this.openMessage = true;
          this.MessageType = "success";
          this.warn = "作废成功";
          this.getListData(this.params);
          this.closeNullify();
        })
        .catch(error => {
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },

    submitApply() {
      let params = {
        id: this.id,
        languageType: this.contractLanguage
      };
      if (this.applyDisabled) {
        return;
      }
      this.applyDisabled = true;
      this.closeApply();
      this.$http
        .post("apply-contract", params)
        .then(response => {
          this.openMessage = true;
          this.MessageType = "success";
          this.warn = "申请成功";
          this.getListData(this.params);
        })
        .catch(error => {
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },

    submitExport() {
      this.props = Object.assign({}, this.props, this.params);
      utils.commonExport(
        this.props,
        "/api/krspace-op-web/order-seat-add/export"
      );
    },
    //导出工位数据
    submitExportSeat() {
      this.props = Object.assign({}, this.props, this.params);
      utils.commonExport(
        this.props,
        "/api/krspace-op-web/order-seat-add/export-all"
      );
    },
    submitUpperSearch() {
      if (this.upperError) {
        return;
      }
      this.params = Object.assign({}, this.params, this.upperData);
      this.params.mask = "join";
      this.params.page = 1;
      this.params.pageSize = 15;
      this.params.effectEnd = this.params.effectEnd
        ? dateUtils.dateToStr(
            "YYYY-MM-DD HH:mm:SS",
            new Date(this.params.effectEnd)
          )
        : "";
      this.params.effectStart = this.params.effectStart
        ? dateUtils.dateToStr(
            "YYYY-MM-DD HH:mm:SS",
            new Date(this.params.effectStart)
          )
        : "";
      this.params.cStartDate = this.params.cStartDate
        ? dateUtils.dateToStr(
            "YYYY-MM-DD HH:mm:SS",
            new Date(this.params.cStartDate)
          )
        : "";
      this.params.cEndDate = this.params.cEndDate
        ? dateUtils.dateToStr(
            "YYYY-MM-DD HH:mm:SS",
            new Date(this.params.cEndDate)
          )
        : "";
      utils.addParams(this.params);
    },

    submitLowerSearch() {
      this.params.mask = "join";
      console.log(this.params, "ooooooooo");
      utils.addParams(this.params);
    },

    getListData(params) {
      this.$http
        .get("join-bill-list", params)
        .then(response => {
          this.totalCount = response.data.totalCount;
          this.joinData = response.data.items;
          this.openSearch = false;
          this.hasSeatDataExportRight = response.data.hasSeatExportRight; //是否具有工位数据导出权限
        })
        .catch(error => {
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },

    onPageChange(index) {
      let params = this.params;
      params.page = index;
      this.getListData(params);
    },

    onUpperChange(params, error) {
      this.upperError = error;
      this.upperData = params;
    },

    onMessageChange(data) {
      this.openMessage = data;
    },

    onKeyEnter: function(ev) {
      this.submitLowerSearch();
    },

    jumpJoin() {
      window.open(
        "/order-center/order-manage/station-order-manage/create/join",
        "_blank"
      );
    },
    jumpReduce() {
      window.open(
        "/order-center/order-manage/station-order-manage/create/reduce",
        "_blank"
      );
    },

    jumpRenew() {
      window.open(
        "/order-center/order-manage/station-order-manage/create/renew",
        "_blank"
      );
    },

    jumpReplace() {
      window.open(
        "/order-center/order-manage/station-order-manage/create/replace",
        "_blank"
      );
    },

    jumpView(params) {
      var viewName = "";
      if (params.row.orderType == "CONTINUE") {
        viewName = "renewView";
      } else {
        viewName = "joinView";
      }
      window.open(
        `/order-center/order-manage/station-order-manage/${
          params.row.id
        }/${viewName}`,
        "_blank"
      );
    },

    jumpEdit(values) {
      var popup = window.open();
      let params = {
        orderId: values.row.id
      };
      this.$http
        .get("order-first-payed", params)
        .then(response => {
          let type = "";
          switch (values.row.orderType) {
            case "IN":
              type = "join";
              break;
            case "INCREASE":
              type = "join";
              break;
            case "CONTINUE":
              type = "renew";
              break;
            default:
              type = "join";
              break;
          }
          popup.location = `/order-center/order-manage/station-order-manage/${
            values.row.id
          }/${type}`;
        })
        .catch(error => {
          popup.close();
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },
    //是否作废弹窗打开
    showNullify(params) {
      this.id = params.row.id;
      this.closeNullify();
    },
    //是否作废弹窗关闭
    closeNullify() {
      this.openNullify = !this.openNullify;
    },
    //高级查询开关
    onShowSearch() {
      this.openSearch = !this.openSearch;
    },
    //申请合同弹窗
    showApply(params) {
      this.id = params.row.id;
      this.contractLanguage = "CHINESE";
      this.requireChineseEnglish = params.row.orderType == "IN";
      this.closeApply();
    },
    //申请合同弹窗挂壁
    closeApply() {
      this.openApply = !this.openApply;
      this.applyDisabled = false;
    },
    //中英文合同选择切换
    onSelectApplyContract(contractLanguage) {
      this.contractLanguage = contractLanguage;
    }
  }
};
</script>

<style lang='less' >
.m-join-list {
  .list-banner {
    width: 100%;
    padding: 0 0 0 20px;
    .list-btn {
      display: inline-block;
      width: 40%;
      .join-btn {
        margin-right: 20px;
      }
    }
    .list-search {
      margin-bottom: 10px;
      display: inline-block;
      width: 60%;
      text-align: right;
      .lower-search {
        display: inline-block;
        margin: 10px 20px;
      }
    }
  }
  .table-container {
    overflow: auto;
    .list-table-join {
      // min-width:1130px ;
      overflow: auto;
      width: 100%;
      margin: 0;
      margin-top: 0px;
      .ivu-tooltip-inner {
        max-width: 300px;
      }
      // /deep/ .ivu-table-cell{
      //     padding-left: 10px;
      //     padding-right: 10px;
      // }
      .col-operate {
        .ivu-table-cell {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
  }

  .list-footer {
    margin: 10px 20px;
    overflow: hidden;
  }

  .m-bill-search {
    display: inline-block;
    height: 22px;
    margin: 16px 20px;
    vertical-align: bottom;
    span {
      width: 22px;
      height: 22px;
      background: url("~assets/images/upperSearch.png") no-repeat center;
      background-size: contain;
      float: right;
      cursor: pointer;
    }
  }
  .m-search {
    color: #2b85e4;
    display: inline-block;
    cursor: pointer;
  }
  .u-txts {
    display: inline-block;
  }
  .u-red {
    color: red;
  }
  .u-nullify {
    text-decoration: line-through;
  }
}
</style>