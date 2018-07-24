<template>
        <div class="m-config">
            <div>
                <div class="title"><span class="no-use"></span><span style="vertical-align:middle;">未来被占用</span></div>
                <div style="margin-top:9px;">
                    <span>随后</span>
                    <i-input 
                        v-model="formItem.futureOccDays" 
                        style="width:50px;margin:0 8px;"
                    />
                    <span>天内，至少有一天不是未租的</span>
                </div>
            </div>
            <div style="margin-top:30px;">
                <div class="title"><span class="can-use"></span><span style="vertical-align:middle;">可预租</span></div>
                <div style="margin-top:9px;">
                    <span>随后</span>
                    <i-input 
                        v-model="formItem.futureAvlEndDays" 
                        style="width:50px;margin:0 8px;"
                    />
                    <span>天内到期，且到期后</span>
                    <i-input 
                        v-model="formItem.futureAvlDays" 
                        style="width:50px;margin:0 8px;"
                    />
                    <span>天内都是未租的</span> 
                </div>
            </div>

            <div slot="footer" style="margin-top:30px;margin-left: 130px;">
                 <Button type="primary" @click="submitStatus">保存</Button>
                 <Button type="ghost" style="margin-left:20px" @click="openStatus">取消</Button>
            </div>
        </div>
</template>

<script>
var count='';
export default {
    data() {
        return{
           formItem:{
               futureAvlDays:60,
               futureOccDays:60,
               futureAvlEndDays:30
           }
        }
    },
    mounted(){
        let arr=['futureAvlDays','futureOccDays','futureAvlEndDays'];
        this.getItem(arr);
    },
    methods:{
        getItem(arr){
            arr.map((item,index)=>{
                let storeData=localStorage.getItem('map-config-'+item);
                this.formItem[item]=(storeData&&storeData!='undefined')?storeData:this.formItem[item];
            })
        },
        storeItem(arr){
            arr.map((item,index)=>{
                localStorage.setItem(item.name,item.param);
            })
        },
        submitStatus(){
            let arr=[
                {name:'map-config-futureAvlDays',param:this.formItem.futureAvlDays},
                {name:'map-config-futureOccDays',param:this.formItem.futureOccDays},
                {name:'map-config-futureAvlEndDays',param:this.formItem.futureAvlEndDays}
            ]
            this.storeItem(arr);
            this.$emit('submit',this.formItem);
        },
        openStatus(){
            this.$emit('close');
        }
    }
}
</script>

<style lang='less' scoped>
    .m-config{
        padding: 30px 0 0 80px;
        font-size: 14px;
        color: #333333;
        .title{
            .no-use{
                display:inline-block;
                width:16px;
                height:16px;
                background:url('~/assets/images/use.svg') no-repeat center;
                background-size:100%;
                vertical-align: middle;
                margin-right:5px;
            }
            .can-use{
                display:inline-block;
                width:16px;
                height:16px;
                background:url('~/assets/images/can.svg') no-repeat center;
                background-size:100%;
                vertical-align: middle;
                margin-right:5px;
            }
        }
    }
</style>
