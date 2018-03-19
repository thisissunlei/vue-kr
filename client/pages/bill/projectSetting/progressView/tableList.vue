<template>
  <div>
        <div class='view-table-list'>
            <p>项目名称</p>
            <p>社区名称</p>
            <p>城市</p>
        </div>
        <ul class='view-table-detail'>
            <li
                v-for="item in listData"
                :key="item.name"
                :data-box-id="item.tId"
            >
                <p @click="rowClick(item)">{{item.name}}</p>
                <p>{{item.communityName}}</p>
                <p>{{item.city}}</p>
            </li>
        </ul> 
  </div>
</template>


<script>

export default {
    props:{
       listData:{
           type:Array
       }
    },
    data(){
        return{
            
        }
    },
    methods:{
        rowClick(item){
            this.$emit('rowClick',item);
        }
    }
}
</script>

<style lang="less" scoped>
    .view-table-list{
        width:100%;
        height:50px;
        line-height:50px;
        border: 1px solid #E1E6EB;
        border-right:none;
        border-top: none;
        border-left:none;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #666666;
        font-weight: 500;
        p{
           display:inline-block;
           border-right:1px solid #E1E6EB;
           width:33%;
           text-align: center;
           &:nth-child(3){
               border-right:none;
           }
        }
    }
    .view-table-detail{
        width:100%;
        li{
           width:100%;
           height:50px;
           border: 1px solid #E1E6EB;
           border-right:none;
           border-left:none;
           display:table;    
           &:nth-child(2n+1){
              background: #F5F6FA;
           }
           &:last-child{
              border-bottom: 2px solid #E1E6EB;
           }
           p{
                display:inline-block;
                border-right:1px solid #E1E6EB;
                width:33%;
                padding:10px;
                height:100%;
                display:table-cell;
                vertical-align:middle;
                word-break:break-all;    
                text-align: center;
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                color: #666666;
                line-height: 16px;
                font-weight: 500;
                &:nth-child(3){
                    border-right:none;
                }
                &:nth-child(1){
                    cursor: pointer;
                }
            }
        }
    }
</style>
