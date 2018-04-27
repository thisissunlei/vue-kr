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
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '未租个数',
                        key: 'availableSpaces',
                        align:'center',
                        width:90,
                        render(tag,params){ 
                          var ren=params.row.availableSpaces?params.row.availableSpaces:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '全部个数',
                        key: 'totalSpaces',
                        align:'center',
                        width:90,
                        render(tag,params){ 
                          var ren=params.row.totalSpaces?params.row.totalSpaces:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '未租工位',
                        key: 'availableStations',
                        align:'center',
                        width:90,
                        render(tag,params){ 
                          var ren=params.row.availableStations?params.row.availableStations:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '全部工位',
                        key: 'totalStations',
                        align:'center',
                        width:90,
                        render(tag,params){ 
                          var ren=params.row.totalStations?params.row.totalStations:'-';                  
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
