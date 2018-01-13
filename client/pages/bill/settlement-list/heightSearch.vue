

 
    <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="结算单编号"  class='bill-search-class'>
                    <i-input 
                        v-model="formItem.checklistNum" 
                        placeholder="请输入结算单编号"
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
                            :value="item.name" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                   </Select> 
                </Form-item>
                <Form-item label="状态" class='bill-search-class'>
                    <Select 
                        v-model="formItem.checklistStatus" 
                        placeholder="请输入状态" 
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
                <Form-item label="生成日期" class="bill-search">
                    <DatePicker 
                        v-model="formItem.ctimeStart"
                        type="date" 
                        placeholder="创建开始日期" 
                        style="width: 252px"
                    />
                   <span class="u-date-txt">至</span>
                    <DatePicker 
                        v-model="formItem.ctimeEnd"
                        type="date" 
                        placeholder="创建结束日期" 
                        style="width: 252px"
                    />
                    <div style='color:red;' v-show='dateError'>开始日期不能大于结束日期</div>
             </Form-item>
            
         </Form>
</template>
<script>
    import Vue from 'vue';
    export default{
        props:['mask','params'],
        data (){
            
            return{
                dateError:false,
                formItem:Object.assign({
                   communityId:'',
                   customerName:'',
                   checklistNum:'',
                   checklistStatus:'',
                   ctimeEnd:'',
                   ctimeStart:'',
                },this.params),
                //状态
                orderList:[ 
                    {
                        value:'UNEFFECTIVE',
                        label:'未生效'
                    },
                    {
                        value:'EFFECTIVE',
                        label:'已生效'
                    },
                    {
                        value:'ABANDONED',
                        label:'已作废'
                    },
                    {
                        value:'FINISHED',
                        label:'已完成'
                    }
                ],
                //社区列表
                communityList:[]
            }
        },
        mounted:function(){
            var _this = this;
            this.$http.get('join-bill-community','', r => {    
                _this.communityList=r.data.items 
            }, e => {
                _this.$Notice.error({
                     title:e.message
                });
            })
        },
        updated:function(){
            if(this.formItem.ctimeStart&&this.formItem.ctimeEnd){
                if(this.formItem.ctimeStart>this.formItem.ctimeEnd){
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