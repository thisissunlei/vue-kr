<template>
    <div class="m-bill-wrap">
        <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="入驻订单" name="join">
                <JoinList :mask="key" />
            </Tab-pane>

            <Tab-pane label="减租订单" name="reduce">
                <ReduceList :mask="key" />
            </Tab-pane>
            <Tab-pane label="换租订单" name="replace">
                <ReplaceList :mask="key" />
            </Tab-pane>
        </Tabs>
    </div>
</template>

<script>
import JoinList from './joinList';
import ReduceList from './reduceList';
import ReplaceList from './replaceList';

export default {
    name: 'List',
    head () {
        return {
            title: "工位订单-氪空间后台管理系统"
        }
    },
    data() {
        return {
            activeKey: 'join',
            key: ''
        }
    },
    components: {
        JoinList,
        ReduceList,
        ReplaceList
    },
    mounted() {
        this.activeKey = sessionStorage.getItem('orderMask') || 'join';
    },
    methods: {
        tabsClick(key) {
            this.key = key;
            sessionStorage.setItem('orderMask', key);
        }
    }
}
</script>