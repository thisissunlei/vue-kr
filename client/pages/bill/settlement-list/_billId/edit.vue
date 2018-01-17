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
			<LabelText label="服务尾期：">
				{{basicInfo.lastServiceDate | dateFormat('YYYY-MM-dd')}}
			</LabelText>
			<LabelText label="客户名称：">
				{{basicInfo.csrName}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.cmtName}}
			</LabelText>
         </DetailStyle>

         <DetailStyle info="结算信息">
         	<Form :model="formItem" ref="formItem">
	         <Row style="margin-bottom:10px">  
	            <Col class="col">
	                <Button type="primary" style="margin-right:20px;font-size:14px" @click="handleAdd">添加</Button>
	                <Button type="ghost" style="font-size:14px" @click="deleteDiscount">删除</Button>
	                <span v-if="error" style="display:inline-block;color:red;margin-left:20px">{{errorMessage}}</span>
	            </Col>
	         </Row>
            <Row style="margin-top:30px">
                    <Col span="3" class="discount-table-head"  >
                        <Checkbox v-model="selectAll" @on-change="selectDiscount" ></Checkbox>
                    </Col>
                    <Col span="11" class="discount-table-head" >
                       <span> 费用名称</span>
                    </Col>
                    <Col span="10" class="discount-table-head" >
                        <span>费用金额</span>
                    </Col>
                </Row>
                <FormItem
                v-for="(item, index) in formItem.details"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none"
                >
            <Row v-show="item.show">
                <Col span="3" class="discount-table-content" style="padding:0">
                    <Checkbox v-model="item.select" :disabled="!!item.billId"></Checkbox>
                </Col>
                <Col span="11"  class="discount-table-content">
                   	<span v-if="item.billId"> {{item.billName}}</span>
                  	<Select v-model="item.feeType" label-in-value @on-change="changeType" v-if="!item.billId" style="width:200px">
                            <Option v-for="(types,i) in settlementOption" :value="types.value" :key="types.value" >{{ types.label }}</Option>
                    </Select>
                </Col>
                <Col span="10"  class="discount-table-content" >
                     <span v-if="item.billId">{{item.payableAmount}}</span>
                    <Input v-model="item.payableAmount" placeholder="金额" @on-blur="changeAmount" v-if="!item.billId" style="width:200px" number></Input>
                </Col>
                      
            </Row>
        </FormItem>

        </Form>
            
		</DetailStyle>

	</div>
	<div class="m-detail-buttons">
		
		<Button type="primary" @click="submitForm('formItem')" :disabled="disabled">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
	</div>
</div>	
</template>
<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import utils from '~/plugins/utils';

export default {
	components:{
		DetailStyle,
		LabelText
	},
	head() {
        return {
            title: '结算单编辑'
        }
    },
	data(){
		const validatePass = (rule, value, callback) => {
			return;
            if (value === '') {
                callback(new Error('Please enter your password'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
       	};
		return{
			basicInfo:{},
			validatePass:validatePass,
			formItem:{
				details:[]
			},
			settlementOption:[],
			selectAll:false,
			errorMessage:'ssssss',
			error:false,
			disabled:false,
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH("false");
		let {params}=this.$route;
		let from={
			checklistId:params.billId
		};
		var _this=this;
	     this.$http.get('get-settlement-detail', from, r => {
				   _this.basicInfo=r.data;

				   _this.formItem.details = r.data.details.map((item)=>{
				   	let obj = item;
				   	obj.show = true;
				   	return obj;
				   })
				   _this.getAmountName()
           	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
	},
	methods:{
		getAmountName(){
			let _this = this;
			let settlementOption = []
			this.$http.get('get-amount-name-data', {}).then(
				r=>{
					_this.settlementOption = r.data.feeTypes.map(item=>{
						let obj = item;
						obj.label = item.desc;
						return obj
					})
				}).catch(err=>{
					console.log('err',err)
				})
		},
		handleAdd(){
		//添加结算信息
			this.formItem.details.push({
				name:'',
				amount:'',
				show:true,
				edit:true

			})

		},
		becomeEffective(){

		},
		cancel(){
			window.close();
            window.opener.location.reload();

		},
		deleteDiscount(){
			// 删除选中的优惠信息
                let items = this.formItem.details;
                let select = []
                select = items.map((item)=>{
                	console.log('item.select',item)
                    return item.select;
                })
                console.log('deleteDiscount',select)
                items = items.map(function(item, index) {
                    if (item.select) {
                        item.show = false
                    }
                    return item;
                });
                this.formItem.details = items;
                this.checkList()
                this.selectDiscount(false)

		},
		selectDiscount(value){
			// checkbox的全选事件
			console.log(value)
                let items = this.formItem.details;
                items = items.map((item)=>{
                    let obj = item;
                    if(!item.billId){
                    	obj.select = value;
                    }
                    return obj;
                })
                this.selectAll = value;
                this.formItem.details = items;

		},
		submitForm(name){
			this.checkList()
			console.log('submitForm',this.error)
			if(this.error){
				this.$Notice.error({
                    title:this.errorMessage
                });
				console.log('不能提交')
			}else{
				this.postChecklist()
				console.log('提交')
			}
		

		},
		changeType(value){
			console.log('value',value)
		},
		changeAmount(val){
			console.log('changeAmount',val)
		},
		//处理结算信息是否有未填项
		checkList(){
			//处理结算信息的费用名称是否选
			let _this = this;
			let items = this.formItem.details.filter((item,index)=>{
				if(!item.billId && item.show){
					return true
					
				}
				return false
			})
			if(items.length){
				items.map(item=>{
					_this.error = false;
					if(isNaN(item.payableAmount)){
						_this.error = true;
						_this.errorMessage = "金额请填写数字"
					}if(!item.feeType || !item.payableAmount){
						_this.error = true;
						_this.errorMessage = "结算表单未填写完整"
					}	

				})
			}else{
				this.error = false
			}



					
		},
		postChecklist(){
			let content = this.formItem.details.filter(item=>{
				if(item.show){
					return true
				}
				return false
			})
			let form = {
				checklistId:this.$route.params.billId,
				detailsStr:JSON.stringify(content)
			}
			this.$http.post('post-edit-settlement-detail', form).then(
				r=>{
					this.disabled = true
					setTimeout(function(){
						window.close();
                    	window.opener.location.reload();
					})
					
				}).catch(err=>{
					console.log('err',err)
				})
		}
	}
}
</script>

<style lang="less" scoped>  
   .g-order-detail{
		margin:-10px;
		height: 100%;
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
			margin-top: 30px;
			margin-bottom: 60px;
		}
		.amount-list{
			font-weight:bold;
			display:block;
			width:200px;
			margin-left:auto;
		}
		.discount-table-head{
                background: #F5F6FA;
                height:50px;
                line-height:50px;
                text-align:center;
                font-weight: 500;
                border:1px solid #e9eaec;
                border-left:none;
                border-right:none;
                border-left:1px solid #e9eaec;
                
            }
            .discount-table-content{
                background: #fff;
                padding:0 15px;
                height:50px;
                line-height:50px;
                text-align:center;
                border-left:1px solid #e9eaec;
                border-bottom:1px solid #e9eaec;
            }
	}
</style>