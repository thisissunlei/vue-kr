
<template>
	<div class="edit-label">
		<div v-if="readOrEdit">        
			<div v-if="!isEdit">
				<div class="label-text">{{value}}</div>
				<span class="edit-icon" @click="editClick">
					<Icon type="ios-compose-outline "></Icon>
				</span>
				
			</div>
			<div v-if="isEdit">
				<slot></slot>
				<div class="operation">
					<span @click="cancelClick">
						<Icon type="close-round"></Icon>
					</span>
					
					<span @click="okClick">
						<Icon type="checkmark-round"></Icon>
					</span>
					
				</div>
				
				
			</div>
		</div>
		<div v-if="!readOrEdit">
			<slot></slot>
		</div>
		
	</div>
</template>

<script>
export default {
    props:{
        readOrEdit:{
            type:Boolean,
            default:false,
		},
		value:{
			type:[Number,String],
			default:''
		}
	},
	data(){
		return {
			isEdit:false,
		}
	},
	methods:{
		editClick(){
			this.isEdit = !this.isEdit;
			
		},
		cancelClick(){
			this.$emit('cancelClick',this.value)
			this.isEdit = !this.isEdit;
		},
		okClick(){
			this.$emit('okClick')
			this.isEdit = !this.isEdit;
		}
	}
}
</script>

<style lang="less" scoped>
.edit-label{
	.edit-icon{
		
		position: absolute;
		right: 0;
		top: 0px;
		line-height: 32px;
		cursor: pointer;
	}
	.label-text{
		padding-right: 20px;
	}
	.operation{
		position: absolute;
		top: 0px;
		right: 0px;
		line-height: 32px;

	}
}
</style>