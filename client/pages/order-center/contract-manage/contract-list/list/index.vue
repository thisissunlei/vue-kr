<template>
    <div class="contract-center-list">
        <SectionTitle title="合同列表" />
        <div style='text-align:right;margin-bottom:10px'>

            <div style='display:inline-block;margin:10px 20px;'>
                <span style='padding-right:10px'>客户名称</span>
                <i-input v-model="params.customName" placeholder="请输入客户名称" style="width: 252px" @keyup.enter.native="onKeyEnter($event)" />
            </div>
            <div class='m-search' @click="submitLowerSearch">搜索</div>
            <div class="m-bill-search" @click="showSearch">
                <span/>
            </div>
        </div>
        <Table border ref="selection" :columns="columns" :data="detail" style="margin:20px" />
        <div style="margin: 10px 20px;overflow: hidden">
            <Button type="primary" @click="onExport">导出</Button>
            <div style="float: right;">
                <Page :total="totalCount" :page-size='15' @on-change="onPageChange" show-total show-elevator/>
            </div>
        </div>
        <Modal v-model="openSearch" title="高级搜索" width="660">
            <HeightSearch @bindData="onUpperChange" />
            <div slot="footer">
                <Button type="primary" @click="submitUpperSearch">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
            </div>
        </Modal>

        <Modal v-model="openTakeEffect" title="合同生效" width="660">
            <div>合同是否生效?</div>
            <div slot="footer">
                <Button type="primary" @click="submitTakeEffect" :disabled="effectDisabled">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="showTakeEffect">取消</Button>
            </div>
        </Modal>

        <Modal v-model="openDescribe" title="其他约定" width="460" class='contract-modal'>
            <!-- <Input 
                v-model="otherAgreed" 
                :maxlength="999" 
                type="textarea" 
                :autosize="{minRows: 5,maxRows: 5}" 
                style="width:100%;" 
                placeholder="写入描述..." 
            /> -->
            <!-- <div style="text-align:right">{{otherAgreed?otherAgreed.length+"/999":0+"/999"}}</div> -->
            <CheckboxGroup v-model="otherAgreedChked">
                <Checkbox v-for='item in otherAgreedList' :key="item.id" :label="item.id" style='display:block'>
                    <span class='contract-span' v-html="item.content"></span>
                </Checkbox>
            </CheckboxGroup>
            <div slot="footer">
                <Button type="primary" @click="submitDescribe" :disabled="describeDisabled">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="showDescribe">取消</Button>
            </div>
        </Modal>

        <Modal v-model="openDown" title="下载pdf" width="660">
            <div style="text-align:center;font-size: 16px;color: #333;">请选择您打印的合同是否需要盖公章？</div>

            <div style="height:300px;">
                <div class="cachet-box" @click="selectCachet(false)">
                    <img src="./images/noCachet.jpg" />
                    <div>示例一：未加盖公章的合同</div>
                    <div :class="!this.isCachet?'select cachet':'select'" />
                </div>

                <div class="cachet-box" @click="selectCachet(true)">
                    <img src="./images/cachet.jpg" />
                    <div>示例二：加盖公章的合同</div>
                    <div :class="this.isCachet?'select cachet':'select'" />
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitDownLoad">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="showDown">取消</Button>
            </div>
        </Modal>
        <Message :type="MessageType" :openMessage="openMessage" :warn="warn" @changeOpen="onMessageChange" />
    </div>
</template>


<script>
import SectionTitle from '~/components/SectionTitle.vue';
import Loading from '~/components/Loading';
import krUpload from '~/components/KrUpload.vue';
import HeightSearch from './heightSearch';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import Message from '~/components/Message';
import Buttons from '~/components/Buttons';
var maxWidth = 170;
export default {
    head() {
        return {
            title: "合同列表"
        }

    },

    components: {
        SectionTitle,
        krUpload,
        HeightSearch,
        Loading,
        Message,
        Buttons
    },

    data() {
        return {
            params: {
                page: 1,
                pageSize: 15,
            },
            otherAgreedChked: [1],
            otherAgreedList: [],//[{id name content}]
            newWin: '',
            effectDisabled: false,
            describeDisabled: false,
            tableHeight: 200,
            MessageType: '',
            openMessage: false,
            warn: '',
            openDown: false,
            isCachet: false,
            openTakeEffect: false,
            openDescribe: false,
            selectAllData: [],
            loadingStatus: true,
            file: null,
            otherAgreed: 0,
            parameter: {},//获取pdf-id的参数
            upperData: {},//高级查询的数据
            upperError: false,
            openSearch: false,
            describeError: false,
            detail: [],
            describeData: {},//其他约定的数据
            columnDetail: {},//每一行的数据
            totalCount: 1,
            maxWidth: 170,
            downType: "down",

            columns: [

                {
                    title: '合同编号',
                    key: 'serialNumber',
                    align: 'center',
                    fixed: 'left',
                    width: 150,
                },
                {
                    title: '客户名称',
                    key: 'customName',
                    align: 'center',
                    fixed: 'left',
                    width: 150,
                },
                {
                    title: '社区名称',
                    key: 'communityName',
                    align: 'center',
                    width: 200,
                    render:(h,parmas)=>{
                        
                        return h('div',{
                             domProps:{innerHTML:parmas.row.communityName}
                        })
                    }
                },
                {
                    title: '合同类型',
                    key: 'contractType',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '合同状态',
                    key: 'contractStatusName',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '创建人',
                    key: 'creatorName',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '服务费',
                    key: 'serviceCharges',
                    align: 'center',
                    width: 300,
                }, {
                    title: '销售员',
                    key: 'salerName',
                    align: 'center',
                    width: 80,
                }, {
                    title: '录入人',
                    key: 'inputor',
                    align: 'center',
                    width: 80,
                }, {
                    title: '其他约定',
                    key: 'otherAgreed',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (!params.row.otherAgreed) {
                            return "无";
                        }
                        var str = "";
                        return h('Tooltip', {
                            props: {
                                placement: 'top'
                            }
                        }, [
                                h('div', {
                                    style: {
                                        width: "60px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    },
                                    domProps:{innerHTML:params.row.otherAgreed}
                                }),
                                h('div', {
                                    style: {
                                        wordWrap: "break-word"
                                    },
                                    domProps:{innerHTML:params.row.otherAgreed},
                                    slot: 'content'
                                } )]
                        )
                    }
                }, {
                    title: '附件',
                    key: 'haveAttachmentName',
                    align: 'center',
                    width: 80,
                }, {//其他约定	
                    title: '工位数/独立空间',
                    key: 'stationAndBoard',
                    align: 'center',
                    width: 150,
                }, {
                    title: '归档状态',
                    key: 'pigeonholedName',
                    align: 'center',
                    width: 100,
                }, {
                    title: '放置位置',
                    key: 'placeLocation',
                    align: 'center',
                    width: 150,
                    render(h, obj) {
                        let location = obj.row.placeLocation ? obj.row.placeLocation : '-';
                        return h('span', {}, location);
                    }
                },

                {
                    title: '合同创建时间',
                    key: 'startAndEnd',
                    align: 'center',
                    width: 150,
                    render(h, obj) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS", new Date(obj.row.cTime));
                        return h('span', {}, time);
                    }
                },
                {
                    title: '起始时间',
                    key: 'cTime',
                    align: 'center',
                    width: 200,
                    render(h, obj) {
                        if (!obj.row.endDate || !obj.row.startDate) {
                            return "-";
                        }
                        let end = dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.endDate));
                        let start = dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.startDate));
                        return h('span', {}, start + "至" + end);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 150,
                    fixed: 'right',
                    render: (h, params) => {
                        let arr = params.row.file || [];
                        let newArr = []
                        let btnRender = [];
                        for (let i = 0; i < arr.length; i++) {
                            newArr.push(Object.assign({ "name": arr[i].fileName, "url": '' }, arr[i]))
                        }
                        var downText = "下载";
                        if (params.row.isOldContract) {
                            downText = "打印"
                        }
                        if (!params.row.isOldContract) {
                            btnRender.push(h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    color: '#2b85e4'
                                },
                                on: {
                                    click: () => {
                                        this.jumpView(params)
                                    }
                                }
                            }, '查看'));
                            btnRender.push(h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    color: '#2b85e4'
                                },
                                on: {
                                    click: () => {
                                        this.downType = "down"
                                        var parameter = { requestId: params.row.requestId }
                                        this.parameter = parameter;
                                        this.showDown()
                                    }
                                }
                            }, "下载"))
                        } else {
                            btnRender.push(h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    color: '#2b85e4'
                                },
                                on: {
                                    click: () => {
                                        var parameter = { requestId: params.row.requestId }
                                        this.downType = "print"
                                        this.columnDetail = params.row;
                                        this.parameter = parameter;
                                        this.showDown()
                                    }
                                }
                            }, "打印"))
                        }

                        btnRender.push(

                            h(krUpload, {
                                props: {
                                    action: '//jsonplaceholder.typicode.com/posts/',
                                    file: newArr,
                                    columnDetail: params.row || {},

                                },
                                on: {
                                    onChange: (detail, col) => {
                                        this.postUrlUpLoad(detail, col);
                                    }
                                },
                                style: {
                                    color: '#2b85e4'
                                },
                            }, '44')
                        );

                        if (params.row.otherAgreedButton) {
                            btnRender.push(h(Buttons, {
                                props: {
                                    type: 'text',
                                    checkAction: 'contract_otheragreed',
                                    label: '其他约定',
                                    styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                                },
                                style: {
                                    color: '#2b85e4'
                                },
                                on: {
                                    click: () => {
                                        this.onConvention(params)
                                    }
                                }
                            }))
                        }
                        if (params.row.effectButton) {
                            btnRender.push(h(Buttons, {
                                props: {
                                    type: 'text',
                                    checkAction: 'contract_effective',
                                    label: '合同生效',
                                    styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                                },
                                style: {
                                    color: '#2b85e4'
                                },
                                on: {
                                    click: () => {
                                        this.onContractFor(params)
                                    }
                                }
                            }))
                        }
                        return h('div', btnRender);
                    }
                }
            ],
            detail: []
        }
    },
    created() {
        var params = Object.assign({}, { page: 1, pageSize: 15 }, this.$route.query);
        this.getListData(params);
        this.params = params;
    },

    mounted() {
        this.onWindowSize();
        this.tableHeight = document.documentElement.clientHeight - 360;
    },

    methods: {

        config: function () {
            this.$Notice.config({
                top: 80,
                duration: 3
            });
        },

        onKeyEnter: function (ev) {
            this.submitLowerSearch();
        },

        onWindowSize: function () {
            window.onresize = function () {
                var width = document.body.clientWidth;
                if (width > 1870) {
                    this.maxWidth = width - 1700;
                } else {
                    this.maxWidth = 170;
                }
            }
        },

        //合同生效开关
        showTakeEffect() {
            this.effectDisabled = false;
            this.openTakeEffect = !this.openTakeEffect;
        },

        //生效确定
        submitTakeEffect() {
            this.config();
            this.effectDisabled = true;
            var detail = Object.assign({}, this.columnDetail);

            //  if(this.effectDisabled){
            //      return ;
            //  }

            this.$http.post("post-contract-take-effect", {
                requestId: detail.requestId
            }, (response) => {
                this.showTakeEffect();
                this.getListData(this.params);
                this.openMessage = true;
                this.MessageType = response.message == 'ok' ? "success" : "error";
                this.warn = "合同已生效！";
            }, (error) => {
                this.effectDisabled = false;
                this.$Notice.error({
                    title: error.message
                });
            })
        },

        //其他约定页面开关
        showDescribe() {
            this.otherAgreedList = []
            this.$http.get("get-other-agree-list", {}, (r) => {
                this.otherAgreedList = r.data
            }, (error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
            this.describeDisabled = false;
            this.openDescribe = !this.openDescribe;
        },

        //其他约定按钮点击
        onConvention(detail) {
            this.otherAgreed = detail.row.otherAgreed;
            if (detail.row.otherAgreed) {
                // let arr=[]
                // detail.row.otherAgreed.split(',').map(item=>{
                //     arr.push(Number(item))
                // })
                // if (arr.length>0) {
                //     this.otherAgreedChked=[].concat(arr)
                // }
                // else 
                    
            } 
            this.otherAgreedChked=[1]           
            this.columnDetail = detail.row;
            this.showDescribe();
            this.getOtherConvention({ requestId: detail.row.requestId });
        },

        //其他约定提交
        submitDescribe() {
            var colDetail = Object.assign({}, this.columnDetail);
            let params = {
                requestId: colDetail.requestId,
                otherAgreeIds: this.otherAgreedChked.join(',')
            }
            this.$http.post("post-other-agree-list", params, (response) => {
                this.getListData(this.params);
                this.$Notice.success({
                    title: "提交成功！"
                });
            }, (error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
            this.describeDisabled = true;
            this.showDescribe();
            this.getListData(this.params);
            return


            this.config();
            var colDetail = Object.assign({}, this.columnDetail);
            var describeData = Object.assign({}, this.describeData);

            if (this.describeDisabled) {
                return;
            }
            this.describeDisabled = true;
            this.showDescribe();
            this.$http.post("post-contract-other-convention", {
                requestId: colDetail.requestId,
                otherAgreed: this.otherAgreed || ''

            }, (response) => {
                this.getListData(this.params);
                this.$Notice.success({
                    title: "提交成功！"
                });
            }, (error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },

        //合同生效
        onContractFor(detail) {
            this.columnDetail = detail.row;
            this.showTakeEffect()
        },

        showSearch(params) {
            this.openSearch = !this.openSearch;
        },

        jumpView(params) {
            window.open(`../../../../publicPage/${params.row.id}/pdf-view?contractType=&requestId=${params.row.requestId}`, '_blank')
        },

        //下定按钮被点击载确
        submitDownLoad(params) {

            if (this.downType == "print") {
                var typeList = [{
                    name: '入驻合同',
                    value: 'join'
                }, {
                    name: '增租合同',
                    value: 'increase'
                }, {
                    name: '减租合同',
                    value: 'reduce'
                }, {
                    name: '续租合同',
                    value: 'renew'
                }];
                var type = "join";
                var href = '';
                var port = location.port || '';
                if (port) {
                    port = ":" + port;
                }
                for (let i = 0; i < typeList.length; i++) {
                    if (typeList[i].name == this.columnDetail.contractType) {
                        type = typeList[i].value;
                    }
                }
                window.open(location.protocol + "//" + location.hostname + port + `/new/#/operation/customerManage/1/order/1/agreement/${type}/${this.columnDetail.orderId}/print?print=${this.isCachet}`, '_blank')
                this.showDown();
                return;
            }
            this.config()

            var parameter = Object.assign({}, this.parameter)
            if (this.isCachet) {
                parameter.contractType = "HAVESEAL"
            } else {
                parameter.contractType = "NOSEAL"
            }
            this.downLoadPdf(parameter);
            this.showDown();
        },
        //下载接口调用
        downLoadPdf(params) {
            this.$http.post('contract-list-get-pdf-url', params, (response) => {
                utils.downFile(response.data)

            }, (error) => {
                this.openMessage = true;
                this.MessageType = "error";
                this.warn = error.message;
            })
        },

        onExport() {
            var params = Object.assign({}, this.params);
            utils.commonExport(params, '/api/krspace-erp-web/wf/station/contract/enter/export');
        },

        getListData(params) {
            this.config()
            this.$http.get('get-center-list-contract', params, r => {
                this.totalCount = r.data.totalCount;
                this.detail = r.data.items;
                this.openSearch = false;
                this.loadingStatus = false;
            }, e => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },

        //分页事件
        onPageChange(index) {
            let params = this.params;
            params.page = index;
            this.getListData(params);
        },

        //获取其他约定的信息
        getOtherConvention(params) {
            this.config()
            this.$http.get('get-contract-other-convention-data', params, r => {
                this.describeData.otherAgreed = r.data.otherAgreed;
                let arr=[]
                this.otherAgreedChked=[1]              
                r.data.otherAgreed.map(item=>{
                    arr.push(item.id)
                })
                if (arr.length>0) {
                    this.otherAgreedChked=[].concat(arr)
                }
                
            }, e => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },

        //搜索框
        submitLowerSearch() {
            this.params.page = 1;
            utils.addParams(this.params);
        },

        // 高级查询修改
        onUpperChange(params, error) {
            this.upperError = error;
            this.upperData = params;
        },

        //高级查询确定
        submitUpperSearch() {
            if (this.upperError) {
                return;
            }
            this.params.page = 1;
            this.params = Object.assign({}, this.params, this.upperData);
            this.params.pigeonholed = this.params.pigeonholed ? (this.params.pigeonholed == 'true' ? true : false) : '';
            this.params.minCTime = this.params.minCTime ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(this.params.minCTime)) : '';
            this.params.maxCTime = this.params.maxCTime ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(this.params.maxCTime)) : '';
            utils.addParams(this.params);

        },

        //选择
        selectCachet(select) {
            this.isCachet = select;
        },

        showDown() {
            this.openDown = !this.openDown;
        },

        //保存上传文件的地址   
        postUrlUpLoad(detail, col) {
            this.$http.post("post-list-upload-url", {
                fileList: JSON.stringify(detail),
                requestId: col.requestId,
            }, (response) => {
                // this.$Notice.success({
                //     title:"合同已生效"
                // });
                this.getListData(this.params);
            }, (error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },

        onMessageChange(data) {
            this.openMessage = data;
        },

    },

}
</script>
<style lang="less" >
.page {
    margin-top: 20px;
}
.m-bill-search {
    display: inline-block;
    height: 22px;
    margin: 16px 20px;
    vertical-align: bottom;

    span {
        width: 22px;
        height: 22px;
        background-size: contain;
        float: right;
        cursor: pointer;
        background: url("~assets/images/upperSearch.png") no-repeat center;
        background-size: contain;
        float: right;
    }
}
.m-search {
    color: #2b85e4;
    display: inline-block;
    cursor: pointer;
}
.cachet-box {
    width: 50%;
    position: relative;
    float: left;
    text-align: center;
    cursor: pointer;
    .select {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -31px;
        margin-top: -31px;
    }
    .cachet {
        border: 2px solid #7ed321;
        background: #7ed321 url("~/assets/images/check.svg") no-repeat;
        background-size: 60%;
        background-position: center;
    }
}
.contract-center-list {
    .ivu-table-fixed-right::before,
    .ivu-table-fixed::before {
        z-index: 3;
    }
    .ivu-tooltip-inner {
        white-space: normal;
    }
    .ivu-table-fixed-right {
        width: 150px !important;
    }
}
.contract-modal .contract-span {
    margin: 5px 5px;
    p {
        display: inline;
    }
}
</style>