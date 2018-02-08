<template>
  <div class="joker-input" :class="{'joker-input-active':isFocus}">
    <div class="show-text">{{this.inputText}}<span :class="[jokerCursor,isFocus?jokerWatch:jokerNo]"></span></div>
    <Input 
        v-model="name.serialNumber"
        type="password" 
        @on-blur="inputBlur" 
        @on-change="inputChange" 
        :autofocus="isFocus" 
        @on-focus="inputFocus"
        @keyup.enter.native="onKeyEnter($event)"
     />  
  </div>
</template>

<script>
 export default {
   props:{
       autoFocus:Boolean,
       styles:String,
       name:Object
   },
   data(){
        return {
            inputText:'',
            isFocus:false,
            jokerWatch:'joker-watch',
            jokerCursor:'joker-cursor',
            jokerNo:'joker-no'
        }
   },
   watch: {
          $props: {
                deep: true,
                handler(nextProps) {
                    this.inputText=nextProps.name.serialNumber
                }
          }
    },
   mounted(){
       this.isFocus = true;
   },
   methods:{
     onKeyEnter(ev){
        this.$emit('onEnter',ev)
     },
     inputChange(ev){
        this.$emit('onChange',ev)
        this.inputText = event.target.value;
     },
     inputFocus(event){
         this.isFocus = true;
     },
     inputBlur(event){
         this.isFocus = false;
     },
     getInputClass(){
        return this.isFocus ? 'joker-input joker-input-active' : 'joker-input';
     }
   }
 }
</script>

<style lang="less" >
.joker-input {
    width:400px;
    height:36px;
    line-height:26px;
    overflow: hidden;
    position: relative;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    display:inline-block;
    vertical-align: middle;
    .ivu-input{
        opacity: 0;
        height:35px;
    }
    .show-text{
            position: absolute;
            width: 100%;
            text-align: left;
            top: 0px;
            left: 0px;
            display: inline-block;
            bottom:0;
            padding: 4px 7px;
            font-size: 12px;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            cursor: text;
        .joker-cursor{
            animation: blink 1s infinite steps(1, start);
            display: inline-block;
            height: 20px;
            width: 1px;
            background: #000;
            vertical-align: middle;
            opacity:1;
        }
        .joker-watch{
            opacity:1;
        }
        .joker-no{
            opacity:0;
        }
    }
    
   
    @keyframes blink {
        0%, 100% {
            background-color: #000;
            color: #aaa;
        }
        50% {
            background-color: #fff; /* not #aaa because it's seem there is Google Chrome bug */
            color: #000;
        }
    }
}
.joker-input-active{
    border-color: #57a3f3;
     outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    box-shadow: 0 0 0 2px rgba(45,140,240,.2);
}
.joker-input:hover {
    border-color: #57a3f3;
   
}
.joker-input:focus {
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    box-shadow: 0 0 0 2px rgba(45,140,240,.2);
}

</style>
