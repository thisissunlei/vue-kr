<template>
<div class="g-setting-detail">
	<SectionTitle title="设置企业管理员" ></SectionTitle>
	<div class="m-detail-content">
		<div class="u-company-info">
			<div>
				<LabelText :inline="false" label="企业名称：" >
					{{companyInfo.csrName}}
				</LabelText>
				<!-- <div class="u-status-tip">
                        <div class="u-tip-txt">
                            <span class="u-tip-icon"></span>
                            <span>关于管理员激活状态</span>
                        </div>
                        <div class="u-tip-content u-show">
                            <div class="u-icon-trigon"></div>
                           <p>1.  若该管理员登录过APP或官网-会员中心，系统认定为其“已激活”；</p> 
                           <p> 2.  若管理员一直未激活，请注意提醒Ta ，避免无法接收企业账单、管理企业等情况。</p> 
                        </div>
                </div> -->
			</div>
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
					<Tab-pane :label="`管理员(${count.adminNum})`" name="manager">
						<ManagerList 
							:mask="key"
							:reload="getCount"
							:openSetManager="hideTip"
						/>
					</Tab-pane>
					<Tab-pane :label="`在职员工(${count.employeesNum})`" name="employee">   
						<EmployeeList 
							:mask="key"
							:reload="getCount"
							:openSetManager="hideTip"
						/>
					</Tab-pane>
				</Tabs> 
			</Card>
		</div>
	</div>
	 <Modal
        v-model="openTip"
        :title="tipTitle"
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
	 <Modal
        v-model="isAddManager"
        title="添加管理员"
        ok-text="确定"
        cancel-text="取消"
        width="665"
     >
		<AddManager  
			v-if="isAddManager"
			:detail="itemDetail"
			@checkData="getCheckData"
		/>
	  <div slot="footer">
			<Button type="primary" @click="managerSubmit">确定</Button>
			<Button type="ghost" style="margin-left: 8px" @click="openAddManager">取消</Button>
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
import AddManager from './addManager';

export default {
	components:{
		SectionTitle,
		DetailStyle,
		LabelText,
		CommunityManage,
		ManagerList,
		EmployeeList,
		AddManager
	},
	data(){
		return{
			activeKey:'manager',
			key:'',
			detail:{},
			openTip:false,
			isAddManager:false,
			basicInfo:{},
			incomeType:null,
			dealDate:"",
            ctime:'',
			Params:{
                page:1,
                pageSize:15
			},
			count:{
				adminNum:0,
				employeesNum:0,
			},
			itemDetail:{},
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
                 key: 'enterDate',
				 align:'center',
				 render(h,obj){
					 let time=obj.row.enterDate?obj.row.enterDate:'-';
					 return h('span',{},time);
				 }
				},
				{
				 title: '入驻结束日期',
                 key: 'leaveDate',
				 align:'center',
				 render(h,obj){
					 let time=obj.row.leaveDate?obj.row.leaveDate:'-';
					 return h('span',{},time);
				 }
				},
				{
				 title: '当前入驻状态',
                 key: 'enterStatusDesc',
				 align:'center',
				 render(h,obj){
					 let status;
					 switch (obj.row.enterStatus){
						 case 2:
						 return h('span',{
								style:{
									color:'#666666'
								}
						 },obj.row.enterStatusDesc) 
						 break;
						 default:
						 return h('span',{
							style:{
								color:'#FE7749'
							} 
						 },obj.row.enterStatusDesc);
					 }
					
				 }
				},
				{
				 title: '该社区管理员数量',
                 key: 'managerNum',
				 align:'center',
				},
				// {
				//  title: '管理员未激活数量',
                //  key: 'managerNum',
				//  align:'center',
				//  render(h,obj){

				//  }
                // }
			],
			companyList:[],
			tipTitle:'',
		}
	},
	mounted:function(){
		GLOBALSIDESWITCH("false");
		let {params}=this.$route;
		this.Params.csrId=params.csrId;
		this.getCompanyInfo(params);
		this.getCount(params);
	},
	methods:{
		getCount(params){
			this.$http.get('get-customer-manager-csr-mbrtype-num', {
				customerId:params.csrId
			}).then((res)=>{
				this.count=res.data.items;
				
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		tabsClick(key){
           this.key=key;
           sessionStorage.setItem('manageMask',key);
        },
		openAddManager(){
			this.isAddManager=!this.isAddManager;
		},
		managerSubmit(){

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
		
		hideTip(form){
			if(form){
				this.itemDetail=form;
				this.tipTitle=`请选择 ${form.mbrName} 管理的社区`
			}
			this.openTip=!this.openTip;
		},
		tipSubmit(){
			let {params}=this.$route;
			let Params={
				mbrId:this.itemDetail.mbrId,
				cmtIds:this.cmtIds,
				customerId:params.csrId,
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
	 .u-status-tip{
        width:150px;
        float:right;
        line-height:30px;
        position: relative;
       
        span{
          font-size: 12px;
          color: #666666;  
        }
        .u-tip-icon{
            width:13px;
            height:13px;
            display: inline-block;
            margin-right:7px;
            vertical-align: -2px;
            background: url('./images/question.svg') no-repeat center center;
            background-size:100% 100%;
        }
        .u-tip-content{
            display: none;
            width:217px;
            height:120px;
            line-height: 20px;
            background: #575D6A;
            border-radius: 4px;
            font-size: 12px;
            color: #FFFFFF;
            padding:10px;
            box-sizing: border-box;
            position: absolute;
            left:-102px;
            top:40px;
            z-index: 900;
           
           .u-icon-trigon{
                width:0;
                height:0;
                border:6px solid transparent;
                border-bottom-color: #575D6A;
                position: absolute;
                top:-12px;
                left:50%;
                transform: translateX(-50%);
                
           }
        }
        .u-tip-txt{
             white-space: nowrap;
             &:hover+.u-show{
                display: inline-block;

            } 
        }
       
    }

}
.u-tip{
	text-align: center;
}
</style>
