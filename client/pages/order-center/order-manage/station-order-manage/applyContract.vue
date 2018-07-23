 <template>
    <div class="m-nullify">
        <!-- 确定要申请合同吗？ -->
        <p v-if='!requireChineseEnglish'>确定要申请合同吗？</p>
        <div v-if='requireChineseEnglish'>
            <div style="text-align:center;font-size: 16px;color: #333;">请选择您要生成中文版还是中英文版合同？</div>

            <div style="height:300px;">
                <div class="cachet-box" @click="selectCachet(false)">
                    <img src="./images/noCachet.png" />
                    <div>示例一：中文版合同</div>
                    <div :class="!this.isCH_AND_EN?'select cachet':'select'" />
                </div>

                <div class="cachet-box" @click="selectCachet(true)">
                    <img src="./images/cachet.png" />
                    <div>示例二：中英文版合同</div>
                    <div :class="this.isCH_AND_EN?'select cachet':'select'" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        requireChineseEnglish:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            isCH_AND_EN: false
        }
    },
    methods: {
        //选择
        selectCachet(select) {
            this.isCH_AND_EN = select;
            let contractType = ''
            if (this.isCH_AND_EN) {
                contractType = 'CH_AND_EN'
            } else {
                contractType = 'CHINESE'
            }
            this.$emit('onSelectionChange', contractType)
        },
    }
}
</script>

<style lang='less'>
.m-nullify {
    padding: 30px;
    font-size: 16px;
    text-align: center;
    .cachet-box {
        width: 50%;
        position: relative;
        float: left;
        text-align: center;
        cursor: pointer;
        .select {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -31px;
            margin-top: -31px;
        }
        .cachet {
            border: 2px solid #7ed321;
            background: #7ed321 url("~/assets/images/check.svg") no-repeat;
            background-size: 60%;
            background-position: center;
        }
    }
}
</style> 

