<template>
    <div class="com-select-community">
        <Select v-model="modelValue" :multiple='multiple' :clearable='clearable' :label-in-value='labelInValue' :disabled="disabled" :loading='loading' :remote-method="remoteMethod" @on-change='changeContent' filterable>
            <Option v-for="option in options" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
    </div>
</template>


<script>


import http from '~/plugins/http.js';

export default {
    // props:["onchange","test","value","disabled"],
    name: 'selectCommunity',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            default: "join-bill-community"
        },
        clearable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        labelInValue: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Array,String]
           
        }
    },
    data() {
        return {
            loading: false,
            options: [],
        };
    },
    computed: {
        modelValue: {
            get() {
                return this.value
            },
            set(val) {

            }
        }
    },
    mounted: function () {
        this.getCusomerList(' ')
    },
    methods: {
        changeContent(value) {
            this.$emit('input', value)
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.getCusomerList(query)
                }, 200);
            } else {
                this.getCusomerList(' ')
            }
        },
        getCusomerList(name) {
            let params = {
                communityName: name
            }
            let list = [];
            let _this = this;

            this.$http.get(this.url, '').then((response) => {
                list = response.data.items;
                list.map((item) => {
                    let obj = item;
                    obj.label = item.name;
                    obj.value = '' + item.id;
                    return obj;
                });
                _this.loading = false;
                _this.options = list;
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        }
    }
}
</script>

<style lang="less">
.com-select-community {
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