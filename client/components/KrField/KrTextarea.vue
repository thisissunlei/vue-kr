
<template>
	<div class="edit-label-text">
        
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
        >
            <div class="text-area-content">
                <Input
                    v-model="areaValue"
                    :maxlength="maxLength"
                    :placeholder="placeholder"
                    type="textarea"
                    @on-click="click"
                    @on-enter="enter"
                    @on-change="change"
                    @on-focus="focus"
                    @on-blur="blur"
                    @on-keyup="keyup"
                    @on-keydown="keydown"
                    @on-keypress="keypress"
                    :rows="rows"
                />
                <div style="text-align:right">
                    {{areaValue?areaValue.length+"/"+maxLength:0+"/"+maxLength}}
                </div>
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
            rows:4,
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

<style lang="less" >
.edit-label-text{
    .g-edit-label{
        line-height: 20px;
        padding:7px 12px 10px 0;
        .operation{
            top:40px;
            transform:translateY(0);
        }
    }

    .text-area-content{
        position: relative;
        display: inline-block;
        width: 100%;
        min-width:300px;
    }
}
</style>