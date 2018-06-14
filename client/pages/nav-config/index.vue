<template>
  <div class="g-icon-manage">
      <SectionTitle title="角色列表" />
      <div class="u-search" >

            <Button type="primary" @click="goEdit">新建{{modalPerson}}</Button>
            <div class="div-table">

                <Table border :columns="columns1" :data="dataTable"></Table>
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
                :render-format="render1"
                @on-change="handleChange1">
            </Transfer>
        </div>
    </Modal>


    <Modal
        v-model="modalEdit"
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
export default {
  data(){
    return{
        userData: [],
        targetKeys: [],
        modalEdit: false,
        roleEditS:[],
        modalPerson:false,
        title:'',
        // UserListAll:[],
        formTop: {
                    name: '',
                    code: ''
                },
        columnsEdit:[
                    {
                        title: '编码',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '分配人员',
                        key: 'resources'
                    },
                    {
                        title: '操作人',
                        key: 'creator'
                    },
                    {
                        title: '操作时间',
                        key: 'cTime'
                    }
        ],
        columns1: [
                    {
                        title: '编码',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '分配人员',
                        key: 'resources'
                    },
                    {
                        title: '操作人',
                        key: 'creator'
                    },
                    {
                        title: '操作时间',
                        key: 'cTime'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.goUpdateRole("编辑权限")
                                        }
                                    }
                                }, '编辑权限'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                     
                                    },
                                      style: {
                                        marginRight: '5px',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            //@click="instance('warning')"
                                            this.instance('warning')
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                       
                                    },
                                      style: {
                                        marginRight: '5px',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                             this.goUpdatePerson()
                                        }
                                    }
                                }, '分配人员')

                            ]);
                        }
                    }
                ],
                dataTable: [
                    
                ],
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
            render1 (item) {
                return item.label;
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                console.log(newTargetKeys);
                console.log(direction);
                console.log(moveKeys);
                this.targetKeys = newTargetKeys;
            },
        sure(){

            console.log( this.targetKeys)
            this.$http.post('addUser',{ssolds:null,id:this.targetKeys}).then((res=>{
              console.log('success')
            }))


        },
        quit(){

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
      
        let params = {name:this.formTop.name,code:this.formTop.code,groupList:this.roleEditS}

        console.log(params)

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
            this.modalEdit = true
         },
         goUpdateRole(param){
             this.title = param
           
            this.modalEdit = true
         },
         goUpdatePerson(param){
    
            this.modalPerson = true
            this.getTargetKeys()

            this.getUserData();
         },
        getRoleS(){
            this.$http.get('type/page',{page:this.page,pageSize:this.pageSize}).then((res)=>{
            this.dataTable = res.data.items

            })

        },
        getSsoUserListAll(){
           
        },
        getRoleEdit(){
            this.$http.get('roledetail',{page:this.page,pageSize:this.pageSize}).then((res)=>{
   
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



