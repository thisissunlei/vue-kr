<template>
    <div>
        <div>
            <Select 
               v-model="formItem.floor" 
               style="width:100px;margin-right:15px;" 
               placeholder="全部楼层"
               clearable
            >
                <Option v-for="item in floorList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
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
        <div style="margin-top:20px;height:500px;overflow:auto;">
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
import dateUtils from 'vue-dateutils';
export default {
    props:{
        floors:{
            type:Array,
            default:()=>[]
        },
        originStationList:{
            type:Array,
            default:()=>[]
        },
        params:{
            type:Object,
            default:{}
        },
    }, 
    components:{
       Loading
    },
    data() {
        return{
            floorList:[],
            floorStr:'',
            formItem:{
                page:1,
                pageSize:100,
                floor:' ',
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
                    key: 'cellName',
                    align:'center' 
                },
                {
                    title: '商品类型',
                    key: 'goosTypeName',
                    align:'center' 
                },
                {
                    title: '工位数量',
                    key: 'capacity',
                    align:'center' 
                },
                {
                    title: '商品属性',
                    key: 'attrString',
                    align:'center' 
                },
                {
                    title: '商品定价',
                    key: 'seatPrice',
                    align:'center' 
                },
                {
                    title: '可租时段',
                    key: 'startDate',
                    align:'center',
                    render(tag, params){
                      let end=params.row.endDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.endDate)):'不限';
                      return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate))+'至'+end;
                    } 
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
        this.floorList=[].concat(this.floors);
        let len=this.floorList.length;
        if(len&&len>1){
            this.floorList.unshift({label:'全部楼层',value:' '});
            this.formItem.floor=this.floorList[1].value;
        }else if(len&&len<=1){
            this.formItem.floor=this.floorList[0].value;
        }
        let params=Object.assign({},this.params,this.formItem);
        this.getListData(params);
        this.$watch('formItem',this.itemChangeHandler,{ deep: true })
     },
     methods:{
       itemChangeHandler(val){
            if(!this.formItem.floor){
               this.formItem.floor=this.params.floor;
            }
            let params=Object.assign({},this.params,this.formItem);
            this.getListData(params);
       },
       getListData(params){
           this.loading=true;
           this.$http.get('downOrderGoodsList',params).then((response)=>{
                this.attractData=response.data;   
                let len=this.originStationList.length;
                if(len){
                   this.originStationList.map((item)=>{
                       this.attractData.length&&this.attractData.map((value)=>{
                           if(item.id==value.id){
                               value.$set(item,'checked',true);
                           }else{
                               value.$set(item,'checked',false);
                           }
                       })
                   }) 
                }          
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
