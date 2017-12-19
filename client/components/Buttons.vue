<template>
	<div class='v-button' v-if="data.indexOf(checkAction)>-1" style='display:inline-block;'>

        <div v-if="type=='primary'">
            <Button  type='primary' @click="buttonClick">{{label}}</Button>
        </div>
        <div v-else-if="type=='ghost'">
            <Button  type='ghost' @click="buttonClick">{{label}}</Button>
        </div>
        <div v-else-if="type=='text'">
            <Button  type='text' @click="buttonClick" style='color:rgb(43, 133, 228);padding: 2px 7px;'>{{label}}</Button>
        </div>
        <div v-else>
            <Button @click="buttonClick">{{label}}</Button>
        </div>

    </div>
</template>

<script>
    export default {
        props:[
            'label',
            'type',
            'checkAction'
        ],
        data() {
        	return{
        	   data:[]
        	}
        },
        methods:{
            buttonClick(){
                this.$emit('click');
            }
        },
        mounted:function(){
            var _this=this;
            setTimeout(function() {
                 _this.data=window.resourcesCode;
            }, 300);
        }
    }
</script>