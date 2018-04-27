
<template>
	<div class="edit-label">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
        >
            <Input
                v-model="areaValue"
                :maxlength="maxLength"
                :placeholder="placeholder"
                :type="type"
                @on-click="click"
                @on-enter="enter"
                @on-change="change"
                @on-focus="focus"
                @on-blur="blur"
                @on-keyup="keyup"
                @on-keydown="keydown"
                @on-keypress="keypress"
            />
            <div style="text-align:right">
                {{areaValue?areaValue.length+"/"+maxLength:0+"/"+maxLength}}
            </div>
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
        maxLength:{
            Number
        },
        type:{
            default:'textarea',
            type:String
        }
	},
	data(){
		return {
            isEdit:false,
            areaValue:this.value,
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
            this.labelValue = this.areaValue;
            this.$emit("okClick",this.labelValue)
        },
        cancelClick(event){
            this.areaValue = event
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