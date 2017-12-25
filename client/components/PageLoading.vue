<template>
	<div class="ui-loading">
		<h1>loading...</h1>
	</div>
</template>


<style>

    .ui-loading{
        position: fixed;
        z-index: 999;
        background: red;
        width: 100%;
        height: 100%;
    }
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