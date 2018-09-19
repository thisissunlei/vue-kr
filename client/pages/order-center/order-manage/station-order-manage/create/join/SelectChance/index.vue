<template>
    <div class="custom-formitem">
        <label :class="{ title: true, 'require': required }">{{title}}</label>
        <label v-if='subTitle.length>0'
            class="subTitle">
            <span v-if='subTitlePrefix'>如是</span>
            <span class="subTitleStr">{{subTitle}}</span>
            </span>
        </label>
        <div>
            <Select v-if="tipStr.length==0"
                v-model="chanceId"
                filterable
                placeholder="请选择"
                @on-change="changeContent">
                <Option v-for="option in options"
                    :value="''+option.value"
                    :key="''+option.value">{{option.label}}</Option>
            </Select>
            <div v-if='tipStr.length>0'
                class="tip"
                :class="[{'error':isError}]">{{tipStr}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        params: {
            type: Object,
            default: () => {
                return {};
            }
        },
        value: {
            type:String,
            default:''
        }
    },
    data() {
        return {
            title: '机会',
            subTitle: '',
            isError: false,
            tipStr: '',
            required: true,
            showSelector: true,
            chanceId: '',
            options: [],
            data: {},
            subTitlePrefix: false
        }
    },
    watch: {
        params(val) {
            this.initOptions(val)
        },
        options(val){
            // console.log('options',val)
        }
    },
    mounted() {
        this.initOptions(this.params)
    },
    methods: {
        changeContent(value) {
            this.$emit('input', "" + value)
            this.$emit("on-select-change", "" + value);
        },

        getChanceList(params) {
            return new Promise((resolve, reject) => {
                this.$http.get('get-salechance', params, r => {
                    let list = []
                    r.data.items.data.map(item => {
                        list.push({
                            label: item.name || ' ',
                            value: '' + item.id
                        })
                    })
                    let obj = {}
                    obj.isNewUser = r.data.items.isNewUser;
                    obj.list = list;
                    resolve(obj)
                }, error => {
                    this.$Notice.error({
                        title: error.message
                    });
                    reject(error)
                })
            })
        },

        initOptions() {
            let params = {
                customerId: this.params.customerId,
                communityId: this.params.communityId,
                receiveId: this.params.salerId,
                orderId: this.params.orderId
            }
            if (!params.customerId || !params.communityId || !params.receiveId) return;
            this.getChanceList(params).then(data => {
                let list = [
                    {
                        label: '不绑定机会',
                        value: ' '
                    }]
                data.list.unshift({ label: '不绑定机会', value: ' ' })
                this.options = data.list
                this.data = data;
            }).then(() => {
                this.renderSelector();
            })
        },

        renderSelector() {
            if (this.data.isNewUser) {
                this.required = true
                this.isError = true
                this.subTitlePrefix = false
                if (this.data.list.length == 1) {
                    this.subTitle = '入驻订单必须绑定机会'
                    this.tipStr = '您没有可用的机会，请确认登录账户或前往CRM检查'
                } else if (this.data.list.length == 2) {
                    this.subTitle = ''
                    this.tipStr = ''
                    this.chanceId = this.data.list[1].value
                } else if (this.data.list.length > 2) {
                    this.subTitle = ''
                    this.tipStr = ''
                    this.chanceId = ''
                }
            }
            else {
                this.required = false
                this.subTitle = '新入驻客户，须选择机会'
                this.chanceId = ''
                this.isError = false
                this.subTitlePrefix = true
                if (this.data.list.length == 1) {
                    this.tipStr = '您没有可用机会，客户增租续租时不必须'
                }
            }
        }
    },
}
</script>

<style lang="less">
.custom-formitem {
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
    width: 252px;
    .title {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #495060;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
    }
    .subTitle {
        vertical-align: middle;
        font-size: 12px;
        line-height: 1;
        padding: 10px 12px 10px 0;
        float: left;
        color: #495060;
        &::before {
            content: "(";
        }
        &::after {
            content: ")";
        }
        .subTitleStr {
            color: #ed3f14;
        }
    }
    .require {
        &::before {
            content: "*";
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed3f14;
        }
    }
    .tip {
        left: 0;
        line-height: 1;
        padding-top: 6px;
        font-size: 14px;
        position: absolute;
        top: 35px;
    }
    .error {
        color: #ed3f14;
    }
}
</style>
