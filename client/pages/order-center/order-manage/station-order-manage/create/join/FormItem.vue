<template>
    <div class="custom-formitem">
        <label :class="{ title: true, 'require': required }">{{title}}</label>
        <slot>
        </slot>
        <p v-if='errorStr'
            class="errortip">{{errorStr}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: '',
        errorStr: '',
        required: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style lang="less">
.custom-formitem {
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
    width: 252px;
    .title {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #495060;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
    }
    .require {
        &::before {
            content: "*";
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed3f14;
        }
    }
    .errortip {
        left: 0;
        line-height: 1;
        padding-top: 6px;
        color: #ed3f14;
        font-size: 12px;
    }
}
</style>
