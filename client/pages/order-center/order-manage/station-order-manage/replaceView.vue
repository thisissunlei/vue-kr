<template>
   <div class="g-order-detail">
		<SectionTitle title="换租订单详情" ></SectionTitle>
		<div class="create-order">
            <Card id="step-one">
                <p slot="title" class="card-title">
                   基本信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(0)">
                	编辑
		        </a>
                <LabelText :inline="inline" label="客户名称：">
                    {{formItem.discount}}
                </LabelText>
                <LabelText  :inline="inline" label="客户名称：">
                    {{formItem.discount}}
                </LabelText>
                <LabelText :inline="inline" label="客户名称：">
                    {{formItem.discount}}
                </LabelText>

            </Card>
            <span class="space"></span>
            <Card id="step-two">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(1)">
                	编辑
		        </a>
                <LabelText :inline="inline" label="换租服务开始日">
                    {{formItem.discount}}
                </LabelText>
                <!-- <Table :columns="oldStatonColumns" :data="formItem.oldStation"></Table> -->
                <Table :columns="oldStatonColumns" style="margin:20px 0"></Table>

            </Card>
            <span class="space"></span>

            <Card id="step-three">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(2)">
                	编辑
		        </a>
                <LabelText :inline="inline" label="优惠折扣">
                    {{formItem.discount}}
                </LabelText>
                <!-- <Table :columns="oldStatonColumns" :data="formItem.oldStation"></Table> -->
                <Table :columns="newStatonColumns" style="margin:20px 0"></Table>
                <LabelText :inline="inline" label="免租开始日">
                    {{formItem.discount}}
                </LabelText>
                <Table :columns="newStatonMoneyColumns"></Table>
                <LabelText :inline="inline" label="付款周期">
                    {{formItem.discount}}
                </LabelText>
                <LabelText :inline="inline" label="服务保证金">
                    {{formItem.discount}}
                </LabelText>
                <LabelText :inline="inline" label="首付款日期">
                    {{formItem.discount}}
                </LabelText>
            </Card>
            <span class="space"></span>
            <Card id="step-four">
                <p slot="title" class="card-title">
                    服务费信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(3)">
                	编辑
		        </a>
                <Table :columns="oldInfoColumns" style="margin:20px 0"></Table>
                <Table :columns="newInfoColumns" style="margin:20px 0"></Table>
                <LabelText  :inline="inline"label="退还服务费">
                    {{formItem.discount}}
                </LabelText>
                <LabelText  :inline="inline"label="旧服务保证金转新">
                    {{formItem.discount}}
                </LabelText>
                <LabelText :inline="inline" label="扣除服务保证金">
                    {{formItem.discount}}
                </LabelText>
            </Card>
            <div class="buttons">

                <Button type="ghost" @click="editCard(3)">取消</Button>
                <span class="between"></span>
                <Button type="primary" @click="submit">提交</Button>
                    
            </div>
        </div>
   </div>	
</template>


<script>

    import SectionTitle from '~/components/SectionTitle.vue'
    import LabelText from '~/components/LabelText';

export default {
	name:'JoinView',
	head() {
        return {
            title:'换租订单详情'
        }
    },
	components:{
		SectionTitle,
        LabelText
	},
	data(){
		return {
            inline:true,
            oldStatonColumns:[
                {
                    title: '工位编号/房间名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '产品类型',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '原服务开始日',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '原服务结束日',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '欲更换服务日',
                    key: 'name',
                    align: 'center'
                },
            ],
            newStatonColumns:[
                {
                    title: '工位编号/房间名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '产品类型',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '指导价',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '下单价',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '优惠',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '签约价',
                    key: 'name',
                    align: 'center'
                },
            ],
            newStatonMoneyColumns:[
                {
                    title: '工位编号/房间名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '服务开始日',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '服务结束日',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '不计算服务费区间',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '签约价',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '金额',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'name',
                    align: 'center'
                },
            ],
            newInfoColumns:[
                {
                    title: '服务费总额',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '服务保证金',
                    key: 'name',
                    align: 'center'
                },
            ],
            oldInfoColumns:[
                {
                    title: '减少服务费',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '已交服务费中涉及到更换的金额',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '已交保证金涉及到更换的金额',
                    key: 'name',
                    align: 'center'
                },
            ],
            formItem:{
                discount:'222'
            }

		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH('false');
		GLOBALHEADERSET('订单合同')
	},

	methods:{
		editCard(value){
			this.$emit("editCards", value); 
		},
		submit(){
			console.log('submit')
		}

	}
}
</script>


<style lang="less" scoped>  
	.g-order-detail{
		.create-order{
			padding:30px;
		}
		.space{
			display: inline-block;
			width: 100%;
			height: 20px;
		}
		.buttons{
            text-align: center;
            margin:30px auto 30px;
        }
        .between{
            display: inline-block;
            width: 20px;
        }
	}
</style>