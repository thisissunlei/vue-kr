<template>
    <div class="watch-record">
         
        <Form ref="params" :model="params" >
            <Form-item label="" class='daily-form'>
                <DatePicker 
                    v-model="params.startTime" 
                    placeholder="开始日期"
                    style="width: 120px"
                />
            </Form-item>
            <span style="padding:0px 10px;display:inline-block;line-height:32px;">至</span>
            <Form-item label="" class='daily-form'>
                <DatePicker 
                    v-model="params.endTime" 
                    placeholder="结束日期"
                    style="width: 120px"
                />
            </Form-item>

            <Form-item label="" class='daily-form' style="padding:0px 20px;">
                <SelectSaler :clearable="true" :onchange="changeSaler" value="编辑人姓名" name="formItem.updator" ></SelectSaler>
            </Form-item>
            <Button style="float:right;" type="primary" @click="seachClick">搜索</Button>
        </Form>
        <Table :columns="columns" :data="watchRecord"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page 
                    v-if="watchRecord && watchRecord.length"
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
</template>


<script>
import dateUtils from 'vue-dateutils';
import SelectSaler from '~/components/SelectSaler.vue'
import publicFn from '../publicFn';
export default {
    components:{
        SelectSaler
    },
    props:{
        watchRecord:Array,
        default:[],
        id:{
            type:[String,Number],

        },
        watchTotalCount:{
            type:[String,Number],
            default:1,
        },
        watchPage:{
            type:[String,Number],
            default:1,
        }
    },
    data(){
        return{
            totalCount:this.watchTotalCount,
            pageSize:15,
            page:1,
            params:{
                startTime:'',
                updator:'',
                page:this.watchPage,
                id:this.id,
                pageSize:10,
                totalPages:this.watchTotalCount,

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
    watch:{
        watchTotalCount:function(){
            this.totalCount = this.watchTotalCount;
        }
    },

    methods:{
        changePage(page){
            // 页面发生改变
            this.params.page=page;
            this.page=page;
            var data = Object.assign({},this.params);
            data.startTime = publicFn.timeToStr(data.startTime);
            data.endTime = publicFn.timeToStr(data.endTime);
            
            this.$emit('searchClick',data)
          
        },
        seachClick(){
            
            var data = Object.assign({},this.params);
            data.startTime = publicFn.timeToStr(data.startTime);
            data.endTime = publicFn.timeToStr(data.endTime);
            // console.log(data,"pppp")
            // return;
            this.$emit('searchClick',data)
        },
     
        changeSaler(value){
                // 销售员
            this.params.updator = value;
        },
       
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
