
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
            @okClick="selectClick"
        />

        <KrDate
            v-if="type==='date'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            :format="format"
            @change="selectChange"
            @okClick="selectClick"
        />

        <KrTime
            v-if="type==='time'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :readOrEdit="readOrEdit"
            @change="selectChange"
            @okClick="selectClick"
        />

        <KrTextarea
            v-if="type==='textarea'"
            :value="value"
            :placeholder="placeholder"
            :type='type'
            :maxLength="maxLength"
            :readOrEdit="readOrEdit"
            @change="selectChange"
            @okClick="selectClick"
        />


        <KrCascader
            v-if="type==='city'"
            :data="data"
            :value="cityValue"
            :clearable='clearable'
            :placeholder="placeholder"
            :readOrEdit="readOrEdit"
            @change="change"
            @visibleChange="visibleChange"
        />


        <SelectTree 
            v-if="type==='selectTree'"
            :data = 'data'
            @selectChange="selectChange"
            @checkChange="checkChange"
            @toggleChange="toggleExpand"
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
import KrTextarea from './KrTextarea';

export default {
    components:{
      KrCascader,
      SelectTree,
      KrInput,
      KrSelect,
      KrDate,
      KrTime,
      KrTextarea
    },
    props:{
        label:{
            default:'',
            type:String
        },
        cityValue:{
            type:Array
        },
        value:{
			type:[Number,String],
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
        }
    },
    data(){
        return {
           
        }
    },
    watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                   console.log('----',nextProps);
                }
            }
    },
    methods:{
        showField(type){
            switch (type) {
                case "text":
                    return true

                default:
                    return false

            }

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
            console.log('ev',event);
            this.$emit('selectChange',event);
        },
        selectClick(value){
            console.log('selectClick',value);
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
        }
    }
}
</script>
