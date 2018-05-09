<template>
	<div class="ui-kr-cascader">
        <EditLabel 
            :readOrEdit="readOrEdit" 
            :value="labelValue"
            @okClick="okClick"
            @cancelClick="cancelClick"
            @recordClick="recordClick"
        >
            <Cascader
                :data="data"
                v-model="cityValue"
                :placeholder="placeholder"
                :clearable='clearable'
                @on-change="change"
                @on-visible-change="visibleChange"
                style="width:250px;"
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
            default:'',
			type:[Number,String]
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
        mask:{
            default:false,
            type:Boolean
        },
	},
	data(){
		return {
            isEdit:false,
            cityValue:[],
            labelValue:'',
            id:this.value,
            t_id:0
		}
    },
    mounted(){
        if(this.mask){
            this.labelValue="";
            this.cityValue='';
        }  
        this.labelValue=this.cityValue ? this.fnTreeId(this.value,this.data) : '';
        this.cityValue = this.cityValue.reverse();
    },
	methods:{
        recordClick(value){
            
            this.$emit('recordClick',value)
        },
        change(value){
            this.labelValue=(value&&value.length) ? this.fnTreeId(value[2],this.data) : '';
            this.$emit('change',value);
            this.cityValue = value;
        },
        fnTreeId(id,data){	
            var cityLable = '';
            for(var i=0;i<data.length;i++){		
                let item = data[i];
                cityLable = item.label;
                if(item.t_id == id ){
                        cityLable = item.label;
                        this.cityValue.push(item.value)
                        return cityLable;
                }else{
                    if(item.children){
                        let text = this.fnTreeId(id,item.children);
                        if(text){
                            this.cityValue.push(item.value)
                            
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
           
            this.$emit("okClick",this.value);
            this.id=this.cityValue;
        },
        cancelClick(event){
            this.cityValue=this.id;
        }
	}
}
</script>

<style lang="less" scoped>
.ui-kr-cascader{
    position: relative;
    height: 40px;
    .edit-label{
       height: 40px;
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
    .time-pick-href{
        width:100%;
        display:inline-block;
        border: 1px solid #dddee1;
        padding:8px 5px;
        border-radius:4px;
    }
}
</style>

