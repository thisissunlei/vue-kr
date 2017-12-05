<style lang='less'>
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
</style>  
    <template>         
            <i-form  label-position="top">
                <Form-item label="订单编号" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="mode" 
                        placeholder="请输入订单编号"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="客户名称" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="name" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                <Form-item label="社区名称" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="community" 
                        placeholder="请输入社区名称"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                    <Form-item label="订单状态" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="community" 
                        placeholder="请输入订单状态"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
                    <Form-item label="支付状态" 
                    class='bill-search-class'>
                    <i-input 
                        v-model="community" 
                        placeholder="请输入支付状态"
                        style="width: 252px"
                    ></i-input>
                </Form-item>
            </i-form>
</template>
<script>
    export default{
        name:'hightSearch',
        data (){
            return{
                status:[],
                community:'',
                name:'',
                mode:''
            }
        }
    }
</script>

