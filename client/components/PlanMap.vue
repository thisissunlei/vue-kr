<template>
	<div class = "plan-map-content">
		<div class="num-type" style="margin-bottom:15px">
			<Select v-model="newfloor" style="width:100px;margin-right:15px;" @on-change="floorsChange" placeholder="floor">
		        <Option v-for="item in floors" :value="item.value" :key="item.value" >{{ item.label }}</Option>
		    </Select>
		    <Input v-model="inputStart" placeholder="开始工位" style="width: 80px;margin-right:5px"></Input>至
		    <Input v-model="inputEnd" placeholder="结束工位" style="width: 80px;margin-right:5px"></Input>
			<Button type="primary" @click="submitStation" style="margin-right:15px">选择</Button>

			<span class="til">当前比例：</span>
            <input type="range" :value="scaleNumber/100" min="0.1" max="2" step="0.1" @click="rangeSelect" @on-change="rangeSelect" style="vertical-align:middle"/>
            <output>{{scaleNumber}}</output>%
		</div>
		<div id = "plan-map-content"  style ='width:850px;height:450px;border:1px solid #000'>

		</div>
	</div>
</template>
<style>
	.plan-map-content{
		width: 850px;
		height: 500px;
	}
</style>
<script>


import Map from '~/plugins/Map.js';
import http from '~/plugins/http.js';


    export default {
        props:['stationsubmit','params','floors','stationData','originStationList'],

        data () {
            return {
                data:'',//平面图基础数据
                selectedObjs:this.stationData.submitData,//编辑带回的数据
                deleteArr:[],//删除的工位
                // otherData:{},
                newfloor:'3',//当前算选择的楼层
                submitData:[],//已选择工位
                scaleNumber:40,//比例
                Map:'',
                inputEnd:'',//开始工位
                inputStart:'',//结束工位
                originData:[],//预备删除
                floor:'',
                startToEnd:[],
                origin:this.originStationList,
                stationArr:this.stationData,//提交父组件字段
                // stationAll:this.stationData//①创建props属性result的副本--myResult

            }
        },
        destroyed(){
        },
        mounted:function(){
        	this.getData()
        },
        updated:function(){
        },
        beforeUpdate:function(){
        	
        },
        watch:{
        	params:function(val){
        	},
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
				let startToEnd = []
				let originStationList = this.origin || []
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
							obj.price = item.price;
							obj.checked = false;
							if (item.status) {
								obj.status = item.status;
							}
							for (let j = 0; j < originStationList.length; j++) {

								let belongType = "STATION";
								if (originStationList[j].belongType == 2 || originStationList[j].belongType == 'SPACE') {
									belongType = "SPACE";
								}
								if (item.belongId == originStationList[j].id && item.belongType == belongType) {
									obj.checked = false;
									obj.status = 3;

								}

							}
							for (let j = 0; j < selectedObjs.length; j++) {

								let belongType = "STATION";
								if (selectedObjs[j].belongType == 2 || selectedObjs[j].belongType == 'SPACE') {
									belongType = "SPACE";
								}
								if (item.belongId == selectedObjs[j].id && item.belongType == belongType) {
									obj.checked = true;
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

								select.price = item.price;

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
							// backgroundImageUrl: "http://" + window.location.host + data[i].graphFilePath
						}
					}

				}

				this.Map = Map("plan-map-content", dainitializeConfigs);
				if(startToEnd.length){
					this.startToEnd = startToEnd;
				}
				
			},
			//放大比例
			rangeSelect :function(event){
				var scaleSize = Number(event.target.value);
				var scaleNumber = parseInt(event.target.value * 100);
				this.scaleNumber = scaleNumber
		        this.Map.setScale(scaleSize);
			},
			//更换楼层
			floorsChange:function (value) {
				if(this.Map){
					this.Map.destory();
					this.scaleNumber = 50;
					this.canvasEles();
				}
			},
			submitStation:function(){
				this.Map.destory();
				this.canvasEles();
			},
			dataChange: function(data, allData) {
				const {
					selectedObjs,
					newfloor,
					submitData,
					deleteArr,
				} = this;
				let del = [].concat(selectedObjs);
				var allDataObj = Object.assign({}, submitData);
				var delDataObj = Object.assign({}, deleteArr);
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
					submitDataAll = submitDataAll.concat(allDataObj[i]);
				}
				for (let i in delDataObj) {
					deleteDataArr = deleteDataArr.concat(delDataObj[i]);
				}
				submitDataAll = submitDataAll.map(function(item, index) {
					var obj1 = {};
					let belongType = 1;
					if (item.belongType == "SPACE") {
						belongType = 2;
					}
					obj1.id = item.belongId;
					obj1.type = belongType;
					obj1.seatType = item.type == 'STATION'?'OPEN':item.type;
					obj1.belongType = belongType;
					obj1.whereFloor = item.whereFloor;
					obj1.name = item.name;
					obj1.price = item.price;
					obj1.capacity = item.capacity;
					return obj1

				})
				let station = {
					submitData: submitDataAll,
					deleteData: deleteDataArr,
				}
				this.stationArr = station;
			}
        },
    }
</script>