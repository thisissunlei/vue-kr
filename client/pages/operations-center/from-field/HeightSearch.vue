
    <template>         
    <Form ref="formItem" style="text-align: left;" :model="formItem" label-position="top">
        <Form-item label="撤场编号"  class='bill-search-class'>
            <i-input 
                v-model="formItem.withdrawalNum" 
                placeholder="请输入合同编号"
                style="width: 252px"
            />
        </Form-item>

        <Form-item label="客户名称" class='bill-search-class'>
            <i-input 
                v-model="formItem.csrName" 
                placeholder="请输入客户名称"
                style="width: 252px"
            />
        </Form-item>

        <Form-item label="社区名称" class='bill-search-class'> 
            <Select v-model="formItem.cmtId" placeholder="请输入社区名称" style="width: 252px" filterable clearable>
                <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
            </Select> 
        </Form-item>
        
        <Form-item label="状态" class='bill-search-class'>
            <Select 
                v-model="formItem.withdrawalStatus" 
                placeholder="请输入状态" 
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

        <Form-item label="服务尾日" class="bill-search">
            <DatePicker 
                v-model="formItem.StartLastDay"
                type="date" 
                placeholder="开始日期" 
                style="width: 252px"
            />
            <span class="u-date-txt">至</span>
            <DatePicker 
                v-model="formItem.EndLastDay"
                type="date" 
                placeholder="结束日期" 
                style="width: 252px"
            />
            <div style='color:red;padding-left:32px;' v-show='dateError'>开始日期不能大于结束日期</div>
        </Form-item>
    
    </Form>
</template>


<script>
    import Vue from 'vue';
    export default{
        data (){
            
            return{
                dateError:false,

                formItem:{
                   withdrawalNum:'',
                   withdrawalStatus:'',
                   csrName:'',
                   cmtId:'',
                   StartLastDay:'',
                   EndLastDay:'',
                },
                statusList:[],
                communityList:[]
            }
        },

        created(){
          this.formItem=Object.assign({},this.$route.query);
        },

        mounted:function(){
           this.getCommunityList();
           this.getStatusList();
        },
        
        updated:function(){
            if(this.formItem.StartLastDay&&this.formItem.EndLastDay){
                if(this.formItem.StartLastDay>this.formItem.EndLastDay){
                    this.dateError=true;
                }else{
                    this.dateError=false; 
                }
            }else{
                this.dateError=false; 
            }
            this.$emit('fromFieldBindData', this.formItem,this.dateError);
        },

        methods:{
            getCommunityList(){
                this.$http.get('join-bill-community','', r => {    
                    this.communityList=r.data.items 
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })
            },

            getStatusList(){
                this.$http.get('get-from-field-status','',r => {
                    this.statusList = r.data;
                }, e => {
                    this.$Notice.error({
                        title:e.message
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