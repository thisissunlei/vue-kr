
<template>
<div class="edit-equipment">
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
     <Modal
        v-model="openDeleteTip"
        title="注意"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >
        <p>删除设备组时，将删除组内设备及该组的级联关系，确认删除吗？</p>
         <div slot="footer">
            <Button type="primary" @click="confirmDeleteGroup">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="openDeleteTipModel">取消</Button>
        </div>
    </Modal>
    <div>
        <Button type="primary" @click="submitEdit">提交编辑</Button>
        <Button type="ghost" style="margin-left: 8px" @click="openDeleteTipModel">删除设备组</Button>
    </div>
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
        openDeleteTipModel : function(){
            this.openDeleteTip = !this.openDeleteTip;
        },
        deleteEquipmentGroup:function(){
            console.log("formItem",this.formItem);
            this.openDeleteTipModel();
        },
        confirmDeleteGroup : function(){

            var sendMsg = {id : this.formItem.id}
             this.$http.delete('deleteDoorGroupInRelation', sendMsg).then((res)=>{
                this.$emit('closeGroupDetailModal');
                this.openDeleteTipModel();
                this.$Notice.success({
                    title: '删除成功',
                    desc: '删除设备组成功',
                    render: h => {
                        console.log("dklldfkldk")
                        return h('span', ['删除设备组成功'])
                    }
                });

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

        submitEdit:function(){
            console.log("formItem",this.formItem);
            var sendMsg = this.formItem;
            this.editDataReq(sendMsg);
        },
        editDataReq(sendMsg){
            this.$http.post('editDoorRelationshipData', sendMsg).then((res)=>{
                
               
                // var mapDataParam = {communityId : this.communityId}
                // this.getMapData(mapDataParam);
                this.$Notice.success({
                    title: '编辑成功',
                    desc: '编辑设备组成功',
                    render: h => {
                        console.log("dklldfkldk")
                        return h('span', ['编辑设备组成功'])
                    }
                });

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

</style>