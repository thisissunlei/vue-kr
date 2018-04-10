 <template>         
            <Form ref="fromFieldValidate" :model="formItem" label-position="top" :rules="ruleValidate">
                <Form-item label="客户名称" class="bill-search-class" prop="company">
                    <i-input 
                        v-model="formItem.company" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="相关社区" class="bill-search-class" prop="communityId"> 
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
                <Form-item label="客户一级来源" class="bill-search-class" prop="sourceId">
                    <Select 
                        v-model="formItem.sourceId" 
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
                <Form-item label="客户二级来源" class="bill-search-class" prop="subSourceId">
                    <Select 
                        v-model="formItem.subSourceId" 
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
                <Form-item label="客户联系人" class="bill-search-class" prop="contactName">
                    <i-input 
                        v-model="formItem.contactName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="联系人手机号" class="bill-search-class" prop="contactTel">
                    <i-input 
                        v-model="formItem.contactTel" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="联系人邮箱" class="bill-search-class" prop="contactMail">
                    <i-input 
                        v-model="formItem.contactMail" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
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
                	subSourceId:'',
                	sourceId:'',
                	contactTel:'',
                	contactName:'',
                	contactMail:'',
                	company:'',
                	communityId:''
                },
                orderList:[],
                typeList:[],
                communityList:[],
                ruleValidate:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    company:[
                        { required: true, message: '请填写客户名称'}
                    ],
                    contactMail:[
                        { required: true, message: '请填写客户联系人邮箱',type:"email"}
                    ],
                    contactName:[
                        { required: true, message: '请填写客户联系人'}
                    ],
                    contactTel:[
                        { required: true, message: '请填写客户联系人电话'}
                    ],
                    sourceId:[
                        { required: true, message: '请选择客户来源'}
                    ],
                    subSourceId:[
                        { required: true, message: '请选择客户来源'}
                        
                    ]
                },
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
        	var data = false;
            var haveNull = false;
            for(let key in this.formItem){
                if(!this.formItem[key]){
                    haveNull = true;
                }
            }
            if(!haveNull){
                data = Object.assign({},this.formItem);
            }
            console.log('newData',data)
            this.$emit('newData', data);
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