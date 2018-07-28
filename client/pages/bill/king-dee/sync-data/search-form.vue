<template>
    <div class='king'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleDaily" label-position="left">
                      <div style="padding: 30px 10px 10px 20px;background:#fff;margin-top:20px;">
                          
                            <Button type="primary"  @click="createSync" style="">新增同步</Button>

                            <!-- 开始时间 -->
                             <Form-item  class='priceForm' prop="startTime">
                                <DatePicker 
                                    v-model="formItem.startTime" 
                                    placeholder="请输入开始日期"
                                    style="width: 136px"
                                />
                            </Form-item>

                              <!-- 结束时间 -->
                            <Form-item  class='priceForm' prop="endTime">
                                <DatePicker 
                                    v-model="formItem.endTime" 
                                    placeholder="请输入结束日期"
                                    style="width: 136px"
                                />
                            </Form-item>
                            
                            <!-- 应收回款 -->
                              <Form-item  class='priceForm'>
                                    <Select 
                                            v-model="formItem.syncDataType" 
                                            placeholder="应收回款类型" 
                                            style="width: 136px; height: 30px;"
                                            clearable
                                        >
                                            <Option v-for="item in syncDataType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select> 
                            </Form-item>

                                 <!-- 状态过滤 -->
                                  <Form-item  class='priceForm'>
                                    <Select 
                                            v-model="formItem.syncStatus" 
                                            placeholder="状态过滤" 
                                            style="width: 136px; height: 30px;"
                                            clearable
                                        >
                                            <Option v-for="item in syncStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                </Form-item>

                               <!-- 类型过滤 -->
                             <Form-item  class='priceForm'>
                                    <Select 
                                            v-model="formItem.syncType" 
                                            placeholder="类型过滤" 
                                            style="width: 136px; height: 30px;"
                                            clearable
                                        >
                                            <Option v-for="item in syncType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                </Form-item>

                               <Button type="primary" @click="searchClick" style="margin-left:30px;">搜索</Button>

                      </div>
            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
//import publicFn from '../Inventory/publicFn';
import utils from '~/plugins/utils';
import SelectSaler from '~/components/SelectSaler.vue';
var oldFloor='';
export default {
    props:{
       identify:{
           type:String,
           default:''
       }, 
       floorValue:{
                 type:[String,Number]
             }
    },
    components:{
       SelectSaler
    },
    data() {
            // 教验日期
            const validateDate = (rule, value, callback) => {
                if (this.formItem.startTime&&this.formItem.endTime&&this.formItem.startTime>this.formItem.endTime) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            return { 
                loading:false, 
                formItem:{
                    syncDataType:' ',
                    syncStatus:' ',
                    syncType:' ',
                    startTime:'',
                    endTime:'',
               },
                syncDataType:[
                    {value:' ',label:'全部'},
                    {value:'INCOME',label:'应收'},
                    {value:'PAYMENT',label:'回款'},
                ],
                syncStatus:[
                    {value:' ',label:'全部'},
                    {value:'ALREADY_SYNC',label:'已经同步'},
                    {value:'NOT_SYNC',label:'未同步'},
                ],
                syncType:[
                        {value:' ',label:'全部'},
                        {value:'AUTO',label:'定时'},
                        {value:'Manual',label:'手动'},
                ],
                formItemOld:{},
                ruleDaily: {
                    startTime: [
                        { validator: validateDate, trigger: 'change' }
                    ],
                    endTime: [
                        { validator: validateDate, trigger: 'change' }
                    ]
                },
                num:0
            }
    },
    mounted(){
         this.$emit('searchClick',this.formItem);
    },
    methods:{
        //社区接口
        getCommunityList(id){
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=[].concat(res.data);
                this.formItem.communityId=res.data.length?res.data[0].id:'';
                if(this.num==0){
                
                    this.formItemOld=Object.assign({},this.formItem);
                }  
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
               // this.formItem.cityId=res.data.length?res.data[0].cityId:'';      
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
                var len=res.data.length;
                if(len){
                    if(len>1){
                        this.floorList.unshift({floor:' ',floorName:"全部楼层"}) 
                    }
                    var floor=this.floorList[0].floor;
                    this.formItem.floor=floor; 

                    if(oldFloor==floor){
                        this.floorChange(floor);
                    }
                    oldFloor=floor; 
                    // this.$emit('initData',this.formItem,res.data);
                      this.$emit('initData',this.formItem,this.floorList);
                }
                
                this.$emit('getFloor',this.floorList);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //搜索
        searchClick(){
            this.$refs['formItemInvestment'].validate((valid) => {
                if (valid) {
                    let newData = Object.assign({},this.formItem);
                    newData.endTime = newData.endTime ? dateUtils.dateToStr("YYYY-MM-DD",new Date(newData.endTime)):'';
                    newData.startTime = newData.startTime ? dateUtils.dateToStr("YYYY-MM-DD",new Date(newData.startTime)):'';
                    console.log('form--11',newData);

                    this.$emit('searchClick',newData);
       
                }
            })
            
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.formItem.investmentStatus=[];

                    this.$emit('clearClick',this.formItem);

    
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //城市change事件
        cityChange(param){
            this.getCommunityList(param)
        },
        //社区change事件
        communityChange(param){
          
            this.getFloorList(param);
        },
        floorChange(param){
             this.num++;

                this.$refs['formItemInvestment'].validate((valid) => {
                if (valid) {
                    console.log('搜索',this.formItem)
                    this.$emit('cityFloor',this.formItem);
                }
            })
           
        },
        //新增同步
        createSync(){
            this.$emit('createSync')
        }
    }
}
</script>

<style lang='less' >
     .king{
         .community-header{
             background: #f5f7f9;
            //padding: 30px 10px 10px 20px;
            .ivu-form .ivu-form-item-label{
                color:#333;
                font-weight: 500;
            }
            .daily-form{
                display:inline-block;
                margin-right:20px;
                .ivu-form-item-content{
                    display:inline-block;
                }
            }
            .community-form{
                vertical-align: middle;
                margin-bottom:0px;
                .king-sync{
                    display: inline-block;
                    
                    width: 1440px;
                    height: 1024px;
                     background-color: rgba(255, 255, 255, 1);

                }
                .ivu-select-dropdown{
                    min-width:100px;
                    width:auto !important;
                    left:auto !important;
                }
            }
            .priceForm{
                display:inline-block;
                margin: 0 0 0 30px;
            }
            .attract-font{
                font-weight:bold;
                display:inline-block;
                margin-right:12px;
            }
            .attract-line{
                display:inline-block;
                margin:0 4px 0 5px;
                padding-top: 6px;
            }
            .tip-pic{
                display:inline-block;
                width: 16px;
                height: 16px;
                //background: url(img/q1.svg) no-repeat center;
                background-size: 100%;
                vertical-align: middle;
                margin-right:5px;
                margin-top: -2px;
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:150px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
        }
     }
</style>
