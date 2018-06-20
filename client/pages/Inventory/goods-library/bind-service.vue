
<template>
    <div>
     <Form ref="formItemService" :model="formItem" :rules="ruleService" label-position="left">
        <Form-item prop="enable">
            <RadioGroup v-model="formItem.enable" @on-change="radioChange">
                    <Radio label="ok">
                        这是个新房间/工位（需硬件的同事协助才可完成绑定）
                    </Radio>
                    <Radio label="no">
                        从现有的房间/工位的设备权限中选择（立即绑定）
                    </Radio>
            </RadioGroup>
        </Form-item>
        <Form-item  prop="basicSpaceId" v-if="isHave"> 
            <Select
                v-model="formItem.basicSpaceId"
                style="width:250px"
                placeholder="请选择房间"
                filterable
                clearable
            >
                <Option  v-for="item in roomList" :value="''+item.id"  :key="item.id" >{{ item.name }}</Option>
            </Select>
       </Form-item> 
      </Form>
      <div slot="footer">
          <Button type="primary" @click="submitStation" style="margin-left:15px;">确定</Button>
          <Button  @click="cancelStation">取消</Button>
      </div>
    </div>
</template>

<script>
export default {  
    props:{
        floor:{
            type:String,
            default:''
        },
        communityId:{
            type:[String,Number]
        }
    },
    data() {
        return{
           formItem:{
               enable:'',
               basicSpaceId:''
           },
           roomList:[],
           isHave:false,
           ruleService:{
               enable:[
                    {required: true, message: '请绑定设备', trigger:'change' }
                ],
               basicSpaceId: [
                    {required: true, message: '请选择房间/工位', trigger:'change' }
                ]
           }
        }
    },
    mounted(){
       this.getServiceList();
    },
    methods:{
       getServiceList(){
           let data={
               communityId:this.communityId,
               floor:this.floor
           }
           this.$http.get('goods-service-list',data).then((response)=>{
                this.roomList=response.data; 
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
       },
       radioChange(val){
           this.formItem.basicSpaceId='';
           if(val=='no'){
               this.isHave=true;
           }else{
               this.isHave=false;
           }
       },
       cancelStation(){
           this.$emit('cancel');
       },
       submitStation(){
           this.$refs['formItemService'].validate((valid) => {
                if (valid) {
                    this.$emit('submit',this.formItem);
                }
           })
       } 
    }
}
</script>

<style>

</style>
