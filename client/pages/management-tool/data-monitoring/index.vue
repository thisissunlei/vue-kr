<template>
    <div class="contract-center-list">
        <Tabs v-model="currenttab" @on-click='handletabclick'>
            <TabPane label="工位收入与收入中心收入校验" name="name1">
                <List v-if='tabstoggles.name1' :type='currenttab' />
            </TabPane>
            <TabPane label="收入与日费用校验" name="name2">
                <List v-if='tabstoggles.name2' :type='currenttab' />
            </TabPane>
            <TabPane label="费用明细、分期、日收入租金校验" name="name3">
                <List v-if='tabstoggles.name3' :type='currenttab' />
            </TabPane>
            <TabPane label="费用明细、分期押金校验" name="name4">
                <List v-if='tabstoggles.name4' :type='currenttab' />
            </TabPane>
        </Tabs>
    </div>
</template>


<script>
import List from './list';
export default {

    components: {
        List
    },

    data() {
        return {
            currenttab: 'name1',
            tabstoggles: {
                name1: true,
                name2: false,
                name3: false,
                name4: false,
            },
        }
    },

    methods: {
        handletabclick(name) {
            let obj = {
                name1: false,
                name2: false,
                name3: false,
                name4: false,
            };
            obj[name] = true;
            this.tabstoggles = Object.assign({}, obj)
        },

    }
}
</script>
<style lang="less" >
</style>