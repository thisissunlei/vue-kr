<template>
    <div class='blance-inupt'>
        <Input  :disabled='!canEdit' v-model="inputvalue" :placeholder="placeholder" style="width: 252px"></Input>
        <Button v-if='btnDisable' :disabled='!canEdit' style='display:inline' type="text" @click='handleBlanceTransClk'>全部转移</Button>
        <span v-if='!!errorText' class='blance-error'>{{errorText}}</span>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入金额'
        },
        maxAmount: {
            type: Number,
            default: 0
        },
        blanceType: {
            type: String,
            default: ''
        },
        defaultValue: {
            type: Number,
            default: 0
        },
        canEdit: {
            type: Boolean,
            default: true
        },
        btnDisable:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            inputvalue: 0,
            blanceInputError: false,
            errorText: ''
        }
    },
    watch: {
        defaultValue() {
            this.inputvalue = this.defaultValue
        },
        inputvalue() {
            this.validateInput(this.inputvalue);
            this.$emit('blanceChange', 
            { 
                blanceType: this.blanceType,
                blance: this.inputvalue ,
                error:!!this.errorText
            })
        }
    },
    methods: {
        handleBlanceTransClk() {
            this.inputvalue = this.maxAmount;
        },
        validateInput(input) {
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (isNaN(input)) {
                this.errorText = '转移金额请填写数字';
            }
            else if (Number(input) > Number(this.maxAmount)) {
                this.errorText = '转移金额不得大于可转金额';
            }
            else if (input === '') {
                this.errorText = '请填写转移金额';
            }
            else {
                this.errorText = '';
            }
        }
    }
}
</script>

<style lang="less">
.blance-inupt {
    .blance-error {
        position: absolute;
        top: 26px;
        left: 0px;
        color: red;
        font-size: 10px;
    }
}
</style>
