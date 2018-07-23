 <template>         
            <Form ref="editCustomerData" :model="formItem" label-position="top" :rules="ruleValidate">
                <Form-item label="客户名称" class="bill-search-class" prop="company">
                    <i-input 
                        v-model="formItem.company" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        :maxlength="maxName"
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
                <Form-item label="客户来源类型" class="bill-search-class" prop="channelType">
                    <Select 
                        v-model="formItem.channelType" 
                        placeholder="请选择客户来源类型" 
                        style="width: 252px"
                        clearable
                        @on-change="sourceTypeChange"

                    >
                        <Option 
                            v-for="item in customerSourceTypeOptions" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="客户来源" class="bill-search-class" prop="channelId">
                    <Select 
                        v-model="formItem.channelId" 
                        placeholder="请选择客户来源" 
                        style="width: 252px"
                        clearable

                    >
                        <Option 
                            v-for="item in customerSourceOptions" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="客户类型" class="bill-search-class" prop="type">
                    <Select 
                        v-model="formItem.type" 
                        placeholder="请选择客户类型" 
                        style="width: 252px"
                        clearable
                        :disabled="isCompany"
                        
                    >
                        <Option 
                            v-for="item in customerTypeOptions" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                </Form-item>
                
                <Form-item v-if="isShow" label="客户联系人" class="bill-search-class" prop="name">
                    <i-input 
                        v-model="formItem.name" 
                        placeholder="请输入客户联系人"
                        style="width: 252px"
                        :maxlength="max"
                    />
                </Form-item>
                <Form-item v-if="isShow" label="联系人手机号" class="bill-search-class" prop="mobile">
                    <i-input 
                        v-model="formItem.mobile" 
                        placeholder="请输入联系人手机号"
                        style="width: 252px"
                        
                    />
                </Form-item>
                <Form-item v-if="isShow" label="联系人邮箱" class="bill-search-class" prop="mail">
                    <i-input 
                        v-model="formItem.mail" 
                        placeholder="请输入联系人邮箱"
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
             params:{},
            initailData :{},
            
        },
        data (){
            let _this =this;
            const validatephone = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            const validateName = (rule, value, callback) => {
                value = value.replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");
                this.formItem.company = value;
                if (value === '') {
                    this.canSubmit = false
                    callback(new Error('请填写客户联系人'));
                }else{
                   if(value==_this.initailData.company){
                       this.canSubmit = true;
                       callback()
                   }else{
                       this.$http.get('check-company', {company:value}).then( r => {
                            if(r.message == "ok"){
                                this.canSubmit = true;
                                callback()
                            }else{
                                callback(new Error('客户名称不可重复')) 
                            }
                        }).catch( e => {
                            this.canSubmit = false;
                            callback(new Error('客户名称不可重复')) 

                            
                        })

                    }
                    
                }
            };
            return{
                isCompany : true,
                customerSourceTypeOptionsParam : 'com.krspace.order.api.enums.customer.CsrChannelType',
                customerSourceTypeOptions :[],
                customerSourceOptions:[],
                customerTypeOptions:[],
                dateError:false,
                effectError:false,
                canSubmit:true,
                isShow:true,
                formItem:{
                	company:'',
                	communityId:1,
                	channelType:'',
                	channelId:'',
                	type:'',
                	name:'',
                	mobile:'',
                	mail:'',
                },
                statusList:[],
                firstSource:[],
                secondSource:[],
                communityList:[],
                max:25,
                maxName:50,
                ruleValidate:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    company:[
                        { required: true, message: '请填写客户名称',trigger: 'change'},
                        { required: true, trigger: 'blur' ,validator: validateName},
                    ],
                    mail:[
                        { required: true, message: '请填写客户联系人邮箱',type:"email"}
                    ],
                    name:[
                        { required: true, message: '请填写客户联系人'}
                    ],
                    mobile:[
                        { required: true, message: '请填写客户联系人电话'},
                        // { required: true, trigger: 'blur' ,validator: validatephone},

                    ],
                    channelType:[
                        { required: true, message: '请选择客户来源类型'}
                    ],
                    type:[
                        { required: true, message: '请选择客户类型'}
                    ],
                    channelId:[
                        { required: true, message: '请选择客户来源',}
                    ]
                },
            }
        },

 
        mounted:function(){
            this.getCommunity();
            this.getCustomerSourceTypeOptions();
            this.getCustomerTypeOptions();
            console.log("this.initailData",this.initailData);
            this.formItem =Object.assign({},this.initailData);
            console.log("this.formItem",this.formItem)
            this.formItem.communityId = this.initailData.communityId+"";
            console.log("this.formItem",this.formItem)
            this.isShow = this.initailData.type=="ENTERPRISE"?false:true;
        },
        

        updated:function(){
        	var data = false;
            var haveNull = false;

            for(let key in this.formItem){
                if(!this.formItem[key]){
                    haveNull = true;
                }
            }
            console.log("haveNull",haveNull);

            if(!haveNull){
                data = Object.assign({},this.formItem);
            }
            console.log("this.canSubmit",this.canSubmit);
            this.$emit('editCustomer', data,this.canSubmit);
        },

        methods:{
            //获取客户类型列表
            getCustomerTypeOptions(){
                var param = {enmuKey : "com.krspace.op.api.enums.customer.CustomerType"}
                this.$http.get('get-enmu-list',param).then((response)=>{   
                    
                    this.customerTypeOptions = response.data.map(item=>{
                        item.label = item.desc;
                        return item;
                    })
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                }) 
            },
            getCustomerSourceTypeOptions(){
                this.$http.get('get-enmu-list',{enmuKey:this.customerSourceTypeOptionsParam}).then((response)=>{   
                    
                    this.customerSourceTypeOptions = response.data.map(item=>{
                        item.label = item.desc;
                        return item;
                    })
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                }) 
            },
            sourceTypeChange(value){
                var param = {type : value}
                this.$http.get('get-customermanage-customer-type',param).then((response)=>{    
                    console.log("response",response);
                     this.customerSourceOptions = response.data.map(item=>{
                        item.label = item.name;
                        item.value = item.id;
                        return item;
                    })
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
              
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