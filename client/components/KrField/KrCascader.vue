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
	},
	data(){
		return {
            isEdit:false,
            cityValue:[],
            labelValue:'',
            id:this.value,
		}
    },
    mounted(){
       
        this.labelValue=this.cityValue ? this.fnTreeId(this.value,this.data) : '';
        // console.log(this.cityValue,"pppppppp")
        this.cityValue = this.cityValue.reverse();
    },
	methods:{
        change(value){
            this.cityValue = value;
            this.labelValue=this.cityValue ? this.fnTreeId(value[2],this.data) : '';
            this.$emit('change',value);
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

