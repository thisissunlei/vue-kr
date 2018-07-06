
<template>
	<div class="ui-kr-time">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
            @recordClick="recordClick"
    :right="right"
        >
            <TimePicker 
                :open="open"
                v-model="timeValue"
                format="HH:mm"
                confirm
                :placeholder="placeholder"
                style="width: 168px"
                @on-change="change"
                @on-ok="sureClick"
                @on-clear="clearClick"
            >
               <a href="javascript:void(0)" @click="handleClick" class='time-pick-href'>
                    <Icon type="ios-clock-outline"></Icon>
                    <template v-if="timeValue === ''">{{labelValue}}</template>
                    <template v-else>{{ timeValue | dateFormat('HH:mm')}}</template>
               </a>
            </TimePicker>
        </EditLabel>
	</div>
</template>

<script>
import EditLabel from './EditLabel';
import dateUtils from 'vue-dateutils';

export default {
    components:{
        EditLabel,
    },
    props:{
        right:{
            
            type:String
        },
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
        type:{
            default:'time',
            type:String
        }
	},
	data(){
		return {
            isEdit:false,
            timeValue:this.value,
            labelValue:this.value,
            open:false
		}
    },
	methods:{
        recordClick(value){
            this.$emit('recordClick',value)
        },
        handleClick(){
            this.open = !this.open;
        },
        change(value){
            this.$emit('change',value);
        },
        sureClick(){
            this.open = false;
        },
        clearClick(){
            this.timeValue=this.labelValue;
            this.open = false;
        },
        okClick(){
            this.labelValue =this.timeValue?dateUtils.dateToStr("HH:mm",new Date(this.timeValue)):'';
            this.$emit("okClick",this.labelValue)
        },
        cancelClick(event){
            this.timeValue = event
        }
	}
}
</script>

<style lang="less" scoped>
.ui-kr-time{
      position: relative;
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
    .time-pick-href{
        width:100%;
        display:inline-block;
        border: 1px solid #dddee1;
        padding:8px 5px;
        border-radius:4px;
    }
}
</style>