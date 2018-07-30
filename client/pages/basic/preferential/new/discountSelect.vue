<template>
    <div class="form-item-discount-input">
        <Row class="row-discount" v-for='role in roleList' :key='role.id'>
            <Col class="col-discount-col1">{{role.name}}</Col>
            <Col class="col-discount-col2">
            <div>
                <span>最低</span>
                <Input :number='true'  :placeholder="''+role.discount" />
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
}
</script>
<style lang="less">
</style>

