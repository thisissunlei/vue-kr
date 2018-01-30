<template>
	<div class="v-button" v-if="data.indexOf(checkAction)>-1" style="display:inline-block;">
        <Button  :type="type" @click="buttonClick"  :style="styles">{{label}}</Button>
    </div>
</template>

<script>
    export default {
        props:[
            "label",
            "type",
            "checkAction",
            "styles"
        ],
        data() {
        	return{
        	   data:[]
        	}
        },
        methods:{
            buttonClick(event){
                this.$emit('click',event);
            }
        },
        mounted:function(){
            var _this=this;
            setTimeout(function() {
                _this.data=window.resourcesCode||[];
            }, 200);
        }
    }
</script>