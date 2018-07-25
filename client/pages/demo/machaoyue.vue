<template>
    <Form ref="formDynamic" :model="formDynamic" style="width:990px">
        <CheckboxGroup v-model="social">
            <Checkbox label="twitter">
                <Icon type="social-twitter"></Icon>
                <span>Twitter</span>
            </Checkbox>
            <Checkbox label="facebook">
                <Icon type="social-facebook"></Icon>
                <span>Facebook</span>
            </Checkbox>
            <Checkbox label="github">
                <Icon type="social-github"></Icon>
                <span>Github</span>
            </Checkbox>
            <Checkbox label="snapchat">
                <Icon type="social-snapchat"></Icon>
                <span>Snapchat</span>
            </Checkbox>
        </CheckboxGroup>
        <Button type="primary" @click="handleSubmit" >按默认配置初始化近30天价格</Button>

    </Form>
</template>
<script>
    export default {
        data () {
            const validateNumber = (rule, value, callback) => {
                if (value && isNaN(value)) {
                    callback(new Error('请填写数字'));
                } else {
                    callback();
                }
            };
            return {
                social:[],
                validateNumber:validateNumber,
                maxPrice:10,
                max:5,
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ],
                },
            }
        },
        methods: {
            handleSubmit (name) {
                console.log('dsdasd',this.social)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>
<style lang="less">
    .price-row{
        border:1px solid  #E1E6EB;
        border-top:none;
        &:first-child{
           border-top:1px solid  #E1E6EB; 
        }
        .date{
            display: inline-block;
            height: 33px;
            line-height: 33px;
            margin:15px 0;
        }
        .ivu-form-item{
            margin: 15px 0;
        }
        .ivu-form-item-error-tip{
            padding-top: 3px;
            padding-left: 10px;
            position: relative;
            text-align:left;
        }
        .parice-col{
            text-align:center;
            border-right:1px solid  #E1E6EB;
            &:last-child{
                border-right: none;
            }
        }
    }
    .row-header{
        height: 50px;
        line-height: 50px;
        background-color: #F5F6FA;
        font-size: 16px;
        color:#333;
    }
</style>
