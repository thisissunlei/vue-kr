<template>
	<div class='v-button' v-if="data.indexOf(checkAction)>-1" style='display:inline-block;'>
        <Button  :type='type' @click="buttonClick"  :style='styles'>{{label}}</Button>
    </div>
</template>

<script>
    window.resourcesCode=[];
    export default {
        props:[
            'label',
            'type',
            'checkAction',
            'styles'
        ],
        data() {
        	return{
        	   data:[]
        	}
        },
        methods:{
            buttonClick(){
                this.$emit('click');
            },
            userData(){
                var _this=this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', "/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate=1", true);
                xhr.responseType = 'json';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        window.resourcesCode=xhr.response.data.resourcesCode;
                    }
                };
                xhr.send();
            }
        },
        mounted:function(){
           var _this=this;
           if(window.resourcesCode.length==0){
               this.userData();    
           }
           setTimeout(function() {
               _this.data=window.resourcesCode;
           },300);   
        }
    }
</script>