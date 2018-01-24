  <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="订单编号"  class='bill-search-class'>
                    <i-input 
                        v-model="formItem.orderNum" 
                        placeholder="请输入订单编号"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="客户名称" class='bill-search-class'>
                    <i-input 
                        v-model="formItem.customerName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    />
                </Form-item>
                <Form-item label="社区名称" class='bill-search-class'> 
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
                <Form-item label="订单类型" class='bill-search-class'>
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
                            {{ item.desc }}
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
                    />
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.cTimeEnd"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                    />
                    <div style='color:red;' v-show='dateError'>开始日期不能大于结束日期</div>  
             </Form-item>
         </Form>
</template>

<script>

    export default{
        data (){
            return{
                dateError:false,
                formItem:{
                   orderNum:'',
                   customerName:'',
                   status:'',
                   orderType:'',
                   communityId:'',
                   cTimeBegin:'',
                   cTimeEnd:''
                },
                orderList:[
                   {value:'EFFECT',label:'已生效'},
                   {value:'FINISH',label:'已完成'},
                   {value:'CANCEL',label:'已作废'},
                ],
                typeList:[],
                communityList:[]
            }
        },

        created(){
          this.formItem=Object.assign({},this.$route.query);
        },

        mounted:function(){
            this.getCommunityData();
            this.getCommonData();
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

        methods:{
             getCommunityData(){
                this.$http.get('join-bill-community','', r => {    
                    this.communityList=r.data.items 
                    }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })
            },

             getCommonData(){
               this.$http.get('general-common-list','', r => {
                     this.typeList=r.data.items;
                }, e => {
                     this.$Notice.error({
                        title:e.message
                    })
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

