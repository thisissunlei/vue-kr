<template>
    <div class="new-sync-panel">
        <SectionTitle title="基本信息"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <FormItem label="选择时间" prop="syncTime" class='form-item'>
                <DatePicker v-model="formItem.syncTime.startTime" type="date" placeholder="开始日期" style="width: 170px" />
                <span class="u-date-txt" style='padding:0 20px'>至</span>
                <DatePicker v-model="formItem.syncTime.endTime" type="date" placeholder="结束日期" style="width: 170px" />
            </FormItem>
            <FormItem label="选择社区" class='form-item'>
                <selectCommunities :test='formItem' :onchange="changeCommunity" :multiple='true' style="display:inline-block;width:400px" />
            </FormItem>
            <FormItem label="选择客户" class='form-item'>
                <selectCustomers :onchange="changeCustomer" :multiple='true' style="display:inline-block;width:400px" />
            </FormItem>
            <FormItem label="同步类型" prop="syncDataType" class='form-item'>
                <Select v-model="formItem.syncDataType" style="width:170px">
                    <Option v-for="item in syncDataTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="备注" prop="remark" class="form-item form-item-remark">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="备注..." />
            </FormItem>

            <FormItem class="form-item-btn">
                <div class="btn-container">
                    <Button type="primary" class="btn" @click="handleCancle">取消</Button>
                    <Button type="primary" class="btn" @click="handleNext(formItem)" :disabled ="disabled_next" >下一步</Button>
                </div>

            </FormItem>
        </Form>
         <Modal
            v-model="openLoading"
            title="等待拉取中..."
            :closable="false"
            :mask-closable="false"
        >
            <div>
                <Loading />
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from './SelectCommunities.vue'
// import selectCommunities from '~/components/SelectCommunities.vue'
// import selectCustomers from '~/components/SelectCustomers.vue'
import selectCustomers from './SelectCustomers.vue'
import Loading from '~/components/Loading.vue'

export default {
    name: 'createSync',
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        Loading,
    },
    data() {

        const validateDate = (rule, value, callback) => {
            let start = value.startTime && dateUtils.dateToStr("YYYY-MM", value.startTime);
            let end = value.endTime && dateUtils.dateToStr("YYYY-MM", value.endTime);
         //   console.log(start,end,123);
            if (!value.startTime) {
                callback("请输入开始日期")
            } else if (!value.endTime) {
                callback("请输入结束日期")
            } else if (value.startTime > value.endTime) {
                callback('开始日期不能大于结束日期')
            } 
            else if (start !== end) {
                callback('选择日期不能跨月')
            }else {
                callback()
            }
        };
        return {
            openLoading:false,
            syncId:'',
            disabled_next:false,
            formItem: { syncTime: {} },
            syncDataTypeList: [],
            ruleCustom: {
                syncTime: [
                    { required: true, validator: validateDate, trigger: 'change' }
                ],
                syncDataType: [
                    { required: true, message: '请选择同步类型', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请填写备注', trigger: 'change' }
                ]
            },
        }
    },
    mounted() {
        GLOBALSIDESWITCH('false');
        this.getSyncDataTypeList();
    },
    methods: {
    //获取同步状态
        loopSuccess(){
            console.log("sssss");
            this.$http.get('get-sync-findSyncStatus-loop', {
                syncDataId:this.syncId,
            })
                .then(r => {
                    console.log(r,"ppppppp");
                    if(r.data.pullStatus=="ALREADY_PULL"){
                        this.openLoading = false;
                          this.$Notice.success({title:'拉取成功'});
                         this.$router.replace({path:'/bill/king-dee/sync-data/filterData',query:{syncId:this.syncId,syncType:this.formItem.syncDataType,startTime:this.syncStartTime,endTime:this.syncEndTime}});
                    //    window.open(`/bill/king-dee/sync-data/filterData?syncId=${this.syncId}&syncType=${this.formItem.syncDataType}&startTime=${this.syncStartTime}&endTime=${this.syncEndTime}`,'_blank');
                      //  window.location.href = '/bill/king-dee/sync-data';
                        return ;
                    }
                   if(r.data.pullStatus=='FAILED_PULL'){
                         this.openLoading = false;
                         this.disabled_next = false;
                         this.$Notice.error({
                            title: r.data.failedMsg
                        });
                        return ;
                    }
                    // if(r.data.pullStatus=='NOT_PULL'){
                    //      this.openLoading = false;
                    //     this.$Notice.error({
                    //         title: '未拉取'
                    //     });
                    //     return ;
                    // }
                    setTimeout(()=>{
                        this.loopSuccess();
                    },1000)
                    // this.openLoading = false;
                    // alert("8888888")
                })
                .catch(error => {
                    console.log(error)
                 //   this.isAllSelect = false
                    this.$Notice.error({
                        title: error.message
                    });
                })
        },

        addKdSyncIncomeData(formItem) {
            let { remark, customerIds, communityIds, syncDataType,syncTime: { startTime, endTime } } = formItem;
            let parmas = { remark, customerIds, communityIds,syncDataType, startTime, endTime };
            parmas.customerIds=parmas.customerIds;
            parmas.communityIds=parmas.communityIds;

            this.syncStartTime = dateUtils.dateToStr("YYYY-MM-dd", parmas.startTime);
            this.syncEndTime = dateUtils.dateToStr("YYYY-MM-dd", parmas.endTime);

           // console.log(this.syncStartTime, this.syncEndTime,'1111111111111' );
            
            parmas.startTime=dateUtils.dateToStr("YYYY-MM-dd 00:00:00", parmas.startTime);
            parmas.endTime=dateUtils.dateToStr("YYYY-MM-dd 00:00:00",parmas.endTime);
           // console.log(parmas.startTime,  parmas.endTime,'u22222222');
            this.$http.post('post-creat-sync-data', parmas).then(r => {
                this.syncId=r.data;
                 this.openLoading = true;
                // console.log(11111111)
                 this.loopSuccess();
                 
            //     this.$http.post(api, parmas)


                // .then(r => {
                //     this.isAllSelect = false
                //     this.openLoading = true;
                //     this.loopSuccess();
                //     // alert("8888888")
                // })
                // .catch(error => {
                //     console.log(error)
                //     this.isAllSelect = false
                //     this.$Notice.error({
                //         title: error.message
                //     });
                // })
            }).catch(error => {
                console.log(error)
              //  console.log(222222222)
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        changeCommunity(val) {
            let arrInt=val.map(item=>Number(item))
            this.formItem.communityIds = arrInt;
        },
        changeCustomer(val) {
            let arrInt=val.map(item=>Number(item))
            this.formItem.customerIds = arrInt;
        },
        getSyncDataTypeList() {
            this.syncDataTypeList = [
                {
                    label: '应收',
                    value: 'INCOME'
                },
                {
                    label: '预收',
                    value: 'PAYMENT'
                },
            ]
        },
        handleCancle() {
            window.location.href = '/bill/king-dee/sync-data';
            // this.$router.push({path:'/bill/king-dee/sync-data'})
        },
        handleNext(formItem) {
            this.$refs['formItem'].validate((valid) => {
                if (valid) {
                    this.disabled_next = true;
                    this.addKdSyncIncomeData(formItem)
                } else {
                    this.$Notice.error({
                        title: '请填写完整表单'
                    });
                }
            })
        }
    }
}
</script>

<style lang="less">
.new-sync-panel {
    .creat-order-form {
        width: 600px;
        margin: 50px auto;
        .ivu-form-item-label {
            width: 90px;
        }
        .form-item {
            width: 500px;
            .ivu-form-item-error-tip {
                left: 90px;
            }
        }
        .form-item-remark {
            width: 400px;
            .ivu-form-item-content {
                position: relative;
                left: 90px;
                top: -30px;
            }
        }
        .form-item-btn {
            width: 500px;
            .btn-container {
                float: right;
                .btn {
                    margin: 0 10px;
                }
            }
        }
    }
}
</style>
