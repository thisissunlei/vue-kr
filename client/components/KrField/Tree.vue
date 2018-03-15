
<template>
	<div>
           <Tree 
                :data="data" 
                show-checkbox
                @on-check-change="checkChange"
            />
            <div style="text-align: center;">
                <Button type="primary" size="small" @click="sureClick" style="margin-right:10px;">确定</Button>
                <Button type="text" size="small" @click="clearClick">取消</Button>
            </div>
	</div>
</template>

<script>

export default {
    props:{
       data:{
            default:()=>[],
            type:Array,
            required:true,
        }
	},
	methods:{
        checkChange(event){
            this.$emit('checkChange',event)
        },
        sureClick(){   
            this.$emit('sureClick')
        },
        clearClick(){
            this.$emit('clearClick');
        }
	}
}
</script>

<style lang="less" scoped>
 
</style>