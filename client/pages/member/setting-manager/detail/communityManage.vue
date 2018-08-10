<template>
    <div class="g-community-manage">
        <div class="u-tip" style="text-align:left">
            温馨提示：如需取消该员工管理员身份，将所有社区取消勾选并点击“确认”即可；通过主管理员方式获得的管理权限不能在此取消，请前往主管理员页面操作；取消全部勾选后将失去管理员身份
        </div>
        <div class="u-community-check-list">
            <div class="u-all-check">
                <Checkbox v-model="checkAll" @on-change="onCheckAll" >全选</Checkbox>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkGroupChange" style="display: inline-block">
                <Checkbox v-for="item in communityList" :key="item.cmtId" :label="item.cmtId">{{item.cmtName}}</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup v-model="majorVal" style="display: inline-block">
                <Checkbox v-for="item in majorComList" :key="item.cmtId" :label="item.cmtId" disabled>{{item.cmtName}}</Checkbox>
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
            majorComList: [],
            majorVal: []
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
                const filterArr = res.data.cmtList && res.data.cmtList.filter(i => (i.isManager !== 2)) || [];
                const majorArr = res.data.cmtList && res.data.cmtList.filter(i => (i.isManager === 2)) || [];
                this.communityList = filterArr;
                this.majorComList = majorArr;
                this.majorVal = majorArr.map(i => i.cmtId);
                let arr=[];
                filterArr.map((item)=>{
                    if(item.isManager=="1"){
                       arr.push(item.cmtId);
                    }
                });
                this.checkAllGroup=arr;
                this.checkList=arr.join(',');
                if(this.checkAllGroup.length==this.communityList.length){
                     this.checkAll=true; 
                }else{
                     this.checkAll=false; 
                }
                this.$emit('checkData',this.checkList)
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


