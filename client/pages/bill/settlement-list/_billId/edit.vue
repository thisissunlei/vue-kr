<template>
   <div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"/>
		客户撤场结算单
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="结算单编号：">
			    {{basicInfo.customerName}}
			</LabelText>
			<LabelText label="服务尾期：">
				{{basicInfo.ctime | dateFormat('YYYY-MM-dd')}}
			</LabelText>
			<LabelText label="客户名称：">
				{{basicInfo.salerName}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
         </DetailStyle>

         <DetailStyle info="结算信息">
         	<Form :model="formItem">
	         <Row style="margin-bottom:10px">  
	            <Col class="col">
	                <Button type="primary" style="margin-right:20px;font-size:14px" @click="handleAdd">添加</Button>
	                <Button type="ghost" style="font-size:14px" @click="deleteDiscount">删除</Button>
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
                v-for="(item, index) in list"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none"
                >
            <Row v-show="item.show">
                <Col span="3" class="discount-table-content" style="padding:0">
                    <Checkbox v-model="item.select" :disabled="!item.edit"></Checkbox>
                </Col>
                <Col span="11"  class="discount-table-content">
                   	<span v-if="item.edit == false"> {{item.name}}</span>
                  	<Select v-model="item.value" label-in-value @on-change="changeType" v-if="item.edit != false" style="width:200px">
                            <Option v-for="(types,i) in settlementOption" :value="types.value+'/'+index" :key="types.value" >{{ types.label }}</Option>
                    </Select>
                </Col>
                <Col span="10"  class="discount-table-content" >
                    <span v-if="item.edit == false">{{item.amount}}</span>
                    <Input v-model="item.amount" placeholder="金额" @on-blur="changeAmount" v-if="item.edit != false" style="width:200px"></Input>
                </Col>
                      
            </Row>
        </FormItem>

        </Form>
            
		</DetailStyle>

	</div>
	<div class="m-detail-buttons">
		
		<Button type="primary" @click="submitForm">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="downSwitch">取消</Button>
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
            title: '结算单详情'
        }
    },
	data(){
		return{
			basicInfo:{},
			list:[
				{
					name:'客户余额',
					amount:30000,
					edit:false,
					show:true
				},
				{
					name:'客户余额',
					amount:30000,
					edit:false,
					show:true
				},
				{
					name:'客户余额',
					amount:30000,
					show:true,
					edit:false,
				},
			],
			settlementOption:[
				{
					value:'zhuozo',
					label:'桌子'
				},
				{
					value:'zhuozo1',
					label:'桌子1'
				},
				{
					value:'zhuozo2',
					label:'桌子2'
				},
				{
					value:'zhuozo3',
					label:'桌子3'
				},
			],
			selectAll:false,
			formItem:{}
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH("false");
		let {params}=this.$route;
		let from={
			id:params.billId
		};
		var _this=this;
	     this.$http.get('join-bill-detail', from, r => {
				   _this.basicInfo=r.data;
           	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
	},
	methods:{
		handleAdd(){
		//添加结算信息
			this.list.push({
				name:'',
				amount:'',
				show:true,
				edit:true

			})

		},
		becomeEffective(){

		},
		edit(){
			let {params}=this.$route;
            window.open(`/bill/settlement-list/${params.billId}/edit/`,params.billId);

		},
		downSwitch(){

		},
		upload(){

		},
		deleteDiscount(){

		},
		selectDiscount(){

		},
		submitForm(){
			console.log('submitForm',this.list)

		},
		changeType(value){
			console.log('value',value)
		},
		changeAmount(val){
			console.log('changeAmount',val)
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