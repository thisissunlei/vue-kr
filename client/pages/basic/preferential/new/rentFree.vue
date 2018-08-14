<template>
    <div class="form-item-discount-select">
        <Checkbox :indeterminate="indeterminate" v-model="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
        <CheckboxGroup v-model="checkList" @on-change="checkAllGroupChange">
            <Checkbox v-for="role in roleList" :key='role.id' :label="role.name" class='form-item-discount-select-item'></Checkbox>
        </CheckboxGroup>
    </div>
</template>
<script>
export default {
    props: {
        roleList: {
            type: Array,
            default: () => []
        },
        value: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            indeterminate: false,
            checkAll: false,
            checkList: [],
            mapName2Level: {},//名称-级别索引
        }
    },
    watch: {
        roleList() {
            this.getName2LevelDic();
        }
    },
    mounted() {
        this.getName2LevelDic();
    },
    methods: {
        getName2LevelDic() {
            let obj = {};
            this.roleList.map(item => {
                obj[item.name] = item.level
            })
            this.mapName2Level = obj
        },
        checkAllGroupChange(data) {
            console.log('data', data)
            if (data.length === this.roleList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
                this.sortSelectData(data)
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
            this.$emit('input', this.checkList)
        },
        handleCheckAll() {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;
            if (this.checkAll) {
                this.checkList = [].concat(this.roleList.map(item => item.name));
            } else {
                this.checkList = []
            }
            this.$emit('input', this.checkList)
        },
        sortSelectData(data) {
            let levels = [];
            data.map(item => levels.push(this.mapName2Level[item]));
            let max = Math.max.apply(null, levels)
            let checkList = [];
            for (const name in this.mapName2Level) {
                if (this.mapName2Level[name] <= max) {
                    checkList.push(name)
                }
            }
            this.checkList = [].concat(checkList)
            if (checkList.length === this.roleList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            }

        }
    }
}
</script>
<style lang="less">
</style>
