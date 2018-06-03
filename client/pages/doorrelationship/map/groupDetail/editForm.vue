
<template>
<div class="edit-equipment">
    <Form  
        inline
        ref="formValidate" 
        :model="formItem" 
        label-position="right"  
        :rules="ruleValidate"
        class="edit-form"
        >
        <FormItem label="设备组名称："   prop="name">
            <Input
                v-model="formItem.name"
                placeholder="设备组名称"
                style="width: 150px"
            />
        </FormItem>
        <FormItem label="组描述：" prop="memo">
            <Input
                v-model="formItem.memo"
                placeholder="组描述"
                style="width: 150px"
            />
        </FormItem>
        <div class="submit-editData">
            <Button type="primary" @click="submitEdit"  class="list-btn">提交编辑</Button>
            <Button type="primary" @click="submitEditAndClose"  class="list-btn">提交编辑并关闭</Button>
        </div>
    </Form>
 
   
</div>
</template>
<script>
export default{
    name:'newCreate',
    data (){
		return{
            openDeleteTip : false,
			formItem:{},
            formValidate:'formValidate',
            ruleValidate : {
                name: [
                        { required: true, message: '设备组名称必填', trigger: 'blur' },
                        { type: 'string', max: 20, message: '组名称最长20个字符', trigger: 'blur' }
                    ],
                memo: [
                        { type: 'string', max: 20, message: '描述最长20个字符', trigger: 'blur' }
                    ],
            }
		}
    },
    mounted(){

        this.formItem = this.initialData;
    },
    components: {
         
    },
     props:[
         "initialData",
        
     ],
    methods:{
        

        submitEdit:function(){
            
            var sendMsg = this.formItem;
            this.editDataReq(sendMsg);
        },
        submitEditAndClose : function(){
            var sendMsg = this.formItem;
            this.editDataReq(sendMsg,this.closeDetailPage);
        },
        editDataReq(sendMsg,callBack){
            this.$http.post('editDoorRelationshipData', sendMsg).then((res)=>{
               
                this.$Message.success('编辑设备组成功');
                var sendMsgObj = Object.assign({},sendMsg)
                this.$emit("editNodeDataInDetail",sendMsgObj,res);
                
                callBack && callBack()
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        closeDetailPage (){
            this.$emit("closeDetailPage");
        }
        
    },
    updated:function(){

        var formValidate = this.$refs[this.formValidate];
        if(!formValidate){
            return;
        }
        let callback = formValidate.validate;
        let cancel = formValidate.resetFields;
        this.$emit('formData', this.formItem,callback,cancel);  
       
    }

}
</script>
<style lang="less">
    
    .edit-form{
        position: relative;
    }
    .submit-editData{
        // position: absolute;
        // top: 33px;
        // left: 320px;
        .list-btn{
            margin:0 10px 10px 0;
        }
    }
</style>