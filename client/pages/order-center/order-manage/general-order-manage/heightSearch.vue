<style lang='less'>
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
    <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="订单编号"  class='bill-search-class'>
                    <i-input 
                        v-model="formItem.orderNum" 
                        placeholder="请输入订单编号"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="客户名称" class='bill-search-class'>
                    <i-input 
                        v-model="formItem.customerName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="社区名称" class='bill-search-class'> 
                    <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                        clearable
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.id" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="订单类型" class='bill-search-class'>
                    <Select 
                        v-model="formItem.type" 
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
                        v-model="formItem.status" 
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
                        v-model="formItem.cTimeBegin"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                    ></DatePicker>
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.cTimeEnd"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                    ></DatePicker> 
                    <div style='color:red;' v-show='dateError'>开始日期不能大于结束日期</div>  
             </Form-item>
         </Form>
</template>
<script>


    export default{
        props:['mask'],
        data (){
            return{
                dateError:false,
                formItem:{
                   orderNum:'',
                   customerName:'',
                   status:'',
                   type:'',
                   communityId:'',
                   cTimeBegin:'',
                   cTimeEnd:''
                },
                orderList:[
                   {value:'EFFECT',label:'已生效'},
                   {value:'FINISH',label:'已完成'},
                   {value:'CANCEL',label:'已作废'},
                ],
                typeList:[
                   {value:'REGISTER',label:'注册订单'},
                   {value:'INCONSUME',label:'场内消费订单'},
                   {value:'ACTIVITY',label:'活动订单'},
                   {value:'ADVERT',label:'广告订单'},
                   {value:'APPRECIATION6',label:'增值服务订单'},
                   {value:'TRAIN',label:'培训订单'},  
                   {value:'OTHER',label:'其他服务订单'}
                ],
                communityList:[]
            }
        },
        mounted:function(){
            this.getCommunity();
        },
        methods:{
             getCommunity(){
                var _this=this;
                this.$http.get('join-bill-community','', r => {    
                    _this.communityList=r.data.items 
                    }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });
                })
            }
        },
        updated:function(){
            if(this.formItem.cTimeBegin&&this.formItem.cTimeEnd){
                if(this.formItem.cTimeBegin>this.formItem.cTimeEnd){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                this.dateError=false; 
            }
            this.$emit('bindData', this.formItem,this.dateError);
        },
    }
</script>

