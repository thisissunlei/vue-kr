
<template>
  <div>
   
        <KrInput
            v-if="type==='text'"
            :name="name"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :right="right"
            :readOrEdit="readOrEdit"
            @on-click="click"
            @on-enter="enter"
            @change="change"
            @on-focus="focus"
            @on-blur="blur"
            @on-keyup="keyup"
            @on-keydown="keydown"
            @on-keypress="keypress"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />

        <KrSelect
            v-if="type==='select'"
            :value="value"
            :name="name"
            :right="right"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :disabled='disabled'
            :selectParam="selectParam"
            :clearable='clearable'
            :filterable='filterable'
            @change="selectChange"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />

        <KrDate
            v-if="type==='date'"
            :value="value"
            :right="right"
            :name="name"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :format="format"
            @change="selectChange"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />

        <KrTimeDate
            v-if="type==='datetime'"
            :value="value"
            :right="right"
            :name="name"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :format="format"
            @change="selectChange"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />

        <KrTime
            v-if="type==='time'"
            :value="value"
            :right="right"
            :name="name"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            @change="selectChange"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />

        <KrTextarea
            v-if="type==='textarea'"
            :value="value"
            :right="right"
            :name="name"
            :placeholder="placeholder"
            :type='type'
            :maxLength="maxLength"
            :readOrEdit="readOrEdit"
            @change="selectChange"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />


        <KrCascader
            v-if="type==='cascader'"
            :width="width"
            :right="right"
            :data="data"
            :name="name"
            :value="value"
            :mask="mask"
            :clearable='clearable'
            :placeholder="placeholder"
            :readOrEdit="readOrEdit"
            @change="change"
            @recordClick="recordClick"
            @visibleChange="visibleChange"
            @okClick="okClick"
            :isOk="isOk"
            :inline="inline"
        />
        
         <KrCity
            v-if="type==='city'"
            :data="data"
            :right="right"
            :name="name"
            :value="value"
            :mask="mask"
            :clearable='clearable'
            :placeholder="placeholder"
            :readOrEdit="readOrEdit"
            @change="change"
            @recordClick="recordClick"
            @visibleChange="visibleChange"
            @okClick="okClick"
            :isOk="isOk"
        />

        <SelectTree 
            v-if="type==='selectTree'"
            :data = 'data'
            :right="right"
            @checkChange="checkChange"
            @okClick="okClick"
            :treeIds="treeIds"
            :inputWidth="inputWidth"
        />
        <UpFiles 
            v-if="type==='upFiles'"  
            :readOrEdit="readOrEdit" 
            :right="right"
            :value = 'value'
            :name="name"
            @okClick="okClick"
            @recordClick="recordClick"
            :isOk="isOk"
        />
        <UpImage 
            v-if="type==='upImage'"  
            :readOrEdit="readOrEdit" 
            :value = 'value'
            :right="right"
            :name="name"
            @okClick="okClick"
            @recordClick="recordClick"
        />
       
  </div>
</template>

<script>
import KrCascader from './KrCascader';
import KrCity from './KrCity';
import SelectTree from './SelectTree';
import KrInput from './KrInput';
import KrSelect from './KrSelect';
import KrDate from './KrDate';
import KrTime from './KrTime';
import KrTimeDate from './KrTimeDate';
import KrTextarea from './KrTextarea';
import UpFiles from './UpFiles';
import UpImage from './UpImage'
export default {
    components:{
      KrCascader,
      SelectTree,
      KrInput,
      KrSelect,
      KrDate,
      KrTime,
      KrTextarea,
      UpFiles,
      KrTimeDate,
      UpImage,
      KrCity
    },
    props:{
        isOk:{
            type:Boolean,
            default:true,
        },
        label:{
            default:'',
            type:String
        },
        name:{
            type:String
        },
        value:{
			type:[Number,String,Array],
            default:''
        },
        form:{
            type:String,
            default:''
        },
        inputWidth:{
            type:[String,Number]
        },
        prop:{
            default:'',
            type:String
        },
        type:{
            default:'text',
            type:String
        },
        placeholder:{
            default:'请输入内容...',
            type:String
        },
        maxLength:{
            Number
        },
        format:{
            default:'yyyy-MM-dd',
            type:String
        },
        timeFormat:{
            default:'HH:mm',
            type:String
        },
        dateTimeFormat:{
            default:'yyyy-MM-dd HH:mm',
            type:String
        },
        disabled:{
            default:false,
            type:Boolean
        },
        mask:{
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
        labelWidth:{
            type:Number
        },
        showMessage:{
            default:true,
            type:Boolean
        },
        data:{
          type:Array
        },
        readOrEdit:{
            type:Boolean,
            default:false
        },
        treeIds:{
            default:'',
            type:String
        },
        selectParam:{
            default:'',
            type:String
        },
        width:{
            default:250,
            type:[String,Number]
        },
        inline:{
            default:false,
            type:Boolean
        },
        right:{
            default:'READWRITE',
            type:String
        }
    },
    data(){
        return {
           
        }
    },
    mounted(){
       
    },
    methods:{
        recordClick(value){
            this.$emit('recordClick',value,this.name)
        },
        click(event){
            this.$emit('click',event);
        },
        enter(event){
            this.$emit('enter',event);
        },
        change(event){
         
            this.$emit('change',event);
        },
       
        focus(event){
            this.$emit('focus',event);
        },
        blur(event){
            this.$emit('blur',event);
        },
        keyup(event){
            this.$emit('keyup',event);
        },
        keydown(event){
            this.$emit('keydown',event);
        },
        keypress(event){
            this.$emit('keypress',event);
        },
        visibleChange(event){
            this.$emit('visibleChange',event);
        },

        selectChange(event){
            this.$emit('selectChange',event);
        },
        selectClick(value){

            this.$emit('selectClick',value);
        },
        checkChange(event){
            this.$emit('checkChange',event);
        },
        toggleExpand(event){
            this.$emit("toggleChange",event)
        },
        okClick(event){
            this.$emit("okClick",event);
        },
        radioChange(event){
            this.$emit("radioChange",event)
        },
      
    }
}
</script>
