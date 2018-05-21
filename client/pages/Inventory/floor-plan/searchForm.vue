<template>
  <div class="floor-map-search">
      <Form ref="formItemFloor" :model="formItem" label-position="left" style="padding:18px 20px 0 20px;background:#fff;">
            <Form-item label="社区" class='daily-form'>
                <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入社区" 
                        style="width: 200px;margin-right:10px;"
                        @on-change="communityChange"
                    >
                        <Option v-for="item in communityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <Select 
                        v-model="formItem.floor" 
                        placeholder="请输入楼层" 
                        style="width: 90px;margin-right:54px;"
                        @on-change="floorChange"
                    >
                        <Option v-for="item in floorList" :value="item.floor" :key="item.floor">{{ item.floorName }}</Option>
                </Select> 
            </Form-item>

            <Form-item label="库存日期" class='daily-form'>
                <DatePicker 
                    v-model="formItem.currentDate" 
                    placeholder="请输入库存日期"
                    style="width: 200px;margin-right: 9px;"
                    @on-change="dateChange"
                />
            </Form-item>
            <Tooltip content="查询某一天，以平面图的方式展示某个社区库存情况。如需查询某个时间段的可租商品，可前往可租商品查询页进行查询" placement="bottom">
                <span class='icon-tip'></span>
            </Tooltip>
      </Form>
  </div>
</template>

<script>
import publicFn from './publicFn';
export default {
  data(){
    return{
       communityList:[],
       floorList:[],
       formItem:{
          communityId:'',
          floor:' ',
          currentDate:publicFn.getToDay()
       }
    }
  },
  mounted(){
      this.getCommunityList();
  },
  methods:{
     //社区接口
    getCommunityList(id){
        var params={
            cityId:id?id:''
        }
        this.$http.get('getDailyCommunity',params).then((res)=>{
            this.communityList=res.data;
            this.formItem.communityId=res.data?res.data[0].id:'';
        }).catch((error)=>{
            this.$Notice.error({
                title:error.message
            });
        })
    },
    //楼层接口
    getFloorList(param){
        this.$http.get('getDailyFloor', {communityId:param}).then((res)=>{
            this.floorList=res.data;
            if(res.data.length>1){
                this.floorList.unshift({floor:' ',floorName:"全部楼层"})                        
            }
            this.formItem.floor=this.floorList.length?this.floorList[0].floor:' '; 
        }).catch((error)=>{
            this.$Notice.error({
                title:error.message
            });
        })
    },
    communityChange(param){
        this.formItem.communityId=param;
        this.$emit('searchForm',this.formItem);
        this.getFloorList(param); 
    },
    floorChange(param){
        this.formItem.floor=param;
        this.$emit('searchForm',this.formItem);
    },
    dateChange(param){
        this.formItem.currentDate=param;
        this.$emit('searchForm',this.formItem);
    }
  }
}
</script>

<style lang="less"> 
    .floor-map-search{
        .daily-form{
            display:inline-block;
            .ivu-form-item-content{
                display:inline-block;
            }
        }
        .ivu-form-item{
            margin-bottom:18px;
        }
        .icon-tip{
            display:inline-block;
            width:16px;
            height:16px;
            background:url(img/q1.svg) no-repeat center;
            background-size: 100%;
            margin-top: 8px;
        }
        .ivu-tooltip-inner{
            white-space: normal;
        }
                    
    }
</style>
