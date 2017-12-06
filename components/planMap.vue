<template>
	<div class = "plan-map-content">
		<div class="num-type">
			<Select v-model="params.floor" style="width:100px" @on-change="floorsChange">
		        <Option v-for="item in floors" :value="item.value" :key="item.value" >{{ item.label }}</Option>
		    </Select>
		    <Input v-model="inputStart" placeholder="inputStart" style="width: 50px"></Input>至
		    <Input v-model="inputEnd" placeholder="inputEnd" style="width: 50px"></Input>
			<Button @click="submitStation">确定</Button>

			<span class="til">当前比例：</span>
            <input type="range" :value="scaleNumber/100" min="0.1" max="2" step="0.1" @click="rangeSelect" style="vertical-align:middle"/>
            <output>{{scaleNumber}}</output>%
		</div>
		<Button @click="prompt">click</Button>
		<Button @click="submitAllStation">提交数据</Button>
		<div id = "plan-map-content"  style ='width:700px;height:450px;border:1px solid #000'>

		</div>
	</div>
</template>
<style>
	.plan-map-content{
		width: 700px;
		height: 500px;
	}
</style>
<script>
import Map from '~/plugins/Map.js';
import axios from '~/plugins/http.js';
    export default {
        data () {
        	// this.getData()
            return {
                data:'',
                selectedObjs:[],
                deleteArr:[],
                otherData:{},
                newfloor:{},
                submitData:[],
                scaleNumber:40,
                Map:'',
                inputEnd:'',
                inputStart:'',
                originData:[],
                floor:''

            }
        },
        destroyed(){
        	console.log('======================>>>>>')
        },
        created:function(){
        	this.getData()
        	console.log('created======================>>>>>')
        },
        updated:function(){
        	console.log('updated======================>>>>>')

        },
        watch:{
        	params:function(){
        		console.log('=========>>>>>>')
        		if(this.params.floor){
        			this.getData()
        		}
        	}
        },
        props:['stationsubmit','params','floors'],
        // computed: {
        //     floor :function(){
        //         console.log('floor=======')
        //     }
        // },
        methods: {
			prompt: function() {
				this.getData()
			},
			//获取平面图基础数据
			getData:function(){
				let params = this.params;
				let selectedObjs = []
				console.log('getData====>',params)
				axios.get('getplanmap', params, r => {
					// console.log('r', r);
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
						name = item.communityName;
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
				

				})
				//同步数据
				this.data=response;
				this.otherData={
					floors:floors,
					name:name
				};
				this.newfloor=floors[0].value;
				this.submitData=allDataObj;
				this.canvasEles()

				})
			},
			//处理数据进行渲染
			canvasEles: function() {
				// const {data,newfloor,selectedObjs,inputStart,inputEnd} = this.state;
				let inputStart = this.inputStart;
				let inputEnd = this.inputEnd;
				console.log('处理数据进行渲染',inputEnd,inputStart)
				const _this = this;
				var dainitializeConfigs = {};
				let start = Number(inputStart);
				let end = Number(inputEnd);
				let data = this.data;
				let newfloor = this.newfloor;
				let selectedObjs = this.selectedObjs;
				for (let i = 0; i < data.length; i++) {
					if (data[i].floor == newfloor) {
						var arr = [];
						arr = data[i].figures.map(function(item, index) {
							var obj = {};
							let cellName = Number(item.cellName);
							var x = item.cellCoordX;
							var y = item.cellCoordY;
							obj.x = Number(x);
							obj.y = Number(y);
							obj.width = Number(item.cellWidth);
							obj.height = Number(item.cellHeight);
							obj.name = item.cellName;
							obj.whereFloor = item.floor;
							obj.belongType = item.belongType;
							obj.belongId = Number(item.belongId);
							obj.id = Number(item.id);
							obj.canFigureId = item.canFigureId;
							obj.type = obj.belongType;
							if (item.status) {
								obj.status = item.status;
							}
							for (let j = 0; j < selectedObjs.length; j++) {
								let belongType = "STATION";
								if (selectedObjs[j].belongType == 2) {
									belongType = "SPACE";
								}
								if (item.belongId == selectedObjs[j].id && item.belongType == belongType) {

									obj.checked = true;

								}
							}
							if (cellName >= start && cellName <= end) {
								obj.checked = true;
							}

							return obj;
						})
						dainitializeConfigs = {
							stations: arr,

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
			},
			//放大比例
			rangeSelect :function(event){
		        // let {destroyData}=this.state;
				var scaleSize = Number(event.target.value);
				var scaleNumber = parseInt(event.target.value * 100);
				this.scaleNumber = scaleNumber
				console.log('scaleNumber',scaleNumber)
		        this.Map.setScale(scaleSize);
			},
			//更换楼层
			floorsChange:function (value) {
				console.log('floorsChange',this.Map)

				if(this.Map){
					console.log('========this.Map',this.Map)
					this.Map.destory();
					this.scaleNumber = 50;
					this.getData();
					console.log('create------end')
				}
				
			},
			submitStation:function(){
				this.Map.destory();
				console.log('submitStation---',this.scaleNumber)
				// this.scaleNumber = 50;
				// this.getData()
				this.canvasEles();
			},
			//提交数据
			submitAllStation:function(){
				let {submitData,deleteArr,originData} =this;
				console.log('submitData',submitData)
				console.log('deleteArr',deleteArr)
				console.log('originData',originData)
				this.stationsubmit(submitData)

			},
			dataChange: function(data, allData) {
				console.log('dataChange', data, allData);
				const {
					selectedObjs,
					newfloor,
					submitData,
					deleteArr,
					originData
				} = this;
				let del = [].concat(selectedObjs);
				var allDataObj = Object.assign({}, submitData);
				var delDataObj = Object.assign({}, deleteArr);
				allData = [].concat(allData, originData);

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

				this.submitData = allDataObj,
				this.deleteArr = delDataObj,
				this.isOperation = false,
				console.log('datachange-->save', allDataObj)
			}
        },
        created() {
        }
    }
</script>