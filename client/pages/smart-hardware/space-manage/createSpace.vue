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
                    <Option v-for="item in communityList" :value="item.cmtId" :key="item.cmtId">{{ item.cmtName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="楼层"  style="width:300px" prop="floor">
                 <Select 
                    v-model="formItem.floor" 
                    style="width:200px"
                    placeholder="请选择" 
                    filterable
                    clearable
                    @on-change="communityChange"
                >
                    <Option v-for="item in communityList" :value="item.cmtId" :key="item.cmtId">{{ item.cmtName }}</Option>
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
                    filterable
                    clearable
                    @on-change="communityChange"
                >
                    <Option v-for="item in communityList" :value="item.cmtId" :key="item.cmtId">{{ item.cmtName }}</Option>
                </Select>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    data(){
       return{
         formItem:{
             communityId:'',
             floor:'',
             name:'',
             type:'',
         }, 
         communityList:[],
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

    },
    methods:{
       getCommunityList(){
            this.$http.get('get-space-community-list', '').then((res)=>{
                res.data.map((item,index)=>{
                    item.label=item.cmtName;
                    item.value=item.cmtId;
                    return  item;
                })
               this.communityList=res.data
              
            
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            }) 
      },
      communityChange(){

      }

    }
}
</script>
<style lang="less">
.g-create-space{
    width:300px;
    margin:10px auto;
}
</style>


