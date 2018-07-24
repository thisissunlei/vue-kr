<template>
    <div>
       <Select
            v-model="formItem.basicSpaceId"
            style="width:250px;margin-left:70px;margin-top:30px;"
            placeholder="请选择角色"
            clearable
        >
            <Option  v-for="item in roleList" :value="''+item.id"  :key="item.id" >{{ item.name }}</Option>
        </Select>
        <div slot="footer" style="margin: 30px 0;text-align: center;">
                <Button  type="primary" @click="submitRole">确认</Button>
                <Button  type="ghost" style="margin-left:20px" @click="cancelRole">取消</Button>
        </div>
    </div>
</template>

<script>

export default {
    components:{
        
    },
    data() {
        return{
           formItem:{
               basicSpaceId:''
           },
           roleList:[] 
        }
    },
    methods:{
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
