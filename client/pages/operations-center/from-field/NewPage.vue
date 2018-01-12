
    <template>         
            <Form ref="fromFieldValidate" :model="validate" :rules="ruleValidate" label-position="top">
                <FormItem label="社区名称" prop="cmtId" class='bill-search-class'> 
                   <Select 
                        v-model="validate.cmtId" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                        clearable
                        @on-change="getCustomer"
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.id" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                   </Select> 
                </FormItem>
                <FormItem label="客户名称" prop="csrId" class='bill-search-class'>
                    <Select 
                        v-model="validate.csrId" 
                        placeholder="请输入客户名称" 
                        style="width: 252px"
                        filterable
                        clearable
                    >
                        <Option 
                            v-for="item in customerList" 
                            :value="item.id" 
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Option>
                   </Select> 
                </FormItem>
               
              
               
                <FormItem label="服务尾日" prop="leaveDate" class="bill-search">
                    <DatePicker 
                        v-model="validate.leaveDate"
                        type="date" 
                        placeholder="请选择尾款日期" 
                        style="width: 252px"
                    ></DatePicker>
                  
             </FormItem>
          
         </Form>
</template>
<script>
    import Vue from 'vue';
    export default{
        props:{
            close:Function
            },
        data (){
            
            return{
                dateError:false,
                updatedNum:1,
                validate:{
                   cmtId:'',
                   csrId:'',
                   leaveDate:'',
                },
                ruleValidate:{
                    cmtId:[
                        { required: true, message: '社区名称为必填项'}
                    ],
                    csrId:[
                        { required: true, message: '客户名称为必填项'}
                    ],
                    leaveDate:[
                        { required: true, message: '尾款日期为必填项'}
                        
                    ]
                    
                },
                customerList:[],
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
        methods:{
            getCustomer(){
                var that = this;
                if(!this.validate.cmtId){
                    return;
                }
                var params = {
                    communityId:this.validate.cmtId
                }
                this.$http.get('get-from-field-customer',params, r => {    
                    that.customerList=r.data 
                }, e => {
                    that.$Notice.error({
                        title:e.message
                    });
                })  
            },
            handleSubmit(name){
                 this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
        updated:function(){
            var data = false;
            var haveNull = false;
            for(let key in this.validate){
                if(!this.validate[key]){
                    haveNull = true;
                }
            }
            if(!haveNull){
                data = Object.assign({},this.validate);
            }
            this.$emit('newPageData', data);  
        
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