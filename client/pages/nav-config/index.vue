<template>
  <div class="g-icon-manage">
      <SectionTitle title="角色列表" />
      <div class="u-search" >

            <Button type="primary" @click="goEdit">新建{{modalPerson}}</Button>
            <div class="div-table">

                <Table border :columns="columns" :data="dataTable"></Table>
                <div class="div-page">
                  <Page :total="100" show-sizer :current="page" @on-change="getRoleS"></Page>
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
        @on-cancel="cancel">
        <div>
            <div>
                <Form :model="formTop" label-position="top">
                    <Row>
                        <Col span="12">
                            <FormItem label="名称">
                                <Input v-model="formTop.name" />
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem label="编码">
                                <Input v-bind:disabled="title=='编辑权限'" v-model="formTop.code" />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                数据权限：
            </div>
            <div>
                <table class="table">
                    <tbody v-for="data in roleEditS" :key="data.code">
                        <tr>
                            <td>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td >{{data.label}}</td>
                                            <td ></td>
                                            <td ></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(line,index) in  data.children" :key="line.groupId">
                                            <td >{{index ==0? line.groupName:""}}</td>
                                            <td >{{line.subGroupName}}</td>
                                            <td >

                                            <input type="radio" v-model="line.subGroupRightType" value="NONE" name="roleType" /> 无
                                            <input type="radio" v-model="line.subGroupRightType" value="READONLY" name="roleType" /> 读取
                                            <input type="radio" v-model="line.subGroupRightType" value="READWRITE" name="roleType" /> 写入

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
    </Modal>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import getColumns from './getColumns';
export default {
    data(){
        return{
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
        getUserData () {
            let userData = [];
            this.$http.get('getSsoUserListAll',).then((res)=>{
    
                for(let item of res.data.items){
        
                    userData.push({
                    key: item.uid,
                    label: item.name,
                    description: item.nickname,
                    disabled: false
                });

                }
            })
            this.userData = userData;
        
        },
        getTargetKeys () {

            let existUser = []
            this.$http.get('existUserListAll',).then((res)=>{
    
                for(let item of res.data.items){
    
                existUser.push(
                    item.uid
                );

                }
            })
            this.targetKeys =  existUser
            
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
            this.$http.post('addUser',{ssolds:null,id:this.targetKeys}).then((res=>{
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
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
            })
        },
        ok () {
            let params = {
                name:this.formTop.name,
                code:this.formTop.code,
                groupList:this.roleEditS
            }
            this.$http.post("roleSave",params).then((res)=>{
                console.log(res)
            })


        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        goEdit(){
            this.title = "新建"
            this.formTop.name=''
            this.formTop.code=''
            this.openEdit = true
         },
         goUpdateRole(param){
             this.title = param
           
            this.openEdit = true
         },
         goUpdatePerson(param){
    
            this.modalPerson = true
            this.getTargetKeys()

            this.getUserData();
         },
        getRoleS(){
            let params = {
                page:this.page,
                pageSize:this.pageSize
            }
            this.$http.get('type/page',params).then((res)=>{
                this.dataTable = res.data.items
            })

        },
        getSsoUserListAll(){
           
        },
        getRoleEdit(){
            let params = {
                page:this.page,
                pageSize:this.pageSize
            }
            this.$http.get('roledetail',).then((res)=>{
                this.roleEditS = res.data.groupList;

            })

        }
    }

}
</script>
<style lang="less" scoped>
.g-icon-manage{
    .u-search{
        padding: 20px;

    }
    .div-table{
        padding-top: 20px;
    }
}

.table{
    border-collapse:collapse;
    border-color: #495060;
    width: 100%;
}

td{

    //  border:1px solid #495060;
}
.div-page{
  margin-top: 20px;
  text-align: right;
}
</style>
<style>
.table{
     border-collapse:collapse;
    border-color: #495060;
    width: 100%;
}

</style>



