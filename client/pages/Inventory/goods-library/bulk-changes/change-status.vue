 <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item style="margin-top:20px;">
                    <span class="coloname" style=" display: inline-block; margin-right: 20px;">独立办公室：</span> <span>302，302，0123，231，321</span>
                </Form-item>
                
                  <Form-item  style="margin-top:20px;">
                    <span class="coloname"  style=" display: inline-block; margin-right: 20px;">独立办公室：</span> <span>302321</span>
                </Form-item>
            
                <Form-item   style="margin-top:20px;">
                    <span class="coloname">选择库存日期：</span>
                    <DatePicker 
                        v-model="formItem.cStartDate"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 180px"
                    />
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.cEndDate"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 180px"
                    />
                    <div style="color:red;" v-show="dateError">开始日期不能大于结束日期</div>  
             </Form-item>
             <Form-item style="margin-top:20px;">
                        <span class="coloname" style="display:inline-block;margin-right:47px;">修改为：</span>
                    <RadioGroup v-model="animal" >
                        <Radio label="启动">1</Radio>
                        <Radio label="不可用"></Radio>
                        <Radio label="下架"></Radio>
                    </RadioGroup> 
             </Form-item>
             <Form-item style="margin-top:20px;">
               <span class="coloname">修改信息：</span>
               <Input v-model="value6"  style="width:400px;margin-left:35px;" type="textarea" :rows="4" placeholder="Enter something..."></Input>
              </Form-item>
         </Form>
</template>


<script>
    export default{
        name:'HeighSearch',
        props: {
             mask:String,
             keys:String,
             params:{}
        },
        data (){
            return{
                value6:'',
                animal:'启动',
                dateError:false,
                effectError:false,
                formItem:{
                   orderNum:'',
                   customerName:'',
                   orderStatus:'',
                   orderType:'',
                   communityId:'',
                   cEndDate:'',
                   cStartDate:''
                },
                type:this.mask=='join'?true:false,
                orderList:[],
                typeList:[],
                communityList:[]
            }
        },

        watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    this.formItem=Object.assign({},nextProps.params);
                }
            }
        },
 
        mounted:function(){
            this.getCommunity();
            this.getOrderList();
        },

        updated:function(){
            if(this.formItem.cStartDate&&this.formItem.cEndDate){
                if(this.formItem.cStartDate>this.formItem.cEndDate){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                this.dateError=false; 
            }
            if(this.formItem.effectStart&&this.formItem.effectEnd){
                if(this.formItem.effectStart>this.formItem.effectEnd){
                    this.effectError=true;
                }else{
                    this.effectError=false; 
                }
            }else{
                this.effectError=false; 
            }
            this.$emit('bindData', this.formItem,this.dateError);
        },

        methods:{
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
            }
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