
<template>
<div class="g-high-search">
    <Form  
        ref="formValidate" 
        :model="formItem" 
        label-position="right"  
        :rules="ruleValidate"
        :label-width="100">
        <FormItem label="设备组名称："   prop="name">
            <Input
                v-model="formItem.name"
                placeholder="设备组名称"
                style="width: 300px"
            />
        </FormItem>
        <FormItem label="组描述：" prop="memo">
            <Input
                v-model="formItem.memo"
                placeholder="组描述"
                style="width: 300px"
            />
        </FormItem>
       
    </Form>
</div>
</template>
<script>
export default{
    name:'newCreate',
    data (){
		return{
			formItem:{
                name:'',
                memo:'',
            },
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
     props:{
         
    },
    methods:{
        
    },
    updated:function(){

      var formValidate = this.$refs[this.formValidate];
       let callback = formValidate.validate;
       let cancel = formValidate.resetFields;
       
       this.$emit('formData', this.formItem,callback,cancel);  
       
    }

}
</script>
<style lang="less">

</style>