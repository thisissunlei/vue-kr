<template>
    <CheckboxGroup class='blance-inupt-group' v-model="checkGroupModel" @on-change='checkgroupchange'>
        <ul>
            <li class='blance-row' v-for="(item) in dataList" :key="item.code">
                <div class='col-check '>
                    <Checkbox :label="item.label" :disabled='disables[item.label].chk' />
                </div>
                <div class='col-input '>
                    <Input 
                        v-model="models[item.label].input" 
                        :name='gotRefTag(item.label)' 
                        :disabled='disables[item.label].input' 
                        :placeholder="formatBlance(item.amountmax)" 
                        style="width: 252px" 
                        @on-change='handleInputChange'>
                    </Input>
                    <span v-if="vifs[item.label].error" class='blance-error'>{{errorTexts[item.label]}}</span>
                </div>
                <div class='col-btn'>
                    <Button 
                        v-if="vifs[item.label].btn" 
                        :name='gotRefTag(item.label)' 
                        :disabled='disables[item.label].btn'
                        style='display:inline' 
                        type="text" 
                        @click='handleBlanceTransClk'>全部转移
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
            default: () => []//[{code label amountmax blance}]
        },
        groupCanEdit: {
            type: Boolean,
            default: true
        },
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
            this.initStates()
        },
    },
    methods: {
        initStates() {
            this.dataList.map(item => {
                this.maxAmounts[item.label] = item.amountmax
                this.models[item.label] = Object.assign({}, { input: '' });
                this.disables[item.label] = Object.assign({}, { chk: false }, { input: false }, { btn: false })
                this.vifs[item.label] = Object.assign({}, { error: false }, { btn: true })
                this.errorTexts[item.label] = ''
            })
        },
        gotRefTag(type) {
            return '' + type;
        },
        formatBlance(blance) {
            return '最大' + utils.thousand((blance).toFixed(2)) + '元'
        },
        checkgroupchange() {
            this.dataList.map(item => {
                if (this.checkGroupModel.includes(item.label)) {
                    this.disables[item.label] = Object.assign({}, { input: false }, { btn: false })
                    this.vifs[item.label] = Object.assign({}, { error: false })
                }
                else {

                    this.disables[item.label] = Object.assign({}, { input: true }, { btn:false  })
                    this.vifs[item.label] = Object.assign({}, { error: true })
                }
            })
            
            this.$forceUpdate();
            debugger;
            this.$emit("onChange", this.models)
        },
        handleBlanceTransClk(e) {
            let label = e.target.name || e.target.parentNode.name
            this.models[label].input = this.maxAmounts[label];
            this.$forceUpdate();
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
            }
            else {
                this.$set(this.errorTexts, label, errorText)
                let obj = Object.assign({}, this.vifs[label]);
                this.$set(this.vifs, label, Object.assign(obj, { 'error': false }))
            }
            this.$forceUpdate();
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
