<template>
    <CheckboxGroup class='blance-inupt-group' v-model="checkGroupModel" @on-change='checkgroupchange'>
        <ul>
            <li class='blance-row' v-for="(item) in dataList" :key="item.feeType">
                <div class='col-check '>
                    <Checkbox :label="item.feeTypeName" :disabled='disables[item.feeTypeName].chk' />
                    <!-- <Checkbox :label="item.feeTypeName" :disabled='readOnly' /> -->
                </div>
                <div class='col-input '>
                    <Input v-model="models[item.feeTypeName].input" :name='gotRefTag(item.feeTypeName)' :disabled='disables[item.feeTypeName].input' :placeholder="formatBlance(item.maxAmount)" style="width: 252px" @on-change='handleInputChange'>
                    </Input>
                    <span v-if="vifs[item.feeTypeName].error" class='blance-error'>{{errorTexts[item.feeTypeName]}}</span>
                </div>
                <div class='col-btn'>
                    <Button v-if="vifs[item.feeTypeName].btn" :name='gotRefTag(item.feeTypeName)' :disabled='disables[item.feeTypeName].btn' style='display:inline' type="text" @click='handleBlanceTransClk'>全部转移
                    </Button>
                </div>
            </li>
        </ul>
    </CheckboxGroup>

</template>

<script>
import utils from '~/plugins/utils';
import transformZoneVue from './transformZone.vue';

export default {
    props: {
        dataList: {
            type: Array,
            default: () => []//[{feeType feeTypeName maxAmount amount}]
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            checkGroupModel: [],//已勾选的项
            blanceInput: {},//{label:{value hasError}}
            maxAmounts: {},
            models: {},
            disables: {},
            vifs: {},
            errorTexts: {}
        }
    },
    mounted() {

    },
    watch: {
        dataList() {
            console.log("watch_datalist")
            console.log(this.dataList)
            this.initStates()
        },
        readOnly() {
            console.log('watch_readOnly', this.readOnly)
            console.log(this.dataList)
            this.initStates();
        },
        disables() {
            console.log(this.disables)
        }
    },
    methods: {
        initStates() {
            if (this.readOnly) { //只读 查看模式
                this.dataList.map(item => {
                    this.maxAmounts[item.feeTypeName] = item.maxAmount
                    this.models[item.feeTypeName] = Object.assign({}, { input: item.amount }, { feeType: item.feeType });
                    this.disables[item.feeTypeName] = Object.assign({}, { chk: true }, { input: true }, { btn: true })
                    this.vifs[item.feeTypeName] = Object.assign({}, { error: false }, { btn: true })
                    this.errorTexts[item.feeTypeName] = '';
                    //转移金额可能大于最大金额
                    if (item.maxAmount < item.amount) {
                        this.errorTexts[item.feeTypeName] = '转移金额不得大于可转金额';
                        this.vifs[item.feeTypeName] = Object.assign({}, { error: true }, { btn: true })
                    }
                })
            }
            else {//可编辑模式
                this.dataList.map(item => {
                    this.maxAmounts[item.feeTypeName] = item.maxAmount
                    this.models[item.feeTypeName] = Object.assign({}, { input: item.amount }, { feeType: item.feeType });
                    if (item.maxAmount == '') {
                        this.disables[item.feeTypeName] = Object.assign({}, { chk: true }, { input: true }, { btn: true })
                    } else {
                        this.disables[item.feeTypeName] = Object.assign({}, { chk: false }, { input: true }, { btn: true })
                    }
                    // this.disables[item.feeTypeName] = Object.assign({}, { chk: false }, { input: true }, { btn: true })
                    this.vifs[item.feeTypeName] = Object.assign({}, { error: false }, { btn: false })
                    this.errorTexts[item.feeTypeName] = ''
                    //转移金额可能大于最大金额
                    if (item.maxAmount < item.amount) {
                        this.errorTexts[item.feeTypeName] = '转移金额不得大于可转金额';
                        this.vifs[item.feeTypeName] = Object.assign({}, { error: true }, { btn: true })
                    }
                })
            }
            this.checkGroupModel = [];
        },
        gotRefTag(type) {
            return '' + type;
        },
        formatBlance(blance) {
            return '最大' + utils.thousand((blance || 0).toFixed(2)) + '元'
        },
        checkgroupchange() {
            this.dataList.map(item => {
                if (this.checkGroupModel.includes(item.feeTypeName)) {
                    this.disables[item.feeTypeName] = Object.assign(this.disables[item.feeTypeName], { input: false }, { btn: false })
                    this.vifs[item.feeTypeName] = Object.assign({}, { error: true }, { btn: true })
                }
                else {
                    this.disables[item.feeTypeName] = Object.assign(this.disables[item.feeTypeName], { input: true }, { input: true }, { btn: true })
                    this.vifs[item.feeTypeName] = Object.assign({}, { error: false }, { btn: false })
                }
            })
            this.$forceUpdate();
            this.$emit("onChange", this.models)
            this.$emit('onCheckGroupChange', this.checkGroupModel)
        },
        handleBlanceTransClk(e) {
            let label = e.target.name || e.target.parentNode.name
            this.models[label].input = this.maxAmounts[label];
            this.models[label].error = false;
            this.vifs[label] = Object.assign({}, { error: false }, { btn: true })
            this.$forceUpdate();
            this.$emit("onChange", this.models)
        },
        handleInputChange(e) {
            let label = e.target.name
            let input = this.models[label].input
            let maxAmount = this.maxAmounts[label]
            let errorText = this.validateInput(input, maxAmount)
            if (errorText) {
                this.$set(this.errorTexts, label, errorText)
                let obj = Object.assign({}, this.vifs[label]);
                this.$set(this.vifs, label, Object.assign(obj, { 'error': true }))
                this.$set(this.models, label, Object.assign(this.models[label], { 'error': true }))
            }
            else {
                this.$set(this.errorTexts, label, errorText)
                let obj = Object.assign({}, this.vifs[label]);
                this.$set(this.vifs, label, Object.assign(obj, { 'error': true }))
                this.$set(this.models, label, Object.assign(this.models[label], { 'error': false }))
            }
            this.$forceUpdate();
            this.$emit("onChange", this.models)
        },
        validateInput(input, maxAmount) {
            // var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            let errorText = ''
            if (!reg.test(input)) {
                errorText = '请填写转移金额';
            }

            else if (isNaN(input)) {
                errorText = '转移金额请填写数字';
            }
            else if (Number(input) > Number(maxAmount)) {
                errorText = '转移金额不得大于可转金额';
            }
            else if (Number(input) <= 0) {
                errorText = '转移金额须大于0';
            }
            else if (input === '') {
                errorText = '请填写转移金额';
            }
            else {
                errorText = '';
            }
            return errorText
        }
    }
}
</script>


<style lang="less">
.blance-inupt-group {
    position: relative;
    top: 40px;
    .blance-row {
        margin-bottom: 20px;
        position: relative;
        height: 30px;
        .col-check {
            display: inline-block;
            position: absolute;
            left: 0px;
            width: 150px;
        }
        .col-input {
            display: inline-block;
            width: 250px;
            margin-right: 10px;
            position: absolute;
            left: 150px;
            .blance-error {
                position: absolute;
                top: 26px;
                left: 2px;
                color: red;
                font-size: 10px;
            }
        }
        .col-btn {
            display: inline-block;
            position: absolute;
            left: 400px;
        }
    }
}
</style>
