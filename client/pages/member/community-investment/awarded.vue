<template>
    <div>
       <Select
            v-model="formItem.roleId"
            style="width:250px;margin-left:70px;margin-top:30px;"
            placeholder="请选择角色"
            clearable
        >
            <Option  v-for="item in roleList" :value="''+item.roleId"  :key="item.roleId" >{{ item.roleName }}</Option>
        </Select>
        <div slot="footer" style="margin: 30px 0;text-align: center;">
                <Button  type="primary" @click="submitRole">确认</Button>
                <Button  type="ghost" style="margin-left:20px" @click="cancelRole">取消</Button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return{
           formItem:{
               roleId:''
           },
           roleList:[] 
        }
    },
    mounted(){
        this.getDataList();
    },
    methods:{
       getDataList(){
            this.$http.get('get-business-role').then((res)=>{
                this.roleList=res.data.items;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
       },
       submitRole(){
           this.$emit('submit',this.formItem);
       },
       cancelRole(){
           this.$emit('cancel');
       }
    }
}
</script>

<style lang='less' scoped>
     
</style>
