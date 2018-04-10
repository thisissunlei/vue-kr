
<template>
	<div class="g-edit-label">
		<div v-show="readOrEdit">        
			<div v-show="!isEdit && labeType=='label'" >
				<div class="label-text">{{value}}</div>
				<span class="edit-icon" @click="editClick">
					<Icon class="icon-edit"></Icon>
				</span>
				
			</div>
			<div v-show="!isEdit && labeType=='file'">
				<img :src="item.url" alt="" v-for="(item, index ) in value" :key="item.id" @click="eyeImg(index)"/>
				<span class="edit-icon" @click="editClick">
					<Icon type="ios-compose-outline "></Icon>
				</span>
			</div>
			<div v-if="isEdit">
				<slot></slot>
				<div class="operation">
					
					
					<span @click="okClick" >
						<Icon class="icon-right"></Icon>
					</span>

					<span @click="cancelClick">
						<Icon  class="icon-error"></Icon>

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
			type:[Number,String,Array],
			default:''
		},
		labeType:{
			default:'label',
			type:String
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
			console.log('label')
			this.$emit('okClick')
			this.isEdit = !this.isEdit;
		},
		eyeImg(index){
			this.$emit('eyeImg',index);
		}
	},
	mounted(){
		console.log(this.labeType)
	}
}
</script>

<style lang="less" scoped>
.g-edit-label{
	display: inline-block;
	line-height: 34px;
	// padding:7px 12px 10px 0;
	max-width:75%;
	min-width: 55%;
	.edit-icon{
		display: inline;
		cursor: pointer;
		font-size: 13px;
	}
	.label-text{
		padding-right: 5px;
		display: inline;
		
	}
	.operation{
		display: inline-block;
		position: absolute;
		top: 50%;
		// height: 100%;
		transform:translateY(-50%);
		padding:0 6px;
		&>span{
			display: inline-block;
		}

	}
	.icon-error ,.icon-right{
		display: inline-block;
		line-height: 34px;
	}
	.icon-edit:before{
		color:#4A90E2;
	}
	.icon-error:before{
		color:#999;
		font-size: 16px;
	}
	.icon-right:before{
		color:#FF6868;
		font-size: 16px;
		padding-right:4px;

	}
	img{
		display: inline-block;
		width: auto;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
		vertical-align: middle;
		position: relative;
	}
}
</style>