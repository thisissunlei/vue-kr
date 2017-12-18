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
                <Form-item label="合同编号"  class='bill-search-class'>
                    <i-input 
                        v-model="formItem.serialNumber" 
                        placeholder="请输入合同编号"
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
                        v-model="formItem.communityName" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                        clearable
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.name" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="合同类型" class='bill-search-class' v-show='type'>
                    <Select 
                        v-model="formItem.contractType" 
                        placeholder="请输入合同类型" 
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
                <Form-item label="合同状态" class='bill-search-class'>
                    <Select 
                        v-model="formItem.contractStatus" 
                        placeholder="请输入合同状态" 
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
                        v-model="formItem.minCTime"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                    ></DatePicker>
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.maxCTime"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                    ></DatePicker>   
                    <div style='color:red;padding-left:32px;' v-show='dateError'>开始日期不能大于结束日期</div>
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
                   communityName:'',
                   contractType:'',
                   customName:'',
                   maxCTime:'',
                   minCTime:'',
                   serialNumber:'',
                },
               
                type:this.mask=='join'?true:false,
                //合同状态
                orderList:[
                    
                    {
                        value:'UNENFORCED',
                        label:'未生效'
                    },
                    {
                        value:'EXECUTED',
                        label:'已生效'
                    },
                    {
                        value:'CANCELLATION',
                        label:'已作废'
                    }
                ],
                //合同类型
                typeList:[],
                communityList:[]
            }
        },
        created:function(){
            var _this=this;
             this.$http.get('join-bill-community','', r => {    
                   _this.communityList=r.data.items 
                }, e => {
                  _this.$Message.info(e);
            })
            this.$http.get('get-center-prepare-data','',r => {
                
                   _this.typeList = r.data.items;
                }, e => {
                  _this.$Message.info(e);
            })
        },
        updated:function(){
            if(this.formItem.minCTime&&this.formItem.maxCTime){
                if(this.formItem.minCTime>this.formItem.maxCTime){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                this.dateError=false; 
            }
            this.$emit('bindData', this.formItem,this.dateError);
        }
    }
</script>

