<template>
    <div class="rent-info-panel">
        <Row style="margin-bottom:30px">
            <Col span="12" class="col">
            <!-- 加判断  只有入住 有拟设立公司  -->
                <FormItem    
                    v-if="proposedCompanyFlag"
                    style="width:252px"
                    prop="formulationCompanyName" >
                    <span slot="label">拟设立公司<Icon type="information-circled"></Icon></span>
                    <Input @on-change="changeFormulationCompanyName" v-model="proposedCompany">
                    
                    </Input>
                </FormItem>
            </Col>
            <Col span="12" class="col">
                <FormItem  label="居间方名称"
                    style="width:252px"
                    prop="intermediaryName" >
                    <span slot="label">居间方名称<Icon type="information-circled"></Icon></span>
                    <Input  @on-change="changeIntermediaryName" v-model="intermediaryRoom"></Input>
                </FormItem>
            </Col>
          
        </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dateUtils from 'vue-dateutils';

export default {
    props:{
        proposedCompanyFlag:{
           type:Boolean,// 判断是否显示 拟设公司
           default:false
        },
        formulationCompanyName:{
            type:String,
            default:''
        },// 拟设公司
        intermediaryName:{
            type:String,
            default:''
        }// 居间方
    },
    data() {
        return {
           proposedCompany:this.formulationCompanyName,
           intermediaryRoom:this.intermediaryName
        }
    },
    watch: {
       
    },
    mounted() {
        this.startDate = new Date();
        this.signDate = new Date();
    },
    methods: {
        changeFormulationCompanyName(){
            this.$emit("proposedCompanyChange",this.proposedCompany)// 拟设公司
        },
        changeIntermediaryName(){
            this.$emit("intermediaryRoomChange",this.intermediaryRoom)// 居间方
        }
    },
}
</script>

<style lang="less">
.rent-info-panel {
    font-size: 12px;
    .pay-error {
        color: #ed3f14;
    }
}
</style>
