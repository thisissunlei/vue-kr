<template>
  <div class="list-and-map-list">
    <div class="search-from-panel">
      <SearchForm :communityId="communityId"
        @searchClick="searchClick"
        @clearClick="clearClick"
        @initData="initData"
        @getFloor="getFloor"
        @cityFloor="cityFloor" />
    </div>
    <div class="table-list"
      :style="{height:(page.height-300)+'px'}">
      <Table ref="selectionGoodsLibrary"
        border=""
        :loading="loading"
        stripe
        :columns="attractColumns"
        :data="attractData"
        @on-selection-change="tableSelectChange"></Table>
    </div>
  </div>
</template>

<script>
//client/store/discountSetting/index.js
import { mapGetters } from "vuex";
import Loading from "~/components/Loading";
import dateUtils from "vue-dateutils";
import SearchForm from "./search-form.vue";
export default {
  components: {
    SearchForm
  },
  props: {
    floors: {
      type: Array,
      default: () => []
    },
    originStationList: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => { }
    },
    stationData: {
      type: Array,
      default: () => []
    },
    communityId: {
      type: String,
      default: ""
    },
    addFlag: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      selectGoods: [],
      floorList: [],
      floorStr: "",
      tabForms: {
        page: 1,
        pageSize: 100
      },
      formItem: {
        page: 1,
        pageSize: 100,
        floor: " ",
        goodsType: " ",
        locationType: " ",
        suiteType: " "
      },
      attractColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "name",
          align: "center",
          render: (h, params) => {
            var ile = params.row.name;
            var nes = params.row.duplicateNo;
            var btnRender = [];
            if (params.row.duplicateNo == 0) {
              btnRender = [h("p", {}, ile)];
            } else {
              btnRender.push(
                h("p", {}, ile),
                h(
                  "span",
                  {
                    style: {
                      color: "black"
                    }
                  },
                  "("
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "#FF6868"
                    }
                  },
                  "有重复 "
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "black"
                    }
                  },
                  " 编号" + nes + ")"
                )
              );
            }
            return h(
              "div",
              {
                style: {
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.goDetail(params.row);
                  }
                }
              },
              btnRender
            );
          }
        },
        {
          title: "商品类型",
          key: "goodsTypeName",
          align: "center",
          width: 120
        },
        {
          title: "工位数量",
          key: "capacity",
          align: "center",
          width: 90
        },
        {
          title: "商品属性",
          key: "locationTypeName",
          align: "center",
          width: 120,
          render(h, params) {
            var bacsk = params.row.suiteTypeName
              ? params.row.suiteTypeName
              : "";
            var devel = params.row.locationTypeName
              ? params.row.locationTypeName
              : "";
            let des = params.row.descr ? params.row.descr : "";
            return h("div", [h("span", devel + " " + bacsk), h("div", des)]);
          }
        },
        {
          title: "面积",
          key: "area",
          align: "center",
          width: 90
        },
        {
          title: "商品定价",
          key: "quotedPrice",
          width: 90,
          align: "right"
        },
        {
          title: "当前状态",
          key: "goodsStatusName",
          align: "center",
          width: 90,
          render: (tag, params) => {
            var statusName = params.row.goodsStatusName
              ? params.row.goodsStatusName
              : "-";
            var status = params.row.goodsStatus;
            var colorClass = "";
            if (status == "DISABLE" || status == "OFF") {
              colorClass = "redClass";
            } else {
              colorClass = "";
            }
            return tag(
              "span",
              {
                attrs: {
                  class: colorClass
                },
                style: {
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.openSingleStatus(params.row);
                  }
                }
              },
              statusName
            );
          }
        },

        {
          title: "备注",
          key: "descr",
          align: "center"
        }
      ],
      attractData: [],
      loading: false,
      productList: [
        { value: " ", label: "全部类型" },
        { value: "OPEN", label: "固定办公桌" },
        { value: "SPACE", label: "独立办公室" },
        { value: "MOVE", label: "移动办公桌" }
      ],
      locationList: [
        { value: " ", label: "全部方位" },
        { value: "OUTSIDE_SPACE", label: "外侧间" },
        { value: "INSIDE_SPACE", label: "内侧间" },
        { value: "UNKNOWN", label: "未知" }
      ],
      suiteTypeList: [
        { value: " ", label: "套间情况" },
        { value: "SUITE", label: "有套间" },
        { value: "UNSUITE", label: "无套间" }
      ],
      goodsStatusList: [
        { value: " ", label: "全部" },
        { value: "ON", label: "启用" },
        { value: "DISABLE", label: "不可用" },
        { value: "OFF", label: "下架" }
      ],
      endParams: {
        deleteData: [],
        submitData: []
      },
      page: {},
    };
  },
  computed: {
    ...mapGetters(["formDiscount"])
  },
  watch: {
    tabForms(val, old) {
      this.attractData=[]
      this.selectGoodIds=[]
      this.getListData(this.tabForms);
      this.floor = this.tabForms.floor;
    },
    addFlag() {
      this.doAddDiscount(this.formDiscount);
    }
  },
  mounted() {
    var dom=document.getElementsByClassName('ivu-modal-wrap')[0];
    dom.addEventListener("scroll",this.onScrollListener);
  },
  destroyed() {
    var dom = document.getElementsByClassName('ivu-modal-wrap')[0];
    dom.removeEventListener("scroll", this.onScrollListener);
  },
  methods: {
    initData(formItem, floorList) {
      this.tabForms = Object.assign({}, this.tabForms, formItem);
      var str = "";
      if (this.tabForms.floor == " " || this.tabForms.floor == "") {
        // for
        for (var i = floorList.length - 1; i >= 0; i--) {
          if (floorList[i].floor != " ") {
            str = str + floorList[i].floor + ",";
          }
        }
        str = str.substring(0, str.length - 1);
        this.floorStr = str;
      }
      // console.log("floorListfloorListfloorListfloorList", floorList);
    },
    searchClick(values) {
      this.tabForms = Object.assign({}, this.tabForms, values, { page: 1 });
    },
    clearClick(values) {
      this.tabForms = Object.assign({}, this.tabForms, values);
    },
    getFloor(list) {
      this.floorList = [].concat(list);
    },
    cityFloor(params) {
      this.tabForms = Object.assign({}, this.tabForms, params, { page: 1 });
    },
    getListData(tabParams) {
      //列表
      this.loading = true;
      let params = Object.assign({}, tabParams);
      params.communityId = this.communityId;
      params.floor =  (params.floor&&params.floor.length > 1) ? " " : params.floor;
      params.cityId = "";
      this.$http
        .get("getGoodsList", params)
        .then(response => {
          this.totalCount = response.data.totalCount;
          let tableData=this.attractData.concat(response.data.items);
          // this.attractData = this.attractData.concat(response.data.items);
          this.name = response.data;
          this.loading = false;
          tableData.map(item=>{
            if (this.selectGoodIds.includes(item.id)) {
              item._checked=true
            }
          })
          this.attractData =tableData
        })
        .catch(error => {
          this.openMessage = true;
          this.MessageType = "error";
          this.warn = error.message;
        });
    },
    //滚动监听
    onScrollListener() {
      var dom = document.getElementsByClassName('ivu-modal-wrap')[0];
      var totalPage = Math.ceil(this.totalCount / this.tabForms.pageSize);
      if (dom.scrollHeight - dom.scrollTop - dom.clientHeight < 10) {
        if (this.tabForms.page == totalPage) {
          return;
        }
        this.spinLoading = true;
        this.tabForms.page = Number(this.tabForms.page) + 1;
        console.log('下拉加载')
        this.getListData(this.tabForms);
      }
    },
    tableSelectChange(params) {
      this.selectGoods = params.map(item => {
        this.selectGoodIds.push(item.id)
        return { seatId: item.id, seatType: item.seatType };
      });
      console.log('选择个数',this.selectGoods.length)
    },
    //执行添加折扣
    doAddDiscount(formDiscount) {
      console.log("doAddDiscount", this.formDiscount);
      // debugger
      if (this.selectGoods.length === 0) {
        this.$Notice.error({
          title: "请选择工位"
        });
        return;
      }

      let {
        communityId,
        schemeType,
        discountType,
        rightDetail,
        time: { startDate, endDate },
        remark
      } = formDiscount;
      let parmas = {
        communityId,
        schemeType,
        discountType,
        rightDetail,
        startDate,
        endDate,
        remark
      };

      parmas.startDate = parmas.startDate
        ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.startDate))
        : "";
      parmas.endDate = parmas.endDate
        ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.endDate))
        : "";

      parmas.goods = JSON.stringify(this.selectGoods);
      this.$http
        .post("post-add-discount", parmas)
        .then(response => {
          this.$Message.success("添加成功");
          this.$store.commit("changeModalState", false);
        })
        .catch(error => {
          this.$Notice.error({
            title: "添加失败",
            desc: error.message
          });
        });
    }
  }
};
</script>

<style lang='less' scoped>
.list-and-map-list {
  .search-from-panel {
  }
  .table-list {
    margin-top: 20px;
    overflow: auto;
  }
}
</style>
