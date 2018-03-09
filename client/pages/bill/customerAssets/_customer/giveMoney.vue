

<template>	
    <div class="give-money">
		<div class="title-type">打款总汇表</div>
        <Table  border :columns="allColumns" ></Table>

		<div class="title-type">打款变化明细表</div>
		
    </div>
	

</template>

<script>
	export default {
		name:'customerAssetsDetail',
		components:{
		},
		data (){
			return{
				allColumns:[
                    {
                        title: '序号',
                        key: 'billNo',
                        width:100,
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '总额（银行转账额+支付宝打款额+转社区款额）（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '银行转账额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '转社区款额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    ]
			}
		},
		methods:{

		},
		mounted(){
			GLOBALSIDESWITCH('false');
		}
	
	}
</script>
<style lang="less" scoped>
    .give-money{
    	padding:5px 10px;
    }
</style>