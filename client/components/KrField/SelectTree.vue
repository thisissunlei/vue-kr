
<template lang="html">
  <div class="select-tree">
        <Input v-model="value" :placeholder="placeholder" ></Input>
        <div  class="select">
            <Tree :data="data" 
                show-checkbox
                @on-select-change="selectChange"
                @on-check-change="checkChange"
                @on-toggle-expand="toggleChang"
            ></Tree>
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
        },
        value:{
            default:'',
        }

    },
    methods:{
        selectChange(event){
            this.$emit('selectChange',event)
        },
        checkChange(event){
            this.$emit('checkChange',event)
        },
        toggleChange(event){
            this.$emit('toggleChange',event)
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