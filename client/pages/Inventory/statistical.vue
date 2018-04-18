<template>
    <div>
       <Table border :columns="columnsInner" :data="data"></Table>
    </div>
</template>

<script>
export default {
    props:{
       data:{
           type:Array,
           default:[]
       }
    },
    data() {
        return{
           columnsInner:[
                    {
                        title: '类型',
                        key: 'orderNum',
                        align:'center'
                    },
                    {
                        title: '可租个数',
                        key: 'customerName',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '全部个数',
                        key: 'communityName',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '可租工位',
                        key: 'rentAmount',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '全部工位',
                        key: 'depositAmount',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    }
                ]
        }
    }
}
</script>

<style lang='less'>
     
</style>
