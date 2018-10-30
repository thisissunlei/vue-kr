<template>
  <div class="g-device-list">
    <Table :columns="columns1" :loading="loading" :data="logList" size="small"></Table>
  </div>
</template>
<script>
import dateUtils from "vue-dateutils";

export default {
  components: {},
  data() {
    return {
      searchData: {
        deviceUpgradeId: ''
      },
      loading: false,
      columns1: [
        {
          title: "社区名称",
          key: "communityName",
          align: "center"
        },
        {
          title: "操作人",
          key: "createdBy",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createdTime",
          align: "center",
          className: "door-permission-times",
          render(h, obj) {
            return h("div", [
              h(
                "span",
                dateUtils.dateToStr(
                  "YYYY-MM-DD HH:mm",
                  new Date(obj.row.createdTime)
                )
              )
            ]);
          }
        },
        {
          title: "升级时间",
          key: "upgradeTime",
          align: "center",
          className: "door-permission-times",
          render(h, obj) {
            return h("div", [
              h(
                "span",
                dateUtils.dateToStr(
                  "YYYY-MM-DD HH:mm",
                  new Date(obj.row.upgradeTime)
                )
              )
            ]);
          }
        }
      ],
      logList: []
    };
  },
  created() {},

  mounted() {
    GLOBALSIDESWITCH("false");
    this.searchData.deviceUpgradeId = this.$route.query.upgradeId;
    this.getListData();
  },

  methods: {

    getListData() {
      this.loading = true;
      let _this = this;
      let params = Object.assign({}, this.searchData, { date: new Date() });
      var reqURL = "device-upgrade-log";
      this.$http
        .get(reqURL, params)
        .then(res => {
          _this.logList = res.data;
          _this.loading = false;
        })
        .catch(error => {
          _this.$Notice.error({
            title: error.message
          });
        });
    }
    
  }
};
</script>
<style lang="less">
</style>


