<template>
  <div class="g-bill">
    <div class="u-search">
      <div style='display:inline-block;float:right;padding-right:20px;'>
        <DatePicker type="date" v-model="tabParams.startTime" placeholder="开始时间" style="width: 130px"></DatePicker>
        <span style="margin:0 10px">至</span>
        <DatePicker type="date" v-model="tabParams.endTime" placeholder="结束时间"
                    style="width: 130px;margin-right: 20px"></DatePicker>
        <div class="error" v-if="timeError != false">{{timeError}}</div>
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
            title: '合同编号',
            key: 'contractNumber',
            align: 'center',
          },
          {
            title: '订单编号',
            key: 'coreBillNumber',
            align: 'center'
          },
          {
            title: 'OP系统社区编码',
            key: 'costCenterNumber',
            align: 'center',
          },
          {
            title: '金额',
            key: 'amount',
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
            title: '财务组织编码',
            key: 'companyNumber',
            align: 'center',
          },
          {
            title: '币别',
            key: 'currency',
            align: 'center',
          },
          {
            title: '唯一交易编码',
            key: 'number',
            align: 'center',
          },
          {
            title: '付款账号',
            key: 'payerAccountBank',
            align: 'center',
          },
          {
            title: '客户(供应商)名称',
            key: 'payerName',
            align: 'center',
          },
          {
            title: '客户（供应商）编码 ',
            key: 'payerNumber',
            align: 'center',
          },
          {
            title: '付款人类型',
            key: 'payerType',
            align: 'center',
            render(h, obj) {
              switch (obj.row.payerType) {
                case 'PAYMENT':
                  return h('span', {
                    style: {
                      color: '#FF6868'
                    }
                  }, '111');
                  break;
                case 'CUSTOMER':
                  return h('span', {
                    style: {
                      color: '#666666'
                    }
                  }, '222');
                  break;
              }
            }
          },
          {
            title: '银行收款账号 ',
            key: 'recAccountBank',
            align: 'center',
          },
          {
            title: '收款类型',
            key: 'recBillType',
            align: 'center',
          },
          {
            title: '结算方式',
            key: 'settlementType',
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
      // renderList() {
      //   // this.getIncomeType();
      //   let incomeType = this.incomeType;
      //   let billtype = {
      //     title: '收入类型',
      //     key: 'incomeType',
      //     align: 'center',
      //     width: 120,
      //     render(h, obj) {
      //       return h('span', {}, incomeType[obj.row.incomeType]);
      //     }
      //   };
      //   if (this.columns.length < 7) {
      //     this.columns.splice(5, 0, billtype)
      //   }
      //
      //
      // },
      // getIncomeType() {
      //   this.$http.get('get-fee-type', '').then((res) => {
      //     res.data.enums.map((item) => {
      //       this.incomeType[item.code] = item.name;
      //     })
      //   }).catch((err) => {
      //     this.$Notice.error({
      //       title: err.message
      //     });
      //   })
      // },
      // onExport() {
      //   console.log('导出')
      // },
      getTableData(params) {
        // this.renderList();
        params = Object.assign(params, {page: this.page});
        this.$http.get('get-advanced-collection-list', params).then((res) => {
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
        // let {customerName, startTime, endTime} = this.tabParams.customerName;
        // this.page = 1;
        // this.tabParams = {
        //   page: 1,
        //   pageSize: 20,
        //   customerName,
        //   startTime,
        //   endTime
        // };
        this.page = 1;
        Object.assign(this.tabParams, {page: 1, pageSize: this.pageSize});
        utils.addParams(this.tabParams);
      },
      changePage(page) {
        this.tabParams.page = page;
        this.page = page;
        this.getTableData(this.tabParams);
      },
      exportTable() {
        this.$http.get('export-advanced-collection-list', {}).then((res) => {
        }).catch((error) => {
          this.$Notice.error({
            title: error.message
          });
        });
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
      right: 0px;
      color: red;
    }
  }
</style>