<template>
<div class="g-setting-detail">
	<SectionTitle title="设置企业管理员" ></SectionTitle>
	<div class="m-detail-content">
		<div class="u-company-info">
			<Card id="u-step-one">
				<p slot="title" class="card-title">
					企业信息
				</p>
				<LabelText :inline="false" label="企业名称：" >
                    {{companyInfo.csrName}}
                </LabelText>
                 <Table :columns="companyColumns" style="margin-bottom:20px" :data="companyList"></Table>
			</Card>
		</div>
		<div class="u-company-info">
			<Card id="u-step-two">
				<p slot="title" class="card-title">
					员工信息
				</p>
				<div class="u-search-box">
					<div style='float:right;'>
						<Input 
							v-model="mbrName" 
							placeholder="请输入员工姓名"
							style="width: 240px"
						/>
						<div class='m-search' @click="lowerSubmit">搜索</div>
					</div> 
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
			</Card>
		</div>
	</div>
	 <Modal
        v-model="openTip"
        title="提示"
        ok-text="确定"
        cancel-text="取消"
        width="600"
     >
		<CommunityManage  
			v-if="openTip"
			:detail="itemDetail"
			@checkData="getCheckData"
		/>
	  <div slot="footer">
			<Button type="primary" @click="tipSubmit">确定</Button>
			<Button type="ghost" style="margin-left: 8px" @click="hideTip">取消</Button>
      </div>
    </Modal>
	
</div>
</template>
<script>

import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import dateUtils from 'vue-dateutils';
import CommunityManage from './communityManage';
export default {
	components:{
		SectionTitle,
		DetailStyle,
		LabelText,
		CommunityManage
	},
	data(){
		return{
			detail:{},
			openTip:false,
			basicInfo:{},
			incomeType:null,
			dealDate:"",
            ctime:'',
			listInfo:[],
			totalCount:0,
			pageSize:15,
			Params:{
                page:1,
                pageSize:15
			},
			
			itemDetail:{},
			managerCount:0,
			mbrName:'',
			companyInfo:{},
			cmtIds:"",
			companyColumns:[
				{
				 title: '社区名称',
                 key: 'cmtName',
				 align:'center',
				},
				{
				 title: '当前入驻状态',
                 key: 'enterStatusDesc',
				 align:'center',
				},
				{
				 title: '该社区管理员数量',
                 key: 'managerNum',
				 align:'center',
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
			companyList:[],
		}
	},
	mounted:function(){
		GLOBALSIDESWITCH("false");
		this.getInfo();
	
	},
	methods:{
		setManager(params){
			this.itemDetail=params;
			this.hideTip();
		},
		getInfo(){
			let {params}=this.$route;
			this.Params.csrId=params.csrId;
			this.getCompanyInfo(params);
			this.$http.get('customer-manager-staff-list', this.Params).then((res)=>{
				this.listInfo=res.data.items;
				this.totalCount=res.data.totalCount;
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		getCompanyInfo(params){
			this.$http.get('customer-community-enter-info', {
				csrId:params.csrId
			}).then((res)=>{
				this.companyInfo=res.data;
				this.companyList=res.data.enterList;
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		changePage(page){
			this.Params.page=page;
			this.getInfo();
		},
		hideTip(){
			this.openTip=!this.openTip;
		},
		tipSubmit(){
			let Params={
				mbrId:this.itemDetail.mbrId,
				cmtIds:this.cmtIds
			}
			console.log('Params',Params)
			this.$http.post('edit-customer-manager', Params).then((res)=>{
				this.getInfo();
				this.openTip=false;
				this.$Notice.success({
					title:'设置管理员成功'
				});
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		lowerSubmit(){
			  	this.Params.page=1;
                this.Params.mbrName=this.mbrName;
                this.getInfo();
		},
		getCheckData(form){
			this.cmtIds=form;
		}

	},
	



}

	
</script>
<style lang="less">
.g-setting-detail{
	height: auto;
	.m-detail-content{
		margin-bottom:20px;
	}
	.u-company-info{
		margin:30px;
		.ivu-card-head{
			background-color:#f7f7f7;
		}

	}
	.ui-labeltext{
        padding-left: 0px;
    }
	
	
	.u-search-box{
		height:32px;
		margin:16px 0;
		.m-search{
			display: inline-block;
			padding:0 10px;
		}
    }

}
.u-tip{
	text-align: center;
}
</style>
