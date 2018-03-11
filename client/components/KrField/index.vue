
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
        <KrCascader
            v-if="type==='cascader'"
            :data="data"
            @on-change="change"
            @visible-change="visibleChange"
        />
    </FormItem>
  </div>
</template>

<script>
import KrCascader from './KrCascader';
export default {
    components:{
      KrCascader
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
        labelWidth:{
            type:Number
        },
        showMessage:{
            default:true,
            type:Boolean
        },
        data:{
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
            console.log(cityData,"ooooooo")
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
        }
    }
}
</script>
