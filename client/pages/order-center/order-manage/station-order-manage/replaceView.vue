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

            </Card>
            <span class="space"></span>
            <Card id="step-two">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(1)">
                	编辑
		        </a>

            </Card>
            <span class="space"></span>

            <Card id="step-three">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(2)">
                	编辑
		        </a>
            </Card>
            <span class="space"></span>
            <Card id="step-four">
                <p slot="title" class="card-title">
                    服务费信息
                </p>
                <a href="#" slot="extra" @click.prevent="editCard(3)">
                	编辑
		        </a>
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

export default {
	name:'JoinView',
	head() {
        return {
            title:'换租订单详情'
        }
    },
	components:{
		SectionTitle
	},
	data(){
		return {

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