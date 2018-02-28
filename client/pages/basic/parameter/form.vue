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
        <FormItem label="值" v-if="valueType == 'json'" >
        <div>
            <Row v-for="(item, index) in formItem.items"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none;margin-bottom:10px">
                <Input v-model="item.name" placeholder="属性名" style="width:120px"></Input>
                <span style="width:15px;display:inline-block;text-align:center">:</span>
             <Input v-model="item.value" placeholder="属性值" style="width:120px"></Input>
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
        props:{
                editData:Object,
            },
        data () {
            
            let data = {
                items:[{name:''}],
                flag:'no',
                name:'',
                code:'',
                textarea:'',
                }
                let value = this.editData.value || '';
                let valueType = 'str';
                if(this.editData && typeof this.editData.value == 'object'){
                    valueType = 'json';
                    let arr = [];
                    for(let key in value){
                        arr.push({value:value[key],name:key})
                    }
                    data.items = arr;
                }
            data = Object.assign({},data,this.editData)
            return {
                valueType:valueType,
                formItem: data,
                ruleCustom:{
                    name: [
                        { required: true,message: '请填写名称', trigger: 'change' }
                    ],
                    code: [
                        { required: true,message: '请填写编码', trigger: 'change' }
                    ],
                    flag: [
                        { required: true,message: '请选择是否启用', trigger: 'change' }
                    ],
                    textarea: [
                        { required: true,message: '请填写描述', trigger: 'change' }
                    ],
                    value: [
                        { required: true,message: '请填写参数值', trigger: 'change' }
                    ],
                },
            }
        },
        watch:{
            valueType(value){
                if(value == 'json'){
                    this.formItem.value = ''
                }else{
                    this.formItem.value = ''
                    this.formItem.items = [{name:'',value:''}]
                }
            }
        },
        methods:{
            deleteValue(index){
                let arr = this.formItem.items.splice(index,1)
            },
            addValue(){
                this.formItem.items.push({name:''})
            }
        },
        updated:function(){
            let data = {}
            if(this.valueType == 'json'){
                let obj = {};
                this.formItem.items.map((item,index)=>{
                    obj[item.name] = item.value;
                })

                this.formItem.value = obj;
            }
            data = Object.assign({},this.formItem);
            this.$emit('newPageData', data);  
            
        
        }
    }
</script>
