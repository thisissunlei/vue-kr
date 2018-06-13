 <template>         
            <Form ref="formItem" :model="formItem"  :rules="ruleDaily"  label-position="left" class="goods-status">
                <div class="coloname"><span>您选择了以下</span><span style="color:red;">{{num}}</span><span>个商品:</span></div>
                <Form-item label="独立办公室:" style="margin-top:20px; word-wrap:break-word;" v-if="independentOfficeStr.length">
                    <span
                      v-for="(item,index) in independentOfficeStr"
                      :key="item.id"
                    >
                      <span v-if="index!=0">,</span><span :style="'color:'+item.color">{{item.code}}</span>
                    </span>
                </Form-item>
                
                <Form-item  label="固定办公桌:"  style="margin-top:20px; word-wrap:break-word;margin-right:20px;" v-if="fixedLocationStr.length">
                    <span
                      v-for="(item,index) in fixedLocationStr"
                      :key="item.id"
                    >
                      <span v-if="index!=0">,</span><span :style="'color:'+item.color">{{item.code}}</span>
                    </span>
                </Form-item>
            
                <Form-item label="选择库存日期:" style="margin-top:20px;">
                    <Form-item prop="startDate" style=‘display:inline-block;float:left;margin-left:2px;’>
                    <DatePicker 
                        v-model="formItem.startDate"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 180px"
                    />
                    </Form-item>
                   <span class="u-date-txt" style="float:left;">至</span>
                   <Form-item prop="endDate" style=‘display:inline-block;float:left;’>
                    <DatePicker 
                        v-model="formItem.endDate"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 180px"
                    />
                     </Form-item>
                    <div style="color:red;" v-show="dateError">开始日期不能大于结束日期</div>  
             </Form-item>
             <Form-item label="修改为:"  style="margin-top:20px;">
                    <RadioGroup v-model="formItem.goodsStatus" style="margin-left:45px;"  >
                        <Radio label="ON" >
                           启用
                        </Radio>
                        <Radio label="DISABLE">
                           不可用
                        </Radio>
                        <Radio label="OFF">
                            下架
                        </Radio>
                    </RadioGroup> 
                   <div   v-if="formItem.goodsStatus=='DISABLE'&&!errorData.length" style="margin-left:110px;display:inline-block;margin-right:47px;">不可用的商品<span style="color:red;">显示</span>在平面图上，显<span style="color:red;">计入</span>出租率统计</div>
                   <div   v-if="formItem.goodsStatus=='OFF'&&!errorData.length" style="margin-left:110px;display:inline-block;margin-right:47px;">不可用的商品<span style="color:red;">不显示</span>在平面图上，显<span style="color:red;">不计入</span>出租率统计</div>
                   <div    v-if="errorData.length" style="margin-left:110px;display:inline-block;margin-right:47px;"><span style="color:red;">部分商品该时段有合同，不能设为下架或不可用</span></div>

             </Form-item>
             <Form-item label="修改原因:"  style="margin-top:20px;">
               <Input 
                 v-model="formItem.remark"  
                 style="width:400px;margin-left:35px;" 
                 type="textarea" 
                 :autosize="{minRows:2,maxRows:2}" 
                 :maxlength="maxLength"
                 placeholder="请输入修改原因"
               />
              </Form-item>
         </Form>
</template>
w

<script>
import dateUtils from 'vue-dateutils';
    export default{
        name:'HeighSearch',
        props: {
             data:{
                 type:Array,
                 default:()=>[],   
             },
             errorData:{
                 type:Array,
                 default:()=>[],   
             }
        },
        data (){
             const validateDate = (rule, value, callback) => {
                if (this.formItem.startDate&&this.formItem.endDate&&this.formItem.startDate>this.formItem.endDate) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            
            return{
                errorD:[],
                dateError:false,
                maxLength:200,
                independentOfficeStr:[],
                fixedLocationStr:[],
   
                formItem:
                {   
                    goodList:[],
                    remark:'',//修改原因
                    startDate:'',//开始日期
                    endDate:'2028-12-31',//结束如期
                    goodsStatus:'ON',
                    openDate:'',
                },
                orderList:[],
                typeList:[],
                communityList:[],
                ruleDaily:{
                    startDate: [
                        { validator: validateDate, trigger: 'change' }
                    ],
                    endDate: [
                        { validator: validateDate, trigger: 'change' }
                    ],
                },
                num:0
            }
        },
        mounted(){
            this.dataFormat(this.data);
            
            this.getCommunity();
            
     
        },
        watch:{
            errorData:function(val){
               this.errorD=val;
               this.dataFormat(this.data);
            }
        },
        updated(){
            this.$emit('updateForm',this.formItem);
        },
        methods:{
  getCommunity(){
            let id=this.data.length?this.data[0].communityId:'';
             var data={
                   communityId:id 
               }
                  this.$http.get('getCommunityList',data).then((response)=>{    
              console.log('社区66666666666666666666666666666666666',response.data)
                        this.formItem.startDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(response.data.openDate));
                        
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },

            dataFormat(data){
                this.independentOfficeStr=[];
                this.fixedLocationStr=[];
                let arr = [].concat(data);
                let error=[].concat(this.errorD);
                let goodsMiddle=[];
                this.num=arr.length;
                arr.length&&arr.map((item,index)=>{
                    if(error.length){
                        error.map((items,indexs)=>{
                            if(items==item.id){
                                item.color='red';
                            }
                        })               
                    }else{
                        item.color='';
                    }
                    if(item.goodsTypeName == '独立办公室'){
                        this.independentOfficeStr.push(item);
                    }else if(item.goodsTypeName == '固定办公桌'){
                        this.fixedLocationStr.push(item);
                    }
                    
                    var list={};
                    list.communityId=item.communityId;
                    list.floor=item.floor;
                    list.quotedPrice=item.quotedPrice;
                    list.seatId=item.id;
                    list.seatType=item.seatType;
                    list.color=item.color;
                    list.capacity=item.capacity;
                    goodsMiddle.push(list);
                })
                this.formItem.goodListText=JSON.stringify(goodsMiddle);
            }
        }
    }
</script>

<style lang='less'>
.goods-status{
    .coloname{
        display:inline-block;
        font-size: 14px;
        font-weight:500;
    }
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .bill-search{
        display:inline-block;
        padding-left:32px;
    }
   .u-date-txt{
        padding:0 10px;
        font-size: 14px;
        color: #666;
   }
   .ivu-form-item-label{
       font-size: 14px;
       font-weight:500;
       margin-top: -2px;
   }
}
</style>  