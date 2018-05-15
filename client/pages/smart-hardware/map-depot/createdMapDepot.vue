<template>
  <div class="g-create-map-depot">
      <div class="u-select">
            <span>社区：</span>
            <Select 
                    v-model="communityId" 
                    style="width:200px"
                    placeholder="请选择" 
                    filterable
                    clearable
                    @on-change="communityChange"
                >
                <Option v-for="item in itemDetail" :value="item.cmtId" :key="item.cmtId">{{ item.cmtName }}</Option>
            </Select>
    </div>
  </div>
</template>
<script>
export default {
   props:{
		itemDetail:Array
   },
   data(){
       return{
            communityId:''
       }
   },
   methods:{
     communityChange(){
        this.$emit('formData',this.communityId);
     }
   }

}
</script>
<style lang="less">
.g-create-map-depot{
    .u-select{
        width:250px;
        margin: 20px auto;
    }
}
</style>


