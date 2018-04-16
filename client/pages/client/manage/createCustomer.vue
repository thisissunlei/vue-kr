 <template>         
            <Form ref="fromFieldValidate" :model="formItem" label-position="top" :rules="ruleValidate">
                <Form-item label="客户名称" class="bill-search-class" prop="company">
                    <i-input 
                        v-model="formItem.company" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        :maxlength="max"
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
                        @on-change="firstSourceChange"

                    >
                        <Option 
                            v-for="item in firstSource" 
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
                        not-found-text="请先选择客户一级来源"
                    >
                        <Option 
                            v-for="item in secondSource" 
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
                        placeholder="请输入客户联系人"
                        style="width: 252px"
                        :maxlength="max"
                    />
                </Form-item>
                <Form-item label="联系人手机号" class="bill-search-class" prop="contactTel">
                    <i-input 
                        v-model="formItem.contactTel" 
                        placeholder="请输入联系人手机号"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="联系人邮箱" class="bill-search-class" prop="contactMail">
                    <i-input 
                        v-model="formItem.contactMail" 
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
             params:{}
        },
        data (){
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
            };
            return{
                dateError:false,
                effectError:false,
                canSubmit:true,
                formItem:{
                	subSourceId:'',
                	sourceId:'',
                	contactTel:'',
                	contactName:'',
                	contactMail:'',
                	company:'',
                	communityId:''
                },
                statusList:[],
                firstSource:[],
                secondSource:[],
                communityList:[],
                max:25,
                ruleValidate:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    company:[
                        { required: true, message: '请填写客户名称'},
                        { required: true, trigger: 'blur' ,validator: validateName},
                        { required: true, trigger: 'change' ,validator: validateName},
                    ],
                    contactMail:[
                        { required: true, message: '请填写客户联系人邮箱',type:"email"}
                    ],
                    contactName:[
                        { required: true, message: '请填写客户联系人'}
                    ],
                    contactTel:[
                        { required: true, message: '请填写客户联系人电话'},
                        { required: true, trigger: 'blur' ,validator: validatephone},

                    ],
                    sourceId:[
                        { required: true, message: '请选择客户来源'}
                    ],
                    subSourceId:[
                        { required: true, message: '请选择客户来源',}
                        
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
            this.getCustomerSource()
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
            this.$emit('newData', data,this.canSubmit);
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
            getCustomerSource(){
                this.$http.get('get-customer-source','').then((response)=>{   
                    this.firstSource = response.data.map(item=>{
                        item.value = item.id+'';
                        item.label = item.name;
                        return item;
                    })
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                }) 
            },
            
            firstSourceChange(value){
        
                let secondSource = []
                let list = []
                secondSource = this.firstSource.filter(item=>{
                    if(item.id == this.formItem.sourceId){
                        list = item.subSources || [];
                        return true;
                    }
                    return false
                })
                this.secondSource =list.map(item=>{
                    item.value = item.id+'';
                        item.label = item.name;
                        return item;
                });
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