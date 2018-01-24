<template>
<div class="g-steward-created">
<SectionTitle label="新增管家"></SectionTitle>
<div class="u-form">
     <Form :model="formItem" :label-width="100">
        <FormItem label="姓名：" style="width:352px">
            <Input v-model="formItem.input" placeholder="" />
        </FormItem>
        <div class="u-label-list">
            <div class="u-label">头像：</div>
            <div class="u-label-content">
                <span v-if="!img">—</span>
                <img v-if="img" src="" alt="">
            </div>
        </div>
        <div class="u-label-list">
            <div class="u-label">昵称：</div>
            <div class="u-label-content">Allen</div>
        </div>
        <div class="u-label-list">
            <div class="u-label">所属社区：</div>
            <div class="u-label-content">建国路社区</div>
        </div>
        <FormItem label="职位：" style="width:352px">
            <Input v-model="formItem.input" placeholder="" />
        </FormItem>
        <FormItem label="工作状态：" style="width:352px">
            <Input v-model="formItem.input" placeholder="" />
        </FormItem>
        <FormItem label="留言：" style="width:552px">
            <Input 
                v-model="formItem.input" 
                placeholder="留言最多60字"
                type="textarea"
                maxlength="60"
            />
        </FormItem>
     </Form>   
    
</div>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
export default {
  components:{
     SectionTitle,
  },
  data(){
      return{
          formItem:{
              input:''
          },
          img:'',
      }
  },
  mounted:function(){
		GLOBALSIDESWITCH("false");
		
		
  },
  methods:{

  }
  

}
</script>

<style lang="less" scoped>
.g-steward-created{

.u-form{
    margin-top:40px;
    margin-left:40px;
    .u-label-list{
        width:352px;
        min-height:32px;
        margin-bottom:24px;
        .u-label{
            width:100px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 12px;
            color: #495060;
            line-height: 1;
            height:32px;
            line-height:32px;
            box-sizing: border-box;
            padding-right: 12px;
        }
        .u-label-content{
            width:252px;
            float:left;
            height:32px;
            line-height:32px;
            color: #495060;
            .u-head-img{
                width:75px;
                height:75px;
                border-radius: 100% 100%;
            }


        }
    }
}


}
</style>


