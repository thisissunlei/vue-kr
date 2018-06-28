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


<template>
    <div class="com-select-chance">
        <!-- <Select v-model="value" filterable :clearable="clearable" :placeholder='placeholder' :loading="loading1" :disabled="disabled" :value="value" :label-in-value='labelinvalue' @on-change="changeContent"> -->
        <Select v-model="defaultValue.id " filterable :clearable="clearable" :placeholder='placeholder' :loading="loading1" :disabled="disabled" :label-in-value='labelinvalue' @on-change="changeContent">
            <Option v-for="option in salerOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>
import http from '~/plugins/http.js';

export default {
    props: {
        defaultValue:Object,
        clearable: {
            type: Boolean,
            default: false,
        },
        placeholder: '请选择',

        orderitems: {
            type: Object
        },

    },
    data() {
        return {
            labelinvalue: true,
            disabled: false,
            saler: '',
            loading1: false,
            isRender:false,
            salerOptions: [
                {
                    label: '请选择',
                    value: 0
                },
                { label: '无需机会', value: -1 }
            ]
        };
    },
    mounted() {
       console.log() 

    },
    computed: {
        customerId: {
            get() {
                console.log("got-value"+this.defaultValue)
                return this.defaultValue;
            },
            set(val) {
                console.log("got-value"+val)
            }

        },
    },
    watch: {
        salerOptions() {
            let chanceid = Number(this.orderitems.saleChanceId);
            if (chanceid == 0 || !chanceid) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        },
        orderitems() {
            this.getSalerChanceList();
        },
        defaultValue(){
            console.log("watch_defaultvalue ")
            console.log(this.defaultValue)
            console.log(this.salerOptions)
            this.isRender = !this.isRender;
        }
    },
    methods: {
        changeContent(item) {
            let v;
            if (item.label === "请选择" || item.label == '无需机会') {
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
                receiveId: this.orderitems.salerId
            }
            if (!parms.customerId || !parms.communityId || !parms.receiveId) return;
            let list = [];
            let _this = this;

            http.get('get-salechance', parms, r => {
                r.data.items.data.map(item => {
                    list.push({
                        label: item.name,
                        value: item.id
                    })
                })
                list.unshift({ label: '无需机会', value: -1 })
                _this.salerOptions = [].concat(list);

                let parms = {
                    count: list.length - 1,
                    isNewUser: r.data.items.isNewUser,
                    list: list
                }
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
