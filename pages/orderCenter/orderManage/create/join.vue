<style lang="less"> 
    .create-new-order{
        // padding:30px 20px;
        .creat-order-form{
            max-width: 1140px;
            padding:30px 20px;


        }
    }

   
</style>



<template>
    <div class="create-new-order">
        <sectionTitle label="新建订单"></sectionTitle>
         <Form :model="formItem"  label-position="top" class="creat-order-form">
            <div>基本信息</div>
            <Row>  
                <Col span="12" style="padding-right:10px">
                    <FormItem label="客户名称" style="width:200px">
                    <selectCommunities name="formItem.customer" :onchange="changeCustomer"></selectCommunities>
                    </FormItem>
                </Col>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="所属社区" style="width:200px">
                    <Select
                        v-model="formItem.customer"
                        filterable
                        remote
                        :remote-method="remoteMethod1"
                        :loading="loading1">
                        <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>  
                <Col span="12" style="padding-right:10px">
                    <FormItem label="销售人员" style="width:200px">
                    <Select
                        v-model="formItem.customer"
                        filterable
                        remote
                        :remote-method="remoteMethod1"
                        :loading="loading1">
                        <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                    </FormItem>
                </Col>
            </Row>
            <div>租赁信息</div>
        <FormItem label="DatePicker">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Radio">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Checkbox">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Switch">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
        <FormItem label="Slider">
            <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem label="Text">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>

    </div>
</template>


<script>
import sectionTitle from '~/components/sectionTitle.vue'
import selectCommunities from '~/components/selectCommunities.vue'
import axios from '~/plugins/http.js';

const name = [
                        {
                            value: 'New York',
                            label: 'New York'
                        },
                        {
                            value: 'London',
                            label: 'London'
                        },
                        {
                            value: 'Sydney',
                            label: 'Sydney'
                        },
                        {
                            value: 'Ottawa',
                            label: 'Ottawa'
                        },
                        {
                            value: 'Paris',
                            label: 'Paris'
                        },
                        {
                            value: 'Canberra',
                            label: 'Canberra'
                        }
                    ];


    export default {
        data() {
            return {
                data1: 'detail',
                loading1:false,
                options1:[],
                formItem: {
                    customer: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        },
        head() {
            return {
                title: '新建订单'
            }
        },
        components: {
            sectionTitle,
            selectCommunities
        },
        created:function(){
            this.getCusomerList(' ')
        },
        methods: {
            changeCustomer:function(value){
                console.log('parent=====changeCustomer',value)
                this.formItem.customer = value;
            },
            remoteMethod1 (query) {
                console.log('remoteMethod1',query)
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        this.getCusomerList(query)
                    }, 200);
                } else {
                    this.getCusomerList(' ')

                }
            },
            getCusomerList:function(name){
                let params = {
                    communityName:name
                }
                let list = [];
                let _this = this;
                axios.get('get-mainbill-community', params, r => {
                    console.log('r', r);
                    list = r.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.communityname;
                        obj.value = item.id;
                        return obj;
                    });
                    _this.options1 = list;
                }, e => {
                    console.log('error',e)
                })
                return list;

            }
                    
               
        }
    }
</script>