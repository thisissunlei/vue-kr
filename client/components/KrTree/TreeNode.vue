
<template>
  <div class="tree-node">
	  <div style="padding:5px 0px 5px 0px;">
		   	<span 
			   	class="ivu-icon open-icon" 
			   	:class="{'ivu-icon-chevron-up':isOpen,'ivu-icon-chevron-down': !isOpen}"
				:style="{display:isEnd()?'inline-block':'none'}"
				@click="openIconClick"
			></span>
			<Checkbox 
				:value="data.isSelect"
				@on-change="onCheckChange" 
				label="twitter" 
				style="padding: 0px 2px 0px 10px;"
			></Checkbox>
			<span class="tree-label">{{data.title}}</span>
	  </div>
     
        <div class="children-box" :style="{height:getBoxHeight()}" >
			<TreeNode 
			 	v-for="(item , index) in data.children" 
				:data="item"  
				:key="item.id" 
				@onCheckChange="childrenCheckChange"
			/>
        </div>
      
  </div>
</template>
<script>

export default {
    name:'TreeNode',
	props:{
		data:{
			default:{},
			type:Object
		}
	},
    data(){
      return {
		  isOpen:false,
      }
    },
	
	methods:{
		openIconClick(){
			this.isOpen = !this.isOpen;
		},
		isEnd(){
			if(this.data.children && this.data.children.length){
				return true;
			}
			return false;
		},
		onCheckChange(value){
			
			var selectAll = Object.assign({isSelect:value},this.data);
			
			this.$emit('onCheckChange',selectAll);
		},
		getBoxHeight(){
			if(this.isOpen && this.data.children && this.data.children.length){
				return  'auto';
			}else{
				return 0;
			}
		},
		childrenCheckChange(event){
			this.$emit('onCheckChange',event);
		}
	},
	mounted(){
		console.log(this.data,"pppppp")
	}
}
</script>

<style lang="less" scoped>
 .tree-node{
	 .tree-label{
		 display: inline-block;
		
	 }
	 .children-box{
		 padding:0px 25px 0px 25px;
		 overflow: hidden;
		 transition: all 0.3s;
	 }
	 .open-icon{
		 cursor: pointer;
	 }
 }
</style>