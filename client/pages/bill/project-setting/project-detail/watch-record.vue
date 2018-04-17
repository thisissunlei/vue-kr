<template>
    <div class="watch-record">
        <Form ref="params" :model="params" >
            <Form-item label="" class='daily-form'>
                <DatePicker 
                    v-model="params.orderNum" 
                    placeholder="开始日期"
                    style="width: 120px"
                />
            </Form-item>
            <span style="padding:0px 10px;display:inline-block;line-height:32px;">至</span>
            <Form-item label="" class='daily-form'>
                <DatePicker 
                    v-model="params.orderNum" 
                    placeholder="结束日期"
                    style="width: 120px"
                />
            </Form-item>
            <Form-item label="" class='daily-form' style="padding:0px 20px;">
                <i-input 
                    v-model="params.customerName" 
                    placeholder="编辑人姓名"
                    style="width: 150px"
                />
            </Form-item>
            <Button style="float:right;" type="primary" @click="seachClick">搜索</Button>
        </Form>
        <Table :columns="columns" :data="watchRecord"></Table>
        <div style="margin: 10px;overflow: hidden">
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
        <!-- <div class='m-watch-record' style="max-height: 400px;overflow-y: scroll;">
             <ul
               class='record-wrap'
               v-for="item in watchRecord" 
               :key="item.uTime"
             >
                 <li class='first'>{{item.uTime|dateFormat('MM-dd HH:mm')}}</li>
                 <li class='second'>
                        <div class='seconds'>
                            <span style="padding-right: 10px;">{{item.updator}}</span>
                            <span>{{item.comment}}</span>
                        </div>
                        <div class='thirds' style="font-weight:500">
                            {{item.detail}}
                        </div>
                 </li>
             </ul>
        </div> -->
    </div>
</template>


<script>
import dateUtils from 'vue-dateutils';
export default {
    props:{
        watchRecord:Array,
        default:[],
        id:{
            type:[String,Number],

        }
    },
    data(){
        return{
            totalCount:0,
            pageSize:15,
            page:1,
            params:{
                page:1,
                pageSize:10,
                customerName:'',
                orderNum:'',
                customerName:''

            },
            formItem:{
                orderNum:'',
                customerName:''
            },
            columns:[
                {
                    title:'编辑时间',
                    key:'uTime',
                    align:'center',
                    width:120,
                    render(h, obj){
                        if(!obj.row.uTime){
                            return '-'
                        }
                        let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.uTime));
                        return time;
                    }
                },
                {
                    title:'编辑人',
                    key:'updator',
                    align:'center',
                    width:80
                },
                {
                    title:'编辑动作',
                    align:'center',
                    key:'comment'
                },
                {
                    title:'操作描述',
                    align:'center',
                    key:'detail'
                }
                
            ]
        }
    },
    methods:{
        changePage(){
              //页面发生改变
            // this.tabParams.page=page;
            // this.page=page;
            // this.getTableData(this.tabParams);
          
        },
        seachClick(){
            this.$emit('searchClick',this.params)
        }
        // getWatchData(){

        //     this.$http.get('watch-edit-record',{id:id}).then((response)=>{
        //         this.watchRecord=response.data.items;
        //     }).catch((error)=>{
        //         this.$Notice.error({
        //            title: error.message,
        //         });
        //     })
        // },  
    }
}
</script>

<style lang="less" scoped>
    .watch-record{
        .daily-form{
            display: inline-block;
        }
    }
</style>
