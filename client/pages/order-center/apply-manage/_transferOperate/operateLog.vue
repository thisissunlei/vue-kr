<template>
    <Table :columns="columns" :data="data" border class='list-table' />
</template>

<script>
import dateUtils from 'vue-dateutils';
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => [
                {
                    title: '操作时间',
                    key: 'utime',
                    align: 'center',
                    render(tag, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS", new Date(params.row.utime));
                        return tag('div', time)
                    }
                }, {
                    title: '操作人员',
                    key: 'operaterUserName',
                    align: 'center'
                }, {
                    title: '备注',
                    key: 'remark',
                    align: 'center'
                }
            ],
        }

    },
}
</script>


<style lang="less">
.list-table {
    margin: 20px;
}
</style>
