
<template>
  <div>
    <FormItem
        :label="label"
        :prop="prop"
        :label-width="labelWidth"
        :showMessage="showMessage"
    >
        <Input
            v-if="type==='text'"
            :model="value"
            :placeholder="placeholder"
            :type='type'

            @on-click="click"
            @on-enter="enter"
            @on-change="change"
            @on-focus="focus"
            @on-blur="blur"
            @on-keyup="keyup"
            @on-keydown="keydown"
            @on-keypress="keypress"
        />
        <Select
            v-if="type==='select'"
            :model="value"
            :placeholder="placeholder"
            :disabled='disabled'
            :clearable='clearable'
            :filterable='filterable'
            @on-change="selChange"
        >
          <Option v-for="item in selectData" :value="''+item.value" :key="item.value">{{ item.label}}</Option>
        </Select>
        <KrCascader
            v-if="type==='cascader'"
            :data="data"
            @on-change="change"
            @visible-change="visibleChange"
        />
        <SelectTree 
            v-if="type==='selectTree'"
            :data = 'data'
            @selectChange="selectChange"
            @checkChange="checkChange"
            @toggleChange="toggleChange"
        />
    </FormItem>
  </div>
</template>

<script>
import KrCascader from './KrCascader';
import SelectTree from './SelectTree';
export default {
    components:{
      KrCascader,
      SelectTree
    },
    props:{
        label:{
            default:'',
            type:String
        },
        value:{
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
        selectData:{
            type:Array
        }
    },
    data(){
        return {

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
        selChange(value){
            this.$emit('change',value);
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
        checkChange(event){
            this.$emit('checkChange',event);
        },
        toggleChange(event){
            this.$emit("toggleChange",event)
        }
    }
}
</script>
