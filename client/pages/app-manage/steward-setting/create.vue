<template>
<div class="g-steward-created">
<SectionTitle label="新增管家"></SectionTitle>
<div class="u-form">
     <Form ref="formItems" :model="formItem" :rules="ruleCustom" :label-width="100">
        <FormItem label="姓名：" style="width:352px" prop="mbrId">
             <SearchMember
                    :test="formItem"
                    style="width: 250px"
                    :onchange="onchange"
             ></SearchMember>
        </FormItem>
        <div class="u-label-list">
            <div class="u-label">头像：</div>
            <div class="u-label-content">
                <span v-if="!memberInfo.avatar">-</span>
                <img v-if="memberInfo.avatar" :src="memberInfo.avatar" alt="">
            </div>
        </div>
        <div class="u-label-list">
            <div class="u-label">昵称：</div>
            <div class="u-label-content">{{memberInfo.nike}}</div>
        </div>
        <div class="u-label-list">
            <div class="u-label">所属社区：</div>
            <div class="u-label-content">{{memberInfo.communityName}}</div>
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
                :maxlength="maxLength"
            />
        </FormItem>
        <FormItem  style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('formItems')" >提交</Button>
        </FormItem>  
     </Form>   
    
</div>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import SearchMember from '~/components/SearchMember';

export default {
  components:{
     SectionTitle,
     SearchMember
  },
  data(){
      return{
          formItem:{
              mbrId:'',
              stewardType:'',
              stewardStatus:''
          },
          memberInfo:{
              avatar:'',
              communityName:'-',
              nike:'-'
          },
          maxLength:60,
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
                { required: true, message: '请选择社区', trigger:'change' }
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
      onchange(value){
          this.formItem.mbrId=value;
          this.$http.get('search-mbr', {mbrId:value}, res=> {
               this.memberInfo = res.data;   
            }, err => {
                    console.log('error',err)
            })
      },
      handleSubmit(name){
          let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
               
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.onCreateSubmit();
                    } else {
                        _this.$Notice.error({
                            title:message
                        });
                    }
                })
      },
      onCreateSubmit(){
        this.$http.post('create-steward', this.formItem, res=> {
                this.$Notice.success({
                    title:'新建成功'
                });
                setTimeout(function(){
                    window.close();
                },1000) 
            }, err => {
                this.$Notice.error({
                    title:err.message
                });
            })
    }

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
            height:32px;
            line-height:32px;
            box-sizing: border-box;
            padding-right: 12px;
        }
        .u-label-content{
            width:252px;
            min-height:32px;
            display:inline-block;
            line-height:32px;
            color: #495060;
            .u-head-img{
                width:75px;
                height:75px;
                border-radius: 100% 100%;
            }
            img{
                width:75px;
                height:75px;
                border-radius: 100% 100%; 
            }


        }
    }
}


}
</style>


