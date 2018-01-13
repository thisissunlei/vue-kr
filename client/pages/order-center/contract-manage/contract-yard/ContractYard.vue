<template>         
     <Form class='file-form' :model="formItem" :label-width="80">

        <Form-item label="归档位置">
            <i-input 
                v-model="formItem.placeLocation" 
                placeholder="请输入归档位置"
                style="width:300px;"
            />
         </Form-item>
       
       <Form-item label="备注" style="width:380px;">
            <Input v-model="formItem.remark" :maxlength="200" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..."/>
            <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/200":0+"/200"}}</div>
       </Form-item>

    </Form>     
</template>

<script>
    export default{
        name:'File',
        data (){
            return{
               formItem:{
                   remark:'',
                   placeLocation:''
               }
            }
        },

        updated:function(){
            this.$emit('bindData', this.formItem);
        },
    }
</script>

<style lang='less' scoped>
   .file-form{
       margin-top:10px;
   }
</style>

