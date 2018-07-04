<template>
<div class="g-member-manager-list">
         <div class="u-search-box">
             <div class="u-search-list" style="margin-left:30px;">
                    <SearchForm 
                        placeholder="请输入搜索关键词"
                        :openSearch="true"
                        :onSubmit="lowerSubmit"
                        :searchFilter="searchFilter"
                    />
            </div>
					<!-- <div style='float:right;'>
						<Input 
							v-model="mbrName" 
							placeholder="请输入员工姓名"
							style="width: 240px"
						/>
						<div class='m-search' @click="lowerSubmit">搜索</div>
					</div>  -->
		</div>
        <Table border :columns="list" :data="listInfo"></Table>
        <div v-if="totalCount>15" style="margin: 10px;height:40px;overflow: hidden">
            <div style="float: right;">
                <Page   
                    :total="totalCount" 
                    :page-size="pageSize"
                    show-total 
                    show-elevator
                    @on-change="changePage"
                ></Page>
            </div>
        </div>
</div>
</template>

<script>

import SearchForm from '~/components/SearchForm';

export default {
    components:{
        SearchForm
    },
    data(){
        return{
            totalCount:0,
            pageSize:15,
            listInfo:[],
            mbrName:'',
            Params:{
                page:1,
                pageSize:15
            },
            searchFilter:[
                {
                    label:'姓名',
                    value:'mbrName'
                },
                {
                    label:'手机号',
                    value:''
                }
            ],
            list:[
				{
				 title: '姓名',
                 key: 'mbrName',
				 align:'center',
                },
                {
				 title: '联系电话',
                 key: 'mbrPhone',
				 align:'center',
                },
                {
				 title: '邮箱',
                 key: 'mbrEmail',
				 align:'center',
				},
				{
				 title: '入驻社区',
                 key: 'enterCmtName',
				 align:'center',
				},
				{
				 title: '管理员',
                 key: 'isManager',
				 align:'center',
				 render(h,obj){
					let manager= obj.row.isManager=="1"?'是':'否';
					return manager;
				  }
				},
				{
				 title: '管理的社区',
                 key: 'manageCmtName',
				 align:'center',
				},
				{
				 title: '操作',
                 key: 'operation',
				 align:'center',
				 render:(h,obj)=>{
					  return h('div', [
						h('Button', {
							props: {
								type: 'text',
								size: 'small'
							},
							style: {
								color:'#2b85e4'
							},
							on: {
								click: () => {
									this.setManager(obj.row)
								}
							}
						}, '设置管理员')
						
					]);
				 }
				},
			],
        }
    },
    mounted(){
        this.getInfo();
    },
    methods:{
        changePage(page){
			this.Params.page=page;
			this.getInfo();
        },
        getInfo(){
			let {params}=this.$route;
			this.Params.csrId=params.csrId;
			//this.getCompanyInfo(params);
			this.$http.get('customer-manager-staff-list', this.Params).then((res)=>{
				this.listInfo=res.data.items;
				this.totalCount=res.data.totalCount;
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        },
        lowerSubmit(form){
            this.Params.page=1;
            this.Params.mbrName=form.mbrName;
            this.getInfo();
		},
    }
}
</script>

<style lang="less">
.g-member-manager-list{
    
}
</style>

