
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
            <Button type="primary" @click="submitEdit">提交编辑</Button>
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
                        { type: 'string', max: 10, message: '组名称最长10个字符', trigger: 'blur' }
                    ],
                memo: [
                        { type: 'string', max: 20, message: '描述最长20个字符', trigger: 'blur' }
                    ],
            }
		}
    },
    mounted(){

        console.log("this.initialData",this.initialData)
        this.formItem = this.initialData;
    },
    components: {
         
    },
     props:[
         "initialData",
        
     ],
    methods:{
        

        submitEdit:function(){
            console.log("formItem",this.formItem);
            var sendMsg = this.formItem;
            this.editDataReq(sendMsg);
        },
        editDataReq(sendMsg){
            this.$http.post('editDoorRelationshipData', sendMsg).then((res)=>{
                
               
                this.$Notice.success({
                    title: '编辑成功',
                    desc: '编辑设备组成功',
                    render: h => {
                        return h('span', ['编辑设备组成功'])
                    }
                });
                var sendMsgObj = Object.assign({},sendMsg)
                this.$emit("editNodeDataInDetail",sendMsgObj,res);
                

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        
    },
    updated:function(){

        var formValidate = this.$refs[this.formValidate];
        console.log("formValidate",formValidate);
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
        position: absolute;
        top: 33px;
        left: 320px;
    }
</style>