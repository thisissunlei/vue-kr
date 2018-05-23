<template>
    <div class="door-relationship">
        <Select
            v-model="communityId"
            style="width:150px"
            placeholder="请选择社区"
            filterable
            clearable
        >
            <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
        </Select>
       <Button  type="primary" @click="newCreateEquipmentGroup">新增设备组</Button>
       <Modal
            v-model="openNewCreateModal"
            width="490"
            title="新建设备组"
            @on-ok="sumbmitNewCreateData">
            <NewCreate @formData="getNewCreateData" v-if="openNewCreateModal"/>
        </Modal>
        <Modal
            v-model="openEditModal"
            width="490"
            title="编辑设备组"
            @on-ok="sumbmitEditData">
            <EditForm @formData="getEditForm" v-if="openEditModal" :initialData="editInitailData"/>
        </Modal>
        <div id="myDiagramDiv" style="width:1000px; height:500px; background-color: #DAE4E4;">

        </div>
    </div>
</template>

<script>
import Buttons from '~/components/Buttons';
import NewCreate from './newCreate';
import EditForm from './editForm';

export default {
   name:'doorRelationship',
    head () {
        return {
            title: "门禁级联关系"
        }
    },
   data(){
       return {
            openNewCreateModal :false,
            openEditModal : false,
            newCreateData : {},
            editData : {},
            callback:null,
            cancelCallback:null,
            myDiagram:null,
            model : null,
            editInitailData : {},
            addNewNode : 0 ,
            communityId : null,
            communityList :[],
            dateTemplate :{},
            nodeDragged : false,
            
       }
   },
   components:{
    NewCreate,
    EditForm
   },
   mounted(){

       this.getCommunity();
       this.drawMap()
   },
  
   methods:{
        drawMap(){
            console.log("dldkfldk")
            let _this =this;
            var $ = go.GraphObject.make;
            this.myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center,
                // "undoManager.isEnabled": true, 
                "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
            });
            this.myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                {
                    dragComputation: function(part, pt, gridpt){
                       var diagram = part.diagram;
                        if (diagram === null) return pt;
                        // compute the area inside the viewport
                        var v = diagram.viewportBounds.copy();
                        v.subtractMargin(diagram.padding);
                        // get the bounds of the part being dragged
                        var b = part.actualBounds;
                        var loc = part.location;
                        // now limit the location appropriately
                        var x = Math.max(v.x+1, Math.min(pt.x, v.right-b.width-2)) + (loc.x-b.x);
                        var y = Math.max(v.y+1, Math.min(pt.y, v.bottom-b.height-2)) + (loc.y-b.y);
                        _this.nodeDragged  = true;
                        return new go.Point(x, y);
                    },
                    isActionable : false,
                   
                    mouseLeave:function(e,node){
                        console.log("e",e,"node",node);
                        var itemData = node.data;
                        var locationArr = itemData.loc.split(" ");
                       
                        if(_this.nodeDragged){
                            var param = {
                                id : itemData.id,
                                memo : itemData.memo,
                                name : itemData.name,
                                x : parseInt(locationArr[0]+0),
                                x : parseInt(locationArr[1]+0)
                            };
                            _this.editDataReq(param);
                            _this.nodeDragged = false;
                        }
                    },
                    linkConnected : function(node,link,obj){
                        console.log("node.data",node.data,"link.data",link.data,"obj.data",obj.part.data.id)
                        console.log("link.data.from ",link.data.from );
                        if(link.data.from ==obj.part.data.id ){
                            
                            _this.newCreateConnect(link.data);
                        }
                    },
                    linkDisconnected : function(node,link,obj){
                        console.log("node.data",node.data,"link.data",link.data,"obj.data",obj.part.data.id)
                        console.log("link.data.from ",link.data.from )
                        if(link.data.from ==obj.part.data.id ){
                            console.log("删除一个连接")
                            _this.deleteLinkConnect(link.data);
                        }
                    },
                   
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "RoundedRectangle",
                    {
                        parameter1: 10,  
                        fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                        stroke: null,
                        portId: "",  
                        fromLinkable: true, fromLinkableDuplicates: true,
                        toLinkable: true,toLinkableDuplicates: true,
                        cursor: "pointer",
                        
                    }),
               
                $(go.TextBlock, "name",
                
                { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text","name").makeTwoWay())
            );
            $(go.DraggingTool,
                {
                    computeMove: function(n, newloc, draggedparts, result){
                        console.log("n",n,"newloc",newloc,"draggedparts",draggedparts,"result",result)
                    }
                }
            
            );
           

            this.myDiagram.nodeTemplate.selectionAdornmentTemplate =
            
                $(go.Adornment, "Spot",
                    $(go.Panel, "Auto",
                    $(go.Shape, { fill: null, stroke: "#000", strokeWidth: 1 }),
                    $(go.Placeholder)  
                    ),
                     
                    $("Button",
                    {
                        alignment: go.Spot.TopRight,
                        click: _this.editItemData, 
                        
                    },
                    $(go.TextBlock, "编辑", 
                        { font: "normal 10pt sans-serif" }),
                    $(go.Shape, "PlusLine", { width: 6, height: 6 })
                    ) 
                ); 

            var dateTemplate = this.dateTemplate;
            this.model = go.Model.fromJson(dateTemplate);
            this.myDiagram.model = this.model;
        },

        getMapData(params){
            this.$http.get('getDoorRelationshipData', params).then((res)=>{
                var reponseData = res.data;
                var nodeDataArrayNew = [],linkConnectArr = [];
                for(var i = 0 ;i< reponseData.setList.length;i++){
                    nodeDataArrayNew[i] = {
                        "id": reponseData.setList[i].id,
                        "loc": reponseData.setList[i].x + " "+ reponseData.setList[i].y,
                        "name" : reponseData.setList[i].name,
                        "memo" : reponseData.setList[i].memo,
                        "communityId " : reponseData.setList[i].communityId,
                    }
                }
                for(var i = 0 ;i< reponseData.setRelationList.length;i++){
                    linkConnectArr[i] = {
                        "from": reponseData.setRelationList[i].preSetId,
                        "to": reponseData.setRelationList[i].setId,
                        "id" : reponseData.setRelationList[i].id,
                    }
                }
                
                this.dateTemplate = { "nodeKeyProperty": "id",
                                "nodeDataArray":nodeDataArrayNew,
                                "linkDataArray":linkConnectArr
                                }
                var dateTemplate = this.dateTemplate;
                this.model = go.Model.fromJson(dateTemplate);
            
            this.myDiagram.model = this.model;
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

        newCreateEquipmentGroup(){
           
            this.openNewCreateModal = !this.openNewCreateModal;
            
        },
        getNewCreateData(form,callback,cancel){
            
            this.newCreateData=form;

        },
        getEditForm(form){
            this.editData=form;
        },
        sumbmitNewCreateData(){
            var locationY = (this.addNewNode)*70
            var location  = 0+ " " + locationY
            var newCreateData = Object.assign({},this.newCreateData,{"loc":location})
            this.addNewNode +=1;
            
            this.myDiagram.startTransaction("make new node");
            this.myDiagram.model.addNodeData(newCreateData);
            this.myDiagram.commitTransaction("make new node");
            // 获取model数据
            this.addNewCreateDataReq(newCreateData);
        },

        sumbmitEditData(){
            
            var location  = this.editData.loc.split(" ");
            var params = {
                id : this.editData.id,
                memo :this.editData.memo,
                name : this.editData.name,
                x : location[0].toFixed(2),
                y : location[1].toFixed(2),
            }
            this.editDataReq(params);
        },

        editItemData (e, obj){
            this.editInitailData = obj.part.adornedPart.data;
            this.openEditFormModal();
        },
        editDataReq(sendMsg){
            this.$http.post('editDoorRelationshipData', sendMsg).then((res)=>{
                console.log("编辑成功")
                if(this.openEditModal){
                    this.openEditFormModal();
                }
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        openEditFormModal(){
            this.openEditModal = !this.openEditModal
        },
        addNewCreateDataReq(sendMsg){
            let _this =this;
            var locationArr = sendMsg.loc.split(' ');
            console.log("locationArr",locationArr)
            var realsendMsg = {
                communityId : _this.communityId,
                memo :sendMsg.memo,
                name :sendMsg.name,
                x :locationArr[0],
                y :locationArr[1],
            }
            this.$http.post('newCreateDoorRelationship', realsendMsg).then((res)=>{
				console.log("新增成功")
			}).catch((error)=>{
				// this.$Notice.error({
				// 	title:error.message
				// });
			})
        },
        getCommunity(){
            
            this.$http.get('join-bill-community','').then((res)=>{
                this.communityList=res.data.items;
                this.communityId = res.data.items[0].id

                var params = {communityId : this.communityId}
                this.getMapData(params);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        newCreateConnect(param){
            console.log("param",param);
            let _this =this;
            var newParams = {
                                communityId:_this.communityId,
                                preSetId:param.from,
                                setId:param.to,
                            };
            this.$http.post('newCreateDoorGroupConnect',newParams).then((res)=>{
                console.log("新建联系成功");
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        deleteLinkConnect(param){
            let _this =this;
            var newParams = {
                                id : param.id
                            };
            this.$http.delete('deleteLinkConnect',newParams).then((res)=>{
                console.log("删除联系成功");
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        
    }
 }
</script>
<style lang="less">
    .door-relationship{
        width:100%;
        height:100%;
    }
</style>