
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
    </FormItem>
  </div>
</template>

<script>
export default {

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

    }
}
</script>