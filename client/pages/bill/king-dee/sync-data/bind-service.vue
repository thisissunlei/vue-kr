
<template>
    <div>
     <Form ref="formItemService" :model="formItem" :rules="ruleService" label-position="left" style="margin-left: 20px;">
        <Form-item prop="enable">
            <RadioGroup v-model="formItem.enable" @on-change="radioChange">
                    <Radio label="ok">
                        这个房间/工位是全新的，创建一个新物理空间（新的空间需重新绑定设备）
                    </Radio>
                    <Radio label="no">
                        从现有的物理空间中选择
                    </Radio>
            </RadioGroup>
        </Form-item>
        <Form-item  prop="basicSpaceId" v-if="isHave"> 
            <Select
                v-model="formItem.basicSpaceId"
                style="width:250px;"
                placeholder="请选择房间"
                filterable
                clearable
            >
                <Option  v-for="item in roomList" :value="''+item.id"  :key="item.id" >{{ item.name }}</Option>
            </Select>
       </Form-item> 
      </Form>
      <div slot="footer" style="text-align:center">
          <Button type="primary" @click="submitStation" style="margin-right:15px;">确定</Button>
          <Button  @click="cancelStation">取消</Button>
      </div>
    </div>
</template>

<script>
export default {  
    props:{
        singleForms:{
            type:Object,
            default:{}
        },
        floor:{
            type:[String,Number]
        },
        editData:{
            type:Object,
            default:{}
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
       console.log('data--',this.floor,'g',this.editData);
    },
    methods:{
       getServiceList(){
           let data={
               communityId:this.singleForms.communityId,
               floor:this.floor||this.editData.floor
           }
           this.$http.get('goods-service-list',data).then((response)=>{
                this.roomList=response.data; 
                if(this.editData.basicSpaceId){
                    this.formItem.enable='no'
                    this.isHave=true;
                    this.formItem.basicSpaceId=''+this.editData.basicSpaceId;
                }else{
                    this.formItem.enable='ok'
                    this.isHave=false;
                }
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
