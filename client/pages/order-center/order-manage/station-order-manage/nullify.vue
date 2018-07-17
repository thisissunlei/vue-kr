<template>
	<div class='nullifyform'>
		<Form ref="formItem" :model="formItem" :rules="rules" :label-width="80">
			<p style="color:red">订单生效前，除客户基本信息以外的信息都可进行编辑</p>
			<p class='required-label'>如真的需要作废请选择作废原因：</p>
			<Select v-model="formItem.select">
				<Option :value="item.value" v-for="(item,index ) in optionList" :key="index">{{item.desc}}</Option>
			</Select>
			<p>备注：</p>
			<Input class='input' v-model="formItem.input" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入作废理由" />

			<div class='buttonContainer'>

				<Button type="primary" @click="handleSubmit('formItem')">确认</Button>
				<Button type="ghost" style="margin-left: 8px" @click="handleCancel">取消</Button>
			</div>

		</Form>
	</div>
</template>

<script>
export default {
	
	data() {
		return {
			formItem: {
				input: "",
				select: ""
			},
			rules: {
				select: [
					{ required: true, message: '请选择作废类型', trigger: 'blur' }
				],
				input: [
					{ required: true, message: '请输入作废理由', trigger: 'blur' },
					{ type: 'string', max: 250, message: '长度不能超过250！', trigger: 'blur' }
				]
			},
			optionList: [
				{ value: "beijing", label: "北京" },
				{ value: "beijing1", label: "北京1" },
				{ value: "beijing2", label: "北京2" }
			]
		};
	},
	mounted() {
		this.getOptionList()
	},
	methods: {
		getOptionList() {
			let params = {
					enmuKey: 'com.krspace.op.api.enums.seatorder.InvalidType',
					// enmuKey: 'com.krspace.erp.api.enums.pm.PmDepartment'
				};
			this.$http.post("get-enum-all-data", params).then(response => {
			this.optionList = response.data;
			}).catch(error => {
				this.$Notice.error({
					title: error.message
				});
			});
			
		},
		handleCancel() {
			this.$emit('closeModalForm');
		},
		handleSubmit(name) {
		
			let params = {
				id: this.id,
				invalidType: this.formItem.select,
				remark: this.formItem.input
			};
			this.$http.post("join-nullify", params).then(response => {
			
				this.formItem.select = '';
				this.formItem.input = '';
				this.$emit('refershList', { id: params.id });
			}).catch(error => {
				// this.openMessage = true;
				// this.MessageType = "error";
				// this.warn = error.message;
					this.$Notice.error({
						title: error.message
					});
				// this.formItem.select = '';
				// this.formItem.input = '';
			});
		}
	}
   
}
</script>

<style lang='less'>
p {
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
}
.input {
    margin-bottom: 20px;
}
.nullifyform {
    padding: 5px 30px 5px 30px;
    font-size: 14px;
    text-align: left;
}
.buttonContainer {
    text-align: center;
}
.required-label {
    // padding:10px 0;
    font-size: 14px;
    position: relative;
    margin-left: 5px;
    &&:before {
        content: "*";
        color: red;
        position: absolute;
        font-size: 18px;
        left: -7px;
        top: 2px;
    }
}
</style>  