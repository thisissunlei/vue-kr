<template>
	<div class="ui-kr-input">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
        >
            <Input
                :placeholder="placeholder"
                type="text"
                v-model="inputValue"
                @on-click="click"
                @on-enter="enter"
                @on-change="change"
                @on-focus="focus"
                @on-blur="blur"
                @on-keyup="keyup"
                @on-keydown="keydown"
                @on-keypress="keypress"
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
         recordClick(value){
            this.$emit('recordClick',value)
        },
		click(event){
            this.$emit('click',event);
        },
        enter(event){
            this.$emit('enter',event);
        },
        change(event){
         
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
        okClick(){
            this.labelValue = this.inputValue;
            this.$emit("okClick",this.labelValue)
        },
        cancelClick(event){
            this.inputValue = event
        }
	}
}
</script>

<style lang="less" scoped>
.ui-kr-input{
      position: relative;
    display: inline-block;
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