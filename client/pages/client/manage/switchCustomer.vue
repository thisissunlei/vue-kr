 <template> 
        <div>        
            <Form ref="switchForm" :model="switchForm" label-position="top">
                   <Form-item label="新负责人" class="switch-class"> 
                        <Select 
                            v-model="switchForm.receiveId" 
                            placeholder="请输入新负责人" 
                            style="width: 252px"
                            filterable
                            clearable
                        >
                            <Option v-for="item in leaderList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select> 
                </Form-item>
                <Form-item label="转移社区" class="switch-class" v-if="communityList&&communityList.length!=0"> 
                        <Select 
                            v-model="switchForm.communityIds" 
                            placeholder="请输入转移社区" 
                            style="width: 252px"
                            multiple
                        >
                            <Option v-for="item in communityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select> 
                </Form-item>
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
                    receiveId:'',
                    communityIds:[]
                },
                leaderList:[],
                communityList:[]
            }
        },
        mounted:function(){
           this.getLeaderList();
           this.getCommunityList();
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
                this.$http.get('customer-switch-community',{ids:this.switchIds}).then((response)=>{    
                        this.communityList=response.data
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
    .switch-class{
        margin-left:70px;
    }
</style>  