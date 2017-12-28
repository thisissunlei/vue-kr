<template>
<div class="g-setting-detail">
	<div class="m-detail-content">
		<div class="u-detail-info">
			<LabelText label="企业名称：" style="width:100%;">
				{{detail.csrName}}
			</LabelText>	
			<LabelText label="已入驻社区：" style="width:100%;">
				{{detail.cmtName}}
			</LabelText>
		</div>
		<div class="u-detail-table">
			<div class="u-table-label">员工列表：</div>
			<div class="u-search-box">
				<div style='float:right;'>
					<Input 
						v-model="mbrName" 
						placeholder="请输入员工姓名"
						style="width: 240px"
					></Input>
					<div class='m-search' @click="lowerSubmit">搜索</div>
				</div> 
       		</div>
			<Table border :columns="list" :data="listInfo"></Table>
			 <div v-if="totalCount>15" style="margin: 10px;height:40px;overflow: hidden">
                <!-- <Button type="primary" @click="onExport">导出</Button> -->
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
        v-on:changeOpen="onChangeOpen"
    ></Message>
</div>
</template>
<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';

export default {
	components:{
		DetailStyle,
		LabelText,
		Message
	},
	props:['detail'],
	data(){
		return{
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
			]
		}
	},
	mounted:function(){
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
				if(this.list.length<4){
					this.list.push(obj);
				}else{
					this.list.pop();
					this.list.push(obj);
				}
			
			
		},
		getInfo(){
			this.Params.csrId=this.detail.csrId;
			this.$http.get('customer-manager-detail', this.Params, res => {
				this.listInfo=res.data.items;
				this.totalCount=res.data.totalCount;
           	}, err => {
				this.$Notice.error({
					title:err.message
				});
        	})
			this.getCount();
		},
		getCount(){
			let Params={
				csrId:this.detail.csrId
			}
			this.$http.get('get-manager-count', Params, res => {
				this.managerCount=res.data.managerCount;
				this.renderList();
           	}, err => {
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
				isManager:this.isManager
			}
			this.isRefresh=true;
			this.$emit('changeOpen',this.isRefresh);
			this.$http.post('edit-customer-manager', Params, res => {
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
           	}, err => {
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
	.u-detail-info{
		margin-top:20px;
	}
	.u-detail-table{
		margin-left:15px;
		.u-table-label{
			margin-bottom:10px;
		}
	}
	.u-search-box{
		height:32px;
		margin:16px 0;
		
    }

}
.u-tip{
	text-align: center;
}
</style>
