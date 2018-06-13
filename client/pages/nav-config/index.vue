<template>
  <div class="g-icon-manage">
      <SectionTitle title="角色列表" />
      <div class="u-search" >

            <Button type="primary" >新建</Button>
            <div class="div-table">

                <Table border :columns="columns1" :data="data1"></Table>
            </div>
      </div>
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
export default {
  data(){
    return{
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
                                h('span', {
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑权限'),
                                h('span', {
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
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除'),
                                h('span', {
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
                                            this.remove(params.index)
                                        }
                                    }
                                }, '分配人员')

                            ]);
                        }
                    }
                ],
                data1: [
                    // {
                    //     name: 'John Brown',
                    //     age: 18,
                    //     address: 'New York No. 1 Lake Park',
                    //     date: '2016-10-03'
                    // },
                    // {
                    //     name: 'Jim Green',
                    //     age: 24,
                    //     address: 'London No. 1 Lake Park',
                    //     date: '2016-10-01'
                    // },
                    // {
                    //     name: 'Joe Black',
                    //     age: 30,
                    //     address: 'Sydney No. 1 Lake Park',
                    //     date: '2016-10-02'
                    // },
                    // {
                    //     name: 'Jon Snow',
                    //     age: 26,
                    //     address: 'Ottawa No. 2 Lake Park',
                    //     date: '2016-10-04'
                    // }
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
    },
    methods:{
      getRoleS(){
        this.$http.get('type/page',{page:this.page,pageSize:this.pageSize}).then((res)=>{
          this.data1 = res.data.items


          console.log(this.data1 ,"----------")

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

</style>


