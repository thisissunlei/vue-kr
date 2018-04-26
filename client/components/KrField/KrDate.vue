
<template>
	<div class="ui-kr-date">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
            @recordClick="recordClick"
        >
            <DatePicker 
                v-model="dateValue"
                :type="type"
                :placeholder="placeholder"
                :format="format"
                @on-change="change"
            />
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
            default:'date',
            type:String
        },
        format:{
          type:String,
          default:'yyyy-MM-dd'  
        }
	},
	data(){
		return {
            isEdit:false,
            dateValue:this.value,
            labelValue:this.value
		}
    },
	methods:{
        recordClick(value){
            this.$emit('recordClick',value)
        },
        change(value){
            this.$emit('change',value);
        },
        okClick(){
            this.labelValue = this.dateValue?dateUtils.dateToStr("YYYY-MM-DD",new Date(this.dateValue)):'';
            this.$emit("okClick",this.labelValue)
        },
        cancelClick(event){
            this.dateValue = event
        }
	}
}
</script>

<style lang="less" scoped>
.ui-kr-date{
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
}
</style>