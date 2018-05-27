<template>
    <div class="view-invoice">
        <SectionTitle title="发票详情"></SectionTitle>
        <Form ref="formItem" label-position="top"  :model="formItem" class="creat-order-form">

            <DetailStyle v-if="type=='view'" info="发票信息" >
                <Row style="margin-bottom:30px">  
                    <Col class="col">
                        <FormItem label="申请编号" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="发票规格" style="width:252px"  >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="发票金额" style="width:252px" >
                             <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="发票张数" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                            <!-- <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div> -->
                        </FormItem>
                        
                    </Col>
                    <Col class="col" style="width:711px;max-width:711px;">
                        <FormItem label="备注信息" >
                            <Input 
                                :autosize="{minRows: 2,maxRows: 5}"
                                type="textarea"
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                            <!-- <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div> -->
                        </FormItem>
                        
                    </Col>
                     <Col class="col">
                        <FormItem label="申请人员" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                            <!-- <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div> -->
                        </FormItem>
                        
                    </Col>
                     <Col class="col">
                        <FormItem label="申请时间" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                            <!-- <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div> -->
                        </FormItem>
                        
                    </Col>
                </Row>
            </DetailStyle>
             <DetailStyle v-if="type=='back'" info="发票信息" >
                <Row style="margin-bottom:30px">  
                    <Col class="col">
                        <FormItem label="申请编号" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="发票规格" style="width:252px"  >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="需退换发票金额" style="width:252px" >
                             <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="实际退换发票金额" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="发票内容" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                            
                        </FormItem>
                        
                    </Col>
                     <Col class="col">
                        <FormItem label="先关" style="width:252px" >
                            <div>343333</div>
                           
                        </FormItem>
                        
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle v-if="type=='view'" info="明细信息">
                  <Table border ref="selection" :columns="tableColumns" :data.sync="stationList" ></Table>
            </DetailStyle>

            <DetailStyle info="开票信息">
                <Row  style="margin-bottom:30px">   
                    <Col class="col">
                        <FormItem label="发票抬头" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />
                        </FormItem>
                    </Col>
               
                    <Col class="col">
                        <FormItem label="纳税人识别码" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入纳税人识别码" 
                            />
                        </FormItem>
                    </Col>
                 
                    <Col class="col">
                        <FormItem label="注册地址" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入注册地址" 
                            />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="注册电话" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入注册电话" 
                            />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="开户银行" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入开户银行" 
                            />
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="银行账户" style="width:252px" >
                            <Input :disabled="isReady" v-model="formItem.timeRange" placeholder="请输入银行账户" />
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>

            <DetailStyle info="我司信息">
                <Row style="margin-bottom:30px">  
                    <Col class="col">
                        <FormItem label="社区名称" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="公司名称" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>

            <DetailStyle info="领取方式" v-if="type=='view'">
                <Row style="margin-bottom:30px">  
                    <Col class="col">
                        <FormItem label="领取方式" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="收件人员" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="手机号码" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="收件地址" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>

              <DetailStyle info="账单信息" v-if="type=='view'">
                  <Table border ref="selection" :columns="tableColumns" :data.sync="stationList" ></Table>
            </DetailStyle>

            <DetailStyle v-if="type=='view'" info="其他信息">
                <Row style="margin-bottom:30px">  
                    <Col class="col">
                        <FormItem label="开票人员" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="开票时间" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.timeRange" 
                                placeholder="请输入发票抬头" 
                            />  
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>
           
        </Form>

        
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue'
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import dateUtils from 'vue-dateutils';

import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';
    export default {
        data() {
            return {
                isReady:true, //只读页面,
                type:'back',
                tableColumns: [
                    {
                        title: '账单编号',
                        key: 'name'
                    },
                    {
                        title: '账单类型',
                        key: 'seatType',
                        render:(h, params) => {
                            let type = params.row.seatType;
                            let typeName = '开放工位';
                            if(type =='SPACE'){
                                typeName = '独立办公室'
                            }else{
                                typeName = "开放工位"
                            }
                            return typeName
                        }
                    },
                    {
                        title:'费用类型',
                        key:'capacity'
                    },
                    {
                        title: '可开票金额',
                        key: 'guidePrice'
                    },
                    {
                        title: '申请开票金额',
                        key: 'guidePrice',
                    }
                ],
                //列表数据
                stationList: [
                    {customerId:'33333'}
                ],
               
                formItem: {
                    
                },
                //校验
                salerName:'请选择'

            }
        },
        head() {
            return {
                title: '开票查看'
            }
        },
        components: {
            SectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            SelectSaler,
            planMap,
        },
         mounted(){
            GLOBALSIDESWITCH("false");
        },
        methods: {
            
            back(){
                window.history.go(-1);
            },
        }
    }
</script>
<style lang="less" scoped>
.view-invoice{
    .creat-order-form{
        max-width: 1140px;
        padding: 30px 0;
        .col{
            display: inline-block;
            width: 50%;
            max-width: 450px;
            padding-right: 10px;
            vertical-align: top;
        }
    }
    
}
</style>

