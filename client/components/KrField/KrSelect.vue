
<template>
	<div class="ui-kr-select">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
            @recordClick="recordClick"
            :isOk="isOk"        
        >
            <Select
                :placeholder="placeholder"
                :type="type"
                v-model="selectValue"
                :disabled='disabled'
                :clearable='clearable'
                :filterable='filterable'
                @on-change="change"
                style="width:252px;"
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
        isOk:{
            type:Boolean,
            default:true,
        },
        name:{
            type:String
        },
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
        selectParam:{
            type:String
        }
	},
	data(){
		return {
            isEdit:false,
            selectValue:this.value,
            labelValue:'',
            id:this.value,
            selectData:[]
		}
    },
    mounted(){
        this.getSelectData(this.selectParam,()=>{
            this.getLabel(this.selectValue);
        });
    },
	methods:{
        getSelectData(value,callback){
            this.$http.get('get-enum-all-data',{
                enmuKey:value
            }).then((response)=>{
                this.selectData = [].concat(this.selectFormat(response.data))
                callback();
            }).catch((error)=>{
                // this.MessageType="error";
                // this.openMessage=true;
                // this.warn=error.message;
            })
        },
        selectFormat(data){
            var dataArr =  data.map((item)=>{

                item.label = item.desc;
                item.t_id = item.code;
                return item;
            })
            return [].concat(dataArr);
        },
        recordClick(value){
            this.$emit('recordClick',value)
        },
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

            var params = {
                name:this.name,
                value:this.selectValue,
                type:'select',

            }
            this.$emit("okClick",params,{value:this.selectValue,label:this.labelValue});
            this.id=this.selectValue;
        },
        cancelClick(event){
            this.selectValue=this.id;
        }
	}
}
</script>

<style lang="less" >
.ui-kr-select{
    position: relative;
    height:40px;
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