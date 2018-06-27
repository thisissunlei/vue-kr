 <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="订单编号"  class="bill-search-class">
                    <i-input 
                        v-model="formItem.orderNum" 
                        placeholder="请输入订单编号"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="客户名称" class="bill-search-class">
                    <i-input 
                        v-model="formItem.customerName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="社区名称" class="bill-search-class"> 
                    <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                         clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
                <Form-item label="订单类型" class="bill-search-class" v-show="type">
                    <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入订单类型" 
                        style="width: 252px"
                        clearable
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="订单状态" class='bill-search-class'>
                    <Select 
                        v-model="formItem.orderStatus" 
                        placeholder="请输入订单状态" 
                        style="width: 252px"
                        clearable
                    >
                        <Option 
                            v-for="item in orderList" 
                            :value="item.value" 
                            :key="item.value"
                         >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="创建日期" class="bill-search">
                    <DatePicker 
                        v-model="formItem.cStartDate"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                    />
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.cEndDate"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                    />
                    <div style="color:red;" v-show="dateError">开始日期不能大于结束日期</div>  
             </Form-item>
             <Form-item label="生效日期" class="bill-search">
                    <DatePicker 
                        v-model="formItem.effectStart"
                        type="date" 
                        placeholder="生效开始日期" 
                        style="width: 252px"
                    />
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.effectEnd"
                        type="date" 
                        placeholder="生效结束日期" 
                        style="width: 252px"
                    />
                    <div style="color:red;" v-show="effectError">开始日期不能大于结束日期</div>  
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
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .bill-search{
        display:inline-block;
        padding-left:32px;
        .u-date-txt{
            padding:0 25px;
            font-size: 14px;
            color: #666;
        }
    }

</style>  