
<template>
	<div class="edit-label">
		<div v-if="readOrEdit">        
			<div v-if="!isEdit && labeType=='label'" >
				<div class="label-text">{{value}}</div>
				<span class="edit-icon" @click="editClick">
					<!-- <Icon type="ios-compose-outline "></Icon> -->
				</span>
				<span class="record-icon" @click="recordClick">
					<!-- <Icon type="ios-compose-outline "></Icon> -->
				</span>
				
			</div>
			<div v-if="!isEdit && labeType=='file'">
				<div v-if="!value || !value.length" class="to-upload">待上传</div>
				<img :src="item.url" alt="" v-for="(item, index ) in value" :key="item.id" @click="eyeImg(index)"/>
				<span class="edit-icon" @click="editClick">
					<!-- <Icon type="ios-compose-outline "></Icon> -->
				</span>
				<span class="record-icon" @click="recordClick">
					<!-- <Icon type="ios-compose-outline "></Icon> -->
				</span>
			</div>
			<div v-if="isEdit">
				<slot></slot>
				<div class="operation">
					<span class="kr-ui-x-icon" @click="cancelClick">
					
					</span>
					
					<span class="kr-ui-ok-icon" @click="okClick">
						
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
		recordClick(){
			this.$emit('recordClick',this.value)
		},
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
.edit-label{
	position: relative;
	display: inline-block;
	// background: red;
	.to-upload{
		width: 210px;
		height: 135px;
		background: #fff;
		line-height: 135px;
		text-align: center;
		color: #FF6868;
		font-size: 18px;
		border-radius: 4px 4px 0 4px 4px;
		margin: 30px 30px 10px;
	}
	.record-icon{
		background-image: url(./images/record.svg);
		background-size:100%; 
		background-repeat: no-repeat;
		position: absolute;
		right: -60px;
		width: 16px;
		height: 16px;
		top: 10px;
		line-height: 32px;
		cursor: pointer;
	}
	.edit-icon{
		background-image: url(./images/edit.svg);
		background-size:100%; 
		position: absolute;
		background-repeat: no-repeat;
		right: -30px;
		width: 16px;
		height: 16px;
		top: 10px;
		cursor: pointer;
	}
	.kr-ui-ok-icon,.kr-ui-x-icon{
		position: absolute;
		width: 16px;
		height: 16px;
		top: 10px;
		cursor: pointer;
	}
	.kr-ui-ok-icon{
		background-image: url(./images/ok.svg);
		background-repeat: no-repeat;		
		background-size:100%; 
		right:-30px;
	}
	.kr-ui-x-icon{
		background-image: url(./images/x.svg);
		background-repeat: no-repeat;
		background-size:100%; 
		right:-60px;
	}
	.label-text{
		padding-right: 20px;
		font-size: 14px;
	}
	.operation{
		position: absolute;
		top: 0px;
		right: 0px;
		line-height: 32px;

	}
	img{
		display: inline-block;
		width: auto;
		height: 135px;
		text-align: center;
		line-height: 135px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
		vertical-align: middle;
		position: relative;
		margin: 30px 30px 10px;		
	}
}
</style>