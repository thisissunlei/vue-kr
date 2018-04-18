
<template lang="html">
    <div class="kr-tree">
        <TreeNode 
            v-for="(item , index) in data" 
            :key="item.id" 
            :data="item"
            @onCheckChange="onCheckChange"
        />
    </div>
</template>

<script>
import TreeNode from './TreeNode'
export default {
    components:{
        TreeNode
    },
    props:{
        data:{
            default:()=>[],
            type:Array
        },
        value:{
            default:()=>[],
            type:Array
        }
    },
    data(){
        return {
            selectArr : [],
            nowData:this.data,
        }
    },
    beforeMount(){
     
        this.nowData = this.initNode([],this.nowData);

    },
    methods:{
        onCheckChange(event){
           
            this.nowData = this.getSelectNode(event,this.nowData);
        },
        getSelectNode(event,data){
            var allData = data.map((item,index)=>{
                if(item.t_id == event.t_id){
                    item.isSelect = event.isSelect;
                   
                }
                if(item.isSelect){
                    item.children = this.allSelect(item.children);
                    return item;
                }
                if(item.children && item.children.length){
                    item.children = this.getSelectNode(event,item.children);
                    if(this.fatherIsSelect(item.children)){
                        item.isSelect = true;
                    }
                }
                if(item.isSelect){
                    this.selectArr.push(item.t_id);
                }
                return item;
            })
            return allData;
        },
        fatherIsSelect(data){
            var selectNum = 0;
            for (var i = 0; i < data.length; i++) {
                if(!data[i].isSelect){
                    return false;
                }
            }
            return true;
        },
        allSelect(data){
            var allData = data.map((item)=>{
                item.isSelect = true;
                if(item.children && item.children.length){
                    item.children = this.allSelect(item.children);
                }

                return item;
            })
            return allData;

        },
        //勾选回显
        initNode(values=[],data){
            var allData = data.map((item,index)=>{

                item.isSelect = item.isOpen =this.atEchoData(values,item.t_id);
                if(item.children && item.children.length){
                    item.children = this.initNode(values,item.children);

                }
                return item;
            })
            return allData;
        },
        atEchoData(arr,id){
            for(var i=0;i<arr.length;i++){
                if(arr[i] == id){
                    return true;
                }
            }
            return false;
        },
        searchNode(label,data){
            var allData = data.map((item,index)=>{
                if(item.title == label){
                    item.isOpen = true;
                }else{
                    item.isOpen = false;
                }
                if(item.children && item.children.length){
                    item.children = this.searchNode(label,item.children);
                }
                return item;
            })
            return allData;
        }
    },
    
}
</script>

<style lang="less" scoped>
  
</style>