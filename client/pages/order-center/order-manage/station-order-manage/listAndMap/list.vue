<template>
    <div>
        <div>
            <Select 
               v-model="formItem.floor" 
               style="width:100px;margin-right:15px;" 
               placeholder="全部楼层"
               clearable
            >
                <Option v-for="item in floors" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
            <Select 
                v-model="formItem.goodsType" 
                placeholder="请输入商品类型" 
                style="width:100px;margin-right:15px;"
                clearable
            >
                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            <Select 
                v-model="formItem.locationType" 
                placeholder="请输入方位"
                style="width:100px;margin-right:15px;"
                clearable
            >
                 <Option v-for="item in locationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            <Select 
                v-model="formItem.suiteType" 
                placeholder="请输入套间"
                style="width:100px;"
                clearable
            >
                <Option v-for="item in suiteTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div style="margin-top:20px;">
            <Table :loading="loading" stripe  :columns="attractColumns" :data="attractData" border @on-selection-change="tableChange">
                <div slot="loading">
                    <Loading/>
                </div>
            </Table>
        </div>
    </div>
</template>

<script>
import Loading from '~/components/Loading';
export default {
    props:{
        floors:{
            type:Array,
            default:()=>[]
        },
        originStationList:{
            type:Array,
            default:()=>[]
        }
    }, 
    components:{
       Loading
    },
    data() {
        return{
            formItem:{
                page:1,
                pageSize:100,
                floor:this.floors.length?this.floors[0].value:'',
                goodsType:' ',
                locationType:' ',
                suiteType:' '
            },
            attractColumns:[
                {
                    type:'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品',
                    key: 'code',
                    align:'center' 
                },
                {
                    title: '商品类型',
                    key: 'spaceType',
                    align:'center' 
                },
                {
                    title: '工位数量',
                    key: 'code',
                    align:'center' 
                },
                {
                    title: '商品属性',
                    key: 'code',
                    align:'center' 
                },
                {
                    title: '商品定价',
                    key: 'code',
                    align:'center' 
                },
                {
                    title: '可租时段',
                    key: 'code',
                    align:'center' 
                },
            ],
            attractData:[],
            loading:false,
            productList:[
                {value:' ',label:'全部类型'},
                {value:'OPEN',label:'固定办公桌'},
                {value:'SPACE',label:'独立办公室'},
                {value:'MOVE',label:'移动办公桌'}
            ],
            locationList:[
                {value:' ',label:'全部方位'},
                {value:'OUTSIDE_SPACE',label:'外侧间'},
                {value:'INSIDE_SPACE',label:'内侧间'},
                {value:'UNKNOWN',label:'未知'}
            ],
            suiteTypeList:[
                {value:' ',label:'套间情况'},
                {value:'SUITE',label:'有套间'},
                {value:'UNSUITE',label:'无套间'}
            ]
        }
     },
     mounted(){
        let len=this.originStationList.length;
        if(len){
          
        }
        console.log('map',this.originStationList);
        //this.getListData(this.formItem);
        this.$watch('formItem',this.itemChangeHandler,{ deep: true })
     },
     methods:{
       itemChangeHandler(val){
            this.getListData(this.formItem);
       },
       getListData(params){
           this.loading=true;
           this.$http.get('join-bill-list',params).then((response)=>{
                this.attractData=response.data.items;             
                this.loading=false;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
       },
       tableChange(params){
         this.$emit('on-result-change',params);
       }
    }
}
</script>

<style lang='less' scoped>
     
</style>
