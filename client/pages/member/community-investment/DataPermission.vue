<template>
    <div class='g-rolePermission'>
		 <Checkbox v-model="allCities" @on-change="checkAllGroupChange">全国</Checkbox>
    	
		<div class="leftSec">
				 <div v-for="item in cities" :key="item.id">
					<div style="display:'block';text-align:'left';lineHeigitemht:'32px';color:'#333';margin-bottom:8px">
						 <div style="color:'#333';fontWeight:500;fontSize:14">{{item.name}}</div>
						<Checkbox style="display:block;min-width:50px;text-aligh:left"  v-model="item.flag" :disabled="allCities" @on-change="checkNativeCity(item)">本城市</Checkbox>
							
							<Checkbox   v-model="community.ownFlag" v-for="community in item.communities" :key="community.communityId" style="display:inline-block;min-width:100px;text-aligh:left"  :disabled="!!item.flag"  :label="community.communityId">{{community.communityName}}</Checkbox>
		       		</div>
                  </div>    
        </div>
        <div slot="footer" style="margin: 30px 0;text-align: center;">
                <Button  type="primary" @click="submitRole">确认</Button>
                <Button  type="ghost" style="margin-left:20px" @click="cancelRole">取消</Button>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        detail:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return{
		   newDetail:{},
		   allCities:[], 
		   cities:[],
		   communityIds:[],  
           cityIds:[],    
        }
	},

	created(){
		this.newDetail = Object.assign({},this.detail);
		this.allCities = !!this.newDetail.allCities;
		this.cities = this.newDetail.cities;
	},

	mounted(){
		let target = this.newDetail;
		if(target.allCities){
			// 全国选中 
			target.allCities = true ;
			//this.allCities = true; 
			target.cities.map((val,index) =>{
				val.flag = true ;
				val.communities.map((v,i)=>{
					v.ownFlag = true;
				})
			})
		}else{
			target.cities.map((val,index) =>{
				if(val.flag){
					// 当前城市选中 
					val.flag = true;
					val.communities.map((v,i)=>{
					v.ownFlag = true;
				})
				}else{
					val.communities.map((v,i)=>{
					if(v.ownFlag){
						// // 当前社区选中 
						v.ownFlag = true;
					}
				})
				}
			})

		}
	},
    methods:{
       submitRole(){
		   let newParam ={};
		   let params = this.newDetail;
		   if(this.allCities){
			 newParam = {cityIds:-1};
		   }else{
			   let communityIds = [];
			   let cityIds = [];
				params.cities.map((val,index)=>{
					if(val.flag){
						cityIds.push(val.id);
						val.communities.map((v,i)=>{
							communityIds.push(v.communityId);
						})
					}else{
						val.communities.map((v,i)=>{
							if(v.ownFlag){
								communityIds.push(v.communityId);
							}
						})
					}
				})
				 communityIds = communityIds.join(',');
				 cityIds = cityIds.join(',');
				newParam = {communityIds,cityIds};
		   }
           this.$emit('submit',newParam);
	   },
	   
       cancelRole(){
           this.$emit('cancel');
	   },

	   checkAllGroupChange(val){
		   let target = this.newDetail;
		   if(val){
			 target.allCities = true;
			 target.cities && target.cities.map((val,index) =>{
				 val.flag = true;
				 val.communities.map((v,i)=>{
					 v.ownFlag=true;
				 })
			 })
		   }else{
				 target.allCities = false;
				 target.cities && target.cities.map((val,index) =>{
				 val.flag = false;
				 val.communities.map((v,i)=>{
					 v.ownFlag=false;
				 })
			 })
		   }
	   },

	   // 选择当前城市 
	   checkNativeCity(items){
		   if(items.flag){
			   items.communities.map((v,i)=>{
					 v.ownFlag = true;
				 })
		   }else{
			   items.communities.map((v,i)=>{
					 v.ownFlag = false;
				 })
		   }
	   },
	   
    }
}
</script>

<style lang='less' scoped>
     .g-rolePermission{
  .leftSec{
    width: 96%;
    height: 280px;
    border: 1px solid #dfdfdf;
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 4px;
    overflow: auto;
    display: inline-block;
    margin-right: 35px;
  }
  .ui-list-group{
    width:80%;
  }
  .rightSec{
    width: 190px;
    height: 280px;
    border: 1px solid #dfdfdf;
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 4px;
    overflow: auto;
    display: inline-block;
  }
}

</style>
