<template>
	<div class="edit-label">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
        >
            <Cascader
                :data="data"
                v-model="cityValue"
                :placeholder="placeholder"
                :clearable='clearable'
                @on-change="change"
                @on-visible-change="visibleChange"
            />
        </EditLabel>
	</div>
</template>

<script>
import EditLabel from './EditLabel';
import cityData from './data/cityData.json';

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
			type:Array
        },
        readOrEdit:{
            type:Boolean,
            default:false,
        },
        clearable:{
            default:true,
            type:Boolean
        },
        data:{
          default:()=>cityData,
          type:Array
        },
	},
	data(){
		return {
            isEdit:false,
            cityValue:this.value,
            labelValue:'',
            id:this.value
		}
    },
    mounted(){
        this.labelValue=(this.cityValue&&this.cityValue.length)?this.fnTreeId(this.cityValue[this.cityValue.length-1],cityData):'';
    },
	methods:{
        change(value){
            this.$emit('change',value);
        },
        fnTreeId(id,data){	
            var cityLable = '';
            for(var i=0;i<data.length;i++){		
                let item = data[i];
                cityLable = item.label;
                if(!item.children && item.value == id ){
                        this.key = item.value;
                        cityLable = item.label;
                        return cityLable;
                }else{
                    if(item.children){
                        let text = this.fnTreeId(id,item.children);
                        if(text){
                            return cityLable+='/'+text;
                        }
                        
                    }	
                }
            }
            return false;
        },
        visibleChange(event){
            this.$emit('visibleChange',event)
        },
        okClick(){
            this.labelValue =this.labelValue=(this.cityValue&&this.cityValue.length)?this.fnTreeId(this.cityValue[this.cityValue.length-1],cityData):'';
            this.$emit("okClick",this.labelValue,this.cityValue);
            this.id=this.cityValue;
        },
        cancelClick(event){
            this.cityValue=this.id;
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
    .time-pick-href{
        width:100%;
        display:inline-block;
        border: 1px solid #dddee1;
        padding:8px 5px;
        border-radius:4px;
    }
}
</style>

