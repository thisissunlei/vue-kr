<template>
   <div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"/>
		客户撤场结算单
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="结算单编号：">
			    {{basicInfo.checklistNum}}
			</LabelText>
			<LabelText label="状态：">
				{{basicInfo.checklistStatusName}}
			</LabelText>
			<LabelText label="客户名称：">
				{{basicInfo.csrName}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.cmtName}}
			</LabelText>
			<LabelText label="服务尾日：">
			    {{basicInfo.lastServiceDate| dateFormat('YYYY-MM-dd')}}
			</LabelText>
			<LabelText label="生效日期：">
				{{basicInfo.effectDate | dateFormat('YYYY-MM-dd HH:mm:ss')}}
			</LabelText>
			<LabelText label="生成日期：">
				{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:ss')}}
			</LabelText>
         </DetailStyle>

         <DetailStyle info="结算信息">
			<Table :columns="service" :data="details" border></Table>
            
            <div >
            	<div class="amount-list">
            		<span class="amount-name">用户余额：</span>
            		<span class="amount-content">{{basicInfo.balance | thousand}} </span>
            	</div>
            	<div class="amount-list">
            		<span class="amount-name">在押履约保证金：</span>
            		<span class="amount-content">{{basicInfo.deposit | thousand}}  </span>
            	</div>
            	<div class="amount-list">
            		<span class="amount-name">未结算总额：</span>
            		<span class="amount-content">{{ownAmount | thousand}} </span>
            	</div>
            	<div class="amount-list" style="color:red">
            		<span class="amount-name">应退款金额：</span>
            		<span class="amount-content">{{totalRefunds | thousand}} </span>
            	</div>
            </div>
		</DetailStyle>

		<DetailStyle info="附件信息">
			<div class="none-list" v-if="!attachmentList.length" style="margin-left:12px">暂无附件</div>
			<div class="file-list" style="margin-left:12px" v-for="item in attachmentList" >
				<span  @click="downFile(item)" style="cursor:pointer">{{item.fileName}}</span>
			</div>
			<div style="width:200px;margin-left:12px" >
			<Progress :percent="progress" v-if="isUploading"  :stroke-width="5"></Progress>
			</div>
			<div class="bottom" style="height:20px"></div>
        </DetailStyle>

		<!-- <DetailStyle info="操作记录">
            <Table :columns="contract" :data="contractData" border></Table>
		</DetailStyle> -->
	</div>
	<div class="m-detail-buttons">
		
		<Button type="primary" @click="download"style="margin-left:8px" >下载PDF文件</Button>
		<!-- //未生效时才可编辑 -->
		<Button type="primary" @click="edit" style="margin-left:8px" v-show="basicInfo.checklistStatus=='UNEFFECTIVE'">编辑</Button>
		<!-- 未生效并且有PDF才可显示 -->
		<Button type="primary" @click="becomeEffective" v-show="basicInfo.checklistStatus=='UNEFFECTIVE' && attachmentList.length" style="margin-left:8px">生效</Button>
		<div class="file-button" >
			<input type="file" name="file" @change="onChange" >上传附件</input>
			
		</div>
	</div>
	<Modal
            v-model="openTakeEffect"
            title="账单生效"
            width="660"
        >
            <div>账单是否生效?</div>
            <div slot="footer">
                <Button type="primary" @click="takeEffectSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="becomeEffective">取消</Button>
            </div>
        </Modal>
</div>	
</template>
<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		LabelText
	},
	head() {
        return {
            title: '结算单详情页'
        }
    },
	data(){
		return{
			disabled:false,
			ownAmount:0,
			totalRefunds:0,
			// 生效显示
			openTakeEffect:false,
			basicInfo:{},

			service:[
				{
				 title: '费用名称',
                 key: 'feeTypeName',
                 align:'center'	,
                 render:(h,params)=>{
                 	if(params.row.billId){
                 		return params.row.billName
                 	}else{
                 		return params.row.feeTypeName
                 	}
                 }
                            
				},
                {
				 title: '费用金额(元)',
                 key: 'payableAmount',
                 align:'right',
                 render:function(h,params){
                 	return utils.thousand(params.row.payableAmount)
                 }	
				}
			],
            contract:[
               {
				 title: '时间',
                 key: 'contractNum',
                 align:'center'	,
				},
				{
				 title: '账号',
                 key: 'rentAmount',
                 align:'center',

				},
				{
				 title: '详情',
                 key: 'orderStatusTypeName',
                 align:'center'	
				}  
			],

			details:[],
			contractData:[],
			progress:0,
			isUploading:false,
			attachmentList:[]
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH("false");
		let {params}=this.$route;
		let from={
			checklistId:params.billId
		};
		console.log('checklistId',from)
		var _this=this;
	     this.$http.get('get-settlement-detail', from, r => {
	     	// 未结算总额
	     	let ownAmount = 0;
	     	r.data.details.map(item=>{
	     		ownAmount += item.payableAmount;
	     	})
	     	_this.ownAmount = ownAmount;
	     	//计算应退款金额（余额+保证金-未结算）
	     	_this.totalRefunds = r.data.deposit+r.data.balance-ownAmount;
				   _this.basicInfo=r.data;
				   _this.details = r.data.details;
				   _this.attachmentList = r.data.attachments;
           	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
	},
	methods:{
		becomeEffective(){
			this.openTakeEffect = !this.openTakeEffect
		},
		takeEffectSubmit(){
			
			this.$http.post('post-effective', {checklistId:this.$route.params.billId}).then( r => {
				   this.becomeEffective()
				   
				   this.$Notice.success({
                    	title:'生效成功'
                	});
				   location.reload() 
           	}).catch( e => {
                this.$Notice.error({
                    title:e.message
                });
            })
		},
		edit(){
			let {params}=this.$route;
            window.open(`/bill/settlement-list/${params.billId}/edit/`);

		},
		download(){
			let {params}=this.$route;
				this.$http.get('get-settlement-pdf-id', {checklistId:params.billId}).then( r => {
                    this.downloadContent(r.data.pdfId)
                }).catch( e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })
		},
		onChange(event){
			let that = this;
			let file = event.target.files[0];
			var fileName= file.name;
			if (!file) {
				return;
			}

			let category = 'op/upload';
			if (file) {
				this.progress = 0;
				this.isUploading = true;
				var timer = window.setInterval(function() {
						if (that.progress >= 100) {
							this.isUploading = false;
							window.clearInterval(timer);
						}
						that.progress += 10;
					
				}, 300);
			}
			var form = new FormData();
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var response = xhr.response.data;
						form.append('OSSAccessKeyId', response.ossAccessKeyId);
						form.append('policy', response.policy);
						form.append('Signature', response.sign);
						form.append('key', response.pathPrefix+'/'+file.name);
						form.append('uid', response.uid);
						form.append('callback', response.callback);
						form.append('x:original_name', file.name);
						form.append('file', file);
						
						var xhrfile = new XMLHttpRequest();
						xhrfile.onreadystatechange = function() {
							if (xhrfile.readyState === 4) {
								var fileResponse = xhrfile.response;
								if (xhrfile.status === 200) {
									if (fileResponse && fileResponse.code > 0) {
										var params = {};
										that.isShowProgress = "none";
										that.progress = 100;
										params.name = fileName;
										params.url = fileResponse.data.url;
										params.fileId = ""+fileResponse.data.id;
										params.fileName = fileName;
										params.fileUrl = fileResponse.data.url;
										params.type = "ATTACHMENT"
										that.onSuccess(params)

									} else {
										//报错
										that.isShowProgress = "none";
										that.progress = 100;
										console.log(fileResponse.msg)
										that.$Notice.error({
												title:fileResponse.msg
										});
										that.onError(fileResponse.msg);
									}
								} else if (xhrfile.status == 413) {
									that.isShowProgress = "none";
									that.progress = 100;
									
									that.$Notice.error({
										title:"您上传的文件过大！"
									});
									that.onError('您上传的文件过大！');
								} else {
									that.isShowProgress = "none";
									that.progress = 100;
									
									that.$Notice.error({
										title:'后台报错请联系管理员！'
									});
								
								}
							}
						};
						xhrfile.open('POST', response.serverUrl, true);
						xhrfile.responseType = 'json';
						xhrfile.send(form);
					} else {
						that.onTokenError();
					}
				}
				
			};

			xhr.open('GET', '/api/krspace-op-web/sys/upload-policy?isPublic=true&category='+category, true);
			xhr.responseType = 'json';
			xhr.send();
		},
		onSuccess(response){
			let _this = this;
			this.$http.post("post-checklist-list", {
                    checklistId:this.$route.params.billId,
                    fileId:response.fileId,
                    fileName:response.fileName
                }).then((response) => {
                    _this.getAttachmentList()
                }).catch((error) => {
                    _this.$Notice.error({
                        title:error.message
                    });
                })
		},
		onError(message) {
			message = message || '上传文件失败';
			this.progress = 0;
			this.isUploading = false
			alert(message)
		},
		onTokenError() {
			alert('初始化上传文件失败')
		},
		getAttachmentList(){
			let _this = this;
			this.$http.get("get-checklist-list", {
                    checklistId:this.$route.params.billId,
                }).then((response) => {
                	console.log('getAttachmentList',response.data.attachments)
                    _this.attachmentList = response.data.attachments;
                    _this.isUploading = false
                }).catch((error) => {
                    _this.$Notice.error({
                        title:error.message
                    });
                })
		},
		downFile(params){
			var that=this;
			this.newWin = window.open();
			this.$http.post('get-station-contract-pdf-url', {
				id:params.fileId,
				
			}, (response) => {
				 that.newWin.location = response.data;
			
			}, (error) => {
				that.$Notice.error({
                    title:error.message
                });
			})   
		},
		downloadContent(id){
			var newWin = window.open();
			this.$http.post('get-station-contract-pdf-url', {
				id:id,
				
			}).then( (response) => {
				newWin.location = response.data;
			}).catch( (error) => {
				that.$Notice.error({
                    title:error.message
                });
			})
		}
	}
}
</script>

<style lang="less" scoped>  
   .g-order-detail{
		margin:-10px;
		.m-detail-header{
			height:50px;
			border-bottom: 1px solid #E8E9E9;
			line-height: 50px;
			font-size: 16px;
			color: #666666;
			.u-border-left{
				width:0;
				height:24px;
				border:2px solid  #499DF1;
				margin-right:20px;
			}
		}
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.m-detail-buttons{
			margin-left: 40px;
			margin-bottom: 40px;
		}
		.amount-list{
			font-weight:bold;
			display:block;
			width:230px;
			height: 30px;
			line-height: 30px;
			text-align: right;
			margin-left:auto;
			.amount-name{
				width: 120px;
				display: inline-block;
			}
			.amount-content{
				width:100px;
				display: inline-block;

			}
		}
		.file-list{
			color: #499df1;
			font-size: 15px;
			font-weight: 600;
			height: 30px;
			line-height: 30px;
		}
		.file-button{

			height:32px;
			width:100px;
			color:#fff;
			background-color: #2d8cf0;
			border:none;
			line-height:35px;
			position:relative;
			text-align:center;
			overflow:hidden;
			display: inline-block;
			border-radius: 4px;
			vertical-align: bottom;
			margin-left: 8px;

			input[type=file]{
				opacity:0;
				position:absolute;
				top:0;
				left:0;
				right:0;
				bottom:0;
			}

			.progress{
				// background-color:#328ECC;
				display:block;
				top:0;
				left:0;
				right:0;
				bottom:0;
				position:absolute;
				background:rgba(43,141,205,.7);
			}
		}

	}
</style>