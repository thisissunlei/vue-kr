<template>
  <div class="g-icon-manage">
      <SectionTitle title="角色列表" />
      <div class="u-search" >

            <Button type="primary" @click="goEdit">新建</Button>
            <div class="div-table">

                <Table border :columns="columns" :data="dataTable"></Table>
                <div class="div-page">
                  <Page :total="totalCount" show-sizer :current="page" @on-page-size-change="changePage" ></Page>
                </div>
            </div>
      </div>

      <Modal
        v-model="modalPerson"
        title="选择分配人员"
        @on-ok="sure"
        @on-cancel="quit">
        <div v-if="modalPerson">
            <Transfer
                filterable
                :data="userData"
                :titles="['选择分配人员','已选人员列表']"
                :target-keys="targetKeys"
                :render-format="renderFormat"
                @on-change="transferChange">
            </Transfer>
        </div>
    </Modal>


    <Modal
        v-model="openEdit"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
    >
        <div>
            <div v-if="openEdit">
                <Form ref="formTop" :model="formTop"  :rules="ruleValidate" label-position="top">
                    <Row>
                        <Col span="24">
                            <FormItem label="名称" prop="name"> 
                                <Input v-model="formTop.name" :maxlength="30" />
                            </FormItem> 
                        </Col>
                        <Col span="24">
                            <FormItem label="编码" prop="code" >
                                <Input v-bind:disabled="title=='编辑权限'" :maxlength="30" v-model="formTop.code" />
                            </FormItem>
                        </Col>
                    </Row>
                   
                    
                </Form>
            </div>
            <div>
                数据权限：
            </div>
            <div>
                <table class="table" style="width:100%">
                    <tbody v-for="data in roleEditS" :key="data.code">
                        <tr>
                            <td v-if="data.label == '物业档案'">
                                <table class="table" style="border-collapse:collapse;border:1px solid #e9eaec;width:100%;border-bottom:none;" >
                                    <tbody>
                                        <tr>

                                            <td style="height:30px;width:100px;padding-left:5px;">{{data.label}}</td>
                                            <td style="height:30px;width:150px;padding-left:5px;"></td>
                                            <td style="height:30px;padding-left:5px;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                             <td v-else>
                                <table class="table" style="border-collapse:collapse;border:1px solid #e9eaec;width:100%;border-top:none;border-bottom:none;" >
                                    <tbody>
                                        <tr>

                                            <td style="height:30px;width:100px;padding-left:5px;">{{data.label}}</td>
                                            <td style="height:30px;width:150px;padding-left:5px;"></td>
                                            <td style="height:30px;padding-left:5px;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <table class="table" style="border-collapse:collapse;width:100%">
                                    <tbody>
                                        <tr v-for="(line,index) in  data.children" :key="index">
                                            <td style="border:1px solid #e9eaec;height:30px;padding-left:5px;width:100px">{{index ==0? line.groupName:""}}</td>
                                            <td  style="border:1px solid #e9eaec;height:30px;padding-left:5px;width:150px">{{line.subGroupName}}</td>
                                            <td  style="border:1px solid #e9eaec;height:30px;padding-left:5px;">
                                                <RadioGroup v-model="line.subGroupRightType" >
                                                    <Radio label="NONE" >无</Radio>
                                                    <Radio label="READONLY" >读取</Radio>
                                                    <Radio label="READWRITE" >写入</Radio>
                                                </RadioGroup>
                                            </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
         <!-- <div slot="footer">
            <FormItem >
                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
        </div> -->
    </Modal>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import getColumns from './getColumns';
export default {
    data(){
        return{
            updatePersonid:'',
            editRoleId:'',
            roleid:0,
            totalCount:0,
            userData: [],
            targetKeys: [],
            openEdit: false,
            roleEditS:[],
            modalPerson:false,
            title:'',
            formTop: {
                name: '',
                code: ''
            },
            ruleValidate: {
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
            },
            groupList:[],
            columns: getColumns.columns.call(this),
            dataTable: [],
            pageSize:10,
            page:1
        }
    },

    components:{
            SectionTitle
    },
    created(){
      this.getRoleS()
      this.getRoleEdit()
    },
    methods:{
       handleSubmit(){

       },
        radioGroupChange(e,item){
            console.log(e,"0000",item);
        },
        getUserData (param) {
            let userData = [];
            this.$http.get('getSsoUserListAll',{id:param}).then((res)=>{
    
                for(let item of res.data.items){
        
                    userData.push({
                        key: item.id,
                        label: item.name,
                        description: item.nickname,
                        disabled: false
                });

                }
            })
            this.userData = userData;
        
        },
        getTargetKeys (param) {

            let existUser = []
            this.$http.get('existUserListAll',{id:param}).then((res)=>{
    
                for(let item of res.data.items){
                    // console.log(item)
    
                existUser.push(
                    item.id
                );

                }
            })
            // console.log(existUser,'existUser')
            setTimeout(()=>{
                this.targetKeys =  existUser
            },100)
           

            
        },
        
        /**
         * 穿梭框显示的数据格式化
         */
        renderFormat (item) {
            return item.label;
        },
        /**
         * 穿梭框change的触发事件
         */
        transferChange (newTargetKeys, direction, moveKeys) {
            // console.log(newTargetKeys);
            // console.log(direction);
            // console.log(moveKeys);
            this.targetKeys = newTargetKeys;
        },
    
        /**
         * 人员分配ok
         */
        sure(){

            // console.log( this.targetKeys)
            this.$http.post('addUser',{ssoIdsStr:JSON.stringify(this.targetKeys),id:this.updatePersonid}).then((res=>{
              console.log('success')
            }))


        },
        /**
         * 人员弹窗关闭按钮
         */
        quit(){
            this.openEdit=false;
        },
        instance (type) {
                const title = '提示';
                const content = '<p>是否删除？</p>';
                this.$Modal.confirm({
                    title,
                    content,
                    onOk: () => {
                        this.$http.delete('roleDelete',{id:this.roleid}).then((res)=>{
                        this.getRoleS()
                        this.getRoleEdit()
                             this.$Message.info("操作成功");
                        })
                    },
                    onCancel: () => {
                        // this.$Message.info('');
                    }
            })
        },
        ok () {
            let params = {
                id:this.editRoleId,//
                name:this.formTop.name,
                code:this.formTop.code,
                groupListStr:JSON.stringify([].concat(this.roleEditS))
            };


            if(params.id ==''){
                // console.log( this.$refs['formTop'],"pppppp")
                this.$refs['formTop'].validate((valid) => {
                    // console.log(valid,"oooooooo")
                    if (valid) {
                        this.$http.post("roleSave",params).then((res)=>{
                
                        this.editRoleId =''
                        this.getRoleS()
                        this.getRoleEdit()
                        })
                    
                    } else {
                        console.log(params)
                    }
                
                })
            }else{
                // this.$refs['formTop'].validate((valid) => {
                //      console.log(params,valid)
                //         if (valid) {
                        this.$http.post("roleEidtDetail",params).then((res)=>{
                
                        this.editRoleId =''
                        this.getRoleS()
                        this.getRoleEdit()
                         })
                      
                    // } else {
                    //      console.log(params)
                    // }
            
            // })
            }
        
      

        },
        cancel () {
            // this.$Message.info('Clicked cancel');
        },
        goEdit(){
            this.title = "新建";
            this.formTop.name='';
            this.formTop.code='';
            this.openEdit = true;
         },
         goUpdateRole(param,vlaue){
            this.title = param;
            this.editRoleId = vlaue
            this.openEdit = true;
         },
         goUpdatePerson(param){
             this.updatePersonid =param
    
            this.modalPerson = true;
            this.getTargetKeys(param);
            this.getUserData(param);
         },
        changePage(param){
            
            this.page = param
        
         this.getRoleS()
        },
        getRoleS(){
            let params = {
                page:this.page,
                pageSize:this.pageSize
            }
            this.$http.get('type-page',params).then((res)=>{
               
                this.dataTable = [].concat(res.data.items);
                this.totalCount=res.data.totalCount;

            })

        },
        getSsoUserListAll(){
           
        },
        getRoleEdit(){
            let params = {
                page:this.page,
                pageSize:this.pageSize
            }
            this.$http.get('roledetail').then((res)=>{
              
                this.roleEditS = res.data.groupList;

            })

        }
    }

}
</script>
<style lang="less" >
.g-icon-manage{
    .u-search{
        padding: 20px;

    }
    .div-table{
        padding-top: 20px;
    }
    .table{
        border-collapse:collapse;
        border-color: #e9eaec;
        width: 100%;
        background: red;
        td{
            border:1px solid #e9eaec;
        }
    }

   
    .div-page{
    margin-top: 20px;
    text-align: right;
    }
}


</style>




