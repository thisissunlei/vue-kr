<template>
	<div class="ui-kr-city">
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
                style="width:252px;"
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
        name:{
            type:String
        },
        placeholder:{
            type:String,
            default:'请输入...',
        },
		value:{
            default:'',
			type:[Number,String,Array]
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
            cityValue:this.strToArr(this.value),
            labelValue:'',
            id:this.value,
            t_id:0,
            newValue:this.strToArr(this.value),
		}
    },
    mounted(){
        if(this.mask){
            this.labelValue="";
            this.cityValue='';
        }  
        this.labelValue= this.getProvince(this.cityValue,this.data);
    },
	methods:{
        strToArr(value){
            if(!value){
                return [];
            }else{
                return value.split(',');
            }
        },
        recordClick(value){
            
            this.$emit('recordClick',value)
        },
        change(value){
           
            this.$emit('change',value);
            this.newValue = [].concat(value);
        },
       
        //获取省
        getProvince(values,data){
            var children = [];
            var str = '';
            for(var i=0;i<data.length;i++){
                if(data[i].id == values[0]){
                    children = [].concat(data[i].children);
                    str += data[i].label;
                    break;
                }
            }

            return str +=this.getCity(values,children);
        },
        getCity(values,data){
            var children = [];
            var str = '';
            for(var i=0;i<data.length;i++){
                if(data[i].id == values[1]){
                    children = [].concat(data[i].children);
                    str += '/' + data[i].label;
                    break;
                }
            }
            return str += this.getCounty(values,children);
        },
        getCounty(values,data){
            var str= '';
            var children = [];
            for(var i=0;i<data.length;i++){
                if(data[i].id == values[2]){
                    return str += '/' + data[i].label;
                    break;
                }
            }

        },
        visibleChange(event){
            this.$emit('visibleChange',event)
        },
        okClick(){
            this.cityValue = this.newValue;
            this.labelValue = this.getProvince(this.cityValue,this.data);
            var cityValue = this.cityValue.join();
            var params = {
                name:this.name,
                value:cityValue,
                type:'cascader',
            }
            this.$emit("okClick",params);
        },
        cancelClick(event){
            this.cityValue=this.id;
        }
	}
}
</script>

<style lang="less" scoped>
.ui-kr-city{
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

