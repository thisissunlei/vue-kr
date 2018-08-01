<template>
    <div class="form-item-discount-input">
        <Row class="row-discount" v-for='role in roleList' :key='role.id'>
            <Col class="col-discount-col1">{{role.name}}</Col>
            <Col class="col-discount-col2">
            <div>
                <span>最低</span>
                <Input class='input' :number='true' :placeholder="''+role.discount" v-model='discount[role.level]' @on-keyup='handleInputKeyUp' @on-blur='handleInputBlur' />
                <span>折</span>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>

export default {
    props: {
        roleList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            discount: {},
        }
    },
    methods: {
        handleInputKeyUp(val) {
            let value = val.currentTarget.value.replace(/[^\d.]/g, '');
            let dotIndex = value.indexOf('.');
            if (dotIndex!=-1&&value.length==dotIndex+3) {
                value = value.substring(0,dotIndex +2)
            }           
            return val.currentTarget.value = value
        },
        handleInputBlur() {
            this.$emit('input', this.discount)
        }
    }
}
</script>
<style lang="less">
</style>

