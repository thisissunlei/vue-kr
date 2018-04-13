<template>
    <div class="create-new-order">
        <SectionTitle title="新建换租订单"  v-if="orderStatus=='create'"></SectionTitle>
        <div class="create-order" v-if="orderStatus=='create'">

            <Steps :current="status" status="process" style="margin-bottom:20px">
                <Step :title="returnTitle(0)" content="客户信息页"></Step>
                <Step :title="returnTitle(1)" content="原工位选择页"></Step>
                <Step :title="returnTitle(2)" content="新工位选择页"></Step>
                <Step :title="returnTitle(3)" content="服务费信息页"></Step>
            </Steps>
            <Card id="step-one" v-if="status==0">
                <p slot="title" class="card-title">
                   基本信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="客户名称" class="bill-search-class" prop="company">
                                <Input 
                                    v-model="formItem.company" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="salerId">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTIme" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="communityId"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="primary" @click="next">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-two" v-if="status==1">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="客户名称" class="bill-search-class" prop="company">
                                <Input 
                                    v-model="formItem.company" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="salerId">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTIme" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="communityId"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">

                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="next">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-three" v-if="status==2">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="客户名称" class="bill-search-class" prop="company">
                                <Input 
                                    v-model="formItem.company" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="salerId">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTIme" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="communityId"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">

                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="next">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-four" v-if="status==3">
                <p slot="title" class="card-title">
                    服务费信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="客户名称" class="bill-search-class" prop="company">
                                <Input 
                                    v-model="formItem.company" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="salerId">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTIme" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="communityId"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="submit">提交</Button>
                    
                </div>
            </Card>
        </div>
        <div class="view" v-if="orderStatus=='view'">
            <ReplaceView @editCards="editCard"/>
        </div>
    </div>
</template>


<script>
    import SectionTitle from '~/components/SectionTitle.vue'

    import SelectSaler from '~/components/SelectSaler.vue'
    import ReplaceView from '../replaceView.vue'






    export default {
        data() {
            return {
                //订单模式（create：创建中；view：预览）
                orderStatus:'create',
                status:3,
                rows:4,
                salerName:'',
                //表单数据
                formItem:{},
                //step1校验规则
                ruleValidateOne:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    company:[
                        { required: true, message: '请填写客户名称'},
                    ],
                    salerId:[
                        { required: true, message: '请填写客户名称'},

                    ]
                },
                communityList:[]

            }
        },
        head() {
            return {
                title: '新建换租订单'
            }
        },
        components: {
            SectionTitle,
            SelectSaler,
            ReplaceView
        },
         mounted(){
            GLOBALSIDESWITCH("false");
            GLOBALHEADERSET('订单合同')
        },
        watch:{

           // disabled(val){
           //  console.log('disabled-->',val)
           // }
        },
        methods: {
            changeSaler(value){
                console.log('changeSaler',value)
               
            },
            changeSaleTime(value){
                console.log('changeSaleTime',value)
            },
            next(){
                this.status ++ ;
                console.log('next======',this.status)
            },
            previous(){
                this.status -- ;
            },
            returnTitle(value){
                let title = '未进行';
                if(value == this.status){
                    title = '进行中'
                }else if(value<this.status){
                    title = '已完成'
                }else{
                    title = '未进行'
                }
                return title;
            },
            submit(){
                this.orderStatus = 'view'
            },
            editCard(value){
                console.log('create----editCard',value)
                this.orderStatus = 'create';
                this.status = value;
            }
        }
    }
</script>
<style lang="less"> 
    .create-order{
        padding:30px 40px;
        .buttons{
            text-align: center;
            margin:10px auto 30px;
        }
        .col{
            width:50%;
            display: inline-block;
            vertical-align: top;
        }
        .between{
            display: inline-block;
            width: 20px;
        }
        .ivu-card-head{
            background-color: rgb(247, 247, 247);
        }
    }
</style>
