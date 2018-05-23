<template>
    <div class="g-community-manage">
        <div class="u-tip">
            温馨提示：如需取消该员工管理员身份，将所有社区取消勾选并点击“确认”即可；
        </div>

    </div>
</template>
<script>
export default {
    props:{
        detail:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            communityList:[],
        }
    },
    mounted(){
        this.getCommunityList()
    },
    methods:{
        getCommunityList(){
            let {params}=this.$route;
            let form={
                csrId:params.csrId,
                mbrId:this.detail.mbrId,
            }
            this.$http.get('get-manage-cmt-list', form).then((res)=>{
				this.listInfo=res.data.items;
				this.totalCount=res.data.totalCount;
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        }
    },

}
</script>
<style lang="less">
.g-community-manage{
    .u-tip{
        font-size:14px;
        color:#999;
    }
}
</style>


