<template>
	<div class="edit-label">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
        >
            <Input
                :placeholder="placeholder"
                type="text"
                size='default'
                v-model="labelValue"
                name='name'
                @on-click="click"
                @on-enter="enter"
                @on-change="change"
                @on-focus="focus"
                @on-blur="blur"
                @on-keyup="keyup"
                @on-keydown="keydown"
                @on-keypress="keypress"
                class="input-class"
            />
        </EditLabel>
	</div>
</template>

<script>
import EditLabel from './EditLabel';
export default {
    components:{
        EditLabel,
    },
    props:{
        placeholder:{
            type:String,
            default:'请输入...',
		},
		value:{
			type:[Number,String],
			default:''
        },
        name:{
            type:String,
            default:''
        },

        readOrEdit:{
            type:Boolean,
            default:false,
		},
	},
	data(){
		return {
            isEdit:false,
            inputValue:this.value,
            labelValue:this.value,
		}
	},
	methods:{
		click(event){
            this.$emit('click',event);
        },
        enter(event){
            this.$emit('enter',event);
        },
        change(event){
            console.log('=====change',event)
            this.$emit('change',event);
        },
        focus(event){
            this.$emit('focus',event);
        },
        blur(event){
            this.$emit('blur',event);
        },
        keyup(event){
            this.$emit('keyup',event);
        },
        keydown(event){
            this.$emit('keydown',event);
        },
        keypress(event){
            this.$emit('keypress',event);
        },
        okClick(event){
            console.log('okClick--',event)
            console.log('labelValue--',this.labelValue)
            console.log('inputValue--',this.inputValue)
            this.inputValue = this.labelValue;
            console.log('krInput=======>',this.labelValue)
            this.$emit("submitClick",this.labelValue)
        },
        cancelClick(event){
            this.labelValue = this.inputValue;

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
    .edit-label .input-class{
        width:170px;

    }
}
</style>