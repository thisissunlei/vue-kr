<template>         
    <div class='m-nullify'>
        确定要作废此订单吗？

    <Form :model="formItem" :label-width="80">
       
        <FormItem label="作废类型"><Select v-model="formItem.input"><Option :value="item.value" v-for="(item,index ) in optionList" :key="index">{{item.label}}</Option></Select>
        </FormItem>
       
        <FormItem label="作废理由">
            <Input v-model="formItem.select" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" >Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
        
    </div>       
</template>



<script>
    export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                },
                optionList:[
                    {value:'beijing',label:'北京'},
                    {value:'beijing1',label:'北京1'},
                    {value:'beijing2',label:'北京2'},
                ]
            }
        },
        mounted(){

        },
        methods:{
            getOptionList(){
                let params = {};
                 this.$http.post('join-nullify', params).then((response) => {
                     this.optionList=response.data;
                   
                }).catch( (error) => {
                     this.openMessage=true;
                     this.MessageType="error";
                     this.warn=error.message;
                })
            }
        }
    }
</script>

<style lang='less'>
   .m-nullify{
       padding: 30px;
       font-size: 16px;
       text-align: center;
   }
</style>  