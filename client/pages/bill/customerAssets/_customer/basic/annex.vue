

<template>	
    <div class="annex-detail">

    	<div class="card-box">
    		<div class="card-title">身份证上传</div>
    		<div class="card-warn">请确保文字<span>清晰可辨</span>，身份证完整显示。</div>
    		<SinglePhone :defaultImg="frontImg" :photeUrl="photeUrl" :onSuccess="onSuccessCardFront"/>
    		<span class="between"></span>
    		<SinglePhone :defaultImg="reverseImg" :photeUrl="photeUrl" :onSuccess="onSuccessCardReverse"/>
    	</div>
    	<div class="card-box" style="margin-top:30px">
    		<div class="card-title">营业执照上传</div>
    		<div class="card-warn">请确保文字<span>清晰可辨</span>，营业执照完整显示。</div>
    		<SinglePhone :defaultImg="licenseImg" :photeUrl="photeUrl" :onSuccess="onSuccessLicense"/>
    	</div>
		 
    </div>
	

</template>

<script>
    import SinglePhone from '~/components/SinglePhone'
	

	export default {
		components:{
			SinglePhone,
		},
		data (){
			return{
				frontImg:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201804/Z/184040935_690.jpg',
				reverseImg:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201804/O/184220916_970.jpg',
				licenseImg:'http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201804/X/184244229_105.jpg',
				photeUrl:''
			}
		},
		methods:{
			onSuccessCardFront(url){
				console.log('onSuccessCardFront',url)
			},
			onSuccessCardReverse(url){
				console.log('onSuccessCardReverse',url)
			},
			onSuccessLicense(url){
				console.log('onSuccessLicense',url)
			},
			getBasicData(){
				let {params}=this.$route;
				//客户ID
				console.log('route',params.customer)
			}
		},
		mounted(){
			this.getBasicData()
		}
	
	}
</script>
<style lang="less" scoped>
	.annex-detail{
		width: 650px;
		height: auto;
		text-align: center;
		.card-box >.card-title{
			font-size: 14px;
			color: #333333;
			letter-spacing: 0;
			font-weight: 500;
			line-height: 14px;
			margin-bottom: 20px;
		}
		.card-warn{
			font-size: 14px;
			color: #666666;
			letter-spacing: 0;
			line-height: 14px;
			margin-bottom: 20px;
			&>span{
				color:red;
			}
		}
		.between{
			display: inline-block;
			width: 46px;
		}
	}
</style>