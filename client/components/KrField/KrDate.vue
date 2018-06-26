
<template>
	<div class="ui-kr-date">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
            @recordClick="recordClick"
            :isOk="isOk"
            :right="right"
        >
            <DatePicker 
                v-model="dateValue"
                :type="type"
                :placeholder="placeholder"
                :format="format"
                @on-change="change"
                style="width:252px;"

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
        right:{
            type:String,
        },
        isOk:{
            type:Boolean,
            default:true,
        },
        placeholder:{
            type:String,
            default:'请输入...',
		},
		value:{
			type:[Number,String],
            default:''
        },
        name:{
            type:String
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
            
            var params = {
                name:this.name,
                value:this.labelValue+ '00:00:00',
                type:'date',

            }
            this.$emit("okClick",params)
        },
        cancelClick(event){
            this.dateValue = event
        }
	}
}
</script>

<style lang="less">
.ui-kr-date{
      position: relative;
    .edit-label{
        height:40px;
    }
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