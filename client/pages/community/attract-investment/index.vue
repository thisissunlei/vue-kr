<template>
    <div class="attract-investment">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
            />
        </div>
        <Table :columns="attractColumns" :data="attractData" border/>

        <Message 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onMessageChange"
        />
    </div>
</template>

<script>
import SearchForm from '../publicPage';
import Message from '~/components/Message';
export default {
    components:{
       SearchForm,
       Message
    },
    data() {
        return{
            warn:'',
            MessageType:'',
            openMessage:false,
            attractColumns:[
                {
                    title: '商品名称',
                    key: 'orderNum',
                    width:150,
                    align:'center',
                    fixed: 'left'
                },
                {
                    title: '商品类型',
                    key: 'customerName',
                    align:'center',
                    width:150,
                    fixed: 'left'
                },
                {
                    title: '工位数量',
                    key: 'communityName',
                    align:'center',
                    width:100,
                    fixed: 'left'
                },
                {
                    title: '商品定价',
                    key: 'orderNum',
                    align:'center'
                },
                {
                    title: '招商状态',
                    key: 'customerName',
                    align:'center'
                },
                {
                    title: '签约价',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                    }, item.currentTask?item.currentTask:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '折扣',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class: publicFn.getDivClass(index,obj),
                                        },
                                    }, item.currentTask?`${item.currentTask}`:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '合同开始',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class: publicFn.getDivClass(index,obj),
                                        },
                                    }, item.currentTask?`${item.currentTask}`:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '合同结束',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class: publicFn.getDivClass(index,obj),
                                        },
                                    }, item.currentTask?`${item.currentTask}`:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '租期',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class: publicFn.getDivClass(index,obj),
                                        },
                                    }, item.currentTask?`${item.currentTask}`:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '渠道来源',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class: publicFn.getDivClass(index,obj),
                                        },
                                    }, item.currentTask?`${item.currentTask}`:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                },
                {
                    title: '销售员',
                    key: 'communityName',
                    align:'center',
                    render(h,obj){
                        var row='';
                        if(obj.row.tasks){
                            row=obj.row.tasks.map((item,index)=>{
                                return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: item.currentTask
                                        }
                                    }, [
                                    h('div', {
                                        attrs: {
                                            class: publicFn.getDivClass(index,obj),
                                        },
                                    }, item.currentTask?`${item.currentTask}`:'-')
                                ])
                              ])
                            })
                            return row
                        }
                    }
                }
            ],
            attractData:[]    
        }
    },
    methods:{
      getListData(params){
           this.$http.get('join-bill-list', params).then((response)=>{
                this.totalCount=response.data.totalCount;
                this.attractData=response.data.items;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
      },
      searchClick(params){
         this.getListData(params); 
      },
      clearClick(params){
         this.getListData(params); 
      },
      onMessageChange(data){
        this.openMessage=data;
      }
    }
}
</script>

<style lang='less' scoped>
     .attract-investment{
         .attract-search{
             border-bottom:solid 1px #dddee1;
             margin-bottom:20px;
         }
     }
</style>
