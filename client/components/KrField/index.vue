
<template>
  <div>
    <FormItem
        :label="label"
        :prop="prop"
        :label-width="labelWidth"
        :showMessage="showMessage"
    >
        <KrInput
            v-if="type==='text'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            @on-click="click"
            @on-enter="enter"
            @on-change="change"
            @on-focus="focus"
            @on-blur="blur"
            @on-keyup="keyup"
            @on-keydown="keydown"
            @on-keypress="keypress"
            @okClick="okClick"
        />

        <KrSelect
            v-if="type==='select'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :disabled='disabled'
            :clearable='clearable'
            :filterable='filterable'
            :selectData="selectData"
            @change="selectChange"
            @okClick="okClick"
        />

        <KrDate
            v-if="type==='date'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :format="format"
            @change="selectChange"
            @okClick="okClick"
        />

        <KrTimeDate
            v-if="type==='datetime'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :format="format"
            @change="selectChange"
            @okClick="okClick"
        />

        <KrTime
            v-if="type==='time'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            @change="selectChange"
            @okClick="okClick"
        />

        <KrTextarea
            v-if="type==='textarea'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :maxLength="maxLength"
            :readOrEdit="readOrEdit"
            @change="selectChange"
            @okClick="okClick"
        />


        <KrCascader
            v-if="type==='cascader'"
            :data="data"
            :value="value"
            :mask="mask"
            :clearable='clearable'
            :placeholder="placeholder"
            :readOrEdit="readOrEdit"
            @change="change"
            @visibleChange="visibleChange"
            @okClick="okClick"
        />


        <SelectTree 
            v-if="type==='selectTree'"
            :data = 'data'
            @checkChange="checkChange"
            @okClick="okClick"
            :treeIds="treeIds"
        />
        <UpFiles 
            v-if="type==='upFiles'"  
            :readOrEdit="readOrEdit" 
            :value = 'value'
            @okClick="okClick"
        />
    </FormItem>
  </div>
</template>

<script>
import KrCascader from './KrCascader';
import SelectTree from './SelectTree';
import KrInput from './KrInput';
import KrSelect from './KrSelect';
import KrDate from './KrDate';
import KrTime from './KrTime';
import KrTimeDate from './KrTimeDate';
import KrTextarea from './KrTextarea';
import UpFiles from './UpFiles';

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
      KrTimeDate
    },
    props:{
        label:{
            default:'',
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
        selectData:{
            type:Array
        },
        treeIds:{
            default:'',
            type:String
        }
    },
    data(){
        return {
           
        }
    },
    methods:{
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
