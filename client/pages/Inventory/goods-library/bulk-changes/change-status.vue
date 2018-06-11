 <template>         
            <Form ref="formItem" :model="formItem"  :rules="ruleDaily"  label-position="top">
                <Form-item style="margin-top:20px; word-wrap:break-word; ">
                    <span class="coloname" style=" display: inline-block;   margin-right: 20px;">独立办公室：</span> <span>{{independentOfficeStr}}</span>
                </Form-item>
                
                  <Form-item  style="margin-top:20px; word-wrap:break-word;">
                    <span class="coloname"  style=" display: inline-block; margin-right: 20px;">固定办公：</span> <span>{{fixedLocationStr}}</span>
                </Form-item>
            
                <Form-item   style="margin-top:20px;">
                    <span class="coloname" style="float:left;">选择库存日期：</span>
                    <Form-item prop="startDate" style=‘display:inline-block;float:left;’>
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
             <Form-item style="margin-top:20px;">
                        <span class="coloname" style="display:inline-block;margin-right:47px;">修改为：</span>
                    <RadioGroup v-model="formItem.goodsStatus" >
                        <Radio label="启动"></Radio>
                        <Radio label="不可用"></Radio>
                        <Radio label="下架"></Radio>
                    </RadioGroup> 
             </Form-item>
             <Form-item style="margin-top:20px;">
               <span class="coloname">修改原因：</span>
               <Input v-model="formItem.remark"  style="width:400px;margin-left:35px;" type="textarea" :rows="4" placeholder="请输入修改原因"/>>
              </Form-item>
              <!-- <Button @click="onClick">fsfs</Button> -->
         </Form>
</template>


<script>
    export default{
        name:'HeighSearch',
        props: {
             data:{
                 type:Array,
                 default:[],   
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
    
                value6:'',
                name:'',
               
                dateError:false,
                effectError:false,
                name:'',
                independentOfficeStr:'',
                fixedLocationStr:'',
   
                formItem:
                {
                    remark:'',//修改原因
                    startDate:'',//开始日期
                    endDate:'',//结束如期
                    goodsStatus:'启动',
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
                  }
            }
        },
        mounted(){
            this.dataFormat(this.data);
            this.getCommunity();
            this.getOrderList();
            console.log(this.data,"=========")
            
        },
        updated(){
            console.log(this.formItem,"====formItem=====")
            this.$emit('updateForm',this.formItem);
        },
        methods:{
            dataFormat(data){
                let arr = [].concat(data);
                let independentOfficeStr='';
                let fixedLocationStr = '';
                arr.map((item,index)=>{
                    if(item.goodsTypeName == '独立办公室'){
                        independentOfficeStr+=item.code+','
                    }else if(item.goodsTypeName == '固定办公桌'){
                        fixedLocationStr+=item.code+','
                    }
                })
                this.independentOfficeStr = independentOfficeStr;
                this.fixedLocationStr = fixedLocationStr;
                
            },
            getCommunity(){
                this.$http.get('join-bill-community','').then((response)=>{    
                        this.communityList=response.data.items 
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })
            },

            getOrderList(){
                this.$http.get('order-pay-list','').then((response)=>{   
                    this.orderList=response.data.orderTypeVos;
                    this.typeList=response.data.seatOrderTypeVos;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                     });
                })   
            },
            // onClick(e){
            //     var dom = e.target;
            //     // this.independentOfficeStr=
            //     this.$emit('click',this.independentOfficeStr);
            // }

        }
    }
</script>

<style lang='less' scoped>
.coloname{
    font-size: 16px;
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
            padding:0 25px;
            font-size: 14px;
            color: #666;
        }
</style>  