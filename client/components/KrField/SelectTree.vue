
<template lang="html">
  <div class="select-tree">
        <div style="width:200px" @click="inputClick">
            <Input 
                 
                v-model="treeInput" 
                :placeholder="placeholder"     
            />
        </div>
        <div  class="select" v-if="mask" style="width:200px">
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
  </div>
</template>

<script>

export default {
     props:{
        data:{
            default:()=>[],
            type:Array,
            required:true,
        },
        placeholder:{
            default:'请选择...',
            type:String
        }
    },
    data(){
		return {
            treeInput:'',
            mask:false,
            checkValue:[],
		}
    },
    methods:{
        checkChange(event){
            this.checkValue=event;
            this.$emit('checkChange',event)
        },
        inputClick(){
            this.mask=!this.mask;
        },
        sureClick(){
            this.mask=false;
            var str='';
            if(this.checkValue.length){
                this.checkValue.map((item,index)=>{
                    item.checked=true;
                    if(this.checkValue.length-1==index){
                        str+=item.title;
                    }else{
                        str+=item.title+',';
                    }
                })
            }
            this.treeInput=str;
        },
        clearClick(){
            this.mask=false;
        }
    }
}
</script>

<style lang="less" scoped>
    .select-tree{
        .select{
                max-height: 200px;
                overflow: auto;
                margin: 5px 0;
                padding: 5px 0;
                background-color: #fff;
                box-sizing: border-box;
                border-radius: 4px;
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
                position: absolute;
                z-index: 900;
        }
    }
</style>