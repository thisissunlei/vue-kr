 <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="客户名称" class="bill-search-class">
                    <i-input 
                        v-model="formItem.company" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="入驻社区" class="bill-search-class"> 
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
                <Form-item label="行业分类" class="bill-search-class" >
                    <Select 
                        v-model="formItem.industryId" 
                        placeholder="请输入行业分类" 
                        style="width: 252px"
                        clearable
                    >
                        <Option 
                            v-for="item in industryList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.desc }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="入驻状态" class="bill-search-class" >
                    <Select 
                        v-model="formItem.status" 
                        placeholder="请输入入驻状态" 
                        style="width: 252px"
                        clearable
                    >
                        <Option 
                            v-for="item in statusList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="创建日期" class="bill-search">
                    <DatePicker 
                        v-model="formItem.startDate"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                    />
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.endDate"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                    />
                    <div style="color:red;" v-show="dateError">开始日期不能大于结束日期</div>  
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
                    customerName:'',
                    communityId:'',
                    startDate:'',
                    endDate:'',
                    industryId:'',
                    status:''
                },
                orderList:[],
                statusList:[],
                typeList:[],
                communityList:[],
                industry:'com.krspace.sso.api.enums.customer.Industry',
                industryList:[]
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
            this.getStatusList()
            this.getIndustryList()
        },

        updated:function(){
            if(this.formItem.startDate&&this.formItem.endDate){
                if(this.formItem.startDate>this.formItem.endDate){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                this.dateError=false; 
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
            },
            //获取行业分类
            getIndustryList(){
                this.$http.get('get-enmu-list',{enmuKey:this.industry}).then((response)=>{   
                    this.industryList=response.data;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })   
            },
            getStatusList(){
                this.$http.get('get-enmu-list',{enmuKey:'com.krspace.sso.api.enums.customer.Status'}).then((response)=>{   
                    this.statusList = response.data.map(item=>{
                        item.label = item.desc;
                        return item;
                    })
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                }) 
            },
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