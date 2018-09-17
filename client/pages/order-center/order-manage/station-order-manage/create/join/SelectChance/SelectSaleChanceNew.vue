
<template>
    <div class="com-select-chance">
        <Select v-if="show"
            v-model="showValue"
            filterable
            placeholder="请选择"
            :loading="loading1"
            :disabled="disabled"
            :label-in-value='labelinvalue'
            @on-change="changeContent">
            <Option v-for="option in salerOptions"
                :value="''+option.value"
                :key="''+option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>

export default {
    props: {
        type: '',
        defaultValue: 0,
        showType: {
            type: Boolean,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false
        },
        orderitems: {
            type: Object,
            default: () => {
                return {}
            }
        },
        disabled: {
            type: Boolean,
            default: true
        }

    },
    data() {
        return {
            labelinvalue: true,
            saler: '',
            showValue: '' + this.defaultValue,
            loading1: false,
            isRender: false,
            isNewUser: false,
            show: this.showType,
            salerOptions: [
                {
                    label: '请选择',
                    value: 0
                },
                { label: '不绑定机会', value: -1 }
            ]
        };
    },
    watch: {
        orderitems(val) {
            this.getSalerChanceList();
        },
        defaultValue() {
            if (this.defaultValue == undefined) {
                this.defaultValue = ''
            }
            this.showValue = '' + this.defaultValue;
        },
        showType() {
            this.show = this.showType;

        },
    },
    methods: {
        changeContent(item) {
            let v;
            if (item.label === "请选择" || item.label == '不绑定机会') {
                v = '';
            } else {
                v = item.value
            }
            this.$emit('onChange', v);
        },
        //获取销售机会列表
        getSalerChanceList() {
            let parms = {
                customerId: this.orderitems.customerId,
                communityId: this.orderitems.communityId,
                receiveId: this.orderitems.salerId,
                orderId: this.orderitems.orderId
            }
            if (!parms.customerId || !parms.communityId || !parms.receiveId) return;
            let list = [];
            let _this = this;
            this.$http.get('get-salechance', parms, r => {
                r.data.items.data.map(item => {
                    list.push({
                        label: item.name || '   ',
                        value: item.id
                    })
                })
                list.unshift({ label: '不绑定机会', value: -1 })
                _this.salerOptions = [].concat(list);
                let parms = {
                    count: list.length - 1,
                    isNewUser: r.data.items.isNewUser,
                    list: list
                }
                this.isNewUser = parms.isNewUser
                setTimeout(() => {
                    if (list.length == 2 && this.type != 'edit' && r.data.items.isNewUser) {
                        this.showValue = '' + list[1].value;
                        this.$emit('onChange', this.showValue);
                    } else {

                    }
                }, 200)
                this.$emit('gotChanceList', parms);
            }, error => {
                this.$Notice.error({
                    title: error.message
                });
            })
        }
    }
}
</script>

<style lang="less">
.com-select-chance {
    ::-webkit-input-placeholder {
        color: #666;
    }
    ::-moz-placeholder {
        color: #666;
    } /* firefox 19+ */
    :-ms-input-placeholder {
        color: #666;
    } /* ie */
    input:-moz-placeholder {
        color: #666;
    }
}
</style>