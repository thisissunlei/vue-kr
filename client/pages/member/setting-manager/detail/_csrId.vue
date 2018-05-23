<template>
<div class="g-setting-detail">
	<SectionTitle title="设置企业管理员" ></SectionTitle>
	<div class="m-detail-content">
		<div class="u-company-info">
			<Card id="u-step-one">
				<p slot="title" class="card-title">
					企业信息
				</p>
				<LabelText :inline="true" label="企业名称：">
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
        width="443"
     >
      <p class="u-tip">确定要{{TipTxt}}管理员吗？</p>
	  <div slot="footer">
			<Button type="primary" @click="tipSubmit">确定</Button>
			<Button type="ghost" style="margin-left: 8px" @click="hideTip">取消</Button>
      </div>
    </Modal>
	<Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>
</div>
</template>
<script>

import SectionTitle from '~/components/SectionTitle';
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';

export default {
	components:{
		SectionTitle,
		DetailStyle,
		LabelText,
		Message
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
			TipTxt:'',
			Params:{
                page:1,
                pageSize:15
			},
			isManager:'',
			openMessage:false,
			warn:'',
			MessageType:'',
			itemDetail:{},
			managerCount:0,
			mbrName:'',
			isRefresh:false,
			companyInfo:{},
			cmtIds:"",
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
				}
			],
			companyColumns:[
				{
				 title: '社区名称',
                 key: 'mbrName',
				 align:'center',
				},
				{
				 title: '当前入驻状态',
                 key: 'mbrName',
				 align:'center',
				},
				{
				 title: '该社区管理员数量',
                 key: 'mbrName',
				 align:'center',
                }
			],
			companyList:[],
		}
	},
	mounted:function(){
		GLOBALSIDESWITCH("false");
		this.getInfo();
	
	},
	methods:{
		renderList(){
			var _this=this;
			let obj={
				 title: `管理员(${this.managerCount})`,
                 key: 'isManager',
				 align:'center',
				 render(h, obj){
					 if(obj.row.isManager=='1'){
						  return h('div', [
                                 h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#FF6868'
                                    },
                                    on: {
                                        click: () => {
                                            _this.cancelManager(obj.row)
                                        }
                                    }
                                }, '取消管理员')
                            ]);  
						  
					 }else if(obj.row.isManager=='0'){
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
                                            _this.setManager(obj.row)
                                        }
                                    }
                                }, '设置管理员')
                            ]);  
						  
					 }
                        
                }
				};
				if(this.list.length<7){
					this.list.push(obj);
				}else{
					this.list.pop();
					this.list.push(obj);
				}
			
			
		},
		getInfo(){
			let {params}=this.$route;
			this.Params.csrId=params.csrId;
			this.$http.get('customer-manager-staff-list', this.Params).then((res)=>{
				this.listInfo=res.data.items;
				this.totalCount=res.data.totalCount;
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
			this.getCompanyInfo(params);
			this.getCount();
			
		},
		getCompanyInfo(params){
			this.$http.get('customer-community-enter-infot', {
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
		getCount(){
			let {params}=this.$route;
			let Params={
				csrId:params.csrId
			}
			this.$http.get('get-manager-count', Params).then((res)=>{
				this.managerCount=res.data.managerCount;
				this.renderList();
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
		cancelManager(params){
			this.TipTxt="取消";
			this.isManager=0;
			this.itemDetail=params;
			this.hideTip();
		},
		setManager(params){
			this.TipTxt="设置";
			this.isManager=1;
			this.itemDetail=params;
			this.hideTip();
		},
		hideTip(){
			this.openTip=!this.openTip;
		},
		tipSubmit(){
			let Params={
				mbrId:this.itemDetail.mbrId,
				cmtIds:this.cmtIds
			}
			this.isRefresh=true;
			this.$emit('changeOpen',this.isRefresh);
			this.$http.post('edit-customer-manager', Params).then((res)=>{
				if(res.code==-1){
					this.MessageType="error";
					this.warn=res.message;
					this.openMessage=true;
					return;
				}
				this.openTip=false;
				this.MessageType="success";
				this.warn=`${this.TipTxt}管理员成功！`
				this.openMessage=true;
				this.getInfo();
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		onChangeOpen(data){
                this.openMessage=data;
		},
		lowerSubmit(){
			  	this.Params.page=1;
                this.Params.mbrName=this.mbrName;
                this.getInfo();
		},

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
