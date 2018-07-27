<template>
  <div class="g-bill">
    <div class="u-search">
      <div style='display:inline-block;float:right;padding-right:20px;position:relative;'>
        <DatePicker type="date" v-model="tabParams.startTime" placeholder="开始时间" style="width: 130px"></DatePicker>
        <span style="margin:0 10px">至</span>
        <DatePicker type="date" v-model="tabParams.endTime" placeholder="结束时间"
                    style="width: 130px;margin-right: 20px"></DatePicker>
        <Alert class="error" type="error" v-if="timeError != false">{{timeError}}</Alert>
        <Input
            v-model="tabParams.customerName"
            placeholder="请输入客户名称"
            style="width: 252px;margin-right: 20px"
            @on-enter="lowerSubmit"
        />
        <Button type="primary" @click="lowerSubmit" style="margin-right: 20px">搜索</Button>
        <Button type="primary" @click="exportTable">导出excel</Button>
      </div>
    </div>
    <div class="u-table">
      <Table border :columns="columns" :data="billList"></Table>
      <div style="margin: 10px;overflow: hidden">
        <!-- <Button type="primary" @click="onExport">导出</Button> -->
        <div style="float: right;">
          <Page
              :current="page"
              :total="totalCount"
              :page-size="pageSize"
              show-total
              show-elevator
              @on-change="changePage"
          ></Page>
        </div>
      </div>
    </div>
    <Message
        :type="MessageType"
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>
  </div>
</template>


<script>
  import dateUtils from 'vue-dateutils';
  import Message from '~/components/Message';
  import utils from '~/plugins/utils';

  export default {
    name: 'income',
    components: {
      Message
    },
    data() {
      return {
        timeError: false,
        totalCount: 0,
        openMessage: false,
        warn: '',
        MessageType: '',
        pageSize: 20,
        page: 1,
        tabParams: {
          page: 1,
          pageSize: 20,
          customerName: '',
          startTime: '',
          endTime: ''
        },
        billList: [],
        incomeType: {},
        columns: [
          {
            title: '客户编码 ',
            key: 'asstActNumber',
            align: 'center',
          },
          {
            title: '金额',
            key: 'amount',
            align: 'center'
          },
          {
            title: '含税金额 ',
            key: 'arAmount',
            align: 'center',
          },
          {
            title: '客户名称 ',
            key: 'asstActName',
            align: 'center',
          },
          {
            title: '业务日期',
            key: 'bizDate',
            align: 'center',
          },
          {
            title: '业务员姓名',
            key: 'bizPerson',
            align: 'center',
          },
          {
            title: '普通销售/普通销售退',
            key: 'bizTypeName',
            align: 'center'
          },
          {
            title: '财务组织编码',
            key: 'companyNumber',
            align: 'center',
          },
          {
            title: '销售合同行号',
            key: 'contractNumber',
            align: 'center',
          },
          {
            title: '核心单据号 ',
            key: 'coreBillNumber',
            align: 'center',
          },
          {
            title: '成本中心',
            key: 'costCenteNumber',
            align: 'center',
          },
          {
            title: '客户名称',
            key: 'currency',
            align: 'center',
          },
          {
            title: '物料编码 ',
            key: 'materialNumber',
            align: 'center',
          },
          {
            title: '唯一交易编码',
            key: 'number',
            align: 'center',
          },
          {
            title: '不含税单价  ',
            key: 'price',
            align: 'center',
          },
          {
            title: '数量',
            key: 'quantity',
            align: 'center',
          },
          {
            title: '税额 ',
            key: 'taxAmount',
            align: 'center',
          },
          {
            title: '含税单价 ',
            key: 'taxPrice',
            align: 'center',
          },
          {
            title: '税率',
            key: 'taxRate',
            align: 'center',
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center',
          }
        ]

      }
    },
    created() {
      this.getTableData(this.$route.query);
      if (!this.$route.query.customerName) {
        this.$route.query.customerName = ""
      }
      Object.assign(this.tabParams, this.$route.query);
    },
    methods: {
      getTableData(params) {
        let newParams = {};
        for (let i in params) {
          if (params[i]) {
            if (i === 'startTime' || i === 'endTime') {
              newParams[i] = dateUtils.dateToStr("YYYY-MM-DD", new Date(params[i]))
            } else {
              newParams[i] = params[i];
            }
          }
        }
        Object.assign(newParams, {page: this.page});
        this.$http.get('get-receivable-collection-list', newParams).then((res) => {
          this.billList = res.data.items;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.$Notice.error({
            title: error.message
          });
        });
      },
      onChangeOpen(data) {
        this.openMessage = data;
      },
      lowerSubmit() {
        if (this.tabParams.startTime && this.tabParams.endTime && new Date(this.tabParams.startTime).getTime() > new Date(this.tabParams.endTime).getTime()) {
          this.timeError = '结束时间不得大于开始时间';
          setTimeout(() => {
            this.timeError = false;
          }, 1000);
          return;
        }
        this.page = 1;
        const subParams = Object.assign({}, this.tabParams, {
          page: 1,
          pageSize: this.pageSize,
          startTime: this.tabParams.startTime && dateUtils.dateToStr("YYYY-MM-DD", new Date(this.tabParams.startTime)) || '',
          endTime: this.tabParams.endTime && dateUtils.dateToStr("YYYY-MM-DD", new Date(this.tabParams.endTime)) || ''
        });
        utils.addParams(subParams);
      },
      changePage(page) {
        this.tabParams.page = page;
        this.page = page;
        this.getTableData(this.tabParams);
      },
      exportTable() {
        // todo
        utils.commonExport({},'/test/sync/incomeSummaries/export');
      }
    }

  }
</script>

<style lang="less">

  .g-bill {
    .u-search {
      height: 32px;
      margin: 16px 0;
      padding: 0 20px;
      .u-high-search {
        width: 22px;
        height: 22px;
        background: url('~/assets/images/upperSearch.png') no-repeat center;
        background-size: contain;
        float: right;
      }
    }

    .ivu-table-cell {
      padding: 0;
    }

    .u-table {
      padding: 0 20px;
    }

    .m-search {
      color: #2b85e4;
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
    }
    .error {
      position: absolute;
      left: 50px;
      color: red;
      z-index: 10;
    }
  }
</style>