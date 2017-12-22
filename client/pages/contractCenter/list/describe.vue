<style lang='less'>
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .bill-search{
        display:inline-block;
        padding-left:32px;
        .u-date-txt{
            padding:0 25px;
            font-size: 14px;
            color: #666;
        }
    }

</style> 

 
    <template>         
            <Form ref="formItem" :model="formItem" label-position="top">
                <Form-item label="添加描述"  >
                    <Input v-model="formItem.otherAgreed" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入描述..."></Input>
                </Form-item>
         </Form>
</template>
<script>
    import Vue from 'vue';
    export default{
        name:'describe',
        props:["detailData"],
        data (){
            return{
                dateError:false,
                formItem:{
                   otherAgreed:this.detailData.otherAgreed||'',
                }
            }
        },
        updated:function(){
            this.$emit('bindData', this.formItem,this.dateError);
        }
    }
</script>

