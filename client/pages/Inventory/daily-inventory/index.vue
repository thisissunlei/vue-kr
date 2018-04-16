<template>
  <div class="daily-inventory"> 
    <div class='daily-header'>
           <Form ref="formItem" :model="formItem" label-position="left">
                <Form-item label="库存日期" class='daily-form'>
                    <DatePicker 
                        v-model="formItem.orderNum" 
                        placeholder="请输入库存日期"
                        style="width: 200px"
                    />
                </Form-item>
                <Form-item label="商品名称" class='daily-form'>
                    <i-input 
                        v-model="formItem.customerName" 
                        placeholder="请输入商品名称"
                        style="width: 200px"
                    />
                </Form-item>
                <Form-item label="库存状态" class='daily-form'> 
                    <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入库存状态" 
                        style="width: 200px"
                        multiple
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
                <Form-item label="社区" class='daily-form' style="width:400px">
                    <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入城市" 
                        style="width: 100px;margin-right:10px;"
                        clearable
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select>
                   <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入社区" 
                        style="width: 100px;margin-right:10px;"
                        clearable
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select>
                   <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入楼层" 
                        style="width: 100px"
                        clearable
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="工位数量" class='daily-form' style="margin-right:30px;">
                    <i-input 
                        v-model="formItem.customerName" 
                        style="width: 100px"
                    />
                    <span style="display:inline-block;margin:0 5px;">至</span>
                    <i-input 
                        v-model="formItem.customerName" 
                        style="width: 100px"
                    />
                </Form-item>
                <Form-item label="商品类型" class='daily-form'> 
                    <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入商品类型" 
                        style="width: 200px"
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
                <Form-item label="价格" class='daily-form' style="width:400px;margin-right:10px;"> 
                    <Select 
                        v-model="formItem.communityId" 
                        style="width: 100px;margin-right:10px;"
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                   <i-input 
                        v-model="formItem.customerName" 
                        style="width: 100px"
                    />
                    <span style="display:inline-block;margin:0 5px;">至</span>
                    <i-input 
                        v-model="formItem.customerName" 
                        style="width: 100px"
                    />
                </Form-item>
                <Form-item label="面积" class='daily-form'>
                    <i-input 
                        v-model="formItem.customerName" 
                        style="width: 100px"
                    />
                    <span style="display:inline-block;margin:0 5px;">至</span>
                    <i-input 
                        v-model="formItem.customerName" 
                        style="width: 100px"
                    />
                </Form-item>
                <Form-item label="商品属性" class='daily-form'> 
                    <Select 
                        v-model="formItem.communityId" 
                        style="width: 100px;margin-right:10px;"
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                   <Select 
                        v-model="formItem.communityId" 
                        style="width: 100px"
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
         </Form>
         <div style="display:inline-block;">
              <Button type="primary">搜索</Button>
              <Button type="ghost" style="margin-left:8px">清除</Button>
         </div>
    </div>
    
    <div class='daily-tab'>
        <div class='tab-select'>
            <RadioGroup v-model="formItem.focus">
                <Radio label="1">原价</Radio>
                <Radio label="0">折扣</Radio>
            </RadioGroup>
            <Select 
                v-model="formItem.communityId" 
                style="width: 100px"
                clearable
            >
                <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <Tabs value="dailyList" :animated="false" @on-click="tabsClick">
                <Tab-pane label="以列表方式展示" name="dailyList">   
                     <div class="u-table">
                        <Table border :columns="columns" :data="dailyData"></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page 
                                    :current="tabParams.page"
                                    :total="totalCount"
                                    :page-size="tabParams.pageSize" 
                                    show-total 
                                    show-elevator
                                    @on-change="changePage"
                                ></Page>
                            </div>
                        </div>
                    </div>
                </Tab-pane>

                <Tab-pane label="以时间轴方式展示" name="dailyTime">
                    
                </Tab-pane>
        </Tabs> 
    </div>

    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onMessageChange"
    />

  </div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import KrField from '~/components/KrField';

    export default {
        name: 'Daily',
        components:{
            Message,
            KrField,
        },
        data () {
            return {   
                warn:'',
                MessageType:'',
                openMessage:false,

                tabParams:{
                    page:1,
                    pageSize:1000,
                    customerName:''
                },
                formItem:{

                },
                totalCount:0,

                dailyData:[],
                columns: [
                    {
                        title: '商品',
                        key: 'id',
                        align:'center'
                    },
                    {
                        title: '商品类型',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '商品属性',
                        key: 'city',
                        align:'center'
                    },
                    {
                        title: '面积',
                        key: 'plannedPeriod',
                        align:'center'
                    },
                    {
                        title: '工位单价',
                        key: 'plannedPeriod',
                        align:'center'
                    },
                    {
                        title: '工位数量',
                        key: 'cTime',
                        align:'center'
                    },
                    {
                        title: '商品总价',
                        key: 'cTime',
                        align:'center'
                    },
                    {
                        title: '当日库存',
                        key: 'cTime',
                        align:'center'
                    },
                    {
                        title: '签约价',
                        key: 'cTime',
                        align:'center'
                    },
                    {
                        title: '最近可租起始日',
                        key: 'cTime',
                        align:'center'
                    },
                    {
                        title: '最近可租结束日',
                        key: 'cTime',
                        align:'center'
                    }
                ]    
            }
        },
        mounted(){
            this.getTableData(this.tabParams);
        },
        methods:{
            //获取列表数据
            getTableData(params){
                this.$http.get('project-archives-list', params).then((res)=>{
                    this.dailyData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })
                
            },
            //信息提示框
            onMessageChange(data){
                this.openMessage=data;
            },
            //页面发生改变
            changePage(page){
                this.tabParams.page=page;
                this.getTableData(this.tabParams);
            }
        }
    }
</script>

<style lang="less">
.daily-inventory{
    .daily-header{
        padding: 30px 20px 10px 20px;
        .ivu-form .ivu-form-item-label{
            color:#333;
            font-weight: 500;
        }
        .daily-form{
            width:300px;
            display:inline-block;
        }
    }
    .daily-tab{
        position: relative;
        padding: 0 20px;
        .tab-select{
            position: absolute;
            right:50px;
        }
        .u-table{
            .ivu-table-tbody{
                .ivu-table-tbody{
                    tr:nth-child(2n+1){
                        background:#f6f6f6
                    }
                }
            }
        }
    }
}

</style>
