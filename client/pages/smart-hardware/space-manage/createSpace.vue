<template>
    <div class="g-create-space">
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" :label-width="80">
            <FormItem label="选择社区"  style="width:300px" prop="communityId" >
                 <Select 
                    v-model="formItem.communityId" 
                    style="width:200px"
                    placeholder="请选择" 
                    filterable
                    clearable
                    @on-change="communityChange"
                >
                    <Option v-for="item in communityList" :value="`${item.id}`" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="楼层"  style="width:300px" prop="floor">
                 <Select 
                    v-model="formItem.floor" 
                    style="width:200px"
                    placeholder="请选择"
                    clearable
                >
                    <Option v-for="item in floorList" :value="`${item.value}`" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
             <FormItem label="空间名称" style="width:300px" prop="name">
                <Input 
                    v-model="formItem.name" 
                    placeholder="请输入空间名称"
                    style="width:200px" 
                />
            </FormItem>
            <FormItem label="空间类型"  style="width:300px" prop="type">
                 <Select 
                    v-model="formItem.type" 
                    style="width:200px"
                    placeholder="请选择"
                    clearable
                >
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem style="padding-left:24px;margin-top:40px" class="u-btn-list" >
                <Button type="primary" style="margin-right:20px" @click="handleSubmit('formItem')" >确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="showCreate">取消</Button> 
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    props:{
        close:Function,
        submit:Function,
    },
    data(){
       return{
         formItem:{
             communityId:'',
             floor:'',
             name:'',
             type:'',
         }, 
         communityList:[],
         floorList:[],
         typeList:[
             {
                 label:'会议室',
                 value:'BOARDROOM'
             },
             {
                 label:'路演厅',
                 value:'ROADSHOW_HALL'
             },
             {
                 label:'开放区',
                 value:'OPEN_ZONE'
             },
             {
                 label:'走廊',
                 value:'AISLE'
             },
             {
                 label:'通用空间',
                 value:'COMMON'
             }
         ],
         ruleCustom:{
            communityId:[
                { required: true, message: '请选择社区', trigger:'change' }
            ],
            floor:[
                { required: true, message: '请选择楼层', trigger:'change' }
            ],
            name:[
                { required: true, message: '请输入空间名称', trigger:'change' }
            ],
            type:[
                { required: true, message: '请选择空间类型', trigger:'change' }
            ],
         },    
         
       } 
    },
    mounted(){
        this.getCommunityList();
    },
    methods:{
       showCreate(){
           this.close && this.close();
       },
       getCommunityList(){
            this.$http.get('get-space-community-list', '').then((res)=>{
                res.data.items.map((item,index)=>{
                    item.label=item.name;
                    item.value=item.id;
                    return  item;
                })
               this.communityList=res.data.items
              
            
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            }) 
      },
      //获取楼层
      communityChange(id){
          let form={
              communityId:id
          }
          
          this.$http.get('get-space-floor', form).then((res)=>{
              let floorList=[]
                res.data.floors.map((item,index)=>{
                    let obj={}
                    obj.label=item;
                    obj.value=item;
                    floorList.push(obj)
                })

               this.floorList=floorList
              
            
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            }) 
      },
      handleSubmit(){
          let formItem=this.formItem;
         this.$refs.formItem.validate((valid) => {
             if(valid){
                this.submit && this.submit(formItem);
             }
           
         })
      }
    },
    
}
</script>
<style lang="less">
.g-create-space{
    width:300px;
    margin:10px auto 0;
    .u-btn-list{
      .ivu-form-item-content{
          margin-left:60px !important;
      }  
    }
}
</style>


