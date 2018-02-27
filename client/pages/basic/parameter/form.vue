<template>
    <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="formContent">
        <FormItem label="名称" prop="name" >
            <Input v-model="formItem.name" placeholder="名称"></Input>
        </FormItem>
        <FormItem label="编码" prop="code">
            <Input v-model="formItem.code" placeholder="编码"></Input>
        </FormItem>
        
        <FormItem label="启用" prop="flag">
            <RadioGroup v-model="formItem.flag">
                <Radio label="yes">是</Radio>
                <Radio label="no">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="值的格式">
            <RadioGroup v-model="valueType">
                <Radio label="json">JSON</Radio>
                <Radio label="str">STRING</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="值" v-if="valueType == 'str'" prop="value">
            <Input v-model="formItem.value" placeholder="请填写..."></Input>
        </FormItem>
        <FormItem label="值" v-if="valueType == 'json'" prop="value" >
        <div>
            <Row v-for="(item, index) in formItem.items"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none;margin-bottom:10px">
             <Input v-model="item.name" placeholder="属性值" style="width:120px"></Input>
             <span style="width:10px;display:inline-block"></span>
            <Button type="primary" @click="addValue" size='small'>添加</Button> 
            <span style="width:10px;display:inline-block"></span>
            <Button type="primary" @click="deleteValue(index)" size='small' v-if="index!=0">删除</Button> 
            </Row>
            </div>
        </FormItem>
        <FormItem label="描述" prop="textarea">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述"></Input>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                valueType:'str',
                formItem: {
                    name: '',
                    flag: 'no',
                    textarea: '',
                    items:[{name:'111'}]
                },
                ruleCustom:{
                    // firstPayTime: [
                    //     { required: true, trigger: 'change' ,validator: validateFirst},
                    // ],
                    name: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    code: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    flag: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    textarea: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    value: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                },
            }
        },
        watch:{
            valueType(str){
                console.log('valueType',str)
            }
        },
        methods:{
            deleteValue(index){
                console.log('items',index)
            },
            addValue(){
                this.formItem.items.push({name:''})
            }
        },
        updated:function(){
            var data = false;
            var haveNull = false;
            for(let key in this.formItem){
                if(!this.formItem[key]){
                    haveNull = true;
                }
            }
            if(!haveNull){
                data = Object.assign({},this.formItem);
            }
            this.$emit('newPageData', data);  
        
        }
    }
</script>
