<template>
  <div class="input-edit">
        <div class="view">
            <div class="text">{{value}}</div> 
            <span class="edit" @click="editClick">编辑</span>
        </div>
        <div class="edit">
            <input type="text" v-model="value"/>
            <span class="cancel" @click="cancelClick">X</span>
            <span class="ok" @click="okClick">ok</span>
        </div>
      
  </div>
</template>

<script>
export default {
    props:{
        value:{
            default:'',
            type:String
        }
    },
    data(){
        return {
            isEdit:false,
        };
    },
    methods:{
        okClick(event){
            this.$emit('okClick',event);
        },
        cancelClick(event){
            this.$emit('cancelClick',event);
        },
        editClick(event){
            this.$emit('editClick',event)
        }
    }
}
</script>
<style lang="less" scoped>
  .input-edit{
  }
</style>