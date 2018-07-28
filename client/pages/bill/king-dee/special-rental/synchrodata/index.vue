<template>
<div>
<div style="height:50px;padding:10px 20px">
   <Button type="primary" class="button-left" @click="goAdd">新增</Button>
   <div class="button-right">
    <Select v-model="configStatus" style="width:200px" placeholder="状态">
      <Option  :value="''" >全部状态</Option>
      <Option  :value="'NO'" >打开</Option>
      <Option  :value="'OPEN'" >关闭</Option>

      </Select>
    <Input v-model="customerName" placeholder="按客户名称检索" style="width: 200px;margin:0px 10px;"> </Input>
    <Button type="primary" @click="searchMethod" >搜索</Button>
   </div>
</div>
<div style="padding:10px 20px">
<Table border :columns="columns1" :data="datalistCommunityConfigByPage"></Table>
</div>
<div style="padding:10px 20px;text-align:right">
  <Page :total="total" :page-size='pageSize' @on-change="changePage" show-elevator></Page>

</div>
</div>
</template>

<script>
import dateUtils from 'vue-dateutils';
export default {
  data () {
    return {
      configStatus: "",
      customerName: '',
	  total: 0,
	  pageSize:20,
      page: 1,
      value: '',
      model1: '',
      columns1: [
        {
          title: '状态',
          key: 'configStatus',
          width:80,
          align:'center',
          render: (h, params) => {
            return h("div", {
              style: {
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                display:'inline-block',
                backgroundColor: params.row.configStatus == 'OPEN' ? 'green' : "red"
              }
            }, '')
          }
        },
        {
          title: '客户名称',
          key: 'customerName'
        },
        {
          title: '出租方名称',
          key: 'corporationName'
        },
        {
          title: '社区名称',
          key: 'communityName'
        },
        {
          title: '配置时间',
          key: 'createTime',
          render:(h, params)=>{
                let ile= params.row.createTime;
                ile = ile ? dateUtils.dateToStr('YYYY-MM-DD', new Date(ile)) : '';
                  return h('div',{

                },ile)
          }
        },
        {
          title: '创建人',
          key: 'createUserId'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          key: 'name',
          align:'center',
          render: (h, params) => {
			  console.log(params.row,"ppppp")
            return h('span', {
              on: {
                click: () => {
                  this.communityConfigStatusUpdate(params)
                }
              },
              style: {
                color: 'rgb(46, 139, 239)',
                cursor: 'pointer',

              }
            }, params.row.configStatus != 'NO' ? '关闭' : "打开")
          }
        }
      ],
      datalistCommunityConfigByPage: []
    }
  },
  created () {
    this.listCommunityConfigByPage()
  },
  methods: {
    searchMethod () {
      this.page = 1;
      this.listCommunityConfigByPage()
    },
    changePage (param) {
      this.page = param;
      this.listCommunityConfigByPage();
    },
    goAdd () {
      this.$router.push({ path: "/bill/king-dee/special-rental/addsynchrodata" })

    },
    listCommunityConfigByPage () {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        configStatus: this.configStatus,
        customerName: this.customerName
      }
      this.$http.get('listCommunityConfigByPage', param).then((res) => {
        this.datalistCommunityConfigByPage = res.data.items
        this.total = res.data.total
      })
    },
    communityConfigStatusUpdate (param) {
      console.log(param)
      let param2 = {
        configStatus: param.row.configStatus == 'OPEN'?"NO":"OPEN",
        id: param.row.id

      }
      this.$http.post('communityConfigStatusUpdate', param2).then((res) => {
        this.$Notice.success({
          title: '系统提示',
          desc: "操作成功"
        });
        this.page = 1;
        this.listCommunityConfigByPage();
      }).catch(e => {
        this.$Notice.error({
          title: '系统错误',
          desc: e ? '' : e.message
        });
      })
    },
    communityConfigAdd () {
      let param = {
        page: this.page,
        pageSize: this.pageSize
      }
      this.$http.get('communityConfigAdd', param).then((res) => {
        this.datalistCommunityConfigByPage = res.data.items

      })
	}
  }

}
</script>

<style>
.button-left {
  float: left;
}
.button-right {
  float: right;
}
</style>
