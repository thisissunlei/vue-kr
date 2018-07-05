
<template>
	<div class="ui-kr-time-date">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
            @recordClick="recordClick"
   :right="right"
        >
            <DatePicker 
                :open="open"
                v-model="timeValue"
                format="yyyy-MM-dd HH:mm"
                :type="type"
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
                    <template v-else>{{ timeValue | dateFormat('yyyy-MM-dd HH:mm')}}</template>
               </a>
            </DatePicker>
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
            default:'READWRITE',
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
            default:'datetime',
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
            this.labelValue =this.timeValue?dateUtils.dateToStr("yyyy-MM-dd HH:mm:ss",new Date(this.timeValue)):'';
            this.$emit("okClick",this.labelValue)
        },
        cancelClick(event){
            this.timeValue = event
        }
	}
}
</script>

<style lang="less" scoped>
.ui-kr-time-date{
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