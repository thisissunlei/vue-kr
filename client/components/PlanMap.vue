<template>
	<div class = "plan-map-content" :style="{height:page.height}">
		<div class="num-type" style="margin-bottom:15px">
			<Select v-model="newfloor" style="width:100px;margin-right:15px;" @on-change="floorsChange" placeholder="floor">
		        <Option v-for="item in floors" :value="item.value" :key="item.value" >{{ item.label }}</Option>
		    </Select>
		    <Input v-model="inputStart" placeholder="开始工位" style="width: 80px;margin-right:5px" />至
		    <Input v-model="inputEnd" placeholder="结束工位" style="width: 80px;margin-right:5px" />
			<Button type="primary" @click="submitStation" style="margin-right:15px">选择</Button>

			<span class="til">当前比例：</span>
			<Slider :v-model="scaleNumber"  :min="50" :max="200" :step="10" @on-change="rangeSelect" style="width:150px;display:inline-block;vertical-align:middle"></Slider>
            <output style="margin-left:15px" >{{scaleNumber}}</output>%
		</div>
		<div id = "plan-map-content"  :style='stylePlan'>

		</div>
	</div>
</template>
<style>
	.plan-map-content{
		width: 100%;
	}
</style>
<script>


import Map from '~/plugins/Map.js';
import http from '~/plugins/http.js';


    export default {
        // props:['stationsubmit','params','floors','stationData','originStationList'],
		props:{
			params:Object,
			floors:Array,
			stationData:Object,
			originStationList:Array
		},
        data () {
        	// console.log('this.stationData.submitData',this.stationData.submitData)
            return {
                data:'',//平面图基础数据
                selectedObjs:this.stationData.submitData,//编辑带回的数据
                deleteArr:[],//删除的工位
                // otherData:{},
                newfloor:'3',//当前算选择的楼层
                submitData:[],//已选择工位
                scaleNumber:60,//比例
                Map:'',
                inputEnd:'',//开始工位
                inputStart:'',//结束工位
                originData:[],//预备删除
                floor:'',
                startToEnd:[],
                origin:this.originStationList,
                showSlider:true,
                stationArr:this.stationData,//提交父组件字段
                page:{},//显示器的宽高
                stylePlan:{
                }
                // stationAll:this.stationData//①创建props属性result的副本--myResult

            }
        },
        destroyed(){
        },
        mounted:function(){
        	this.getData();
        	this.getPageWidthOrHeight()
        },
        updated:function(){
        },
        beforeUpdate:function(){
        	
        },
        watch:{
        	stationData:function(val){
        		this.selectedObjs = this.stationData.submitData;
        	},
        	originStationList(val){
        		this.origin = val;
        	},
        	stationArr:function(val){
				
				this.$emit("on-result-change", val); //③组件内对myResult变更后向外部发送事件通知
				this.inputStart = '';
				this.inputEnd = ''
        	},
        	startToEnd:function(val){
        		let {submitData,deleteData} = this.stationArr;
        		submitData =submitData.concat(val);
        		this.stationArr = {
        			deleteData:deleteData,
        			submitData:submitData,
        		}
        	},
        },
        methods: {
        	//获取屏幕的高度
        	getPageWidthOrHeight(){

				var page = {};
				page.width = window.innerWidth;
				page.height = window.innerHeight;
				if(document.compatMode == 'CSS1Compat'){
					page.width = document.documentElement.clientWidth;
					page.height = document.documentElement.clientHeight;
				}else{
					page.width = document.body.clientWidth;
					page.height = document.body.clientHeight;
				}
				this.page = Object.assign({},page)
				this.stylePlan = {
					width:'100%',
					height:page.height-300+"px",
					border:'1px solid #000'
				}
			},
			//获取平面图基础数据
			getData:function(){
				let params = this.params;
				let selectedObjs = []
				let _this = this;
				http.get('getplanmap', params, r => {
					let response = r.data;
					let floors = [];
					let name = "";
					let arr = [];
					var allDataObj = {};
					var originData = [];

					//处理数据
					arr = response.map(function(item, index) {
						var allData = [];
						floors.push({
							value: "" + item.floor,
							label: "" + item.floor
						});
						// name = item.communityName;
						item.figures.map(function(eveItem, eveIndex) {
							for (let j = 0; j < selectedObjs.length; j++) {
								let belongType = "STATION";
								if (selectedObjs[j].belongType == 2) {
									belongType = "SPACE";
								}

								if (eveItem.belongId == selectedObjs[j].id && eveItem.belongType == belongType) {
									var obj = {};
									obj.name = eveItem.cellName;
									obj.whereFloor = eveItem.floor;
									obj.belongType = eveItem.belongType;
									obj.belongId = Number(eveItem.belongId);
									allData.push(obj);
								}

							}
							if (selectedObjs.length == 0 && eveItem.status && eveItem.status == 3) {
								var obj = {};
								obj.name = eveItem.cellName;
								obj.whereFloor = eveItem.floor;
								obj.belongType = eveItem.belongType;
								obj.belongId = Number(eveItem.belongId);
								originData.push(obj);
								allData.push(obj);
							}
						})

						allDataObj["a" + item.floor] = [].concat(allData);
				
				}, e => {
					_this.$Notice.error({
                        title:e.message
                    });
				

				})
				//同步数据
				this.data=response;
				// this.otherData={
				// 	floors:floors,
				// 	name:name
				// };//可删
				this.newfloor=floors[0].value;
				// this.submitData=allDataObj;
				this.canvasEles()

				})
			},
			//处理数据进行渲染
			canvasEles: function() {
				const _this = this;
				var dainitializeConfigs = {};
				let start = Number(this.inputStart);
				let end = Number(this.inputEnd);
				let data = this.data;
				let newfloor = this.newfloor;
				let selectedObjs = this.selectedObjs;
				// console.log('渲染',selectedObjs)
				let startToEnd = []
				let originStationList = this.origin || [];
				for (let i = 0; i < data.length; i++) {
					if (data[i].floor == newfloor) {
						var arr = [];
						arr = data[i].figures.map(function(item, index) {
							var obj = {};
							let cellName = Number(item.cellName);
							var x = item.cellCoordX;
							var y = item.cellCoordY;
							obj.x = Number(item.cellCoordX);
							obj.y = Number(item.cellCoordY);
							obj.width = Number(item.cellWidth);
							obj.height = Number(item.cellHeight);
							obj.name = item.cellName;
							obj.whereFloor = item.floor;
							obj.belongType = item.belongType;
							obj.belongId = Number(item.belongId);
							obj.id = Number(item.id);
							obj.canFigureId = item.canFigureId;
							obj.capacity = item.capacity;
							obj.type = obj.belongType;
							obj.seatPrice = item.seatPrice;
							obj.checked = false;
							obj.status = item.status || 4;
							// 编辑带回的数据
							for (let j = 0; j < originStationList.length; j++) {
								let belongType = "STATION";
								if (originStationList[j].belongType == 2 || originStationList[j].belongType == 'SPACE') {
									belongType = "SPACE";
								}
								if (item.belongId == originStationList[j].id && item.belongType == belongType && item.status != 2) {
									obj.checked = false;
									obj.status = 3;
								}

							}
							//订单现在已选工位
							for (let j = 0; j < selectedObjs.length; j++) {
								let belongType = "STATION";
								if (selectedObjs[j].belongType == 2 || selectedObjs[j].belongType == 'SPACE') {
									belongType = "SPACE";
								}
								if (item.belongId == selectedObjs[j].id && item.belongType == belongType ) {
									// 将工位标记为已选中
									obj.checked = true;
									//将status改为可选状态
									obj.status = 3;

								}

							}

							if (cellName >= start && cellName <= end && item.status!=1) {
								obj.checked = true;
								let select = {};
								select.name = item.cellName;
								select.whereFloor = item.floor;
								select.belongType = item.belongType;
								select.belongId = Number(item.belongId);
								select.id = Number(item.belongId);
								select.canFigureId = item.canFigureId;
								select.type = obj.belongType;
								select.capacity = item.capacity;
								select.seatType = obj.belongType == 'STATION'?'OPEN':'SPACE';
								select.seatPrice = item.seatPrice;

								startToEnd.push(select)
							}

							return obj;
						})
						dainitializeConfigs = {
							stations: arr ||[],

							isMode: 'select',
							plugin: {
								onCheckedStationCallback: _this.dataChange
							},
							map: {
								translateX: 0,
								translateY: 0,
								scaleEnable: false,
								// scale: 0.5,
								scale: this.scaleNumber/100,
								contextMenuEnable: true
							},
							//backgroundImageUrl: location.protocol + "//" + window.location.host + data[i].graphFilePath
							backgroundImageUrl: data[i].graphFilePath
							// backgroundImageUrl: "http://optest.krspace.cn/"  + data[i].graphFilePath
						}
					}

				}

				this.Map = Map("plan-map-content", dainitializeConfigs);
				if(startToEnd.length){
					this.startToEnd = startToEnd;
				}
				
			},
			//放大比例
			rangeSelect :function(value){
				var scaleNumber = parseInt(value);
				this.scaleNumber = scaleNumber
		        this.Map.setScale(scaleNumber/100);
			},
			//更换楼层
			floorsChange:function (value) {
				if(this.Map){
					this.Map.destory();
					this.canvasEles();
				}
			},
			submitStation:function(){
				this.Map.destory();
				this.canvasEles();
			},
			dataChange(data, allData) {
				const {
					selectedObjs,
					newfloor,
					submitData,
					deleteArr,
				} = this;
				let floors = [];
				let selectedObj = {};
				if(selectedObjs.length){
					selectedObjs.map(item=>{
						let floor = item.floor || item.whereFloor;
						if(floors.indexOf(floor) == -1){
							floors.push(floor);
							selectedObj['a'+floor] = []
						}
						
					})

					selectedObjs.map((item,index)=>{
						let floor = item.floor || item.whereFloor;
						selectedObj['a'+floor].push(item)
					})
				}
								
				let del = [].concat(selectedObjs);
				var delDataObj = Object.assign({}, deleteArr);
				var allDataObj = Object.assign({}, submitData);
				allData = [].concat(allData);
				for (let i = 0; i < allData.length; i++) {
					for (let j = 0; j < del.length; j++) {
						let belongType = "STATION"
						if (del[j].belongType == 2) {
							belongType = "SPACE";
						}
						if (allData[i].belongId == del[j].id && allData[i].belongType == belongType) {
							del.splice(j, 1);
						}
					}
				}
				allDataObj["a" + newfloor] = [].concat(allData);
				delDataObj["a" + newfloor] = [].concat(del);
				this.submitData = allDataObj;
				this.deleteArr = delDataObj;
				//处理工位数据

				let submitDataAll = [];
				let deleteDataArr = [];
				for (let i in allDataObj) {
					if(selectedObj[i]){
						selectedObj[i] = []
					}
					submitDataAll = submitDataAll.concat(allDataObj[i]);
				}


				for (let i in selectedObjs) {
					for (let j in submitDataAll){

						if(selectedObjs[i].name == submitDataAll[j].name){
							submitDataAll[j].originalPrice = selectedObjs[i].originalPrice ;
						}
					}
					// submitDataAll = submitDataAll.concat(selectedObj[i]);
				}



				for (let i in delDataObj) {
					deleteDataArr = deleteDataArr.concat(delDataObj[i]);
				}
				submitDataAll = submitDataAll.map((item, index)=>{
					var obj1 = {};
					let belongType = 1;
					let type = 'OPEN'
					if (item.belongType == "SPACE" || item.belongType == 2) {
						belongType = 2;
						type = 'SPACE'

					}
					obj1.id = item.belongId || item.id;
					obj1.type = belongType;
					obj1.seatType = type;
					obj1.belongType = belongType;
					obj1.whereFloor = item.whereFloor || item.floor;
					obj1.name = item.name;
					// obj1.seatPrice = item.seatPrice || item.guidePrice || 0;
					obj1.seatPrice = item.seatPrice;
					obj1.capacity = item.capacity;
					// obj1.originalPrice = item.originalPrice || obj1.seatPrice|| '';// originalPrice seatPrice 都有可能为0 
					obj1.originalPrice = this.getOriginalPrice(item,obj1)
					return obj1

				})
				let station = {
					submitData: submitDataAll,
					deleteData: deleteDataArr,
				}
				this.stationArr = station;
			},
			getOriginalPrice(item1,item2){
       		   if (item1.hasOwnProperty('originalPrice') ) {
       		       return item1['originalPrice']
       		   } 
       		   else if (item2.hasOwnProperty('seatPrice')) {
       		       return item2['seatPrice']
       		   } else {
       		       return ''
       			}
       		}
        },
    }
</script>