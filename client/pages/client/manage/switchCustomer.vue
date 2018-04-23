 <template> 
        <div>        
            <Form ref="switchForm" :model="switchForm" label-position="top" :rules="ruleValidate">
                   <Form-item label="新负责人" class="switch-class" prop="newReceiveId"> 
                        <Select 
                            v-model="switchForm.newReceiveId" 
                            placeholder="请输入新负责人" 
                            style="width: 252px"
                            filterable
                            clearable
                        >
                            <Option v-for="item in leaderList" :value="''+item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> 
                </Form-item>
                <!-- <Form-item label="转移社区" class="switch-class" v-if="communityList&&communityList.length!=0" prop="communityIds"> 
                        <Select 
                            v-model="switchForm.communityIds" 
                            placeholder="请输入转移社区" 
                            style="width: 252px"
                            multiple
                            @on-change="communityChange"
                        >
                            <Option v-for="item in communityList" :value="item.communityId" :key="item.communityId">{{ item.communityName }}</Option>
                    </Select> 
                </Form-item> -->
            </Form>
        </div>
</template>


<script>
    export default{
        props: {
             switchIds:{
                 type:String,
                 default:''
             }
        },
        data (){
            return{
                switchForm:{
                    newReceiveId:''
                },
                leaderList:[],
                communityList:[],
                ruleValidate: {
                    newReceiveId:[
                        { required: true, message: '请选择新负责人', trigger: 'change' }
                    ]
                }
            }
        },
        mounted:function(){
           this.getLeaderList();
           //this.getCommunityList();
        },
        updated:function(){
            this.$emit('bindData',this.switchForm);
        },
        methods:{
             getLeaderList(){
                this.$http.get('customer-switch-leader').then((response)=>{    
                        this.leaderList=response.data
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })
            },
            getCommunityList(){
                this.$http.get('customer-switch-community',{customerIds:this.switchIds}).then((response)=>{    
                        this.communityList=response.data
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })
            },
            communityChange(params){
                var str='';
                if(params.length){
                  str=params.join();
                }
                this.switchForm.customerIds=str;
            }
        }
    }
</script>

<style lang='less' scoped>
    .switch-class{
        margin-left:70px;
    }
</style>  