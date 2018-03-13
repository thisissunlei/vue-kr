
<template>
	<div class="edit-label">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
        >
            <Select
                :placeholder="placeholder"
                :type="type"
                v-model="selectValue"
                :disabled='disabled'
                :clearable='clearable'
                :filterable='filterable'
                @on-change="change"
            >
            <Option v-for="item in selectData" :value="''+item.value" :key="item.value">{{ item.label}}</Option>
        </Select>
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
			type:String,
            default:''
        },
        readOrEdit:{
            type:Boolean,
            default:false,
        },
        type:{
            default:'text',
            type:String
        },
        disabled:{
            default:false,
            type:Boolean
        },
        clearable:{
            default:true,
            type:Boolean
        },
        filterable:{
            default:false,
            type:Boolean
        },
        selectData:{
            type:Array
        }
	},
	data(){
		return {
            isEdit:false,
            selectValue:this.value,
            labelValue:'',
            id:this.value
		}
    },
    mounted(){
      this.getLabel(this.selectValue); 
    },
	methods:{
        getLabel(value){
            var label='';
            this.selectData.map((item,index)=>{
                    if(item.value==value){
                        label=item.label;
                    }
            })
            this.labelValue=label;
        },
        change(value){
            this.$emit('change',value);
        },
        okClick(){
            this.getLabel(this.selectValue);
            this.$emit("okClick",this.labelValue,this.selectValue);
            this.id=this.selectValue;
        },
        cancelClick(event){
            this.selectValue=this.id;
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