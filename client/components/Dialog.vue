<template>
	<div class= "ui-dialog" ref="dialog" >
		<div class="dialog-header" >
			<div class="dialog-header-title"> {{title}} </div>
			<span class="close" @on-click="onClose">X</span>
		</div>
		<div className="dialog-body" ref="dialogBody" style={bodyStyle}>
			<slot></slot>
		</div>
		
		
	</div>
</template>
<style>
</style>
<script>
    export default {
        data() {
        	return{
        		title:'选择工位'
        	}
        	
        },
        props:[
        	// 'title'
        	'openStatus',
        	'width',
        	'onClose',
        	'onSubmit'
        ],
        methods: {}
    }
</script>