<template>
    <Table :columns="columns" :data="data" border class='list-table' />
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default:()=>[]
        },
        columns: {
            type: Array,
            default:()=> [
                {
                    title: '操作时间',
                    key: 'operateTime',
                    align: 'center'
                }, {
                    title: '操作人员',
                    key: 'operatePsn',
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
