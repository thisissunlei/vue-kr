

<template>

	
    <div class="customer-assets-detail">
		 <SectionTitle title="客户账户详情" type="detailTitle" />


		 <LabelText label="客户名称：">
			456
		</LabelText>
		<LabelText label="客户名称：">
			456
		</LabelText>
    </div>
	

</template>

<script>
	import SectionTitle from '~/components/SectionTitle';
	import LabelText from '~/components/LabelText'; 
	export default {
		name:'customerAssetsDetail',
		components:{
			SectionTitle,
			LabelText
		},
		data (){
			return{
				
			}
		},
		methods:{

		},
	
	}
</script>
<style lang="less" scoped>
    .customer-assets-detail{

    }
</style>