<template>
    <div class="g-community-manage">
        <div class="u-tip" style="text-align:left;">
            通过主管理员方式获得的管理权限不能在此取消，请前往主管理员员页面操作；取消全部勾选后将失去管理员身份
        </div>
        <div class="u-community-check-list">
            <div class="u-all-check">
                <Checkbox v-model="checkAll" @on-change="onCheckAll" >全选</Checkbox>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkGroupChange">
                <Checkbox v-for="item in communityList" :key="item.cmtId" :label="item.cmtId">{{item.cmtName}}</Checkbox>
            </CheckboxGroup>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        detail:{
            type:Object,
            default:{}
        },
    },
    data(){
        return{
            communityList:[],
            indeterminate:true,
            checkAll:false,
            checkAllGroup:[],
            checkList:"",

        }
    },
    created(){
        this.getCommunityList()
    },
    mounted(){
        
    },
    methods:{
        getCommunityList(){
            let {params}=this.$route;
            let form={
                csrId:params.csrId,
                mbrId:this.detail.mbrId,
            }
            this.$http.get('get-manage-cmt-list', form).then((res)=>{
                this.communityList=res.data.cmtList;
                let arr=[];
                res.data.cmtList.map((item)=>{
                    if(item.isManager=="1"){
                       arr.push(item.cmtId);
                    }
                })
                this.checkAllGroup=arr;
                if(this.checkAllGroup.length==this.communityList.length){
                     this.checkAll=true; 
                }else{
                     this.checkAll=false; 
                }
                let checkList=[].concat(this.checkAllGroup);
                if(checkList.length>0){
                    this.checkList=checkList.join(',');
                    this.$emit('checkData',this.checkList)
                }
              
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        },
        onCheckAll(){
          let checkList=[];
           if(this.checkAll){
              this.communityList.map((item)=>{
                    checkList.push(item.cmtId);
              })
              this.checkAllGroup=[].concat(checkList);
              this.checkList=checkList.join(',');
              
           }else{
               this.checkAllGroup=[];
               this.checkList="";
           }
           this.$emit('checkData',this.checkList)
              
        },
        checkGroupChange(data){
            let checkList=[].concat(this.checkAllGroup)
            this.checkList=checkList.join(',')
            if(checkList.length==this.communityList.length){
                this.checkAll=true; 
            }else{
                this.checkAll=false; 
            }
            this.$emit('checkData',this.checkList)
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
    .u-community-check-list{
        margin-top:16px;
        padding:0 44px;
        .u-all-check{
            margin-bottom:12px;
        }
    }
}
</style>


