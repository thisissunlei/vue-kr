<template>
  <div class="g-ops">
      <SectionTitle title="运维工具管理"></SectionTitle>
      <div class="m-detail-content">
            <DetailStyle :info="key" v-for="(item,key) in data" :key="key">
                 <div class="u-btn-list" >
                      <a :href="every.url" v-for="every in item" :key="every.id" target="_blank" class="u-ops-btn">{{every.name}}</a>
                 </div>
                
            </DetailStyle>

	  </div>
     
  </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';

export default {
    head () {
        return {
            title: "运维工具-氪空间后台管理系统"
        }
    },
    components:{
		DetailStyle,
		SectionTitle
    },
    data(){
        return {
            data:{},
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        getData(){
            this.$http.get('get-operations-list',{}, r => {
               
                let data = {};
                r.data.items.map((item,index)=>{
                    if(data[item.typeName]){
                        data[item.typeName].push(item);
                    }else{
                        data[item.typeName] = [item];
                    }
                   
                })
                this.data = Object.assign({},data);
            }, e => {
                this.$Notice.error({
                    title: e.message
                });
            })
        }
    }
}
</script>

<style lang="less">
.g-ops{
    .m-detail-content{
        padding:30px 24px;
        a{
            display: inline-block;
            color:#2d8cf0;
            height:36px;
            line-height: 34px;
            border:1px solid #2d8cf0;
            border-radius: 4px;
            padding:0 16px;
            margin-right:15px;
            margin-bottom:16px;
            cursor: pointer;
            font-weight:500;
            &:hover{
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
                background-color:rgba(73,157,241,0.08);
            }
        }
        .u-btn-list{
           padding-left:15px;
           margin-bottom:10px;
        }
	}
}

</style>

