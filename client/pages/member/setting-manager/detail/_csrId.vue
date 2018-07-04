<template>
<div class="g-setting-detail">
	<SectionTitle title="设置企业管理员" ></SectionTitle>
	<div class="m-detail-content">
		<div class="u-company-info">
			<LabelText :inline="false" label="企业名称：" >
                {{companyInfo.csrName}}
        	</LabelText>
		 	<Table :columns="companyColumns" style="margin-bottom:20px" :data="companyList"></Table>
		</div>
		<div class="u-company-info">
			<Card id="u-step-two">
				<p slot="title" class="card-title">
					企业成员信息
				</p>
				<div class="u-add-manager">
					<Button type="primary" @click="openAddManager">添加管理员</Button>
				</div>
				<Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
					<Tab-pane :label="`管理员(${managerCount})`" name="manager">
						<ManagerList 
							:mask="key"
							:reload="getManagerCount"
						/>
					</Tab-pane>
					<Tab-pane :label="`在职员工(${employeeCount})`" name="employee">   
						<EmployeeList 
							:mask="key"
							:reload="getEmployeeCount"
						/>
					</Tab-pane>
				</Tabs> 
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
import ManagerList from './managerList';
import EmployeeList from './employeeList';

export default {
	components:{
		SectionTitle,
		DetailStyle,
		LabelText,
		CommunityManage,
		ManagerList,
		EmployeeList
	},
	data(){
		return{
			activeKey:'manager',
			key:'',
			detail:{},
			openTip:false,
			basicInfo:{},
			incomeType:null,
			dealDate:"",
            ctime:'',
			Params:{
                page:1,
                pageSize:15
			},
			itemDetail:{},
			managerCount:0,
			employeeCount:0,
			companyInfo:{},
			cmtIds:"",
			companyColumns:[
				{
				 title: '入驻社区',
                 key: 'cmtName',
				 align:'center',
				},
				{
				 title: '入驻开始日期',
                 key: 'enterStatusDesc',
				 align:'center',
				},
				{
				 title: '入驻结束日期',
                 key: 'enterStatusDesc',
				 align:'center',
				},
				{
				 title: '当前入驻状态',
                 key: 'enterStatusDesc',
				 align:'center',
				 render(h,obj){
					 let status;
					 switch (obj.row.enterStatusDesc){
						 case '':
						 status=obj.row.enterStatusDesc
						 return h('span',{
								style:{
									color:'#F5A623'
								}
						 },status) 
						 break;
						 default:
						 return h('span',{},obj.row.enterStatusDesc);
					 }
					
				 }
				},
				{
				 title: '该社区管理员数量',
                 key: 'managerNum',
				 align:'center',
				},
				{
				 title: '管理员未激活数量',
                 key: 'managerNum',
				 align:'center',
				 render(h,obj){

				 }
                }
			],
			
			companyList:[],
		}
	},
	mounted:function(){
		GLOBALSIDESWITCH("false");
	
	},
	methods:{
		getManagerCount(){

		},
		getEmployeeCount(){

		},
		tabsClick(key){
           this.key=key;
           sessionStorage.setItem('manageMask',key);
        },
		openAddManager(){

		},
		setManager(params){
			this.itemDetail=params;
			this.hideTip();
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
	.u-add-manager{
		margin-bottom:10px;
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
