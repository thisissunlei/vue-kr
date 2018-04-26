<style lang="less"> 
.demo-m{
    width: 400px;
}
</style>


<template>

    <div>
         <Card >
            <p slot="title">
                section1
            </p>
            <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="left">
                <Form-item label="客户名称" class="bill-search-class" prop="company">
                    <i-input 
                        v-model="formItem.company" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        :maxlength="max"
                    />
                </Form-item>
                <Form-item label="相关社区" class="bill-search-class" prop="communityId"> 
                    <Select 
                        v-model="formItem.communityId" 
                        placeholder="请输入社区名称" 
                        style="width: 252px"
                        filterable
                        clearable
                    >
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                   </Select> 
                </Form-item>
            </Form>
            <Button type="primary" @click="submitCreate('formItemOne')">确定1</Button>

    
    </div>
</template>
<script>
    import SinglePhone from '~/components/SinglePhone'
    import EditInput from '~/components/EditInput'
    import dateUtils from 'vue-dateutils';
    import Buttons from '~/components/Buttons';
import KrField from '~/components/KrField';

import selectCustomers from '~/components/SelectCustomers.vue'

    export default {
        head () {
            return {
                title: "合同列表",
            }
           
        },
        data () {
           
            return {
                
            }
        },
        components:{
        },
        methods:{
        },
    }
</script>
<style lang="less">
    .demo{
        padding:20px;
    }
</style>
