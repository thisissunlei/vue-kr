<template>
<div class="g-steward-created">
<SectionTitle label="新增管家"></SectionTitle>
<div class="u-form">
     <Form ref="formItem" :model="formItem" :rules="ruleCustom" :label-width="100">
        <FormItem label="姓名：" style="width:352px" prop="mbrId">
            <Input v-model="formItem.mbrId" placeholder="" />
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
        <FormItem label="职位：" style="width:352px" prop="stewardType">
            <Select
                v-model="formItem.stewardType"
                style="width:250px"
                placeholder="请选择职位"
            >
                <Option
                    v-for="item in stewardType"
                    :value="item.value"
                    :key="item.value"
                >
                    {{ item.label }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="工作状态：" style="width:352px" prop="stewardStatus">
            <Select
                v-model="formItem.stewardStatus"
                style="width:250px"
                placeholder="请选择工作状态"
            >
                <Option
                    v-for="item in stewardStatus"
                    :value="item.value"
                    :key="item.value"
                >
                    {{ item.label }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="留言：" style="width:552px">
            <Input 
                v-model="formItem.introduce" 
                placeholder="留言最多60字"
                type="textarea"
                maxlength="60"
            />
        </FormItem>
        <FormItem  style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('formItem')" >提交</Button>
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
          stewardType:[
            {
                label:'社区负责人',
                value:'COMMUNITY_LEADER'
            },
            {
                label:'社区管家',
                value:'COMMUNITY_MANAGER'
            },
          ],
          stewardStatus:[
            {
                label:'正常',
                value:'AT_WORK'
            },
            {
                label:'休假',
                value:'ON_LEAVE'
            },
          ],
          ruleCustom:{
            mbrId:[
                { required: true, message: '请选择社区', trigger: 'change' }
            ],
            stewardType:[
                { required: true, message: '请选择职位', trigger: 'change' }
            ],
            stewardStatus:[
                { required: true, message: '请选择工作状态', trigger: 'change' }
            ],
          }
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


