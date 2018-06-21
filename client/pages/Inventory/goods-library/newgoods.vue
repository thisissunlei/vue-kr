 <template>         
     <Form ref="formItem" :model="formItem" style="text-align:center"  :rules="ruleInvestment"  label-position="top">

            
                  <Form-item label="所在楼层" style="text-align:left" class='daily-form'> 
                        <Select 
                            v-model="formItem.floor" 
                            placeholder="所在楼层" 
                            style="width: 200px"
                            clearable
                        >
                            <Option v-for="item in floorList" :value="item.floor" :key="item.floor">{{ item.floorName }}</Option>
                        </Select> 
                    </Form-item>

                    <Form-item label="商品名称" style="text-align:left"  class='daily-form' prop="name" >
                            <i-input 
                                v-model="formItem.name" 
                                placeholder="请输入商品名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                     </Form-item>

                    <Form-item label="商品类型" style="text-align:left"  class='daily-form'> 
                          <Select 
                            v-model="formItem.goodsType" 
                            placeholder="请输入商品类型" 
                            style="width: 200px;"
                            clearable
                        >
                            <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select> 
                    </Form-item>

                    <Form-item v-if="formItem.goodsType=='SPACE'" style="text-align:left"  prop="capacity" label="工位数" class='daily-form'> 
                            <i-input 
                                v-model="formItem.capacity" 
                               placeholder="请输入工位数" 
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />	
                    </Form-item>

                     <Form-item label="面积" class='daily-form' style="text-align:left;padding-left:10px;margin-left:-10px;"  prop="area" > 
                            <i-input 
                                v-model="formItem.area" 
                                style="width: 200px;"
                                placeholder="请输入面积"
                                @keyup.enter.native="onKeyEnter($event)"
                            />	
                     </Form-item>

                      <Form-item v-if="formItem.goodsType=='SPACE'" style="text-align:left"   label="方位" class='daily-form'>     
                        <Select 
                            v-model="formItem.locationType" 
                            style="width: 200px;"
                            clearable
                        >
                            <Option v-for="item in locationTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select> 
                     </Form-item>

                     <Form-item v-if="formItem.goodsType=='SPACE'"  style="text-align:left"  label="是否套间" class='daily-form'>     
                                    <Select 
                                    v-model="formItem.suiteType" 
                                    style="width: 200px;"
                                    clearable
                                >
                                    <Option v-for="item in locationList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                     </Form-item>

                      <Form-item label="商品定价"  prop="quotedPrice" style="text-align:left"  class='daily-form'>
                            <i-input 
                                v-model="formItem.quotedPrice" 
                                style="width: 200px;"
                                 placeholder="请输入定价"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                      </Form-item>
                        <Form-item label="补充描述" prop="descr"  style="text-align:left"  class='daily-form'>
                            
                            <Input
                                 type="textarea"
                                v-model="formItem.descr" 
                                style="width: 200px"
                                placeholder="请输入描述"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                      </Form-item>
 
               
                 

    
    </Form>   
</template>
<script>
import dateUtils from 'vue-dateutils';
    export default{
         name:'HeighSearch',
        props: {
             data:{
                 type:Array,
                 default:()=>[],   
             },
             newgooddata:{
                 type:Array,
                 default:()=>[],   
             },
             floorList:{
                 type:Array,
                 default:()=>[],
             },
             seacchValue:{
                  type:Object,
                 default:{},
             }
        },
        data (){
           //商品名称
            const validateName = (rule, value, callback) => {
                if(value&&value.length>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            //面积
             const validarea = (rule, value, callback) => {
               var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>999){
                    callback('最大999面积');
                }else{
                    callback();
                }
                  };
                      //商品定价
            const validateOrder = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else{
                    callback();
                }
            };
            //工位数
            const validateStation = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>999){
                    callback('最大999个工位');
                }else{
                    callback();
                }
            };

            return{
                 enmuKey:'',
                formItem:
                        {   
                            floor:this.floorValue,//所在楼层
                            name:'',//商品名称
                            goodsType:' ',//商品类型
                            capacity:'',//工位数
                            area:'',//面积
                            locationType:' ',//方位
                            suiteType:'',//套间
                            quotedPrice:'',//商品定价
                            descr:'',//补充描述
                        
                        },
                // floorList:[],//所在楼层list
                 productList:[//商品类型list
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                 locationList:[//是否套间list
                    //  {value:'SUITE',label:'有套间'},
                    // {value:'UNSUITE',label:'无套间'},
                    // {value:'UNKNO',label:'有2套间'},
                    // {value:'UNKNOWN',label:'未知'},
                ],
                locationTypeList:[

                    {value:' ',label:'全部方位'},
                    {value:'OUTSIDE_SPACE',label:'外侧间'},
                    {value:'INSIDE_SPACE',label:'内侧间'},
                    {value:'UNKNOWN',label:'未知'}
                ],
                
            ruleInvestment: {
                    name:[
                        { validator: validateName, trigger: 'change' }
                    ],
                     area: [
                        { validator: validarea, trigger: 'change' }
                    ],
                    quotedPrice: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    descr: [
                        { validator: validateName, trigger: 'change' }
                    ],
                    capacity: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    
                         }
            }
        },
        mounted(){
        console.log('sss',this.seacchValue)
        this.getSelectData();
        // console.log('eeeeeeeeeeeee',this.floorList)
     
                },
        watch:{

            

        },
        updated(){
            this.$emit('newdateForm',this.formItem);
        },
        methods:{


                  //枚举 
        getSelectData(){
            this.$http.get('get-enum-all-data',{
                enmuKey:'com.krspace.op.api.enums.community.SpaceSuiteType'
            }).then((response)=>{
               this.locationList=response.data;
               console.log('<------------->',this.locationList)
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },

        //回车          
        onKeyEnter(){
            this.searchClick();
        },



            
        }
    }
</script>

<style lang='less'>
   .daily-form{
                display:inline-block;
                margin-right:20px;
               
            }
</style>  